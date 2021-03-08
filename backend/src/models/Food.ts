export interface IFood {
    name: string,
    type: FoodType,
}

export enum FoodType {
    drink = 'Bevanda',
    snack = 'Merenda',
    sandwich = 'Panino'
}

export default class Food implements IFood {
     
    constructor(public name: string, public type: FoodType) {}
    
    public get isAvaible() : boolean {
        // TODO: Check db
        return true;
    }
    
}
