import {OrderItem} from "./order-item";

export class Order {
    items: OrderItem[];
	totalCount : number;
	totalAmount : number;
	totalVolume : number;

    constructor(public number: string) {
        this.items = [];
	    this.totalCount = 0;
	    this.totalAmount = 0;
	    this.totalVolume = 0;
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
		this.totalCount += item.count;
		this.totalAmount += item.getAmount();
		this.totalVolume += (item.volume * item.count);
	}

	deleteItem(item: OrderItem) {
		this.items.splice(this.items.indexOf(item), 1);
	}

	getTotalCount() {
		return this.totalCount;
	}

	getTotalAmount() {
		return this.totalAmount;
	}

	getTotalVolume() {
		return this.totalVolume;
	}
}