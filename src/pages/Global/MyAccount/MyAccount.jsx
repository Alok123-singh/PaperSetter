import React, {  } from 'react'
import { useSelector } from 'react-redux';
import { ThemeButton } from '../../../components/index';

function MyAccount() {

    const userName = useSelector(state => state.auth.username);

    return (
        <div
        className='h-[18rem] w-full flex flex-col flex-wrap justify-center items-center dark:bg-slate-600 dark:text-gray-300'
        >
            <div className='w-full flex justify-center pb-8'>
                <ThemeButton />
            </div>

            <div className='w-auto flex flex-col font-semibold space-y-5 items-center'>

                <div className='w-full flex'>
                    <p className='w-[7rem] py-2'> Username </p>
                    <p className='w-[2.6rem] py-2'> : </p>
                    <p className='w-[15rem] p-2 bg-gray-200 text-center text-blue-600 rounded-xl'> {userName} </p>
                </div>

                <div className='w-full flex'>
                    <p className='w-[7rem] py-2'> Full Name </p>
                    <p className='w-[2.6rem] py-2'> : </p>
                    <p className='w-[15rem] p-2 bg-gray-200 text-center text-blue-600 rounded-xl'> Alok Singh Bais </p>
                </div>

                <div className='w-full flex'>
                    <p className='w-[7rem] py-2'> Email </p>
                    <p className='w-[2.6rem] py-2'> : </p>
                    <p className='w-[15rem] p-2 bg-gray-200 text-center text-blue-600 rounded-xl'> aloksinghbais02@gmail.com </p>
                </div>

            </div>

        </div>
    )
}

export default MyAccount