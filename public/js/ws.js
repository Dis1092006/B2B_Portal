/*global $, jQuery*/
/*jslint node: true*/
/*jslint browser: true*/
"use strict";

function WS() {

}

WS.prototype.executeLoginSoapRequest = function (userName, password, processError, processSuccess) {
	var wsUrl, soapRequest, request;

	console.log('executeLoginSoapRequest, window.location.host = ' + window.location.host);

	//wsUrl = 'https://' + window.location.host + '/B2B/ws/Authorization';
	wsUrl = 'https://torg-b2b.ru/B2B_TEST/ws/Authorization';
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

	request = $.ajax({
		type: "POST",
		url: wsUrl,
		contentType: "text/xml",
		dataType: "xml",
		username: userName,
		password: password,
		data: soapRequest,
		error: processError,
		success: processSuccess
	});
};

WS.prototype.executeInfUserSoapRequest = function (idUser, processError, processSuccess) {
	var wsUrl, wsUser, wsPassword, soapRequest, request;

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
		'			<mik:IdUser>' + idUser + '</mik:IdUser>' +
		'     </mik:InfUser>' +
		'   </soap:Body>' +
		'</soap:Envelope>';

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

WS.prototype.executeInfUserTextSoapRequest = function (idUser, processError, processSuccess) {
	var wsUrl, wsUser, wsPassword, soapRequest, request;

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

WS.prototype.executeInfContactsSoapRequest = function (idUser, processError, processSuccess) {
	var wsUrl, wsUser, wsPassword, soapRequest, request;

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

WS.prototype.executeAvailableFiltersSoapRequest = function (legal_entity, filter, processError, processSuccess) {
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
		'      <mik:AvailableFiltersForFilters>' +
		'			<mik:IdSession>' + legal_entity + '</mik:IdSession>' +
		'			<mik:Filter>' + filter + '</mik:Filter>' +
		'     </mik:AvailableFiltersForFilters>' +
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

WS.prototype.executeTreeBalanceSoapRequest = function (legal_entity, filter, processError, processSuccess) {
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
		'      <mik:TreeBalance>' +
		'			<mik:IdSession>' + legal_entity + '</mik:IdSession>' +
		'			<mik:Filter>' + filter + '</mik:Filter>' +
		'     </mik:TreeBalance>' +
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

WS.prototype.executePictures = function (idProduct, processError, processSuccess) {
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
			'      <mik:Pictures>' +
			'			<mik:IdProduct>' + idProduct + '</mik:IdProduct>' +
			'     </mik:Pictures>' +
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