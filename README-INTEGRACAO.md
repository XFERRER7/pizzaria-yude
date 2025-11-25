# 🍕 Sistema de Gerenciamento de Pizzaria Yude

Sistema completo para gerenciamento de pizzaria desenvolvido em React com **integração híbrida**: dados do servidor + localStorage.

## 🌐 Arquitetura Híbrida

O sistema agora possui **integração com backend** para o cardápio de pizzas:

### Como Funciona:

1. **Servidor Mock (localhost:3000)**
   - Fornece 3 pizzas base do "cardápio oficial"
   - Endpoint: `GET /api/pizzas`
   - Pizzas marcadas com badge "Servidor" ou "API"

2. **LocalStorage**
   - Armazena pizzas criadas localmente pelo usuário
   - Persiste pedidos e controle de estoque
   - Dados mesclados com pizzas do servidor

3. **Mesclagem Inteligente**
   - Sistema busca pizzas do servidor ao iniciar
   - Mescla com pizzas locais (evita duplicatas)
   - Pizzas do servidor são somente leitura
   - Pizzas locais podem ser editadas/excluídas

## 🚀 Como Executar

### Opção 1: Servidor + Frontend (Recomendado)
```bash
# Instalar dependências
npm install

# Executar servidor e frontend simultaneamente
npm run dev:full
```

### Opção 2: Separadamente
```bash
# Terminal 1 - Servidor Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

### Opção 3: Apenas Frontend (modo offline)
```bash
npm run dev
# Sistema funciona normalmente, mas sem pizzas do servidor
```

## 📡 Endpoints do Servidor

### GET /api/pizzas
```json
{
  "success": true,
  "data": [
    {
      "id": 9001,
      "nome": "Margherita",
      "ingredientes": "Molho de tomate, mussarela, manjericão fresco, azeite",
      "preco": 35.90,
      "tamanho": "média",
      "disponivel": true,
      "origem": "servidor"
    }
  ],
  "message": "Pizzas carregadas do servidor"
}
```

## 🎯 Funcionalidades (8 no total)

### 1. 📊 Dashboard
- Estatísticas em tempo real
- Alertas de estoque baixo
- Pedidos recentes

### 2. 🍕 CRUD de Pizzas (HÍBRIDO)
- ✅ Pizzas do servidor (somente leitura)
- ✅ Pizzas locais (CRUD completo)
- Badge visual diferenciando origem

### 3. 🛒 CRUD de Pedidos
- Criar, editar, excluir pedidos
- Gerenciar status
- Dados salvos em localStorage

### 4. 📖 Cardápio (HÍBRIDO)
- Mostra pizzas do servidor + locais
- Badge azul indica pizzas da API
- Spinner de carregamento

### 5. 📦 Controle de Estoque
- Gerenciar ingredientes
- Alertas automáticos

### 6. 📈 Histórico de Vendas
- Pedidos finalizados
- Estatísticas de vendas

### 7. 📊 Relatório de Vendas
- Filtros por período
- Ranking de pizzas

### 8. 🔍 Busca e Filtros
- Buscar pizzas (servidor + local)
- Filtrar pedidos

## 🛠️ Tecnologias

**Frontend:**
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React (ícones)
- Context API

**Backend:**
- Node.js
- Express
- CORS

**Persistência:**
- LocalStorage (dados locais)
- API REST (dados do servidor)

## 💡 Diferenciais da Integração

### Indicadores Visuais
- 🔵 Badge "Servidor" ou "API" - Pizza vem do backend
- 🟢 Badge "Disponível" - Status da pizza
- ⚠️ Banner informativo sobre integração

### Comportamento Inteligente
- Sistema funciona offline (fallback para localStorage)
- Carregamento assíncrono com loading spinner
- Mesclagem automática de dados
- Proteção contra edição de dados do servidor

### Console Logs
```javascript
✅ Pizzas carregadas do servidor: [...]
⚠️ Servidor offline, usando apenas localStorage
```

## 🎨 Interface

- **Cards de Pizzas**: Mostram origem (servidor/local)
- **Loading State**: Spinner enquanto busca do servidor
- **Banner Informativo**: Explica integração com backend
- **Botões Condicionais**: Editar/Deletar apenas pizzas locais

## 📱 Exemplo de Fluxo

1. Usuário acessa o sistema
2. Sistema busca pizzas de `localhost:3000`
3. Carrega pizzas locais do localStorage
4. Mescla as duas fontes
5. Exibe no cardápio com badges
6. Usuário pode adicionar pizzas locais
7. Pizzas do servidor permanecem imutáveis

## 🔧 Configuração do Servidor

Arquivo: `server.js`
```javascript
// Pizzas mockadas
const pizzasServidor = [
  { id: 9001, nome: 'Margherita', ... },
  { id: 9002, nome: 'Pepperoni', ... },
  { id: 9003, nome: 'Quatro Queijos', ... }
];
```

**Porta:** 3000  
**CORS:** Habilitado  
**Formato:** ES6 Modules

## 📝 Notas Técnicas

- IDs do servidor: 9000+
- IDs locais: baseados em timestamp
- Filtro de duplicatas por ID
- Pizzas do servidor não são salvas no localStorage
- Context atualizado com `carregandoPizzas` state

---

**Desenvolvido para Pizzaria Yude**  
Sistema híbrido com integração backend + localStorage 🚀
