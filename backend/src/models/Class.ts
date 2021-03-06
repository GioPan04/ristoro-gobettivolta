import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity()
export default class StudentsClass extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    public id!: number;
    @Column({unique: true, type: 'varchar'})
    public name!: string;
    @OneToMany(type => User, user => user.userClass)
    public students!: User[]
}