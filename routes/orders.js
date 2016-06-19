var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var XmlDocument = require('xmldoc').XmlDocument;
var jwt = require('jsonwebtoken');

router.use('/', function(req, res, next) {
	var token;
	if (req.query.token)
		token = req.query.token;
	else if (req.body.token)
		token = req.body.token;
	jwt.verify(token, 'b2b_user_key', function(err, decoded) {
		if (err) {
			return res.status(401).json({
				message: 'Ошибка авторизации!',
				error: err
			});
		}
		next();
	});
});

router.get('/', function(req, res, next) {
	executeStatusOrderSoapRequest(
		req.query.userId,
		function (data, status, req) {
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.soap:Reason.soap:Text');
			res.render('error', {
				message: 'Ошибка!',
				error: resultText
			});
		},
		function (data, status, req) {
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.m:StatusOrderResponse.m:return');
			var result = JSON.parse(resultText);

			// Промежуточная обработка списка заказов.
			var orders = [];
			for (var index1 = 0; index1 < result.length; index1 = index1 + 1) {
				var order = result[index1];
				//order["ПризнакИзменения"] = false;
				for (var index2 = 0; index2 < order["МассивСтрокЗаказа"].length; index2 = index2 + 1) {
					var row = order["МассивСтрокЗаказа"][index2];
					row['Идентификатор'] = '' + index1 + '.' + index2; // Задать строке заказа уникальный идентификатор.
				}
				orders.push(order);
			}

			res.render('shop/orders', {layout: false, data: orders});
		}
	);
});

router.post('/', function (req, res, next) {
	executeMainOrder(
		req.body.order,
		function (data, status, req) {
			console.log('data = ' + data);
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.soap:Reason.soap:Text');
			console.log('resultText = ' + resultText);
			return res.status(status).json({
				message: 'Ошибка!',
				error: JSON.parse(resultText)
			});
		},
		function (data, status, req) {
			console.log('data = ' + data);
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.m:MainOrderResponse.m:return');
			console.log('executeMainOrder, resultText = ' + resultText);
			return res.status(200).json({
				message: 'Success',
				obj: resultText
			});
		}
	);
});

router.put('/', function (req, res, next) {
	executeModifiedOrder(
		req.body.order,
		function (data, status, req) {
			console.log('data = ' + data);
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.soap:Reason.soap:Text');
			console.log('resultText = ' + resultText);
			return res.status(status).json({
				message: 'Ошибка!',
				error: JSON.parse(resultText)
			});
		},
		function (data, status, req) {
			console.log('data = ' + data);
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.m:ModifyOrderResponse.m:return');
			console.log('executeModifiedOrder, resultText = ' + resultText);
			return res.status(200).json({
				message: 'Success',
				obj: resultText
			});
		}
	);
});

function executeStatusOrderSoapRequest(idSession, processError, processSuccess) {
	var wsUrl, wsUser, wsPassword, soapRequest, xhr;

	wsUrl = 'https://torg-b2b.ru/B2B_TEST/ws/Authorization';
	//wsUrl = 'https://' + window.location.host + '/B2B/ws/Authorization';
	wsUser = 'web_user';
	wsPassword = 'WebU$er';

	soapRequest =
		'<?xml version="1.0" encoding="utf-8"?>' +
		'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mik="http://www.mik_b2b.ru/">' +
		'   <soapenv:Header/>' +
		'   <soapenv:Body>' +
		'      <mik:StatusOrder>' +
		'			<mik:IdSession>' + idSession + '</mik:IdSession>' +
		'     </mik:StatusOrder>' +
		'   </soapenv:Body>' +
		'</soapenv:Envelope>';

	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200)
				processSuccess(xhr.responseText, xhr.status, xhr.request);
			else
				processError(xhr.responseText, xhr.status, xhr.request);
		}
	}
	xhr.open("POST", wsUrl, true, wsUser, wsPassword);
	xhr.setRequestHeader( "Content-Type","text/xml; charset=utf-8");
	xhr.send(soapRequest);
};

function executeMainOrder(order, processError, processSuccess) {
	var wsUrl, wsUser, wsPassword, soapRequest, xhr;

	//wsUrl = 'https://' + window.location.host + '/B2B/ws/Authorization';
	wsUrl = 'https://torg-b2b.ru/B2B_TEST/ws/Authorization';
	wsUser = 'web_user';
	wsPassword = 'WebU$er';

	soapRequest =
		'<?xml version="1.0" encoding="utf-8"?>' +
		'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mik="http://www.mik_b2b.ru/">' +
		'   <soapenv:Header/>' +
		'   <soapenv:Body>' +
		'      <mik:MainOrder>' +
		'			<mik:IdSession>' + order + '</mik:IdSession>' +
		'     </mik:MainOrder>' +
		'   </soapenv:Body>' +
		'</soapenv:Envelope>';

	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			console.log('Server.executeMainOrder, xhr.status = ' + xhr.status);
			if (xhr.status === 200)
				processSuccess(xhr.responseText, xhr.status, xhr.request);
			else
				processError(xhr.responseText, xhr.status, xhr.request);
		}
	}
	xhr.open("POST", wsUrl, true, wsUser, wsPassword);
	xhr.setRequestHeader( "Content-Type","text/xml; charset=utf-8");
	xhr.send(soapRequest);
};

function executeModifiedOrder(order, processError, processSuccess) {
	var wsUrl, wsUser, wsPassword, soapRequest, request;

	//wsUrl = 'https://' + window.location.host + '/B2B/ws/Authorization';
	wsUrl = 'https://torg-b2b.ru/B2B_TEST/ws/Authorization';
	wsUser = 'web_user';
	wsPassword = 'WebU$er';

	soapRequest =
		'<?xml version="1.0" encoding="utf-8"?>' +
		'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mik="http://www.mik_b2b.ru/">' +
		'   <soapenv:Header/>' +
		'   <soapenv:Body>' +
		'      <mik:ModifyOrder>' +
		'			<mik:OrderStructure>' + order + '</mik:OrderStructure>' +
		'     </mik:ModifyOrder>' +
		'   </soapenv:Body>' +
		'</soapenv:Envelope>';

	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			console.log('Server.executeMainOrder, xhr.status = ' + xhr.status);
			if (xhr.status === 200)
				processSuccess(xhr.responseText, xhr.status, xhr.request);
			else
				processError(xhr.responseText, xhr.status, xhr.request);
		}
	}
	xhr.open("POST", wsUrl, true, wsUser, wsPassword);
	xhr.setRequestHeader( "Content-Type","text/xml; charset=utf-8");
	xhr.send(soapRequest);
};

module.exports = router;