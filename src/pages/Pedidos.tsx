import { useState, FormEvent } from 'react';
import { usePizzaria } from '../contexts/PizzariaContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Pedido } from '../types';

const Pedidos = () => {
  const { pedidos, pizzas, adicionarPedido, editarPedido, deletarPedido, atualizarStatusPedido } = usePizzaria();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pedidoEditando, setPedidoEditando] = useState<Pedido | null>(null);
  const [formData, setFormData] = useState({
    cliente: '',
    telefone: '',
    endereco: '',
    pizza: '',
    quantidade: 1,
    observacoes: '',
  });

  const resetForm = () => {
    setFormData({
      cliente: '',
      telefone: '',
      endereco: '',
      pizza: '',
      quantidade: 1,
      observacoes: '',
    });
    setPedidoEditando(null);
  };

  const abrirModal = (pedido: Pedido | null = null) => {
    if (pedido) {
      setFormData({
        cliente: pedido.cliente,
        telefone: pedido.telefone,
        endereco: pedido.endereco,
        pizza: pedido.pizza,
        quantidade: pedido.quantidade,
        observacoes: pedido.observacoes || '',
      });
      setPedidoEditando(pedido);
    } else {
      resetForm();
    }
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    resetForm();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const pizzaSelecionada = pizzas.find(p => p.nome === formData.pizza);
    const total = pizzaSelecionada ? pizzaSelecionada.preco * formData.quantidade : 0;

    const pedidoData = {
      ...formData,
      total,
    };

    if (pedidoEditando) {
      editarPedido(pedidoEditando.id, { 
        ...pedidoData, 
        status: pedidoEditando.status,
        data: pedidoEditando.data 
      });
    } else {
      adicionarPedido(pedidoData);
    }

    fecharModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este pedido?')) {
      deletarPedido(id);
    }
  };

  const handleStatusChange = (id: number, novoStatus: Pedido['status']) => {
    atualizarStatusPedido(id, novoStatus);
  };

  const getStatusColor = (status: Pedido['status']) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em Preparo':
        return 'bg-blue-100 text-blue-800';
      case 'Saiu para Entrega':
        return 'bg-purple-100 text-purple-800';
      case 'Finalizado':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Pedidos</h1>
        <button
          onClick={() => abrirModal()}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition"
        >
          <Plus size={20} />
          <span>Novo Pedido</span>
        </button>
      </div>

      {/* Lista de Pedidos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {pedidos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum pedido cadastrado ainda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pizza
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qtd
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {pedido.cliente}
                      </div>
                      <div className="text-sm text-gray-500">{pedido.endereco}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pedido.telefone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pedido.pizza}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pedido.quantidade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      R$ {pedido.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={pedido.status}
                        onChange={(e) => handleStatusChange(pedido.id, e.target.value as Pedido['status'])}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          pedido.status
                        )}`}
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Em Preparo">Em Preparo</option>
                        <option value="Saiu para Entrega">Saiu para Entrega</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => abrirModal(pedido)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(pedido.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl  w-[30rem] my-8 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
              <h2 className="text-2xl font-bold text-gray-800">
                {pedidoEditando ? 'Editar Pedido' : 'Novo Pedido'}
              </h2>
              <button
                onClick={fecharModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nome do Cliente
                  </label>
                  <input
                    type="text"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Pizza
                  </label>
                  <select
                    value={formData.pizza}
                    onChange={(e) => setFormData({ ...formData, pizza: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Selecione uma pizza</option>
                    {pizzas.filter(p => p.disponivel).map((pizza) => (
                      <option key={pizza.id} value={pizza.nome}>
                        {pizza.nome} - R$ {pizza.preco.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantidade}
                    onChange={(e) => setFormData({ ...formData, quantidade: Number(e.target.value) })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Observações
                  </label>
                  <textarea
                    value={formData.observacoes}
                    onChange={(e) =>
                      setFormData({ ...formData, observacoes: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex space-x-3 p-6 border-t flex-shrink-0 bg-gray-50">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  {pedidoEditando ? 'Salvar' : 'Criar Pedido'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
