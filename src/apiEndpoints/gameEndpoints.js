const BASE_URL_DEV = 'http://localhost:8081/simlearn/gamemanager/api/v1';
const BASE_URL_PROD = 'https://production-domain'; // Replace with your actual production domain

const BASE_URL = process.env.NODE_ENV === 'production' ? BASE_URL_PROD : BASE_URL_DEV;

const API_BASE_URL = BASE_URL;

export const GAME_ENDPOINTS = {
    FETCH_HISTORY: (username) => `${API_BASE_URL}/score/find/${username}`,
    FETCH_HISTORY_BASED_ON_COURSE_CODE : (courseCode) => `${API_BASE_URL}/score/course/${courseCode}`,
    SAVE_RESULT: `${API_BASE_URL}/score`,
    CREATE_NEW_GAME : `${API_BASE_URL}/game`,
    FETCH_ALL_GAMES : `${API_BASE_URL}/game`,
    

    // ... other game endpoints
};

