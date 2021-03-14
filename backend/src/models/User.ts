import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IGoogleUser } from "../utils/GoogleOAuth";
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
    @Column('varchar', {nullable: true, unique: true})
    public googleId?: string;
    @Column({type: 'enum', enum: UserType, default: UserType.student})
    public type!: UserType;
    @ManyToOne(type => StudentsClass, studentClass => studentClass.students)
    public userClass?: StudentsClass;

    static async fromGoogleOAuth(paylaod: IGoogleUser): Promise<User> {
        let user = await User.findOne({
            where: {
                googleId: paylaod.userId
            }
        });
        if(user) return user;
        
        user = new User();
        user.email = paylaod.email;
        user.googleId = paylaod.userId;
        user.type = paylaod.isStudent ? UserType.student : UserType.prof;
        await user.save();

        return user;
    }

}