import { AUTH_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function getProfilePicture( 
    username,
    setData,
    setLoading = (...input) => {},
    setMessages = (...input) => {},
    setErrors = (...input) => {},
) {

    let errors = [];
    let message = [];
    let status = false;

    setLoading(true);
    
    setErrors(prev => prev.filter(err => err !== 'Error while fetching profile picture'));
    // setMessages(prev => prev.filter(msg => msg !== ''));


    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(AUTH_ENDPOINTS.GET_PICTURE(username),{
            method: 'GET',
            headers: {
                // 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
        });

        
        if(response.status === 200){
            const data = await response.blob(); // Assuming the data is in binary format
            if(data.size > 0) setData(URL.createObjectURL(data));
            status = true;
        }
        else{
            errors.push('Error while fetching profile picture');
        }

    }
    catch(error){
        // console.log("Get Profile Picture Error :",error);
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

export default getProfilePicture;