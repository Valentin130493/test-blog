export interface User {
    email: string;
    user_id: number;
    username: string;
}

export interface IRegistrationForm {
    username?: string;
    email: string;
    password: string;
}