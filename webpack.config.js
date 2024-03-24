const path = require('path')
module.exports = {
  //入口
  entry: './src/main.js', //相对路径
  //输出
  output: {
    //__dirname  nodejs 的变量， 代表当前文件的文件夹目录
    path: path.resolve(__dirname, 'dist'),
    filename: "shawn.js"
  },
  // 加载器
  module: {
    //loader
    rules: []
  },
  //插件
  plugins: [],
  //打包模式
  mode: 'development'
}