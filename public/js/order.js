/*global $, jQuery*/
/*jslint node: true*/
/*jslint browser: true*/
/*jslint devel: true*/
"use strict";

function Order(number) {

	this.number = number;
	this.items = [];
	this.current_item = null; // ToDo - почистить лишнюю переменную.
	this.current_city = null;
	this.total_count = 0;
	this.total_amount = 0;
	this.total_volume = 0;
}

// Проверка наличия позиций в заказе.
Order.prototype.hasItems = function() {
	return (this.total_count > 0);
};

// Задать текущий город заказа.
Order.prototype.setCurrentCity = function (city) {
	this.current_city = city;
};

// Получить текущий город заказа.
Order.prototype.getCurrentCity = function () {
	return this.current_city;
};

// Получить список элементов заказа.
Order.prototype.getItems = function () {
	return this.items;
};

// Добавить товар в заказ.
Order.prototype.addItem = function (code, name, count, price, volume, preferred_price) {
	var index, item;

	// Поиск в заказе добавляемого товара.
	for (index = 0; index < this.items.length; index = index + 1) {
		if (this.items[index].code === code) {
			break;
		}
	}
	
	if (index === this.items.length) { // Если товар в заказе не найден, то добавить.
		item = {};
		item.code = code;
		item.name = name;
		item.count = count;
		item.price = price;
		item.amount = item.count * item.price;
//		item.volume = item.count * volume;
		item.volume = volume;
		item.preferred_price = preferred_price;
		this.items.push(item);
	} else { // Иначе - увеличить количество.
		item = this.items[index];
		item.count = item.count + count;
		item.amount = item.count * item.price;
//		item.volume = item.count * volume;
		item.volume = volume;
	}
	this.current_item = item;
	
	// Пересчитать значения итоговых счётчиков.
	this.total_count = 0;
	this.total_amount = 0;
	this.total_volume = 0;
	for (index = 0; index < this.items.length; index = index + 1) {
		item = this.items[index];
		this.total_count += item.count;
		this.total_amount += item.amount;
		this.total_volume += (item.volume * item.count);
	}
};

// Удалить товар из заказа.
Order.prototype.deleteItem = function (code) {
	var index, item;

	// Поиск в заказе удаляемого товара.
	for (index = 0; index < this.items.length; index = index + 1) {
		item = this.items[index];
		if (item.code === code) {
			//if (item.count === 1) {
				// Удаление.
				this.items.splice(index, 1);
				this.current_item = null;
				break;
			//} else {
			//	item.count = item.count - 1;
			//	item.amount = item.count * item.price;
			//	this.current_item = item;
			//}
		}
	}

	// Пересчитать значения итоговых счётчиков.
	this.total_count = 0;
	this.total_amount = 0;
	this.total_volume = 0;
	for (index = 0; index < this.items.length; index = index + 1) {
		item = this.items[index];
		this.total_count += item.count;
		this.total_amount += item.amount;
		this.total_volume += (item.volume * item.count);
	}
};

// Получить табличное представление заказа.
Order.prototype.getTableView = function () {
	var table, tr, index, item, selected;

	table = '<table id="tree-table-order" class="table table-bordered table-condensed order-table">' +
		'	<thead>' +
		'		<tr>' +
		'			<th class="row-goods">Позиция</th>' +
		'			<th class="row-stock">Кол-во</th>' +
		'			<th class="row-cost">Цена</th>' +
		'			<th class="row-cost">Сумма</th>' +
		'			<th class="row-cost">Объем</th>' +
		'			<th class="row-cost">Желаемая цена</th>' +
		'			<th>Удалить</th>' +
		'		</tr>' +
		'	</thead>' +
		'	<tbody>';
	
	tr = '';
	for (index = 0; index < this.items.length; index = index + 1) {
		item = this.items[index];
		
		selected = '';
		if (item === this.current_item) {
			console.log(' === ');
			selected = ' class="ui-state-highlight"';
		}

		tr = tr +
			'<tr code="' + item.code + '"' + selected + '>' +
			'	<td>' + item.name + '</td>' +
			'	<td><a class="count" href="#" data-pk="' + index + '">' + item.count + '</td>' +
			'	<td>' + item.price + '</td>' +
			'	<td>' + item.amount + '</td>' +
			'	<td>' + (item.volume * item.count).toFixed(4) + '</td>' +
			'	<td><a class="preferred_price" href="#" data-pk="' + index + '">' + item.preferred_price + '</a></td>' +
			'	<td><a class="remove-picture"><span class="glyphicon glyphicon-remove"></span></a></td>' +
			'</tr>';
	}
	table += tr +
		'	</tbody>';
	// Подвал таблицы заказа.
	table +=
			'	<tfoot>' +
			'	<tr>' +
			'		<td><b>Итого заказ</b></td>' +
			'		<td><b>' + this.total_count + '</b></td>' +
			'		<td></td>' +
			'		<td><b>' + this.total_amount + '</b></td>' +
			'		<td><b>' + this.total_volume.toFixed(4) + '</b></td>' +
			'		<td></td>' +
			'		<td></td>' +
			'	</tr>' +
			'	</tfoot>' +
			'</table>';

	// Вернуть сформированную таблицу.
	return table;
};

