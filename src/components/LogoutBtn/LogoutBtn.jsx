import React from 'react'
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '../../store/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch();
    
    const logoutHandler = () => {
        console.log("logout");
        dispatch(setLoginStatus(false));
    };

    return (
        <div className=''>
            <button 
            type='button'
            className='mt-[0rem]  sm:pt-[7px] mr-3  p-1 sm:my-[0.4rem] h-[2.3rem] flex justify-center items-center text-center duration-200 hover:bg-slate-200 dark:hover:bg-slate-600  rounded-lg '
            onClick={logoutHandler}
            >
                Logout
            </button>
        </div>
    )
}

export default LogoutBtn;