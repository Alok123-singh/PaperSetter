import { config } from "../../configurations";
import { INSTRUCTOR_ENDPOINTS } from "../../apiEndpoints";

async function deleteInstructorAccount(
    data, 
    setRefreshData = (...input) => {},
    setLoading = (...input) => {}, 
    setMessages = (...input) => {},
    setErrors = (...input) => {},
) {
    let error = [];
    let messages = [];
    setLoading(true);
    // setErrors([]);

    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(INSTRUCTOR_ENDPOINTS.DELETE_INSTRUCTOR(data.username),{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            // body: JSON.stringify(data), // Convert the data to a JSON string
        });
        
        if(response.status === 200){
            setRefreshData(prev => !prev);
            messages.push(`Sucessfully deleted instructor with name ${data.fullName} and email Id ${data.email}`)
            // console.log("Successfully Deleted user");
        }
        else{
            // console.log("Failed on deleting user");
        }

    }
    catch(err){
        // console.log("Admin Home Delete user Error :",err);
        error.push(err);
    }

    if(error.length > 0){
        setErrors(error);
    }

    if (messages.length > 0) {
        setMessages(messages);
    }

    setLoading(false);
};

export default deleteInstructorAccount;