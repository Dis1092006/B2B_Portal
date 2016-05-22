import {Component, Input} from "@angular/core";
import {GoodsItem} from "./goods-item";
import {GoodsService} from "./goods.service";
import {BasketService} from "../orders/basket.service";

@Component({
	selector: '[goods-item]',
	template: `
        <td [ngStyle]="{'padding-left': (5 + item.level * 15) + 'px'}">{{item.name}}</td>
        <td *ngIf="item.isGroup"></td>
        <td *ngIf="!item.isGroup">{{item.price}}</td>
        <td *ngIf="item.isGroup"></td>
        <td *ngIf="!item.isGroup">{{item.volume}}</td>
        <td *ngIf="item.isGroup"></td>
        <td *ngIf="!item.isGroup"><abbr title="{{item.description}}">описание</abbr></td>
        <td *ngIf="item.isGroup"></td>
        <td *ngIf="!item.isGroup"><input type="number" min="0" size="5" [(ngModel)]="itemCount"></td>
        <td *ngIf="item.isGroup"></td>
        <td *ngIf="!item.isGroup"><a (click)="onAddToBasket(item)" class="basket-picture"><span class="glyphicon glyphicon-arrow-right"></span></a></td>
        <td *ngIf="item.isGroup"></td>
        <td *ngIf="!item.isGroup">{{_basketService.countOfItem(item.code)}}</td>
    `
})
export class GoodsItemComponent {
	@Input('goods-item') item: GoodsItem;
	itemCount: number = 1;

	constructor(private _goodsService: GoodsService, private _basketService: BasketService) { }

	onAddToBasket(item: GoodsItem) {
		this._basketService.addItem(item, this.itemCount);
		this.itemCount = 1;
	}
}