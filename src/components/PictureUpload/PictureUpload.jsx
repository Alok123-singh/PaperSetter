import React, { useState, useRef } from 'react'
import { saveProfilePicture } from '../../apiFunctionalities'
import { useSelector } from 'react-redux';
import { Button3, Loading2 } from '../index'

function PictureUpload( {
    setRefreshData = (...input) => {},
    setMessages = (...input) => {},
    setErrors = (...input) => {},
} ) {
    const [loading, setLoading] = useState(false);
    const username = useSelector(state => state.auth.username);
    const fileInputRef = useRef(null);


    const handleUpload = async () => {

        const selectedFile = fileInputRef.current?.files[0];

        if(!selectedFile){
            let errors = [];
            errors.push("Please upload you profile picture");
            setErrors(errors);
            return;
        }

        const response = await saveProfilePicture(username,selectedFile,setLoading,setMessages,setErrors);

        if(response === true){
            setRefreshData(prev => !prev);
        }
        else{
            
        }
    };

    return (
        <div className='w-full flex flex-col justify-center items-center'>

            
            <input
            type="file"
            onChange={() => handleUpload()}
            className="hidden"
            ref={fileInputRef}
            />

            <Button3
            className=''
            onClick={() => fileInputRef.current.click()}
            >
                Upload
            </Button3>

            {loading === true &&
                <Loading2 message='Saving' />
            }
        </div>
    );
};

export default PictureUpload;
