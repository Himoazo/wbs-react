/* export interface User {
    email: string,
    Username: string
} */

export interface Login {
    email: string,
    password: string
}

/* export interface AuthRes {
    user: User,
    email: string,
    token: string
} */

export interface User {
    Username: string,
    email: string,
    token: string
}

export interface AuthContext {
    user: User | null,
    login: (loginData: Login) => Promise<void>;
    logout: () => void;
}