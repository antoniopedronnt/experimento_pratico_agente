@echo off
echo ========================================
echo Atualizando servidor para Requisito 3
echo ========================================

REM Criar diretorio services
python -c "import os; os.makedirs('server/src/services', exist_ok=True); print('Diretorio services criado!')"

cd server

echo.
echo Instalando bibliotecas para geracao de PDF...
call npm install pdfkit @types/pdfkit archiver @types/archiver

cd ..

echo.
echo ========================================
echo Servidor atualizado!
echo ========================================
echo.
echo Execute este script antes de continuar.
echo Pressione qualquer tecla para criar os arquivos...
pause

