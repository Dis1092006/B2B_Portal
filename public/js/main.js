/*global $, jQuery*/
/*jslint browser: true*/
/*jslint node: true*/
/*jslint devel: true*/
"use strict";

var current_login, current_user, current_goods, current_order/*, modified_order*/;

function onErrorSoapRequest(data, status, req) {
	var resultText = '';

	console.log('onErrorSoapRequest');
	console.log('data = ' + JSON.stringify(data));
	console.log('status = ' + status);

	if (data.status)
		alert('err ' + data.status + " " + data.statusText + " " + resultText);
	else if (data.responseJSON) {
		resultText = JSON.parse(data.responseJSON);
		alert(resultText);
	}
	else if (data.responseText) {
		resultText = $(data.responseText).find("faultstring").html();
		alert('err ' + data.status + " " + data.statusText + " " + resultText);
	}
}

// function updateVisiblity(containerName) {
// 	var goodsContainer, basketContainer, ordersContainer, userInfoContainer, contactsContainer;
//
// 	goodsContainer = document.getElementById('goods-container');
// 	basketContainer = document.getElementById('basket-container');
// 	ordersContainer = document.getElementById('orders-container');
// 	userInfoContainer = document.getElementById('user-info-container');
// 	contactsContainer = document.getElementById('contacts-container');
//
// 	goodsContainer.style.display = 'none';
// 	basketContainer.style.display = 'none';
// 	ordersContainer.style.display = 'none';
// 	userInfoContainer.style.display = 'none';
// 	contactsContainer.style.display = 'none';
//
// 	if (containerName === 'goods-container') {
// 		goodsContainer.style.display = 'block';
// 	}
//
// 	if (containerName === 'basket-container') {
// 		basketContainer.style.display = 'block';
// 	}
//
// 	if (containerName === 'orders-container') {
// 		ordersContainer.style.display = 'block';
// 	}
//
// 	if (containerName === 'user-info-container') {
// 		userInfoContainer.style.display = 'block';
// 	}
//
// 	if (containerName === 'contacts-container') {
// 		contactsContainer.style.display = 'block';
// 	}
// }

function updateGoodsTable() {
	var tree, showPositionCode;

	showPositionCode = $("#show-position-code").prop("checked");

	tree = $("#tree-goods");
	tree.empty();
	tree.append(current_goods.getGoodsTableView(current_order.getItems(), showPositionCode, document.body.clientWidth - 62));

	// Включить быстрый поиск по таблице.
	$('input#search-text').quicksearch('table#tree-table-goods tbody tr');

	//$('#tree-table-goods a.count').editable({
	//	mode: 'inline',
	//	type: 'text',
	//	title: 'Укажите количество',
	//	validate: function(value) {
	//		if(parseInt(value, 0) <= 0) {
	//			return 'Значение должно быть положительным!';
	//		}
	//	},
	//	success: function (response, newValue) {
	//		var code;
	//		code = $(this).closest('tr').attr('code');
	//		current_order.setItemCount(code, parseInt(newValue, 0));
	//		//updateBasket();
	//	}
	//});

	// Выделение текущей строки.
	$('#tree-table-goods tbody').on('mousedown', 'tr', function () {
		$('.ui-state-highlight').not($(this)).removeClass('ui-state-highlight');
		$(this).addClass('ui-state-highlight');
	});

	// Обработка вызова описания номенклатуры.
	$('#tree-table-goods abbr').on("click", function () {
		var WS, ws, code;
		$("#product-description-text").html($(this).attr('title'));

		code = $(this).closest('tr').attr('code');
		console.log('code = ' + code);
		if (code !== undefined) {
			WS = require('./ws');
			ws = new WS();
			ws.executePictures(code, onErrorSoapRequest, onSuccessPictures);
		}

		$('#product-description-modal').modal();
	});

	// Обработка добавления товара в корзину.
	$("#tree-table-goods a.basket-picture").on("click", function () {
		var selected_row, current_code, first_column, price_column, volume_column, count_column, item_count_in_basket_column, name, count, price, volume;

		selected_row = $("#tree-table-goods tbody").find('.ui-state-highlight');
		current_code = selected_row.attr('code');
		if (current_code !== undefined) {
			first_column = selected_row.find("td:first");
			price_column = first_column.next();
			if (showPositionCode === true)
				price_column = price_column.next();
			$(current_goods.stocks).each(function (index, stock) {
				price_column = price_column.next();
			});
			volume_column = price_column.next();
			count_column = selected_row.find('input');
			count = parseInt(count_column.val());
			count_column.val(1);
			item_count_in_basket_column = volume_column.next().next().next().next();

			// Добавить товар в заказ.
			name = first_column.text();
			price = parseFloat(price_column.text());
			volume = parseFloat(volume_column.text());
			current_order.addItem(current_code, name, count, price, volume, price);
			item_count_in_basket_column.text(current_order.getItemCount(current_code));

			// Обновить корзину.
			updateBasket();
		}
	});
}

