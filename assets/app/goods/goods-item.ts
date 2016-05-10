export class GoodsItem {
    constructor(
        public level: number,
        public isGroup: boolean,
        public name: string,
        public price?: number,
        public volume?: number,
        public description?: string
    ) {}
}