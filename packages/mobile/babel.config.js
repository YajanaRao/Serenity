// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}, loose: true}],
    '@babel/preset-typescript',
    'module:metro-react-native-babel-preset',
  ],
};
