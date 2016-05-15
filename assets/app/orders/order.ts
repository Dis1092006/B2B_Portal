import {OrderItem} from "./order-item";

export class Order {
    items: OrderItem[];

    constructor(public number: string) {
        this.items = [];
    }

    getItems() {
	    return this.items;
    }

	getItem(itemCode: string) {
		let item: OrderItem = null;
		for (let index = 0; index < this.items.length; index++) {
			if (this.items[index].code === itemCode) {
				item = this.items[index];
				index = this.items.length;
			}
		}
		return item;
	}

	addItem(item: OrderItem) {
		this.items.push(item);
	}

	deleteItem(item: OrderItem) {
		this.items.splice(this.items.indexOf(item), 1);
	}

}