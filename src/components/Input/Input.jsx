import React, { useId, useState } from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const [showPassword,setShowPassword] = useState(false);
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1 font-semibold' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type === 'password' ? (showPassword === true ? 'text' : 'password') : type}
            className={`px-3 py-4 rounded-md bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-300 w-full placeholder:text-gray-500 ${className}`}
            ref={ref}
            {...props}
            id={id}
            />

            {type === 'password' && 
            <div
            className='absolute top-1/2 right-7 transform -translate-y-1/2 cursor-pointer'
            onClick={() => setShowPassword(prev => !prev)}
            >
                {showPassword ? (
                <span role="img" aria-label="Hide Password" className='text-gray-600'>👁️</span>
                ) : (
                <span role="img" aria-label="Show Password" className='text-gray-600'>👁️‍🗨️</span>
                )}
            </div>
            }
            
        </div>
    )
})


export default Input