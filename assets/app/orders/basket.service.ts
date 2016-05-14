import {Order} from "./order";
import {GoodsItem} from "../goods/goods-item";
import {OrderItem} from "./order-item";

export class BasketService {
	basket: Order;

	constructor() {
		this.basket = new Order('');
	}

	getItems() {
		return this.basket.getItems();
	}

	addItem(goodsItem: GoodsItem) {
		let orderItem = new OrderItem(
			goodsItem.code,
			goodsItem.name,
			1,
			goodsItem.price,
			goodsItem.volume,
			goodsItem.price
		);
		this.basket.addItem(orderItem);
	}

	editItem(item: OrderItem) {

	}

	deleteItem(item: OrderItem) {
		this.basket.deleteItem(item);
	}
}