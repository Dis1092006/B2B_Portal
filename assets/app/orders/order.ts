import {OrderItem} from "./order-item";

export class Order {
    items: OrderItem[];

    constructor(public number: string) {
        this.items = [];
    }
}