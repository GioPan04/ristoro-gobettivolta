import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum FoodType {
    drink = 'Bevanda',
    snack = 'Merenda',
    sandwich = 'Panino'
}

@Entity()
export default class Food extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    public id!: number;
    
    @Column({type: 'varchar', length: 50, nullable: false})
    public name!: string;

    @Column({type: 'enum', enum: FoodType, nullable: false})
    public type!: FoodType;

    @Column({type: 'int', default: 0})
    public qtyAvaible!: number;

    @Column({type: 'varchar', length: 200, default: ''})
    public description!: string;
}
