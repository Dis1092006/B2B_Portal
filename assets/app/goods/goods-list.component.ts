import {Component, OnInit} from "@angular/core";
import {GoodsItem} from "./goods-item";
import {GoodsService} from "./goods.service";
import {BasketService} from "../orders/basket.service";

@Component({
	selector: 'goods-list',
	template: `
        <div class="panel panel-default">
            <table id="tree-table-goods" class="table table-bordered table-condensed">
                <thead>
                    <tr>
                        <th>Товар</th>
                        <th style="width: 100px">Стоимость товара</th>
                        <th style="width: 100px">Объем (1 шт)</th>
                        <th style="width: 83px">Описание</th>
                        <th>Добавить в корзину</th>
                        <th></th>
                        <th>В корзине</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of goods">
                        <td style="{{'padding-left:' + (5 + item.level * 15) + 'px'}}">{{item.name}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.volume}}</td>
                        <td><abbr title="{{item.description}}">описание</abbr></td>
                        <td><input type="text" value="1" size="5"></td>
                        <td><a (click)="onAddToBasket(item, 1)" class="basket-picture"><span class="glyphicon glyphicon-arrow-right"></span></a></td>
                        <td>{{_basketService.countOfItem(item.code)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class GoodsComponent implements OnInit {
	goods: GoodsItem[];

	constructor(private _goodsService: GoodsService, private _basketService: BasketService) {
	}

	ngOnInit() {
		this.goods = this._goodsService.getGoods();
	}

	onAddToBasket(item: GoodsItem, count: number) {
		this._basketService.addItem(item, count);
	}
}
