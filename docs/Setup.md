# Android

## Clone github repository

```shell
git clone --recurse-submodules https://github.com/YajanaRao/Serenity.git
```

## Install yarn packages 

Navigate to project root:

We're using [Yarn](https://yarnpkg.com) for this project, do not use npm for the following commands
Run below command in project root:

```shell
yarn install
```

## IOS

Navigate to packages/mobile/ios

```shell
cd packages/mobile/ios
pod install
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
