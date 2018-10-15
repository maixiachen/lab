!function ($) {
  $('#footer').load('footer.html');
}(jQuery);
// 表单验证
!function ($) {
  $('#form1').validate({
    rules: {
      username:{
        required:true,
        minlength:2,
        maxlength:10,
        remote: {//将前端的name给后端
            url: "../php/reg.php",     //后台处理程序
            type: "post"               //数据发送方式
        }
      },
      password:{
        required:true,
        minlength:6
      },
      repass:{
        required:true,
        equalTo:"#password"
      },
      email:{
        required:true,
        email:true
      },
      chkAgree:{
        required:true
      }
    },
    messages: {
      username:{
        required:'用户名不能为空',
        minlength:'用户名不能小于2',
        maxlength:'用户名不能大于10',
        remote:'用户名已存在'
      },
      password:{
        required:'密码不能为空',
        minlength:'密码至少为6位',
      },
      repass:{
        required:'请输入确认密码',
        equalTo:"两次密码不一致"
      },
      email:{
        required:'电子邮箱不能为空',
        email:'你输入的格式有误'
      },
      chkAgree:{
        required:'签订许可协议之后方可使用'
      }
    }
  }); 
  $.validator.setDefaults({
    success:function(label){
      alert(1);
      label.text('√').css({
        color:"green",
      });
      label.css({
        display:"inline-block"
      });
    }
  });
  
}(jQuery);
// 

