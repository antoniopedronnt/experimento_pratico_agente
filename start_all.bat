@echo off
echo ========================================
echo INICIANDO SISTEMA COMPLETO
echo ========================================
echo.

REM Verificar se servidor esta rodando
echo Verificando servidor...
tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I /N "node.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] Servidor ja esta rodando
) else (
    echo [INFO] Servidor nao encontrado, iniciando...
    start "Servidor - Question Manager" cmd /k "cd server && npm run dev"
    timeout /t 3 /nobreak >nul
)

echo.
echo Iniciando cliente...
start "Cliente - Question Manager" cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo Sistema iniciado!
echo ========================================
echo.
echo Servidor: http://localhost:3000
echo Cliente:  http://localhost:5173
echo.
echo Pressione qualquer tecla para continuar...
pause >nul
