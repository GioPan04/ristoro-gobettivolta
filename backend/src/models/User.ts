export enum UserType {
    student,
    prof
}

export default class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public type: UserType,
    ) {}
}