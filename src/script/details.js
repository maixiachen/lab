!function ($) {
  $('#topcontent').load('header.html');
  $('#footer').load('footer.html');
}(jQuery);
// 菜单栏
!function ($) {
  $('#topcontent').on('mouseover', $('.allsort'), function () {
    // console.log($('.allsort'));
    var $menubox = $('#menu_content_box')
    var $allsort = $('.allsort');
    var $menu_content = $('#menu_content');
    $menubox.on('mouseover', function () {
      $menu_content.show();
    });
    $menubox.on('mouseout', function () {
      $menu_content.hide();

    });
  });
}(jQuery);

//获取数据
!function () {
  var $sid = location.search.substring(1).split('=')[1];
  // console.log($sid);
  $.ajax({
    url: "http://10.31.162.171/UNIT2/lab/php/details.php",
    data: {
      sid: $sid
    },
    dataType: "json"
  }).done(function (data) {
    // console.log(data);
    // console.log(typeof(data[0].sid));
    // console.log(data[0].bpic.split(',')[0]);
    var $str = "";
    var $glassbox = $('#glassbox');
    $str += '<div class="spic">' +
      '<img src="' + data[0].picurl + '" alt="" sid="' + data[0].sid + '">' +
      '<div class="sf"></div>' +
      '</div>' +
      '<div class="bf">' +
      '<img src="' + data[0].bpic.split(',')[0] + '" class="bpic" index=' + data[0].sid + '>' +
      '</div>' +
      '<div class="ulist">' +
      '<a href="javascript:;" class="leftbtn">&lt;</a>' +
      '<div class="list">' +
      '<ul>' +
      '<li  class="imgactive" ><img src="' + data[0].bpic.split(',')[0] + '" alt=""></li>' +
      '<li><img src="' + data[0].bpic.split(',')[1] + '" alt=""></li>' +
      '<li><img src="' + data[0].bpic.split(',')[2] + '" alt=""></li>' +
      '<li><img src="' + data[0].bpic.split(',')[3] + '" alt=""></li>' +
      '<li><img src="' + data[0].bpic.split(',')[4] + '" alt=""></li>' +
      '<li><img src="' + data[0].bpic.split(',')[5] + '" alt=""></li>' +
      '</ul>' +
      '</div>' +
      '<a href="javascript:;" class="rightbtn">&gt;</a>' +
      '</div>';
    $glassbox.html($str);


    var $smallinform = $('.smallinform img');
    var $brandname = $('.brandname .nametext');
    $brandname.html(data[0].brandname);
    $smallinform.attr('src', data[0].brand);

    var $pname = $('.pname');
    var $pfunction = $('.pfunction');
    var $dd = data[0].title.split('(');
    var $df = $dd[1].split(')');
    $pname.html($dd[0]);
    $pfunction.html($df);
    // console.log($str);

  });

}(jQuery);

