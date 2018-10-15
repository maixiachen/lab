!function ($) {
  $('#footercontent').load('footer.html');
  $(function () {
    $('.lubo').lubo({
    });
    $(".left_btn").hide();
    $(".right_btn").hide();
  });
}(jQuery);
// 登录验证
!function () { 
  $loginbtn=$('.sub');
  $loginbtn.on('click',function(){
    $('.error').css('opacity','1');
    $('#username').focus();   
    var $username=$('#username').val();
    var $password=$('#password').val();
    $.ajax({
      type: "post",
      url: "../php/login.php",
      data:{
        name:$username,
        pass:$password
      }
    }).done(function(data){//请求成功，接收后端返回的值
      if(!data){
        $('.errortext').html('用户名或者密码错误');
				$('#password').val('');
      }else{//成功,存cookie,跳转到首页
        $.cookie("Username",$username);
        if($('.checkbox').is(':checked')){
          $.cookie("Password",$password);
        }else{
          $.cookie("Password",'',{expires:-1});
        }
				location.href='index.html';
      }
    });
  });
}(jQuery);
!function(){
  $('.error').css('opacity','0');
  $('.zhanghao input').focus(function(){
  $('.error').css('opacity','1'); 
  });
}(jQuery);
