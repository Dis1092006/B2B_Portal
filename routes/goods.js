var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var router = express.Router();

router.get('/', function(req, res, next) {

	// this.goods.push(new GoodsItem('0', 0, true, '01 ЭЛЕКТРОНИКА И ЦИФРОВАЯ ТЕХНИКА'));
	// this.goods.push(new GoodsItem('1', 1, true, '01 ТЕЛЕВИЗОРЫ'));
	// this.goods.push(new GoodsItem('2', 2, true, '1 ТЕЛЕВИЗОРЫ'));
	// this.goods.push(new GoodsItem('3', 3, true, 'ERISSON'));
	// this.goods.push(new GoodsItem('4', 4, false, 'Телевизор LED ERISSON 32LES70Т2', 12700, 0.0765, 'DVB-T2/C,DVB-S/S2 (спутниковый тюнер) 31,5", LED,slim design, HD,16∶9, ярк. 250 кд/м2, контраст.(стат.) 3000:1, разр. 1366x768, время откл. 8 мс, 100 +DTV 1000 каналов, PAL/SECAM BG/DK/I, телетекст,слот CI+,многофункц.таймер,A2 stereo,Input jack,3*HDMI,2*USB movie+запись, VGA, SCART,S-Video,Headphones,RCA,Virtual Dolby,макс. потр. мощн. 65 Вт, '));

	executeTreeBalanceSoapRequest(
		'7da17152-368a-11df-bb1d-001e4f153b06',
		'',
		function (data, status, req) {
			var resultText = $(data.responseText).find("faultstring").html();
			return res.status(404).json({
				title: 'Ошибка!',
				error: data.status + " " + data.statusText + " " + resultText
			});
		},
		function (data, status, req) {
			var resultText, result, Goods, tree;

			resultText = $(req.responseText).find("m\\:return").html();
			console.log(resultText);
			res.status(200).json({
				message: 'Success',
				obj: resultText
			});
			// result = JSON.parse(resultText);
			//
			// Goods = require('./goods');
			// current_goods = new Goods();
			//
			// current_goods.setGoods(result);
		});


	res.render('index');
});

function executeTreeBalanceSoapRequest (legal_entity, filter, processError, processSuccess) {
	var wsUrl, wsUser, wsPassword, soapRequest, request;

	wsUrl = 'https://192.168.6.111/B2B_TEST/ws/Authorization';
	//wsUrl = 'https://' + window.location.host + '/B2B/ws/Authorization';
	wsUser = 'web_user';
	wsPassword = 'WebU$er';

	soapRequest =
		'<?xml version="1.0" encoding="utf-8"?>' +
		'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mik="http://www.mik_b2b.ru/">' +
		'   <soapenv:Header/>' +
		'   <soapenv:Body>' +
		'      <mik:TreeBalance>' +
		'			<mik:IdSession>' + legal_entity + '</mik:IdSession>' +
		'			<mik:Filter>' + filter + '</mik:Filter>' +
		'     </mik:TreeBalance>' +
		'   </soapenv:Body>' +
		'</soapenv:Envelope>';

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			console.log( 'xhr.status = ' + xhr.status );
			console.log( 'result = ' + xhr.responseText );
			//var resp = unescape(xmlHTTP.responseXML.xml);
		}
	}
	xhr.open("POST", wsUrl, true, wsUser, wsPassword);
	xhr.setRequestHeader( "Content-Type","text/xml; charset=utf-8");
	//xhr.setRequestHeader("SOAPAction", "http://tempuri.org/HelloWorld");
	xhr.send(soapRequest);

	// request = $.ajax({
	// 	type: "POST",
	// 	url: wsUrl,
	// 	contentType: "text/xml",
	// 	dataType: "xml",
	// 	username: wsUser,
	// 	password: wsPassword,
	// 	data: soapRequest,
	// 	error: processError,
	// 	success: processSuccess
	// });
};

module.exports = router;
