@echo off

REM Function to print colored text
:color_echo
echo off
<nul set /p ".=%~2">tmp.tmp
findstr /v /a:%1 /R "^$" tmp.tmp nul
del tmp.tmp >nul 2>&1
goto :EOF

REM Color codes
set COLOR_INFO=0A
set COLOR_WARNING=0C
set COLOR_SUCCESS=0A

REM Update git submodules
call :color_echo %COLOR_INFO% "Updating git submodules..."
git submodule update --init
git submodule update --recursive --remote
call :color_echo %COLOR_SUCCESS% "Git submodules updated successfully."

REM Install packages using Yarn
call :color_echo %COLOR_INFO% "Installing packages with Yarn..."
yarn install
call :color_echo %COLOR_SUCCESS% "Packages installed successfully."

REM Ensure gradlew is executable (for Unix-based systems)
call :color_echo %COLOR_INFO% "Setting executable permission for gradlew..."
chmod +x apps/mobile/android/gradlew
call :color_echo %COLOR_SUCCESS% "Executable permission set for gradlew."

REM Create Android release
call :color_echo %COLOR_INFO% "Building Android release..."
yarn release-android
call :color_echo %COLOR_SUCCESS% "Android release build completed successfully."
