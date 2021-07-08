var submit=true;
function canSubmit(){
  if(submit){
    submit=false;
    setTimeout('recover()',1000);
    return true;
  } else {
    return false;
  }
}
function orderDecide(){
  if(submit){
    document.getElementById('FS2_OrderDecideButton_container').style.display="none";
    document.getElementById('FS2_OrderProcessingComment_container').style.display="block";
    submit=false;
    setTimeout('recover()',30000);
    return true;
  } else {
    return false;
  }
}

function recover(button){
  submit=true;
}

function countUp(obj){
  if(obj==null)
    return false;

  if(obj.value == null || obj.value =='' || isNaN(obj.value)){
    obj.value=1;
    return false;
  }

  value=parseInt(obj.value)+1;
  if(value<=0)
    value = 1;

  obj.value=value;

  return false;
}

function countDown(obj){
  if(obj==null)
    return false;

  if(obj.value==null || obj.value =='' || isNaN(obj.value)){
    obj.value=1;
    return false;
  }

  value=parseInt(obj.value)-1;
  if(value<=0)
    value = 1;

  obj.value=value;

  return false;
}

function fsConvertCharacter(value){
  var valueArray = value.split(",");
  var mailaddress="",afterChar="";
  for(i=0;i<valueArray.length;i++){
      afterChar=eval(valueArray[i]) + 1;
      mailaddress +=String.fromCharCode(afterChar);
  }
  return mailaddress;
}


//----- write cookie -----
function fs_write_cookie (key, value, expires, path) {
    var str = key + "=" + escape(value) + ";";
    if (expires) {
        str += "expires=" + expires.toGMTString() + ";";
    }
    if (path) {
        str += "path=" + path + ";";
    }
    document.cookie = str;
}

//----- has cookie -----
function fs_has_cookie (key) {
  var cookies = document.cookie + ";";
  var a_cookies = cookies.split(";");
  for (var i=0; i<a_cookies.length; i++) {
    var cookieSet = a_cookies[i];
    cookieSet = cookieSet.replace(/(^\s+)|(\s+$)/g, "");
    var a_cookie = cookieSet.split("=");
    if (a_cookie.length >= 2) {
      if (key == a_cookie[0]) {
        return true;
      }
    }
  }
  return false;
}

//----- delete cookie -----
function fs_delete_cookie (key, path) {
    var str = key + "=;";
    var expires = new Date();
    expires.setHours(expires.getHours() - 1);
    str += "expires=" + expires.toGMTString() + ";";
    if (path) {
        str += "path=" + path + ";";
    }
    document.cookie = str;
}

var FS_FORCE_PC_COOKIE = "fs_force_pc_view";

function fs_force_pc_delete () {
  fs_write_cookie (FS_FORCE_PC_COOKIE, "false", 0, fs_get_shoproot_uri());
  location.reload(true);
}

function fs_get_shoproot_uri () {
    var root = "";
    var uri = location.pathname;

    var idx1 = uri.indexOf("/");
    var idx2 = uri.indexOf("/", idx1+1);
    var idx3 = uri.indexOf("/", idx2+1);
    if (idx3 > -1) {
        root = uri.substring(0, idx3+1);
    } else {
        root = uri;
    }
    return root;
}

function checkCheckBoxSelected(name){
  var array=document.getElementsByName(name);
  if(array==null){return false;}
  for (i = 0; i < array.length; i++) {if(array[i].checked){return true;}}
  return false;
}

jQuery.noConflict();
(function($) {
  $(function() {
    var JAPAN_CODE = '0';

    $('#countrySelect').change(function() {
      var $select = $(this);
      // when before or after country is Japan
      if ($select.val() === JAPAN_CODE ^ $('#currentCountryId').val() === JAPAN_CODE) {
        $('#changeCountrySubmit').click();
      } else {
        //nop
      }
    });
  });
})(jQuery);
