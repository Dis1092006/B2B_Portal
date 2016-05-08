import {Component} from "angular2/core";
import {OrderComponent} from "./order.component";
import {Order} from "./order";
import {OrderItem} from "./order-item";

@Component({
    selector: 'order-list',
    template: `
        <div class="panel-group" id="panel-group-orders">
            <order *ngFor="#order of orders" [order]="order" (editClicked)="onEditClick($event)"></order>
        </div>
    `,
    directives: [OrderComponent]
})
export class OrderListComponent {
    orders: Order[] = [];

    constructor() {
        this.orders.push(new Order('1'));
        this.orders[0].items.push(new OrderItem('code 111', 'Item Name 1', 1, 100, 100, 3, 90));
        this.orders.push(new Order('2'));
    }

    onEditClick(order_event) {

    }
}