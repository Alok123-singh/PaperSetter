import { deleteInstructorAccount, fetchAllInstructors, fetchAllInstructorsAccounts, fetchAllAvailaibleGames, createNewCourse } from './adminFunctionalities';
import { fetchAllCourses } from './instructorFunctionalities'
import { fetchHistory, saveResult } from './gameFunctionalities'
import { login, resetPassword, checkUsernameAvailability, checkEmailAvailability, sendOTP, verifyOTP, createAccount } from './authFunctionalities'

export {

    // admin functionalities
    deleteInstructorAccount,
    fetchAllInstructors,
    fetchAllInstructorsAccounts,
    fetchAllAvailaibleGames,
    createNewCourse,

    // instructor functionalities
    fetchAllCourses,

    // game functionalities
    fetchHistory,
    saveResult,

    // auth functionalities
    login,
    resetPassword,
    checkUsernameAvailability,
    checkEmailAvailability,
    sendOTP,
    verifyOTP,
    createAccount,
    

};