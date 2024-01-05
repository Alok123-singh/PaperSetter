import React, { useState } from 'react'
import { ThemeButton, Loading1, Button1 } from '../../../components/index';
import { useNavigate } from 'react-router-dom';

function Settings() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [selectedOption, setSelectedOption] = useState('theme');

    const profileOptions = [
        { id: 'theme', label: 'Theme', },
        { id: 'enableNotifications', label: 'Enable Notifications', },
    ];

    return loading ? (
        <Loading1 />
    ) : 
    (
        <div className="flex w-full flex-col sm:flex-row my-5 justify-center items-center">
            <div className='w-[98%] rounded-sm sm:w-1/2 border border-gray-300 p-2 flex flex-col sm:flex-row justify-center items-center'>

                {/* Left-hand side with options */}
                <div className="w-[95%] sm:w-1/3 p-4 bg-blue-500 rounded-sm">
                    {profileOptions.map((option) => (
                        <div
                            key={option.id}
                            className={`relative pl-4 py-2 mb-2 cursor-pointer ${
                            selectedOption === option.id ? 'bg-white text-blue-500 rounded-sm transform scale-105 transition-transform' : 'text-white hover:bg-blue-700'
                            }`}
                            onClick={() => {
                            setSelectedOption(option.id);
                            if(option.id === 'password')
                                navigate("/profile/reset-password");
                            }}
                        >
                            <div
                            className={`absolute left-0 top-0 h-full w-1 bg-white transition-all transition-transfor ${
                                selectedOption === option.id ? 'w-4' : 'w-0 '
                            }`}
                            />
                            {option.label}
                        </div>
                    ))}
                </div>

                {/* Right-hand side with selected option details */}
                <div className="w-[96%] sm:w-2/3 p-1">

                    {selectedOption === 'theme' && 
                        <div 
                        >
                            <ThemeButton activate={false} />
                        </div>
                    }

                    {selectedOption === 'enableNotifications' && 
                        <div 
                        className='w-full flex justify-center items-center'
                        >
                            <Button1
                                className='bg-blue-500 hover:bg-blue-400 rounded-md'
                            >
                                Enable
                            </Button1>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
};

export default Settings;