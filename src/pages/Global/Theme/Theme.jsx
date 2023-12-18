import React from 'react'
import { ThemeButton } from '../../../components/index'

function Theme() {
    return (
        <div
        className='h-[18rem] w-full flex flex-col flex-wrap justify-center items-center dark:bg-slate-600 dark:text-gray-300'
        >
            <div className='w-full flex justify-center'>
                <ThemeButton />
            </div>

        </div>
    )
}

export default Theme
