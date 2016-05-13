import {Order} from "./order";
import {OrderItem} from "./order-item";
export class OrderService {
    orders: Order[] = [];
    basket: Order;

    constructor() {
        this.orders.push(new Order('1'));
        this.orders[0].items.push(new OrderItem('code 111', 'Item Name 1', 1, 100, 100, 3, 90));
        this.orders.push(new Order('2'));
    }

    addOrder(order: Order) {
        this.orders.push(order);
    }

    getOrders() {
        return this.orders;
    }

    // editOrder(order: Order) {
    //     this.orders[this.orders.indexOf(order)] = new Order('!');
    // }

    deleteOrder(order: Order) {
        this.orders.splice(this.orders.indexOf(order), 1);
    }

    addItemToBacket(item: OrderItem) {
        this.basket.items.push(item);
    }

    editItemInBacket(item: OrderItem) {

    }

    deleteItemFromBacket(item: OrderItem) {

    }
}