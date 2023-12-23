import React, { useId, useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const Input = React.forwardRef(function Input(
    { 
        label, 
        type = 'text', 
        className = '', 
        ...props 
    }, 
    ref
    ) {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedDate, setSelectedDate] = useState(props.defaultValue !== undefined ? props.defaultValue : null);
    // console.log("Input Props", props);

    const id = useId();

    const renderInput = () => {
        if (type === 'password') {
            return (
                <div className='relative'>
                    {label && (
                        <label className='mb-1 pl-1 flex justify-start items-center font-semibold' htmlFor={id}>
                            <div className=''>
                                {label}

                            </div>
                            {props.required && 
                                <p className='text-red-400 mb-3 ml-1'>
                                    *
                                </p>
                            }
                        </label>
                    )}
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={`px-3 py-4 rounded-md bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-300 w-full placeholder:text-gray-500 ${className}`}
                        ref={ref}
                        {...props}
                        id={id}
                    />

                    <div
                        className={`absolute ${label && 'translate-y-1/4 '} top-1/2 right-2 transform -translate-y-1/2 cursor-pointer`}
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? (
                        <span role='img' aria-label='Hide Password' className='text-gray-600'>
                            👁️
                        </span>
                        ) : (
                        <span role='img' aria-label='Show Password' className='text-gray-600'>
                            👁️‍🗨️
                        </span>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className='flex flex-col justify-start items-start'>
                {label && (
                    <label className='mb-1 pl-1 flex justify-start items-center font-semibold' htmlFor={id}>
                        <div className=''>
                            {label}

                        </div>
                        {props.required && 
                            <p className='text-red-400 mb-3 ml-1'>
                                *
                            </p>
                        }
                    </label>
                )}
                <input
                type={type}
                className={`px-3 py-4 rounded-md bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-400 w-full placeholder:text-gray-500 ${className}`}
                ref={ref}
                {...props}
                id={id}
                />
            </div>
        );
    };

    return <div className=' w-full'>{renderInput()}</div>;
});

export default Input;
