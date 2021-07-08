function initialize() {

/* 地図のオプションを指定 */
var myOptions = {
	zoom: 13,
	center: new google.maps.LatLng(35.668344, 139.740827),
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

/* 地図を表示 */
var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);

/* 地図情報の配列 */
var markers = [
	['DAIKANYAMA ( flagship )', 35.648716, 139.699954],
	['NIHONBASHI', 35.686182, 139.774450],
	['GINZA', 35.669607, 139.764018]
	];



/* for文で markers.length の配列要素分、繰り返し処理を行う */
for (var i = 0; i < markers.length; i++) {

/* 配列markers[i][0]を変数nameに格納 */
var name = markers[i][0];

/* 配列markers[i][1]とmarkers[i][2]を変数latlng に格納 */
var latlng = new google.maps.LatLng(markers[i][1],markers[i][2]);

/* アイコンをAからの連番で指定 */
var icons = 'http://www.google.com/mapfiles/marker' + String.fromCharCode(65 + i) + '.png';

/* 関数createMarkerに引数を指定 */
createMarker(latlng,name,icons,map)
}
}



/* 引数で渡された値を変数に代入し｛｝内の処理を実行 */
function createMarker(latlng,name,icons,map) {

/* InfoWindowクラスのオブジェクトを作成 */
var infoWindow = new google.maps.InfoWindow();

/* 指定したオプションを使用してマーカーを作成 */
var marker = new google.maps.Marker({position: latlng,icon:icons,map: map});

/* addListener を使ってイベントリスナを追加 */
/* 地図上のmarkerがクリックされると｛｝内の処理を実行 */
google.maps.event.addListener(marker, 'click', function() {

/* InfoWindowOptionsオブジェクトを指定 */
infoWindow.setContent(name);

/* マーカーに情報ウィンドウを表示 */
infoWindow.open(map,marker);   
});
} 



/* ページ読込時に地図を表示 */
google.maps.event.addDomListener(window, 'load', initialize);