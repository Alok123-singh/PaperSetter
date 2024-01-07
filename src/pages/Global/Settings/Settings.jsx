import React, { useState } from 'react'
import { ThemeButton, Loading1, Button1, Button2 } from '../../../components/index';
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
            <div className='w-[98%] rounded-sm sm:w-1/2 border border-gray-300 p-2 pl-0 flex flex-col sm:flex-row justify-center items-center'>

            <div className="w-full lg:w-1/3 p-1 flex flex-col justify-start items-center">
                {/* Left-hand side with options */}
                <div className="w-[95%] ">
                        {profileOptions.map((option) => (
                        <div
                            key={option.id}
                            className={`relative pl-4 py-2 mb-2 cursor-pointer border border-gray-400 hover:bg-gray-200  ${
                            selectedOption === option.id ? ' rounded-sm bg-gray-200 ' : ''
                            }`}
                            onClick={() => {
                            setSelectedOption(option.id);
                            if (option.id === 'password') navigate('/profile/reset-password');
                            }}
                        >
                            <div
                            className={`h-full w-1 bg-white  ${
                                selectedOption === option.id ? 'w-4 ' : 'w-0'
                            }`}
                            />
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right-hand side with selected option details */}
                <div className="w-full cursor-default h-auto md:h-[6rem] bg-gray-100 hover:bg-slate-100 rounded-md flex justify-center items-start lg:w-2/3 ">
                    <div className="w-[96%] h-full sm:w-1/2 p-1 flex flex-col justify-center items-start">
                        {/* Render the selected option component based on the state */}
                        {selectedOption === 'theme' && 
                            <div 
                            className='w-full flex justify-center items-center'
                            >
                                <ThemeButton activate={false} />
                            </div>
                        }
                        {selectedOption === 'enableNotifications' && 
                        <div 
                            className='w-full flex justify-center items-center'
                            >
                                <Button2
                                    className=''
                                >
                                    Enable
                                </Button2>
                            </div>
                        }
                    </div>
                </div>

                
            </div>
        </div>
    )
};

export default Settings;