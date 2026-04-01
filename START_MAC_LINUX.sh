#!/bin/bash
echo "============================================"
echo "  NSE/BSE INTRADAY SCANNER - STARTING..."
echo "============================================"
echo ""

if [ ! -d "node_modules" ]; then
  echo "First time setup - installing dependencies..."
  echo "This will take 1-3 minutes. Please wait..."
  npm install
  echo ""
  echo "Dependencies installed!"
fi

echo "Starting the scanner..."
echo "Browser will open at http://localhost:3000"
echo ""
npm start
