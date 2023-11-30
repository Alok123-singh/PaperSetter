import React from 'react'
import { useSelector } from 'react-redux';
import { AdminHome } from '../../pages/Admin/index'
import { InstructorHome } from '../../pages/Instructor/index'
import { ParticipantHome } from '../../pages/Participant/index'
import { ROLES } from '../index'

function Home() {

    const role = useSelector(state => state.auth.role);

    const getHomeElement = () => {
        
        if(role === ROLES.ADMIN) return <AdminHome />;
        else if(role === ROLES.INSTRUCTOR) return <InstructorHome />;
        return <ParticipantHome />
    }

    return (
        <div className='w-full h-auto'>
            {getHomeElement(role)}
        </div>
    )
}

export default Home
