const path = require('path')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'tachacoin-wallet.js',
    path: path.resolve(__dirname, 'dist'),
    library: "TachacoinWallet",
    libraryTarget: "umd",
  }
}
