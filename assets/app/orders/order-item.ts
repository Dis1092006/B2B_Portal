export class OrderItem {
    constructor(
        public code: string,
        public name: string,
        public count: number,
        public price: number,
        public amount: number,
        public volume: number,
        public preferred_price: number
    ) {

    }
}