// 放大镜效果
!function ($) {

  //  -----------------------------
  // -------------------
  var $glassbox = $('#glassbox');
  $glassbox.on('mouseover', '.spic', function () {
    var $spic = $('#glassbox .spic');
    var $sf = $('.sf');
    var $bf = $('.bf');
    var $bpic = $('.bpic');
    var $left = $('.leftbtn');
    var $right = $('.rightbtn');
    var $ul = $('.ulist ul');
    var $li = $('ulist ul li');
    // 设置UL尺寸
    var $ul = $('.ulist ul');
    var $li = $('.ulist ul li');
    var $liwidth = $li.width();//2px 边框
    $ul.width($li.size() * (($liwidth) + 8));
    //  var $num=4;
    $ul.width($li.size() * (($liwidth) + 8));
    $('.sf').css('visibility', 'visible');
    $('.bf').css('visibility', 'visible');

    $('.spic').on('mouseout', function () {
      $('.sf').css('visibility', 'hidden');
      $('.bf').css('visibility', 'hidden');
    });
    $('.sf').width($(this).width() * $('.bf').width() / $('.bpic').width());
    $('.sf').height($(this).height() * $('.bf').height() / $('.bpic').height());

    var $bili = $('.bpic').width() / $('.spic').width();
    // console.log($bili);
    $('.spic').on('mousemove', function (ev) {
      var $left = ev.pageX - $('#glassbox').offset().left - $('.sf').width() / 2;
      var $top = ev.pageY - $('#glassbox').offset().top - $('.sf').height() / 2;

      if ($left <= 0) {
        $left = 0;
      } else if ($left >= $('.spic').width() - $('.sf').width()) {
        $left = $('.spic').width() - $('.sf').width();
      }
      if ($top <= 0) {
        $top = 0;
      } else if ($top >= $('.spic').height() - $('.sf').height()) {
        $top = $('.spic').height() - $('.sf').height();
      }

      $('.sf').css({
        left: $left,
        top: $top
      });
      $('.bpic').css({
        left: -$bili * $left,
        top: -$bili * $top
      });
    });
    // // 设置UL尺寸
    // var $ul = $('.ulist ul');
    // var $li = $('.ulist ul li');
    // var $liwidth = $li.eq(0).width();//2px 边框
    // $ul.width($li.size() * (($liwidth)+8));

    $li.on('click', function () {
      var url = $(this).find('img').attr('src');
      $('.spic').find('img').attr('src', url);
      $('.bpic').attr('src', url);
      $(this).addClass('imgactive').siblings('li').removeClass('imgactive');
    });

    var $num = 5;
    if ($li.length <= 5) {
      $('.leftbtn,.rightbtn').css('border', '1px solid #fff');
    } else {
      $('.leftbtn').css('border', '1px solid #ddd');
      $('.rightbtn').css('border', '1px solid #ddd');
    }
    $('.rightbtn').on('click', function () {
      if ($num < $li.size()) {
        $num++;
        $('.leftbtn').css('border', '1px solid #ddd');
        if ($num == $li.size()) {
          $('.rightbtn').css('border', '1px solid #fff');

        }
        $ul.animate({
          left: -($num - 5) * ($liwidth + 5)
        });
      }
    });

    $('.leftbtn').on('click', function () {
      if ($num > 5) {
        $num--;
        $('.rightbtn').css('border', '1px solid #ddd');
        if ($num == 5) {
          $('.leftbtn').css('border', '1px solid #fff');

        }
        $ul.animate({
          left: -($num - 5) * $liwidth
        });
      }
    });
  });

}(jQuery);
// 数量加减，型号切换
!function ($) {
  // 数目加减
  var $increase = $('.increase');
  var $reduce = $('.reduce');
  var $numboxtext = $('.numbox input');
  var $number = $numboxtext.val();
  $increase.on('click', function () {
    $number++;
    $numboxtext.val($number);
  });
  $reduce.on('click', function () {
    $number--;
    if ($number <= 1) {
      $number = 1
    }
    $numboxtext.val($number);
  });

  // 选中标记
  var $checklogo = $('.modelul b');
  var $checkli = $('.modelul li');
  $checkli.on('click', function () {
    $(this).find('b').addClass('checkactive').parent('li').siblings('li').find('b').removeClass('checkactive');
  });
  // 点击购物车判断是否登录
  var $shopcar = $('.shopcar');
  var $shade = $('#shade');
  var $remindbox = $('#remindbox');
  $shopcar.on('click', function () {
    if (getcookie('Username')) {
      $shade.hide();
      $remindbox.hide();
    } else {
      $shade.show();
      $remindbox.show();
    }
  });
  function getcookie(key) {
    var str = decodeURI(document.cookie);
    var arr = str.split('; ');
    for (var i = 0; i < arr.length; i++) {
      var arr1 = arr[i].split('=');
      if (arr1[0] == key) {
        return arr1[1];
      }
    }
  }


}(jQuery);

