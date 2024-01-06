import React, { useState } from 'react'
import { Loading2, Logo, Input1, Button1 } from '../../../components'
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa'; // Import icons for check and cross marks
import { verifyOTP, checkEmailForUsernameAndSendOTP, updatePassword } from '../../../apiFunctionalities'
 
function ForgotPassword() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {control, register, handleSubmit, watch, reset, setValue} = useForm();
    const [errors, setErrors] = useState([]);
    const [messages, setMessages] = useState([]);
    const [validateByOtp,setValidateByOtp] = useState(false);
    const [validatedAccount, setValidatedAccount] = useState(false);
    const [showVerifyEmail, setShowVerifyEmail] = useState(false);
    const [step, setStep] = useState(1);
    

    const verifyAccount = async () => {
        const username = watch("username");
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

    const doUpdatePassword = async (data) => {
        
        if(step === 2){

            const response = await updatePassword(data,() => {},setLoading,setMessages,setErrors);
            if(response === true){
                alert("Password has been updated successfully");
                navigate("/login");
            }
        }
    };

    return <div
        className={`${loading === true && 'cursor-wait'} flex w-full py-8 items-center justify-center dark:bg-gray-400 dark:text-gray-800`}
        >
            <div className={`mx-auto w-full lg:w-[30%] max-w-lg bg-gray-100 dark:bg-gray-300 rounded-md p-7 border border-black/10`}>

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
                <h2 className="text-center text-2xl font-sans leading-tight">
                    Forgot Password
                </h2>

                {/* Messages section */}
                {(messages && messages.length > 0) && <div className='flex flex-col'>
                    {
                        messages.map((message,index) => 
                        (<p key={index} className="text-green-600 mt-4 text-center">{message}</p>))
                    }
                </div>}
                
                {/* Error section */}
                {(errors && errors.length > 0) && <div className='flex flex-col'>
                    {
                        errors.map((err,index) => 
                        (<p key={index} className="text-red-600 mt-4 text-center">{err}</p>))
                    }
                </div>}

                <form onSubmit={handleSubmit(doUpdatePassword)} className='mt-5'>

                    {step === 1 && 
                    <div className='space-y-7'>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue="" // Initialize the value here
                            rules={{ required: true }}
                            
                            render={({ field, fieldState }) => (
                            <div className='relative'>
                                <Input1
                                label = "Username"
                                {...field}
                                placeholder="Username"
                                type="text"
                                disabled={validatedAccount || validateByOtp}
                                className={`${validatedAccount ? 'text-green-600' : ''}`}
                                
                                />
                                {field.value && (
                                    <span className='absolute top-1/2 right-3 transform translate-y-1/3'>
                                        {validatedAccount && (
                                            <FaCheck className='text-green-500' />
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
                                className={`${showVerifyEmail === true ? 'pr-[5.4rem]' : ''} ${validatedAccount ? 'text-green-600' : ''}`}
                                
                                />
                                {field.value && (
                                    <span className={`absolute top-1/2 right-2 transform -translate-y-[4px]`}>
                                        {validatedAccount === true ? 
                                            <FaCheck className='text-green-500 translate-y-1/2' />
                                            :
                                            ((watch("username") && watch("email")) && showVerifyEmail === true && !validateByOtp) && 

                                            <div onClick={() => verifyAccount()} className='cursor-pointer flex flex-col justify-center items-center ml-2'>
                                                {/* <RiMailCheckLine className='text-red-500 mr-1' /> */}
                                                <Button1 className='bg-green-500 border-green-400 hover:bg-green-400 rounded-md text-sm'>Verify</Button1>
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
                                    className={`${showVerifyEmail === true ? 'pr-[5.4rem]' : ''}`}
                                    
                                    />
                                    {field.value && (
                                        <span className='absolute top-1/2 right-2 transform -translate-y-[4px]'>
                                            <div onClick={() => verifyOtp()} className='cursor-pointer flex flex-col justify-center items-center ml-2'>
                                            <Button1 className='bg-green-500 border-green-400 hover:bg-green-400 rounded-md text-sm'>Submit</Button1>
                                            </div>
                                        </span>
                                    )}
                                </div>
                                )}
                            />
                        }

                        <Button1 
                        type="submit" 
                        className="w-full"
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
                            className="w-1/2 mr-2 "
                            onClick={() => setStep(prev => prev-1)}
                            >
                                Prev
                            </Button1>

                            <button
                            type="submit"
                            className="w-1/2 rounded-md py-3 bg-[#ed8d2d]  hover:bg-[#faa148]"
                            >
                                Update
                            </button>
                        </div>
                        

                        {loading === true && (
                            <Loading2 message='Updating Password' />
                        )}
                    </div>
                    }
                    
                </form>

            </div>
            
        
        </div>
    
};

export default ForgotPassword;