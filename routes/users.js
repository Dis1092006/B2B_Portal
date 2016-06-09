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
				message: 'Успех',
				token: token,
				userId: resultText
			});
		}
	);

	//if (!passwordHash.verify(req.body.password, ???))

});

function executeLoginSoapRequest(userName, password, processError, processSuccess) {
	var wsUrl, wsUser, wsPassword, soapRequest, xhr;

	wsUrl = 'https://torg-b2b.ru/B2B/ws/Authorization';
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

module.exports = router;
