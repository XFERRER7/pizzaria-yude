import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PizzariaContext = createContext();

export const usePizzaria = () => {
  const context = useContext(PizzariaContext);
  if (!context) {
    throw new Error('usePizzaria deve ser usado dentro de PizzariaProvider');
  }
  return context;
};

export const PizzariaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [estoque, setEstoque] = useState([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const pizzasSalvas = localStorage.getItem('pizzas');
    const pedidosSalvos = localStorage.getItem('pedidos');
    const estoqueSalvo = localStorage.getItem('estoque');

    if (pizzasSalvas) setPizzas(JSON.parse(pizzasSalvas));
    if (pedidosSalvos) setPedidos(JSON.parse(pedidosSalvos));
    if (estoqueSalvo) {
      setEstoque(JSON.parse(estoqueSalvo));
    } else {
      // Estoque inicial
      const estoqueInicial = [
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
  }, []);

  // Salvar pizzas no localStorage
  useEffect(() => {
    if (pizzas.length > 0) {
      localStorage.setItem('pizzas', JSON.stringify(pizzas));
    }
  }, [pizzas]);

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
  const adicionarPizza = (pizza) => {
    const novaPizza = {
      ...pizza,
      id: Date.now(),
      dataCriacao: new Date().toISOString(),
    };
    setPizzas([...pizzas, novaPizza]);
  };

  const editarPizza = (id, pizzaAtualizada) => {
    setPizzas(pizzas.map(p => p.id === id ? { ...pizzaAtualizada, id } : p));
  };

  const deletarPizza = (id) => {
    setPizzas(pizzas.filter(p => p.id !== id));
  };

  // CRUD Pedidos
  const adicionarPedido = (pedido) => {
    const novoPedido = {
      ...pedido,
      id: Date.now(),
      data: new Date().toISOString(),
      status: 'Pendente',
    };
    setPedidos([...pedidos, novoPedido]);
  };

  const editarPedido = (id, pedidoAtualizado) => {
    setPedidos(pedidos.map(p => p.id === id ? { ...pedidoAtualizado, id } : p));
  };

  const deletarPedido = (id) => {
    setPedidos(pedidos.filter(p => p.id !== id));
  };

  const atualizarStatusPedido = (id, novoStatus) => {
    setPedidos(pedidos.map(p => 
      p.id === id ? { ...p, status: novoStatus } : p
    ));
  };

  // Estoque
  const atualizarEstoque = (id, novaQuantidade) => {
    setEstoque(estoque.map(item => 
      item.id === id ? { ...item, quantidade: novaQuantidade } : item
    ));
  };

  const adicionarItemEstoque = (item) => {
    const novoItem = {
      ...item,
      id: Date.now(),
    };
    setEstoque([...estoque, novoItem]);
  };

  const value = {
    pizzas,
    pedidos,
    estoque,
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

PizzariaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