function onSuccessTreeBalanceSoapRequest(data, status, req) {
	var result, Goods;

	// resultText = $(req.responseText).find("m\\:return").html();
	result = JSON.parse(data.obj);

	Goods = require('./goods');
	current_goods = new Goods();

	current_goods.setGoods(result);

	// Вывести полученные данные.
	updateGoodsTable();
}

function fill_cities(cities_array) {
	var index, city, temp;

	temp = '';
	for (index = 0; index < cities_array.length; index = index + 1) {
		city = cities_array[index];
		temp += '<option value="' + city['ПодразделениеКод'] + '">' + city['ПодразделениеНаименование'] + '</option>';
	}

	return '<select class="selectpicker" id="select-city">' +
		temp +
		'</select>';
}

function fill_filter(filter_array, filter_name) {
	var index, item, temp;

	temp = '<option value="0">Все</option>';
	for (index = 1; index <= filter_array.length; index = index + 1) {
		item = filter_array[index - 1];
		temp += '<option value="' + index + '">' + item + '</option>';
	}

	return '<select class="selectpicker" id="' + filter_name + '">' +
		temp +
		'</select>';
}

function onSuccessAvailableFiltersSoapRequest(data, status, req) {
	var result, filter;

	// resultText = $(req.responseText).find("m\\:return").html();
	result = JSON.parse(data.obj);

	// Запомнить текущие выбранные элементы фильтров.
	filter = {};
	filter["Группа1"] = get_current_filter_item_index(result["Группа1"], 'select-group1');
	filter["Группа2"] = get_current_filter_item_index(result["Группа2"], 'select-group2');
	filter["Группа3"] = get_current_filter_item_index(result["Группа3"], 'select-group3');
	filter["Группа4"] = get_current_filter_item_index(result["Группа4"], 'select-group4');
	filter["Бренд"] = get_current_filter_item_index(result["Бренд"], 'select-brand');

	// Перезаполнить фильтры.
	$(".filter-city").html("Город: " + fill_cities(current_user.cities));
	$(".filter-group1").html("Группа 1: " + fill_filter(result["Группа1"], 'select-group1'));
	$(".filter-group2").html("Группа 2: " + fill_filter(result["Группа2"], 'select-group2'));
	$(".filter-group3").html("Группа 3: " + fill_filter(result["Группа3"], 'select-group3'));
	$(".filter-group4").html("Группа 4: " + fill_filter(result["Группа4"], 'select-group4'));
	$(".filter-brand").html("Бренд: " + fill_filter(result["Бренд"], 'select-brand'));
	$('.selectpicker').selectpicker();

	// Восстановить выбранные элементы фильтров.
	console.log(current_order.getCurrentCity());
	if (current_order.getCurrentCity() !== null) {
		$("#select-city").selectpicker('val', current_order.getCurrentCity());
	}
	$("#select-group1").selectpicker('val', (filter["Группа1"] === 'Все') ? '0' : filter["Группа1"]);
	$("#select-group2").selectpicker('val', (filter["Группа2"] === 'Все') ? '0' : filter["Группа2"]);
	$("#select-group3").selectpicker('val', (filter["Группа3"] === 'Все') ? '0' : filter["Группа3"]);
	$("#select-group4").selectpicker('val', (filter["Группа4"] === 'Все') ? '0' : filter["Группа4"]);
	$("#select-brand").selectpicker('val', (filter["Бренд"] === 'Все') ? '0' : filter["Бренд"]);

	// Включить обработчики изменений фильтров.
	$('#select-city').on("change", onChangeCity);
	$('#select-group1').on("change", onChangeFilter1);
	$('#select-group2').on("change", onChangeFilter1);
	$('#select-group3').on("change", onChangeFilter1);
	$('#select-group4').on("change", onChangeFilter1);
	$('#select-brand').on("change", onChangeFilter1);
}

