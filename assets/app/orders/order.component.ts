import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Order} from "./order";

@Component({
    selector: 'order',
    template: `
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a aria-expanded="true" data-toggle="collapse" href="#collapse{{order.code}}">
                        Заказ №{{order.code}} от 25.03.2016. Корниенко М.В. ИП. Батайск. Сумма:127&nbsp;450. Количество:21
                    </a>
                    <a aria-expanded="true" class="pull-right" data-toggle="collapse" href="#" (click)="onEditOrder()">
                        <span class="glyphicon glyphicon-usd">Изменить заказ</span>
                    </a>
                </h4>
            </div>
            <div aria-expanded="true" style="" id="collapse{{order.code}}" class="panel-collapse collapse in">
                <div class="panel-body">
                    <table id="tree-table-order" class="table table-bordered table-condensed order-table">
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
                            <tr *ngFor="let item of order.items">
                                <td>{{item.name}}</td>
                                <td>{{item.count}}</td>
                                <td>{{item.price}}</td>
                                <td>{{item.amount}}</td>
                                <td>{{(item.volume * item.count).toFixed(4)}}</td>
                                <td>{{item.preferred_price}}</td>
                                <td><a (click)="onDeleteItem()"><span class="glyphicon glyphicon-remove"></span></a></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><b>Итого заказ</b></td>
                                <td><b>{{total_count}}</b></td>
                                <td></td>
                                <td><b>{{total_amount}}</b></td>
                                <td><b>{{total_volume.toFixed(4)}}</b></td>
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
export class OrderComponent {
    @Input() order: Order;
    @Output() editClicked = new EventEmitter<string>();
    total_count: number = 0;
    total_amount: number = 0;
    total_volume: number = 0;

    onEditOrder() {
        this.editClicked.emit('Edit');
    }

    onDeleteItem() {

    }
}
