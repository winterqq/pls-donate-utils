@echo off

rem Checking if node.js is installed
where node.exe >nul 2>&1 && set message=true || set message=false
if exist node.msi del node.msi
if %message% == false (
    curl -o node.msi https://nodejs.org/dist/v18.12.0/node-v18.12.0-x64.msi
    if exist node.msi (
        cls
        start node.msi
        echo Install Node.js then run this file again
        pause
        exit
    ) else (
        echo fail
    )
)
if not exist node_modules\ npm i
if not exist tokens.json (
    echo welcome, add a roblox token to start
    pause
    goto addtoken
)
cls
echo pls donate utils by tzechco
echo.
echo option select
echo.
echo [1] transfer
echo [2] get robux amount
echo [3] setup gamepasses
echo [4] token management
echo.
set /p o=
if %o% == 1 goto transfer
if %o% == 2 goto amount
if %o% == 3 goto gamepass
if %o% == 4 goto token
goto end

:transfer
cls
echo enter the username to transfer to
echo.
set /p name=
cls
echo enter the shirt id
echo.
set /p id=
cls
node ./transfer.js %name% %id%
goto end

:amount
cls
node ./robuxAmount.js
goto end

:gamepass
cls
echo setup gamepasses
echo.
echo enter the username
echo.
set /p name=
node ./gamepass.js %name%
goto end

:token
cls
echo add/remove token
echo.
echo [1] add
echo [2] remove
echo [3] list
echo.
set /p top=
if %top% == 1 goto addtoken
if %top% == 2 goto removetoken
if %top% == 3 goto listtoken
goto end

:addtoken
cls
echo enter your roblox token inside of ""
set /p token=
node ./addToken.js %token%
goto end

:removetoken
cls
echo enter the username
set /p name=
node ./removeToken.js %name%
goto end

:listtoken
cls
node ./tokenList.js
goto end

:end
pause