// 登录
!function ($) {
  function addcookie(key, value, day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = key + '=' + encodeURI(value) + ';expires=' + date;
  }

  function getcookie(key) {
    var str = decodeURI(document.cookie);
    var arr = str.split('; ');
    for (var i = 0; i < arr.length; i++) {
      var arr1 = arr[i].split('=');
      if (arr1[0] == key) {
        return arr1[1];
      }
    }
  }

  function delcookie(key) {
    addcookie(key, '', -1);
  }

  $('body').one('mouseover', function () {
    var $toplogin = $('.toplogin');
    console.log($toplogin);
    if (getcookie('Username') != '') {
      $toplogin.html('退出');
      $toplogin.on('click', function () {
        delcookie('Username');
        $toplogin.html('登录');
        $toplogin.attr('href', 'http://10.31.162.171/UNIT2/lab/src/login.html');
      });
    }
  });
  $loginbtn = $('.sub');
  $loginbtn.on('click', function () {
    $('.error').css('opacity', '1');
    $('#username').focus();
    var $username = $('#username').val();
    var $password = $('#password').val();
    $.ajax({
      type: "post",
      url: "../php/login.php",
      data: {
        name: $username,
        pass: $password
      }
    }).done(function (data) {//请求成功，接收后端返回的值
      if (!data) {
        $('.errortext').html('用户名或者密码错误');
        $('#password').val('');
      } else {//成功,存cookie,跳转到首页
        // addCookie('UserName',$username,7);
        // $('.error').html('正确').css('color','green');
        addcookie("Username", $username);
        if ($('.checkbox').is(':checked')) {
          addcookie("Password", $password);
        } else {
          delcookie("Password");
        }
        location.href = 'index.html';
      }
    });
  });
}(jQuery);
!function () {
  $('.error').css('opacity', '0');
  $('.zhanghao input').focus(function () {
    $('.error').css('opacity', '1');
  });
}(jQuery);
// 遮罩样式
!function ($) {
  var $close = $('#remindbox .close');
  var $shade = $('#shade');
  var $remindbox = $('#remindbox');
  $close.on('click', function () {
    $shade.hide();
    $remindbox.hide();
  })

}(jQuery);
// ------------------------------
// 添加购物车
!function ($) {

  function addcookie(key, value, day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = key + '=' + encodeURI(value) + ';expires=' + date;
  }

  function getcookie(key) {
    var str = decodeURI(document.cookie);
    var arr = str.split('; ');
    for (var i = 0; i < arr.length; i++) {
      var arr1 = arr[i].split('=');
      if (arr1[0] == key) {
        return arr1[1];
      }
    }
  }

  function delcookie(key) {
    addcookie(key, '', -1);
  }


  var sidarr = [];
  var numarr = [];
  function getcookievalue() {
    if (getcookie('cartsid') && getcookie('cartnum')) {
      sidarr = getcookie('cartsid').split(',');
      numarr = getcookie('cartnum').split(',');
    }
  }

  $('.shopcar').on('click', function () {
    var sid = $('.spic').find('img').attr('sid');
    console.log(typeof (sid));//string
    var sid = $('.spic').find('img').attr('sid');
    getcookievalue();
    if ($.inArray(sid, sidarr) != -1) {
      if (getcookie('cartnum') == '') {
        var num = parseInt($('.numinput').val());
        numarr[$.inArray(sid, sidarr)] = num;
        addcookie('cartnum', numarr.toString(), 7);
        sidarr[$.inArray(sid, sidarr)] = sid;
        addcookie('cartsid', sidarr.toString(), 7);
      } else {
        var num = parseInt(numarr[$.inArray(sid, sidarr)]) + parseInt($('.numinput').val());
        numarr[$.inArray(sid, sidarr)] = num;
        addcookie('cartnum', numarr, 10);
      }
    } else {
      sidarr.push(sid);
      addcookie('cartsid', sidarr, 10);
      numarr.push($('.numinput').val());
      addcookie('cartnum', numarr, 10);
    }
    alert('添加购物车成功啦~');
    console.log(sidarr);
  });

  $('body').one('mouseover', function () {
    var $toplogin = $('.toplogin');
    var $cartnum = $('#cartnum');
    if (getcookie('cartnum')) {
      var $num = getcookie('cartnum').split(',');
      console.log($num);
      console.log(typeof ($num));
      var $count = 0;
      $.each($num, function (index, value) {
        $count += parseInt(value);
      });
      $cartnum.html($count);
    }
  });

}(jQuery);
