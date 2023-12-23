import React, { useState } from 'react'
import { Loading, Search, TablePagination, CardPagination, OverlayForm1 } from '../../../components/index'
import { FaPencilAlt, FaInfoCircle, FaBell,  } from 'react-icons/fa';
import { IoMdOpen } from 'react-icons/io';


function InstructorHome() {
    const [loading, setLoading] = useState(false);
    
    const [hoveredDetails, setHoveredDetails] = useState([]);

    const [showFormIndex1, setShowFormIndex1] = useState(null);
    const [showFormIndex2, setShowFormIndex2] = useState(null);
    const [showFormIndex3, setShowFormIndex3] = useState(null);

    const [filteredItems, setFilteredItems] = useState([]);

    let animationTimeout;

    const editAttempts = (data) => {
        setLoading(true);

        // console.log('Edited number of attempts',data);

        let newItems = [...items];

        newItems = newItems.map((item) => item.courseCode === data['courseCode'] ? {...item, studentAttempts : data['studentAttempts']} : item);

        setItems(newItems);

        setLoading(false);
    };

    const editArchive = (data) => {
        setLoading(true);

        // console.log('Edited number of attempts',data);

        let newItems = [...items];

        newItems = newItems.map((item) => item.courseCode === data['courseCode'] ? {...item, archive : data['archive']} : item);

        setItems(newItems);

        setLoading(false);
    };

    const editSchedule = (data) => {
        setLoading(true);

        // console.log('Schedule edited');

        let newItems = [...items];

        newItems = newItems.map((item) => item.courseCode === data['courseCode'] ? {...item, startTime : data['startTime'], endTime : data['endTime']} : item);

        setItems(newItems);

        setLoading(false);
    };

    const editAttemptsFormData = {
        inputs : [
            // Define your form inputs here
            { label: 'Course Code', type: 'text', placeholder: 'Course Code', name: 'courseCode', required: true, defaultValue: 'courseCode', },
            { label: 'No of Attempts', type: 'text', placeholder: 'Student Course Attempts', name: 'studentAttempts', required: true, defaultValue: 'studentAttempts', },
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            // { type: 'text', text: 'Prev', style: 'w-full' },
            { type: 'submit', text: 'Update', style: 'w-[6rem] bg-green-500 rounded-md hover:bg-white hover:border-2  hover:text-black' },
            // Add more button configurations as needed
        ],
        title : "Update",
        desc : "You can update with respective details",
        formHeight : "md:h-[55%]",
        // formWidth : "md:h-[90%]",
    }

    const editArchiveFormData = {
        inputs : [
            // Define your form inputs here
            { label: 'Course Code', type: 'text', placeholder: 'Course Code', name: 'courseCode', required: true, defaultValue: 'courseCode', },
            { label: 'Archive', type: 'select', options : ['No','Yes'], placeholder: 'Archive', name: 'archive', required: true, defaultValue: 'archive', },
            // { label: 'Checkbox', type: 'checkbox', options : ['Yes','No'], placeholder: 'Checkbox', name: 'bad', required: true, defaultValue: 'bad' },
            // { label: 'Radio', type: 'radio', options : ['Yes','No'], placeholder: 'Radio', name: 'bad', required: true, defaultValue: 'bad' },
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            // { type: 'text', text: 'Prev', style: 'w-full' },
            { type: 'submit', text: 'Update', style: 'w-[6rem] bg-green-500 rounded-md hover:bg-white hover:border-2  hover:text-black' },
            // Add more button configurations as needed
        ],
        title : "Update",
        desc : "You can update with respective details",
        formHeight : "md:h-[55%]",
        // formWidth : "md:h-[90%]",
    }

    const editScheduleFormData = {
        inputs : [
            // Define your form inputs here
            { label: 'Course Code', type: 'text', placeholder: 'Course Code', name: 'courseCode', required: true, defaultValue: 'courseCode', },
            { label: 'Start Time', type: 'dateAndTime2', placeholder: 'Start Time', name: 'startTime', required: true, defaultValue: 'startTime',  },
            { label: 'End Time', type: 'dateAndTime2', placeholder: 'End Time', name: 'endTime', required: true, defaultValue: 'endTime', },
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            // { type: 'text', text: 'Prev', style: 'w-full' },
            { type: 'submit', text: 'Update', style: 'w-[6rem] bg-green-500 rounded-md hover:bg-white hover:border-2  hover:text-black' },
            // Add more button configurations as needed
        ],
        title : "Time Schedule",
        desc : "You can update with respective details",
        formHeight : "",
        formWidth : "md:h-[90%]",
    }

    const form = (parentData,formData,setShowFormIndex,onSubmit) => { 

        // console.log("Clicked from", parentData);

        return <OverlayForm1
                    onClose={() => {
                        setShowFormIndex(null);
                    }}
                    onSubmit={onSubmit}
                    formData={formData}
                    parentData={parentData}
                />
    };

    function formatToCustomString(dateTimeString) {
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

    const [items,setItems] = useState([
        {
            courseCode : 'iSldaR173718',

            name : 'Logistics Practice',
            
            studentRegistered : '0',

            studentAttempts : '3',

            archive : 'No',

            licenseLeft : '15',

            startTime : new Date('2024-01-26T13:00:00'),

            endTime : new Date('2024-01-26T14:00:00'),

            // startTime : parseDateAndTime('26/01/2024 12:00 AM'),

            // endTime : parseDateAndTime('26/01/2024 02:00 PM'),
        },
        {
            courseCode : 'FIHfQ6165109',

            name : 'Nego Test',
            
            studentRegistered : '1',

            studentAttempts : '5',

            archive : 'No',

            licenseLeft : '2',

            startTime : new Date('2024-01-28T16:00:00'),

            endTime : new Date('2024-01-28T18:00:00'),

            // startTime : parseDateAndTime('28/01/2024 04:00 AM'),

            // endTime : parseDateAndTime('28/01/2024 06:00 PM'),
        },
        {
            courseCode : 'ZIFKQ6162409',

            name : 'Inventory Management',
            
            studentRegistered : '7',

            studentAttempts : '5',

            archive : 'No',

            licenseLeft : '2',

            startTime : new Date('2024-01-20T14:00:00'),

            endTime : new Date('2024-01-20T16:00:00'),

            // startTime : parseDateAndTime('28/01/2024 04:00 AM'),

            // endTime : parseDateAndTime('28/01/2024 06:00 PM'),
        },
        {
            courseCode : 'iSldaR173718',

            name : 'Logistics Practice2',
            
            studentRegistered : '0',

            studentAttempts : '3',

            archive : 'No',

            licenseLeft : '15',

            startTime : new Date('2024-01-24T13:00:00'),

            endTime : new Date('2024-01-30T14:00:00'),

            // startTime : parseDateAndTime('26/01/2024 12:00 AM'),

            // endTime : parseDateAndTime('26/01/2024 02:00 PM'),
        },
        {
            courseCode : 'iSldaR173718',

            name : 'Logistics Practice3',
            
            studentRegistered : '0',

            studentAttempts : '3',

            archive : 'No',

            licenseLeft : '15',

            startTime : new Date('2024-01-21T13:00:00'),

            endTime : new Date('2024-01-21T14:00:00'),

            // startTime : parseDateAndTime('26/01/2024 12:00 AM'),

            // endTime : parseDateAndTime('26/01/2024 02:00 PM'),
        },
        {
            courseCode : 'iSldaR173718',

            name : 'Logistics Practice4',
            
            studentRegistered : '0',

            studentAttempts : '3',

            archive : 'No',

            licenseLeft : '15',

            startTime : new Date('2024-01-22T13:00:00'),

            endTime : new Date('2024-01-22T14:00:00'),

            // startTime : parseDateAndTime('26/01/2024 12:00 AM'),

            // endTime : parseDateAndTime('26/01/2024 02:00 PM'),
        },
    ]);

    const tableColumnsDescription = [
        { // Course Code
            header : 'Course Code',
            dataKey: 'courseCode', 
            label: 'Course Code', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Course Code','courseCode']);
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
                return  <div
                            className={`w-full h-full text-slate-500 font-bold flex flex-wrap justify-center items-center`}
                        >
                            {value}
                            
                        </div>;
            }
        },
        { // Name
            header : 'Name',
            dataKey: 'name', 
            label: 'Name', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Name of the course','name']);
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
                      hoveredDetails[2] === 'name'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'name' && (
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

                const props = {
                    courseList: JSON.stringify(currentItem.courseList),
                    instructorName: currentItem.instructorName,
                }

                const queryString = Object.keys(props)
                    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(props[key])}`)
                    .join('&');
                
                return  <div className='flex justify-center items-center'>
                            <div className='text-blue-700 font-bold '>
                                {value}
                            </div>

                            <a 
                            href={``}
                            target='_blank'
                            className={`h-[3rem] ml-1 cursor-alias text-blue-600 font-bold flex justify-center items-center`}>

                                <IoMdOpen />
                            </a>
                            
                        </div>
            } 
        },
        { // Users
            header : 'Users',
            dataKey: 'studentRegistered', 
            label: 'Student Registered', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Number of students registered in the course','studentRegistered']);
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
                      hoveredDetails[2] === 'studentRegistered'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'studentRegistered' && (
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
                return  <div
                            className={`w-full h-full text-lg font-bold flex text-slate-500 flex-wrap justify-center items-center`}
                        >
                            {value}
                            
                        </div>;
            }
        },
        { // Attempts
            header : 'Attempts',
            dataKey: 'studentAttempts', 
            label: 'Student Attempts', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Total number of times a student can attempt the course','studentAttempts']);
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
                      hoveredDetails[2] === 'studentAttempts'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'studentAttempts' && (
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
                    <FaPencilAlt size={9} className='mb-3 ml-1' />
                  </div>
                );
            },
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex1 === null)
                            setShowFormIndex1(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex1 === index && form(currentItem,editAttemptsFormData,setShowFormIndex1,editAttempts)
                }

            },
            dataRender: (index, value, currentItem) => {
                return <p 
                        className={`w-full h-[3rem] text-orange-400 font-bold text-lg flex justify-center items-center `}>
                            {value}
                        </p>
            } 
        },
        { // Archive
            header : 'Archive',
            dataKey: 'archive', 
            label: 'Archive', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Archive this course','archive']);
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
                      hoveredDetails[2] === 'archive'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'archive' && (
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
                    <FaPencilAlt size={9} className='mb-3 ml-1' />
                  </div>
                );
            },
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex2 === null)
                            setShowFormIndex2(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex2 === index && form(currentItem,editArchiveFormData,setShowFormIndex2,editArchive)
                }

            },
            dataRender: (index, value, currentItem) => {
                return <p 
                        className={`w-full h-[3rem] flex text-lg font-bold text-slate-500 justify-center items-center`}>

                            {value}
                        </p>
            } 
        },
        { // License Left
            header : 'License Left',
            dataKey: 'licenseLeft', 
            label: 'License Left', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Total number of licenses left for this course','licenseLeft']);
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
                      hoveredDetails[2] === 'licenseLeft'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'licenseLeft' && (
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
                return  <div
                            className={`w-full h-full font-bold text-lg text-green-600 flex flex-wrap justify-center items-center`}
                        >
                            {value}
                            
                        </div>;
            }
        },
        { // Schedule
            header : 'Schedule',
            dataKey: 'editSchedule', 
            label: 'Edit Schedule', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Edit attempt schedule of the course','editSchedule']);
                    },
                    onMouseLeave: (index,item) => {
                        setHoveredDetails([]);
                    }
                },
    
            },
            columnRender: (index,value) => {
                return <div
                            className={`lg:cursor-help w-full h-full flex flex-wrap justify-center items-center relative ${
                                hoveredDetails.length > 0 &&
                                hoveredDetails[0] === index &&
                                hoveredDetails[2] === 'editSchedule'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'editSchedule' && (
                                <div
                                className={`hidden lg:flex w-[10rem]  justify-center items-center  text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
                                >
                                <div className='flex flex-col justify-center items-center'>
                                    <FaInfoCircle size={16} className="text-blue-500" />
                                    {hoveredDetails[1]}
                                </div>
                                </div>
                            )}
                            {value}
                            <FaPencilAlt size={9} className='mb-3 ml-1' />
                            
                        </div>;
            },
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex3 === null)
                            setShowFormIndex3(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex3 === index && form(currentItem,editScheduleFormData,setShowFormIndex3,editSchedule)
                }

            },
            dataRender: (index, value, currentItem) => {
                return  <div className='w-full flex flex-col justify-center items-center'>
                            <input contentEditable={false} value={formatToCustomString(currentItem.startTime)} onChange={() => {}} className='bg-[#f5f467]  pl-1 cursor-pointer outline-none flex w-[12rem] text-center h-[2rem] justify-center items-center rounded-lg' />

                            <p className='text-xs  '>
                                to
                            </p>

                            <input contentEditable={false} value={formatToCustomString(currentItem.endTime)} onChange={() => {}} className='bg-emerald-200 pl-1 cursor-pointer outline-none flex w-[12rem] text-center h-[2rem] justify-center items-center rounded-lg' />

                            <p 
                            onMouseEnter={() => handleMouseEnter([index,'editSchedule'])}
                            onMouseLeave={handleMouseLeave} 
                            className={`w-full h-[1rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'editSchedule' ? ' animate-bounce' : ''}`}>

                                <FaBell size={15} className=' text-slate-700 cursor-pointer' />
                            </p>
                        </div>
            } 
        },
    ];

    // cardColumnsDescription starts here

    const cardColumnsDescription = [
        { // Course Code
            header : 'Course Code',
            dataKey: 'courseCode', 
            label: 'Course Code', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.courseCode,'Course Code','courseCode']);
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
                            className={`lg:cursor-help w-full h-full flex flex-wrap justify-start items-center relative `}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index && hoveredDetails[1] === currentItem.courseCode &&
                            hoveredDetails[3] === 'courseCode' && (
                                <div
                                className={`hidden lg:flex w-[10rem] text-center justify-center items-center  text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2  rounded shadow-md border border-gray-300 z-1001`}
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
                            className={`w-1/2 h-full text-slate-500 font-bold flex flex-wrap justify-end items-center`}
                        >
                            {value}
                            
                        </div>;
            }
        },
        { // Name
            header : 'Name',
            dataKey: 'name', 
            label: 'Name', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.courseCode,'Name of the course','name']);
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
                            hoveredDetails[3] === 'name' && (
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

                const props = {
                    courseList: JSON.stringify(currentItem.courseList),
                    instructorName: currentItem.instructorName,
                }

                const queryString = Object.keys(props)
                    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(props[key])}`)
                    .join('&');
                
                return  <div className='flex flex-col w-full justify-end items-end'>
                            <textarea value={value} className='w-[8rem] h-[3rem] text-center resize-none outline-none text-blue-700 font-bold ' />

                            <a 
                            href={``}
                            target='_blank'
                            className={`cursor-alias text-blue-600 font-bold flex justify-center items-center`}>

                                <IoMdOpen />
                            </a>
                            
                        </div>
            } 
        },
        { // Users
            header : 'Users',
            dataKey: 'studentRegistered', 
            label: 'Student Registered', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.courseCode,'Number of students registered in the course','studentRegistered']);
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
                            hoveredDetails[3] === 'studentRegistered' && (
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
                            className={` w-full h-full text-lg font-bold flex text-slate-500 flex-wrap justify-end items-center`}
                        >
                            {value}
                            
                        </div>;
            }
        },
        { // Attempts
            header : 'Attempts',
            dataKey: 'studentAttempts', 
            label: 'Student Attempts', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.courseCode,'Total number of times a student can attempt the course','studentAttempts']);
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
                            hoveredDetails[3] === 'studentAttempts' && (
                                <div
                                className={`hidden lg:flex w-[10rem] text-center  justify-center items-center  text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
                                >
                                <div className='flex flex-col justify-center items-center'>
                                    <FaInfoCircle size={16} className="text-blue-500" />
                                    {hoveredDetails[2]}
                                </div>
                                </div>
                            )}
                            {value}
                            
                            <FaPencilAlt size={9} className='mb-3 ml-1' />
                            
                        </div>;
            },
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex1 === null)
                            setShowFormIndex1(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex1 === index && form(currentItem,editAttemptsFormData,setShowFormIndex1,editAttempts)
                }

            },
            dataRender: (index, value, currentItem) => {
                return <p 
                        className={`w-full h-[3rem] bg-emerald-400 rounded-md   text-gray-900 font-bold text-lg flex justify-center items-center `}>
                            {value}
                        </p>
            } 
        },
        { // Archive
            header : 'Archive',
            dataKey: 'archive', 
            label: 'Archive', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.courseCode,'Archive this course','archive']);
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
                            hoveredDetails[3] === 'archive' && (
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
                            
                            <FaPencilAlt size={9} className='mb-3 ml-1' />
                            
                        </div>;
            },
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex2 === null)
                            setShowFormIndex2(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex2 === index && form(currentItem,editArchiveFormData,setShowFormIndex2,editArchive)
                }

            },
            dataRender: (index, value, currentItem) => {
                return <p 
                        className={`w-full h-[3rem] bg-blue-400 rounded-md flex font-bold justify-center items-center`}>

                            {value}
                        </p>
            } 
        },
        { // License Left
            header : 'License Left',
            dataKey: 'licenseLeft', 
            label: 'License Left', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.courseCode,'Total number of licenses left for this course','licenseLeft']);
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
                            hoveredDetails[3] === 'licenseLeft' && (
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
                            className={`w-1/2 h-full text-start text-slate-500 font-bold flex flex-wrap justify-end items-center`}
                        >
                            {value}
                            
                        </div>;
            }
        },
        { // Schedule
            header : 'Schedule',
            dataKey: 'editSchedule', 
            label: 'Edit Schedule', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.courseCode,'Edit schedule to attempt the course','editSchedulecolumn']);
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
                            hoveredDetails[3] === 'editSchedulecolumn' && (
                                <div
                                className={`hidden lg:flex w-[10rem] text-center justify-center  items-center  text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
                                >
                                <div className='flex flex-col justify-center items-center'>
                                    <FaInfoCircle size={16} className="text-blue-500" />
                                    {hoveredDetails[2]}
                                </div>
                                </div>
                            )}
                            {value}
                            
                            <FaPencilAlt size={9} className='mb-3 ml-1' />
                            
                        </div>;
            },
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex3 === null)
                            setShowFormIndex3(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex3 === index && form(currentItem,editScheduleFormData,setShowFormIndex3,editSchedule)
                }

            },
            dataRender: (index, value, currentItem) => {
                console.log("Date Render Start time",currentItem.startTime);

                console.log("CurrentItem",currentItem);
                return  <div className='w-[11.2rem] ml-[-1.55rem] bg-[#f5f467] py-2 rounded-md  flex flex-col justify-center items-center'>
                            
                            <input contentEditable={false} value={formatToCustomString(currentItem.startTime)} className='bg-[#f5f467] pl-1 cursor-pointer outline-none flex w-full h-[2rem] justify-center items-center' />

                            <p className='text-xs bg-[#f5f467] '>
                                to
                            </p>

                            <input contentEditable={false} value={formatToCustomString(currentItem.endTime)} className='bg-[#f5f467] pl-1 cursor-pointer outline-none flex w-full h-[2rem] justify-center items-center' />

                            <p 
                            onMouseEnter={() => handleMouseEnter([index,'editSchedule'])}
                            onMouseLeave={handleMouseLeave} 
                            className={`w-full h-[1rem] flex  justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'editSchedule' ? ' animate-bounce' : ''}`}>

                                <FaBell size={15} className='text-slate-700 cursor-pointer' />
                            </p>
                        </div>
            } 
        },
    ];

    // cardColumnsDescription ends here 

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

    return loading ? (
        <Loading />
    ) : 
    (
        <div className='w-full h-auto mt-7 flex flex-col justify-center items-center'>
            <div className='w-full flex justify-center items-center '>
                <div>
                    <h1 className="text-4xl font-bold hover:text-gray-600 cursor-default">Instructor Home</h1>
                </div>
            </div>

            {/* search email section */}
            <div className="w-full flex flex-col justify-center items-center mt-5">
                <Search items={items} setFilteredItems={setFilteredItems} enableSuggestion enableContinuousSearching={true} searchProperty="name" />
            </div>

            <TablePagination columnsDescription={tableColumnsDescription} items={filteredItems} showRowNumbers={true} columnsDesign='cursor-default bg-[#a7b1c7] border-gray-500 text-slate-800 border' rowsDesign='hover:bg-gray-200 cursor-default border'  />

            {/* <CardPagination columnsDescription={cardColumnsDescription} items={filteredItems} showRowNumbers={true} columnsDesign='' rowsDesign=''  /> */}
        </div>
    )
}

export default InstructorHome
