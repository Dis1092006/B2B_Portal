import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Order} from "./order";
import {OrderService} from "./order.service";
import {OrderItem} from "./order-item";
import {BasketService} from "./basket.service";

@Component({
    selector: 'basket',
    template: `
        <div class="panel panel-default">
		    <div class="panel-heading">Клиент</div>
				<div class="panel-body">
					<div class="col-md-6">
						<div class="legal-entity">
							Юридическое лицо:
							<select class="selectpicker" data-width="auto" id="select-legal-entity">
							</select>
						</div>
					</div>
					<div class="col-md-6">
						<div class="outlet">
							Для торговой точки:
							<select class="selectpicker" data-width="auto" id="select-outlet">
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="panel panel-default">
				<div class="panel-heading">
					<!--Текущий заказ-->
					<button id="make-order-button" type="button" class="btn btn-large btn-warning" (click)="onNewOrder()">Оформить заказ <span class="glyphicon glyphicon-usd"></span>
					</button>
				</div>
				<div class="panel-body">
					<div class="table-responsive" id="tree-order">
						<table id="tree-table-order" class="table table-bordered table-condensed">
							<thead>
							<tr>
								<th class="row-goods">Позиция</th>
								<th class="row-stock">Кол-во</th>
								<th class="row-cost">Цена</th>
								<th class="row-cost">Сумма</th>
								<th class="row-cost">Объем</th>
								<th class="row-cost">Желаемая цена</th>
								<th>Удалить</th>
							</tr>
							</thead>
							<tbody>
							<tr *ngFor="let item of basket.items">
                                <td>{{item.name}}</td>
                                <td>{{item.count}}</td>
                                <td>{{item.price}}</td>
                                <td>{{item.getAmount()}}</td>
                                <td>{{(item.volume * item.count).toFixed(4)}}</td>
                                <td>{{item.preferred_price}}</td>
                                <td><a (click)="onDeleteItem(item)"><span class="glyphicon glyphicon-remove"></span></a></td>
                            </tr>
							</tbody>
                            <tfoot>
                                <tr>
                                    <td><b>Итого заказ</b></td>
                                    <td><b>{{basket.getTotalCount()}}</b></td>
                                    <td></td>
                                    <td><b>{{basket.getTotalAmount()}}</b></td>
                                    <td><b>{{basket.getTotalVolume().toFixed(4)}}</b></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
					</div>
				</div>
			</div>
    `
})
export class BasketComponent implements OnInit {
    basket: Order;

    constructor(private _orderService : OrderService, private _basketService : BasketService) {

    }

    ngOnInit() {
        this.basket = this._basketService.getBasket();
    }

	onDeleteItem(item) {
		this._basketService.deleteItem(item);
	}

	onNewOrder() {
        console.log('New order');
        this._orderService.newOrder(this.basket);
    }
}
