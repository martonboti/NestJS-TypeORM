export interface Token {
    sub: string;
    name: string;
    email: string;
    iat: Date;
    exp: Date;
}
