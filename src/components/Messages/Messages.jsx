import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';


const Messages = ({ messages, messageType, setMessages, appearanceTime = 10, autoClose = true, width='', height = ''}) => {
    const [visibleMessages, setVisibleMessages] = useState(messages);
    const [showCloseButton, setShowCloseButton] = useState(!autoClose);


    // use this useEffect if you want all messages to disappear at the same time
    useEffect(() => {
        if(autoClose === true){
            // Calculate the time when all messages should be removed
            const removalTime = Date.now() + appearanceTime * 1000;
        
            // Function to remove all messages
            const removeAllMessages = () => {
                setMessages([]);
            };

            // Create a single timer for all messages
            const timer = setTimeout(() => {
                removeAllMessages();
            }, appearanceTime * 1000);
        
            return () => {
                clearTimeout(timer);
            };
        }
    
    }, [visibleMessages, messages]);

    //use this useEffect if you want messages to disappear one by one
    // useEffect(() => {
    //     if(autoClose){
    //         const timers = visibleMessages.map((_, index) => {
    //             return setTimeout(() => {
    //                 removeMessage(index);
    //             }, appearanceTime*1000);
    //         });
        
    //         return () => {
    //             timers.forEach((timer) => clearTimeout(timer));
    //         };
    //     }
        
    // }, [visibleMessages]);

    const removeMessage = (index) => {
        setVisibleMessages(prevMessages => {
            const updatedMessages = [...prevMessages];
            updatedMessages.splice(index, 1);
            setMessages(updatedMessages); // Update the state based on the previous state
            return updatedMessages;
        });
    };

    return (
        <div 
        onMouseEnter={() => autoClose === true && setShowCloseButton(true)}
        onMouseLeave={() => autoClose === true && setShowCloseButton(false)}
        className={`w-[98%] md:w-[90%] cursor-default space-y-4 ${width}`}
        >
            {visibleMessages.map((message, index) => (
                <div
                key={index}
                className={`w-full h-auto ${height} px-2 ${autoClose === false && 'p-3'} rounded-md flex justify-between items-center ${
                    messageType === 'success'
                    ? ' border border-green-700 hover:bg-green-100 hover:text-green-700'
                    : 'border border-red-700 hover:bg-red-100 hover:text-red-700'
                } relative`}
                >
                    <div className={`w-[90%] md:w-[90%] flex justify-start items-center ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </div>
                    <div className={`${showCloseButton === true ? 'w-[15%]' : 'w-[10%]'} md:w-[10%] h-full flex justify-end items-center`}>
                        {showCloseButton === true && 
                            <button 
                            className='flex cursor-pointer justify-end items-center'
                            onClick={() => removeMessage(index)}
                            >
                                <FaTimes className={`border w-[1.3rem] h-[1.3rem] md:w-[1.7rem] md:h-[1.7rem] ${messageType === 'success' ? 'border-green-600 hover:bg-green-200 text-green-600' : 'border-red-500 hover:bg-red-200 text-red-600'}`} size={25} />
                            </button>
                        }
                        {autoClose === true && 
                            <svg
                                className="w-[3rem] circle-animation"
                                viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    animation: `circleAnimation ${appearanceTime}s linear infinite`,
                                }}
                            >
                                <circle cx="50" cy="50" r="20" fill="transparent" stroke={messageType === 'success' ? '#2ec734' : '#e8544a'} strokeWidth="10" />
                            </svg>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Messages;
