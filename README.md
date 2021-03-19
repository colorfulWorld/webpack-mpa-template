# webpack管理多页面（mpa）应用

在根目录下通过以下指令（xxx代表创建一个单页名称） 
[webpack手册](http://webpack.wuhaolin.cn/)

```
npm run c xxx
```

可以在pages目录下快速生成以上xxx结构文件

```
└─pages
	xxx
    	index.html
    	index.js
    	index.less
```



#### 开启开发模式：npm  start 或 npm run dev

#### 正式环境打包：npm run build

#### 正式环境打包(打包后可视化分析模块大小)：npm run build  --report



###### 注意：新建页面必须遵循以下格式（一个html文件对应一个js文件）

```
 └─pages
        ├─demo1
        │      index.html
        │      index.js
        │      index.less
        │     
        └─demo2
                index.html
                index.js
                index.less
                
```



#### 项目目录结构：

```
│  .babelrc
│  .eslintrc.js
│  .gitignore
│  package.json
│  postcss.config.js
│  README.md
│ 
├─config
│      create.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│      webpack.rules.conf.js
│     
├─node_modules
└─src
    ├─assets
    │  └─css
    ├─css
    │      common.css
    │     
    ├─images
    │      wallet.png
    │     
    ├─js
    │      common.js
    │     
    └─pages
        ├─demo1
        │      index.html
        │      index.js
        │      index.less
        │     
        └─demo2
                index.html
                index.js
                index.less
```

```

```
