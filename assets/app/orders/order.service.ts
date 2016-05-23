import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Order} from "./order";
import {OrderItem} from "./order-item";
import {ErrorService} from "../errors/error.service";

@Injectable()
export class OrderService {
    orders: Order[] = [];

    constructor(private _http: Http, private _errorService: ErrorService) {
        this.orders.push(new Order('1'));
        this.orders[0].items.push(new OrderItem('code 111', 'Item Name 1', 1, 100, 3, 90));
        this.orders.push(new Order('2'));
    }

    newOrder(order: Order) {
	    console.log("OrderService.newOrder");
	    this.makeOrder()
		    .subscribe(
			    data => {
				    console.log("newOrder, got data, now = " + new Date().toTimeString());
				    this.orders.push(order);
			    },
			    error => this._errorService.handleError(error)
		    );
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

    makeOrder() {
	    console.log("makeOrder, now = " + new Date().toTimeString());
	    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
	    return this._http.post('https://torg-b2b.ru/Portal_TEST/orders' + token)
		    .map(response => response.json())
		    .catch(error => {
			    return Observable.throw(error)
		    });
    }
}