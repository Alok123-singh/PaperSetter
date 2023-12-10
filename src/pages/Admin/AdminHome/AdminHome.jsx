import React,{ useState } from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { IoIosArrowDown, IoIosAdd } from 'react-icons/io';
import {useForm} from "react-hook-form"
import { Input, Button, OverlayForm, Loading, Pagination } from '../../../components/index'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';


function AdminHome() {

    const [loading, setLoading] = useState(false);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const {register, handleSubmit} = useForm()
    const [showPassword,setShowPassword] = useState(false);

    const [showFormIndex, setShowFormIndex] = useState(null);

    const addCourse = () => {

    };

    const formData = {
        inputs : [
            // Define your form inputs here
            { label: '', type: 'text', placeholder: 'Instructor Name', name: 'instructorName', required: true, defaultValue: 'instructorName', },
            { label: '', type: 'text', placeholder: 'Simulation Name', name: 'simulationName', required: true },
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

    const AdminColumns = [
        {
            header : 'Instructor Name',
            dataKey: 'instructorName', 
            label: 'Instructor name', 
            // render: (name) => {
            //     return name;
            // }
        },
        {
            header : 'Email Id',
            dataKey: 'emailId', 
            label: 'Email Id', 
            // render: (email) => {
            //     return email;
            // } 
        },
        {
            header : 'Password',
            dataKey: 'password', 
            label: 'Password', 
            render: (password) => {
                return <input type='password' value={password} className=' h-[3rem] p-1 flex justify-center items-center text-center' disabled />
            }
        },
        {
            header : 'Update',
            dataKey: 'update', 
            label: 'Update', 
            // render: () => {
            //     return <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300 '> <FaPencilAlt size={15} className=' cursor-pointer' /> </p>
            // } 
        },
        {
            header : 'Delete',
            dataKey: 'delete', 
            label: 'Delete', 
            // render: () => {
            //     return <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300 '> <FaTrash size={15} className=' cursor-pointer' /> </p>
            // } 
        },
        {
            header : 'Courses',
            dataKey: 'courses', 
            label: 'Courses', 
            // render: () => {
            //     return <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300 '> <IoIosArrowDown size={15} className=' cursor-pointer' /> </p>
            // } 
        },
        {
            header : 'Assign',
            dataKey: 'add', 
            label: 'Add', 
            functionality: {
                
                event: {
                    onClick : (index) => {
                        if(showFormIndex === null)
                            setShowFormIndex(index);
                    },
                },
                action: (currentItem,index) => {
                    return showFormIndex === index && form(currentItem)
                }

            },
            // render: () => {
            //     return <p className='addNewElement w-[5%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> <IoIosAdd size={20} onClick={() => showOverlayForm()} className=' cursor-pointer' /> </p>
            // } 
        },
    ];

    const items = [
        {
            instructorName : 'Anand Pratap Singh Bais',

            emailId : 'anandpsingh7@gmail.com',
            
            password : '1234',

            update : <FaPencilAlt size={14} className=' cursor-pointer' />,

            delete : <FaTrash size={14} className=' cursor-pointer' />,

            courses : <IoIosArrowDown size={14} className=' cursor-pointer' /> ,

            add : <IoIosAdd size={25} className=' cursor-pointer' />,

        },
        {
            instructorName : 'Chotu Don',

            emailId : 'chotudon@gmail.com',
            
            password : 'chotu@don',

            update : <FaPencilAlt size={14} className=' cursor-pointer' />,

            delete : <FaTrash size={14} className=' cursor-pointer' />,

            courses : <IoIosArrowDown size={14} className=' cursor-pointer' /> ,

            add : <IoIosAdd size={25} className=' cursor-pointer' />,

        }
    ];

    const form = (parentData) => { 

        // console.log("Clicked from", parentData);

        return <OverlayForm
                    onClose={() => {
                        setShowFormIndex(null);
                    }}
                    onSubmit={(data) => {
                        // Handle form submission

                    }}
                    formData={formData}
                    parentData={parentData}
                />
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

            <Pagination columns={AdminColumns} items={items} />

            <div className='w-full flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-center items-center text-xl'>
                    <p className='mb-1'>Create Course</p>

                    <button
                    className="relative group"
                    onClick={() => {
                        setShowAddCourse(prev => !prev);
                    }}
                    >
                        <div className="relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-400 dark:bg-slate-800 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
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
                    <form onSubmit={handleSubmit(addCourse)} className='w-full h-[18rem] flex flex-col justify-center items-center pb-[2rem]'>
                        <div className='w-2/3 flex justify-center items-center p-1 space-x-1'>
                            <div className='w-1/2 flex justify-start items-center flex-col'>
                                <Input
                                // label = "Username"
                                type="text"
                                placeholder="Instructor Email Id"
                                {...register("instructorEmailId", {
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

                                <Input
                                // label = "Username"
                                type="text"
                                placeholder="Course Name"
                                {...register("courseName", {
                                    required: true,
                                })}
                                />
                            </div>

                            <div className='w-1/2 h-full flex justify-start flex-col items-start'>
                                <Input
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

                                {/* <Input
                                // label = "Username"
                                type="text"
                                placeholder="No. of Licenses"
                                {...register("username", {
                                    required: true,
                                })}
                                /> */}
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
