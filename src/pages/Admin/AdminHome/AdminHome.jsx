import React,{ useState } from 'react'
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
            dataRender: (index,name) => {
                return  <div className='w-full h-full flex flex-wrap justify-center items-center'>
                            {name}
                        </div>;
            }
        },
        {
            header : 'Email Id',
            dataKey: 'emailId', 
            label: 'Email Id', 
            dataRender: (index,email) => {
                return  <p className='h-full  flex flex-wrap justify-center items-center'>
                            {email}
                        </p>;
            }
        },
        {
            header : 'Update Password',
            dataKey: 'update', 
            label: 'Update', 
            functionality: {
                
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
            dataRender: (index, item) => {
                return <p 
                        onMouseEnter={() => handleMouseEnter([index,'pencil'])}
                        onMouseLeave={handleMouseLeave} 
                        className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'pencil' ? ' animate-bounce' : ''}`}>

                            {item}
                        </p>
            } 
        },
        {
            header : 'Delete',
            dataKey: 'delete', 
            label: 'Delete', 
            functionality: {
                
                event: {
                    onClick: (index) => {
                        // Create a copy of the array
                        const newData = [...items];
        
                        // Use splice to remove the element at the specified index
                        newData.splice(index, 1);
        
                        // Update the state with the modified array
                        setItems(newData);
                    },
                },

            },
            dataRender: (index, item) => {
                return <p 
                        onMouseEnter={() => handleMouseEnter([index,'trash'])}
                        onMouseLeave={handleMouseLeave} 
                        className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'trash' ? ' animate-bounce' : ''}`}>

                            {item}
                        </p>
            } 
        },
        {
            header : 'Courses',
            dataKey: 'courses', 
            label: 'Courses', 
            functionality: {
                
                event: {
                    onClick : (index) => {
                        handleNavigate({
                            courseList: JSON.stringify(items[index].courseList),
                            instructorName: items[index].instructorName,
                        })
                    },
                },

            },
            dataRender: (index, item) => {
                return  <div 
                
                        onMouseEnter={() => handleMouseEnter([index,'info'])}
                        onMouseLeave={handleMouseLeave} 
                        className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'info' ? ' animate-bounce' : ''}`}>

                            {item}
                        </div>
            } 
        },
        {
            header : 'Assign',
            dataKey: 'add', 
            label: 'Add', 
            functionality: {
                
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
            dataRender: (index, item) => {
                return <p 
                        onMouseEnter={() => handleMouseEnter([index,'add'])}
                        onMouseLeave={handleMouseLeave} 
                        className={`w-full h-[3rem] flex justify-center items-center ${hoveredDetails.length > 0 && hoveredDetails[0] === index && hoveredDetails[1] === 'add' ? ' animate-bounce' : ''}`}>

                            {item}
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

    const handleNavigate = (props) => {
        const queryString = Object.keys(props)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(props[key])}`)
            .join('&');
    
        // Open the URL in a new tab or window with query parameters
        window.open(`/admin/instructor/courses?${queryString}`, '_blank');
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

    return loading ? (
        <Loading />
    ) : 
    (
        <div className='w-full  h-auto py-10 px-2 flex flex-wrap flex-col justify-center items-center'>
            <div className='w-full flex justify-center items-center '>
                <div>
                    <h1 className="text-4xl font-bold">Admin Home</h1>
                </div>
            </div>

            {/* <div className='w-full mb-7 flex flex-col justify-center items-center border border-blue-300 '>
                <div className='w-full flex justify-center text-center bg-blue-500 text-white items-center'>
                    <p className='w-[25%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Instructor Name </p>

                    <p className='w-[30%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Email Id </p>

                    <p className='w-[20%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Password </p>

                    <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Update </p>

                    <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Delete </p>

                    <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Courses </p>

                    <p className='w-[7%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Assign </p>
                </div>

                {items.map((item,index) => (

                    <div key={index} className='w-full flex justify-center text-center items-center'>
                        <p className='w-[25%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> {item.instructorName} </p>

                        <p className='w-[30%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> {item.emailId} </p>

                        <input type='password' value={item.password} className='w-[20%] h-[3rem] p-1 border flex justify-center items-center text-center border-blue-300' disabled />

                        <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300 '> <FaPencilAlt size={15} className=' cursor-pointer' /> </p>

                        <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300 '> <FaTrash size={15} className=' cursor-pointer' /> </p>

                        <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300 '> <IoIosArrowDown size={15} className=' cursor-pointer' /> </p>

                        <p
                        onClick={() => {
                            setShowFormIndex(index);
                        }}
                        className='addNewElement w-[7%] h-[3rem] p-1 border flex justify-center items-center border-blue-300 cursor-pointer'>

                            <IoIosAdd size={25} className=' cursor-pointer' />
                        </p>

                        {showFormIndex === index && form(item)}
                    </div>
                ))}

            </div> */}

            <Pagination columns={columnsDescription} items={items} />

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
                                    <div
                                    className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer'
                                    onClick={() => setShowPassword(prev => !prev)}
                                    >
                                        {showPassword ? (
                                        <span role="img" aria-label="Hide Password" className='text-gray-600'>👁️</span>
                                        ) : (
                                        <span role="img" aria-label="Show Password" className='text-gray-600'>👁️‍🗨️</span>
                                        )}
                                    </div>
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

                                {/* <Input
                                // label = "Username"
                                type="text"
                                placeholder="Instructor Name"
                                {...register("instructorName", {
                                    required: true,
                                })}
                                />

                                <Input
                                // label = "Username"
                                type="text"
                                placeholder="E Learning"
                                {...register("eLearning", {
                                    required: true,
                                })}
                                />

                                <Input
                                // label = "Username"
                                type="text"
                                placeholder="No. of Licenses"
                                {...register("username", {
                                    required: true,
                                })}
                                />  */}
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
