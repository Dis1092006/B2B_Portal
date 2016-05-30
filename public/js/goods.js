/*global $, jQuery*/
/*jslint node: true*/
/*jslint browser: true*/
/*jslint devel: true*/
"use strict";

function Goods() {

	this.goods = [];
	this.stocks = [];
}

Goods.prototype.setGoods = function (goods) {
	var firstItem, columnName, style;

	this.goods = goods;

	// Анализ первого узла для получения списка складов.
	firstItem = goods[0];
	this.stocks = [];
	for (var key in firstItem) {
		columnName = key.toLowerCase();
		if (columnName.indexOf('колонкасклада_') >= 0) {
			if (columnName.indexOf('в_наличии') >= 0)
				style = 'width: 100px; font-weight: bold; color: black';
			else if (columnName.indexOf('в_пути') >= 0)
				style = 'width: 100px; font-weight: bold; color: blue';
			else if (columnName.indexOf('под_заказ') >= 0)
				style = 'width: 100px; font-style: italic; color: red';
			else
				style = 'width: 100px;';
			this.stocks.push({
				name: key,
				style: style
			});
		}
	}
};

Goods.prototype.appendSubItems = function (items, stocks, level, basket_items, goods_column_width) {
	var tr, index, item, subItems, itemDescription, currentPadding, item_count_in_basket;

	//console.log(JSON.stringify(basket_items));

	currentPadding = 'padding-left: ' + level + 'px';

	tr = '';
	for (index = 0; index < items.length; index = index + 1) {
		item = items[index];

		// Вложенные элементы.
		subItems = item["МассивВеток"];

		if (item["ЭтоГруппа"]) {
			tr +=
				'<tr>' +
				'	<td>' + item["КодПозиции"] + '</td>' +
				'	<td style="width: ' + (goods_column_width - 1) + 'px;' + currentPadding + '">' + item["Товар"] + '</td>';
			$(stocks).each(function (index, stock) {
				tr +=
					'	<td style="' + stock.style + '"></td>';
			});

			tr +=
				'	<td style="width: 100px"></td>' +
				'	<td style="width: 100px"></td>' +
				'	<td style="width: 83px"></td>' +
				'	<td style="width: 50px"></td>' +
				'	<td></td>' +
				'	<td></td>' +
				'</tr>';
		} else {
			tr +=
				'<tr code="' + item["Код"] + '">' +
				'	<td>' + item["КодПозиции"] + '</td>' +
				'	<td style="width: ' + (goods_column_width - 1) + 'px;' + currentPadding + '">' + item["Товар"] + '</td>';
			$(stocks).each(function (index, stock) {
				tr +=
					'	<td style="' + stock.style + '">' + item[stock.name] + '</td>';
			});
			itemDescription = item["ДополнительноеОписаниеНоменклатуры"].replace(/"/g, "&quot;");

			// Поиск текущего элемента номенклатуры в корзине.
			item_count_in_basket = 0;
			if (basket_items !== undefined) {
				for (var i = 0; i < basket_items.length; i = i + 1) {
					if (basket_items[i].code === item["Код"]) {
						item_count_in_basket = basket_items[i].count;
					}
				}
			}

			tr +=
				'	<td style="width: 100px">' + item["СтоимостьТовара"] + '</td>' +
				'	<td style="width: 100px">' + item["Объем"] + '</td>' +
				'	<td style="width: 83px"><abbr title="' + itemDescription + '">описание</abbr></td>' +
				'	<td><input type="text" value="1" size="5"></td>' +
				'	<td><a class="basket-picture"><span class="glyphicon glyphicon-arrow-right"></span></a></td>' +
				'	<td>' + item_count_in_basket + '</td>' +
				//'	<td style="width: 100px"><a class="count" href="#" data-pk="' + level + '.' + index + '">0</td>' +
				//'	<td style="width: 100px"><a class="basket-picture"><span class="glyphicon glyphicon-shopping-cart"></span></a></td>' +
				'</tr>';
		}

		if ((subItems !== null) && (subItems !== undefined)) {
			if (subItems.length > 0) {
				tr += Goods.prototype.appendSubItems(subItems, stocks, level + 15, basket_items, goods_column_width);
			}
		}
	}

	return tr;
};

Goods.prototype.getGoodsTableView = function (basket_items, maxWidth) {
	var table, goods_column_width, stock_column_name, pos;

	// Определение ширин.
	goods_column_width = maxWidth - ((100 * this.stocks.length) + 100 + 100 + 83);

	table = '<table id="tree-table-goods" class="table table-bordered table-condensed">' +
//	table = '<table id="tree-table-goods" class="scrollTable">' +
//	table = '<table id="tree-table-goods" border="0" cellpadding="0" cellspacing="0" width="100%" class="scrollTable">' +
		'	<thead>' +
//		'	<thead class="fixedHeader">' +
		'		<tr>' +
		'			<th>Код позиции</th>' +
		'			<th style="width: ' + (goods_column_width - 1) + 'px">Товар</th>';
	$(this.stocks).each(function (index, stock) {
		stock_column_name = stock.name;
		pos = stock_column_name.toLowerCase().indexOf('колонкасклада_');
		if (pos === 0) {
			stock_column_name = stock_column_name.substring(14);
		} else if (pos > 0) {
			stock_column_name = stock_column_name.substring(0, pos) + stock_column_name.substring(pos + 14);
		}
		stock_column_name = stock_column_name.replace(new RegExp('_', 'g'), ' ');
		table +=
			'			<th style="' + stock.style + '">' + stock_column_name + '</th>';
	});
	table +=
		'			<th style="width: 100px">Стоимость товара</th>' +
		'			<th style="width: 100px">Объем (1 шт)</th>' +
		'			<th style="width: 83px">Описание</th>' +
		'			<th>Добавить в корзину</th>' +
		'			<th></th>' +
		'			<th>В корзине</th>' +
		'		</tr>' +
		'	</thead>' +
		'	<tbody>' +
//		'	<tbody id="scroll-table-goods" class="scrollContent">' +
		Goods.prototype.appendSubItems(this.goods, this.stocks, 5, basket_items, goods_column_width) +
		'	</tbody>' +
		'</table>';

	return table;
};

module.exports = Goods;