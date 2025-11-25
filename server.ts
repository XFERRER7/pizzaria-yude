import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

interface PizzaServidor {
  id: number;
  nome: string;
  ingredientes: string;
  preco: number;
  tamanho: string;
  disponivel: boolean;
  origem: string;
}

// Mock de pizzas do servidor
const pizzasServidor: PizzaServidor[] = [
  {
    id: 9001,
    nome: 'Margherita',
    ingredientes: 'Molho de tomate, mussarela, manjericão fresco, azeite',
    preco: 35.90,
    tamanho: 'média',
    disponivel: true,
    origem: 'servidor',
  },
  {
    id: 9002,
    nome: 'Pepperoni',
    ingredientes: 'Molho de tomate, mussarela, pepperoni',
    preco: 42.90,
    tamanho: 'grande',
    disponivel: true,
    origem: 'servidor',
  },
  {
    id: 9003,
    nome: 'Quatro Queijos',
    ingredientes: 'Mussarela, gorgonzola, parmesão, provolone',
    preco: 45.90,
    tamanho: 'média',
    disponivel: true,
    origem: 'servidor',
  },
];

// Rota para buscar pizzas
app.get('/api/pizzas', (req: Request, res: Response) => {
  console.log('📡 Requisição recebida: GET /api/pizzas');
  res.json({
    success: true,
    data: pizzasServidor,
    message: 'Pizzas carregadas do servidor',
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor mock rodando em http://localhost:${PORT}`);
  console.log(`📋 Endpoint disponível: http://localhost:${PORT}/api/pizzas`);
});
