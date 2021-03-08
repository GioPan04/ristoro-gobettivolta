export enum FoodType {
    drink = 'Bevanda',
    snack = 'Merenda',
    sandwich = 'Panino'
}

export default class Food {
     
    constructor(public name: string, public type: FoodType) {}
    
}
