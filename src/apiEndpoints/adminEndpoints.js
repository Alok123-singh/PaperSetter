const BASE_URL_DEV = 'http://localhost:8083/simlearn/instructormanager/api/v1';
const BASE_URL_PROD = 'https://production-domain'; // Replace with your actual production domain

const BASE_URL = process.env.NODE_ENV === 'production' ? BASE_URL_PROD : BASE_URL_DEV;

const API_BASE_URL = BASE_URL;

export const ADMIN_ENDPOINTS = {
    CREATE_COURSE : `${API_BASE_URL}/course`,
    GET_INSTRUCTORS : `${API_BASE_URL}/all-instructors`,
    ENROLL_COURSE : (courseCode,groupName) => `${API_BASE_URL}/join/${courseCode}/${groupName}`,
    

    // ... other admin endpoints
};

