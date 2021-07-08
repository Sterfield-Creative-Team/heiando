var $fsJq = jQuery.noConflict();

$fsJq(function(){
	$fsJq('body').delegate('.currencySelector','change',function(){
		var currencyId = $fsJq(this).val()

		$fsJq('#hiddenCurrencyId').val(currencyId);
  		$fsJq('#hiddenCurrencySubmit').attr('name', 'changeCurrency').click();
	});
});

//----- uri -----
function fs_get_shoproot_uri() {
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

