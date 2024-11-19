const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const deps = require('./package.json').dependencies;

module.exports = (_, argv) => {
  const mode = argv.mode || "development";
  const isProduction = mode === "production";
  return {
    mode: mode,
    entry: "/src/index.tsx",
    devtool: !isProduction ? "inline-source-map" : "source-map",
    cache: false,
    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },
    output: {
      publicPath: 'http://localhost:3000/',
      clean: true,
      path: path.resolve(__dirname, "build"),
      filename: "js/[name].[contenthash:8].bundle.js",
      chunkFilename: "js/[name].[contenthash:8].chunk.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: {
            // `.swcrc` can be used to configure swc
            loader: "swc-loader",
          },
        },
      ].concat(isProduction ? [
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  namedExport: false,
                },
                importLoaders: 1,
                sourceMap: false,
              },
            },
          ],
          sideEffects: true,
          include: /\.module\.css$/,
        }
      ]: [
        {
          test: /\.(css|scss)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  namedExport: false,
                },
                sourceMap: true,
              },
            },
          ],
          include: /\.module\.css$/,
        },
      ])
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'app_consumer',
        remotes: {
          luminsign: 'luminsign@http://localhost:3107/mf-manifest.json'
        },
        shared: {
          // ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html", // base html
      }),
    ].concat(isProduction ? [
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].chunk.css",
      })
    ] : []),
    optimization: {
      minimize: isProduction,
      minimizer: [
        isProduction
          ? new TerserPlugin({
              extractComments: false,
              terserOptions: {
                format: {
                  comments: false,
                },
              },
            })
          : null,
      ].filter(Boolean),
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            filename: "js/vendors/[name].[contenthash:8].js",
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
            filename: "js/common/[name].[contenthash:8].js",
          },
        },
      },
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  };
};
