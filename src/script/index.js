define(['config'], function () {
  require(['jquery','jquerycookie'], function ($,$jcookie) {
    //首页轮播效果
    !function(){
      var _lubo = $('.lubo');
      var _box = $('.lubo_box');
      var _this = $(this); // 
      var luboHei = _box.height();
      var Over = 'mouseover';
      var Out = 'mouseout';
      var Click = 'click';
      var Li = "li";
      var _cirBox = '.cir_box';
      var cirOn = 'cir_on';
      var _cirOn = '.cir_on';
      var cirlen = _box.children(Li).length; //圆点的数量  图片的数量
      var luboTime = 4000; //轮播时间
      var switchTime = 800;//图片切换时间
      cir();
      Btn();
      $('.left_btn').hide();
      $('.right_btn').hide();
      //根据图片的数量来生成圆点
      function cir() {
        _lubo.append('<ul class="cir_box"></ul>');
        var cir_box = $('.cir_box');
        for (var i = 0; i < cirlen; i++) {
          cir_box.append('<li style="" value="' + i + '"></li>');
        }
        var cir_dss = cir_box.width();
        cir_box.css({
          left: '50%',
          marginLeft: '-40px',
          bottom: '10%'
        });
        cir_box.children(Li).eq(0).addClass(cirOn);
      }

      //生成左右按钮
      function Btn() {
        _lubo.append('<div class="lubo_btn"></div>');
        var _btn = $('.lubo_btn');
        _btn.append('<div class="left_btn"><</div><div class="right_btn">></div>');
        var leftBtn = $('.left_btn');
        var rightBtn = $('.right_btn');
        //点击左面按钮
        leftBtn.bind(Click, function () {
          var cir_box = $(_cirBox);
          var onLen = $(_cirOn).val();
          _box.children(Li).eq(onLen).stop(false, false).animate({
            opacity: 0
          }, switchTime);
          if (onLen == 0) {
            onLen = cirlen;
          }
          _box.children(Li).eq(onLen - 1).stop(false, false).animate({
            opacity: 1
          }, switchTime);
          cir_box.children(Li).eq(onLen - 1).addClass(cirOn).siblings().removeClass(cirOn);
        })
        //点击右面按
        rightBtn.bind(Click, function () {
          var cir_box = $(_cirBox);
          var onLen = $(_cirOn).val();
          _box.children(Li).eq(onLen).stop(false, false).animate({
            opacity: 0
          }, switchTime);
          if (onLen == cirlen - 1) {
            onLen = -1;
          }
          _box.children(Li).eq(onLen + 1).stop(false, false).animate({
            opacity: 1
          }, switchTime);
          cir_box.children(Li).eq(onLen + 1).addClass(cirOn).siblings().removeClass(cirOn);
        })
      }
      //定时器
      int = setInterval(clock, luboTime);
      function clock() {
        var cir_box = $(_cirBox);
        var onLen = $(_cirOn).val();
        _box.children(Li).eq(onLen).stop(false, false).animate({
          opacity: 0
        }, switchTime);
        if (onLen == cirlen - 1) {
          onLen = -1;
        }
        _box.children(Li).eq(onLen + 1).stop(false, false).animate({
          opacity: 1
        }, switchTime);
        cir_box.children(Li).eq(onLen + 1).addClass(cirOn).siblings().removeClass(cirOn);
      }
      // 鼠标在图片上 关闭定时器
      _lubo.bind(Over, function () {
        clearTimeout(int);
      });
      _lubo.bind(Out, function () {
        int = setInterval(clock, luboTime);
      });
      //鼠标划过圆点 切换图片
      $(_cirBox).children(Li).bind(Over, function () {
        var $index = $(this).index();
        $(this).addClass(cirOn).siblings().removeClass(cirOn);
        _box.children(Li).stop(false, false).animate({
          opacity: 0
        }, switchTime);
        _box.children(Li).eq($index).stop(false, false).animate({
          opacity: 1
        }, switchTime);
      });
    }();
    // tab切换
    !function () {
      // row2tab切换
      $('.row2_tab li').on('mousemove', function () {
        $(this).addClass('row2active').siblings().removeClass('row2active');
      });
      // 主商品tab切换
      var $tabcontent1 = $('.floor_1 .tab_content ul');
      var $tabtitle1 = $('.floor_1 .tab_title li')
      $tabtitle1.on('mousemove', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $tabcontent1.eq($(this).index()).show().siblings($tabcontent1).hide();
        // console.log($(this).index())
      });

      var $tabcontent2 = $('.floor_2 .tab_content ul');
      var $tabtitle2 = $('.floor_2 .tab_title li')
      $tabtitle2.on('mousemove', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $tabcontent2.eq($(this).index()).show().siblings($tabcontent2).hide();
        // console.log($(this).index())
      });

      var $tabcontent3 = $('.floor_3 .tab_content ul');
      var $tabtitle3 = $('.floor_3 .tab_title li')
      $tabtitle3.on('mousemove', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $tabcontent3.eq($(this).index()).show().siblings($tabcontent3).hide();
        // console.log($(this).index())
      });


      var $tabcontent4 = $('.floor_4 .tab_content ul');
      var $tabtitle4 = $('.floor_4 .tab_title li')
      $tabtitle4.on('mousemove', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $tabcontent4.eq($(this).index()).show().siblings($tabcontent4).hide();
        // console.log($(this).index())
      });
    }();
    // 滚轮滚动
    !function () {
      // 顶部固定效果(放在楼梯效果内了)
      var $headfixed = $('#head-fixed');//取头部固定盒子
      var $scrolltop = $(window).scrollTop();

      // 楼梯效果
      var $louti = $('#leftnav');//左侧楼梯
      var $loutili = $('.leftnav .loutili');
      var $louceng = $('.louti');
      // console.log($loutili);
      // console.log($louceng);//长度7；0-6
      // 滚轮事件显示左侧的楼梯。
      $(window).on('scroll', function () {
          $scrolltop = $(window).scrollTop();
          //  console.log($scrolltop);
          if ($scrolltop >= 350) {//头部固定
            $headfixed.show();
          } else {
            $headfixed.hide();
          }
          if ($scrolltop >= 300) {
            $louti.show();
          } else {
            $louti.hide();
          }
          //  拖动滚轮，对应的楼梯添加对应的类名   
          $louceng.each(function (index) {
            var $top = $louceng.eq(index).offset().top + $(this).innerHeight() / 2;
            if ($top > $scrolltop) {
              $loutili.removeClass('leftnav_item_active');//清除所有类
              // console.log($(this));
              // console.log($(this).index());
              // console.log(index);
              $loutili.eq(index).addClass('leftnav_item_active');
              return false;
            }

          });
      });
      $loutili.on('click',function(){
        $(this).addClass('leftnav_item_active').siblings('li').removeClass('leftnav_item_active'); 
        var $top=$louceng.eq($(this).index()).offset().top;
        console.log($top);
        $('html,body').animate({
          scrollTop:$top
        });
    });
      

      // 回到顶部
      $('.leftnav_item_top').on('click', function () {
        $('html,body').animate({
          scrollTop: 0
        });
      });
    }();
    // 精选品类图片渲染
    !function () {
      $.ajax({
        type: "post",
        url: "http://10.31.162.171/UNIT2/lab/php/get.php",
        dataType: "json"
      }).done(function (data) {
        var $picul = $('.select_sort .pic_list');
        var $strhtml = "";
        var $picli = $('.select_sort .pic_list li');
        // console.log($picli);
        $.each(data, function (index, value) {
          $strhtml += '<li><a href="' + value.link + '" target=_blank title="' + value.title + '"><img src="' + value.picurl + '"></a></li>';
        });
        $picul.html($strhtml);
      });
    }();
    // 无缝链接读取数据
    !function(){
      $.ajax({
        type:"post",
        url:"http://10.31.162.171/UNIT2/lab/php/brands.php",
        dataType:"json"
      }).done(function(data){
        // console.log(data);
        var $brandsfull=$('.brandsfull');
        var $str1="";
        var $str2="";
        var $str3="";
        var $str4="";    
        $.each(data,function(index,value){
          if(index<18){
            $str1+='<li>'+
            '<div class="brandimg">'+
              '<a href="javascript:;" target="_blank" title="'+value.title+'">'+
                '<img alt="'+value.title+'" src="'+value.url+'" height="30" width="120">'+
                '<p class="brandName">'+value.title+'</p>'+
              '</a>'+
            '</div>'+
            '<div class="brandsfudong">'+
              '<a class="brandlinkfd" href="#" target="_blank">进入品牌</a>'+
            '</div>'+
          '</li>'; 
          }else if(index>=18&&index<36){
            $str2+='<li>'+
            '<div class="brandimg">'+
              '<a href="javascript:;" target="_blank" title="'+value.title+'">'+
                '<img alt="'+value.title+'" src="'+value.url+'" height="30" width="120">'+
                '<p class="brandName">'+value.title+'</p>'+
              '</a>'+
            '</div>'+
            '<div class="brandsfudong">'+
              '<a class="brandlinkfd" href="#" target="_blank">进入品牌</a>'+
            '</div>'+
          '</li>'; 
          }else if(index>=36&&index<54){
            $str3+='<li>'+
            '<div class="brandimg">'+
              '<a href="javascript:;" target="_blank" title="'+value.title+'">'+
                '<img alt="'+value.title+'" src="'+value.url+'" height="30" width="120">'+
                '<p class="brandName">'+value.title+'</p>'+
              '</a>'+
            '</div>'+
            '<div class="brandsfudong">'+
              '<a class="brandlinkfd" href="#" target="_blank">进入品牌</a>'+
            '</div>'+
          '</li>';
          }else{
            $str4+='<li>'+
            '<div class="brandimg">'+
              '<a href="javascript:;" target="_blank" title="'+value.title+'">'+
                '<img alt="'+value.title+'" src="'+value.url+'" height="30" width="120">'+
                '<p class="brandName">'+value.title+'</p>'+
              '</a>'+
            '</div>'+
            '<div class="brandsfudong">'+
              '<a class="brandlinkfd" href="#" target="_blank">进入品牌</a>'+
            '</div>'+
          '</li>';
          }
        });
        // console.log($str1);
        var $ul1=$('<ul>'+$str1+'</ul>');
        var $ul2=$('<ul>'+$str2+'</ul>');
        var $ul3=$('<ul>'+$str3+'</ul>');
        var $ul4=$('<ul>'+$str4+'</ul>');
        $brandsfull.append($ul3);
        $brandsfull.append($ul1);
        $brandsfull.append($ul2);
        $brandsfull.append($ul3.clone(true));
        $brandsfull.append($ul1.clone(true));

        // $brandsfull.append($ul1);
      });

    }();
    // 无缝链接效果
    !function(){
      var $brandschange=$('.brands_center .change');
      // console.log($brandsfull.position().left);
      // var $changeboxleft=$brandschange.position().left;
      // var $move=840;
      $brandschange.stop(true).on('click',scroll);
      setInterval(scroll,4000); 
      function scroll(){
        var $brandsfull=$('.brandsfull');
        var $move=840;
        if($brandsfull.position().left<=-3360){
          $brandsfull.css({
            left:-840
          });
          $brandsfull.stop(true,true).animate({
            left:$brandsfull.position().left-$move,     
            }); 
        }else{
          $brandsfull.stop(true,true).animate({
          left:$brandsfull.position().left-$move,     
          }); 
        }        
     }
    }();
      
     
    // 第一层tab 切换
    !function () {
      $.ajax({
        type: "post",
        url: "http://10.31.162.171/UNIT2/lab/php/loutidata.php",
        dataType: "json"
      }).done(function (data) {
        var $floorul = $('.floor_1 .tab_content ul');
        var $floorli = $('.floor_1 .tab_content li');
        var $producttitle = $('.floor_1 .f_name');
        // console.log($producttitle);
        var URL="http://10.31.162.171/UNIT2/lab/src/details.html";
        $.each(data, function (index, value) {
          $floorli.eq(index).find('.f_img img').attr('src',value.picurl);
          $floorli.eq(index).find('.f_img a').attr('href',URL+'?sid='+value.sid);

          $floorli.eq(index).find('.f_img a').attr('index', value.sid);

          $producttitle.eq(index).find('a').html(value.title);
          // console.log(value.picurl);
          // console.log(value.title);
        });

      });
    }();
    // 读取cookie
    !function(){
      var $toplogin=$('.toplogin');
      var $cartnum=$('#cartnum');
      if($.cookie('Username')){
        $('.loginregin').hide();
        $('.admain').show();
        $('.gerenxinxi').find('.wellcome').html('Hi&nbsp;!,'+$.cookie('Username')+',<br>欢迎来到来宝！');
        $toplogin.html('退出');
        $toplogin.attr('href','javascript:;');
        // 点击退出
        $toplogin.on('click',function(){
          $('.gerenxinxi').find('.wellcome').html('欢迎登录来宝!');	
          $('.loginregin').show();
          $('.exit').hide();
  
          $.cookie('Username','',{expires:-1});
          $.cookie('Password','',{expires:-1});
          $toplogin.html('登录');
          $toplogin.attr('href','http://10.31.162.171/UNIT2/lab/src/login.html');
        });
      $('.admain a').on('click',function(){
        $('.gerenxinxi').find('.wellcome').html('欢迎登录来宝!');	
        $('.loginregin').show();
        $('.exit').hide();

        $.cookie('Username','',{expires:-1});
        $.cookie('Password','',{expires:-1});

        $toplogin.html('登录');
          $toplogin.attr('href','http://10.31.162.171/UNIT2/lab/src/login.html');
      });
      }
      if($.cookie('cartnum')){
        var $num=$.cookie('cartnum').split(',');
        console.log($num);
        console.log(typeof($num));
        var $count=0;
        $.each($num,function(index,value){
          $count+=parseInt(value);
        });
        $cartnum.html($count);
      }
    }();
  });
});