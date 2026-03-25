@echo off
echo ========================================
echo Atualizando dependencias do servidor...
echo ========================================

cd server

REM Verificar se node_modules existe
if not exist node_modules (
    echo Instalando dependencias pela primeira vez...
    call npm install
) else (
    echo Verificando atualizacoes...
    call npm install
)

cd ..

echo.
echo ========================================
echo Servidor atualizado!
echo ========================================
echo.
echo Para rodar o servidor: run_server.bat
echo Para rodar os testes: run_tests.bat
echo.
pause
