const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
//消除冗余的css(treeShaking)
const purifyCssWebpack = require('purifycss-webpack')
// html模板
const htmlWebpackPlugin = require('html-webpack-plugin')
//静态资源输出
const copyWebpackPlugin = require('copy-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const Happypack = require('happypack')
const HappyPackThreadPool = Happypack.ThreadPool({ size: 5 })

const rules = require('./webpack.rules.conf.js')
// 获取html-webpack-plugin参数的方法
let getHtmlConfig = function (name, chunks) {
  return {
    template: `./src/pages/${name}/index.html`,
    filename: `${name}.html`,
    // favicon: './favicon.ico',
    // title: title,
    inject: true,
    hash: true, //开启hash  ?[hash]
    chunks: chunks,
    minify: isDev
      ? false
      : {
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: true, //折叠空白区域 也就是压缩代码
          removeAttributeQuotes: true, //去除属性引用
        },
  }
}

//动态添加入口
function getEntry(PAGES_DIR) {
  var entry = {}
  //读取src目录所有page入口
  glob.sync(PAGES_DIR + '**/*.js').forEach(function (name) {
    var start = name.indexOf('pages/') + 4
    var end = name.length - 3
    var n = name.slice(start, end)
    n = n.split('/')[1]
    entry[n] = name
  })
  return entry
}
let entrys = getEntry('./src/pages/')
console.log("getEntry('./src/pages/')::->", getEntry('./src/pages/'))
module.exports = {
  entry: entrys,
  module: {
    //不去解析jquery中的依赖库
    noParse: /jquery|chartjs/,
    rules: [...rules],
  },
  //将外部变量或者模块加载进来
  externals: {
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
  },
  plugins: [
    //静态资源输出
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/assets'),
        to: './assets',
        ignore: ['.*'],
      },
    ]),
    // 消除冗余的css代码
    new purifyCssWebpack({
      paths: glob.sync(path.join(__dirname, '../src/pages/*/*.html')),
    }),
    new Happypack({
      // 用唯一的标识符id，来代表当前的HappyPack是用来处理一类特定的文件
      id: 'babel',
      // 如何处理.js文件，用法和Loader配置中一样
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: HappyPackThreadPool,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // webpack4里面移除了commonChunksPulgin插件，放在了config.optimization里面,提取js， vendor名字可改
  // optimization: {
  // 	splitChunks: {
  // 		cacheGroups: {
  // 			vendor: {
  // 				// test: /\.js$/,
  // 				test: path.resolve(__dirname, '../node_modules'),
  // 				chunks: "initial", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
  // 				name: "vendor", //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
  // 				minChunks: 1,
  // 				reuseExistingChunk: true,
  // 				enforce: true
  // 			}
  // 		}
  // 	}
  // },
}

//自动化配置页面
var htmlArray = []
Object.keys(entrys).forEach(function (element) {
  htmlArray.push({
    _html: element,
    title: '',
    chunks: [element],
  })
})

//自动生成html模板
htmlArray.forEach((element) => {
  module.exports.plugins.push(
    new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks))
  )
})
