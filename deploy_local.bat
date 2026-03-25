@echo off
chcp 65001 >nul
cls
echo ╔════════════════════════════════════════════════════════════╗
echo ║           DEPLOY LOCAL - MODO PRODUCAO                    ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo Este script irá:
echo  1. Compilar o backend
echo  2. Compilar o frontend
echo  3. Copiar frontend para o backend (servir tudo junto)
echo  4. Iniciar o servidor em modo produção
echo.
pause

cd /d "%~dp0"

REM Build do servidor
echo ╔════════════════════════════════════════════════════════════╗
echo ║ [1/4] Compilando Backend...                               ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
cd server
call npm install
call npm run build
if errorlevel 1 (
    echo.
    echo ❌ ERRO ao compilar servidor!
    pause
    exit /b 1
)
echo ✅ Backend compilado com sucesso!
echo.
cd ..

REM Build do cliente
echo ╔════════════════════════════════════════════════════════════╗
echo ║ [2/4] Compilando Frontend...                              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
cd client
call npm install
call npm run build
if errorlevel 1 (
    echo.
    echo ❌ ERRO ao compilar cliente!
    pause
    exit /b 1
)
echo ✅ Frontend compilado com sucesso!
echo.
cd ..

REM Copiar build do cliente para o servidor
echo ╔════════════════════════════════════════════════════════════╗
echo ║ [3/4] Copiando arquivos do cliente para servidor...       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
if not exist "server\public" mkdir server\public
xcopy /E /I /Y client\dist server\public
echo ✅ Arquivos copiados!
echo.

echo ╔════════════════════════════════════════════════════════════╗
echo ║ [4/4] Iniciando servidor em MODO PRODUCAO...              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 🌐 Servidor estará disponível em: http://localhost:3000
echo.
echo ⚠️  IMPORTANTE: Dados serão armazenados em memória!
echo    Reiniciar o servidor apagará todos os dados.
echo.
echo 🛑 Para parar o servidor: Pressione Ctrl+C
echo.
pause

cd server
set NODE_ENV=production
set PORT=3000
node dist\server.js
