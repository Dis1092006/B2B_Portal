import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {GoodsItem} from "./goods-item";
import 'rxjs/Rx';
import {Observable} from "rxjs/Rx";

@Injectable()
export class GoodsService {
    goods: GoodsItem[] = [];

    constructor(private _http: Http) {
        // this.goods.push(new GoodsItem('0', 0, true, '01 ЭЛЕКТРОНИКА И ЦИФРОВАЯ ТЕХНИКА'));
        // this.goods.push(new GoodsItem('1', 1, true, '01 ТЕЛЕВИЗОРЫ'));
        // this.goods.push(new GoodsItem('2', 2, true, '1 ТЕЛЕВИЗОРЫ'));
        // this.goods.push(new GoodsItem('3', 3, true, 'ERISSON'));
        // this.goods.push(new GoodsItem('4', 4, false, 'Телевизор LED ERISSON 32LES70Т2', 12700, 0.0765, 'DVB-T2/C,DVB-S/S2 (спутниковый тюнер) 31,5", LED,slim design, HD,16∶9, ярк. 250 кд/м2, контраст.(стат.) 3000:1, разр. 1366x768, время откл. 8 мс, 100 +DTV 1000 каналов, PAL/SECAM BG/DK/I, телетекст,слот CI+,многофункц.таймер,A2 stereo,Input jack,3*HDMI,2*USB movie+запись, VGA, SCART,S-Video,Headphones,RCA,Virtual Dolby,макс. потр. мощн. 65 Вт, '));
    }

    getGoods() {
        //return this.goods;
        return this._http.get('http://localhost:3000/goods')
	        .map(response => {
		        const data = response.json().obj;
		        console.log("data: " + JSON.stringify(data));
		        console.log("data.length = " + data.length);
		        console.log("typeof(data) = " + typeof(data));
		        let objs: any[] = [];
		        for (let i = 0; i < data.length; i++) {
			        console.log("data[i]: " + JSON.stringify(data[i]));
			        let goodsItem = new GoodsItem(
				        data[i]["Код"],
				        0,
				        data[i]["ЭтоГруппа"],
				        data[i]["Товар"],
				        data[i]["СтоимостьТовара"],
				        data[i]["Объем"],
				        data[i]["ДополнительноеОписаниеНоменклатуры"]
			        );
			        objs.push(goodsItem);
			        return objs;
		        }
	        })
	        .catch(error => Observable.throw(error.json()));
    }
}