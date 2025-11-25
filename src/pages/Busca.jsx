import { usePizzaria } from '../contexts/PizzariaContext';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

const Busca = () => {
  const { pizzas, pedidos } = usePizzaria();
  const [termoBusca, setTermoBusca] = useState('');
  const [tipoBusca, setTipoBusca] = useState('pizzas');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  // Buscar pizzas
  const pizzasFiltradas = pizzas.filter(pizza => {
    const termo = termoBusca.toLowerCase();
    return (
      pizza.nome.toLowerCase().includes(termo) ||
      pizza.ingredientes.toLowerCase().includes(termo) ||
      pizza.tamanho.toLowerCase().includes(termo)
    );
  });

  // Buscar pedidos
  const pedidosFiltrados = pedidos.filter(pedido => {
    const termo = termoBusca.toLowerCase();
    const matchBusca =
      pedido.cliente.toLowerCase().includes(termo) ||
      pedido.pizza.toLowerCase().includes(termo) ||
      pedido.telefone.toLowerCase().includes(termo) ||
      pedido.endereco.toLowerCase().includes(termo);

    const matchStatus = filtroStatus === 'todos' || pedido.status === filtroStatus;

    return matchBusca && matchStatus;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Busca e Filtros</h1>

      {/* Barra de Busca */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={tipoBusca}
              onChange={(e) => setTipoBusca(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="pizzas">Pizzas</option>
              <option value="pedidos">Pedidos</option>
            </select>
            {tipoBusca === 'pedidos' && (
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="todos">Todos Status</option>
                <option value="Pendente">Pendente</option>
                <option value="Em Preparo">Em Preparo</option>
                <option value="Saiu para Entrega">Saiu para Entrega</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Resultados {tipoBusca === 'pizzas' ? 'de Pizzas' : 'de Pedidos'}
          </h2>
          <span className="text-gray-500">
            {tipoBusca === 'pizzas' ? pizzasFiltradas.length : pedidosFiltrados.length} encontrado(s)
          </span>
        </div>

        {tipoBusca === 'pizzas' ? (
          // Resultados de Pizzas
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pizzasFiltradas.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Filter size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg">Nenhuma pizza encontrada.</p>
              </div>
            ) : (
              pizzasFiltradas.map((pizza) => (
                <div
                  key={pizza.id}
                  className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800">{pizza.nome}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        pizza.disponivel
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {pizza.disponivel ? 'Disponível' : 'Indisponível'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Ingredientes:</strong> {pizza.ingredientes}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Tamanho:</strong> {pizza.tamanho}
                  </p>
                  <p className="text-xl font-bold text-red-600">
                    R$ {pizza.preco.toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
        ) : (
          // Resultados de Pedidos
          <div className="overflow-x-auto">
            {pedidosFiltrados.length === 0 ? (
              <div className="text-center py-12">
                <Filter size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg">Nenhum pedido encontrado.</p>
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Telefone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Pizza
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Qtd
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pedidosFiltrados.map((pedido) => (
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
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            pedido.status === 'Finalizado'
                              ? 'bg-green-100 text-green-800'
                              : pedido.status === 'Em Preparo'
                              ? 'bg-blue-100 text-blue-800'
                              : pedido.status === 'Cancelado'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {pedido.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Busca;
