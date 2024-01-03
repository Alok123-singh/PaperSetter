import React, { useState, useId } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button1, Input1, Logo, Loading2 } from "../../../components/index.js"
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setLoginStatus, setRole, setEmail, setFullName } from '../../../store/authSlice.js'
// import { MdAutorenew } from 'react-icons/md';
import { ROLES } from '../../../roles/index.js';
import { login } from '../../../apiFunctionalities'


function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {register, handleSubmit, watch, reset} = useForm();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [step,setStep] = useState(1);
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const [validateByOtp,setValidateByOtp] = useState(false);

    const [input,setInput] = useState({
        // defaultValue : 'INSTRUCTOR',
        options : [ROLES.INSTRUCTOR,ROLES.PARTICIPANT],
        label: 'Login As ',
        required : true,
    });
    const id = useId();

    const doLogin = async(data) => {

        login(data, email, ROLES, validateByOtp, setValidateByOtp, dispatch, navigate, reset, setMessage, setUsername, setLoginStatus, setRole, setEmail, setFullName, setStep, setLoading, setError);

    };

    return (
        <div
        className={`${loading === true && 'cursor-wait'} flex w-full py-8 items-center justify-center dark:bg-gray-400 dark:text-gray-800`}
        >
            <div className={`mx-auto w-full lg:w-[30%] max-w-lg bg-gray-100 dark:bg-gray-300 rounded-md p-7 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="w-full flex justify-center items-center">
                        <Link 
                        to = "/"
                        >
                            <Logo width="100%" />
                        </Link>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-sans leading-tight">
                    Login
                </h2>
                <p className="mt-2 text-center text-base text-black/60 font-bold">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {message && <p className="text-green-600 mt-8 text-center">{message}</p>}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(doLogin)} className='mt-5'>
                    {step === 1 && 
                        <div className='space-y-7 w-full flex flex-col justify-center items-center '>
                            <div className="w-full flex flex-col justify-around items-center ">
                                {input.label && (
                                    <label className='w-full flex justify-center mb-5 items-center font-bold' htmlFor={id}>
                                        <div className=''>
                                            {input.label}
            
                                        </div>
                                    </label>
                                )}
                                <div className='w-full flex justify-between items-center'>
                                    {input.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center mb-2 sm:mb-0">
                                            <input
                                            type="radio"
                                            id={`${optionIndex}`}
                                            name="role"
                                            value={option}
                                            defaultChecked={input.defaultValue && option === input.defaultValue ? true : false}
                                            className="hidden"
                                            {...register('role', {
                                                required: input.required,
                                            })}
                                            />
                                            <label
                                            htmlFor={`${optionIndex}`}
                                            className={`cursor-pointer flex items-center space-x-2 p-2 border rounded-md transition duration-300 ${
                                                watch('role') === option ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:bg-gray-100'
                                            }`}
                                            >
                                            <div className={`w-5 h-5 flex items-center justify-center border rounded-full transition duration-300 ${watch('role') === option ? 'border-blue-500' : 'border-gray-400'}`}>
                                                {watch('role') === option && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                                            </div>
                                            <span className="text-sm">{option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button1 
                            type="submit" 
                            className="w-full h-[3rem] rounded-sm"
                            onClick={(e) => {
                                if(watch('role'))
                                    setStep((prev) => prev + 1);
                            }}
                            >
                                Next
                            </Button1>
                        </div>
                    }

                    {step === 2 && 
                        <div className='space-y-7 '>
                            <Input1
                            // label = "Username"
                            type="text"
                            placeholder="Username"
                            {...register("username", {
                                required: true,
                            })}
                            
                            />

                            <div className='relative'>
                                <Input1
                                    type='password'
                                    placeholder='Password'
                                    {...register('password', {
                                    required: true,
                                    })}
                                />
                                
                            </div>

                            {validateByOtp && 
                                <Input1
                                type='text'
                                placeholder='Enter OTP'
                                {...register('otp', {
                                required: validateByOtp,
                                })}
                            />
                            }

                            <div className='w-full flex space-x-4'>

                                <button
                                onClick={() => setStep(prev => prev-1)}
                                type="button"
                                className="w-full rounded-none py-3 bg-blue-600 text-white  hover:bg-blue-500"
                                >
                                    Back

                                </button>

                                <button
                                type="submit"
                                className="w-full rounded-none py-3 bg-[#ed8d2d]  hover:bg-[#faa148]"
                                >
                                    {validateByOtp === true ? 'Submit OTP' : 'Log in'}

                                </button>

                            </div>

                            {loading === true && (
                                <Loading2 />
                            )}
                        

                        </div>
                    }
                    
                </form>

                <button 
                className='text-blue mt-7 pl-1 text-red-600'
                type='button'
                onClick={() => navigate('/reset-password')}
                >
                    Forgot password &#63;
                </button>

            </div>
            
        
        </div>
    )
}

export default Login