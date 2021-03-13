import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity()
export default class StudentsClass {
    @PrimaryGeneratedColumn('increment')
    public id: number;
    @Column()
    public className: string;
    @OneToMany(type => User, user => user.userClass)
    public students: User[]
    
    constructor(
        id: number,
        className: string,
        students: User[],
    ) {
        this.students = students;
        this.id = id;
        this.className = className;
    }
}