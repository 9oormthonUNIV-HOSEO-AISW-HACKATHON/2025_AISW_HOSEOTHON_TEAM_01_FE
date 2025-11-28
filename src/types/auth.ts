// Authentication related types
export interface LoginRequest {
    loginId: string;
    password: string;
}

export interface SignupRequest {
    loginId: string;
    password: string;
    nickname: string;
    birth: string; // yyyy-MM-dd
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}
