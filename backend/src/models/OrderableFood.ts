import Food, { FoodType } from "./Food";

export default class OrderableFood extends Food {

    constructor(
        public name: string,
        public type: FoodType,
        public avaibleQty: number,
    ) {
        super(name, type);
    }

    public get isAvaible() : boolean {
        // TODO: Check db
        return true;
    }

}