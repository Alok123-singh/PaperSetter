import React,{ useState } from 'react'
import { FaPencilAlt, FaTrash   } from 'react-icons/fa';
import { IoIosArrowDown, IoIosAdd } from 'react-icons/io';
import {useForm} from "react-hook-form"
import { Input, Button } from '../../../components/index'


function AdminHome() {

    const [showAddCourse, setShowAddCourse] = useState(false);
    const {register, handleSubmit} = useForm()
    const [showPassword,setShowPassword] = useState(false);

    const addCourse = () => {

    };

    return (
        <div className='w-full space-y-7 h-auto py-10 px-2 flex flex-wrap flex-col justify-center items-center'>
            <div className='w-full flex justify-between items-center'>
                <div>
                    <h1 className="text-4xl font-bold">Admin Home</h1>
                </div>

                <div className='flex flex-col justify-center items-center text-xl font-sans'>
                    <p className='mb-1'>Create Course</p>

                    <button className={`w-[5rem] h-[2.2rem] cursor-pointer text-sm mt-4 lg:mt-0 text-center bg-red-500 hover:bg-red-400 text-slate-100 font-bold border-b-4 border-red-700 hover:border-red-500 rounded `}
                    onClick={() => setShowAddCourse(prev => !prev)}
                    >
                        Add
                    </button>
                </div>

            </div>

            {showAddCourse && (
                <form onSubmit={handleSubmit(addCourse)} className='w-full flex flex-col justify-center items-center pt-[2rem] pb-[4rem]'>
                    <div className='w-full flex justify-center items-center p-1 space-x-1'>
                        <div className='w-1/2 flex justify-start items-center flex-col'>
                            <Input
                            // label = "Username"
                            type="text"
                            placeholder="Instructor Email Id"
                            {...register("username", {
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
                            {...register("username", {
                                required: true,
                            })}
                            />
                        </div>

                        <div className='w-1/2 flex justify-start flex-col'>
                            <Input
                            // label = "Username"
                            type="text"
                            placeholder="Instructor Name"
                            {...register("username", {
                                required: true,
                            })}
                            />

                            <Input
                            // label = "Username"
                            type="text"
                            placeholder="E Learning"
                            {...register("username", {
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
                            />
                        </div>
                    </div>

                    <div className='w-[9rem] flex justify-center items-center mt-2'>
                        <Button
                        type="submit"
                        className="w-full"
                        >
                            Create
                        </Button>
                    </div>
                    
                </form>
            )}

            <div className='w-full flex font-mono flex-col justify-center items-center border border-blue-300 '>
                <div className='w-full flex justify-center text-center bg-blue-400 items-center'>
                    <p className='w-[25%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Instructor Name </p>
                    <p className='w-[30%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Email Id </p>
                    <p className='w-[20%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Password </p>
                    <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Update </p>
                    <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Delete </p>
                    <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Courses </p>
                    <p className='w-[5%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> + </p>
                </div>

                <div className='w-full flex justify-center text-center items-center'>
                    <p className='w-[25%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> Anand Pratap Singh Bais </p>
                    <p className='w-[30%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> anandpsingh7@gmail.com </p>
                    <p className='w-[20%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> 1234 </p>
                    <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300 '> <FaPencilAlt size={15} className=' cursor-pointer' /> </p>
                    <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300 '> <FaTrash size={15} className=' cursor-pointer' /> </p>
                    <p className='w-[10%] h-[3rem] p-1 border flex justify-center items-center border-blue-300 '> <IoIosArrowDown size={15} className=' cursor-pointer' /> </p>
                    <p className='w-[5%] h-[3rem] p-1 border flex justify-center items-center border-blue-300'> <IoIosAdd size={20} className=' cursor-pointer' /> </p>
                </div>
            </div>
            
        </div>
    )
};

export default AdminHome
