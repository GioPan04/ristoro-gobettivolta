import StudentsClass from "./Class";

export enum UserType {
    student,
    prof
}

export default class User {

    public firstName: string;
    public lastName: string;
    public type: UserType;
    public userClass?: StudentsClass;


    constructor(
        firstName: string,
        lastName: string,
        type: UserType,
        userClass?: StudentsClass,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
        this.userClass = userClass;
    }

}