function onChangedCity() {
	var filter, WS, ws;

	current_order.setCurrentCity($("#select-city").find("option:selected").val());

	filter = {};
	filter["Подразделение"] = current_order.getCurrentCity();
	filter["Группа1"] = $("#select-group1").find("option:selected").text();
	filter["Группа2"] = $("#select-group2").find("option:selected").text();
	filter["Группа3"] = $("#select-group3").find("option:selected").text();
	filter["Группа4"] = $("#select-group4").find("option:selected").text();
	filter["Бренд"] = $("#select-brand").find("option:selected").text();
	filter["ЦенаОт"] = $("#filter-price-from").val();
	filter["ЦенаДо"] = $("#filter-price-to").val();
	filter["ТолькоВНаличии"] = $("#in-stock").prop("checked");

	console.log('Отправка: ' + JSON.stringify(filter));

	WS = require('./ws');
	ws = new WS();
	ws.executeAvailableFiltersSoapRequest(current_user.getCurrentLegalEntity(), JSON.stringify(filter), onErrorSoapRequest, onSuccessAvailableFiltersSoapRequest);
	ws.executeTreeBalanceSoapRequest(current_user.getCurrentLegalEntity(), JSON.stringify(filter), onErrorSoapRequest, onSuccessTreeBalanceSoapRequest);
}

function onChangeCity() {
	// Если в текущем заказе (корзине) уже что-то есть, то запросить подтверждение смены города.
	if (current_order.hasItems()) {
		$('#change-city-modal').modal();
	} else {
		onChangedCity();
	}
}

// Смена признака отображения кода позиции товара.
function onChangeShowPositionCode() {
	// Начало длительного обновления.
	$("body").addClass("loading");

	// Обновить таблицу товаров.
	updateGoodsTable();

	// Завершение длительного обновления.
	$("body").removeClass("loading");
}

function onChangeFilter1() {
	var filter, WS, ws;

	filter = {};
	filter["Подразделение"] = current_order.getCurrentCity();
	filter["Группа1"] = $("#select-group1").find("option:selected").text();
	filter["Группа2"] = $("#select-group2").find("option:selected").text();
	filter["Группа3"] = $("#select-group3").find("option:selected").text();
	filter["Группа4"] = $("#select-group4").find("option:selected").text();
	filter["Бренд"] = $("#select-brand").find("option:selected").text();
	filter["ЦенаОт"] = $("#filter-price-from").val();
	filter["ЦенаДо"] = $("#filter-price-to").val();
	filter["ТолькоВНаличии"] = $("#in-stock").prop("checked");

	console.log('Отправка: ' + JSON.stringify(filter));

	WS = require('./ws');
	ws = new WS();
	ws.executeAvailableFiltersSoapRequest(current_user.getCurrentLegalEntity(), JSON.stringify(filter), onErrorSoapRequest, onSuccessAvailableFiltersSoapRequest);
	ws.executeTreeBalanceSoapRequest(current_user.getCurrentLegalEntity(), JSON.stringify(filter), onErrorSoapRequest, onSuccessTreeBalanceSoapRequest);
}

function onChangeFilter2() {
	var filter, WS, ws;

	filter = {};
	filter["Подразделение"] = current_order.getCurrentCity();
	filter["Группа1"] = $("#select-group1").find("option:selected").text();
	filter["Группа2"] = $("#select-group2").find("option:selected").text();
	filter["Группа3"] = $("#select-group3").find("option:selected").text();
	filter["Группа4"] = $("#select-group4").find("option:selected").text();
	filter["Бренд"] = $("#select-brand").find("option:selected").text();
	filter["ЦенаОт"] = $("#filter-price-from").val();
	filter["ЦенаДо"] = $("#filter-price-to").val();
	filter["ТолькоВНаличии"] = $("#in-stock").prop("checked");

	WS = require('./ws');
	ws = new WS();
	ws.executeTreeBalanceSoapRequest(current_user.getCurrentLegalEntity(), JSON.stringify(filter), onErrorSoapRequest, onSuccessTreeBalanceSoapRequest);
}

function updateOrders() {
	var panel_group;

	panel_group = $("#panel-group-orders");
	panel_group.empty();
	panel_group.append(current_user.getOrdersView());

	$(".modify-order-button").click(function () {
		var order_code, modified_order;
		order_code = $(this).attr('code');
		current_user.setCurrentSuborder(order_code);
		modified_order = current_user.getCurrentModifiedOrder();
		modified_order.modifyOrder(current_user.getCurrentLegalEntity(), current_user.getCurrentOutlet(), onErrorSoapRequest, onSuccessModifyOrder);
	});

	$('.panel-group-orders-table a.order-row-count').editable({
		type: 'text',
		title: 'Укажите нужное количество',
		validate: function (value) {
			if (parseInt(value, 0) > parseInt($(this).text(), 0)) {
				return 'Изменение количества в оформленном заказе возможно только в меньшую сторону!';
			}
		},
		success: function (response, newValue) {
			var row_code, order_code;
			row_code = $(this).closest('tr').attr('id');
			order_code = $(this).closest('tr').attr('code');
			current_user.changeCurrentOrderRowCount(row_code, newValue);
			$("#button_" + order_code).prop('disabled', '');
			$("#button_" + order_code).addClass('btn-warning');
		}
	});

	$("#delete-order-row-button-ok").click(function () {
		var row_code, order_code;
		order_code = current_user.getCurrentSuborderCode();
		row_code = current_user.getCurrentOrderRowCode();

		current_user.deleteOrderRow(row_code);
		$(this).closest('tr').addClass('deleted');
		$("#button_" + order_code).prop('disabled', '');
		$("#button_" + order_code).addClass('btn-warning');
	});

	$(".panel-group-orders-table a.remove-picture").on("click", function () {
		var row_code, order_code;
		row_code = $(this).closest('tr').attr('id');
		order_code = $(this).closest('tr').attr('code');
		current_user.setCurrentSuborderCode(order_code);
		current_user.setCurrentOrderRowCode(row_code);

		if (confirm("Удалить строку из заказа?")) {
			current_user.deleteOrderRow(row_code);
		   $(this).closest('tr').addClass('deleted');
			$("#button_" + order_code).prop('disabled', '');
			$("#button_" + order_code).addClass('btn-warning');
		}
//		$('#delete-order-row-modal').modal();
	});
}

