import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ThemeButton, Loading } from '../../../components/index';

function MyAccount() {

    const username = useSelector(state => state.auth.username);
    const [loading, setLoading] = useState(false);

    return loading ? (
        <Loading />
    ) : 
    (
        <div
        className='h-[18rem] w-full flex flex-col flex-wrap justify-center items-center dark:bg-slate-600 dark:text-gray-300'
        >
            {/* <div className='w-full flex justify-center pb-8'>
                <ThemeButton />
            </div> */}

            <div className='w-auto flex flex-col font-semibold space-y-5 items-center'>

                <div className='w-full flex'>
                    <p className='w-[5rem] sm:w-[7rem] py-2'> Username </p>
                    <p className='w-[1.6rem] sm:w-[2.6rem] py-2'> : </p>
                    <input contentEditable={false} onChange={() => {}} value={`${username}`} className='outline-none w-[12rem] sm:w-[15rem] p-2 bg-gray-200 text-center text-blue-600 rounded-md' />
                </div>

                <div className='w-full flex'>
                    <p className='w-[5rem] sm:w-[7rem] py-2'> Full Name </p>
                    <p className='w-[1.6rem] sm:w-[2.6rem] py-2'> : </p>
                    <input contentEditable={false} onChange={() => {}} value={'Alok Singh Bais'} className='outline-none w-[12rem] sm:w-[15rem] p-2 bg-gray-200 text-center text-blue-600 rounded-md' />
                </div>

                <div className='w-full flex'>
                    <p className='w-[5rem] sm:w-[7rem] py-2'> Email </p>
                    <p className='w-[1.6rem] sm:w-[2.6rem] py-2'> : </p>
                    <input contentEditable={false} onChange={() => {}} value={'aloksinghbais02@gmail.com'} className='outline-none w-[12rem] sm:w-[15rem] p-2 bg-gray-200 text-center text-blue-600 rounded-md' />
                </div>

            </div>

        </div>
    )
}

export default MyAccount