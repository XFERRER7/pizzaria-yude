import { usePizzaria } from '../contexts/PizzariaContext';
import { Pizza, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, LucideIcon } from 'lucide-react';

interface StatCard {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

const Dashboard = () => {
  const { pizzas, pedidos, estoque } = usePizzaria();

  // Estatísticas
  const pedidosPendentes = pedidos.filter(p => p.status === 'Pendente').length;
  const pedidosFinalizados = pedidos.filter(p => p.status === 'Finalizado').length;
  const totalVendas = pedidos
    .filter(p => p.status === 'Finalizado')
    .reduce((acc, p) => acc + p.total, 0);
  
  const itensEstoqueBaixo = estoque.filter(item => item.quantidade <= item.minimo);

  const cards: StatCard[] = [
    {
      title: 'Total de Pizzas',
      value: pizzas.length,
      icon: Pizza,
      color: 'bg-blue-500',
    },
    {
      title: 'Pedidos Pendentes',
      value: pedidosPendentes,
      icon: ShoppingCart,
      color: 'bg-yellow-500',
    },
    {
      title: 'Pedidos Finalizados',
      value: pedidosFinalizados,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Total em Vendas',
      value: `R$ ${totalVendas.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {card.value}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alertas de Estoque */}
      {itensEstoqueBaixo.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex items-center">
            <AlertTriangle className="text-red-500 mr-3" size={24} />
            <div>
              <h3 className="text-red-800 font-bold">Alerta de Estoque Baixo</h3>
              <p className="text-red-700">
                {itensEstoqueBaixo.length} {itensEstoqueBaixo.length === 1 ? 'item está' : 'itens estão'} com estoque abaixo do mínimo
              </p>
              <ul className="mt-2 list-disc list-inside">
                {itensEstoqueBaixo.map(item => (
                  <li key={item.id} className="text-red-600">
                    {item.nome}: {item.quantidade} {item.unidade} (mínimo: {item.minimo})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Pedidos Recentes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Pedidos Recentes</h2>
        {pedidos.length === 0 ? (
          <p className="text-gray-500">Nenhum pedido cadastrado ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Cliente</th>
                  <th className="text-left py-3 px-4">Pizza</th>
                  <th className="text-left py-3 px-4">Total</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.slice(-5).reverse().map(pedido => (
                  <tr key={pedido.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{pedido.cliente}</td>
                    <td className="py-3 px-4">{pedido.pizza}</td>
                    <td className="py-3 px-4">R$ {pedido.total.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          pedido.status === 'Finalizado'
                            ? 'bg-green-100 text-green-800'
                            : pedido.status === 'Em Preparo'
                            ? 'bg-blue-100 text-blue-800'
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
