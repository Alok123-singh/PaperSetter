import React from 'react';
import { FaCircleNotch } from 'react-icons/fa';

function Loading2() {


    return (
        <div className='fixed inset-0 cursor-wait z-50 flex items-center justify-center  bg-opacity-50'>
            <div className='flex flex-col justify-center items-center bg-slate-700 opacity-95 py-[2rem] px-[3rem] rounded-lg'>
                <FaCircleNotch size={30} className='animate-spin text-gray-400' />
                <p className='text-white text-lg'>
                    Verifying Account...
                </p>
            </div>
        </div>
    );
}

export default Loading2;
