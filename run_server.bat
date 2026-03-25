@echo off
echo ========================================
echo Atualizando dependencias do servidor...
echo ========================================

cd server
call npm install

echo.
echo ========================================
echo Iniciando servidor em modo dev...
echo ========================================
echo.
echo Para testar a API, abra outro terminal e execute:
echo   cd server
echo   npm test
echo.
echo O servidor estara rodando em http://localhost:3000
echo.
call npm run dev
