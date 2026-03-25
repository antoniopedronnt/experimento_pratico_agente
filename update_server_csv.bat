@echo off
echo ================================
echo  Instalando dependencias CSV
echo ================================

cd server
echo.
echo Instalando csv-parse...
call npm install csv-parse
call npm install @types/node --save-dev

echo.
echo ================================
echo  Instalacao concluida!
echo ================================
pause
