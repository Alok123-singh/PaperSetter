const BASE_URL_DEV = '';
const BASE_URL_PROD = 'https://your-production-domain'; // Replace with your actual production domain

const BASE_URL = process.env.NODE_ENV === 'production' ? BASE_URL_PROD : BASE_URL_DEV;

const API_BASE_URL = BASE_URL;

export const ADMIN_ENDPOINTS = {


    // SIGNUP: `${API_BASE_URL}/account`,
    // CHECK_USERNAME : (username) => `${API_BASE_URL}/username/${username}`,
    // ... other admin endpoints
};

