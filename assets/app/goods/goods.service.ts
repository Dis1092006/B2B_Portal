import {GoodsItem} from "./goods-item";

export class GoodsService {
    goods: GoodsItem[] = [];

    constructor() {
        this.goods.push(new GoodsItem(0, true, '01 ЭЛЕКТРОНИКА И ЦИФРОВАЯ ТЕХНИКА'));
        this.goods.push(new GoodsItem(1, true, '01 ТЕЛЕВИЗОРЫ'));
        this.goods.push(new GoodsItem(2, true, '1 ТЕЛЕВИЗОРЫ'));
        this.goods.push(new GoodsItem(3, true, 'ERISSON'));
        this.goods.push(new GoodsItem(4, true, 'Телевизор LED ERISSON 32LES70Т2', 12700, 0.0765, 'DVB-T2/C,DVB-S/S2 (спутниковый тюнер) 31,5", LED,slim design, HD,16∶9, ярк. 250 кд/м2, контраст.(стат.) 3000:1, разр. 1366x768, время откл. 8 мс, 100 +DTV 1000 каналов, PAL/SECAM BG/DK/I, телетекст,слот CI+,многофункц.таймер,A2 stereo,Input jack,3*HDMI,2*USB movie+запись, VGA, SCART,S-Video,Headphones,RCA,Virtual Dolby,макс. потр. мощн. 65 Вт, '));
    }

    getGoods() {
        return this.goods;
    }
}