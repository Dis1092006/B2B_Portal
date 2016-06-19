/*global $, jQuery*/
/*jslint node: true*/
/*jslint browser: true*/
"use strict";

function WS() {

}

WS.prototype.executeLoginSoapRequest = function (userName, password, processError, processSuccess) {
	$.ajax({
		type: 'POST',
		url: 'https://torg-b2b.ru/Portal_TEST/user/login',
		data: JSON.stringify({
			login: userName,
			password: password
		}),
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});
};

WS.prototype.executeInfUserSoapRequest = function (idUser, processError, processSuccess) {
	$.ajax({
		type: 'GET',
		url: 'https://torg-b2b.ru/Portal_TEST/user/profile/full',
		data: {
			token: localStorage.getItem('token'),
			userId: localStorage.getItem('userId')
		},
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});
};

/*
WS.prototype.executeInfUserTextSoapRequest = function (idUser, processError, processSuccess) {
	$.ajax({
		type: 'GET',
		url: 'https://torg-b2b.ru/Portal_TEST/user/profile/short',
		data: {
			token: localStorage.getItem('token'),
			userId: localStorage.getItem('userId')
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
			token: localStorage.getItem('token'),
			userId: localStorage.getItem('userId')
		},
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});
};
*/

WS.prototype.executeAvailableFiltersSoapRequest = function (legalEntity, filter, processError, processSuccess) {
	$.ajax({
		type: 'GET',
		url: 'https://torg-b2b.ru/Portal_TEST/goods/filters',
		data: {
			token: localStorage.getItem('token'),
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
			token: localStorage.getItem('token'),
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
			token: localStorage.getItem('token'),
			idProduct: idProduct
		},
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});

};

WS.prototype.executeMainOrder = function (order, processError, processSuccess) {
	$.ajax({
		type: 'POST',
		url: 'https://torg-b2b.ru/Portal_TEST/orders',
		data: JSON.stringify({
			token: localStorage.getItem('token'),
			order: order
		}),
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});
};

WS.prototype.executeStatusOrderSoapRequest = function (idSession, processError, processSuccess) {
	$.ajax({
		type: 'GET',
		url: 'https://torg-b2b.ru/Portal_TEST/orders',
		data: {
			token: localStorage.getItem('token'),
			userId: localStorage.getItem('userId')
		},
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});
};

WS.prototype.executeModifiedOrder = function (order, processError, processSuccess) {
	$.ajax({
		type: 'PUT',
		url: 'https://torg-b2b.ru/Portal_TEST/orders',
		data: JSON.stringify({
			token: localStorage.getItem('token'),
			order: order
		}),
		async: true,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: processError,
		success: processSuccess
	});
};

module.exports = WS;