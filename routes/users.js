var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var XmlDocument = require('xmldoc').XmlDocument;
var jwt = require('jsonwebtoken');

router.post('/login', function (req, res, next) {
	var userLogin = req.body.login;
	var userPassword = req.body.password;
	// Авторизация в B2B.
	executeLoginSoapRequest(
		userLogin,
		userPassword,
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
			var resultText = xmlData.valueWithPath('soap:Body.m:LoginResponse.m:return');
			console.log('resultText = ' + resultText);
			var token = jwt.sign({user: userLogin}, 'b2b_user_key', {expiresIn: 7200});
			return res.status(200).json({
				message: 'Success',
				token: token,
				userId: resultText
			});
		}
	);

	//if (!passwordHash.verify(req.body.password, ???))

});

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

router.get('/profile/full', function(req, res, next) {

	executeInfUserSoapRequest(
		req.query.userId,
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
			var resultText = xmlData.valueWithPath('soap:Body.m:InfUserResponse.m:return');
			return res.status(200).json({
				message: 'Success',
				obj: resultText
			});
		}
	);
});

router.get('/profile/short', function(req, res, next) {

	executeInfUserTextSoapRequest(
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
			var resultText = xmlData.valueWithPath('soap:Body.m:InfUserTextResponse.m:return');
			var result = JSON.parse(resultText);
			res.render('user/profile', {layout: false, data: result});
		}
	);
});

router.get('/contacts', function(req, res, next) {

	executeInfContactsSoapRequest(
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
			var resultText = xmlData.valueWithPath('soap:Body.m:InfContactsResponse.m:return');
			var result = JSON.parse(resultText);
			res.render('user/contacts', {layout: false, data: result});
		}
	);
});

function executeLoginSoapRequest(userName, password, processError, processSuccess) {
	var wsUrl, wsUser, wsPassword, soapRequest, xhr;

	console.log('Server.executeLoginSoapRequest');

	wsUrl = 'https://torg-b2b.ru/B2B_TEST/ws/Authorization';
	//wsUrl = 'https://' + window.location.host + '/B2B/ws/Authorization';
	wsUser = 'web_user';
	wsPassword = 'WebU$er';

	soapRequest =
		'<?xml version="1.0" encoding="utf-8"?>' +
		'<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:mik="http://www.mik_b2b.ru/">' +
		'   <soap:Header/>' +
		'   <soap:Body>' +
		'      <mik:Login>' +
		'         <mik:Username>' + userName + '</mik:Username>' +
		'         <mik:Password>' + password + '</mik:Password>' +
		'     </mik:Login>' +
		'   </soap:Body>' +
		'</soap:Envelope>';

	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			//var resp = unescape(xhr.responseText);
			console.log('Server.executeLoginSoapRequest, xhr.status = ' + xhr.status);
			if (xhr.status === 200)
				processSuccess(xhr.responseText, xhr.status, xhr.request);
			else
				processError(xhr.responseText, xhr.status, xhr.request);
		}
	}
	//xhr.open("POST", wsUrl, true, wsUser, wsPassword);
	xhr.open("POST", wsUrl, true, userName, password);
	xhr.setRequestHeader( "Content-Type","text/xml; charset=utf-8");
	xhr.send(soapRequest);
};

function executeInfUserSoapRequest(idUser, processError, processSuccess) {
	var wsUrl, wsUser, wsPassword, soapRequest, xhr;

	//wsUrl = 'https://' + window.location.host + '/B2B/ws/Authorization';
	wsUrl = 'https://torg-b2b.ru/B2B_TEST/ws/Authorization';
	wsUser = 'web_user';
	wsPassword = 'WebU$er';

	soapRequest =
		'<?xml version="1.0" encoding="utf-8"?>' +
		'<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:mik="http://www.mik_b2b.ru/">' +
		'   <soap:Header/>' +
		'   <soap:Body>' +
		'      <mik:InfUser>' +
		'          <mik:IdUser>' + idUser + '</mik:IdUser>' +
		'     </mik:InfUser>' +
		'   </soap:Body>' +
		'</soap:Envelope>';

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

function executeInfUserTextSoapRequest(idUser, processError, processSuccess) {
	var wsUrl, wsUser, wsPassword, soapRequest, xhr;

	//wsUrl = 'https://' + window.location.host + '/B2B/ws/Authorization';
	wsUrl = 'https://torg-b2b.ru/B2B_TEST/ws/Authorization';
	wsUser = 'web_user';
	wsPassword = 'WebU$er';
	soapRequest =
		'<?xml version="1.0" encoding="utf-8"?>' +
		'<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:mik="http://www.mik_b2b.ru/">' +
		'   <soap:Header/>' +
		'   <soap:Body>' +
		'      <mik:InfUserText>' +
		'          <mik:IdUser>' + idUser + '</mik:IdUser>' +
		'      </mik:InfUserText>' +
		'   </soap:Body>' +
		'</soap:Envelope>';

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

function executeInfContactsSoapRequest(idUser, processError, processSuccess) {
	var wsUrl, wsUser, wsPassword, soapRequest, xhr;

	//wsUrl = 'https://' + window.location.host + '/B2B/ws/Authorization';
	wsUrl = 'https://torg-b2b.ru/B2B_TEST/ws/Authorization';
	wsUser = 'web_user';
	wsPassword = 'WebU$er';
	soapRequest =
		'<?xml version="1.0" encoding="utf-8"?>' +
		'<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:mik="http://www.mik_b2b.ru/">' +
		'   <soap:Header/>' +
		'   <soap:Body>' +
		'      <mik:InfContacts>' +
		'          <mik:IdUser>' + idUser + '</mik:IdUser>' +
		'     </mik:InfContacts>' +
		'   </soap:Body>' +
		'</soap:Envelope>';

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
