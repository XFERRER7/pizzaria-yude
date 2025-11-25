import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PizzariaProvider } from './contexts/PizzariaContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Pizzas from './pages/Pizzas';
import Pedidos from './pages/Pedidos';
import Cardapio from './pages/Cardapio';
import Estoque from './pages/Estoque';
import Historico from './pages/Historico';
import Relatorio from './pages/Relatorio';
import Busca from './pages/Busca';

function App() {
  return (
    <PizzariaProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pizzas" element={<Pizzas />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/relatorio" element={<Relatorio />} />
            <Route path="/busca" element={<Busca />} />
          </Routes>
        </Layout>
      </Router>
    </PizzariaProvider>
  );
}

export default App;