function onSuccessStatusOrderSoapRequest(data, status, req) {
	var result;

	//resultText = $(req.responseText).find("m\\:return").html();

	result = JSON.parse(data.obj);

	// Загрузить данные заказов текущему пользователю.
	current_user.setOrders(result);

	// Вывести полученные данные.
	updateOrders();
}

function onSuccessInfUserTextSoapRequest(data, status, req) {
	var result, text, legal_entity_description, debt_information, panel;

	//resultText = $(req.responseText).find("m\\:return").html();
	result = JSON.parse(data.obj);

	text = '';
	$(result).each(function (index1, item1) {

		// Информация о юридическом лице.
		legal_entity_description = item1['СтрокаОписания'];
		text +=
			'<div class="panel panel-default">' +
			'	<div class="panel-body">' +
			'		<div class="alert alert-info">';
		$(legal_entity_description).each(function (index2, item2) {
			text +=
				'			<p>' +
				item2 +
				'			</p>';
		});
		text +=
			'		</div>';

		// Информация о долге.
		debt_information = item1['ИнформацияОДолге'];
		if (debt_information['ВыводитьДолгКрасным']) {
			text +=
				'		<div class="alert alert-danger">';
		} else {
			text +=
				'		<div class="alert alert-info">';
		}
		$(debt_information['СтрокаОписания']).each(function (index3, item3) {
			text +=
				'			<p>' +
				item3 +
				'			</p>';
		});
		text +=
			'		</div>' +
			'	</div>' +
			'</div>';
	});

	// Вывести полученные данные.
	panel = $("#panel-user-info");
	panel.empty();
	panel.append(text);
}

function onSuccessInfContactsSoapRequest(data, status, req) {
	var result, text, panel;

	//resultText = $(req.responseText).find("m\\:return").html();
	result = JSON.parse(data.obj);

	text =
		'<div class="panel-body">' +
		'	<div class="alert alert-info">';
	$(result).each(function (index, item) {
		text +=
			'			<p>' +
			item +
			'			</p>';
	});
	text +=
		'	</div>' +
		'</div>';

	// Вывести полученные данные.
	panel = $("#panel-contacts");
	panel.empty();
	panel.append(text);
}

function goodsClick() {
	var filter, WS, ws;
	
	window.location.href = 'http://' + window.location.host + '/Portal_TEST/goods?token=' + localStorage.getItem('token');
	// updateVisiblity('goods-container');

	filter = {};

	filter["Подразделение"] = current_order.getCurrentCity();
	filter["Группа1"] = $("#select-group1").find("option:selected").text();
	filter["Группа2"] = $("#select-group2").find("option:selected").text();
	filter["Группа3"] = $("#select-group3").find("option:selected").text();
	filter["Группа4"] = $("#select-group4").find("option:selected").text();
	filter["Бренд"] = $("#select-brand").find("option:selected").text();
	filter["ЦенаОт"] = $("#filter-price-from").val();
	filter["ЦенаДо"] = $("#filter-price-to").val();
	filter["ТолькоВНаличии"] = $("#in-stock").prop("checked");
	//console.log("goodsClick");
	//console.log(JSON.stringify(current_order.getCurrentCity()));
	//console.log(JSON.stringify(filter));

	WS = require('./ws');
	ws = new WS();
	ws.executeAvailableFiltersSoapRequest(current_user.getCurrentLegalEntity(), JSON.stringify(filter), onErrorSoapRequest, onSuccessAvailableFiltersSoapRequest);
	ws.executeTreeBalanceSoapRequest(current_user.getCurrentLegalEntity(), JSON.stringify(filter), onErrorSoapRequest, onSuccessTreeBalanceSoapRequest);

	// Включить обработчик событий изменения флага отображения кода позиции.
	$('#show-position-code').on("change", onChangeShowPositionCode);

	// Включить обработчики событий фильтров цены и признака наличия на складе.
	$('#filter-price-from').on("change", onChangeFilter2);
	$('#filter-price-to').on("change", onChangeFilter2);
	$('#in-stock').on("change", onChangeFilter2);
}

