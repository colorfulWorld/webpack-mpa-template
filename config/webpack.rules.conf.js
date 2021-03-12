const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'
const rules = [
  {
    test: /\.(css|scss|sass)$/,
    use: [
      devMode
        ? 'style-loader'
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../',
            },
          },
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  },
  {
    test: /\.js$/,
    use: ['babel-loader'], //"eslint-loader"
    enforce: 'pre',
    exclude: '/node_modules/', // 不检查node_modules下的js文件
    // include: [path.resolve(__dirname, 'src')], // 指定检查的目录
    // options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
    // 	formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
    // }
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        // 需要下载file-loader和url-loader
        loader: 'url-loader',
        options: {
          limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
          // 图片文件输出的文件夹
          outputPath: 'images',
        },
      },
    ],
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
    },
  },
  {
    test: /\.html$/,
    // html中的img标签
    use: ['html-withimg-loader'],
  },
  {
    test: /\.less$/,
    use: [
      devMode
        ? 'style-loader'
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../',
            },
          },
      'css-loader',
      'postcss-loader',
      'less-loader',
    ],
  },
]
module.exports = rules
