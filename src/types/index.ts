export interface Pizza {
  id: number;
  nome: string;
  ingredientes: string;
  preco: number;
  tamanho: 'pequena' | 'média' | 'grande' | 'família';
  disponivel: boolean;
  dataCriacao?: string;
  origem?: 'servidor' | 'local';
}

export interface Pedido {
  id: number;
  cliente: string;
  telefone: string;
  endereco: string;
  pizza: string;
  quantidade: number;
  total: number;
  observacoes?: string;
  data: string;
  status: 'Pendente' | 'Em Preparo' | 'Saiu para Entrega' | 'Finalizado' | 'Cancelado';
}

export interface ItemEstoque {
  id: number;
  nome: string;
  quantidade: number;
  unidade: 'kg' | 'g' | 'L' | 'ml' | 'unidade';
  minimo: number;
}

export interface PizzariaContextType {
  pizzas: Pizza[];
  pedidos: Pedido[];
  estoque: ItemEstoque[];
  carregandoPizzas: boolean;
  adicionarPizza: (pizza: Omit<Pizza, 'id' | 'dataCriacao'>) => void;
  editarPizza: (id: number, pizza: Omit<Pizza, 'id'>) => void;
  deletarPizza: (id: number) => void;
  adicionarPedido: (pedido: Omit<Pedido, 'id' | 'data' | 'status'>) => void;
  editarPedido: (id: number, pedido: Omit<Pedido, 'id'>) => void;
  deletarPedido: (id: number) => void;
  atualizarStatusPedido: (id: number, novoStatus: Pedido['status']) => void;
  atualizarEstoque: (id: number, novaQuantidade: number) => void;
  adicionarItemEstoque: (item: Omit<ItemEstoque, 'id'>) => void;
}
