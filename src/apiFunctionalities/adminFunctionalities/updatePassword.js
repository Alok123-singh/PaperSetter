import { config } from "../../configurations";
import { AUTH_ENDPOINTS } from "../../apiEndpoints";

function convertTimeObjectToIsoString(isoString) {
    // Create a new Date object from the ISO string
    const dateObject = new Date(isoString);
  
    // Check if the dateObject is valid
    if (isNaN(dateObject.getTime())) {
      console.error('Invalid date format');
      return null;
    }
  
    // Use toISOString() to get the ISO string representation
    const formattedString = dateObject.toISOString();
  
    // Extract the date and time part from the ISO string
    const desiredFormat = formattedString.slice(0, 19);
  
    return desiredFormat;
}

async function updatePassword(
    data,
    setRefreshData = (...input) => {},
    setLoading = (...input) => {}, 
    setMessages = (...input) => {},
    setErrors = (...input) => {},
) {
    
    setLoading(true);
    console.log(data);
    // setErrors([]);

    let errors = [];
    let messages = [];

    // if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#(){}[\]:;<>,.?/~_+\-=|\\\"'`!^&*()$%^,{}?<>_])[A-Za-z\d@$!%*?&^#(){}[\]:;<>,.?/~_+\-=|\\\"'`!^&*()$%^,{}?<>_ ]{5,}$/.test(data.newPassword)) {
    //     errors.push("New password must have at least 1 special character, 1 small alphabet, 1 capital alphabet, 1 digit, and at least 5 characters long");
    //     setLoading(false);
    //     setErrors(errors);
    //     return;
    // }

    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(AUTH_ENDPOINTS.UPDATE_PASSWORD,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            body: JSON.stringify(data), // Convert the data to a JSON string
        });
        // const data2 = await response.json();
        console.log("Response",response);
        
        if(response.status === 200){
            
            // alert('Password has been successfully updated');
            messages.push(`Successfully updated password of ${data.username} with ${data.newPassword}.`);
            console.log("Update Successfull");
        }
        else{
            errors.push('Password updation failed.');
            console.log("Update Failed");
        }

    }
    catch(error){
        console.log("Update Password Error :",error);
        errors.push(error);
    }

    if (errors.length > 0) {
        setErrors(errors);
    }

    if (messages.length > 0) {
        setMessages(messages);
    }

    setLoading(false);
};

export default updatePassword;