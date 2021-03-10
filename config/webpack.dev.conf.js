const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');
const webpackConfigDev = {
	mode: 'development', // 通过 mode 声明开发环境
	output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
		// 生成 a.bundle.js  b.bundle.js
		filename: './js/[name].bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, "../dist"),
		publicPath:'/',
		host: "127.0.0.1",
		port: "8089",
		overlay: true, // 浏览器页面上显示错误
		open: true, // 开启浏览器
		openPage:"demo1.html",
		// stats: "errors-only", //stats: "errors-only"表示只打印错误：
		hot: true, // 开启热更新
		// hotOnly:true //hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
	},
	plugins: [
		//热更新
		new webpack.HotModuleReplacementPlugin(),
	],
	// devtool: "source-map",  // 开启调试模式
	module: {
		rules: []
	},
}
module.exports = merge(webpackConfigBase, webpackConfigDev);