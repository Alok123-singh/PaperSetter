import React, { useState, useEffect } from 'react'

function PictureSection({data}) {
    const [animatedPicture, setAnimatedPicture] = useState('');
    const heading = 'Picture';

    useEffect(() => {
        // Function to animate the username letters one by one
        const animatedPicture = () => {
        const pictureArray = heading.split('');
        let animatedText = '';

        pictureArray.forEach((letter, index) => {
            setTimeout(() => {
            animatedText += letter;
            setAnimatedPicture(animatedText);
            }, index * 100); // Adjust the duration between letters (100ms in this example)
        });
        };

        // Trigger the animation when the component mounts
        animatedPicture();
    }, [heading]);

    return (
        <div className='w-full h-full  rounded-md flex flex-col justify-center items-center'>
            <div className='w-full h-[5.5rem] text-2xl font-bold  flex justify-center items-center'>
                {animatedPicture}
            </div>
            <div className='w-full h-[5.5rem] flex justify-center items-start'>
                {data}
            </div>
        </div>
    )
};

export default PictureSection;
