@echo off
echo ========================================
echo   CENARIOS DE TESTE - CUCUMBER/GHERKIN
echo ========================================
echo.

echo [1] REQUISITO 1 - GERENCIAMENTO DE QUESTOES
echo --------------------------------------------
echo Arquivo: criar-questao.feature
findstr /C:"Cenário:" server\tests\features\criar-questao.feature 2>nul
echo.
echo Arquivo: atualizar-questao.feature
findstr /C:"Cenário:" server\tests\features\atualizar-questao.feature 2>nul
echo.
echo Arquivo: listar-questoes.feature
findstr /C:"Cenário:" server\tests\features\listar-questoes.feature 2>nul
echo.
echo Arquivo: remover-questao.feature
findstr /C:"Cenário:" server\tests\features\remover-questao.feature 2>nul
echo.

echo [2] REQUISITO 2 - GERENCIAMENTO DE PROVAS
echo ------------------------------------------
echo Arquivo: gerenciar-provas.feature
findstr /C:"Cenário:" server\tests\features\gerenciar-provas.feature 2>nul
echo.

echo [3] REQUISITO 3 - GERACAO DE PDFS E CSV
echo ----------------------------------------
echo Arquivo: gerar-pdfs.feature
findstr /C:"Cenário:" server\tests\features\gerar-pdfs.feature 2>nul
echo.

echo [4] REQUISITO 4 - CORRECAO DE PROVAS
echo -------------------------------------
echo Arquivo: corrigir-provas.feature
findstr /C:"Cenário:" server\tests\features\corrigir-provas.feature 2>nul
echo.

echo [5] NOVA FUNCIONALIDADE - GERACAO DE RESPOSTAS
echo -----------------------------------------------
echo Arquivo: gerar-respostas.feature
findstr /C:"Cenário:" server\tests\features\gerar-respostas.feature 2>nul
echo.

echo ========================================
echo Total de arquivos de teste: 8
echo Para executar os testes: cd server ^&^& npm test
echo ========================================
pause
