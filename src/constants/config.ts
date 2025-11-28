// API Configuration
export const API_CONFIG = {
    BASE_URL: 'http://10.0.2.2:8080/api/v1', // Android Emulator localhost
    TIMEOUT: 10000,
};

// You can override BASE_URL with environment variable if needed
// For production, you might want to use a different URL
// export const API_BASE_URL = process.env.API_BASE_URL || API_CONFIG.BASE_URL;

export const APP_CONFIG = {
    APP_NAME: 'NEWNEW',
    VERSION: '1.0.0',
};
