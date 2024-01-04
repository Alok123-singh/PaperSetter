import { INSTRUCTOR_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

function formatToCustomString(dateTimeString) {
    // Try to parse the input string into a Date object
    const dateObject = new Date(dateTimeString);
  
    // Check if the parsing was successful and it's a valid Date object
    if (!isNaN(dateObject.getTime())) {
      // If it's a valid Date object, return the custom formatted string
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      return dateObject.toLocaleString('en-US', options);
    } else {
      // If parsing fails, return the original input (or handle it as needed)
      return dateTimeString;
    }
}

async function updateSchedule( 
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
        const response = await fetch(INSTRUCTOR_ENDPOINTS.UPDATE_SCHEDULE(data.startTime,data.endTime,email,data.courseCode),{
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            // body: JSON.stringify(data), // Convert the data to a JSON string
        });

        if(response.status === 200){
            console.log("Successfully updated archive value");
            messages.push(`Successfully updated schedule to (Start time : '${formatToCustomString(data.startTime)}' and End time : '${formatToCustomString(data.endTime)}' for Course Code '${data.courseCode}'`);
            status = true;
        }
        else{
            console.log("Failed updating schedule value");
            errors.push("Schedule updation failed");
            status = false;
        }

    }
    catch(err){
        console.log("Update schedule error :",err);
        errors.push("Schedule updation failed");
        status = false;
    }

    setLoading(false);
    setMessages(messages);
    setErrors(errors);

    return (status);
};

export default updateSchedule;