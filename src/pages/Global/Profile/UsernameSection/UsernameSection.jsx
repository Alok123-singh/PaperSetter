import React, { useState, useEffect } from 'react'

function UsernameSection({ data }) {

    const [animatedUsername, setAnimatedUsername] = useState('');
    const heading = "Username";

    useEffect(() => {
        // Function to animate the username letters one by one
        const animateUsername = () => {
        const usernameArray = heading.split('');
        let animatedText = '';

        usernameArray.forEach((letter, index) => {
            setTimeout(() => {
            animatedText += letter;
            setAnimatedUsername(animatedText);
            }, index * 100); // Adjust the duration between letters (100ms in this example)
        });
        };

        // Trigger the animation when the component mounts
        animateUsername();
    }, [heading]);

    return (
        <div className='w-full h-full  rounded-md flex flex-col justify-center items-center'>
            <div className='w-full h-[5.5rem] text-2xl font-bold  flex justify-center items-center'>
                {animatedUsername}
            </div>
            <div className='w-full h-[5.5rem] flex justify-center items-start'>
                {data}
            </div>
        </div>
    )
}

export default UsernameSection
