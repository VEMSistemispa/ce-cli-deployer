const path = require('path');
const webpack = require('webpack'); //to access built-in plugins



module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externalsType: 'commonjs',
  externals: {
    'xapi': 'xapi',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
        SCHNEIDER_ADDRESS: 'IP',
        ROOM_IDENTIFIER: "NOME SALA"
      }),
  ],
  optimization: {
    minimize: true, // impostare a false per non avere il codice minificato
  }
};