import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {GoodsItem} from "./goods-item";
import {GoodsService} from "./goods.service";
import {BasketService} from "../orders/basket.service";
import {ErrorService} from "../errors/error.service";
import {GoodsItemComponent} from "./goods-item.component";

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
                    <tr *ngFor="let item of goods" [goods-item]="item">
                    </tr>
                </tbody>
            </table>
        </div>
    `,
	directives: [GoodsItemComponent]
})
export class GoodsListComponent implements OnInit {
	goods: GoodsItem[] = [];

	constructor(private _goodsService: GoodsService, private _basketService: BasketService, private _errorService: ErrorService) {
	}

	ngOnInit() {
		//this.goods = this._goodsService.getGoods();
		console.log("GoodsListComponent.ngOnInit");
		this._goodsService.goods$
			.subscribe(
				value => {
					this.goods = value;
				},
				error => this._errorService.handleError(error)
			);
		this.onRefreshGoodsList();
	}

	onRefreshGoodsList() {
		console.log("onRefreshGoodsList");
		this.goods = this._goodsService.getGoods();
	}

	onAddToBasket(item: GoodsItem, count: number) {
		this._basketService.addItem(item, count);
	}
}
