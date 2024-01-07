import { AUTH_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function saveProfilePicture( 
    username,
    file,
    setLoading = (...input) => {},
    setMessages = (...input) => {},
    setErrors = (...input) => {},
) {

    let errors = [];
    let message = [];
    let status = false;

    setLoading(true);
    
    setErrors(prev => prev.filter(err => err !== 'Please upload picture of size less than 1 Mb'));
    setMessages(prev => prev.filter(msg => msg !== 'Profile picture saved successfully'));


    try{
        const formData = new FormData();
        formData.append('file', file);

        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(AUTH_ENDPOINTS.SAVE_PICTURE(username),{
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            body: formData, // Convert the data to a JSON string
        });

        
        if(response.status === 200){

            message.push("Profile picture saved successfully")
            status = true;
        }
        else{
            errors.push('Please upload picture of size less than 1 Mb');
        }

    }
    catch(error){
        // console.log("Profile Picture Error :",error);
        // errors.push(error);
    }

    if(errors.length > 0){
        setErrors(errors);
    }

    if(message.length > 0){
        setMessages(message);
    }

    setLoading(false);

    return (status);
};

export default saveProfilePicture;