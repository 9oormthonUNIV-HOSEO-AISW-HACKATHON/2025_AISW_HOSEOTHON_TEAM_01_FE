import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', data);
        return response.data;
    },

    signup: async (data: SignupRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/sign-up', data);
        return response.data;
    },

    logout: async (): Promise<void> => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout API failed:', error);
        } finally {
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        }
    },
};
