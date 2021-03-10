// eslint 配置项
// root 限定配置文件的使用范围
// parser 指定eslint的解析器
// parserOptions 设置解析器选项
// extends 指定eslint规范
// plugins 引用第三方的插件
// env 指定代码运行的宿主环境
// rules 启用额外的规则或覆盖默认的规则
// globals 声明在代码中的自定义全局变量

module.exports = {
    root: true, 
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    rules: {
        "indent": ["error", 2],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "no-console": "error",
        "arrow-parens": 0
    }
}