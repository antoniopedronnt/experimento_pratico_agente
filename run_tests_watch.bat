@echo off
chcp 65001 >nul
cls
echo ╔════════════════════════════════════════════════════════════╗
echo ║           TESTES EM MODO WATCH (Desenvolvimento)          ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo Este modo executa os testes automaticamente sempre que
echo você modificar os arquivos de teste ou código.
echo.
echo ⚠️  Para sair, pressione Ctrl+C
echo.
pause

cd /d "%~dp0\server"

echo.
echo ════════════════════════════════════════════════════════════
echo Iniciando modo watch...
echo ════════════════════════════════════════════════════════════
echo.

REM Verifica se existe script de watch no package.json
findstr /C:"test:watch" package.json >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Script 'test:watch' não encontrado no package.json
    echo.
    echo Executando testes em loop manual...
    echo Pressione Ctrl+C para sair
    echo.
    :loop
    cls
    echo ════════════════════════════════════════════════════════════
    echo Executando testes... (Ctrl+C para sair)
    echo ════════════════════════════════════════════════════════════
    echo.
    call npm test
    echo.
    echo Aguardando 5 segundos antes de executar novamente...
    timeout /t 5 >nul
    goto loop
) else (
    call npm run test:watch
)
