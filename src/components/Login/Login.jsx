import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Input, Logo} from "../index.js"
import {useForm} from "react-hook-form"

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {control, register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setLoading(true);
        console.log(data);
        setError("")

        try{
            const credentials = btoa('5595832005:5dceeeb7-47f3-4dc9-8f00-2845af1da8d2');
            const response = await fetch('http://localhost:8082/simlearn/authentication/api/v1/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                    'Authorization': `Basic ${credentials}`,
                    // Add any other headers if needed
                },
                body: JSON.stringify(data), // Convert the data to a JSON string
            });
            const data2 = await response.json();
            
            if(data2 === true){
                console.log("Login Successfull");
                navigate('/');
            }
            else{
                setError('Invalid username or password');
                console.log("Login Failed");
            }

        }
        catch(error){
            console.log("Login Error :",error);
            setError(error);
        }
        setLoading(false);
    }

    return loading ? (
        <div className='dark:bg-gray-400 w-full flex justify-center items-center h-[10rem]'>
        <div className='bg-blue-400 w-[6rem] flex justify-center items-center p-2 m-2 rounded-md'> Loading! </div>
        </div>

    ) : 
    (
        <div
        className='flex items-center justify-center w-full py-8 dark:bg-gray-400 dark:text-gray-800'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 dark:bg-gray-300 rounded-xl p-7 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="w-full flex justify-center items-center">
                        <Link 
                        to = "/"
                        >
                            <Logo width="100%" />
                        </Link>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
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
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-7'>
                        <Input
                        // label = "Username"
                        type="text"
                        placeholder="Username"
                        {...register("username", {
                            required: true,
                        })}
                        
                        />

                        <Input
                        // label="Password: "
                        type="text"
                        placeholder="Password"
                        {...register("password", {
                            required: true,
                        })}
                        />

                        <Button
                        type="submit"
                        className="w-full"
                        >Sign in</Button>
                    </div>
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