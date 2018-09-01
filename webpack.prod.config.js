const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');//在js文件中引用css，scss,less
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包

module.exports = {
  entry:{
    app:'./src/index.js'
  },
  output:{
    filename: "index.js",
		path: path.resolve(__dirname,"./lib"),
		libraryTarget: 'commonjs2'
  },
  module:{
    rules:[
      {
				test: /\.js$/,
				loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0' ,
				exclude:/node_modules/,
      },
      { //解析 .html
				test: /\.html$/,
				exclude:/node_modules/,
				loader: "html-loader"
			},
			{
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        }),
      },
    ]
  },
	plugins: [
    new ExtractTextPlugin({
      filename: 'index.css',
    })
  ],
  devtool: 'source-map',
}