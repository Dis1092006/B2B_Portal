import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Order} from "./order";
import {OrderService} from "./order.service";

@Component({
    selector: 'order',
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
					<button id="make-order-button" type="button" class="btn btn-large btn-warning" (click)="onClick()">Оформить заказ <span class="glyphicon glyphicon-usd"></span>
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
							</tr>
							</thead>
							<tbody>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td><a href="#" data-pk="1"></a></td>
							</tr>
							</tbody>
						</table>
						<!--
												<table id="tree-table-order-footer" class="table table-bordered table-condensed">
												</table>
						-->
					</div>
				</div>
			</div>
    `
})
export class BasketComponent {
    @Input() order: Order;

    constructor(private _orderServise : OrderService) {

    }

    onClick() {
        console.log('Make order');
        this._orderServise.addOrder(this.order);
    }
}
