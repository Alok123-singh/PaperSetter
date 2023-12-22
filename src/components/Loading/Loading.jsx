import React from 'react'
import { MdAutorenew } from 'react-icons/md';



function Loading() {
    return (
        <div className='dark:bg-gray-400 cursor-wait w-full flex justify-center items-center h-screen'>
            <div className=''>
                <MdAutorenew size={80} color='#000' className='animate-spin' />
            </div>
        </div>
    )
}

export default Loading
