export class OrderRow {

    constructor(
        public code: string,
        public name: string,
        public count: number,
        public price: number,
        public volume: number,
        public preferred_price: number
    ) {

    }

	getAmount() {
		return this.price * this.count;
	}
}