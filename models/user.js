"use strict";

function User(userLogin, userID) {
	//	this.current_legal_entity = legal_entity;
	//	this.current_outlet = outlet;
	this.userLogin = userLogin;
	this.userID = userID;
	this.cities = [];
	this.orders = [];
	this.currentOrder = null;
	this.currentSuborderCode = '';
	this.currentRowCode = '';
}

User.prototype.getUserID = function () {
	return this.userID;
};

User.prototype.getCurrentLegalEntity = function () {
	console.log("getCurrentLegalEntity:" + this.current_legal_entity);
	return this.current_legal_entity;
};

User.prototype.setCurrentLegalEntity = function (legal_entity) {
	console.log("setCurrentLegalEntity:" + legal_entity);
	this.current_legal_entity = legal_entity;
};

User.prototype.getCurrentOutlet = function () {
	return this.current_outlet;
};

User.prototype.setCurrentOutlet = function (outlet) {
	this.current_outlet = outlet;
};

User.prototype.setOrders = function (the_list) {
	var index1, index2, order, row;

	this.orders = [];
	for (index1 = 0; index1 < the_list.length; index1 = index1 + 1) {
		order = the_list[index1];
		order["ПризнакИзменения"] = false; // Подготовить признак изменения.
		for (index2 = 0; index2 < order["МассивСтрокЗаказа"].length; index2 = index2 + 1) {
			row = order["МассивСтрокЗаказа"][index2];
			row['Идентификатор'] = '' + index1 + '.' + index2; // Задать строке заказа уникальный идентификатор.
		}
		this.orders.push(order);
	}
	//console.log(JSON.stringify(this.orders));
};

User.prototype.getOrdersView = function () {
	var view, temp, index1, index2, order, orderRow, delete_string, orderCodeForButton;

	view = '';
	for (index1 = 0; index1 < this.orders.length; index1 = index1 + 1) {
		order = this.orders[index1];
		orderCodeForButton = '';

		temp = '';
		for (index2 = 0; index2 < order["МассивСтрокЗаказа"].length; index2 = index2 + 1) {
			orderRow = order["МассивСтрокЗаказа"][index2];

			delete_string = '';
			if (orderRow["ЗапретРедактированияСтроки"] === false) {
				delete_string = '<a class="remove-picture"><span class="glyphicon glyphicon-remove"></span></a>';
				orderCodeForButton = orderRow["КодЗаказа"];
			}

			if (orderRow["ЗапретРедактированияСтроки"] === false) {
				temp +=
					'					<tr id="' + orderRow["Идентификатор"] + '" code="' + orderRow["КодЗаказа"] + '">';
			}
			else {
				temp +=
					'					<tr class="old" id="' + orderRow["Идентификатор"] + '" code="' + orderRow["КодЗаказа"] + '">';
			}
			temp +=
				'						<td>' + orderRow["Статус"] + '</td>' +
				'						<td>' + orderRow["НомерЗаказа"] + '</td>' +
				'						<td>' + orderRow["Размещение"] + '</td>' +
				'						<td>' + orderRow["НоменклатураНаименование"] + '</td>';
			if (orderRow["ЗапретРедактированияСтроки"] === false) {
				temp +=
					'						<td><a class="order-row-count" href="#" data-pk="' + index2 + '">' + orderRow["Количество"] + '</a></td>';
			}
			else {
				temp +=
					'						<td>' + orderRow["Количество"] + '</td>';
			}
			temp +=
				'						<td>' + orderRow["Цена"] + '</td>' +
				'						<td>' + orderRow["Сумма"] + '</td>' +
				'						<td>' + orderRow["Объем"] + '</td>' +
				'						<td>' + delete_string + '</td>' +
				'					</tr>';
		}

		view +=
			'<div class="panel panel-default">' +
			'	<div class="panel-heading">' +
			'		<h4 class="panel-title">' +
			'			<a data-toggle="collapse" data-parent="#tree-orders" href="#collapse' + index1 + '">' +
			order["ОписаниеЗаказа"] +
			'			</a>' +
			'			<a class="pull-right" data-toggle="collapse" data-parent="#tree-orders" href="#collapse' + index1 + '">' +
			order["СтрокаСтатусов"] +
			'			</a>' +
			'		</h4>' +
			'	</div>' +
			'	<div id="collapse' + index1 + '" class="panel-collapse collapse">' +
			'		<div class="panel-body">' +
			'			<table class="table panel-group-orders-table" id="panel-group-orders-table">' +
			'				<thead>' +
			'					<tr>' +
			'						<th class="col-status">Статус</th>' +
			'						<th class="col-order-number">№ заказа</th>' +
			'						<th class="col-stock">Размещение</th>' +
			'						<th class="col-status">Номенклатура</th>' +
			'						<th class="col-count">Количество</th>' +
			'						<th class="col-amount">Цена</th>' +
			'						<th class="col-amount">Сумма</th>' +
			'						<th class="col-amount">Объем</th>' +
			'						<th class="col-edit">Удалить</th>' +
			'					</tr>' +
			'				</thead>' +
			'				<tbody>' +
			temp +
			'				</tbody>' +
			'			</table>';
		if (order["ПризнакИзменения"] === true) {
			view +=
				'			<button id="button_' + orderCodeForButton + '" code="' + orderCodeForButton + '" type="button" class="btn btn-large btn-warning modify-order-button">Изменить заказ<span class="glyphicon glyphicon-usd"></span>' +
				'			</button>';
		} else {
			view +=
				'			<button id="button_' + orderCodeForButton + '" code="' + orderCodeForButton + '" type="button" class="btn btn-large modify-order-button" disabled="disabled">Изменить заказ<span class="glyphicon glyphicon-usd"></span>' +
				'			</button>';
		}
		view +=
			'		</div>' +
			'	</div>' +
			'</div>';
	}

	return view;
};

