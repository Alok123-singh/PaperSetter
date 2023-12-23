import React,{ useState } from 'react'
import { FaPencilAlt, FaTrash, FaInfoCircle } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { OverlayForm1, OverlayForm2, Loading, Search, TablePagination, Button } from '../../../components/index'


function AdminHome() {

    const [loading, setLoading] = useState(false);
    const [showAddCourse, setShowAddCourse] = useState(false);

    const [showFormIndex1, setShowFormIndex1] = useState(null);
    const [showFormIndex2, setShowFormIndex2] = useState(null);


    const [filteredItems, setFilteredItems] = useState([]);

    const [hoveredDetails, setHoveredDetails] = useState([]);
    let animationTimeout;

    const addInstructor = (data) => {
        setLoading(true);

        let newItems = [...items];

        newItems = [...newItems,  
            {
                instructorName : data.instructorName,

                emailId : data.instructorEmail,
                
                password : data.password,

                update : <FaPencilAlt size={14} className=' cursor-pointer' />,

                delete : <FaTrash size={14} className=' cursor-pointer' />,

                courses : <FaInfoCircle size={14} className=' cursor-pointer' /> ,

                add : <IoIosAdd size={25} className=' cursor-pointer' />,

                courseList: []
            }
        ]

        setItems(newItems);

        setLoading(false);
    };

    const assignCourse = (data) => {
        setLoading(true);

        console.log('New Course Assigned');

        let newItems = [...items];

        newItems = newItems.map((item) => item.emailId === data['emailId'] ? {...item, courseList: [...item.courseList , { courseCode: data['courseCode'], courseName: data['courseName'] }]} : item);

        setItems(newItems);

        setLoading(false);
    };

    const updatePassword = (data) => {
        setLoading(true);

        let newItems = [...items];

        newItems = newItems.map((item) => item.emailId === data['emailId'] ? {...item, password: data['newPassword']} : item);

        setItems(newItems);
        
        setLoading(false);
    };

    const updateFormData = {
        inputs : [
            // Define your form inputs here
            { label: 'Email', type: 'text', placeholder: 'Instructor Email', name: 'email', required: true, defaultValue: 'email', },
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

    const columnsDescription = [
        { // Instructor Name
            header : 'Instructor Name',
            dataKey: 'instructorName', 
            label: 'Instructor name', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Name of the Instructor','instructorName']);
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
                      hoveredDetails[2] === 'instructorName'
                        ? 'z-10'
                        : 'z-1'
                    }`}
                  >
                    {hoveredDetails.length > 0 &&
                      hoveredDetails[0] === index &&
                      hoveredDetails[2] === 'instructorName' && (
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
        { // Email Id
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
                    return showFormIndex2 === index && overlayForm1(currentItem,updateFormData,setShowFormIndex2,updatePassword)
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
                    onClick: (index) => {
                        // Display a confirmation dialog
                        const confirmDelete = window.confirm('Are you sure you want to remove this instructor from organization?');

                        // Check if the user clicked "OK"
                        if (confirmDelete) {
                            // Create a copy of the array
                            const newData = [...items];

                            // Use splice to remove the element at the specified index
                            newData.splice(index, 1);

                            // Update the state with the modified array
                            setItems(newData);
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

                const props = {
                    courseList: JSON.stringify(currentItem.courseList),
                    instructorName: currentItem.instructorName,
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
        { // Assign
            header : 'Assign',
            dataKey: 'add', 
            label: 'Add', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Assign a new course to the Instructor','add']);
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
                                hoveredDetails[2] === 'add'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'add' && (
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
                        if(showFormIndex1 === null)
                            setShowFormIndex1(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex1 === index && overlayForm1(currentItem,assignFormData,setShowFormIndex1,assignCourse)
                }

            },
            dataRender: (index, value, currentItem) => {
                return <p 
                        onMouseEnter={() => handleMouseEnter([index,'add'])}
                        onMouseLeave={handleMouseLeave} 
                        className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'add' ? ' animate-bounce' : ''}`}>

                            {<IoIosAdd size={25} className=' cursor-pointer' />}
                        </p>
            } 
        },
    ];

    const [items,setItems] = useState([
        {
            instructorName : 'Anand Pratap Singh Bais',

            email : 'anandpsingh7@gmail.com',
            
            password : '1234',

            courseList: [
                {
                    courseCode : 'CSE301',
                    courseName : 'Inventory Management'
                },
                {
                    courseCode : 'CSE307',
                    courseName : 'Hotel Management'
                }
            ]
        },
        {
            instructorName : 'Chotu Don',

            email : 'chotudon@gmail.com',
            
            password : 'chotu@don',

            courseList: [
                {
                    courseCode : 'CSE307',
                    courseName : 'Hotel Management'
                }
            ]

        }
    ]);

    // add new course section starts

    const [showForm, setShowForm] = useState(null);

    const onSubmit = (data) => {
        console.log("Form Submitted",data);


    }

    const createNewCourseFormData = {
        inputs : [
            // Define your form inputs here
            { label: 'Course Code', type: 'text', placeholder: 'Course Code', name: 'courseCode', required: true,  },
            { label: 'Course Name', type: 'text', placeholder: 'Course Name', name: 'courseName', required: true,  },
            // { label: '', type: 'text', placeholder: 'Your phone number', name: 'phoneNumber', required: true,  },
            // { label: 'Message', type: 'textarea', placeholder: 'Your message', name: 'message', required: true, defaultValue: 'Send message to us' },
            // { label: 'Start Time', type: 'dateAndTime2', placeholder: 'Start Time', name: 'startTime', required: true, defaultValue: new Date('2024-01-26'), enableTime : false, dateFormat : 'Y-m-d', },
            // { label: 'End Time', type: 'dateAndTime3', placeholder: 'End Time', name: 'endTime', required: true, defaultValue: new Date('2024-01-26'), enableTime : false, dateFormat : 'MMMM d, yyyy', },
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            // { type: 'text', text: 'Prev', style: 'w-full' },
            { type: 'submit', text: 'Submit', style: 'w-[6rem]' },
            // Add more button configurations as needed
        ],
        title : 'Add New Course',
        desc : "Enter details of the course to be created",
        formHeight : "",
        formWidth : "lg:w-3/4", // total width of the form
        formDesign : {
            start: 'justify-center', // define whether the form should appear in the start 
            cols: 2, // define how many fields should be in 1 row
        }
    }

    const overlayForm2 = (formData,setShowForm,onSubmit) => { 

        // console.log("Clicked from", parentData);

        return <OverlayForm2
                    onClose={() => {
                        setShowForm(null);
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

    // add new course section ends

    return loading ? (
        <Loading />
    ) : 
    (
        <div className='w-full  h-auto py-10 flex flex-wrap flex-col justify-center items-center'>

            <div className='w-full flex flex-col lg:flex-row justify-between items-center '>

                {/* Heading Section */}
                <div className='w-full lg:w-[90%] flex justify-center items-center lg:ml-[8.4rem] '>
                    <h1 className="text-4xl font-bold hover:text-gray-600 cursor-default">Admin Home</h1>
                </div>

                {/* Add new course form */}
                <div className='w-full mt-4 mb-2 lg:mt-0 lg:w-[10%] flex justify-center lg:justify-end lg:mr-7 items-center'>
                    {/* Create new course button section */}
                    <div className='flex flex-col justify-center items-center text-xl'>
                        <p className='mb-1 text-center text-sm font-bold md:text-md'> Create New Course </p>

                        <Button
                        className="w-[5rem] h-[2rem] flex justify-center hover:bg-white hover:border-4 hover:text-slate-600 items-center"
                        onClick={() => {
                            setShowAddCourse(prev => !prev);
                            if(showForm === null)
                                setShowForm(true);
                        }}
                        >
                            Add
                        </Button>
                        
                    </div>

                    {showForm === true && ( 
                        overlayForm2(createNewCourseFormData,setShowForm,onSubmit)
                    
                    )}
                    

                </div>
            </div>


            {/* Search Email Section */}
            <div className="w-full flex  justify-center items-center mt-5">
                <Search items={items} setFilteredItems={setFilteredItems} enableSuggestion searchProperty="email" />
            </div>

            <TablePagination columnsDescription={columnsDescription} items={filteredItems} showRowNumbers={true} columnsDesign='cursor-default bg-[#a7b1c7] border-gray-500 text-slate-800 border' rowsDesign='hover:bg-gray-200 cursor-default border'  />
            
            
        </div>
    )
};

export default AdminHome
