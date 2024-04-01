const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin')
module.exports = {
  //入口
  entry: './src/js/main.js', //相对路径
  //输出
  output: {
    //__dirname  nodejs 的变量， 代表当前文件的文件夹目录
    //所有文件的输出目录
    path: path.resolve(__dirname, 'dist'),
    //                  ^
     //                 |
    clean: true, //清空path目录中上一次的打包
    //入口文件的输出目录和文件名
    filename: "static/js/shawn.js"
  },
  devServer: {
    host:'localhost', //服务器域名
    port:3000, //开启服务的端口号
    open: true, //自动打开浏览器
  },
  // 加载器
  module: {
    //loader
    rules: [
      {
        test:/\.css$/, //只检测.css 文件
        //loader 执行顺序,从后往前执行
        // loader: "xxx", 这个属性只能用一个loader
        use: [
          "style-loader", //将js 中的css通过创建style标签添加到html文件中
          "css-loader"//将css资源编译成commonjs的模块到js中
        ]
      },
      {
        test: /\.less$/,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/, //不需要其他的loader　webpack5 里自带
        type: 'asset', //包括assets/resource, assets/inline(base64), assets/source 等几种处理方式， “assets”会根据资源大小自动处理, 详见https://www.webpackjs.com/guides/asset-modules/#resource-assets
        parser: {
          dataUrlCondition: {
            //可以减少请求数量， 但是转为base64后会大1 2kb
            maxSize: 4 * 1024 // 4kb  小于4kb的转为base64
          }
        },
        generator: {
          //图片打包输出目录 [hash] 哈希文件名,避免浏览器缓存， [ext]文件后缀名， [query] 后面的查询参数
          //[hash:10] 10代表hash值长度
          filename: 'static/images/[hash][ext][query]'
        }
      }
    ]
  },
  //插件
  plugins: [
    //打包后自动生成一个html 去引入打包后的js文件
    new HtmlWebpackplugin({
      //如果不用模板文件， 会自己生成一个新的空html文件 ，不会保留自定义的html内容
      // template 会保留之前的内容
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
  //打包模式
  mode: 'development'
}