function basketClick() {
	//var filter, WS, ws;

	// updateVisiblity('basket-container');
}

function ordersClick() {
	var WS, ws;

	// updateVisiblity('orders-container');

	WS = require('./ws');
	ws = new WS();
	ws.executeStatusOrderSoapRequest(current_user.getUserID(), onErrorSoapRequest, onSuccessStatusOrderSoapRequest);
}

function usersInfoClick() {
	var WS, ws;

	// updateVisiblity('user-info-container');

	WS = require('./ws');
	ws = new WS();
	ws.executeInfUserTextSoapRequest(current_user.getUserID(), onErrorSoapRequest, onSuccessInfUserTextSoapRequest);
}

function contactsClick() {
	// var WS, ws;
	//
	// updateVisiblity('contacts-container');
	//
	// WS = require('./ws');
	// ws = new WS();
	// ws.executeInfContactsSoapRequest(current_user.getUserID(), onErrorSoapRequest, onSuccessInfContactsSoapRequest);
	
	$.ajax({
		type: 'GET',
		//url: 'https://torg-b2b.ru/Portal_TEST/user/contacts',
		url: 'http://localhost:8000/Portal_TEST/user/contacts',
		data: {
			token: localStorage.getItem('token'),
			userId: localStorage.getItem('userId')
		},
		async: true,
		success: function(data){
			//console.log('data = ' + JSON.stringify(data));
			if (data){
				$("#content").html(data);
			}
		}
	});
}

function updateEnabledDisabled(flag) {
	if (flag) {
		$('#goods').on('click', goodsClick);
		$('#basket').on('click', basketClick);
		$('#orders').on('click', ordersClick);
		$('#user-info').on('click', usersInfoClick);
		$('#contacts').on('click', contactsClick);
		$('#goods').parent().removeClass('disabled');
		$('#basket').parent().removeClass('disabled');
		$('#orders').parent().removeClass('disabled');
		$('#user-info').parent().removeClass('disabled');
		$('#contacts').parent().removeClass('disabled');
	} else {
		$('#goods').off('click');
		$('#basket').off('click');
		$('#orders').off('click');
		$('#user-info').off('click');
		$('#contacts').off('click');
		$('#goods').parent().addClass('disabled');
		$('#basket').parent().addClass('disabled');
		$('#orders').parent().addClass('disabled');
		$('#user-info').parent().addClass('disabled');
		$('#contacts').parent().addClass('disabled');
	}
}

function onSuccessfullLogin(userLogin, userID) {

	var User, enterButton, exitButton;

	$("#login-text").html('<span class="glyphicon glyphicon-user"></span> Логин: ' + userLogin + '<span class="caret"></span>');

	User = require('./user');
	current_user = new User(userLogin, userID);
	$.current_user = current_user;

	// updateVisiblity('');
	updateEnabledDisabled(true);

	enterButton = document.getElementById("enter");
	enterButton.style.display = "none";
	exitButton = document.getElementById("exit");
	exitButton.style.display = "block";
}

function onChangeOutlet() {
	// Обновить текущий магазин.
	$.current_user.setCurrentOutlet($("#select-outlet option:selected").text());
}

function onChangeLegalEntity() {
	var cooky, legal_entities, outlets, temp;

	// Обновить текущее юридическое лицо.
	$.current_user.setCurrentLegalEntity($("#select-legal-entity option:selected").val());

	cooky = $.cookie('legal_entities');
	if (cooky !== undefined) {
		legal_entities = JSON.parse(cooky);
		outlets = legal_entities[$("#select-legal-entity option:selected").val() + "_outlets"];
		temp = '';
		$(outlets).each(function (index, outlet) {
			temp += '<option value="' + outlet.IdShippingAddress + '">' + outlet["АдресДоставки"] + '</option>';
		});
		$(".outlet").html('Для торговой точки: ' +
			'<select class="selectpicker" data-width="auto" id="select-outlet">' +
//				'<select class="selectpicker" data-width="auto" id="select-outlet" onchange="onChangeOutlet(this)">' +
			temp +
			'</select>');
	} else {
		$(".outlet").html('');
	}
	$(".outlet").find('select').selectpicker('refresh');
	$('.outlet').on("change", onChangeOutlet);

	// Задать текущий магазин.
	$.current_user.setCurrentOutlet($(".outlet").find("option:selected").text());
}

