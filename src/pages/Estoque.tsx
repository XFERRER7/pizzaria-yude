import { usePizzaria } from '../contexts/PizzariaContext';
import { Package, AlertTriangle, Plus, Edit2 } from 'lucide-react';
import { useState } from 'react';

const Estoque = () => {
  const { estoque, atualizarEstoque, adicionarItemEstoque } = usePizzaria();
  const [editando, setEditando] = useState(null);
  const [novaQuantidade, setNovaQuantidade] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [novoItem, setNovoItem] = useState({
    nome: '',
    quantidade: '',
    unidade: 'kg',
    minimo: '',
  });

  const handleEditar = (item) => {
    setEditando(item.id);
    setNovaQuantidade(item.quantidade);
  };

  const handleSalvar = (id) => {
    atualizarEstoque(id, parseFloat(novaQuantidade));
    setEditando(null);
    setNovaQuantidade('');
  };

  const handleAdicionarItem = (e) => {
    e.preventDefault();
    adicionarItemEstoque({
      nome: novoItem.nome,
      quantidade: parseFloat(novoItem.quantidade),
      unidade: novoItem.unidade,
      minimo: parseFloat(novoItem.minimo),
    });
    setNovoItem({ nome: '', quantidade: '', unidade: 'kg', minimo: '' });
    setMostrarModal(false);
  };

  const itensEstoqueBaixo = estoque.filter(item => item.quantidade <= item.minimo);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Controle de Estoque</h1>
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition"
        >
          <Plus size={20} />
          <span>Novo Item</span>
        </button>
      </div>

      {/* Alerta de estoque baixo */}
      {itensEstoqueBaixo.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="text-yellow-400 mr-3" size={24} />
            <div>
              <h3 className="text-yellow-800 font-bold">Alerta!</h3>
              <p className="text-yellow-700">
                {itensEstoqueBaixo.length} {itensEstoqueBaixo.length === 1 ? 'item está' : 'itens estão'} com estoque baixo
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lista de itens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {estoque.map((item) => {
          const estoqueBaixo = item.quantidade <= item.minimo;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                estoqueBaixo ? 'border-2 border-yellow-400' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${estoqueBaixo ? 'bg-yellow-100' : 'bg-green-100'}`}>
                    <Package className={estoqueBaixo ? 'text-yellow-600' : 'text-green-600'} size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{item.nome}</h3>
                    <p className="text-sm text-gray-500">Mínimo: {item.minimo} {item.unidade}</p>
                  </div>
                </div>
              </div>

              {editando === item.id ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={novaQuantidade}
                      onChange={(e) => setNovaQuantidade(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <span className="text-gray-600">{item.unidade}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSalvar(item.id)}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditando(null)}
                      className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 transition text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-4xl font-bold text-gray-800">
                      {item.quantidade}
                    </span>
                    <span className="text-gray-600 text-lg">{item.unidade}</span>
                  </div>
                  <button
                    onClick={() => handleEditar(item)}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition"
                  >
                    <Edit2 size={16} />
                    <span>Atualizar</span>
                  </button>
                </div>
              )}

              {estoqueBaixo && (
                <div className="mt-3 flex items-center text-yellow-700 text-sm">
                  <AlertTriangle size={16} className="mr-1" />
                  <span>Estoque abaixo do mínimo!</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Adicionar Item */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Novo Item de Estoque</h2>
            </div>
            <form onSubmit={handleAdicionarItem} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nome do Item</label>
                  <input
                    type="text"
                    value={novoItem.nome}
                    onChange={(e) => setNovoItem({ ...novoItem, nome: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Quantidade</label>
                  <input
                    type="number"
                    step="0.01"
                    value={novoItem.quantidade}
                    onChange={(e) => setNovoItem({ ...novoItem, quantidade: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Unidade</label>
                  <select
                    value={novoItem.unidade}
                    onChange={(e) => setNovoItem({ ...novoItem, unidade: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="L">L</option>
                    <option value="ml">ml</option>
                    <option value="unidade">unidade</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Quantidade Mínima</label>
                  <input
                    type="number"
                    step="0.01"
                    value={novoItem.minimo}
                    onChange={(e) => setNovoItem({ ...novoItem, minimo: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estoque;
