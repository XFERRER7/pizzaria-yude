import { useState } from 'react';
import { usePizzaria } from '../contexts/PizzariaContext';
import { Plus, Edit2, Trash2, X, AlertCircle, Pizza } from 'lucide-react';

const Pizzas = () => {
  const { pizzas, adicionarPizza, editarPizza, deletarPizza } = usePizzaria();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pizzaEditando, setPizzaEditando] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    ingredientes: '',
    preco: '',
    tamanho: 'média',
    disponivel: true,
  });

  const resetForm = () => {
    setFormData({
      nome: '',
      ingredientes: '',
      preco: '',
      tamanho: 'média',
      disponivel: true,
    });
    setPizzaEditando(null);
  };

  const abrirModal = (pizza = null) => {
    if (pizza) {
      setFormData({
        nome: pizza.nome,
        ingredientes: pizza.ingredientes,
        preco: pizza.preco,
        tamanho: pizza.tamanho,
        disponivel: pizza.disponivel,
      });
      setPizzaEditando(pizza);
    } else {
      resetForm();
    }
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pizzaData = {
      ...formData,
      preco: parseFloat(formData.preco),
    };

    if (pizzaEditando) {
      editarPizza(pizzaEditando.id, pizzaData);
    } else {
      adicionarPizza(pizzaData);
    }

    fecharModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta pizza?')) {
      deletarPizza(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Pizzas</h1>
        <button
          onClick={() => abrirModal()}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition"
        >
          <Plus size={20} />
          <span>Nova Pizza</span>
        </button>
      </div>

      {/* Banner informativo */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex items-center">
          <Pizza className="text-blue-500 mr-3" size={24} />
          <div>
            <h3 className="text-blue-800 font-bold">Pizzas Originais</h3>
            <p className="text-blue-700 text-sm">
              Pizzas marcadas com <AlertCircle className="inline" size={14} /> são originais da casa 
              não podem ser editadas ou excluídas.
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Pizzas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma pizza cadastrada ainda.</p>
          </div>
        ) : (
          pizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-800">{pizza.nome}</h3>
                  {pizza.origem === 'servidor' && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                      <Pizza size={12} />
                      Original
                    </span>
                  )}
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    pizza.disponivel
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {pizza.disponivel ? 'Disponível' : 'Indisponível'}
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                <strong>Ingredientes:</strong> {pizza.ingredientes}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Tamanho:</strong> {pizza.tamanho}
              </p>
              <p className="text-2xl font-bold text-red-600 mb-4">
                R$ {pizza.preco.toFixed(2)}
              </p>
              {pizza.origem === 'servidor' ? (
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-center text-sm">
                  Pizza original da casa (somente leitura)
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => abrirModal(pizza)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition"
                  >
                    <Edit2 size={16} />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDelete(pizza.id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition"
                  >
                    <Trash2 size={16} />
                    <span>Deletar</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {pizzaEditando ? 'Editar Pizza' : 'Nova Pizza'}
              </h2>
              <button
                onClick={fecharModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nome da Pizza
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Ingredientes
                  </label>
                  <textarea
                    value={formData.ingredientes}
                    onChange={(e) =>
                      setFormData({ ...formData, ingredientes: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Tamanho
                  </label>
                  <select
                    value={formData.tamanho}
                    onChange={(e) => setFormData({ ...formData, tamanho: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="pequena">Pequena</option>
                    <option value="média">Média</option>
                    <option value="grande">Grande</option>
                    <option value="família">Família</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.preco}
                    onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.disponivel}
                    onChange={(e) =>
                      setFormData({ ...formData, disponivel: e.target.checked })
                    }
                    className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-gray-700 font-medium">
                    Disponível para venda
                  </label>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
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
                  {pizzaEditando ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pizzas;