function onSuccessInfUserSoapRequest(data, status, req) {
	var result, debt_timeout_text, legal_entities, outlets, temp, select;

	//resultText = $(req.responseText).find("m\\:return").html();
	result = JSON.parse(data.obj);

	// Заполнить список городов текущего пользователя.
	current_user.cities = [];
	$(result["Подразделения"]).each(function (index, city) {
		current_user.cities.push(city);
		if (city["Основное"]) {
			current_order.setCurrentCity(city["ПодразделениеКод"]);
		}
	});

	// Проверка наличия задолженности.
	debt_timeout_text = '';
	$(result["ЮрЛица"]).each(function (index1, entity) {
		if (entity['Долг'] > 0) {
			debt_timeout_text += '<br>' + entity['КонтрагентНаименование'] + ', сумма долга - ' + entity['Долг'] + ', дней просрочки - ' + entity['ДнейПросрочки'];
		}
	});

	// Вывести предупреждение о задолженности.
	if (debt_timeout_text !== '') {
		$("#debt-timeout-text").html('Обнаружена просроченная задолженность по следующим контрагентам:' + debt_timeout_text);
		$('#debt-timeout-modal').modal();
	}

	// Заполнить список юридических лиц на странице товара.
	temp = '';
	legal_entities = {};
	$(result["ЮрЛица"]).each(function (index2, entity) {
		temp += '<option value="' + entity["КонтрагентКод"] + '">' + entity["КонтрагентНаименование"] + '</option>';
		legal_entities[index2] = entity;
		legal_entities[entity["КонтрагентКод"] + "_outlets"] = entity["Адреса"];
	});
	select = '<select class="selectpicker" data-width="auto" id="select-legal-entity">' +
		temp +
		'</select>';
	$(".legal-entity").html('Юридическое лицо: ' + select);
	$('.legal-entity').on("change", onChangeLegalEntity);
	$.cookie('legal_entities', JSON.stringify(legal_entities), {
		expires: 1,
		path: '/'
	});

	// Текущее юридическое лицо.
	current_user.setCurrentLegalEntity($("#select-legal-entity option:selected").val());

	// Заполнить список магазинов на странице товара.
	outlets = legal_entities[current_user.getCurrentLegalEntity() + "_outlets"];
	temp = '';
	$(outlets).each(function (index, outlet) {
		temp += '<option value="' + outlet.IdShippingAddress + '">' + outlet["АдресДоставки"] + '</option>';
	});
	$(".outlet").html('Для торговой точки: ' +
		'<select class="selectpicker" data-width="auto" id="select-outlet">' +
//		'<select class="selectpicker" data-width="auto" id="select-outlet" onchange="onChangeOutlet(this)">' +
		temp +
		'</select>');
	$('.outlet').on("change", onChangeOutlet);

	// Задать текущий магазин.
	current_user.setCurrentOutlet($(".outlet").find("option:selected").text());

	// Вывести список товаров.
	// goodsClick();
}

function onSuccessLoginSoapRequest(data, status, req) {
	var loginResult, WS, ws;

	console.log("onSuccessLoginSoapRequest, data = " + data);

	//loginResult = JSON.parse(data);

	localStorage.setItem('token', data.token);
	localStorage.setItem('userId', data.userId);

	//resultText = $(req.responseText).find("m\\:return").html();
	console.log("onSuccessLoginSoapRequest, loginResult.userId = " + data.userId);

	// В случае успешного входа отобразить логин пользователя.
	onSuccessfullLogin(current_login, data.userId);

	// Пишем в куку
	$.cookie('userID', data.userId, {
		expires: 1,
		path: '/'
	});
	$.cookie('userLogin', current_login, {
		expires: 1,
		path: '/'
	});
	/*
	 date = new Date(new Date().getTime() + 60 * 1000);
	 console.log("Дата действия куки: " + date);
	 document.cookie = "userID=" + resultText + "; path=/; expires=" + date.toUTCString();
	 document.cookie = "userlogin=" + current_login + "; path=/; expires=" + date.toUTCString();
	 */

	// Запросить информацию о пользователе.
	WS = require('./ws');
	ws = new WS();
	ws.executeInfUserSoapRequest(data.userId, onErrorSoapRequest, onSuccessInfUserSoapRequest);
}

function onErrorLoginSoapRequest(data, status, req) {
	//var resultText;

	$("#login-text").html('');
	$("#basket").html('<span class="glyphicon glyphicon-shopping-cart"></span>');
	// updateVisiblity('');
	updateEnabledDisabled(false);

	//resultText = $(data.responseText).find("faultstring").html();

//	$("#error-login-text").html(data.status + ' ' + data.statusText + ' ' + resultText);
	$("#error-login-text").html(data.message + ' ' + data.error);

	$('#error-login-modal').modal();
}

