import React,{ useState, useEffect } from 'react'
import { FaPencilAlt, FaTrash, FaInfoCircle } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import {useForm} from "react-hook-form"
import { Input, Button, OverlayForm, Loading, Pagination } from '../../../components/index'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';


function AdminHome() {

    const [loading, setLoading] = useState(false);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const {register, handleSubmit} = useForm()
    const [showPassword,setShowPassword] = useState(false);

    const [showFormIndex1, setShowFormIndex1] = useState(null);
    const [showFormIndex2, setShowFormIndex2] = useState(null);

    const [searchEmail, setSearchEmail] = useState('');
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
            { label: '', type: 'text', placeholder: 'Instructor Email', name: 'emailId', required: true, defaultValue: 'emailId', },
            { label: '', type: 'password', placeholder: 'New Password', name: 'newPassword', required: true, defaultValue: 'password', },
            // { label: '', type: 'text', placeholder: 'Student Name', name: 'studentName', required: true }
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            // { type: 'text', text: 'Prev', style: 'w-full' },
            { type: 'submit', text: 'Update', style: 'w-full' },
            // Add more button configurations as needed
        ],
        title : "Update Password",
        desc : "You can update password of the Instructor"
    }

    const assignFormData = {
        inputs : [
            // Define your form inputs here
            { label: '', type: 'text', placeholder: 'Instructor Email', name: 'emailId', required: true, defaultValue: 'emailId', },
            { label: '', type: 'text', placeholder: 'Course Code', name: 'courseCode', required: true },
            { label: '', type: 'text', placeholder: 'Course Name', name: 'courseName', required: true },
            // { label: '', type: 'text', placeholder: 'Student Name', name: 'studentName', required: true }
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            // { type: 'text', text: 'Prev', style: 'w-full' },
            { type: 'submit', text: 'Create', style: 'w-full' },
            // Add more button configurations as needed
        ],
        title : "Course Assign",
        desc : "You can assign your course"
    }

    const form = (parentData,formData,setShowFormIndex,onSubmit) => { 

        // console.log("Clicked from", parentData);

        return <OverlayForm
                    onClose={() => {
                        setShowFormIndex(null);
                    }}
                    onSubmit={onSubmit}
                    formData={formData}
                    parentData={parentData}
                />
    };

    const columnsDescription = [
        {
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
                    className={`w-full h-full flex flex-wrap justify-center items-center relative ${
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
                          className={`w-[10rem] text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
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
                            className={`w-full h-full flex flex-wrap justify-center items-center`}
                        >
                            {value}
                            
                        </div>;
            }
        },
        {
            header : 'Email Id',
            dataKey: 'emailId', 
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
                            className={`w-full h-full flex flex-wrap justify-center items-center relative ${
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
                                className={`w-[10rem] text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
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
        {
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
                            className={`w-full h-full flex flex-wrap justify-center items-center relative ${
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
                                className={`w-[10rem] text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
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
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex2 === null)
                            setShowFormIndex2(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex2 === index && form(currentItem,updateFormData,setShowFormIndex2,updatePassword)
                }

            },
            dataRender: (index, value, currentItem) => {
                return <p 
                        onMouseEnter={() => handleMouseEnter([index,'pencil'])}
                        onMouseLeave={handleMouseLeave} 
                        className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'pencil' ? ' animate-bounce' : ''}`}>

                            {value}
                        </p>
            } 
        },
        {
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
                            className={`w-full h-full flex flex-wrap justify-center items-center relative ${
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
                                className={`w-[10rem] text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
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

                            {value}
                        </p>
            } 
        },
        {
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
                            className={`w-full h-full flex flex-wrap justify-center items-center relative ${
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
                                className={`w-[10rem] text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
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

                            {value}
                        </a>
            } 
        },
        {
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
                            className={`w-full h-full flex flex-wrap justify-center items-center relative ${
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
                                className={`w-[10rem] text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
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
            rowFunctionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex1 === null)
                            setShowFormIndex1(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex1 === index && form(currentItem,assignFormData,setShowFormIndex1,assignCourse)
                }

            },
            dataRender: (index, value, currentItem) => {
                return <p 
                        onMouseEnter={() => handleMouseEnter([index,'add'])}
                        onMouseLeave={handleMouseLeave} 
                        className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'add' ? ' animate-bounce' : ''}`}>

                            {value}
                        </p>
            } 
        },
    ];

    const [items,setItems] = useState([
        {
            instructorName : 'Anand Pratap Singh Bais',

            emailId : 'anandpsingh7@gmail.com',
            
            password : '1234',

            update : <FaPencilAlt size={14} className=' cursor-pointer' />,

            delete : <FaTrash size={14} className=' cursor-pointer' />,

            courses : <FaInfoCircle size={14} className=' cursor-pointer' /> ,

            add : <IoIosAdd size={25} className=' cursor-pointer' />,

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

            emailId : 'chotudon@gmail.com',
            
            password : 'chotu@don',

            update : <FaPencilAlt size={14} className=' cursor-pointer' />,

            delete : <FaTrash size={14} className=' cursor-pointer' />,

            courses : <FaInfoCircle size={14} className=' cursor-pointer' /> ,

            add : <IoIosAdd size={25} className=' cursor-pointer' />,

            courseList: [
                {
                    courseCode : 'CSE307',
                    courseName : 'Hotel Management'
                }
            ]

        }
    ]);

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
        // Update the filtered list when the searchEmail changes
        const filtered =
            searchEmail.trim() === ''
                ? items // Show all items if search field is empty
                : items.filter((item) =>
                      item.emailId.toLowerCase().includes(searchEmail.toLowerCase())
                  );
        setFilteredItems(filtered);
    }, [searchEmail, items]);


    return loading ? (
        <Loading />
    ) : 
    (
        <div className='w-full  h-auto py-10 px-2 flex flex-wrap flex-col justify-center items-center'>
            <div className='w-full flex justify-center items-center '>
                <div>
                    <h1 className="text-4xl font-bold hover:text-gray-600 cursor-default">Admin Home</h1>
                </div>
            </div>


            <div className="w-full flex flex-col justify-center items-center mt-5">
                <div className="flex w-[90%] sm:w-[50%] md:w-[50%] lg:w-[30%] items-center">
                    <Input
                        type="text"
                        placeholder="Search by Email"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                        className="pr-2"
                    />
                </div>
            </div>

            <Pagination columns={columnsDescription} items={filteredItems} showRowNumbers={true} columnsDesign='cursor-default' rowsDesign='hover:bg-gray-200 cursor-default'  />

            <div className='w-full flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-center items-center text-xl'>
                    <p className='mb-1 text-sm font-bold md:text-md'> Hire New Instructor </p>

                    <button
                    className="relative group"
                    onClick={() => {
                        setShowAddCourse(prev => !prev);
                    }}
                    >
                        <div className="relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-pink-600 hover:bg-pink-500 dark:bg-slate-800 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                            <div className={`transform transition-all duration-150 overflow-hidden ${showAddCourse ? 'translate-y-1 group-focus:-translate-y-0' : ''}`}>
                                {showAddCourse ? (
                                    <FiChevronUp className="h-6 w-6 animate-bounce text-white" />
                                ) : (
                                    <FiChevronDown className="h-6 w-6 animate-bounce text-white" />
                                )}
                            </div>
                        </div>
                    </button>
                    
                </div>

                {showAddCourse && (
                    <form onSubmit={handleSubmit(addInstructor)} className='w-full h-[18rem] flex flex-col justify-center items-center pb-[2rem]'>
                        <div className='w-2/3 flex justify-center items-center p-1 space-x-1'>
                            <div className='w-1/2 flex justify-start items-center flex-col'>
                                <Input
                                // label = "Username"
                                type="text"
                                placeholder="Name"
                                {...register("instructorName", {
                                    required: true,
                                })}
                                />

                                <div className='w-full relative'>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Password'
                                        {...register('password', {
                                        required: true,
                                        })}
                                    />
                                </div>

                                {/* <Input
                                // label = "Username"
                                type="text"
                                placeholder="Course Name"
                                {...register("courseName", {
                                    required: true,
                                })}
                                /> */}
                            </div>

                            <div className='w-1/2 h-full flex justify-start flex-col items-start'>

                                <Input
                                // label = "Username"
                                type="text"
                                placeholder="Email"
                                {...register("instructorEmail", {
                                    required: true,
                                })}
                                />

                            </div>
                        </div> 

                        <div className='w-[7rem] flex justify-center items-center mt-2'>
                            <Button
                            type="submit"
                            className="w-full "
                            >
                                Create
                            </Button>
                        </div>
                        
                    </form>
                )}

            </div>
            
        </div>
    )
};

export default AdminHome
