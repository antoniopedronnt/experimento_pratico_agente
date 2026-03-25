@echo off
echo ========================================
echo Atualizando arquivos do cliente...
echo ========================================

cd client

echo.
echo Verificando e instalando dependencias...
call npm install

cd ..

echo.
echo ========================================
echo Cliente atualizado com sucesso!
echo ========================================
echo.
echo Para rodar o cliente:
echo   cd client
echo   npm run dev
echo.
echo O cliente estara em http://localhost:5173
echo O servidor deve estar rodando em http://localhost:3000
echo.
pause