function onSuccessPictures(data, status, req) {
	var result, temp, isActive, index;

	// resultText = $(req.responseText).find("m\\:return").html();
	result = JSON.parse(data.obj);

	if (result.length > 0) {
		temp = '	<div class="carousel-inner">';
		isActive = ' active';
		for (index = 0; index < result.length; index = index + 1) {
			temp +=
				'	<div class="item' + isActive + '">' +
				'		<img src="' + result[index] + '" style="width: auto; height: auto;">' +
				'	</div>';
			isActive = '';
		}
		temp +=
			'	</div>';
		if (result.length > 1) {
			temp +=
				'	<a class="left carousel-control" href="#product-description-pictures" role="button" data-slide="prev">' +
				'		<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
				'		<span class="sr-only">Previous</span>' +
				'</a>' +
				'	<a class="right carousel-control" href="#product-description-pictures" role="button" data-slide="next">' +
				'		<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
				'		<span class="sr-only">Next</span>' +
				'	</a>';
		}
		$("#product-description-pictures").html(temp);
	} else {
		$("#product-description-pictures").html('');
	}
}

function get_current_filter_item_index(filter_array, filter_name) {
	var current_selected_item, index;

	current_selected_item = $('#' + filter_name).find("option:selected").text();
	console.log(filter_name + '.selected = ' + current_selected_item);

	if (current_selected_item !== 'Все') {
		for (index = 1; index <= filter_array.length; index = index + 1) {
			if (current_selected_item === filter_array[index - 1]) {
				return index;
			}
		}
	} else {
		return 0;
	}
}

function updateBasket() {
	var order;

	$("#basket").html('<span class="glyphicon glyphicon-shopping-cart"></span> ' + current_order.getBasketShortView());

	order = $("#tree-order");
	order.empty();
	order.append(current_order.getTableView());


	// Выделение текущей строки.
	$('#tree-table-order tbody').on('mousedown', 'tr', function () {
		$('.ui-state-highlight').not($(this)).removeClass('ui-state-highlight');
		$(this).addClass('ui-state-highlight');
	});

	$('#tree-table-order a.count').editable({
		type: 'text',
		title: 'Укажите количество',
		validate: function (value) {
			if (parseInt(value, 0) <= 0) {
				return 'Значение должно быть положительным!';
			}
		},
		success: function (response, newValue) {
			var code;
			code = $(this).closest('tr').attr('code');
			current_order.setItemCount(code, parseInt(newValue, 0));
			updateBasket();
		}
	});

	$('#tree-table-order a.preferred_price').editable({
		type: 'text',
		title: 'Укажите желаемую цену',
		success: function (response, newValue) {
			var code;
			code = $(this).closest('tr').attr('code');
			current_order.setPreferredPrice(code, newValue);
			updateBasket();
		}
	});

	$("#tree-table-order a.remove-picture").on("click", function () {
		var selected_row, current_code, index;

		selected_row = $("#tree-table-order tbody").find('.ui-state-highlight');
		current_code = selected_row.attr('code');
		if (current_code !== undefined) {
			if (confirm("Удалить строку из заказа?")) {
				// Удалить товар из заказа.
				current_order.deleteItem(current_code);

				// Обновить отображение таблицы заказа.
				updateBasket();
			}
		}
	});
}

function onSuccessMakeOrder(data, status, req) {
	var result, Order;

	console.log('onSuccessMakeOrder, data = ' + JSON.stringify(data));
	//result = $(req.responseText).find("m\\:return").html();
	result = data.obj;

	if (result > 0) {
		Order = require('./order');
		current_order = new Order('');
		current_order.setCurrentCity($("#select-city").find("option:selected").val());

		updateBasket();

		$("#make-order-success-number").html('Заказ успешно зарегистрирован под номером ' + result);

		$('#make-order-success-modal').modal();
	}
}

function onSuccessModifyOrder(data, status, req) {
	var result, WS, ws;

	console.log('onSuccessModifyOrder, data = ' + JSON.stringify(data));

	//result = $(req.responseText).find("m\\:return").html();
	result = data.obj;

	if (result === 0) {
		alert("Ошибка при изменении заказа!");
	} else {
		WS = require('./ws');
		ws = new WS();
		ws.executeStatusOrderSoapRequest(current_user.getUserID(), onErrorSoapRequest, onSuccessStatusOrderSoapRequest);
		alert("Измененный заказ отправлен на авторизацию менеджеру");
		//modified_order.number = result;
	}

	console.log(result);
}