// Получить краткое представление корзины.
Order.prototype.getBasketShortView = function () {
	return 'кол-во: ' + this.total_count + ', сумма: ' + this.total_amount + ', объём: ' + this.total_volume.toFixed(4);
};

// Узнать количество в текущем заказе.
Order.prototype.getItemCount = function (code) {
	var count;
	count = 0;
	$(this.items).each(function (index, item) {
		if (item.code === code) {
			count = item.count;
		}
	});
	return count;
};

// Изменить количество в текущем заказе.
Order.prototype.setItemCount = function (code, count) {
	var index, item;

	$(this.items).each(function (index, item) {
		if (item.code === code) {
			item.count = count;
			item.amount = item.count * item.price;
		}
	});

	// Пересчитать значения итоговых счётчиков.
	this.total_count = 0;
	this.total_amount = 0;
	this.total_volume = 0;
	for (index = 0; index < this.items.length; index = index + 1) {
		item = this.items[index];
		this.total_count += item.count;
		this.total_amount += item.amount;
		this.total_volume += (item.volume * item.count);
	}
};

// Задать желаемую цену.
Order.prototype.setPreferredPrice = function (code, preferred_price) {
	$(this.items).each(function (index, item) {
		if (item.code === code) {
			item.preferred_price = preferred_price;
		}
	});
};

// Сделать заказ.
Order.prototype.makeOrder = function (legal_entity, outlet, processError, processSuccess) {
	var order, index, item, order_row, WS, ws;
	order = {};

	//ШАПКА ЗАКАЗА:
	//Код(УИД) заказа - для случаев, если это не новый заказ (если новый то пустая строка),
	order.code = this.number;
	//Код контрагента,
	order.legal_entity = legal_entity;
	//Адрес доставки
	order.outlet = outlet;
	//Адрес доставки
	order.code_division = this.current_city;
	//ТАБЛИЧНАЯ ЧАСТЬ:
	order.rows = [];

	// Цикл по таблице заказа.
	for (index = 0; index < this.items.length; index = index + 1) {
		item = this.items[index];

		order_row = {};
		//Код номенклатуры, 
		order_row.code = item.code;
		//Количество, 
		order_row.count = item.count;
		//Цена, 
		order_row.price = item.price;
		//Цена ожидаемая.
		order_row.preferred_price = item.preferred_price;

		order.rows.push(order_row);
	}

	console.log(JSON.stringify(order));

	// Послать данные о заказе.
	WS = require('./ws');
	ws = new WS();
	ws.executeMainOrder(JSON.stringify(order), processError, processSuccess);
};

// Изменить заказ.
Order.prototype.modifyOrder = function (legal_entity, outlet, processError, processSuccess) {
	var order, index, item, order_row, WS, ws;
	order = {};

	//ШАПКА ЗАКАЗА:
	//Код(УИД) заказа - для случаев, если это не новый заказ (если новый то пустая строка),
	order.code = this.number;
	//Код контрагента,
	order.legal_entity = legal_entity;
	//Адрес доставки
	order.outlet = outlet;
	//ТАБЛИЧНАЯ ЧАСТЬ:
	order.rows = [];

	// Цикл по таблице заказа.
	for (index = 0; index < this.items.length; index = index + 1) {
		item = this.items[index];

		order_row = {};
		//Код номенклатуры, 
		order_row.code = item.code;
		//Количество, 
		order_row.count = item.count;
		//Цена, 
		order_row.price = item.price;

		order.rows.push(order_row);
	}

	console.log(JSON.stringify(order));

	// Послать данные о заказе.
	WS = require('./ws');
	ws = new WS();
	ws.executeModifiedOrder(JSON.stringify(order), processError, processSuccess);
};

module.exports = Order;