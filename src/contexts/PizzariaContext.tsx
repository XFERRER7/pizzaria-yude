import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Pizza, Pedido, ItemEstoque, PizzariaContextType } from '../types';

const PizzariaContext = createContext<PizzariaContextType | undefined>(undefined);

export const usePizzaria = () => {
  const context = useContext(PizzariaContext);
  if (!context) {
    throw new Error('usePizzaria deve ser usado dentro de PizzariaProvider');
  }
  return context;
};

interface PizzariaProviderProps {
  children: ReactNode;
}

export const PizzariaProvider = ({ children }: PizzariaProviderProps) => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [estoque, setEstoque] = useState<ItemEstoque[]>([]);
  const [carregandoPizzas, setCarregandoPizzas] = useState(true);

  // Buscar pizzas do servidor
  const buscarPizzasServidor = async (): Promise<Pizza[]> => {
    try {
      const response = await fetch('http://localhost:3000/api/pizzas');
      const dados = await response.json();
      
      if (dados.success) {
        console.log('✅ Pizzas carregadas do servidor:', dados.data);
        return dados.data;
      }
      return [];
    } catch (error) {
      console.log('⚠️ Servidor offline, usando apenas localStorage');
      return [];
    }
  };

  // Carregar dados do localStorage e mesclar com servidor
  useEffect(() => {
    const carregarDados = async () => {
      // Carregar do localStorage
      const pizzasSalvas = localStorage.getItem('pizzas');
      const pizzasLocal = pizzasSalvas ? JSON.parse(pizzasSalvas) : [];

      // Buscar do servidor
      const pizzasServidor = await buscarPizzasServidor();

      // Mesclar: servidor + local (evitar duplicatas por ID)
      const idsServidor = pizzasServidor.map(p => p.id);
      const pizzasLocalFiltradas = pizzasLocal.filter((p: { id: number; }) => !idsServidor.includes(p.id));
      const pizzasMescladas = [...pizzasServidor, ...pizzasLocalFiltradas];

      setPizzas(pizzasMescladas);
      setCarregandoPizzas(false);

      // Carregar outros dados
      const pedidosSalvos = localStorage.getItem('pedidos');
      const estoqueSalvo = localStorage.getItem('estoque');

      if (pedidosSalvos) setPedidos(JSON.parse(pedidosSalvos));
      if (estoqueSalvo) {
        setEstoque(JSON.parse(estoqueSalvo));
      } else {
        // Estoque inicial
        const estoqueInicial: ItemEstoque[] = [
          { id: 1, nome: 'Mussarela', quantidade: 100, unidade: 'kg', minimo: 20 },
          { id: 2, nome: 'Tomate', quantidade: 50, unidade: 'kg', minimo: 10 },
          { id: 3, nome: 'Presunto', quantidade: 40, unidade: 'kg', minimo: 10 },
          { id: 4, nome: 'Calabresa', quantidade: 35, unidade: 'kg', minimo: 10 },
          { id: 5, nome: 'Cebola', quantidade: 30, unidade: 'kg', minimo: 5 },
          { id: 6, nome: 'Azeitona', quantidade: 25, unidade: 'kg', minimo: 5 },
          { id: 7, nome: 'Massa', quantidade: 80, unidade: 'kg', minimo: 15 },
        ];
        setEstoque(estoqueInicial);
        localStorage.setItem('estoque', JSON.stringify(estoqueInicial));
      }
    };

    carregarDados();
  }, []);

  // Salvar pizzas no localStorage (apenas pizzas locais, não do servidor)
  useEffect(() => {
    if (pizzas.length > 0 && !carregandoPizzas) {
      const pizzasLocais = pizzas.filter(p => p.origem !== 'servidor');
      localStorage.setItem('pizzas', JSON.stringify(pizzasLocais));
    }
  }, [pizzas, carregandoPizzas]);

  // Salvar pedidos no localStorage
  useEffect(() => {
    if (pedidos.length > 0) {
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
    }
  }, [pedidos]);

  // Salvar estoque no localStorage
  useEffect(() => {
    if (estoque.length > 0) {
      localStorage.setItem('estoque', JSON.stringify(estoque));
    }
  }, [estoque]);

  // CRUD Pizzas
  const adicionarPizza = useCallback((pizza: Omit<Pizza, 'id' | 'dataCriacao'>) => {
    const novaPizza: Pizza = {
      ...pizza,
      id: Date.now(),
      dataCriacao: new Date().toISOString(),
    };
    setPizzas(prev => [...prev, novaPizza]);
  }, []);

  const editarPizza = useCallback((id: number, pizzaAtualizada: Omit<Pizza, 'id'>) => {
    setPizzas(prev => prev.map(p => p.id === id ? { ...pizzaAtualizada, id } as Pizza : p));
  }, []);

  const deletarPizza = useCallback((id: number) => {
    setPizzas(prev => prev.filter(p => p.id !== id));
  }, []);

  // CRUD Pedidos
  const adicionarPedido = useCallback((pedido: Omit<Pedido, 'id' | 'data' | 'status'>) => {
    const novoPedido: Pedido = {
      ...pedido,
      id: Date.now(),
      data: new Date().toISOString(),
      status: 'Pendente',
    };
    setPedidos(prev => [...prev, novoPedido]);
  }, []);

  const editarPedido = useCallback((id: number, pedidoAtualizado: Omit<Pedido, 'id'>) => {
    setPedidos(prev => prev.map(p => p.id === id ? { ...pedidoAtualizado, id } as Pedido : p));
  }, []);

  const deletarPedido = useCallback((id: number) => {
    setPedidos(prev => prev.filter(p => p.id !== id));
  }, []);

  const atualizarStatusPedido = useCallback((id: number, novoStatus: Pedido['status']) => {
    setPedidos(prev => prev.map(p => 
      p.id === id ? { ...p, status: novoStatus } : p
    ));
  }, []);

  // Estoque
  const atualizarEstoque = useCallback((id: number, novaQuantidade: number) => {
    setEstoque(prev => prev.map(item => 
      item.id === id ? { ...item, quantidade: novaQuantidade } : item
    ));
  }, []);

  const adicionarItemEstoque = useCallback((item: Omit<ItemEstoque, 'id'>) => {
    const novoItem: ItemEstoque = {
      ...item,
      id: Date.now(),
    };
    setEstoque(prev => [...prev, novoItem]);
  }, []);

  const value = {
    pizzas,
    pedidos,
    estoque,
    carregandoPizzas,
    adicionarPizza,
    editarPizza,
    deletarPizza,
    adicionarPedido,
    editarPedido,
    deletarPedido,
    atualizarStatusPedido,
    atualizarEstoque,
    adicionarItemEstoque,
  };

  return (
    <PizzariaContext.Provider value={value}>
      {children}
    </PizzariaContext.Provider>
  );
};
