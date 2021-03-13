import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import StudentsClass from "./Class";

export enum UserType {
    student,
    prof
}

@Entity()
export default class User {

    @PrimaryGeneratedColumn('increment')
    public id: number;
    @Column()
    public email: string;
    @Column({type: 'enum', enum: UserType, default: UserType.student})
    public type: UserType;
    @ManyToOne(type => StudentsClass, studentClass => studentClass.students)
    public userClass?: StudentsClass;

    constructor(
        id: number,
        email: string,
        type: UserType,
        userClass?: StudentsClass,
    ) {
        this.id = id;
        this.email = email;
        this.type = type;
        this.userClass = userClass;
    }

}