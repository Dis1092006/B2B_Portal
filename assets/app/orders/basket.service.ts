import {EventEmitter} from "@angular/core";
import {Order} from "./order";
import {GoodsItem} from "../goods/goods-item";
import {OrderItem} from "./order-item";

export class BasketService {
	basket: Order;
	basketInfo: string;
	basketInfoChanged = new EventEmitter<string>();

	constructor() {
		this.basket = new Order('');
		this.basketInfo = 'Ваша корзина пуста';
	}

	getBasket() {
		return this.basket;
	}

	addItem(goodsItem: GoodsItem, count: number) {
		let orderItem = this.basket.getItem(goodsItem.code);
		if (orderItem) {
			orderItem.count += count;
		} else {
			orderItem = new OrderItem(
				goodsItem.code,
				goodsItem.name,
				count,
				goodsItem.price,
				goodsItem.volume,
				goodsItem.price
			);
			this.basket.addItem(orderItem);
		}
		this.updateBasketInfo();
	}

	editItem(item: OrderItem) {

	}

	deleteItem(item: OrderItem) {
		this.basket.deleteItem(item);
	}

	countOfItem(itemCode: string) {
		let count = 0;
		this.basket.getItems().forEach(
			item => {
			if (item.code === itemCode) {
				count += item.count;
			}
		});
		return count;
	}

	updateBasketInfo() {
		this.basketInfo = 'Корзина: ' + 'кол-во: ' + this.basket.getTotalCount() + ', сумма: ' + this.basket.getTotalAmount() + ', объём: ' + this.basket.getTotalVolume().toFixed(4);
		this.basketInfoChanged.emit(this.basketInfo);
	}

	getBasketInfo() {
		return this.basketInfo;
	}
}