import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TablePagination, CardPagination, Loading1, OverlayFormat } from '../../../components'
import { FaInfoCircle } from 'react-icons/fa';
import { AiOutlineProfile } from 'react-icons/ai';
import { MdDescription } from 'react-icons/md';
import { fetchHistoryBasedOnCourseCode } from '../../../apiFunctionalities'

function StudentsEnrolled() {

    const [loading, setLoading] = useState(false);
    const [errors,setErrors] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    const courseEntity = useSelector(state => state.course.courseEntity);
    // console.log("Course Entity", courseEntity);

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

    const [history, setHistory] = useState([]);
    // const [filteredHistory, setFilteredHistory] = useState([]);

    const [showFormIndex1, setShowFormIndex1] = useState(null);
    const [showFormIndex2, setShowFormIndex2] = useState(null);

    const [displayFormat1,setDisplayFormat1] = useState('Table');
    const [displayFormat2,setDisplayFormat2] = useState('Table');
    const [hoveredDetails, setHoveredDetails] = useState([]);

    const [selectedStudentEmail, setSelectedStudentEmail] = useState(null);

    let animationTimeout;


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

    const [displayDesign, setDisplayDesign] = useState({
        design : {
            start : 'justify-center',
        },
        title : 'Student Result',
        height : '',
        width : '',
    });

    const filterHistory = (email) => {
        
        // setLoading(true);
        
        let filteredHistory = [];

        history.map((item) => {
            if(item.email === email){
              filteredHistory.push(item);
            }
        });

        // setLoading(false);

        return filteredHistory;
    };

    const overlayDisplay = (items, tableColumnsDescription, cardColumnsDescription, setShowFormIndex, displayDesign) => { 

      // console.log("Clicked from", parentData);

      return <OverlayFormat
                  onClose={() => {
                      setShowFormIndex(null);
                      setSelectedStudentEmail(null);
                  }}
                  items={items}
                  tableColumnsDescription={tableColumnsDescription}
                  cardColumnsDescription={cardColumnsDescription}
                //   title='History'
                  displayDesign={displayDesign}
                  enableExcelDownload={true}
              />
    };

    const historyTableColumnsDescription = [
        {
            header : 'Exam Type',
            dataKey: 'examType', 
            label: 'Exam Type', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Name of exam','examType']);
                    },
                    onMouseLeave: (index,item) => {
                        setHoveredDetails([]);
                    }
                },

            },
            columnRender: (index,value) => {
                return <div
                            className={`w-full h-full flex flex-wrap justify-center items-center relative ${
                                hoveredDetails.length > 0 &&
                                hoveredDetails[0] === index &&
                                hoveredDetails[2] === 'examType'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'examType' && (
                                <div
                                className={`hidden lg:flex w-[10rem]  justify-center items-center text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
                                >
                                <div className='flex flex-col justify-center items-center'>
                                    <FaInfoCircle size={16} className="text-blue-500" />
                                    {hoveredDetails[1]}
                                </div>
                                </div>
                            )}
                            {value}
                            
                        </div>;
            },
            dataRender: (index, value, currentItem) => {
                const words = value.toLowerCase().split('_');
                const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
                return formattedWords.join(' ');
            }
        },
        {
            header : 'Score',
            dataKey: 'score', 
            label: 'Score', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Score in percentage','score']);
                    },
                    onMouseLeave: (index,item) => {
                        setHoveredDetails([]);
                    }
                },

            },
            columnRender: (index,value) => {
                return <div
                            className={`w-full h-full flex flex-wrap justify-center items-center relative ${
                                hoveredDetails.length > 0 &&
                                hoveredDetails[0] === index &&
                                hoveredDetails[2] === 'score'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'score' && (
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
                            
                        </div>;
            },
            dataRender: (index, value, currentItem) => {
                return  <div
                            className={`w-full h-full flex flex-wrap justify-center items-center`}
                        >
                            {parseFloat(value).toFixed(2).toString() + ''}

                        </div>;
            } 
        },
        {
            header : 'Time',
            dataKey: 'time', 
            label: 'Timestamp', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Time when the exam was given','time']);
                    },
                    onMouseLeave: (index,item) => {
                        setHoveredDetails([]);
                    }
                },

            },
            columnRender: (index,value) => {
                return <div
                            className={`w-full h-full flex flex-wrap justify-center items-center relative ${
                                hoveredDetails.length > 0 &&
                                hoveredDetails[0] === index &&
                                hoveredDetails[2] === 'time'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'time' && (
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
                            
                        </div>;
            },
            dataRender: (index, value, currentItem) => {
                const options = { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit',
                  hour12: true,
                };
                
                const formattedDate = new Date(value).toLocaleString('en-US', options);
                return formattedDate;
            }
        },
    ];

    const historyCardColumnsDescription = [
        { // Exam Type
            header : 'Exam Type',
            dataKey: 'examType', 
            label: 'Exam Type', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        console.log("Current Item", currentItem);
                        setHoveredDetails([index,currentItem.groupName,'Name of exam','examType']);
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
                            hoveredDetails[3] === 'examType' && (
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
                const words = value.toLowerCase().split('_');
                const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
                return formattedWords.join(' ');
            } 
        },
        { // Score
            header : 'Score',
            dataKey: 'score', 
            label: 'Score', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.groupName,'Score in percentage','score']);
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
                            hoveredDetails[3] === 'score' && (
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
                            className={`w-full h-full flex flex-wrap justify-center items-center`}
                        >
                            {parseFloat(value).toFixed(2).toString() + ''}

                        </div>;
            }
        },
        { // Time
            header : 'Time',
            dataKey: 'time', 
            label: 'Timestamp', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.groupName,'Time when the exam was given','time']);
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
                            hoveredDetails[3] === 'time' && (
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
                const options = { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit',
                    hour12: true,
                };
                  
                const formattedDate = new Date(value).toLocaleString('en-US', options);
                return formattedDate;
            }
        },
    ];

    

    const tableColumnsDescription1 = [
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
                        setHoveredDetails([index,`Students enrolled in this group. Click on student's name to see their result`,'students']);
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
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex1 === null && selectedStudentEmail !== null)
                            setShowFormIndex1(index);
                    },
                },
                action: (currentItem,index) => {
                    const filteredHistory = filterHistory(selectedStudentEmail);

                    return (showFormIndex1 === index && selectedStudentEmail !== null) && overlayDisplay(filteredHistory,historyTableColumnsDescription,historyCardColumnsDescription,setShowFormIndex1,displayDesign)
                }

            },
            dataRender: (index, value, currentItem) => {

                // console.log("Current Item", currentItem);

                return  <div className='flex flex-col space-y-3 justify-center items-center'>
                            {currentItem.students !== null && currentItem.students.map((student,index) => (
                                <div 
                                key={index}
                                onClick={() => {
                                  let design = displayDesign;
                                  design.title = `${student.fullName}'s Result`;
                                  setDisplayDesign(design);
                                  setSelectedStudentEmail(student.email);
                                }}
                                >
                                    {student.fullName}
                                </div>
                            ))}
                        </div>
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
                        setHoveredDetails([index,currentItem.groupName,`Students enrolled in this group. Click on student's name to see their result`,'students']);
                    },
                    onMouseLeave: (index,value,currentItem) => {
                        setHoveredDetails([]);
                    }
                },
    
            },
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex1 === null && selectedStudentEmail !== null)
                            setShowFormIndex1(index);
                    },
                },
                action: (currentItem,index) => {
                    const filteredHistory = filterHistory(selectedStudentEmail);

                    return (showFormIndex1 === index && selectedStudentEmail !== null) && overlayDisplay(filteredHistory,historyTableColumnsDescription,historyCardColumnsDescription,setShowFormIndex1,displayDesign)
                }

            },
            dataRender: (index, value, currentItem) => {

                // console.log("Current Item", currentItem);

                return  <div className='flex flex-col space-y-3 justify-center items-center'>
                            {currentItem.students !== null && currentItem.students.map((student,index) => (
                                <div 
                                key={index}
                                onClick={() => {
                                  let design = displayDesign;
                                  design.title = `${student.fullName}'s Result`;
                                  setDisplayDesign(design);
                                  setSelectedStudentEmail(student.email);
                                }}
                                >
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
                        setHoveredDetails([index,`Students enrolled in this group. Click on student's name to see their result`,'students1']);
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
            rowFunctionality: {
                
              event: {
                  onClick : (index) => {
                      if(showFormIndex2 === null && selectedStudentEmail !== null)
                          setShowFormIndex2(index);
                  },
              },
              action: (currentItem,index) => {
                  const filteredHistory = filterHistory(selectedStudentEmail);

                  return (showFormIndex2 === index && selectedStudentEmail !== null) && overlayDisplay(filteredHistory,historyTableColumnsDescription,historyCardColumnsDescription,setShowFormIndex2,displayDesign)
              }

            },
            dataRender: (index, value, currentItem) => {

                // console.log("Current Item", currentItem);

                return  <div className='flex flex-col space-y-3 justify-center items-center'>
                            {currentItem.students !== null && currentItem.students.map((student,index) => (
                                <div 
                                key={index}
                                onClick={() => {
                                  let design = displayDesign;
                                  design.title = `${student.fullName}'s Result`;
                                  setDisplayDesign(design)
                                  setSelectedStudentEmail(student.email);
                                }}
                                >
                                    {student.fullName}
                                </div>
                            ))}
                        </div>
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
                        setHoveredDetails([index,currentItem.groupName,`Students enrolled in this group. Click on student's name to see their result`,'students']);
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
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex2 === null && selectedStudentEmail !== null)
                            setShowFormIndex2(index);
                    },
                },
                action: (currentItem,index) => {
                    const filteredHistory = filterHistory(selectedStudentEmail);
  
                    return (showFormIndex2 === index && selectedStudentEmail !== null) && overlayDisplay(filteredHistory,historyTableColumnsDescription,historyCardColumnsDescription,setShowFormIndex2,displayDesign)
                }
  
            },
            dataRender: (index, value, currentItem) => {
  
                // console.log("Current Item", currentItem);

                return  <div className='flex flex-col space-y-3 justify-center items-center'>
                            {currentItem.students !== null && currentItem.students.map((student,index) => (
                                <div 
                                key={index}
                                onClick={() => {
                                let design = displayDesign;
                                design.title = `${student.fullName}'s Result`;
                                setDisplayDesign(design)
                                setSelectedStudentEmail(student.email);
                                }}
                                >
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

    useEffect(() => {
      fetchHistoryBasedOnCourseCode(courseEntity.courseCode,setLoading,setErrors,setHistory);
    }, []);

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
                <div className={`w-full sm:w-1/2 lg:w-1/3 ${filteredItems1.length === 0 && 'hidden'}`}>
                    
                    {displayFormat1 === 'Table' && filteredItems1.length > 0 && 
                        <TablePagination columnsDescription={tableColumnsDescription1} items={filteredItems1} title='Groups of Five Students' showRowNumbers={false} columnsDesign='cursor-default bg-[#a7b1c7] border-gray-500 text-slate-800 border' rowsDesign='hover:bg-gray-200 cursor-default border'  />
                    }

                    {displayFormat1 === 'Card' && filteredItems1.length > 0 && 
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
        </div>
    )
};

export default StudentsEnrolled;