// ToDo поменять на использование setCurrentSuborderCode
User.prototype.setCurrentSuborder = function (suborder_code) {
	var index1, index2, order, orderRow;

	// Сохранить код подзаказа.
	this.currentSuborderCode = suborder_code;

	// Поиск заказа.
	for (index1 = 0; index1 < this.orders.length; index1 = index1 + 1) {
		order = this.orders[index1];
		for (index2 = 0; index2 < order["МассивСтрокЗаказа"].length; index2 = index2 + 1) {
			orderRow = order["МассивСтрокЗаказа"][index2];
			if (orderRow["КодЗаказа"] === suborder_code) {
				this.currentOrder = order;
				return;
			}
		}
	}
};

User.prototype.setCurrentSuborderCode = function (suborder_code) {
	this.currentSuborderCode = suborder_code;
};

User.prototype.getCurrentSuborderCode = function () {
	return this.currentSuborderCode;
};

User.prototype.setCurrentOrderRowCode = function (row_code) {
	this.currentRowCode = row_code;
};

User.prototype.getCurrentOrderRowCode = function () {
	return this.currentRowCode;
};

User.prototype.changeCurrentOrderRowCount = function(row_code, newCountValue){
	var index1, index2, order, row;

	for (index1 = 0; index1 < this.orders.length; index1 = index1 + 1) {
		order = this.orders[index1];
		for (index2 = 0; index2 < order["МассивСтрокЗаказа"].length; index2 = index2 + 1) {
			row = order["МассивСтрокЗаказа"][index2];
			if (row["Идентификатор"] === row_code) {
				row["Объем"] = row["Объем"] / row["Количество"] * parseInt(newCountValue, 0);
				row["Количество"] = parseInt(newCountValue, 0);
				row["Сумма"] = row["Количество"] * row["Цена"];
				order["ПризнакИзменения"] = true;
				return;
			}
		}
	}
};

User.prototype.deleteOrderRow = function(row_code){
	var index1, index2, order, row;

	for (index1 = 0; index1 < this.orders.length; index1 = index1 + 1) {
		order = this.orders[index1];
		for (index2 = 0; index2 < order["МассивСтрокЗаказа"].length; index2 = index2 + 1) {
			row = order["МассивСтрокЗаказа"][index2];
			if (row["Идентификатор"] === row_code) {
				order["МассивСтрокЗаказа"].splice(index2, 1);
				order["ПризнакИзменения"] = true;
				return;
			}
		}
	}
};

User.prototype.getCurrentModifiedOrder = function() {
	var Order, modified_order, rows, index, row;

	Order = require('./order');
	modified_order = new Order(this.currentSuborderCode);

	if (this.currentOrder !== null) {
		console.log('this.currentOrder !== null');
		rows = this.currentOrder["МассивСтрокЗаказа"];
		for (index = 0; index < rows.length; index = index + 1) {
			row = rows[index];
			console.log('row["КодЗаказа"] = ' + row["КодЗаказа"]);
			if (row["КодЗаказа"] === this.currentSuborderCode)
			{
				modified_order.addItem(
					row["НоменклатураКод"],
					row["НоменклатураНаименование"],
					row["Количество"],
					row["Цена"],
					row["Объем"],
					0
				);
			}
		}
	}

	return modified_order;
};

module.exports = User;