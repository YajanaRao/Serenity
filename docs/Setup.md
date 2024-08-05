# Android

## Clone github repository

```shell
git clone https://github.com/YajanaRao/Serenity.git
```

## Project structure

The project is a Monorepo. Contains `apps` and `packages` where apps contain code for mobile application and web application where as packages include standalone packages required for the application like component library and store which is common across the application.

The following folders in packages indicate following things

| folder name                  | description                           |
| ---------------------------- | ------------------------------------- |
| mobile                       | native android and ios related codes  |
| web                          | react native web application          |
| react-track-player           | audio player for android and ios      |
| react-native-get-music-files | read audio files from device          |
| components                   | Cross Platform components and theming |
| core                         | Shared redux logic                    |
| extensions                   | third party extensions to the app     |

## Branches

- develop -> pr this branch for everything
- master -> source code of production application

## Configurations

Create a .env file for managing secrets in mobile folder

```shell
cd packages/mobile
touch .env
```
## Build release app

Navigate to project root:

We're using [Turbo](https://turborepo.org) for this project
Run below command in project root:

```shell
yarn setup
yarn build 
# or
npm run setup
npm run build
```


## Development Mode

Run metro bundler

```shell
yarn start
```

## Create .env file for secrets

Serenity App uses supabase as backend. We need supabase token and server  url as variables in `.env` file.

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
