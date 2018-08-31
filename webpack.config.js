const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');//在js文件中引用css，scss,less
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
module.exports = {
  entry:{
    app:'./src/index.js'
  },
  output:{
    // filename:'index.js',
    // path:'/lib'
    filename: "index.js",
		path: path.resolve(__dirname,"./dist"),
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
				test: /\.css$/, 
				exclude:/node_modules/,
				use: [
          'style-loader',
					"css-loader"
				],
			},
			{
				test: /\.scss$/,
				use: [
          'style-loader',
					"css-loader",
          "sass-loader",
				]
      },
//       {
//         test: /\.scss$/,
//         loader: ExtractTextPlugin.extract("style-loader", 'css-loader!sass-loader')//这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'            
//       },
    ]
  },
  devServer: {
		contentBase: path.resolve(__dirname, "./src"),//开发的时候访问文件路径指向src，自动获取src下的index.html来作为开启页面
		historyApiFallback:true,
		port:8100,
		proxy:{
			// "/api": {
			// 	target:"http://10.118.41.8:8080",
			// 	changeOrigin:true,
			// 	secure:false,// 接受 运行在 https 上的服务
			// 	pathRewrite:{
			// 		"^/api":""
			// 	}
			// }
		}
  },
  plugins: [
      new HtmlWebpackPlugin({
          title:'Hello World',
          template: './src/index.html' //模板地址
      }),
      // new ExtractTextPlugin("style.css")//提取出来的样式放在style.css文件中
  ]
}