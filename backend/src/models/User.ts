import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import StudentsClass from "./Class";

export enum UserType {
    student = 'student',
    prof = 'prof'
}

@Entity()
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    public id!: number;
    @Column('varchar')
    public email!: string;
    @Column({type: 'enum', enum: UserType, default: UserType.student})
    public type!: UserType;
    @ManyToOne(type => StudentsClass, studentClass => studentClass.students)
    public userClass?: StudentsClass;

}