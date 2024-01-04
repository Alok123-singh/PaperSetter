import React from 'react'
import { ThemeButton } from '../../../components';

function Settings() {
    return (
        <div className='w-full my-[6.4rem] flex flex-col justify-center items-center'>
            <div className='w-1/2 flex justify-center items-center'>
                <p className='text-lg font-bold flex justify-center items-center'>
                    Theme
                </p>
                <p className='font-bold mx-2 flex justify-center items-center'>
                    :
                </p>
                <p className='flex justify-center items-center'>
                    <ThemeButton />
                </p>
            </div>
        </div>
    )
};

export default Settings;