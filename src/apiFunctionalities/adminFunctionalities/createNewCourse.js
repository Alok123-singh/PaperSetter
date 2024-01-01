import { config } from "../../configurations";
import { ADMIN_ENDPOINTS } from "../../apiEndpoints";

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

async function createNewCourse(
    data,
    username,
    setRefreshData = (...input) => {},
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
) {
    
    let error = [];
    setLoading(true);
    setErrors([]);
    console.log("startTime :-", data.startTime);
    data.startTime = convertTimeObjectToIsoString(data.startTime[0]);
    data.endTime = convertTimeObjectToIsoString(data.endTime[0]);
    // console.log("Type of startTime :-", typeof data.startTime);
    console.log("startTime :-", data.startTime);
    // console.log("Create new course form data :- ",data);
    

    data.username = username;
    console.log("Create new course form data :- ",data);
    
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
            console.log("For submitted to backend");
        }
        else{
            console.log("Form Submit to backend Error :- ");
        }

    }
    catch(err){
        console.log("Admin Home Error :",err);
        error.push(err);
    }

    if(error.length > 0){
        setErrors(error);
    }

    setLoading(false);
};

export default createNewCourse;