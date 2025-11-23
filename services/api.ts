import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:8080/api/v1'; // Android Emulator localhost. Change to your API URL.

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    async (config) => {
        // Skip adding token for login and signup endpoints
        const skipAuthEndpoints = ['/auth/login', '/auth/sign-up'];
        const isSkipAuth = skipAuthEndpoints.some(endpoint => config.url?.includes(endpoint));

        if (!isSkipAuth) {
            const token = await AsyncStorage.getItem('accessToken');
            console.log('[API] Interceptor - Token:', token);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log('[API] Setting Authorization header');
            } else {
                console.log('[API] No token found in AsyncStorage');
            }
        } else {
            console.log('[API] Skipping Authorization header for:', config.url);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                const response = await axios.post(`${BASE_URL}/auth/access/reissue`, {
                    refreshToken: refreshToken,
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                await AsyncStorage.setItem('accessToken', accessToken);
                if (newRefreshToken) {
                    await AsyncStorage.setItem('refreshToken', newRefreshToken);
                }

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed - logout user
                await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
                // You might want to navigate to login screen here or handle it in the UI
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
