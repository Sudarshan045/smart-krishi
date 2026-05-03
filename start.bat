@echo off
echo =======================================================
echo        Starting Smart Krishi Platform
echo =======================================================

echo Starting Backend Server...
start "Smart Krishi Backend" cmd /k "cd backend && npm run dev"

echo Starting Frontend Server...
start "Smart Krishi Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting in separate windows!
echo - Backend will run on http://localhost:5000
echo - Frontend will run on http://localhost:5173
echo.
echo Close this window at any time. To stop the servers, simply close the two new windows that opened.
pause
