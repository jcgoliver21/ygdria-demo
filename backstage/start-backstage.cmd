@echo off
setlocal
cd /d "%~dp0.."
set "YGDRIA_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "%YGDRIA_NODE%" (
  set "YGDRIA_NODE="
  for /f "delims=" %%N in ('where node 2^>nul') do if not defined YGDRIA_NODE set "YGDRIA_NODE=%%N"
)
if not exist "%YGDRIA_NODE%" (
  echo Node.js nao foi encontrado neste computador.
  pause
  exit /b 1
)
start "" "http://localhost:4399"
"%YGDRIA_NODE%" "backstage\server.mjs"
endlocal
