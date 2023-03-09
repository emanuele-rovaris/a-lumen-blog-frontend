export interface ILoginResponse {
    access_token: string;
    token_type: string;
    expires_in: number,
}

export interface ILogoutResponse {
    message: string;
}