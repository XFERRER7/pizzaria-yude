import { usePizzaria } from '../contexts/PizzariaContext';
import { BarChart3, TrendingUp, PieChart, Calendar } from 'lucide-react';
import { useState } from 'react';

const Relatorio = () => {
  const { pedidos, pizzas } = usePizzaria();
  const [periodo, setPeriodo] = useState('todos');

  // Filtrar pedidos finalizados
  const pedidosFinalizados = pedidos.filter(p => p.status === 'Finalizado');

  // Filtrar por período
  const getFiltrados = () => {
    const hoje = new Date();
    const umDiaMs = 24 * 60 * 60 * 1000;

    return pedidosFinalizados.filter(p => {
      const dataPedido = new Date(p.data);
      const diferencaDias = (hoje - dataPedido) / umDiaMs;

      switch (periodo) {
        case 'hoje':
          return diferencaDias < 1;
        case 'semana':
          return diferencaDias <= 7;
        case 'mes':
          return diferencaDias <= 30;
        default:
          return true;
      }
    });
  };

  const pedidosFiltrados = getFiltrados();

  // Cálculos
  const totalVendas = pedidosFiltrados.reduce((acc, p) => acc + p.total, 0);
  const quantidadePedidos = pedidosFiltrados.length;
  const ticketMedio = quantidadePedidos > 0 ? totalVendas / quantidadePedidos : 0;

  // Pizza mais vendida
  const vendasPorPizza = {};
  pedidosFiltrados.forEach(pedido => {
    if (vendasPorPizza[pedido.pizza]) {
      vendasPorPizza[pedido.pizza].quantidade += pedido.quantidade;
      vendasPorPizza[pedido.pizza].total += pedido.total;
    } else {
      vendasPorPizza[pedido.pizza] = {
        nome: pedido.pizza,
        quantidade: pedido.quantidade,
        total: pedido.total,
      };
    }
  });

  const rankingPizzas = Object.values(vendasPorPizza)
    .sort((a, b) => b.quantidade - a.quantidade);

  // Vendas por status
  const statusCount = {};
  pedidos.forEach(p => {
    statusCount[p.status] = (statusCount[p.status] || 0) + 1;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Relatório de Vendas</h1>
        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="todos">Todos os períodos</option>
          <option value="hoje">Hoje</option>
          <option value="semana">Última semana</option>
          <option value="mes">Último mês</option>
        </select>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={32} />
            <span className="text-sm font-medium opacity-90">Faturamento</span>
          </div>
          <p className="text-3xl font-bold">R$ {totalVendas.toFixed(2)}</p>
          <p className="text-sm opacity-75 mt-1">{quantidadePedidos} pedidos</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 size={32} />
            <span className="text-sm font-medium opacity-90">Ticket Médio</span>
          </div>
          <p className="text-3xl font-bold">R$ {ticketMedio.toFixed(2)}</p>
          <p className="text-sm opacity-75 mt-1">Por pedido</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <PieChart size={32} />
            <span className="text-sm font-medium opacity-90">Pedidos</span>
          </div>
          <p className="text-3xl font-bold">{quantidadePedidos}</p>
          <p className="text-sm opacity-75 mt-1">Finalizados</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pizzas Mais Vendidas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <BarChart3 className="mr-2 text-red-600" size={24} />
            Pizzas Mais Vendidas
          </h2>
          {rankingPizzas.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhuma venda no período selecionado.</p>
          ) : (
            <div className="space-y-4">
              {rankingPizzas.slice(0, 5).map((pizza, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 text-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{pizza.nome}</p>
                      <p className="text-sm text-gray-500">{pizza.quantidade} vendidas</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600">R$ {pizza.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status dos Pedidos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="mr-2 text-red-600" size={24} />
            Status dos Pedidos
          </h2>
          <div className="space-y-3">
            {Object.entries(statusCount).map(([status, count]) => {
              const total = pedidos.length;
              const porcentagem = ((count / total) * 100).toFixed(1);
              const cores = {
                'Pendente': 'bg-yellow-500',
                'Em Preparo': 'bg-blue-500',
                'Saiu para Entrega': 'bg-purple-500',
                'Finalizado': 'bg-green-500',
                'Cancelado': 'bg-red-500',
              };

              return (
                <div key={status}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 font-medium">{status}</span>
                    <span className="text-gray-600">{count} ({porcentagem}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${cores[status] || 'bg-gray-500'} h-2 rounded-full`}
                      style={{ width: `${porcentagem}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabela de Todas as Pizzas */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Todas as Pizzas Cadastradas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pizza</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tamanho</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pizzas.map(pizza => (
                <tr key={pizza.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {pizza.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pizza.tamanho}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {pizza.preco.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      pizza.disponivel 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {pizza.disponivel ? 'Disponível' : 'Indisponível'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Relatorio;
