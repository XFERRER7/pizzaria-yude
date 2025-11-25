import { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Pizza, 
  Package, 
  TrendingUp, 
  BookOpen, 
  Menu,
  X,
  ShoppingCart,
  Search
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/pizzas', icon: Pizza, label: 'Pizzas' },
    { path: '/pedidos', icon: ShoppingCart, label: 'Pedidos' },
    // { path: '/cardapio', icon: BookOpen, label: 'Cardápio' },
    { path: '/estoque', icon: Package, label: 'Estoque' },
    { path: '/historico', icon: TrendingUp, label: 'Histórico' },
    { path: '/relatorio', icon: TrendingUp, label: 'Relatório' },
    // { path: '/busca', icon: Search, label: 'Busca' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-red-600 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center space-x-2">
              <Pizza size={32} />
              <h1 className="text-2xl font-bold">Pizzaria Yude</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-full bg-white shadow-lg transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64`}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-red-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-16 lg:ml-64 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
