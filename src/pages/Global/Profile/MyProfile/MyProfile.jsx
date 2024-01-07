import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button3, PictureUpload, Messages } from '../../../../components';
import { useNavigate } from 'react-router-dom';
import { getProfilePicture } from '../../../../apiFunctionalities';
import { ROLES } from '../../../../roles'
import { setLoginStatus } from '../../../../store/authSlice'
import { DefaultPicture } from '../../../../assets'

function MyProfile() {
    const username = useSelector((state) => state.auth.username);
    const email = useSelector((state) => state.auth.email);
    const fullName = useSelector((state) => state.auth.fullName);
    const role = useSelector((state) => state.auth.role);
    const [profilePicture, setProfilePicture] = useState(null);
    const [refreshData, setRefreshData] = useState();


    const [errors, setErrors] = useState([]);
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('email'); // Set the default selected option to 'picture'

    const profileOptions = [
        { id: 'email', label: 'Email' },
        // { id: 'picture', label: 'Picture' },
        { id: 'username', label: 'Username' },
        { id: 'password', label: 'Reset Password' },
    ];

    useEffect(() => {
        // Fetch profile picture when the component mounts
        const fetchProfilePicture = async () => {
        const response = await getProfilePicture(username, setProfilePicture, setLoading, setMessages, setErrors);

        if (response) {
            // Handle successful response if needed
        }
        };

        fetchProfilePicture();
    }, [refreshData]);

    return (
        <div className="flex w-full h-auto flex-col my-5 justify-center items-center">
            <div className='w-full h-auto mb-4 flex justify-center items-center'>
                {role === ROLES.PARTICIPANT && 
                    <p className='text-3xl font-bold text-rose-500'>
                        Student Profile
                    </p>
                }

                {role === ROLES.INSTRUCTOR && 
                    <p className='text-3xl font-bold text-rose-500'>
                        Instructor Profile
                    </p>
                }

                {role === ROLES.ADMIN && 
                    <p className='text-3xl font-bold text-rose-500'>
                        Admin Profile
                    </p>
                }
            </div>

            <div className={`w-3/4 flex justify-center items-center ${(messages.length > 0 || errors.length > 0) && 'mb-9'}`}>
                {messages.length > 0 && 
                    <div className='w-full flex justify-center items-center mt-2'>
                        <Messages messages={messages} messageType='success' setMessages={setMessages} appearanceTime={10} height='min-h-[3rem]' />
                    </div>
                }

                {errors.length > 0 && 
                    <div className='w-full flex justify-center items-center mt-4'>
                        <Messages messages={errors} messageType='errors' setMessages={setErrors} appearanceTime={10} height='min-h-[3rem]'  />
                    </div>
                }
            </div>

            <div className="w-full h-full lg:w-3/5 rounded-lg border border-orange-500 border-b border-r border-b-blue-500 border-r-blue-500 p-4 pl-0 flex flex-col md:flex-row justify-center items-center">

                {/* Left-hand side with profile picture, name, and options */}
                <div className="w-full lg:w-1/3 p-1 flex flex-col justify-start items-center">
                    {/* Show Profile picture section */}
                    <div className="mb-2">
                        {profilePicture !== null ? (
                        <div className="w-full flex justify-start items-center">
                            <img
                            src={profilePicture}
                            alt="Profile"
                            className="rounded-md  object-contains w-[8.5rem] h-[10rem] max-w-[9rem] max-h-[10rem]"
                            />
                        </div>
                        ) : (
                        <div className="w-full flex justify-center items-center">
                            <img
                            src={DefaultPicture} // Replace with the path to your default photo
                            alt="Default Profile"
                            className="rounded-xl  object-contains w-[8.5rem] h-[9rem] max-w-[9rem] max-h-[10rem]"
                            />
                        </div>
                        )}
                    </div>

                    {/* Name Section */}
                    <div className="">
                        <div className='w-full rounded-md flex flex-col justify-center items-center'>
                            {/* <div className='w-full text-2xl font-bold  flex justify-center items-center'>
                                Full Name
                            </div> */}
                            <div className='w-full font-bold text-lg flex justify-center items-start'>
                                {fullName}
                            </div>
                        </div>
                    </div>

                    {/* Options for Upload Picture and Logout */}
                    <div className="mb-5 mt-3 flex justify-center items-center">
                        <div className='w-1/2'>
                            <PictureUpload setRefreshData={setRefreshData} setMessages={setMessages} setErrors={setErrors} />
                        </div>

                        <div className='w-1/2 ml-2'>
                            <Button3
                            className='from-red-500 to-blue-400 group-hover:from-red-500 group-hover:to-blue-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800'
                            onClick={() => {
                                dispatch(setLoginStatus(false))
                            }}
                            >
                                Logout
                            </Button3>
                            
                        </div>

                        {/* <Button1
                        className=""
                        onClick={() => {
                            // Add your logout logic here
                        }}
                        >
                            Logout
                        </Button1> */}
                    </div>

                    {/* Left-hand side options */}
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
                <div className="w-full cursor-default h-auto md:h-[25rem] bg-gray-100 hover:bg-slate-100 rounded-md flex justify-center items-start lg:w-2/3 ">
                    <div className="w-[96%] h-full sm:w-1/2 p-1 flex flex-col justify-center items-start">
                        {/* Render the selected option component based on the state */}
                        {selectedOption === 'email' && 
                            <div className='w-full h-full rounded-md flex flex-col justify-start items-center'>
                                <div className='w-full underline mb-2 text-3xl font-bold text-blue-500 flex justify-center items-center'>
                                    Email
                                </div>
                                <div className='w-full font-semibold flex justify-center items-center'>
                                    {email}
                                </div>
                            </div>
                        }
                        {selectedOption === 'username' && 
                            <div className='w-full h-full  rounded-md flex flex-col justify-start items-center'>
                                <div className='w-full underline mb-2  text-3xl font-bold text-blue-500 flex justify-center items-center'>
                                    Username
                                </div>
                                <div className='w-full font-semibold flex justify-center items-start'>
                                    {username}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                
            </div>
        </div>
  );
}

export default MyProfile;
