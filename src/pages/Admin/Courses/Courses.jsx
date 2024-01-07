import React, { useState } from 'react'
import { TablePagination, CardPagination } from '../../../components/index';
import { useSelector } from 'react-redux';
import { FaInfoCircle } from 'react-icons/fa';


function Courses() {

    const [displayFormat,setDisplayFormat] = useState('Table');
    const [hoveredDetails, setHoveredDetails] = useState([]);
    let animationTimeout;

    // Retrieve values from query parameters
    // const courseEntities = JSON.parse(queryParams.get('courseEntities')) || [];
    // const instructorName = queryParams.get('instructorName');

    const instructorName = useSelector(state => state.course.instructorName);
    const courseEntities = useSelector(state => state.course.courseEntities);


    const tableColumnsDescription = [
        { // Course Code
            header : 'Course Code',
            dataKey: 'courseCode', 
            label: 'Course Code', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Course code','courseCode']);
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
                      hoveredDetails[2] === 'courseCode'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'courseCode' && (
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
                return  <div className='w-full flex justify-center items-center text-center'>
                            {value}
                        </div>;
            },

        },
        { // Course Name
            header : 'Course Name',
            dataKey: 'courseName', 
            label: 'Course Code', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Name of the enrolled course.','courseName']);
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
                      hoveredDetails[2] === 'courseName'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'courseName' && (
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
                return  <div className='w-full flex justify-center items-center text-center'>
                            {value}
                        </div>;
            },
        },
        
    ];

    const cardColumnsDescription = [
        { // Course Code
            header : 'Course Code',
            dataKey: 'courseCode', 
            label: 'Course Code', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.courseCode,'Course code','courseCode']);
                    },
                    onMouseLeave: (index,value,currentItem) => {
                        setHoveredDetails([]);
                    }
                },
    
            },
            columnRender: (index,value,currentItem) => {
                return <div
                            // onMouseEnter={() => handleMouseEnter([index,currentItem.courseCode,'editSchedulecolumn'])}
                            onMouseLeave={handleMouseLeave} 
                            className={`lg:cursor-help w-full h-full flex flex-wrap text-start justify-start items-center relative `}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index && hoveredDetails[1] === currentItem.courseCode &&
                            hoveredDetails[3] === 'courseCode' && (
                                <div
                                className={`hidden lg:flex w-[10rem] text-center justify-center items-center  text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
                                >
                                    <div className='flex flex-col justify-center items-center'>
                                        <FaInfoCircle size={16} className="text-blue-500" />
                                        {hoveredDetails[2]}
                                    </div>
                                </div>
                            )}
                            {value}
                            
                        </div>;
            },
            dataRender: (index, value, currentItem) => {

                return  <div
                            className={` w-full h-full font-bold flex text-slate-500 flex-wrap justify-end items-center`}
                        >
                            {value}
                            
                        </div>;
            } 
        },
        { // Course Name 
            header : 'Course Name',
            dataKey: 'courseName', 
            label: 'Course Name', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.courseCode,'Name of the enrolled course.','courseName']);
                    },
                    onMouseLeave: (index,value,currentItem) => {
                        setHoveredDetails([]);
                    }
                },
    
            },
            columnRender: (index,value,currentItem) => {
                return <div
                            // onMouseEnter={() => handleMouseEnter([index,currentItem.courseCode,'editSchedulecolumn'])}
                            onMouseLeave={handleMouseLeave} 
                            className={`g:cursor-help w-full h-full flex flex-wrap text-start justify-start items-center relative `}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index && hoveredDetails[1] === currentItem.courseCode &&
                            hoveredDetails[3] === 'courseName' && (
                                <div
                                className={`hidden lg:flex w-[10rem] text-center justify-center items-center  text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
                                >
                                <div className='flex flex-col justify-center items-center'>
                                    <FaInfoCircle size={16} className="text-blue-500" />
                                    {hoveredDetails[2]}
                                </div>
                                </div>
                            )}
                            {value}
                            
                        </div>;
            },
            dataRender: (index, value, currentItem) => {
                return  <div
                            className={` w-full h-full font-bold flex text-slate-500 flex-wrap justify-end items-center`}
                        >
                            {value}
                            
                        </div>;
            }
        },
    ];

    const handleMouseEnter = (details) => {
        clearTimeout(animationTimeout);

        animationTimeout = setTimeout(() => {
            setHoveredDetails(details);
        }, 400);
        // setHoveredDetails(details);
    };
    
    const handleMouseLeave = () => {
        clearTimeout(animationTimeout);

        setHoveredDetails([]);
    };

    return (
        <div className='w-full py-10 flex flex-col justify-center items-center'>
            <p className='w-full text-lg flex justify-center items-center'>
                <strong>Instructor Name</strong> : {instructorName}
            </p>

            {displayFormat === 'Table' && 
                <TablePagination columnsDescription={tableColumnsDescription} items={courseEntities} showRowNumbers={true} roundedDesign='rounded-lg' columnsDesign='cursor-default' rowsDesign='hover:bg-gray-200 cursor-default' widthDesign='sm:w-[99%] md:w-[90%] lg:w-[70%]' enableExcelDownload={true} filename={`${instructorName}_course_details`} excludedFields={["_id"]} />
            }

            {displayFormat === 'Card' && 
                <CardPagination columnsDescription={cardColumnsDescription} items={courseEntities} showRowNumbers={true} columnsDesign='' rowsDesign='' enableExcelDownload={true} filename={`${instructorName}_course_details`} excludedFields={["_id"]}  />
            }

            {/* Select display format as Table or Card */}
            <div className='w-full mb-8 flex justify-center items-center'>
                <p className='text-green-600 font-lg font-bold cursor-default'>
                    Select display option :
                </p>
                
                <select
                    value={displayFormat}
                    onChange={ event => setDisplayFormat(event.target.value) }
                    className="flex justify-center items-center appearance-none bg-white border border-gray-400 text-gray-700 ml-6 py-2 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
                >
                    <option value="Table">Table</option>
                    <option value="Card">Card</option>
                </select>
            </div>

        </div>
    )
}

export default Courses
