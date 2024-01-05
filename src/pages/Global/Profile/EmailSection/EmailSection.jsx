import React, { useState, useEffect } from 'react'

function EmailSection({ data }) {
    const [animatedEmail, setAnimatedEmail] = useState('');
    const heading = 'Email Address';

    useEffect(() => {
        // Function to animate the username letters one by one
        const animatedEmail = () => {
        const emailArray = heading.split('');
        let animatedText = '';

        emailArray.forEach((letter, index) => {
            setTimeout(() => {
            animatedText += letter;
            setAnimatedEmail(animatedText);
            }, index * 100); // Adjust the duration between letters (100ms in this example)
        });
        };

        // Trigger the animation when the component mounts
        animatedEmail();
    }, [heading]);

    return (
        <div className='w-full h-full  rounded-md flex flex-col justify-center items-center'>
            <div className='w-full h-[5.5rem] text-2xl font-bold  flex justify-center items-center'>
                {animatedEmail}
            </div>
            <div className='w-full h-[5.5rem] flex justify-center items-start'>
                {data}
            </div>
        </div>
    )
}

export default EmailSection
