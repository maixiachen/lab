//require.config({  })   配置模块--引入第三方的插件或者库
//https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js
//https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
//https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js

require.config({ 
	baseUrl:'https://cdnjs.cloudflare.com/ajax/libs/',//公用路径
	paths:{
		'jquery':'jquery/1.12.4/jquery.min',//绝对不能带扩展名，名字必须为jquery
		'jquerycookie':'jquery-cookie/1.4.1/jquery.cookie.min',
		'jqueryvalidate':'jquery-validate/1.17.0/jquery.validate.min'
	}
});