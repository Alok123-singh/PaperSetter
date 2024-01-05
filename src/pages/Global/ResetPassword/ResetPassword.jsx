import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Button1, Input1, Loading2 } from "../../../components/index"
import {Controller, useForm} from "react-hook-form"
import { FaCheck } from 'react-icons/fa'; // Import icons for check and cross marks
import { updatePassword, checkEmailForUsernameAndSendOTP, verifyOTP } from '../../../apiFunctionalities'
import { useSelector } from 'react-redux'

function ResetPassword() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {control, register, handleSubmit, watch, reset} = useForm();
    const [errors, setErrors] = useState([]);
    const [messages, setMessages] = useState([]);
    const [step, setStep] = useState(1);
    const [validateByOtp, setValidateByOtp] = useState(false);
    const [validatedAccount, setValidatedAccount] = useState(false);
    const [showVerifyEmail, setShowVerifyEmail] = useState(false);
    const username = useSelector(state => state.auth.username);

    const verifyAccount = async () => {
        const email = watch("email");
        
        const response = await checkEmailForUsernameAndSendOTP(username,email,setLoading,setErrors,setMessages);
        if(response === false){
            setValidatedAccount(false);
        }
        else{
            setValidateByOtp(true);
        }
    };

    const verifyOtp = async () => {
        
        const email = watch('email');
        const otp = watch('otp');

        const response = await verifyOTP(email,otp,errors,setValidateByOtp,setValidatedAccount,setMessages,setLoading,setErrors);

        if(response === false){
            // setStep(step+1);
            setValue('otp','');
        }
    }

    const doResetPassword = async (data) => {
        if(step === 2){
            data.username = username;

            const response = await updatePassword(data,() => {},setLoading,setMessages,setErrors);
            if(response === true){
                alert("Password has been updated successfully");
                navigate("/profile");
            }
        }
    };

    return <div
            className='flex items-center justify-center w-full py-8 dark:bg-gray-400 dark:text-gray-800'
            >
                <div className={`mx-auto w-full lg:w-[30%] max-w-lg bg-gray-100 dark:bg-gray-300 rounded-md p-7 border border-black/10`}>
                    {/* <div className="mb-2 flex justify-center">
                        <span className="w-full flex justify-center items-center">
                            <Link 
                            to = "/"
                            >
                                <Logo width="100%" />
                            </Link>
                        </span>
                    </div> */}
                    <h2 className="text-center text-2xl font-sans leading-tight">
                        Reset Password
                    </h2>

                    {/* Error section */}
                    {(messages && messages.length > 0) && <div className='flex flex-col'>
                        {
                            messages.map((msg,index) => 
                            (<p key={index} className="text-green-600 mt-4 text-center">{msg}</p>))
                        }
                    </div>}

                    {/* Error section */}
                    {(errors && errors.length > 0) && <div className='flex flex-col'>
                        {
                            errors.map((err,index) => 
                            (<p key={index} className="text-red-600 mt-4 text-center">{err}</p>))
                        }
                    </div>}

                    <form onSubmit={handleSubmit(doResetPassword)} className='mt-4'>
                        {step === 1 && 
                            <div className='space-y-7'>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue="" // Initialize the value here
                                    rules={{ required: true }}
                                    
                                    render={({ field, fieldState }) => (
                                    <div className='relative'>
                                        <Input1
                                        label = "Email"
                                        {...field}
                                        onClick={() => {

                                            setShowVerifyEmail(false);
                                        }}
                                        onBlur={() => {
                                            setShowVerifyEmail(true);
                                        }}
                                        disabled={validatedAccount || validateByOtp}
                                        placeholder="Email"
                                        type="text"
                                        className={`${validateByOtp === true ? 'pr-[5.4rem]' : 'pr-[5.4rem]'} ${validatedAccount ? 'text-green-600' : ''}`}
                                        
                                        />
                                        {field.value && (
                                            <span className={`absolute top-1/2 right-2 transform -translate-y-[4px]`}>
                                                {validatedAccount === true ? 
                                                    <FaCheck className='text-green-500 translate-y-1/2' />
                                                    :
                                                    ((watch("email")) && showVerifyEmail === true && !validateByOtp) && 

                                                    <div onClick={() => verifyAccount()} className='cursor-pointer flex flex-col justify-center items-center ml-2'>
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
                                            {...field}
                                            label = "Enter OTP"
                                            onBlur={(e) => (setShowVerifyEmail(true))}
                                            placeholder="Enter OTP"
                                            type="text"
                                            className={`${validateByOtp === true ? 'pr-[5.4rem]' : 'pr-[5.4rem]'}`}
                                            
                                            />
                                            {field.value && (
                                                <span className='absolute top-1/2 right-2 transform -translate-y-[4px]'>
                                                    <div onClick={() => verifyOtp()} className='cursor-pointer flex flex-col justify-center items-center ml-2'>
                                                    <Button1 className='bg-green-500 hover:bg-green-400 rounded-md text-sm font-bold'>Submit</Button1>
                                                    </div>
                                                </span>
                                            )}
                                        </div>
                                        )}
                                    />
                                }

                                <Button1 
                                type="submit" 
                                className="w-full h-[3rem] rounded-sm"
                                onClick={(e) => {
                                    if(validatedAccount){
                                        setStep((prev) => prev + 1);
                                    }
                                }}
                                >
                                    Next
                                </Button1>

                                {loading === true && (
                                    <Loading2 message={!validateByOtp ? 'Sending OTP' : 'Verifying OTP'} />
                                )}
                            </div>
                        }
                        
                        {step === 2 && 
                            <div className='space-y-7'>

                                <div className='relative'>
                                    <Input1
                                        label="New password"
                                        type='password'
                                        placeholder='Enter new Password'
                                        {...register('newPassword', {
                                            required: true,
                                        })}
                                    />
                                    
                                </div>

                                <div className='relative'>
                                    <Input1
                                        label="Confirm new password"
                                        type='password'
                                        placeholder='Confirm password'
                                        {...register('confirmPassword', {
                                            required: true,
                                        })}
                                    />
                                    
                                </div>
        
                                <div className='w-full flex space-x-4'>
                                    <Button1 
                                    type="button" 
                                    className="rounded-sm w-1/2 mr-2 "
                                    onClick={() => setStep(prev => prev-1)}
                                    >
                                        Prev
                                    </Button1>

                                    <button
                                    type="submit"
                                    className="w-1/2 rounded-none py-3 bg-[#ed8d2d]  hover:bg-[#faa148]"
                                    >
                                        Update
                                    </button>
                                </div>

                                {loading === true && (
                                    <Loading2 message='Resetting Password' />
                                )}
                            </div>
                        }
                        
                    </form>
                    
                </div>
                
            
            </div>
};

export default ResetPassword
