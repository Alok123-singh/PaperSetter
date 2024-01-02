import React, { useState } from 'react'
import { TablePagination, Loading1 } from '../../../components'
import { useLocation } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';


function StudentsInGroup() {
    const [loading, setLoading] = useState(false);
    const [errors,setErrors] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    // Retrieve values from query parameters
    const currentItem = JSON.parse(queryParams.get('students')) || [];
    console.log("Current Item",currentItem);
    console.log("Current Item students",currentItem.students);

    const students = currentItem.students;
    console.log("Students", students);

    const [displayFormat,setDisplayFormat] = useState('Table');
    const [hoveredDetails, setHoveredDetails] = useState(students);


    const [filteredItems1, setFilteredItems1] = useState(() => {
        return students === null ? [] : students;
    });

    const tableColumnsDescription = [
        { // Group Name
            header : 'Full Name',
            dataKey: 'fullName', 
            label: 'Full Name', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Name of the Student','fullName']);
                    },
                    onMouseLeave: (index,item) => {
                        setHoveredDetails([]);
                    }
                },
    
            },
            columnRender: (index, value) => {
                return (
                  <div
                    className={`lg:cursor-help w-full h-full flex flex-wrap justify-center items-center relative ${
                      hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'fullName'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'fullName' && (
                        <div
                          className={`hidden lg:flex w-[10rem] justify-center items-center text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
                        >
                          <div className='flex flex-col justify-center items-center'>
                            <FaInfoCircle size={16} className="text-blue-500" />
                            {hoveredDetails[1]}
                          </div>
                        </div>
                    )}
                    {value}
                  </div>
                );
            },
            dataRender: (index, value, currentItem) => {

                return  <div className='flex justify-center items-center'>
                            <div className='text-blue-700 font-bold '>
                                {value}
                            </div>
                        </div>
            } 
        },
        { // Students
            header : 'Email',
            dataKey: 'email', 
            label: 'Email', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Email of the student','email']);
                    },
                    onMouseLeave: (index,item) => {
                        setHoveredDetails([]);
                    }
                },
    
            },
            columnRender: (index, value) => {
                return (
                  <div
                    className={`lg:cursor-help w-full h-full flex flex-wrap justify-center items-center relative ${
                      hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'email'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'email' && (
                        <div
                          className={`hidden lg:flex w-[10rem] justify-center items-center text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
                        >
                          <div className='flex flex-col justify-center items-center'>
                            <FaInfoCircle size={16} className="text-blue-500" />
                            {hoveredDetails[1]}
                          </div>
                        </div>
                    )}
                    {value}
                  </div>
                );
            },
            dataRender: (index, value, currentItem) => {

                return  <div className='flex justify-center items-center'>
                            <div className='text-blue-700 font-bold '>
                                {value}
                            </div>
                        </div>
            } 
        },
        
    ];

    return loading === true ? (
        <Loading1 />
    ) : 
    (
        <div className='my-5 w-full h-auto flex flex-col justify-center items-center'>
            <p>
                {`Students Enrolled in group ${currentItem.groupName}`}
            </p>

            <div className='w-full lg:w-[50%] flex justify-center items-center'>
                {displayFormat === 'Table' && 
                    <TablePagination columnsDescription={tableColumnsDescription} items={filteredItems1} showRowNumbers={false} columnsDesign='cursor-default bg-[#a7b1c7] border-gray-500 text-slate-800 border' rowsDesign='hover:bg-gray-200 cursor-default border'  />
                }
            </div>
        </div>
    )
}

export default StudentsInGroup
