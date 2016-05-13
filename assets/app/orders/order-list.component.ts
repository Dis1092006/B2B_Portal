import {Component, OnInit} from "@angular/core";
import {OrderComponent} from "./order.component";
import {Order} from "./order";
import {OrderService} from "./order.service";

@Component({
    selector: 'order-list',
    template: `
        <div class="panel-group" id="panel-group-orders">
            <order *ngFor="let order of orders" [order]="order" (editClicked)="onEditClick($event)"></order>
        </div>
    `,
    directives: [OrderComponent]
})
export class OrderListComponent implements OnInit {
    orders: Order[];

    constructor(private _orderServise : OrderService){
    }

    ngOnInit() {
        this.orders = this._orderServise.getOrders();
    }

    onEditClick(order_event) {

    }
}