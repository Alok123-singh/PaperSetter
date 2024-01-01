const BASE_URL_DEV = 'http://localhost:8082/simlearn/authentication/api/v1';
const BASE_URL_PROD = 'https://production-domain'; // Replace with your actual production domain

const BASE_URL = process.env.NODE_ENV === 'production' ? BASE_URL_PROD : BASE_URL_DEV;

const API_BASE_URL = BASE_URL;

export const AUTH_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login`,
    VALIDATE_OTP : (email,otp) => `${API_BASE_URL}/validate/${email}/${otp}`,
    SEND_OTP : (email) => `${API_BASE_URL}/send-otp/${email}`,

    SIGNUP: `${API_BASE_URL}/account`,
    CHECK_USERNAME : (username) => `${API_BASE_URL}/username/${username}`,
    CHECK_EMAIL : (email) => `${API_BASE_URL}/email/${email}`,
    RESET_PASSWORD : `${API_BASE_URL}/password`,

    GET_INSTRUCTORS_ACCOUNTS : `${API_BASE_URL}/account/all-instructors`,
    
    DELETE_ACCOUNT : (username) => `${API_BASE_URL}/account/${username}`,
    // ... other auth endpoints
};

