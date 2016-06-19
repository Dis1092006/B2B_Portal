var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var XmlDocument = require('xmldoc').XmlDocument;
var jwt = require('jsonwebtoken');

router.use('/', function(req, res, next) {
	jwt.verify(req.query.token, 'b2b_user_key', function(err, decoded) {
		if (err) {
			return res.status(401).json({
				message: 'Ошибка авторизации!',
				error: err
			});
		}
		next();
	});
});

router.get('/', function (req, res, next) {
	var totalProcessed = 0;
	var totalError = '';
	var Goods = require('../models/goods');
	var current_goods = new Goods();
	var filter = {};

	executeAvailableFiltersSoapRequest(
		'7da17152-368a-11df-bb1d-001e4f153b06',
		'',
		function (data, status, req) {
			totalProcessed++;
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.soap:Reason.soap:Text');
			totalError += resultText + '\n';
			if (totalProcessed == 2) {
				res.render('error', {
					message: 'Ошибка!',
					error: totalError
				});
			}
		},
		function (data, status, req) {
			totalProcessed++;
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.m:AvailableFiltersForFiltersResponse.m:return');
			filter = JSON.parse(resultText);
			if (totalProcessed == 2) {
				var table = current_goods.getGoodsTableView(undefined, true, 1000);
				res.render(
					'shop/goods',
					{
						layout: false,
						data: table,
						group1List: filter["Группа1"],
						group2List: filter["Группа2"],
						group3List: filter["Группа3"],
						group4List: filter["Группа4"],
						brendList: filter["Бренд"]
					});
			}
		}
	);
	executeTreeBalanceSoapRequest(
		'7da17152-368a-11df-bb1d-001e4f153b06',
		'',
		function (data, status, req) {
			totalProcessed++;
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.soap:Reason.soap:Text');
			totalError += resultText + '\n';
			if (totalProcessed == 2) {
				res.render('error', {
					message: 'Ошибка!',
					error: totalError
				});
			}
		},
		function (data, status, req) {
			totalProcessed++;
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.m:TreeBalanceResponse.m:return');
			var result = JSON.parse(resultText);
			current_goods.setGoods(result);
			if (totalProcessed == 2) {
				var table = current_goods.getGoodsTableView(undefined, true, 1000);
				res.render(
					'shop/goods',
					{
						layout: false,
						data: table,
						group1List: filter["Группа1"],
						group2List: filter["Группа2"],
						group3List: filter["Группа3"],
						group4List: filter["Группа4"],
						brendList: filter["Бренд"]
					});
			}
		}
	);
});

router.get('/data', function(req, res, next) {

	executeTreeBalanceSoapRequest(
		req.query.legalEntity,
		req.query.filter,
		function (data, status, req) {
			//var resultText = $(data.responseText).find("faultstring").html();
			//var dataText = data.replace('/\r\n/g', '');
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.soap:Reason.soap:Text');
			return res.status(status).json({
				message: 'Ошибка!',
				error: resultText
			});
		},
		function (data, status, req) {
			//resultText = $(req.responseText).find("m\\:return").html();
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.m:TreeBalanceResponse.m:return');
			return res.status(200).json({
				message: 'Success',
				obj: resultText
			});
		}
	);
});

router.get('/filters', function(req, res, next) {

	executeAvailableFiltersSoapRequest(
		req.query.legalEntity,
		req.query.filter,
		function (data, status, req) {
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.soap:Reason.soap:Text');
			return res.status(status).json({
				message: 'Ошибка!',
				error: resultText
			});
		},
		function (data, status, req) {
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.m:AvailableFiltersForFiltersResponse.m:return');
			return res.status(200).json({
				message: 'Success',
				obj: resultText
			});
		}
	);
});

router.get('/pictures', function(req, res, next) {

	executePictures(
		req.query.idProduct,
		function (data, status, req) {
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.soap:Reason.soap:Text');
			return res.status(status).json({
				message: 'Ошибка!',
				error: resultText
			});
		},
		function (data, status, req) {
			var xmlData = new XmlDocument(data);
			var resultText = xmlData.valueWithPath('soap:Body.m:PicturesResponse.m:return');
			return res.status(200).json({
				message: 'Success',
				obj: resultText
			});
		}
	);
});

function executeTreeBalanceSoapRequest(legal_entity, filter, processError, processSuccess) {
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
		'      <mik:TreeBalance>' +
		'			<mik:IdSession>' + legal_entity + '</mik:IdSession>' +
		'			<mik:Filter>' + filter + '</mik:Filter>' +
		'     </mik:TreeBalance>' +
		'   </soapenv:Body>' +
		'</soapenv:Envelope>';

	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			//var resp = unescape(xhr.responseText);
			if (xhr.status === 200)
				processSuccess(xhr.responseText, xhr.status, xhr.request);
			else
				processError(xhr.responseText, xhr.status, xhr.request);
		}
	}
	xhr.open("POST", wsUrl, true, wsUser, wsPassword);
	xhr.setRequestHeader( "Content-Type","text/xml; charset=utf-8");
	//xhr.setRequestHeader("SOAPAction", "http://tempuri.org/HelloWorld");
	xhr.send(soapRequest);
};

function executeAvailableFiltersSoapRequest(legal_entity, filter, processError, processSuccess) {
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
		'      <mik:AvailableFiltersForFilters>' +
		'			<mik:IdSession>' + legal_entity + '</mik:IdSession>' +
		'			<mik:Filter>' + filter + '</mik:Filter>' +
		'     </mik:AvailableFiltersForFilters>' +
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

function executePictures(idProduct, processError, processSuccess) {
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
		'      <mik:Pictures>' +
		'			<mik:IdProduct>' + idProduct + '</mik:IdProduct>' +
		'     </mik:Pictures>' +
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

module.exports = router;
