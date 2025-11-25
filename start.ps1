# 🚀 Script de Inicialização - Sistema Pizzaria Yude

Write-Host "🍕 Iniciando Sistema de Gerenciamento de Pizzaria Yude..." -ForegroundColor Green
Write-Host ""

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "🌐 Iniciando servidor backend (porta 3000)..." -ForegroundColor Cyan
Write-Host "⚛️  Iniciando frontend React (porta 5173/5174)..." -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Sistema estará disponível em:" -ForegroundColor Green
Write-Host "   Frontend: http://localhost:5173 ou http://localhost:5174" -ForegroundColor White
Write-Host "   Backend:  http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "📡 Pizzas do servidor serão carregadas automaticamente!" -ForegroundColor Magenta
Write-Host ""
Write-Host "Pressione Ctrl+C para encerrar" -ForegroundColor Yellow
Write-Host ""

# Executar servidor e frontend simultaneamente
npm run dev:full
