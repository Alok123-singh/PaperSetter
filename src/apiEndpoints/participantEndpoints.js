const BASE_URL_DEV = 'http://localhost:8081/simlearn/score/api/v1';
const BASE_URL_PROD = 'https://production-domain'; // Replace with your actual production domain

const BASE_URL = process.env.NODE_ENV === 'production' ? BASE_URL_PROD : BASE_URL_DEV;

const API_BASE_URL = BASE_URL;

export const PARTICIPANT_ENDPOINTS = {
    FETCH_HISTORY: (username) => `${API_BASE_URL}/student/find/${username}`,
    SAVE_RESULT: `${API_BASE_URL}/save`,
    // ... other participant endpoints
};

