@echo off
echo ============================================
echo  Road Accident Hotspot Predictor - SETUP
echo ============================================

echo.
echo [1/4] Installing required libraries...
pip install -r requirements.txt

echo.
echo [2/4] Generating dataset...
python generate_data.py

echo.
echo [3/4] Training ML model...
python train_model.py

echo.
echo [4/4] Starting Flask app...
echo.
echo  App is running at: http://127.0.0.1:5000
echo  Press CTRL+C to stop
echo.
python app.py
