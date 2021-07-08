<html>
<head>
<meta content="text/html; charset=UTF-8" http-equiv="content-type">

<link rel="alternate stylesheet" type="text/css" href="resource://gre-resources/plaintext.css" title="長い行を折り返す"></head><body>
<pre>function initialize() {

/* 地図のオプションを指定 */
var myOptions = {
	zoom: 4,
	center: new google.maps.LatLng(36.666779, 139.592608),
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

/* 地図を表示 */
var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);

/* 地図情報の配列 */
var markers = [
	['[YH] DAIKANYAMA ( flagship )', 35.648716, 139.699954],
	['[YH] GINZA', 35.669607, 139.764018],

	['TOKYU SHIBUYA FLAGSHIP STORE', 35.660673, 139.696029],
	['SEIBU SHIBUYA', 35.660759, 139.700368],
	['ISETAN SHINJUKU', 35.691620, 139.704616],
	['ODAKYU SHINJUKU', 35.691330, 139.699537],
	['KEIO SHINJUKU', 35.690220, 139.699150],
	['MITSUKOSHI NIHONBASHI FLAGSHIP STORE', 35.685609, 139.773416],
	['TAKASHIMAYA NIHONBASHI', 35.680684, 139.773381],
	['MATSUYA GINZA', 35.672256, 139.766709],
	['SEIBU IKEBUKURO FLAGSHIP STORE', 35.729087, 139.711690],
	['TOBU IKEBUKURO', 35.729705, 139.710244],
	['TAKASHIMAYA TAMAGAWA', 35.614170, 139.626814],
	['ODAKYU MACHIDA', 35.543983, 139.445073],
	['ISETAN FUCHU', 35.670875, 139.479954],
	['ISETAN TACHIKAWA', 35.699577, 139.412855],

	['TAKASHIMAYA YOKOHAMA', 35.465387, 139.620770],
	['SOGO YOKOHAMA', 35.465431, 139.625032],
	['ISETAN SAGAMIHARA', 35.533296, 139.434647],
	['ODAKYU FUJISAWA', 35.337547, 139.487659],

	['MATSUZAKAYA NAGOYA', 35.165279, 136.907927],

	['SEIBU AKITA', 39.717127, 140.126643],

	['SOGO CHIBA', 35.611145, 140.113872],
	['ISETAN MATSUDO', 35.782141, 139.898918],

	['SEIBU FUKUI', 36.061848, 136.219085],

	['MITSUKOSHI FUKUOKA', 33.588710, 130.399966],
	['IWATAYA FLAGSHIP STORE', 33.588830, 130.397418],
	['IZUTSUYA KOKURA', 33.884482, 130.878155],
	['IZUTSUYA KUROSAKI', 33.866456, 130.768515],

	['TAKASHIMAYA TAKASAKI', 36.324229, 139.010976],

	['SOGO HIROSHIMA', 34.395999, 132.457140],

	['MARUI IMAI SAPPORO FLAGSHIP STORE', 43.060198, 141.354918],

	['DAIMARU KOBE', 34.688624, 135.190503],

	['PARC AVENUE KAWATOKU', 39.700740, 141.146967],

	['TAKASHIMAYA KYOTO', 35.003252, 135.768132],

	['YAMAKATAYA KAGOSHIMA', 31.593232, 130.556727],

	['MITSUKOSHI SENDAI', 38.265119, 140.871217],
	['FUJISAKI FLAGSHIP STORE', 38.260242, 140.872699],

	['YAMAKATAYA MIYAZAKI', 31.916131, 131.423915],

	['INOUE NAGANO', 36.229729, 137.968054],

	['ISETAN NIIGATA', 37.915560, 139.054867],

	['RYUBO', 26.213827, 127.679374],

	['ISETAN LUCUA 1100 OSAKA', 34.702996, 135.495259],
	['TAKASHIMAYA OSAKA', 34.664832, 135.501644],
	['HANKYU UMEDA FLAGSHIP STORE', 34.702462, 135.498494],

	['SEIBU TOKOROZAWA', 35.785851, 139.472366],
	['ISETAN URAWA', 35.859115, 139.656255],
	['SOGO OMIYA', 35.904729, 139.622029],
	['YAGIHASHI', 36.146028, 139.381795],

	['SEIBU OTSU', 35.004342, 135.881912],

	['ISETAN SHIZUOKA', 34.974857, 138.381129],

	['ONUMA YAMAGATA FLAGSHIP STORE', 38.252681, 140.338381]

	];




/* for文で markers.length の配列要素分、繰り返し処理を行う */
for (var i = 0; i &lt; markers.length; i++) {

/* 配列markers[i][0]を変数nameに格納 */
var name = markers[i][0];

/* 配列markers[i][1]とmarkers[i][2]を変数latlng に格納 */
var latlng = new google.maps.LatLng(markers[i][1],markers[i][2]);

/* 関数createMarkerに引数を指定 */
createMarker(latlng,name,map)
}
}



/* 引数で渡された値を変数に代入し｛｝内の処理を実行 */
function createMarker(latlng,name,map) {

/* InfoWindowクラスのオブジェクトを作成 */
var infoWindow = new google.maps.InfoWindow();

/* 指定したオプションを使用してマーカーを作成 */
var marker = new google.maps.Marker({position: latlng,map: map});

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
google.maps.event.addDomListener(window, 'load', initialize);</pre></body></html>