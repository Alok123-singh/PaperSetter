import React from 'react'
import { useLocation } from 'react-router-dom';
import { Pagination } from '../../../components/index';


function Courses() {

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    // Retrieve values from query parameters
    const courseList = JSON.parse(queryParams.get('courseList')) || [];
    const instructorName = queryParams.get('instructorName');


    const columnsDescription = [
        {
            header : 'Course Code',
            dataKey: 'courseCode', 
            label: 'Course Code', 
            columnRender: (index,item) => {
                return  <div className='w-full flex justify-center items-center text-center'>
                            {item}
                        </div>;
            },
            dataRender: (index,item) => {
                return  <div className='w-full flex justify-center items-center text-center'>
                            {item}
                        </div>;
            },

        },
        {
            header : 'Course Name',
            dataKey: 'courseName', 
            label: 'Course Code', 
            columnRender: (index,item) => {
                return  <div className='w-full flex justify-center items-center text-center'>
                            {item}
                        </div>;
            },
            dataRender: (index,item) => {
                return  <div className='w-full flex justify-center items-center text-center'>
                            {item}
                        </div>;
            },
        },
        
    ];

    return (
        <div className='w-full py-10 flex flex-col justify-center items-center'>
            <p className='w-full flex justify-center items-center'>
                <strong>Instructor Name</strong> : {instructorName}
            </p>

            <Pagination columns={columnsDescription} items={courseList} />
        </div>
    )
}

export default Courses
