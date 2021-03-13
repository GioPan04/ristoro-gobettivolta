import { BaseEntity, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Food from "./Food";
import User from "./User";

@Entity()
export default class OrderedFood extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    public id!: number;

    @ManyToOne(type => Food, food => food.id)
    public food!: Food;
    
    @ManyToOne(type => User, user => user.id)
    public user!: User;
}