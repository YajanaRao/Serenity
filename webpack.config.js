const path = require('path');

module.exports = {
  mode: 'development',

  // Path to the entry file, change it according to the path you have
  entry: path.join(__dirname, 'index.js'),

  // Path for the output files
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },

  // Enable source map support
  devtool: 'source-map',

  // Loaders and resolver config
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },

      {
        test: /\.js$/,
        exclude: [
          /node_modules[/\\](?!react-native-paper|react-native-vector-icons|react-native-safe-area-view|react-router-native)/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            // Disable reading babel configuration
            babelrc: false,
            configFile: false,

            // The configuration for compilation
            presets: [
              ['@babel/preset-env', { useBuiltIns: 'usage' }],
              '@babel/preset-react',
              '@babel/preset-flow',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'react-native$': require.resolve('react-native-web'),
      // 'react': require.resolve('react')
    },
    modules: ['src/plugins', 'node_modules'],
  },

  // Development server config
  devServer: {
    contentBase: [path.join(__dirname, 'public')],
    historyApiFallback: true,
  },
};
