import { deleteInstructorAccount, fetchAllInstructors, fetchAllInstructorsAccounts, fetchAllAvailaibleGames, createNewCourse, createNewGame, updatePassword } from './adminFunctionalities';
import { fetchAllCourses } from './instructorFunctionalities'
import { fetchHistory, saveResult } from './gameFunctionalities'
import { login, resetPassword, checkUsernameAvailability, checkEmailAvailability, sendOTP, verifyOTP, createAccount } from './authFunctionalities'
import { enrollInGame, joinGame, fetchEnrolledGames } from './participantFunctionalities'

export {

    // admin functionalities
    deleteInstructorAccount,
    fetchAllInstructors,
    fetchAllInstructorsAccounts,
    fetchAllAvailaibleGames,
    createNewCourse,
    createNewGame,
    updatePassword,

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
    
    // participant functionalities
    enrollInGame,
    joinGame,
    fetchEnrolledGames,

};