// const {resolve} = require('path');

module.exports = {
  preset: 'react-native',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '\\.(js|ts|tsx)$': require.resolve('react-native/jest/preprocessor.js'),
  },
  transformIgnorePatterns: [
    // resolve(__dirname, '../../node_modules'),
    '../../node_modules/(?!@react-native|react-native!?!(jest-)?@react-native-community|@react-navigation)',
  ],
};
