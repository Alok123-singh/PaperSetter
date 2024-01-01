import React, { useState, useId } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {Button1, Input1, Logo, Loading1} from '../../../components/index'
import {useForm, Controller} from 'react-hook-form'
import { FaCheck, FaTimes } from 'react-icons/fa'; // Import icons for check and cross marks
import { AUTH_ENDPOINTS } from '../../../apiEndpoints/index';
import { config } from '../../../configurations'
import { ROLES } from '../../../roles/index'
import { RiMailCheckLine } from 'react-icons/ri'; // Assuming you have the appropriate icon installed
import { checkUsernameAvailability, checkEmailAvailability, sendOTP, verifyOTP, createAccount } from '../../../apiFunctionalities'


function Signup() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [error, setError] = useState([]);
    const [messages, setMessages] = useState([]);
    const {control, register, handleSubmit, watch, reset} = useForm();
    const [usernameAvailability, setUsernameAvailability] = useState(true);
    const [emailAvailability, setEmailAvailability] = useState(true);
    const [step,setStep] = useState(1);
    const [validateByOtp, setValidateByOtp] = useState(false);
    const [validated, setValidated] = useState(false);
    const [showVerifyEmail, setShowVerifyEmail] = useState(false);

    const [input,setInput] = useState({
        // defaultValue : 'Instructor',
        options : [ROLES.INSTRUCTOR,ROLES.PARTICIPANT],
        // label: 'Signup As : ',
        required : true,
    });
    const id = useId();

    const checkUsername = async (username) => {
        
        checkUsernameAvailability(username, error, setUsernameAvailability, setError);
    };

    const checkEmail = async (email) => {

        checkEmailAvailability(email,error,setEmailAvailability,setShowVerifyEmail,setError);
    };

    const sendOtp = async () => {

        const email = watch('email');
        sendOTP(email,error,setValidateByOtp,setMessages,setLoading,setError);
    }

    const verifyOtp = async () => {
        
        const email = watch('email');
        const otp = watch('otp');

        verifyOTP(email,otp,error,setValidateByOtp,setValidated,setMessages,setLoading,setError);
    }

    const create = async (data) => {

        createAccount(data,ROLES,usernameAvailability,navigate,setStep,reset,setValidateByOtp,setShowVerifyEmail,setMessages,setLoading,setError);
    }


    return loading ? (
        <Loading1 />
    ) : 
    (
        <div className="flex items-center justify-center dark:bg-gray-400 dark:text-gray-800 py-8">
            <div className={`mx-auto  w-full sm:w-[50%] lg:w-[30%] max-w-lg bg-gray-50 dark:bg-gray-300 rounded-md p-7 border border-black/10`}>

                {/* Logo section */}
                <div className="mb-2 flex justify-center">
                    <span className="w-full flex justify-center items-center">
                        <Link 
                        to = "/"
                        >
                            <Logo width="100%" />
                        </Link>
                    </span>
                </div>
                <h2 className="text-center text-2xl leading-tight font-sans">
                    Create a New Account 
                </h2>
                <p className="mt-2 text-center text-base text-black/60 font-bold">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Messages section */}
                {(messages && messages.length > 0) && <div className='flex flex-col'>
                    {
                        messages.map((message,index) => 
                        (<p key={index} className="text-green-600 mt-4 text-center">{message}</p>))
                    }
                </div>}
                
                {/* Error section */}
                {(error && error.length > 0) && <div className='flex flex-col'>
                    {
                        error.map((err,index) => 
                        (<p key={index} className="text-red-600 mt-4 text-center">{err}</p>))
                    }
                </div>}

                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-7'>
                        {step === 1 && (
                        <div className='space-y-7'>
                            <Input1
                            type="text"
                            // label="First Name: "
                            placeholder="First name"
                            {...register("firstName", {
                                required: true,
                                // validate: {
                                //     matchPatern: (value) => /^[a-zA-Z]{2,}$/.test(value) || "First name must have at least 1 character"
                                // }
                            })}
                            />

                            <Input1
                            type="text"
                            // label="Last Name: "
                            placeholder="Last name"
                            {...register("lastName", {
                                required: true,
                                // validate: {
                                //     matchPatern: (value) => /^[a-zA-Z]{2,}$/.test(value) || "Last name must have at least 1 character"
                                // }
                            })}
                            />

                            <div className='space-y-7 w-full flex flex-col justify-center items-center '>
                                <div className="w-full flex flex-row justify-between items-center ">
                                    {input.label && (
                                        <label className=' pl-1 flex justify-start items-center font-semibold' htmlFor={id}>
                                            <div className=''>
                                                {input.label}
                                            </div>
                                        </label>
                                    )}

                                    {input.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center mb-2 sm:mb-0">
                                            <input
                                            type="radio"
                                            id={`${optionIndex}`}
                                            name="roleName"
                                            value={option}
                                            defaultChecked={input.defaultValue && option === input.defaultValue ? true : false}
                                            className="hidden"
                                            {...register('roleName', {
                                                required: input.required,
                                            })}
                                            />
                                            <label
                                            htmlFor={`${optionIndex}`}
                                            className={`cursor-pointer flex items-center space-x-2 p-2 border rounded-md transition duration-300 ${
                                                watch('roleName') === option ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:bg-gray-100'
                                            } `}
                                            >
                                            <div className={`w-5 h-5 flex items-center justify-center border rounded-full transition duration-300 ${watch('roleName') === option ? 'border-blue-500' : 'border-gray-400'}`}>
                                                {watch('roleName') === option && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                                            </div>
                                            <span className="text-sm">{option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}</span>
                                            </label>
                                        </div>
                                    ))}

                                </div>

                                <Button1 
                                type="submit" 
                                className="w-full h-[3rem] rounded-sm"
                                onClick={(e) => {
                                    if(watch('roleName'))
                                        setStep((prev) => prev + 1);
                                }}
                                >
                                    Next
                                </Button1>
                            </div>

                        </div>)}

                        {step === 2 && 
                        <div className='space-y-7'>
                            <Controller
                                name="username"
                                control={control}
                                defaultValue="" // Initialize the value here
                                rules={{ required: true }}
                                render={({ field, fieldState }) => (
                                <div className='relative'>
                                    <Input1
                                    // label = "Username"
                                    {...field}
                                    onBlur={(e) => {
                                        // setValidateByOtp(false);
                                        // if(validated === true)
                                        //     setValidated(false);
                                        // setShowVerifyEmail(false);
                                        checkUsername(e.target.value);
                                    }}
                                    placeholder="Username"
                                    type="text"
                                    className={`${usernameAvailability ? 'text-green-600' : 'text-red-500'}`}
                                    
                                    />
                                    {/* {fieldState.error && <p>This username is not available.</p>}
                                    {usernameAvailability === false && (
                                        <p className="text-red-600 mt-2">This username is not available.</p>
                                    )} */}
                                    {field.value && (
                                        <span className='absolute top-1/2 right-3 transform -translate-y-1/2'>
                                            {usernameAvailability ? (
                                                <FaCheck className='text-green-500' />
                                            ) : (
                                                <FaTimes className='text-red-500' />
                                            )}
                                        </span>
                                    )}
                                </div>
                                )}
                            />

                            <Controller
                                name="email"
                                control={control}
                                defaultValue="" // Initialize the value here
                                rules={{ required: true }}
                                
                                // disabled={validated}
                                render={({ field, fieldState }) => (
                                <div className='relative'>
                                    <Input1
                                    // label = "Username"
                                    {...field}
                                    onBlur={(e) => {
                                        // setValidateByOtp(false);
                                        // if(validated === true)
                                        //     setValidated(false);
                                        checkEmail(e.target.value);
                                        if(emailAvailability === true)
                                            setShowVerifyEmail(true);
                                    }}
                                    onClick={() => {
                                        // if(emailAvailability === true)
                                        //     setShowVerifyEmail(true);
                                    }}
                                    placeholder="Email"
                                    type="text"
                                    className={`${validateByOtp === true ? 'pr-[5.4rem]' : 'pr-[5.4rem]'} ${emailAvailability ? 'text-green-600' : 'text-red-500'}`}
                                    disabled={validated}
                                    
                                    />
                                    {field.value && (
                                        <span className={`absolute top-1/2 right-2 transform -translate-y-1/2`}>
                                            {validated === true ? 
                                                <FaCheck className='text-green-500' />
                                                :
                                                (showVerifyEmail === true && validateByOtp === false) && 

                                                <div onClick={() => sendOtp()} className='cursor-pointer flex flex-col justify-center items-center ml-2'>
                                                    {/* <RiMailCheckLine className='text-red-500 mr-1' /> */}
                                                    <Button1 className='bg-green-500 hover:bg-green-400 rounded-md text-sm font-bold'>Verify</Button1>
                                                </div>
                                            }
                                            
                                        </span>
                                    )}
                                </div>
                                )}
                            />

                            {validateByOtp && 
                                <Controller
                                    name="otp"
                                    control={control}
                                    defaultValue="" // Initialize the value here
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                    <div className='relative'>
                                        <Input1
                                        // label = "Username"
                                        {...field}
                                        onBlur={(e) => (setShowVerifyEmail(true))}
                                        placeholder="Enter OTP"
                                        type="text"
                                        className={`${validateByOtp === true ? 'pr-[5.4rem]' : 'pr-[5.4rem]'}`}
                                        
                                        />
                                        {field.value && (
                                            <span className='absolute top-1/2 right-2 transform -translate-y-1/2'>
                                                <div onClick={() => verifyOtp()} className='cursor-pointer flex flex-col justify-center items-center ml-2'>
                                                <Button1 className='bg-green-500 hover:bg-green-400 rounded-md text-sm font-bold'>Submit</Button1>
                                                </div>
                                            </span>
                                        )}
                                    </div>
                                    )}
                                />
                            }
                            

                            <div className='relative'>
                                <Input1
                                    type='password'
                                    placeholder='Password'
                                    disabled={!validated}
                                    {...register('password', {
                                        required: true,
                                    })}
                                />
                                
                            </div>

                            <div className='flex justify-between'>
                                <Button1 
                                type="button" 
                                className="rounded-sm w-1/2 mr-2 "
                                onClick={() => setStep(prev => prev-1)}
                                >
                                    Prev
                                </Button1>

                                <Button1 type="submit" 
                                className="rounded-sm w-1/2 bg-green-500 hover:bg-green-400"
                                >
                                    Submit
                                </Button1>
                            </div>
                            
                        </div>}
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup