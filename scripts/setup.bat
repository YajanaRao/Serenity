@echo off
git submodule update --init
git submodule update --recursive --remote

@REM install packages
yarn install

@REM make gradlew executable
chmod +x apps/mobile/android/gradlew

@REM create android release
yarn release