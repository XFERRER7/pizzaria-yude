import { usePizzaria } from '../contexts/PizzariaContext';
import { Pizza, Server } from 'lucide-react';

const Cardapio = () => {
  const { pizzas, carregandoPizzas } = usePizzaria();

  const pizzasDisponiveis = pizzas.filter(p => p.disponivel);

  if (carregandoPizzas) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando cardápio...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cardápio</h1>

      {pizzasDisponiveis.length === 0 ? (
        <div className="text-center py-12">
          <Pizza size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Nenhuma pizza disponível no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzasDisponiveis.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 h-32 flex items-center justify-center">
                <Pizza size={64} className="text-white" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-gray-800">{pizza.nome}</h3>
                  <div className="flex flex-col items-end gap-1">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {pizza.tamanho}
                    </span>
                    {pizza.origem === 'servidor' && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
                        <Server size={12} />
                        Servidor
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {pizza.ingredientes}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-red-600">
                    R$ {pizza.preco.toFixed(2)}
                  </span>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                    Pedir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cardapio;
