import React from 'react'
import { useLocation } from 'react-router-dom';
import { TablePagination } from '../../../components/index';


function Courses() {

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    // Retrieve values from query parameters
    const courseList = JSON.parse(queryParams.get('courseList')) || [];
    const instructorName = queryParams.get('instructorName');


    const columnsDescription = [
        { // Course Code
            header : 'Course Code',
            dataKey: 'courseCode', 
            label: 'Course Code', 
            columnRender: (index,value) => {
                return  <div className='w-full flex justify-center items-center text-center'>
                            {value}
                        </div>;
            },
            dataRender: (index, value, currentItem) => {
                return  <div className='w-full flex justify-center items-center text-center'>
                            {value}
                        </div>;
            },

        },
        { // Course Name
            header : 'Course Name',
            dataKey: 'courseName', 
            label: 'Course Code', 
            columnRender: (index,value) => {
                return  <div className='w-full flex justify-center items-center text-center'>
                            {value}
                        </div>;
            },
            dataRender: (index, value, currentItem) => {
                return  <div className='w-full flex justify-center items-center text-center'>
                            {value}
                        </div>;
            },
        },
        
    ];

    return (
        <div className='w-full py-10 flex flex-col justify-center items-center'>
            <p className='w-full flex justify-center items-center'>
                <strong>Instructor Name</strong> : {instructorName}
            </p>

            <TablePagination columns={columnsDescription} items={courseList} showRowNumbers={true} roundedDesign='rounded-lg' columnsDesign='cursor-default' rowsDesign='hover:bg-gray-200 cursor-default' />
        </div>
    )
}

export default Courses
