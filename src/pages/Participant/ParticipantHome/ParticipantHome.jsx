import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Loading1, Button1, Card1, OverlayForm2 } from '../../../components/index'
import { enrollInGame } from '../../../apiFunctionalities'
import { useDispatch } from 'react-redux';
import { setCourseEntity } from '../../../store/courseSlice'


function ParticipantHome() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [showEnrollGameForm,setShowEnrollGameForm] = useState(null);

    const enrollGameSubmit = async (data) => {
        console.log("Enroll game form Data :-",data);

        enrollInGame(data,navigate,dispatch,setCourseEntity,'/enroll',setLoading,setErrors);
    }

    const enrollGameFormData = {
        inputs : [
            // Define your form inputs here
            
            { label: 'Course Code', type: 'text', placeholder: '', name: 'courseCode', required: true,  },
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            { type: 'submit', text: 'Enroll', style: 'w-[6rem] rounded-sm' },
            // Add more button configurations as needed
        ],
        title : 'Enroll Game',
        desc : "You can enroll in a game",
        formHeight : "",
        formWidth : "", // total width of the form
        formDesign : {
            start: 'justify-center', // define whether the form should appear in the start 
            cols: 2, // define how many fields should be in 1 row
        },
        errors : errors,
    }

    const overlayForm2 = (formData,setShowForm,onSubmit) => { 

        // console.log("Clicked from", onSubmit);

        return <OverlayForm2
                    onClose={() => {
                        setShowForm(null);
                        // setShowAddCourse(false);
                    }}
                    onSubmit={onSubmit}
                    formData={formData}
                />
    };

    return loading ? (
        <Loading1 />
    ) : 
    (
        <div className = 'py-10 flex justify-evenly items-center dark:bg-gray-40  flex-wrap'>

            {/* Error section */}
            {(errors && errors.length > 0) && <div className='flex flex-col'>
                {
                    errors.map((err,index) => 
                    (<p key={index} className="text-red-600 mb-2 text-center">{err}</p>))
                }
            </div>}
            
            <div className='w-[90%] flex flex-col justify-end items-end'>
                
                {/* Create new game button section */}
                <div className='flex flex-col justify-center items-center text-xl'>
                    {/* <p className='mb-1 text-center text-sm font-bold md:text-md'> Enroll Game </p> */}

                    <Button1
                    className="w-[12rem] h-[2rem] rounded-sm flex justify-center hover:bg-blue-400  items-center"
                    onClick={() => {

                        if(showEnrollGameForm === null)
                            setShowEnrollGameForm(true);
                    }}
                    >
                        Join a New Game
                    </Button1>
                    
                </div>

                {showEnrollGameForm && ( 
                    overlayForm2(enrollGameFormData,setShowEnrollGameForm,enrollGameSubmit)
                
                )}

            </div>

            {/* <Card1 imageSource='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEXB-pdC3jlinrQ5Y9rLgR6F_gtPgk1W0ejT-laLKGbEDsllFqvFw39r0mExvLPHnK-7w&usqp=CAU' link='/inventory-management' title='Inventory Management' />

            <Card1 imageSource='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEXB-pdC3jlinrQ5Y9rLgR6F_gtPgk1W0ejT-laLKGbEDsllFqvFw39r0mExvLPHnK-7w&usqp=CAU' link='/seating-allocation' title='Seating Allocation' /> */}
        </div>
    )
}

export default ParticipantHome
