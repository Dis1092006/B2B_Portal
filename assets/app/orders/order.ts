import {OrderRow} from "./order-row";

export class Order {
	// ШАПКА ЗАКАЗА:
	// Код(УИД) заказа - для случаев, если это не новый заказ (если новый то пустая строка),
	code: string;
	// Код контрагента,
	legal_entity: string;
	// Адрес доставки
	outlet: string;
	// Адрес доставки
	code_division: string;
	// ТАБЛИЧНАЯ ЧАСТЬ:
	rows: OrderRow[];
	// Подвал:
	totalCount : number;
	totalAmount : number;
	totalVolume : number;

    constructor(code: string) {
	    this.code = code;
	    this.legal_entity = '';
	    this.outlet = '';
	    this.code_division = '';
        this.rows = [];
	    this.totalCount = 0;
	    this.totalAmount = 0;
	    this.totalVolume = 0;
    }

    getRows() {
	    return this.rows;
    }

	getRow(rowCode: string) {
		let row: OrderRow = null;
		for (let index = 0; index < this.rows.length; index++) {
			if (this.rows[index].code === rowCode) {
				row = this.rows[index];
				index = this.rows.length;
			}
		}
		return row;
	}

	addItem(row: OrderRow) {
		this.rows.push(row);
		this.totalCount += row.count;
		this.totalAmount += row.getAmount();
		this.totalVolume += (row.volume * row.count);
	}

	deleteItem(row: OrderRow) {
		this.rows.splice(this.rows.indexOf(row), 1);
	}

	getTotalCount() {
		return this.totalCount;
	}

	getTotalAmount() {
		return this.totalAmount;
	}

	getTotalVolume() {
		return this.totalVolume;
	}
}