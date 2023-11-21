import React, {useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {Button, Input, Logo} from '../index.js'
import {useForm} from 'react-hook-form'

function Signup() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setLoading(true);
        setError("")

        if(data.name.length === 0){
            alert('Enter your name');
            setLoading(false);
            return;
        }
        if(data.password.length === 0){
            alert('Enter your password');
            setLoading(false);
            return;
        }
        try {
            setLoading(false);
            
        } catch (error) {
            setError(error.message)
            setLoading(false);
        }
    }

  return loading ? (
        <div className='dark:bg-gray-400  w-full flex justify-center items-center h-[10rem]'>
        <div className='bg-blue-400 w-[6rem] flex justify-center items-center p-2 m-2 rounded-md'> Loading! </div>
        </div>

    ) : 
    (
        <div className="flex items-center justify-center dark:bg-slate-600 dark:text-gray-800 py-10">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 dark:bg-slate-400 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                        <span className="w-full flex justify-center items-center">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60 font-bold">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                    <form onSubmit={handleSubmit(create)}>
                        <div className='space-y-5'>
                            <Input
                            type="text"
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: false,
                            })}
                            />
                            <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                            />
                            <Input
                            label="Password: "
                            type="text"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: false,
                                
                            })}
                            />
                            <Button type="submit" className="w-full">
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>

        </div>
    )
}

export default Signup