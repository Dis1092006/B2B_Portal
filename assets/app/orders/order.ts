import {OrderItem} from "./order-item";

export class Order {
    items: OrderItem[];

    constructor(public number: string) {
        this.items = [];
    }

    getItems() {
	    return this.items;
    }

	addItem(item: OrderItem) {
		this.items.push(item);
	}

	editItem() {
		
	}

	deleteItem(item: OrderItem) {
		this.items.splice(this.items.indexOf(item), 1);
	}

}