/*global $, jQuery*/
/*jslint node: true*/
/*jslint browser: true*/
"use strict";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function WS() {

}

WS.prototype.executeLoginSoapRequest = function (userName, password, processError, processSuccess) {
	var wsUrl, body, xhr;

	//wsUrl = 'http://localhost:8000/Portal_TEST/user/login';
	wsUrl = 'https://torg-b2b.ru/Portal_TEST/user/login';

	body = JSON.stringify({
		login: userName,
		password: password
	});
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			//console.log('executeLoginSoapRequest, xhr.responseText = ' + xhr.responseText);
			if (xhr.status === 200)
				processSuccess(xhr.responseText, xhr.status, xhr.request);
			else
				processError(xhr.responseText, xhr.status, xhr.request);
		}
	}
	xhr.open("POST", wsUrl, true, userName, password);
	xhr.setRequestHeader( "Content-Type","application/json; charset=utf-8");
	xhr.send(body);

	// soapRequest =
	// 	'<?xml version="1.0" encoding="utf-8"?>' +
	// 	'<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:mik="http://www.mik_b2b.ru/">' +
	// 	'   <soap:Header/>' +
	// 	'   <soap:Body>' +
	// 	'      <mik:Login>' +
	// 	'         <mik:Username>' + userName + '</mik:Username>' +
	// 	'         <mik:Password>' + password + '</mik:Password>' +
	// 	'     </mik:Login>' +
	// 	'   </soap:Body>' +
	// 	'</soap:Envelope>';
	//
	// request = $.ajax({
	// 	type: "POST",
	// 	url: wsUrl,
	// 	contentType: "text/xml",
	// 	dataType: "xml",
	// 	username: userName,
	// 	password: password,
	// 	data: soapRequest,
	// 	error: processError,
	// 	success: processSuccess
	// });
};

WS.prototype.executeInfUserSoapRequest = function (idUser, processError, processSuccess) {
	$.ajax({
		type: 'GET',
		url: 'https://torg-b2b.ru/Portal_TEST/user/profile/full',
		data: {
			'token': localStorage.getItem('token'),
			'userId': localStorage.getItem('userId')
		},
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});
};

WS.prototype.executeInfUserTextSoapRequest = function (idUser, processError, processSuccess) {
	$.ajax({
		type: 'GET',
		url: 'https://torg-b2b.ru/Portal_TEST/user/profile/short',
		data: {
			'token': localStorage.getItem('token'),
			'userId': localStorage.getItem('userId')
		},
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});
};

WS.prototype.executeInfContactsSoapRequest = function (idUser, processError, processSuccess) {
	$.ajax({
		type: 'GET',
		url: 'https://torg-b2b.ru/Portal_TEST/user/contacts',
		data: {
			'token': localStorage.getItem('token'),
			'userId': localStorage.getItem('userId')
		},
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});
};

WS.prototype.executeAvailableFiltersSoapRequest = function (legalEntity, filter, processError, processSuccess) {
	$.ajax({
		type: 'GET',
		url: 'https://torg-b2b.ru/Portal_TEST/goods/filters',
		data: {
			'token': localStorage.getItem('token'),
			'legalEntity': legalEntity,
			'filter': filter
		},
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});
};

WS.prototype.executeTreeBalanceSoapRequest = function (legal_entity, filter, processError, processSuccess) {
	$.ajax({
		type: 'GET',
		url: 'https://torg-b2b.ru/Portal_TEST/goods',
		data: {
			'token': localStorage.getItem('token'),
			'legalEntity': legal_entity,
			'filter': filter
		},
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});
};

WS.prototype.executePictures = function (idProduct, processError, processSuccess) {
	$.ajax({
		type: 'GET',
		url: 'https://torg-b2b.ru/Portal_TEST/goods/pictures',
		data: {
			'token': localStorage.getItem('token'),
			'idProduct': idProduct
		},
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});

};

WS.prototype.executeMainOrder = function (order, processError, processSuccess) {
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
		'      <mik:MainOrder>' +
		'			<mik:IdSession>' + order + '</mik:IdSession>' +
		'     </mik:MainOrder>' +
		'   </soapenv:Body>' +
		'</soapenv:Envelope>';

	request = $.ajax({
		type: "POST",
		url: wsUrl,
		contentType: "text/xml",
		dataType: "xml",
		username: wsUser,
		password: wsPassword,
		data: soapRequest,
		error: processError,
		success: processSuccess
	});
};

WS.prototype.executeStatusOrderSoapRequest = function (idSession, processError, processSuccess) {
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
		'      <mik:StatusOrder>' +
		'			<mik:IdSession>' + idSession + '</mik:IdSession>' +
		'     </mik:StatusOrder>' +
		'   </soapenv:Body>' +
		'</soapenv:Envelope>';

	request = $.ajax({
		type: "POST",
		url: wsUrl,
		contentType: "text/xml",
		dataType: "xml",
		username: wsUser,
		password: wsPassword,
		data: soapRequest,
		error: processError,
		success: processSuccess
	});
};

WS.prototype.executeModifiedOrder = function (order, processError, processSuccess) {
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

	request = $.ajax({
		type: "POST",
		url: wsUrl,
		contentType: "text/xml",
		dataType: "xml",
		username: wsUser,
		password: wsPassword,
		data: soapRequest,
		error: processError,
		success: processSuccess
	});
};

module.exports = WS;