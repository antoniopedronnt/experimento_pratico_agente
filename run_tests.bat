@echo off
chcp 65001 >nul
cls
echo ╔════════════════════════════════════════════════════════════╗
echo ║          EXECUTAR TESTES CUCUMBER - GHERKIN               ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo [1/4] Verificando pasta do servidor...
if not exist "server" (
    echo ❌ ERRO: Pasta 'server' não encontrada!
    pause
    exit /b 1
)

cd server

echo ✅ Pasta encontrada
echo.

echo [2/4] Verificando node_modules...
if not exist "node_modules" (
    echo ⚠️  node_modules não encontrado. Instalando dependências...
    call npm install
    if errorlevel 1 (
        echo ❌ ERRO ao instalar dependências!
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependências já instaladas
)
echo.

echo [3/4] Verificando arquivos de teste...
if not exist "tests\features" (
    echo ❌ ERRO: Pasta de testes não encontrada!
    pause
    exit /b 1
)

echo ✅ Arquivos de teste encontrados
echo.

echo [4/4] Criando pasta de relatórios...
if not exist "tests\reports" mkdir tests\reports
echo ✅ Pasta de relatórios pronta
echo.

echo ╔════════════════════════════════════════════════════════════╗
echo ║                    EXECUTANDO TESTES                      ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Executar testes (cucumber-js gera o JSON, test-summary.js mostra o resumo)
call npm test

echo.
echo Para ver detalhes dos cenários: listar_testes.bat
echo Para ver relatório HTML: server\tests\reports\cucumber-report.html
echo.
pause
