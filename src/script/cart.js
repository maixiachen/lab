// 导入公共模块
!function(){
  $('#topcontent').load('header.html');
  $('#footercontent').load('footer.html');
}(jQuery);
// 菜单栏
!function(){
  $('#topcontent').on('mouseover',$('.allsort'),function(){
    // console.log($('.allsort'));
    var $menubox=$('#menu_content_box')
    var $allsort=$('.allsort');
    var $menu_content=$('#menu_content');
    $menubox.on('mouseover',function(){
      $menu_content.show();
    });
    $menubox.on('mouseout',function(){
      $menu_content.hide();
      
    });
  });
}(jQuery);



function addCookie(key,value,day){
  var date=new Date();
  date.setDate(date.getDate()+day);
  document.cookie=key+'='+encodeURI(value)+';expires='+date;
}

function getCookie(key){
  var str=decodeURI(document.cookie);
  var arr=str.split('; ');
  for(var i=0;i<arr.length;i++){
      var arr1=arr[i].split('=');
      if(arr1[0]==key){
          return arr1[1];
      }
  }
}
function delCookie(key){
  addCookie(key,'',-1);
}
//--------------------------------------------
// 购物车操作
!function(){

function createcart(sid, num) {
  $.ajax({
      url: 'http://10.31.162.171/UNIT2/lab/php/loutidata.php',
      dataType: 'json'
  }).done(function(data) {
      for (var i = 0; i < data.length; i++) {
          if (sid == data[i].sid) {
              var $clone = $('.goods-item:hidden').clone(true);
              $clone.find('.goods-pic').find('img').attr('src', data[i].picurl);
              $clone.find('.goods-pic').find('img').attr('sid', data[i].sid);
              $clone.find('.goods-d-info').find('a').html(data[i].title);
              $clone.find('.b-price').find('strong').html(data[i].askprice);
              $clone.find('.quantity-form').find('input').val(num);
              $clone.find('.goods-pic').find('img').attr('src', data[i].picurl);
              $clone.find('.goods-d-info').find('a').attr('href','http://10.31.162.171/UNIT2/lab/src/details.html?sid='+data[i].sid);
              var $dj1 = parseFloat($clone.find('.b-price strong').html());
              $clone.css('display', 'block');
              $('.item-list').append($clone);
              kong();
              totalprice();
          }
      }
  });
}

var sidarr = [];
var numarr = [];
function cookieToArray(){
  if(getCookie('cartsid')){
      sidarr=getCookie('cartsid').split(',');
  }
  
  if(getCookie('cartnum')){
      numarr=getCookie('cartnum').split(',');
  }
}


$('.goods-list ul').on('click', '.p-btn a', function() {
  var sid = $(this).parents('.goodsinfo').find('.loadimg').attr('sid');
  cookieToArray();
  if ($.inArray(sid, sidarr) != -1) {
      $('.goods-item:visible').each(function() {
          if (sid == $(this).find('img').attr('sid')) {
              var $num = $(this).find('.quantity-form input').val();
              $num++;
              $(this).find('.quantity-form input').val($num);
              var $dj = parseFloat($(this).find('.b-price strong').html());

              
              numarr[$.inArray(sid, sidarr)] = $num;
              addCookie('cartnum', numarr.toString(), 7);
              totalprice();
          }
      });
  }else{
      sidarr.push(sid);
      addCookie('cartsid', sidarr.toString(), 7);
      numarr.push(1);
      addCookie('cartnum', numarr.toString(), 7);
      createcart(sid, 1);
      totalprice();
  }
});

if (getCookie('cartsid') && getCookie('cartnum')) {
  var s = getCookie('cartsid').split(',');//存放sid数组
  var n = getCookie('cartnum').split(',');//存放数量数组
  for (var i = 0; i < s.length; i++) {
      createcart(s[i], n[i]);//遍历创建商品列表
  }
}



//4.商品列表(cookie)不存在，购物车为空
kong();
function kong() {
  if (getCookie('cartsid')) {//cookie存在，有商品，购物车不再为空
      $('.empty-cart').hide();
  } else {
      $('.empty-cart').show();
  }
}

//5.每个商品的总价已经通过创建时求得了。求所有商品的总价和总的商品的个数
function totalprice() {//计算总价
  var total = 0;//总的价格
  var countnum = 0;//总的数量
  $('.goods-item:visible').each(function() {//可视的商品列表进行遍历，循环叠加
      if ($(this).find('input:checkbox').is(':checked')) {//商品的复选框是选中的
          // total += parseFloat($(this).find('.b-sum strong').html());
          countnum += parseInt($(this).find('.quantity-form').find('input').val());
      }
  });
  //赋值
  $('.totalprice').html('在线询价');
  $('.amount-sum em').html(countnum);
}

//6.修改数量的操作
//改变商品数量++
$('.quantity-add').on('click', function() {
  var $count = $(this).parents('.goods-item').find('.quantity-form input').val();
  $count++;
  if ($count >= 99) {
      $count = 99;
  }
  $(this).parents('.goods-item').find('.quantity-form input').val($count);
  // $(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this)));//改变后的价格
  totalprice();
  setcookie($(this));

});


//改变商品数量--
$('.quantity-down').on('click', function() {
  var $count = $(this).parents('.goods-item').find('.quantity-form input').val();
  $count--;
  if ($count <= 1) {
      $count = 1;
  }
  $(this).parents('.goods-item').find('.quantity-form input').val($count);
  // $(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this)));//改变后的价格
  totalprice();
  setcookie($(this));
});


//直接输入改变数量
$('.quantity-form input').on('input', function() {
  var $reg = /^\d+$/g; //只能输入数字
  var $value = parseInt($(this).val());
  if ($reg.test($value)) {
      if ($value >= 99) {//限定范围
          $(this).val(99);
      } else if ($value <= 0) {
          $(this).val(1);
      } else {
          $(this).val($value);
      }
  } else {
      $(this).val(1);
  }
  $(this).parents('.goods-item').find('.b-sum').find('strong').html('在线询价');//改变后的价格singlegoodsprice($(this))
  totalprice();
  setcookie($(this));
});

//7.计算数量改变后单个商品的价格
// function singlegoodsprice(row) { //row:当前元素
//   var $dj = parseFloat(row.parents('.goods-item').find('.b-price').find('strong').html());
//   var $cnum = parseInt(row.parents('.goods-item').find('.quantity-form input').val());
//   return ($dj * $cnum).toFixed(2);
// }

//9.将改变后的数量的值存放到cookie
function setcookie(obj) { //obj:当前操作的对象
  cookieToArray();
  var $index = obj.parents('.goods-item').find('img').attr('sid');
  numarr[sidarr.indexOf($index)] = obj.parents('.goods-item').find('.quantity-form input').val();
  addCookie('cartnum', numarr.toString(), 7);
}


//8.全选
$('.allsel').on('change', function() {
  $('.goods-item:visible').find('input:checkbox').prop('checked', $(this).prop('checked'));
  $('.allsel').prop('checked', $(this).prop('checked'));
  totalprice();//求和
});

var $inputchecked = $('.goods-item:visible').find('input:checkbox');//获取委托元素
$('.item-list').on('change', $inputchecked, function() {
  var $inputs = $('.goods-item:visible').find('input:checkbox'); //放内部
  if ($('.goods-item:visible').find('input:checked').length == $inputs.size()) {
      $('.allsel').prop('checked', true);
  } else {
      $('.allsel').prop('checked', false);
  }
  totalprice();
});


//10.删除
//删除cookie的函数
function delgoodslist(sid, sidarr) {//sid：当前的sid，sidarr:cookie的sid的值
  var index = -1;
  for (var i = 0; i < sidarr.length; i++) {
      if (sid == sidarr[i]) {
          index = i;
      }
  }
  sidarr.splice(index, 1);//删除数组对应的值
  numarr.splice(index, 1);//删除数组对应的值
  addCookie('cartsid', sidarr.toString(), 7);//添加cookie
  addCookie('cartnum', numarr.toString(), 7);
}

//删除单个商品的函数(委托)
$('.item-list').on('click', '.b-action a', function(ev) {
  cookieToArray(); //转数组
 if(confirm('你确定要删除吗？')){
   $(this).first().parents('.goods-info').remove();
 }
  delgoodslist($(this).first().parents('.goods-info').find('img').attr('sid'), sidarr);
  totalprice();
});


//删除全部商品的函数
$('.operation a:first').on('click', function() {
  $('.goods-item:visible').each(function() {
      if ($(this).find('input:checkbox').is(':checked')) {
          $(this).remove();
          delgoodslist($(this).find('img').attr('sid'), sidarr);
      }
  });
  totalprice();
});
}(jQuery);
!function(){
  $('body').one('mouseover',function(){
    var $toplogin=$('.toplogin');
    console.log($toplogin);
    if(getCookie('Username')!=''){
      $toplogin.html('退出');
      $toplogin.on('click',function(){
        delCookie('Username');
      $toplogin.html('登录');
      $toplogin.attr('href','http://10.31.162.171/UNIT2/lab/src/login.html');
    });
    }
    
  });
}(jQuery);
