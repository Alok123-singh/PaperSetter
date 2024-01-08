import { config } from "../../configurations";
import { ADMIN_ENDPOINTS } from "../../apiEndpoints";
import { set } from "react-hook-form";

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

async function createNewCourse(
    data,
    setRefreshData = (...input) => {},
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
    setMessages = (...input) => {},
) {
    
    let messages = [];
    let errors = [];
    setLoading(true);
    let status = false;

    console.log("New course data", data);    
    // console.log("startTime :-", data.startTime);
    data.startTime = convertTimeObjectToIsoString(data.startTime[0]);
    data.endTime = convertTimeObjectToIsoString(data.endTime[0]);
    // console.log("Type of startTime :-", typeof data.startTime);
    // console.log("startTime :-", data.startTime);
    // console.log("Create new course form data :- ",data);
    // return;

    setErrors(prev => prev.filter(err => err !== 'Number of groups of five can not be -1' && err !== 'Number of groups of fpur can not be -1'));

    if(data.groupOfFive === -1 || data.groupOfFour === -1){
        errors.push(`${data.groupOfFive === -1 && 'Number of groups of five can not be -1'}`)
        errors.push(`${data.groupOfFour === -1 && 'Number of groups of four can not be -1'}`)
        setErrors(errors);
        setLoading(false);
        return (status);
    }

    // console.log("Licenses", data.licenses);
    // console.log("Groups of five", data.groupOfFive);
    // console.log("Groups of four", data.groupOfFour);

    if(Number(data.licenses) !== (5*Number(data.groupOfFive) + 4*Number(data.groupOfFour))){
        errors.push(`Number of licenses are not correctly distributed among groups of five and four for values Licenses (${data.licenses}), Number of groups of five (${data.groupOfFive}) and Number of groups of four (${data.groupOfFour})`);
        setErrors(errors);
        setLoading(false);
        return (status);
    }
    
    // console.log("Create new course form data :- ",data);
    
    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(ADMIN_ENDPOINTS.CREATE_COURSE,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            body: JSON.stringify(data), // Convert the data to a JSON string
        });

        
        if(response.status === 200){
            setRefreshData(prev =>!prev);
            messages.push(`Successfully create new course and assigned ${data.courseName} with course code ${data.courseCode} having course duration from ${formatToCustomString(data.startTime)} to ${formatToCustomString(data.endTime)}, to Instructor ${data.fullName} with email id ${data.assignToEmail} with number of licenses ${data.licenses}`)

            // console.log("For submitted to backend");
            status = true;
        }
        else{
            const data1 = await response.json();
            errors.push(data1.message);
            // console.log("Form Submit to backend Error :- ");
            status = false;
        }

    }
    catch(err){
        // console.log("Admin Home Error :",err);
        errors.push(err);
        status = false;
    }

    if(messages.length > 0){
        setMessages(messages);
    }

    if(errors.length > 0){
        setErrors(errors);
    }

    setLoading(false);

    return (status);
};

export default createNewCourse;