import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable, Observer} from "rxjs/Rx";
import 'rxjs/Rx';
import {GoodsItem} from "./goods-item";
import {ErrorService} from "../errors/error.service";

@Injectable()
export class GoodsService {
	goods$: Observable<GoodsItem[]>;
	private _goodsObserver: Observer<GoodsItem[]>;
	private _dataStore: {
		goods: GoodsItem[];
	};

	constructor(private _http: Http, private _errorService: ErrorService) {
		console.log("GoodsService.constructor");
		this.goods$ = new Observable<GoodsItem[]>(observer => this._goodsObserver = observer).share();
		this._dataStore = {
			goods: []
		};
	}

	loadGoods(): Observable<any> {
		console.log("loadGoods, now = " + new Date().toTimeString());
		const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
		//return this._http.get('https://torg-b2b.ru/Portal_TEST/goods' + token)
		return this._http.get('https://localhost:8000/Portal_TEST/goods' + token)
			.map(response => this.extractData(response))
			.catch(error => this.handleError(error));
	}

	private extractData(response: Response) {
		if (response.status < 200 || response.status >= 300) {
			throw new Error('Bad response status: ' + response.status);
		}
		const data = JSON.parse(response.json().obj);
		let _goods: GoodsItem[] = [];
		for (let i = 0; i < data.length; i++) {
			this.parseGoodsItem(data[i], 0, _goods);
		}
		return _goods;
	}

	private parseGoodsItem(itemData, level, goods) {
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

	private handleError(error: any) {
		let errorMessage = error.message || error;
		console.error(errorMessage);
		return Observable.throw(errorMessage);
	}

	refreshGoods() {
		console.log("GoodsService.refreshGoods");
		this.loadGoods()
			.subscribe(
				data => {
					console.log("refreshGoods, got data, now = " + new Date().toTimeString());
					this._dataStore.goods = data;
					if (this._goodsObserver) {
						console.log("refreshGoods, inform to observers, now = " + new Date().toTimeString());
						this._goodsObserver.next(this._dataStore.goods);
					}
				},
				error => this._errorService.handleError(error)
			);
	}

	getGoods() {
		console.log("GoodsService.getGoods");
		return this._dataStore.goods;
	}
}