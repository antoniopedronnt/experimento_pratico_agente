@echo off
chcp 65001 >nul
cls
echo ╔════════════════════════════════════════════════════════════╗
echo ║          EXECUTAR TESTES ESPECÍFICOS - CUCUMBER           ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0\server"

REM Criar pasta de relatórios se não existir
if not exist "tests\reports" mkdir tests\reports

echo Escolha qual conjunto de testes executar:
echo.
echo [1] Requisito 1 - Gerenciamento de Questões
echo [2] Requisito 2 - Gerenciamento de Provas
echo [3] Requisito 3 - Geração de PDFs e CSV
echo [4] Requisito 4 - Correção de Provas
echo [5] Nova Funcionalidade - Geração de Respostas
echo [6] TODOS os testes
echo [0] Sair
echo.

set /p opcao="Digite o número da opção: "

if "%opcao%"=="0" exit /b 0

echo.
echo ════════════════════════════════════════════════════════════
echo.

if "%opcao%"=="1" (
    echo Executando testes de QUESTÕES...
    call npx cucumber-js tests/features/criar-questao.feature tests/features/atualizar-questao.feature tests/features/listar-questoes.feature tests/features/remover-questao.feature
    call node test-summary.js
)

if "%opcao%"=="2" (
    echo Executando testes de PROVAS...
    call npx cucumber-js tests/features/gerenciar-provas.feature
    call node test-summary.js
)

if "%opcao%"=="3" (
    echo Executando testes de GERAÇÃO DE PDFs...
    call npx cucumber-js tests/features/gerar-pdfs.feature
    call node test-summary.js
)

if "%opcao%"=="4" (
    echo Executando testes de CORREÇÃO...
    call npx cucumber-js tests/features/corrigir-provas.feature
    call node test-summary.js
)

if "%opcao%"=="5" (
    echo Executando testes de GERAÇÃO DE RESPOSTAS...
    call npx cucumber-js tests/features/gerar-respostas.feature
    call node test-summary.js
)

if "%opcao%"=="6" (
    echo Executando TODOS os testes...
    call npm test
)

if not "%opcao%" geq "1" if not "%opcao%" leq "6" (
    echo ❌ Opção inválida!
)

echo.
echo ════════════════════════════════════════════════════════════
echo.
pause
