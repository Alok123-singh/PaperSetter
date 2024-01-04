const BASE_URL_DEV = 'http://localhost:8083/simlearn/instructormanager/api/v1';
const BASE_URL_PROD = 'https://production-domain'; // Replace with your actual production domain

const BASE_URL = process.env.NODE_ENV === 'production' ? BASE_URL_PROD : BASE_URL_DEV;

const API_BASE_URL = BASE_URL;

export const INSTRUCTOR_ENDPOINTS = {
    GET_COURSES : (username) => `${API_BASE_URL}/courses/${username}`,
    DELETE_INSTRUCTOR : (username) => `${API_BASE_URL}/instructor/${username}`,
    ENROLL_GAME : (courseCode) => `${API_BASE_URL}/course/${courseCode}`,
    UPDATE_ARCHIVE : (archive,email,courseCode) => `${API_BASE_URL}/course/archive/${archive}/${email}/${courseCode}`,
    UPDATE_ATTEMPTS : (attempts,email,courseCode) => `${API_BASE_URL}/course/attempts/${attempts}/${email}/${courseCode}`,
    UPDATE_SCHEDULE : (startTime,endTime,email,courseCode) => `${API_BASE_URL}/course/schedule/${startTime}/${endTime}/${email}/${courseCode}`,


    // ... other instructor endpoints
};

