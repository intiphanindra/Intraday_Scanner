@echo off
echo ============================================
echo   NSE/BSE INTRADAY SCANNER - STARTING...
echo ============================================
echo.
echo Checking if node_modules exists...
if not exist "node_modules\" (
    echo First time setup - installing dependencies...
    echo This will take 1-3 minutes. Please wait...
    npm install
    echo.
    echo Dependencies installed!
)
echo.
echo Starting the scanner...
echo Browser will open at http://localhost:3000
echo.
npm start
pause
