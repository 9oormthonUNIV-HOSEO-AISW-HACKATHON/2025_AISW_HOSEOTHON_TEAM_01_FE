import api from './api';
import type { LoginRequest, SignupRequest, AuthResponse } from '../types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
