const path = require("path");
const packageJson = require("./package.json");
const dependencies = packageJson.dependencies || {};

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Visualizer = require('webpack-visualizer-plugin');
// const webpack = require('webpack');
// const MCP = new webpack.optimize.ModuleConcatenationPlugin();

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: {
    app: ['./src/main.js'],
  },
  resolve: {
    mainFields: ['module', 'main', 'browser'],
    alias: {
      vue$: "vue/dist/vue.runtime.js",
      vuex$: "vuex/dist/vuex.esm.js"
    }
    // extensions: [".js", ".jsx"],
  },
  devServer: {
    contentBase: './dist',
    // host: process.env.WEBPACK_DEV_HOST,
    host: 'localhost',
    // port: process.env.WEBPACK_DEV_PORT
    port: 8082
  },
  // externals: Object.keys(dependencies),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  // resolve: { extensions: [".js", ".jsx"] },
  module: {
    rules: [
      // {
      //   test: require('path').resolve(__dirname, 'node_modules'),
      //   resolve: {mainFields: ['module', 'jsnext:main', 'browser', 'main']}
      // },
      {
        test: /\.js/,
        // exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              // ['@babel/preset-env']
              ['@babel/preset-env', {modules: false} ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.html/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new Visualizer({ filename: './statistics.html' }),
    // MCP
  ],
  // stats: {
  //   // Examine all modules
  //   maxModules: Infinity,
  //   // Display bailout reasons
  //   optimizationBailout: true
  // },
  optimization: {
    // minimize: true,
    // minimizer: [
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       compress,
    //       mangle: false,
    //       output: {
    //         beautify: true
    //       }
    //     },
    //   })
    // ],
    // minimizer: [new UglifyJsPlugin(
    //   {
    //     cache: true,
    //     parallel: true
    //   }
    // )],
    // providedExports: true,
    usedExports: true,
    sideEffects: false,
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /node_modules/,
    //       chunks: 'initial',
    //       name: 'vendor',
    //       enforce: true,
    //       priority: 5,
    //     },
    //   },
    // },
  },
};
