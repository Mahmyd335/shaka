@echo off
echo ========================================
echo   Kaspi - Локальный сервер
echo ========================================
echo.

:: Проверяем Python 3
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python найден. Запускаю сервер...
    echo.
    echo Открой в браузере:  http://localhost:8080
    echo.
    echo Для остановки нажми Ctrl+C
    echo.
    start http://localhost:8080
    python -m http.server 8080
    goto end
)

:: Проверяем Python как py
py --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python найден. Запускаю сервер...
    echo.
    echo Открой в браузере:  http://localhost:8080
    echo.
    start http://localhost:8080
    py -m http.server 8080
    goto end
)

:: Проверяем Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Node.js найден. Запускаю сервер...
    echo.
    echo Открой в браузере:  http://localhost:8080
    echo.
    start http://localhost:8080
    npx serve -l 8080 .
    goto end
)

echo [!] Python и Node.js не найдены.
echo.
echo Установи одно из:
echo   Python:  https://www.python.org/downloads/
echo   Node.js: https://nodejs.org/
echo.
pause

:end
