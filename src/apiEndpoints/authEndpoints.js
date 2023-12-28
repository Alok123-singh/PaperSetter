const BASE_URL_DEV = 'http://localhost:8082/simlearn/authentication/api/v1';
const BASE_URL_PROD = 'https://production-domain'; // Replace with your actual production domain

const BASE_URL = process.env.NODE_ENV === 'production' ? BASE_URL_PROD : BASE_URL_DEV;

const API_BASE_URL = BASE_URL;

export const AUTH_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login`,
    SIGNUP: `${API_BASE_URL}/account`,
    CHECK_USERNAME : (username) => `${API_BASE_URL}/username/${username}`,
    RESET_PASSWORD : `${API_BASE_URL}/password`
    // ... other auth endpoints
};

