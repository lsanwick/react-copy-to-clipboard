var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var env = process.env.NODE_ENV || 'production';
var entry = process.env.ENTRY || 'Example';


const production = {
  devtool: 'source-map',
  entry: ['./src/example/' + entry + '.js'],
  output: {filename: 'bundle.js', path: path.resolve('./example')},
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + env + '"'
      }
    })
  ],

  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', include: [path.join(__dirname, 'src')]}
    ]
  },
  resolve: {extensions: ['', '.js']},
  stats: {colors: true}
};


const development = {
  devtool: 'eval',

  entry: [
    './src/example/' + entry + '.js',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
  ],
  output: {filename: 'bundle.js', path: path.resolve('./example')},
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + env + '"'
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['react-hot', 'babel'], include: [path.join(__dirname, 'src')]}
    ],
    preLoaders: [
      {test: /\.js$/, loaders: ['eslint'], include: [path.join(__dirname, 'src')]}
    ]
  },
  resolve: {extensions: ['', '.js']},
  stats: {colors: true},
  eslint: {configFile: 'src/.eslintrc'}
};


module.exports = env === 'production' ? production : development;
