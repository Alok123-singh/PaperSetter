import React,{ useState, useEffect } from 'react'
import { FaPencilAlt, FaTrash, FaInfoCircle } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { OverlayForm1, OverlayForm2, Loading1, SearchEngine, TablePagination, CardPagination, Button1 } from '../../../components/index'
import { useSelector } from 'react-redux';
import { config } from '../../../configurations'
import { ADMIN_ENDPOINTS, GAME_ENDPOINTS, AUTH_ENDPOINTS } from '../../../apiEndpoints'
import { deleteInstructorAccount, fetchAllInstructors, fetchAllInstructorsAccounts, fetchAllAvailaibleGames, createNewCourse, createNewGame, updatePassword } from '../../../apiFunctionalities'


function AdminHome() {

    const [loading, setLoading] = useState(false);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [errors,setErrors] = useState([]);

    const [refreshData, setRefreshData] = useState(false);

    const [showFormIndex1, setShowFormIndex1] = useState(null);
    const [showFormIndex2, setShowFormIndex2] = useState(null);

    const [displayFormat,setDisplayFormat] = useState('Table');

    const [filteredItems, setFilteredItems] = useState([]);

    const [hoveredDetails, setHoveredDetails] = useState([]);
    const [allInstructorAccounts, setAllInstructorAccounts] = useState([]);
    const [allAvailaibleGames, setAllAvailaibleGames] = useState([]);

    const username = useSelector(state => state.auth.username);
    // const username = "anand12";

    let animationTimeout;

    const assignCourse = (data) => {
        setLoading(true);

        console.log('New Course Assigned');

        let newItems = [...items];

        newItems = newItems.map((item) => item.email === data['email'] ? {...item, courseEntities: [...item.courseEntities , { courseCode: data['courseCode'], courseName: data['courseName'] }]} : item);

        setItems(newItems);

        setLoading(false);
    };

    const doUpdatePassword = (data) => {
        updatePassword(data,() => {},setLoading,setErrors);

    };

    const updateFormData = {
        inputs : [
            // Define your form inputs here
            { label: 'Instructor Username', type: 'text', placeholder: 'Instructor Username', name: 'username', required: true, defaultValue: 'username', },
            { label: 'New Password', type: 'password', placeholder: 'New Password', name: 'newPassword', required: true, defaultValue: 'password', },
            // { label: '', type: 'text', placeholder: 'Student Name', name: 'studentName', required: true }
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            // { type: 'text', text: 'Prev', style: 'w-full' },
            { type: 'submit', text: 'Update', style: 'w-[6rem] bg-green-500 rounded-md hover:bg-white hover:border-2  hover:text-black' },
            // Add more button configurations as needed
        ],
        title : "Update Password",
        desc : "You can update password of the Instructor",
        formHeight : "md:h-[55%]",
        // formWidth : "md:h-[90%]",
    }

    const assignFormData = {
        inputs : [
            // Define your form inputs here
            { label: 'Email', type: 'text', placeholder: 'Instructor Email', name: 'email', required: true, defaultValue: 'email', },
            { label: 'Course Code', type: 'text', placeholder: 'Course Code', name: 'courseCode', required: true },
            { label: 'Course Name', type: 'text', placeholder: 'Course Name', name: 'courseName', required: true },
            // { label: '', type: 'text', placeholder: 'Student Name', name: 'studentName', required: true }
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            // { type: 'text', text: 'Prev', style: 'w-full' },
            { type: 'submit', text: 'Create', style: 'w-[6rem] rounded-md hover:bg-white hover:border-2  hover:text-black' },
            // Add more button configurations as needed
        ],
        title : "Course Assign",
        desc : "You can assign your course",
        formHeight : "md:h-[75%]",
        // formWidth : "md:h-[90%]",
    }

    const overlayForm1 = (parentData,formData,setShowFormIndex,onSubmit) => { 

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

    // generate a unique course Code everytime create add course form appears
    const generateUniqueCourseCode = () => {
        const getRandomAlphabets = (length) => {
            const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
            }
            return result;
        };
      
        const getJumbledString = (input) => {
            return input
                .split('')
                .sort(() => Math.random() - 0.5)
                .join('');
        };
      
        const getTimestamp = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
            
            // Combine time components
            const timeString = `${hours}${minutes}${seconds}${milliseconds}`;
        
            return (timeString);
        };
      
        // Maximum length for courseCode
        const maxCodeLength = 10;
      
        // Generate at least 4 alphabets for the start of courseCode and jumble them
        const initialAlphabets = getRandomAlphabets(4);
        const jumbledInitialAlphabets = getJumbledString(initialAlphabets);
      
        // Generate jumbled timestamp
        const timestamp = getTimestamp();
      
        // Combine all parts to form the final courseCode
        let courseCode = jumbledInitialAlphabets + timestamp;
      
        // Trim alphabets if necessary to accommodate the timestamp
        if (courseCode.length > maxCodeLength) {
            const trimmedAlphabets = jumbledInitialAlphabets.substring(0, Math.max(3, jumbledInitialAlphabets.length - (courseCode.length - maxCodeLength)));
            courseCode = trimmedAlphabets + timestamp;
        }
        
        return courseCode;
    };

    const [items,setItems] = useState([
        {
            fullName : 'Anand Pratap Singh Bais',

            email : 'anandpsingh7@gmail.com',
            
            password : '1234',

            courseEntities: [
                {
                    courseCode : generateUniqueCourseCode(),
                    courseName : 'Inventory Management'
                },
                {
                    courseCode : generateUniqueCourseCode(),
                    courseName : 'Hotel Management'
                }
            ]
        },
        {
            fullName : 'Chotu Don',

            email : 'chotudon@gmail.com',
            
            password : 'chotu@don',

            courseEntities: [
                {
                    courseCode : generateUniqueCourseCode(),
                    courseName : 'Hotel Management'
                }
            ]

        }
    ]);

    function convertIsoStringToObject(isoString) {
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
        { // Instructor Name
            header : 'Instructor Name',
            dataKey: 'fullName', 
            label: 'Instructor name', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Name of the Instructor','fullName']);
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
                return  <div
                            className={`w-full text-blue-600 font-bold h-full flex flex-wrap justify-center items-center`}
                        >
                            {value}
                            
                        </div>;
            }
        },
        { // Email
            header : 'Email Id',
            dataKey: 'email', 
            label: 'Email Id', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Email Id of Instructor','email']);
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
                                hoveredDetails[2] === 'email'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'email' && (
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
                            
                        </div>;
            },
            dataRender: (index, value, currentItem) => {
                return  <div
                            className={`w-full h-full flex flex-wrap justify-center items-center`}
                        >
                            {value}
                        </div>;
            }
        },
        { // Update Password
            header : 'Update Password',
            dataKey: 'update', 
            label: 'Update', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Update password of Instructor','update']);
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
                                hoveredDetails[2] === 'update'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'update' && (
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
                        if(showFormIndex2 === null)
                            setShowFormIndex2(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex2 === index && overlayForm1(currentItem,updateFormData,setShowFormIndex2,doUpdatePassword)
                }

            },
            dataRender: (index, value, currentItem) => {
                return <p 
                        onMouseEnter={() => handleMouseEnter([index,'pencil'])}
                        onMouseLeave={handleMouseLeave} 
                        className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'pencil' ? ' animate-bounce' : ''}`}>

                            {<FaPencilAlt size={14} className=' cursor-pointer' />}
                        </p>
            } 
        },
        { // Delete
            header : 'Delete',
            dataKey: 'delete', 
            label: 'Delete', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Remove Instructor from the organization','delete']);
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
                                hoveredDetails[2] === 'delete'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'delete' && (
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
                    onClick: (index, item) => {
                        console.log();
                        // Display a confirmation dialog
                        const confirmDelete = window.confirm('Are you sure you want to remove this instructor from organization?');

                        // Check if the user clicked "OK"
                        if (confirmDelete) {

                            deleteInstructorAccount(item.username, setRefreshData, setLoading, setErrors);
                            // // Create a copy of the array
                            // const newData = [...items];

                            // // Use splice to remove the element at the specified index
                            // newData.splice(index, 1);

                            // // Update the state with the modified array
                            // setItems(newData);
                        }
                    },
                },

            },
            dataRender: (index, value, currentItem) => {
                return <p 
                        onMouseEnter={() => handleMouseEnter([index,'trash'])}
                        onMouseLeave={handleMouseLeave} 
                        className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'trash' ? ' animate-bounce' : ''}`}>

                            {<FaTrash size={14} className=' cursor-pointer' />}
                        </p>
            } 
        },
        { // Courses
            header : 'Courses',
            dataKey: 'courses', 
            label: 'Courses', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Show all the courses that Instructor has.','courses']);
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
                                hoveredDetails[2] === 'courses'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'courses' && (
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
                            
                        </div>;
            },
            dataRender: (index, value, currentItem) => {
                // console.log("Current Item", currentItem);

                const props = {
                    courseEntities: JSON.stringify(currentItem.courseEntities),
                    instructorName: currentItem.name,
                }

                const queryString = Object.keys(props)
                    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(props[key])}`)
                    .join('&');
                
                return  <a 
                        onMouseEnter={() => handleMouseEnter([index,'info'])}
                        onMouseLeave={handleMouseLeave} 
                        href={`/admin/instructor/courses?${queryString}`}
                        target='_blank'
                        className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'info' ? ' animate-bounce' : ''}`}>

                            {<FaInfoCircle size={14} className=' cursor-pointer' /> }
                        </a>
            } 
        },
        // { // Assign
        //     header : 'Assign',
        //     dataKey: 'add', 
        //     label: 'Add', 
        //     columnFunctionality : {
        //         event: {
        //             onMouseEnter: (index,item) => {
        //                 // alert('Entered')
        //                 setHoveredDetails([index,'Assign a new course to the Instructor','add']);
        //             },
        //             onMouseLeave: (index,item) => {
        //                 setHoveredDetails([]);
        //             }
        //         },
    
        //     },
        //     columnRender: (index,value) => {
        //         return <div
        //                     className={`lg:cursor-help w-full h-full flex flex-wrap justify-center items-center relative ${
        //                         hoveredDetails.length > 0 &&
        //                         hoveredDetails[0] === index &&
        //                         hoveredDetails[2] === 'add'
        //                             ? 'z-10'
        //                             : 'z-1'
        //                     }`}
        //                 >
        //                     {hoveredDetails.length > 0 &&
        //                     hoveredDetails[0] === index &&
        //                     hoveredDetails[2] === 'add' && (
        //                         <div
        //                         className={`hidden lg:flex w-[10rem]  justify-center items-center  text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
        //                         >
        //                         <div className='flex flex-col justify-center items-center'>
        //                             <FaInfoCircle size={16} className="text-blue-500" />
        //                             {hoveredDetails[1]}
        //                         </div>
        //                         </div>
        //                     )}
        //                     {value}
        //                     <FaPencilAlt size={9} className='mb-3 ml-1' />
                            
        //                 </div>;
        //     },
        //     rowFunctionality: {
                
        //         event: {
        //             onClick : (index) => {
        //                 if(showFormIndex1 === null)
        //                     setShowFormIndex1(index);
        //             },
        //         },
        //         action: (currentItem,index) => {
        //             return showFormIndex1 === index && overlayForm1(currentItem,assignFormData,setShowFormIndex1,assignCourse)
        //         }

        //     },
        //     dataRender: (index, value, currentItem) => {
        //         return <p 
        //                 onMouseEnter={() => handleMouseEnter([index,'add'])}
        //                 onMouseLeave={handleMouseLeave} 
        //                 className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'add' ? ' animate-bounce' : ''}`}>

        //                     {<IoIosAdd size={25} className=' cursor-pointer' />}
        //                 </p>
        //     } 
        // },
    ];

    // cardColumnsDescription starts here

    const cardColumnsDescription = [
        { // Instructor Name
            header : 'Instructor Name',
            dataKey: 'fullName', 
            label: 'Instructor Name', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.email,'Name of the instructor','fullName']);
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
                            hoveredDetails[0] === index && hoveredDetails[1] === currentItem.email &&
                            hoveredDetails[3] === 'fullName' && (
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
                    courseEntities: JSON.stringify(currentItem.courseEntities),
                    instructorName: currentItem.instructorName,
                }

                const queryString = Object.keys(props)
                    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(props[key])}`)
                    .join('&');
                
                return  <div className='flex flex-col w-full justify-end items-end'>
                            <textarea value={value} onChange={() => {}} className='w-[8rem] h-[3rem] text-center resize-none outline-none text-blue-700 font-bold ' />

                            {/* <a 
                            href={``}
                            target='_blank'
                            className={`cursor-alias text-blue-600 font-bold flex justify-center items-center`}>

                                <IoMdOpen />
                            </a> */}
                            
                        </div>
            } 
        },
        { // Email 
            header : 'Email',
            dataKey: 'email', 
            label: 'Email', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.email,'Email of the instructor','email']);
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
                            hoveredDetails[0] === index && hoveredDetails[1] === currentItem.email &&
                            hoveredDetails[3] === 'email' && (
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
        { // Update Password
            header : 'Update Password',
            dataKey: 'update', 
            label: 'Update Password', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.email,'Update password of Instructor','update']);
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
                            hoveredDetails[0] === index && hoveredDetails[1] === currentItem.email &&
                            hoveredDetails[3] === 'update' && (
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
                            
                            {/* <FaPencilAlt size={9} className='mb-3 ml-1' /> */}
                            
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
                    return showFormIndex1 === index && overlayForm1(currentItem,updateFormData,setShowFormIndex1,doUpdatePassword)
                }

            },
            dataRender: (index, value, currentItem) => {
                return <p 
                        onMouseEnter={() => handleMouseEnter([index,'update'])}
                        onMouseLeave={handleMouseLeave} 
                        className={`w-full h-[3rem] bg-emerald-400 rounded-md   text-gray-900 font-bold text-lg flex justify-center items-center `}>
                            {<FaPencilAlt size={14} className={`h-full cursor-pointer ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'update' ? ' animate-bounce' : ''}`} />}
                        </p>
            } 
        },
        { // Delete
            header : 'Delete',
            dataKey: 'delete', 
            label: 'Delete', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.email,'Remove Instructor from the organization','delete']);
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
                            hoveredDetails[0] === index && hoveredDetails[1] === currentItem.email &&
                            hoveredDetails[3] === 'delete' && (
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
                    onClick : (index,item) => {
                        const confirmDelete = window.confirm('Are you sure you want to remove this instructor from organization?');

                        // Check if the user clicked "OK"
                        if (confirmDelete) {

                            deleteInstructorAccount(item.username, setRefreshData, setLoading, setErrors);

                        }
                    },
                },

            },
            dataRender: (index, value, currentItem) => {
                return <p 
                        onMouseEnter={() => handleMouseEnter([index,'trash'])}
                        onMouseLeave={handleMouseLeave} 
                        className={`w-full h-[3rem] bg-blue-400 rounded-md flex font-bold justify-center items-center`}>

                            {<FaTrash size={14} className={`h-full cursor-pointer ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'trash' ? ' animate-bounce' : ''}`} />}
                        </p>
            } 
        },
        { // Courses
            header : 'Courses',
            dataKey: 'courses', 
            label: 'Courses', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,value,currentItem) => {
                        // alert('Entered')
                        setHoveredDetails([index,currentItem.email,'Show all the courses that Instructor has','courses']);
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
                            hoveredDetails[0] === index && hoveredDetails[1] === currentItem.email &&
                            hoveredDetails[3] === 'courses' && (
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
                    courseEntities: JSON.stringify(currentItem.courseEntities),
                    instructorName: currentItem.name,
                }

                const queryString = Object.keys(props)
                    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(props[key])}`)
                    .join('&');

                return  <div
                            className={`w-1/2 h-full text-start text-slate-500 font-bold flex flex-wrap justify-end items-center`}
                        >
                            <a 
                            onMouseEnter={() => handleMouseEnter([index,'info'])}
                            onMouseLeave={handleMouseLeave} 
                            href={`/admin/instructor/courses?${queryString}`}
                            target='_blank'
                            className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'info' ? ' animate-bounce' : ''}`}>

                                {<FaInfoCircle size={14} className=' cursor-pointer' /> }
                            </a>
                            
                        </div>;
            }
        },
        // { // Assign
        //     header : 'Assign',
        //     dataKey: 'assign', 
        //     label: 'Assign', 
        //     columnFunctionality : {
        //         event: {
        //             onMouseEnter: (index,value,currentItem) => {
        //                 // alert('Entered')
        //                 setHoveredDetails([index,currentItem.email,'Update password of Instructor','assign']);
        //             },
        //             onMouseLeave: (index,value,currentItem) => {
        //                 setHoveredDetails([]);
        //             }
        //         },
    
        //     },
        //     columnRender: (index,value,currentItem) => {
        //         return <div
        //                     // onMouseEnter={() => handleMouseEnter([index,currentItem.courseCode,'editSchedulecolumn'])}
        //                     onMouseLeave={handleMouseLeave} 
        //                     className={`lg:cursor-help w-full h-full flex flex-wrap text-start justify-start items-center relative `}
        //                 >
        //                     {hoveredDetails.length > 0 &&
        //                     hoveredDetails[0] === index && hoveredDetails[1] === currentItem.email &&
        //                     hoveredDetails[3] === 'assign' && (
        //                         <div
        //                         className={`hidden lg:flex w-[10rem] text-center  justify-center items-center  text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
        //                         >
        //                         <div className='flex flex-col justify-center items-center'>
        //                             <FaInfoCircle size={16} className="text-blue-500" />
        //                             {hoveredDetails[2]}
        //                         </div>
        //                         </div>
        //                     )}
        //                     {value}
                            
        //                     {/* <FaPencilAlt size={9} className='mb-3 ml-1' /> */}
                            
        //                 </div>;
        //     },
        //     rowFunctionality: {
                
        //         event: {
        //             onClick : (index) => {
        //                 if(showFormIndex2 === null)
        //                     setShowFormIndex2(index);
        //             },
        //         },
        //         action: (currentItem,index) => {
        //             return showFormIndex2 === index && overlayForm1(currentItem,assignFormData,setShowFormIndex2,assignCourse)
        //         }

        //     },
        //     dataRender: (index, value, currentItem) => {
        //         return <p 
        //                 onMouseEnter={() => handleMouseEnter([index,'assign'])}
        //                 onMouseLeave={handleMouseLeave} 
        //                 className={`w-full h-[3rem] bg-emerald-400 rounded-md   text-gray-900 font-bold text-lg flex justify-center items-center `}>
        //                     {<IoIosAdd size={25} className={`h-full cursor-pointer ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'assign' ? ' animate-bounce' : ''}`} />}
        //                 </p>
        //     } 
        // },
    ];

    // cardColumnsDescription ends here 

    // create new course section starts

    const [showGameForm, setShowGameForm] = useState(null);
    const [showCourseForm, setShowCourseForm] = useState(null);

    function convertTimeObjectToIsoString(isoString) {
        // Create a new Date object from the ISO string
        const dateObject = new Date(isoString);
      
        // Check if the dateObject is valid
        if (isNaN(dateObject.getTime())) {
          console.error('Invalid date format');
          return null;
        }
      
        // Use toISOString() to get the ISO string representation
        const formattedString = dateObject.toISOString();
      
        // Extract the date and time part from the ISO string
        const desiredFormat = formattedString.slice(0, 19);
      
        return desiredFormat;
    }

    const createNewCourseSubmit = async (data) => {
        console.log("Create new course Data :-",data);
        // console.log(data.assignToEmail);

        // include fullName also in data according to data.assignToEmail value
        allInstructorAccounts.map((account) => {
            if(account.email === data.assignToEmail){
                data.fullName = account.fullName;
                data.username = account.username;
            }
        });

        createNewCourse(data,setRefreshData,setLoading,setErrors);
    }

    const createNewGameSubmit = async (data) => {
        console.log("Create new game Data :-",data);

        createNewGame(data,setRefreshData,setLoading,setErrors);
    }

    const [courseCode, setCourseCode] = useState(() => generateUniqueCourseCode());


    const createNewCourseFormData = {
        inputs : [
            // Define your form inputs here
            { label: 'Assign to', type: 'select', options : allInstructorAccounts, accessFieldName : 'email', placeholder: 'Select Instructor', defaultValue : 'Select Instructor', name: 'assignToEmail', required: true,  },
            // { label: 'Instructor Name', type: 'text', placeholder: '', name: 'name', required: true,  },
            // { label: 'Password', type: 'password', placeholder: '', name: 'password', required: true,  },
            { label: 'E Learning', type: 'select', options: allAvailaibleGames, accessFieldName : 'name', placeholder: 'Select Course Name', defaultValue : 'Select Course Name', name: 'courseName', required: true,  },
            { label: 'Course Code', type: 'text', placeholder: '', name: 'courseCode', required: true, defaultValue: courseCode, readOnly : true },
            // { label: 'Course Name', type: 'text', placeholder: '', name: 'courseName', required: true,  },
            { label: 'No. of Licenses / Users', type: 'text', placeholder: '', name: 'licenses', required: true,  },
            { label: 'Number of Groups with 5 students', type: 'text', placeholder: '', name: 'groupOfFive', required: true,  },
            { label: 'Number of Groups with 4 students', type: 'text', placeholder: '', name: 'groupOfFour', required: true,  },
            { label: 'Start Date & Time', type: 'dateAndTime2', placeholder: '', name: 'startTime', required: true,  },
            { label: 'End Date & Time', type: 'dateAndTime2', placeholder: '', name: 'endTime', required: true,  },
            { label: 'Number of attempts', type: 'text', placeholder: '', name: 'attempts', required: true,  },
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            { type: 'submit', text: 'Create', style: 'w-[6rem] rounded-sm' },
            // Add more button configurations as needed
        ],
        title : 'Create Course',
        desc : "You can create your course",
        formHeight : "",
        formWidth : "lg:w-3/4", // total width of the form
        formDesign : {
            start: 'justify-center', // define whether the form should appear in the start 
            cols: 2, // define how many fields should be in 1 row
        },
        errors : errors,
    }

    const createNewGameFormData = {
        inputs : [
            // Define your form inputs here
            { label: 'Name of Game', type: 'text', placeholder: 'Enter name', name: 'name', required: true,  },
            { label: 'Type', type: 'text', placeholder: 'Enter type', name: 'type', required: true,  },
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            { type: 'submit', text: 'Create', style: 'w-[6rem] rounded-sm' },
            // Add more button configurations as needed
        ],
        title : 'Create Game',
        desc : "You can create your game",
        formHeight : "",
        formWidth : "lg:w-3/4", // total width of the form
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

    // generating unique code everytime form opens
    useEffect(() => {
        setCourseCode(generateUniqueCourseCode());
    }, [showAddCourse]);

    // fetch all necessary data from backend when page loads
    useEffect(() => {
        // const isoString = '2024-01-26T13:00:00';
        // console.log(convertIsoStringToObject(isoString));
        fetchAllInstructors(setItems, setLoading, setErrors);
        fetchAllInstructorsAccounts(setAllInstructorAccounts, setLoading, setErrors);
        fetchAllAvailaibleGames(setAllAvailaibleGames, setLoading, setErrors);


    }, [refreshData]);

    // create new course section ends

    return loading ? (
        <Loading1 />
    ) : 
    (
        <div className='w-full  h-auto py-10 flex flex-wrap flex-col justify-center items-center'>

            <div className='w-full flex flex-col lg:flex-row justify-between items-center '>

                {/* Heading Section */}
                <div className='w-full  flex justify-center items-center '>
                    <h1 className="text-4xl font-bold hover:text-gray-600 cursor-default">Admin Home</h1>
                </div>

            </div>

            {/* Crdate new game and Create new course form */}
            <div className='w-[98%] md:w-[90%] my-6 flex justify-between items-center'>

                <div className=''>
                    {/* Create new game button section */}
                    <div className='flex flex-col justify-center items-center text-xl'>
                        <p className='mb-1 text-center text-sm font-bold md:text-md'> Create New Game </p>

                        <Button1
                        className="w-[5rem] h-[2rem] flex justify-center hover:bg-white hover:border-4 hover:text-slate-600 items-center"
                        onClick={() => {
                            // setFormData(createNewGameFormData);
                            // setOnSubmitFunction(() => createNewGameSubmit());
                            // setShowAddCourse(prev => !prev);
                            if(showGameForm === null)
                                setShowGameForm(true);
                            // else
                            //     setShowForm(null);
                        }}
                        >
                            Add
                        </Button1>
                        
                    </div>

                    {showGameForm && ( 
                        overlayForm2(createNewGameFormData,setShowGameForm,createNewGameSubmit)
                    
                    )}
                </div>
                
                <div className=''>
                    {/* Create new course button section */}
                    <div className='flex flex-col justify-center items-center text-xl'>
                        <p className='mb-1 text-center text-sm font-bold md:text-md'> Create New Course </p>

                        <Button1
                        className="w-[5rem] h-[2rem] flex justify-center hover:bg-white hover:border-4 hover:text-slate-600 items-center"
                        onClick={() => {
                            // setFormData(createNewCourseFormData);
                            // setOnSubmitFunction(() => createNewCourseSubmit());
                            // setShowAddCourse(true);
                            if(showCourseForm === null)
                                setShowCourseForm(true);
                            // else
                            //     setShowForm(null);
                        }}
                        >
                            Add
                        </Button1>
                        
                    </div>

                    {showCourseForm && ( 
                        overlayForm2(createNewCourseFormData,setShowCourseForm,createNewCourseSubmit)
                    
                    )}
                </div>
                

            </div>

            {/* Search Email Section */}
            <div className="w-full flex  justify-center items-center">
                <SearchEngine items={items} setFilteredItems={setFilteredItems} enableSuggestion searchProperty="email" width='lg:w-[35%]' />
            </div>

            {displayFormat === 'Table' && 
                <TablePagination columnsDescription={tableColumnsDescription} items={filteredItems} showRowNumbers={true} columnsDesign='cursor-default bg-[#a7b1c7] border-gray-500 text-slate-800 border' rowsDesign='hover:bg-gray-200 cursor-default border'  />
            }
            

            {displayFormat === 'Card' && 
                <CardPagination columnsDescription={cardColumnsDescription} items={filteredItems} showRowNumbers={true} columnsDesign='' rowsDesign=''  />
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
};

export default AdminHome
