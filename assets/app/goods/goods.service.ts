import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {GoodsItem} from "./goods-item";
import 'rxjs/Rx';
import {Observable} from "rxjs/Rx";

@Injectable()
export class GoodsService {
    goods: GoodsItem[] = [];

    constructor(private _http: Http) { }

    getGoods() {
        return this._http.get('http://localhost:8000/goods')
	        .map(response => {
		        const data = JSON.parse(response.json().obj);
		        let goods: any[] = [];
		        for (let i = 0; i < data.length; i++) {
			        //console.log("data[i]: " + JSON.stringify(data[i]));
					this.parseGoodsItem(data[i], 0, goods);
			        return goods;
		        }
	        });
            // .catch(error => {
			// 	console.log("getGoods() error: " + JSON.stringify(error));
			// 	return Observable.throw(error.json())
			// });
    }

	parseGoodsItem(itemData, level, goods) {
		let goodsItem = new GoodsItem(
			itemData["Код"],
			level,
			itemData["ЭтоГруппа"],
			itemData["Товар"],
			itemData["СтоимостьТовара"],
			itemData["Объем"],
			itemData["ДополнительноеОписаниеНоменклатуры"]
		);
		goods.push(goodsItem);
		if (itemData["МассивВеток"]) {
			for (let i = 0; i < itemData["МассивВеток"].length; i++) {
				this.parseGoodsItem(itemData["МассивВеток"][i], level + 1, goods);
			}
		}
	}
}