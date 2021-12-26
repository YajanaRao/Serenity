# Android

## Clone github repository

```shell
git clone https://github.com/YajanaRao/Serenity.git
```

## Project structure

The following folders in packages indicate following things

| folder name                  | description                           |
| ---------------------------- | ------------------------------------- |
| mobile                       | native android and ios related codes  |
| react-track-player           | audio player for android and ios      |
| react-native-get-music-files | read audio files from device          |
| components                   | Cross Platform components and theming |
| core                         | Shared redux logic                    |
| extensions                   | third party extensions to the app     |
| web                          | react native web application          |

## Branches

- develop -> pr this branch for everything
- master -> source code of production application

## Install yarn packages

Navigate to project root:

We're using [Yarn](https://yarnpkg.com) for this project, do not use npm for the following commands
Run below command in project root:

```shell
yarn setup
```

## IOS

Navigate to packages/mobile/ios

```shell
cd packages/mobile/ios
pod install
```

## Configurations

Create a .env file for managing secrets in mobile folder

```shell
cd packages/mobile
touch .env
```

## Run Metro bundler

```shell
yarn start
```

## Connect emulator or real device

## Install application on device

```shell
yarn android
yarn ios
```

## Run tests

The tests of a specific packages are present in **tests** folder to run

```shell
yarn tests
```
