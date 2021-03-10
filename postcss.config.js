module.exports = {
	plugins: [
		require('autoprefixer'),//自动添加css前缀
		require('postcss-px2rem')({
			remUnit: 75,
			remPrecision: 2 // rem的小数点后位数
		  })
	]
};