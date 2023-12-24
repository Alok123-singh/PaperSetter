import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button1, Input1, Logo, Loading1} from "../../../components/index"
import {useForm} from "react-hook-form"

function ResetPassword() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState([]);

    const reset = async (data) => {
        setLoading(true);
        console.log(data);
        setError('');

        let errors = [];

        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#(){}[\]:;<>,.?/~_+\-=|\\\"'`!^&*()$%^,{}?<>_])[A-Za-z\d@$!%*?&^#(){}[\]:;<>,.?/~_+\-=|\\\"'`!^&*()$%^,{}?<>_ ]{5,}$/.test(data.newPassword)) {
            setError("New password must have at least 1 special character, 1 small alphabet, 1 capital alphabet, 1 digit, and at least 5 characters long");
            setLoading(false);
            return;
        }

        try{
            const credentials = btoa('5595832005:5dceeeb7-47f3-4dc9-8f00-2845af1da8d2');
            const response = await fetch('http://localhost:8082/simlearn/authentication/api/v1/password',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                    'Authorization': `Basic ${credentials}`,
                    // Add any other headers if needed
                },
                body: JSON.stringify(data), // Convert the data to a JSON string
            });
            // const data2 = await response.json();
            console.log("Response",response);
            
            if(response.status === 200){
                alert('Password has been reset');
                console.log("Reset Successfull");
                navigate('/login');
            }
            else{
                errors.push('Invalid username or password');
                console.log("Reset Failed");
            }

        }
        catch(error){
            console.log("Reset Password Error :",error);
            errors.push(error);
        }

        if (errors.length > 0) {
            setError(errors);
        }

        setLoading(false);
    };

    return (
        loading ? (
            <Loading1 />
    
        ) : 
        (
            <div
            className='flex items-center justify-center w-full py-8 dark:bg-gray-400 dark:text-gray-800'
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
                        Reset Password
                    </h2>
                    {(error && error.length > 0) && <div className='flex flex-col'>
                        {
                            error.map((err,index) => 
                            (<p key={index} className="text-red-600 mt-4 text-center">{err}</p>))
                        }
                    </div>}
                    <form onSubmit={handleSubmit(reset)} className='mt-4'>
                        <div className='space-y-7'>
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
                                    placeholder='Old password'
                                    {...register('oldPassword', {
                                        required: true,
                                    })}
                                />

                            </div>

                            <div className='relative'>
                                <Input1
                                    type='password'
                                    placeholder='New password'
                                    {...register('newPassword', {
                                        required: true,
                                    })}
                                />
                            </div>
    
                            <Button1
                            type="submit"
                            className="w-full"
                            >Reset</Button1>
                        </div>
                    </form>
                    
                </div>
                
            
            </div>
        )
    )
}

export default ResetPassword