$(document).on({
	ajaxStart: function () {
		$("body").addClass("loading");
	},
	ajaxStop: function () {
		$("body").removeClass("loading");
	}
});

$(document).ready(function () {
	var Order, WS, ws, body, login, password, userID, userLogin;

	Order = require('./order');
	current_order = new Order("");

	WS = require('./ws');
	ws = new WS();

	$("#sign-in-button").click(function () {
		login = document.getElementById("sign_in_login").value;
		password = document.getElementById("sign_in_password").value;

		if (login === '') {
			$('#sign-in-modal').modal();
		}
		else {
			current_login = login;
			ws.executeLoginSoapRequest(login, password, onErrorLoginSoapRequest, onSuccessLoginSoapRequest);
		}
	});

	$("#exit").click(function () {
		var enterButton, exitButton;

		enterButton = document.getElementById("enter");
		enterButton.style.display = "block";
		exitButton = document.getElementById("exit");
		exitButton.style.display = "none";

		$("#login-text").html('');
		// ToDo Очистить корзину
		$("#basket").html('<span class="glyphicon glyphicon-shopping-cart"></span>');
		// updateVisiblity('');
		updateEnabledDisabled(false);

		$.cookie('userID', null, {
			expires: -1,
			path: '/'
		});
		$.cookie('userLogin', null, {
			expires: -1,
			path: '/'
		});

		$('#sign-in-modal').modal();
	});

	// $("#refresh-goods-button").click(function () {
	// 	window.location.href = 'http://' + window.location.host + '/Portal_TEST/goods?token=' + localStorage.getItem('token');
	// 	// var filter;
	// 	//
	// 	// filter = {};
	// 	// filter["Подразделение"] = current_order.getCurrentCity();
	// 	// filter["Группа1"] = $("#select-group1").find("option:selected").text();
	// 	// filter["Группа2"] = $("#select-group2").find("option:selected").text();
	// 	// filter["Группа3"] = $("#select-group3").find("option:selected").text();
	// 	// filter["Группа4"] = $("#select-group4").find("option:selected").text();
	// 	// filter["Бренд"] = $("#select-brand").find("option:selected").text();
	// 	// filter["ЦенаОт"] = $('#filter-price-from').val();
	// 	// filter["ЦенаДо"] = $('#filter-price-to').val();
	// 	// filter["ТолькоВНаличии"] = $("#in-stock").prop("checked");
	// 	//
	// 	// ws.executeTreeBalanceSoapRequest(current_user.getCurrentLegalEntity(), JSON.stringify(filter), onErrorSoapRequest, onSuccessTreeBalanceSoapRequest);
	// });

	$("#change-city-button-ok").click(function () {
		var Order;

		Order = require('./order');
		current_order = new Order('');
		updateBasket();

		onChangedCity();
	});

	$("#change-city-button-cancel").click(function () {
		if (current_order.getCurrentCity() !== null) {
			$("#select-city").selectpicker('val', current_order.getCurrentCity());
		}
	});

	$("#make-order-button").click(function () {

		$("#make-order-modal-amount").html('Вы уверены, что готовы отправить заказ на сумму ' + current_order.total_amount + '?');
		$("#make-order-modal-client").html('Клиент: ' + $("#select-legal-entity option:selected").text());
		$("#make-order-modal-outlet").html('Магазин: ' + $("#select-outlet option:selected").text());

		$('#make-order-modal').modal();
	});

	$("#make-order-button-ok").click(function () {
		current_order.makeOrder(current_user.getCurrentLegalEntity(), current_user.getCurrentOutlet(), onErrorSoapRequest, onSuccessMakeOrder);
	});

	$("#view-order-detail-ok").click(function () {
		var modified_order;

		modified_order = current_user.getCurrentModifiedOrder();
		modified_order.modifyOrder(current_user.getCurrentLegalEntity(), current_user.getCurrentOutlet(), onErrorSoapRequest, onSuccessModifyOrder);
	});

	userID = $.cookie('userID');
	if (userID === undefined) {
		$('#sign-in-modal').modal();
	} else {
		if (userID === null) {
			$('#sign-in-modal').modal();
		} else {
			userLogin = $.cookie('userLogin');
			if (userLogin !== undefined) {
				// В случае успешного входа отобразить логин пользователя.
				onSuccessfullLogin(userLogin, userID);
				// Запросить информацию о пользователе.
				ws.executeInfUserSoapRequest(userID, onErrorSoapRequest, onSuccessInfUserSoapRequest);
			}
		}
	}

	$("#search-remove-button").click(function () {
		$('input#search-text').val('');
		$('input#search-text').quicksearch('table#tree-table-goods tbody tr');
	});
});