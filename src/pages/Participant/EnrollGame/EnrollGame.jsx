import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TablePagination, CardPagination, Loading1, OverlayForm1, Button1, Messages } from '../../../components'
import { FaInfoCircle } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import { AiOutlineProfile } from 'react-icons/ai';
import { joinGame } from '../../../apiFunctionalities'
import { useNavigate } from 'react-router-dom';


function EnrollGame() {
    const [loading, setLoading] = useState(false);
    const [errors,setErrors] = useState([]);
    const [messages,setMessages] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    const enrollData = useSelector(state => state.course.courseEntity);
    const email = useSelector(state => state.auth.email);
    const fullName = useSelector(state => state.auth.fullName);
    const username = useSelector(state => state.auth.username);

    const navigate = useNavigate();

    // console.log("Enroll Data", enrollData);

    const [filteredItems1, setFilteredItems1] = useState(() => {
        let items = [];
        enrollData.groupFiveEntityList.map((group) => {
            items.push({groupName : group.groupCode, students : group.students});
        });

        return (items);
    });

    const [filteredItems2, setFilteredItems2] = useState(() => {
        let items = [];
        enrollData.groupFourEntityList.map((group) => {
            items.push({groupName : group.groupCode, students : group.students});
        });

        return (items);
    });

    const [selectedGroup, setSelectedGroup] = useState(null);

    const [displayFormat1,setDisplayFormat1] = useState('Table');
    const [displayFormat2,setDisplayFormat2] = useState('Table');
    const [hoveredDetails, setHoveredDetails] = useState([]);

    const [showFormIndex1, setShowFormIndex1] = useState(null);
    const [showFormIndex2, setShowFormIndex2] = useState(null);

    let animationTimeout;


    const doJoinGame = async () => {

        joinGame(enrollData,selectedGroup,email,fullName,username,navigate,'/',setLoading,setErrors);
    }


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

    const selectGroup = async (data) => {
        // console.log("Group ", data);

        setSelectedGroup(data.groupName);

    }

    const selectGroupFormData = {
        inputs : [
            // Define your form inputs here
            { label: 'Group Name', type: 'text', placeholder: 'Group name', name: 'groupName', required: true, defaultValue: 'groupName', },
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            // { type: 'text', text: 'Prev', style: 'w-full' },
            { type: 'submit', text: 'Select', style: 'bg-green-500 border-green-400 hover:bg-green-400 rounded-md' },
            // Add more button configurations as needed
        ],
        title : "Select Group",
        desc : "You can select this group to enroll in the course",
        formHeight : "md:h-[70%] lg:h-[55%]",
        // formWidth : "md:h-[90%]",
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

    const tableColumnsDescription1 = [
        { // Group Name
            header : 'Group Name',
            dataKey: 'groupName', 
            label: 'Group Name', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Name of the Group. Click to select this group','groupName']);
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
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex1 === null)
                            setShowFormIndex1(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex1 === index && form(currentItem,selectGroupFormData,setShowFormIndex1,selectGroup)
                }

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
                        setHoveredDetails([index,'Students enrolled in this group','students']);
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
                    <AiOutlineProfile size={17} className='ml-1' />
                  </div>
                );
            },
            dataRender: (index, value, currentItem) => {
                // console.log("Current Item",currentItem);

                // const props = {
                //     students: JSON.stringify(currentItem),
                // }

                // const queryString = Object.keys(props)
                //     .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(props[key])}`)
                //     .join('&');

                return  <div className='flex flex-col space-y-3 justify-center items-center'>
                            {currentItem.students !== null && currentItem.students.map((student,index) => (
                                <div key={index}>
                                    {student.fullName}
                                </div>
                            ))}
                        </div>

                // return  <a 
                //     onMouseEnter={() => handleMouseEnter([index,'info'])}
                //     onMouseLeave={handleMouseLeave} 
                //     href={`/enroll/students?${queryString}`}
                //     target='_blank'
                //     className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'info' ? ' animate-bounce' : ''}`}>
                //         {<FaInfoCircle size={14} className=' cursor-pointer' /> }
                //     </a>
            } 
        },
    ];

    const cardColumnsDescription1 = [
        { // Group Name
            header : 'Group Name',
            dataKey: 'groupName', 
            label: 'Group Name', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        console.log("Current Item", currentItem);
                        setHoveredDetails([index,currentItem.groupName,'Name of the Group','groupName']);
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
                            hoveredDetails[0] === index && hoveredDetails[1] === currentItem.groupName &&
                            hoveredDetails[3] === 'groupName' && (
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
                            <MdDescription size={17} className=' ml-1' />
                            
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
                    return showFormIndex2 === index && form(currentItem,selectGroupFormData,setShowFormIndex2,selectGroup)
                }

            },
            dataRender: (index, value, currentItem) => {

                return  <div
                            className={` w-full h-full font-bold flex text-slate-500 flex-wrap justify-end items-center`}
                        >
                            {value}
                            
                        </div>;
            } 
        },
        { // Students
            header : 'Students',
            dataKey: 'students', 
            label: 'Students', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.groupName,'Students enrolled in this group','students']);
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
                            hoveredDetails[0] === index && hoveredDetails[1] === currentItem.groupName &&
                            hoveredDetails[3] === 'students' && (
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
                            <AiOutlineProfile size={17} className='ml-1' />
                            
                        </div>;
            },
            dataRender: (index, value, currentItem) => {
                return  <div className='flex flex-col space-y-3 justify-center items-center'>
                            {currentItem.students !== null && currentItem.students.map((student,index) => (
                                <div key={index}>
                                    {student.fullName}
                                </div>
                            ))}
                        </div>
            }
        },
    ];

    const tableColumnsDescription2 = [
        { // Group Name
            header : 'Group Name',
            dataKey: 'groupName', 
            label: 'Group Name', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Name of the Group','groupName1']);
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
                      hoveredDetails[2] === 'groupName1'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'groupName1' && (
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
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex2 === null)
                            setShowFormIndex2(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex2 === index && form(currentItem,selectGroupFormData,setShowFormIndex2,selectGroup)
                }

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
                        setHoveredDetails([index,'Students enrolled in this group','students1']);
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
                      hoveredDetails[2] === 'students1'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'students1' && (
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
                    <AiOutlineProfile size={17} className='ml-1' />
                  </div>
                );
            },
            dataRender: (index, value, currentItem) => {
                // console.log("Current Item",currentItem);

                // const props = {
                //     students: JSON.stringify(currentItem),
                // }

                // const queryString = Object.keys(props)
                //     .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(props[key])}`)
                //     .join('&');

                return <div className='flex flex-col space-y-3 justify-center items-center'>
                            {currentItem.students !== null && currentItem.students.map((student,index) => (
                                <div key={index}>
                                    {student.fullName}
                                </div>
                            ))}
                        </div>

                // return  <a 
                //     onMouseEnter={() => handleMouseEnter([index,'info'])}
                //     onMouseLeave={handleMouseLeave} 
                //     href={`/enroll/students?${queryString}`}
                //     target='_blank'
                //     className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'info' ? ' animate-bounce' : ''}`}>
                //         {<FaInfoCircle size={14} className=' cursor-pointer' /> }
                //     </a>
            } 
        },
    ];

    const cardColumnsDescription2 = [
        { // Group Name
            header : 'Group Name',
            dataKey: 'groupName', 
            label: 'Group Name', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        console.log("Current Item", currentItem);
                        setHoveredDetails([index,currentItem.groupName,'Name of the Group','groupName']);
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
                            hoveredDetails[0] === index && hoveredDetails[1] === currentItem.groupName &&
                            hoveredDetails[3] === 'groupName' && (
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
                            <MdDescription size={17} className=' ml-1' />
                            
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
                    return showFormIndex2 === index && form(currentItem,selectGroupFormData,setShowFormIndex2,selectGroup)
                }

            },
            dataRender: (index, value, currentItem) => {

                return  <div
                            className={` w-full h-full font-bold flex text-slate-500 flex-wrap justify-end items-center`}
                        >
                            {value}
                            
                        </div>;
            } 
        },
        { // Students
            header : 'Students',
            dataKey: 'students', 
            label: 'Students', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.groupName,'Students enrolled in this group','students']);
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
                            hoveredDetails[0] === index && hoveredDetails[1] === currentItem.groupName &&
                            hoveredDetails[3] === 'students' && (
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
                            <AiOutlineProfile size={17} className='ml-1' />
                            
                        </div>;
            },
            dataRender: (index, value, currentItem) => {
                return  <div className='flex flex-col space-y-3 justify-center items-center'>
                            {currentItem.students !== null && currentItem.students.map((student,index) => (
                                <div key={index}>
                                    {student.fullName}
                                </div>
                            ))}
                        </div>
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

    return loading === true ? (
        <Loading1 />
    ) : 
    (
        <div className='my-5 w-full h-auto flex flex-col justify-center items-center'>

            <div className={`w-full ${(messages.length > 0 || errors.length > 0) && 'mb-9'}`}>
                {/* Messages section */}
                {messages.length > 0 && 
                    <div className='w-full flex justify-center items-center'>
                        <Messages messages={messages} messageType='success' setMessages={setMessages} />
                    </div>
                }
                
                {/* Errors section */}
                {errors.length > 0 && 
                    <div className='w-full flex justify-center items-center mt-4'>
                        <Messages messages={errors} messageType='error' setMessages={setErrors} />
                    </div>
                }
            </div>

            {/* Heading section */}
            <div className='w-full flex flex-col sm:flex-row justify-evenly items-center'>

                {/* Course Name section */}
                <div className='flex flex-col justify-center items-center space-y-1'>
                    <p className='font-bold text-lg'>
                        Course Name
                    </p>

                    <p>
                        {enrollData.courseName}
                    </p>
                </div>

                {/* Start Time section */}
                <div className='mt-4 sm:mt-0 flex flex-col justify-center items-center space-y-1'>
                    <p className='font-bold text-lg'>
                        Start Time
                    </p>

                    <p>
                        {formatToCustomString(convertIsoStringToObject(enrollData.startTime))}
                    </p>
                </div>

                {/* End Time section */}
                <div className='mt-4 sm:mt-0 flex flex-col justify-center items-center space-y-1'>
                    <p className='font-bold text-lg'>
                        End Time
                    </p>

                    <p>
                        {formatToCustomString(convertIsoStringToObject(enrollData.endTime))}
                    </p>
                </div>

            </div>

            {/* Groups display section */}
            <div className='w-full flex flex-col md:flex-row justify-evenly items-center'>
                <div className={`w-full sm:w-1/2 lg:w-1/3 ${filteredItems1.length === 0 && 'hidden'}`}>
                    
                    {displayFormat1 === 'Table' && 
                        <TablePagination columnsDescription={tableColumnsDescription1} items={filteredItems1} title='Groups of Five Students' showRowNumbers={false} columnsDesign='cursor-default bg-[#a7b1c7] border-gray-500 text-slate-800 border' rowsDesign='hover:bg-gray-200 cursor-default border'  />
                    }

                    {displayFormat1 === 'Card' && 
                        <CardPagination columnsDescription={cardColumnsDescription1} items={filteredItems1} title='Groups of Five Students' showRowNumbers={true} columnsDesign='' rowsDesign='' />
                    }

                    {/* Select display format as Table or Card */}
                    <div className='w-full mb-8 flex justify-center items-center'>
                        <p className='text-green-600 font-lg font-bold cursor-default'>
                            Select display option :
                        </p>
                        
                        <select
                            value={displayFormat1}
                            onChange={ event => setDisplayFormat1(event.target.value) }
                            className="flex justify-center items-center appearance-none bg-white border border-gray-400 text-gray-700 ml-6 py-2 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
                        >
                            <option value="Table">Table</option>
                            <option value="Card">Card</option>
                        </select>
                    </div>
                </div>
                <div className={`w-full sm:w-1/2 lg:w-1/3 ${filteredItems2.length === 0 && 'hidden'}`}>
                    {displayFormat2 === 'Table' && 
                        <TablePagination columnsDescription={tableColumnsDescription2} items={filteredItems2} title='Groups of Four Students' showRowNumbers={false} columnsDesign='cursor-default bg-[#a7b1c7] border-gray-500 text-slate-800 border' rowsDesign='hover:bg-gray-200 cursor-default border'  />
                    }

                    {displayFormat2 === 'Card' && 
                        <CardPagination columnsDescription={cardColumnsDescription2} items={filteredItems2} title='Groups of Four Students' showRowNumbers={true} columnsDesign='' rowsDesign=''   />
                    }

                    {/* Select display format as Table or Card */}
                    <div className='w-full mb-8 flex justify-center items-center'>
                        <p className='text-green-600 font-lg font-bold cursor-default'>
                            Select display option :
                        </p>
                        
                        <select
                            value={displayFormat2}
                            onChange={ event => setDisplayFormat2(event.target.value) }
                            className="flex justify-center items-center appearance-none bg-white border border-gray-400 text-gray-700 ml-6 py-2 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
                        >
                            <option value="Table">Table</option>
                            <option value="Card">Card</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='flex justify-center items-center'>
                <p className='font-bold'>
                    Select Your Group
                </p>
                <p className='mx-2 font-bold'>
                    :
                </p>
                <p>
                    {selectedGroup === null ? 'Not Selected' : selectedGroup}
                </p>
            </div>

            <div className='mt-9'>
                <Button1
                onClick={() => {
                    if(selectedGroup !== null)
                        doJoinGame();
                    else{
                        let errors = [];
                        errors.push("Select a group");
                        setErrors(errors);
                    }
                }}
                className=''
                > 
                    Submit
                </Button1>
            </div>

        </div>
    )
};

export default EnrollGame
