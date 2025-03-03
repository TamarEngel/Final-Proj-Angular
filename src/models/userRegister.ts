export class UserRegister {
    constructor(
        public email: string,
        public password: string,
        public name?: string,
        public role?: Role,
    ) { }
}
export enum Role {
    admin = 'admin',
    teacher = 'teacher',
    student = 'student'
}