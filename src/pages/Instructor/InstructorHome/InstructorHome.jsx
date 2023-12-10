import React, { useState } from 'react'
import { Loading } from '../../../components/index'


function InstructorHome() {
    const [loading, setLoading] = useState(false);


    return loading ? (
        <Loading />
    ) : 
    (
        <div className='w-full h-[20rem] flex justify-center items-center'>
            Instructor Home
        </div>
    )
}

export default InstructorHome
