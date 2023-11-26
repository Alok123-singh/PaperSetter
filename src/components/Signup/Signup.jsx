import React, {useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {Button, Input, Logo} from '../index.js'
import {useForm, Controller} from 'react-hook-form'

function Signup() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [error, setError] = useState([])
    const {control, register, handleSubmit} = useForm();
    const [usernameAvailability, setUsernameAvailability] = useState(false);
    const [step,setStep] = useState(1);

    const checkUsernameAvailability = async (username) => {
        if(username === '') return;

        let errors = [];
        
        try {
            const credentials = btoa('5595832005:5dceeeb7-47f3-4dc9-8f00-2845af1da8d2');
            const response = await fetch(`http://localhost:8082/simlearn/authentication/api/v1/username/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`,
                },
            });
            const data = await response.json();
            
            if (!data) {
                errors.push('Username is not availaible');
                setUsernameAvailability(false);
                console.log("Username not availaible");

            } else {
                setError([]);
                setUsernameAvailability(true);
                console.log("Username is availaible");
            }
        }
        catch (error) {
            console.error('Error checking username availability:', error);
        }

        if(errors.length > 0){
            setError(errors);
        }
    };


    const create = async(data) => {
        setLoading(true);
        setError("");

        const errors = [];

        if(usernameAvailability === false){
            errors.push("Username not availaible");
        }
        
        // Validation for First Name
        if (!/^[a-zA-Z]{2,}$/.test(data.firstName)) {
            errors.push("First name must have at least 2 character long");
        }

        // Validation for Last Name
        if (!/^[a-zA-Z]{2,}$/.test(data.lastName)) {
            errors.push("Last name must have at least 2 character long");
        }

        // Validation for Username
        if (!/^[a-zA-Z0-9]{2,}$/.test(data.username)) {
            errors.push("Username must be at least 2 characters long");
        }

        // Validation for Email
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
            errors.push("Email address must be a valid address");
        }

        // Validation for Password
        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/.test(data.password)) {
            errors.push("Password must have at least 1 special character, 1 small alphabet, 1 capital alphabet, 1 digit, and at least 5 characters long");
        }

        // console.log("Data",JSON.stringify(data));

        try{
            if(usernameAvailability === true && errors.length === 0){
                const credentials = btoa('5595832005:5dceeeb7-47f3-4dc9-8f00-2845af1da8d2');
                const response = await fetch('http://localhost:8082/simlearn/authentication/api/v1/account',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type as JSON
                        'Authorization': `Basic ${credentials}`,
                        // Add any other headers if needed
                    },
                    body: JSON.stringify(data), // Convert the data to a JSON string
                });

                
                if(response.status === 201){
                    console.log("Account Created");
                    alert('Your account has been created');
                    navigate('/login');
                }
            }
            else{
                setStep(prev => prev-1);
            }

        }
        catch(error){
            console.log("Create Account Error :",error);
            errors.push(error);
        }

        if (errors.length > 0) {
            setError(errors);
        }

        setLoading(false);
    }

    return loading ? (
        <div className='dark:bg-gray-400  w-full flex justify-center items-center h-[10rem]'>
            <div className='bg-blue-400 w-[6rem] flex justify-center items-center p-2 m-2 rounded-md'>
                Loading! 
            </div>
        </div>
    ) : 
    (
        <div className="flex items-center justify-center dark:bg-gray-400 dark:text-gray-800 py-8">
            <div className={`mx-auto w-full max-w-lg bg-gray-50 dark:bg-gray-300 rounded-xl p-7 border border-black/10`}>
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
                    Create Account 
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
                
                {(error && error.length > 0) && <div className='flex flex-col'>
                    {
                        error.map((err) => (<p className="text-red-600 mt-4 text-center">{err}</p>))
                    }
                </div>}

                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-7'>
                        {step === 1 && (
                        <div className='space-y-7'>
                            <Input
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

                            <Input
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

                            <Button 
                            type="button" 
                            className="w-full"
                            onClick={() => setStep(prev => prev+1)}
                            >
                                Next
                            </Button>

                        </div>)}

                        {step === 2 && 
                        <div className='space-y-7'>
                            <Controller
                                name="username"
                                control={control}
                                defaultValue="" // Initialize the value here
                                
                                render={({ field, fieldState }) => (
                                <div>
                                    <Input
                                    // label = "Username"
                                    {...field}
                                    onBlur={(e) => checkUsernameAvailability(e.target.value)}
                                    placeholder="Username"
                                    type="text"
                                    
                                    />
                                    {/* {fieldState.error && <p>This username is not available.</p>}
                                    {usernameAvailability === false && (
                                        <p className="text-red-600 mt-2">This username is not available.</p>
                                    )} */}
                                </div>
                                )}
                            />

                            <Input
                            // label="Email: "
                            placeholder="Email"
                            type="text"
                            {...register("email", {
                                required: true,
                                // validate: {
                                //     matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                //     "Email address must be a valid address",
                                // }
                            })}
                            />

                            <Input
                            // label="Password: "
                            type="text"
                            placeholder="Password"
                            {...register("password", {
                                required: true,
                                // validate:{
                                //     matchPatern: (value) => /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})$/.test(value) || 
                                //     "Password must have at least 1 special character, 1 small alphabet, 1 capital alphabet, 1 digit and at least 5 characters long",
                                // }
                                
                            })}
                            />
                            <div className='flex justify-between'>
                                <Button 
                                type="button" 
                                className="w-1/2 mr-2 "
                                onClick={() => setStep(prev => prev-1)}
                                >
                                    Prev
                                </Button>

                                <Button type="submit" 
                                className="w-1/2 bg-green-500"
                                >
                                    Submit
                                </Button>
                            </div>
                            
                        </div>}
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup