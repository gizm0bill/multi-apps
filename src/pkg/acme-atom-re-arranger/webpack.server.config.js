const path = require('path');
const webpack = require('webpack');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
module.exports =
{
  entry:
  {
    server: './server.ts',
    // prerender:  helpers.root('src/app/apps/eucon-qcm/answer-form/prerender.ts'),
  },
  target: 'node',
  resolve: { extensions: ['.ts', '.js'] },
  externals: [/node_modules/],
  output:
  {
    path: path.join( __dirname, 'dist' ),
    filename: '[name].js'
  },
  module:
  {
    rules:
    [
      { test: /\.ts$/, loader: '@ngtools/webpack' }
    ]
  },
  plugins:
  [
    new AngularCompilerPlugin
    ({
      skipCodeGeneration: true,
      sourceMap: true,
      tsConfigPath: path.join( __dirname, 'tsconfig.json' ),
      // hostReplacementPaths:
      compilerOptions: { module: 'commonjs' }
    }),
    new webpack.ContextReplacementPlugin
    (
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'app'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin
    (
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'app'),
      {}
    )
  ]
}
  