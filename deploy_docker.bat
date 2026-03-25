@echo off
chcp 65001 >nul
cls
echo ╔════════════════════════════════════════════════════════════╗
echo ║             DEPLOY COM DOCKER COMPOSE                     ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo Este script irá:
echo  1. Verificar se Docker está instalado
echo  2. Build das imagens Docker
echo  3. Iniciar os containers
echo.

REM Verificar Docker
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker não está instalado!
    echo.
    echo Por favor, instale o Docker Desktop:
    echo https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo ✅ Docker encontrado!
echo.

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose não está instalado!
    pause
    exit /b 1
)

echo ✅ Docker Compose encontrado!
echo.

cd /d "%~dp0"

echo ════════════════════════════════════════════════════════════
echo Escolha uma opção:
echo ════════════════════════════════════════════════════════════
echo.
echo [1] Build e Iniciar containers
echo [2] Parar containers
echo [3] Ver logs
echo [4] Rebuild (forçar nova build)
echo [5] Limpar tudo (containers, imagens, volumes)
echo [0] Sair
echo.
set /p opcao="Digite o número da opção: "

if "%opcao%"=="0" exit /b 0

if "%opcao%"=="1" (
    echo.
    echo ╔════════════════════════════════════════════════════════════╗
    echo ║ Iniciando containers...                                   ║
    echo ╚════════════════════════════════════════════════════════════╝
    docker-compose up -d
    echo.
    echo ✅ Containers iniciados!
    echo.
    echo 🌐 Frontend: http://localhost
    echo 🔧 Backend:  http://localhost:3000
    echo 💚 Health:   http://localhost:3000/health
    echo.
    echo Para ver logs: docker-compose logs -f
)

if "%opcao%"=="2" (
    echo.
    echo ╔════════════════════════════════════════════════════════════╗
    echo ║ Parando containers...                                     ║
    echo ╚════════════════════════════════════════════════════════════╝
    docker-compose down
    echo.
    echo ✅ Containers parados!
)

if "%opcao%"=="3" (
    echo.
    echo ╔════════════════════════════════════════════════════════════╗
    echo ║ Logs dos containers (Ctrl+C para sair)                   ║
    echo ╚════════════════════════════════════════════════════════════╝
    docker-compose logs -f
)

if "%opcao%"=="4" (
    echo.
    echo ╔════════════════════════════════════════════════════════════╗
    echo ║ Rebuild completo...                                       ║
    echo ╚════════════════════════════════════════════════════════════╝
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    echo.
    echo ✅ Rebuild completo!
)

if "%opcao%"=="5" (
    echo.
    echo ⚠️  ATENÇÃO: Isso irá remover TODOS os containers, imagens e volumes!
    set /p confirm="Tem certeza? (s/n): "
    if /i "%confirm%"=="s" (
        docker-compose down -v
        docker system prune -a -f
        echo.
        echo ✅ Tudo removido!
    ) else (
        echo.
        echo ❌ Operação cancelada.
    )
)

echo.
pause
