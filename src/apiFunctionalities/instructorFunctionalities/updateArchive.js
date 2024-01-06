import { INSTRUCTOR_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function updateArchive( 
    data,
    email,
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
    setMessages = (...input) => {},
) {

    setLoading(true);
    setErrors('');
    let messages = [];
    let errors = [];
    let status = false;
    
    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(INSTRUCTOR_ENDPOINTS.UPDATE_ARCHIVE(data.archive,email,data.courseCode),{
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            // body: JSON.stringify(data), // Convert the data to a JSON string
        });

        if(response.status === 200){
            // console.log("Successfully updated archive value");
            messages.push(`Successfully updated archive value to '${data.archive}' for Course Code '${data.courseCode}'`);
            status = true;
        }
        else{
            // console.log("Failed updating archive value");
            errors.push("Archive updation failed");
            status = false;
        }

    }
    catch(err){
        // console.log("Update archive error :",err);
        errors.push("Archive updation failed");
        status = false;
    }

    setLoading(false);
    setMessages(messages);
    setErrors(errors);

    return (status);
};

export default updateArchive;