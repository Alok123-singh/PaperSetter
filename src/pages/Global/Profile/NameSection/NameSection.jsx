import React, { useState, useEffect } from 'react'

function NameSection({ data }) {
    const [animatedName, setAnimatedName] = useState('');
    const heading = 'Full Name'

    useEffect(() => {
        // Function to animate the username letters one by one
        const animatedName = () => {
        const nameArray = heading.split('');
        let animatedText = '';

        nameArray.forEach((letter, index) => {
            setTimeout(() => {
            animatedText += letter;
            setAnimatedName(animatedText);
            }, index * 100); // Adjust the duration between letters (100ms in this example)
        });
        };

        // Trigger the animation when the component mounts
        animatedName();
    }, [heading]);

    return (
        <div className='w-full h-full  rounded-md flex flex-col justify-center items-center'>
            <div className='w-full h-[5.5rem] text-2xl font-bold  flex justify-center items-center'>
                {animatedName}
            </div>
            <div className='w-full h-[5.5rem] flex justify-center items-start'>
                {data}
            </div>
        </div>
    )
};

export default NameSection;