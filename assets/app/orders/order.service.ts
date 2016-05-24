import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Order} from "./order";
import {OrderRow} from "./order-row";
import {ErrorService} from "../errors/error.service";

@Injectable()
export class OrderService {
    orders: Order[] = [];

    constructor(private _http: Http, private _errorService: ErrorService) {
        this.orders.push(new Order('1'));
        this.orders[0].rows.push(new OrderRow('code 111', 'Item Name 1', 1, 100, 3, 90));
        this.orders.push(new Order('2'));
    }

    newOrder(order: Order) {
	    console.log("OrderService.newOrder");
	    this.makeOrder(order)
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

    makeOrder(order: Order) {
	    var token, userId;
	    console.log("makeOrder, now = " + new Date().toTimeString());
	    if (localStorage.getItem('token')) {
		    token = '?token=' + localStorage.getItem('token');
		    if (localStorage.getItem('userId'))
			    userId =  '&userId=' + localStorage.getItem('userId');
	    }
	    else {
		    token = '';
		    userId = '';
	    }
	    const body = JSON.stringify(order);
	    const headers = new Headers();
	    headers.append('Content-Type', 'application/json');
	    //return this._http.post('https://torg-b2b.ru/Portal_TEST/orders' + token + userId, body, {headers: headers})
	    return this._http.post('https://localhost:8000/Portal_TEST/orders' + token + userId, body, {headers: headers})
		    .map(response => response.json())
		    .catch(error => {
			    return Observable.throw(error)
		    });
    }
}