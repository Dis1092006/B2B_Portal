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
}