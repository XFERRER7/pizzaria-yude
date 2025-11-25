# 🍕 Sistema de Gerenciamento de Pizzaria Yude

Sistema completo para gerenciamento de pizzaria desenvolvido em React com armazenamento local (localStorage).

## 🚀 Funcionalidades

O sistema possui **8 funcionalidades principais**:

### 1. 📊 Dashboard
- Visão geral do negócio com estatísticas em tempo real
- Total de pizzas cadastradas
- Pedidos pendentes e finalizados
- Total de vendas
- Alertas de estoque baixo
- Lista de pedidos recentes

### 2. 🍕 CRUD de Pizzas
- Cadastrar novas pizzas com nome, ingredientes, tamanho e preço
- Editar pizzas existentes
- Excluir pizzas
- Marcar pizzas como disponíveis/indisponíveis
- Visualização em cards responsivos

### 3. 🛒 CRUD de Pedidos
- Criar novos pedidos com dados do cliente
- Selecionar pizzas disponíveis
- Editar informações dos pedidos
- Excluir pedidos
- Atualizar status do pedido (Pendente, Em Preparo, Saiu para Entrega, Finalizado, Cancelado)
- Visualização em tabela completa

### 4. 📖 Cardápio
- Visualização pública do cardápio
- Exibe apenas pizzas disponíveis
- Design atrativo com cards
- Informações de preço, ingredientes e tamanho

### 5. 📦 Controle de Estoque
- Gerenciar ingredientes e insumos
- Atualizar quantidades
- Adicionar novos itens ao estoque
- Alertas automáticos para itens com estoque abaixo do mínimo
- Suporte para diferentes unidades de medida (kg, g, L, ml, unidade)

### 6. 📈 Histórico de Vendas
- Visualizar todos os pedidos finalizados
- Estatísticas de total de vendas
- Quantidade de pedidos
- Ticket médio
- Listagem completa com dados dos clientes

### 7. 📊 Relatório de Vendas
- Filtros por período (hoje, última semana, último mês, todos)
- Ranking de pizzas mais vendidas
- Gráfico de status dos pedidos
- Métricas de faturamento e ticket médio
- Lista completa de pizzas cadastradas

### 8. 🔍 Busca e Filtros
- Buscar pizzas por nome, ingredientes ou tamanho
- Buscar pedidos por cliente, pizza, telefone ou endereço
- Filtrar pedidos por status
- Resultados em tempo real

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript
- **Vite** - Build tool e dev server
- **React Router DOM** - Gerenciamento de rotas
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Context API** - Gerenciamento de estado
- **LocalStorage** - Persistência de dados

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 💾 Armazenamento de Dados

Todos os dados são salvos automaticamente no **localStorage** do navegador:
- `pizzas` - Lista de pizzas cadastradas
- `pedidos` - Lista de pedidos
- `estoque` - Itens do estoque

Os dados persistem mesmo após fechar o navegador!

## 🎨 Interface

- Design moderno e responsivo
- Sidebar com navegação
- Cards informativos
- Tabelas interativas
- Modais para formulários
- Sistema de cores intuitivo para status
- Alertas visuais

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop
- Tablets
- Smartphones

## 🔄 Status de Pedidos

- **Pendente** (Amarelo) - Pedido recebido
- **Em Preparo** (Azul) - Pizza sendo preparada
- **Saiu para Entrega** (Roxo) - Pedido a caminho
- **Finalizado** (Verde) - Pedido concluído
- **Cancelado** (Vermelho) - Pedido cancelado

## 🎯 Estoque Inicial

O sistema vem com itens de estoque pré-cadastrados:
- Mussarela (100 kg)
- Tomate (50 kg)
- Presunto (40 kg)
- Calabresa (35 kg)
- Cebola (30 kg)
- Azeitona (25 kg)
- Massa (80 kg)

## 👨‍💻 Desenvolvido por

Sistema de gerenciamento para Pizzaria Yude

---

**Nota**: Este é um projeto de demonstração sem backend. Todos os dados são armazenados localmente no navegador.
