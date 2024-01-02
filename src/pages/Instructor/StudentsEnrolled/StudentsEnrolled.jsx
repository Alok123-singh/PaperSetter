import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TablePagination, Loading1 } from '../../../components'
import { FaInfoCircle } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';

function StudentsEnrolled() {

    const [loading, setLoading] = useState(false);
    const [errors,setErrors] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    const courseEntity = useSelector(state => state.course.courseEntity);
    console.log("Course Entity", courseEntity);

    const [filteredItems1, setFilteredItems1] = useState(() => {
        let items = [];
        courseEntity.groupFiveEntityList.map((group) => {
            items.push({groupName : group.groupCode, students : group.students});
        });

        return (items);
    });

    const [filteredItems2, setFilteredItems2] = useState(() => {
        let items = [];
        courseEntity.groupFourEntityList.map((group) => {
            items.push({groupName : group.groupCode, students : group.students});
        });

        return (items);
    });

    const [displayFormat,setDisplayFormat] = useState('Table');
    const [hoveredDetails, setHoveredDetails] = useState([]);

    const formatToCustomString = (dateTimeString) => {
        // Try to parse the input string into a Date object
        const dateObject = new Date(dateTimeString);
      
        // Check if the parsing was successful and it's a valid Date object
        if (!isNaN(dateObject.getTime())) {
          // If it's a valid Date object, return the custom formatted string
          const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          };
          return dateObject.toLocaleString('en-US', options);
        } else {
          // If parsing fails, return the original input (or handle it as needed)
          return dateTimeString;
        }
    }

    const convertIsoStringToObject = (isoString) => {
        // Create a new Date object from the ISO string
        const dateObject = new Date(isoString);
      
        // Check if the dateObject is valid
        if (isNaN(dateObject.getTime())) {
          console.error('Invalid ISO format');
          return null;
        }
      
        // Use toISOString() to get the ISO string representation
        const formattedString = dateObject.toISOString();
      
        // Extract the date and time part from the ISO string
        const desiredFormat = formattedString.slice(0, 19);
      
        // Create an array with the desired format
        const resultArray = [dateObject];
      
        return resultArray;
    }

    const tableColumnsDescription = [
        { // Group Name
            header : 'Group Name',
            dataKey: 'groupName', 
            label: 'Group Name', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Name of the Group','groupName']);
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
                      hoveredDetails[2] === 'groupName'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'groupName' && (
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
                    <MdDescription size={17} className=' ml-1' />
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
            header : 'Students',
            dataKey: 'students', 
            label: 'Students', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Students in the group','students']);
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
                      hoveredDetails[2] === 'students'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'students' && (
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

    return loading ? (
        <Loading1 />
    ) : 
    (
        <div className='my-5 w-full h-auto flex flex-col justify-center items-center'>
            <div className='w-full flex justify-center items-center mb-8'>
                <p className='font-bold text-xl underline-offset-2'>
                    {`Students Enrolled`}
                </p>
            </div>

            {/* Heading section */}
            <div className='w-full flex flex-col sm:flex-row justify-evenly items-center'>

                {/* Course Name section */}
                <div className='flex flex-col justify-center items-center space-y-1'>
                    <p className='font-bold text-lg'>
                        Course Name
                    </p>

                    <p>
                        {courseEntity.courseName}
                    </p>
                </div>

                {/* Start Time section */}
                <div className='mt-4 sm:mt-0 flex flex-col justify-center items-center space-y-1'>
                    <p className='font-bold text-lg'>
                        Start Time
                    </p>

                    <p>
                        {formatToCustomString(convertIsoStringToObject(courseEntity.startTime))}
                    </p>
                </div>

                {/* End Time section */}
                <div className='mt-4 sm:mt-0 flex flex-col justify-center items-center space-y-1'>
                    <p className='font-bold text-lg'>
                        End Time
                    </p>

                    <p>
                        {formatToCustomString(convertIsoStringToObject(courseEntity.endTime))}
                    </p>
                </div>

            </div>

            {/* Groups display section */}
            <div className='w-full flex flex-col md:flex-row justify-evenly items-center'>
                <div className='w-full sm:w-1/2 lg:w-1/3'>
                    
                    {displayFormat === 'Table' && 
                        <TablePagination columnsDescription={tableColumnsDescription} items={filteredItems1} title='Groups of Five Students' showRowNumbers={false} columnsDesign='cursor-default bg-[#a7b1c7] border-gray-500 text-slate-800 border' rowsDesign='hover:bg-gray-200 cursor-default border'  />
                    }
                </div>
                <div className='w-full sm:w-1/2 lg:w-1/3'>
                    {displayFormat === 'Table' && 
                        <TablePagination columnsDescription={tableColumnsDescription} items={filteredItems2} title='Groups of Four Students' showRowNumbers={false} columnsDesign='cursor-default bg-[#a7b1c7] border-gray-500 text-slate-800 border' rowsDesign='hover:bg-gray-200 cursor-default border'  />
                    }
                </div>
            </div>
        </div>
    )
};

export default StudentsEnrolled;
