import { config } from "../../configurations";
import { GAME_ENDPOINTS } from "../../apiEndpoints";

function convertIsoStringToObject(isoString) {
    // Create a new Date object from the ISO string
    const dateObject = new Date(isoString);
  
    // Check if the dateObject is valid
    if (isNaN(dateObject.getTime())) {
      console.error('Invalid ISO format');
      return null;
    }
  
    // Use toISOString() to get the ISO string representation
    const formattedString = dateObject.toISOString();
  
    // Extract the date and time part from the ISO string
    const desiredFormat = formattedString.slice(0, 19);
  
    // Create an array with the desired format
    const resultArray = [dateObject];
  
    return resultArray;
}

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


// function to fetch all the instructors from the backend
async function fetchHistoryBasedOnCourseCode(
    courseCode, 
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
    setData = (...input) => {},
) {
    let error = [];
    setLoading(true);
    // setErrors([]);

    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(GAME_ENDPOINTS.FETCH_HISTORY_BASED_ON_COURSE_CODE(courseCode),{
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            // body: JSON.stringify(data), // Convert the data to a JSON string
        });

        // convert time in data from ISO String format to required format string object
        const formatData = (data) => {
            data = data.map(item => {

                item.time = convertTimeObjectToIsoString(convertIsoStringToObject(item.time));

                return (item);
            });
        }

        
        if(response.status === 200){
            let data = await response.json();
            console.log("Fetch all history based on course code data :- ",data);

            
            console.log("Successfully fetched complete history based on course code from backend");
            formatData(data);
            setData(data);
            // console.log("Fetch all courses data after formatting :- ",items);
        }
        else{
            console.log("Fetched All History from backend Error :- ");
        }

    }
    catch(err){
        console.log("Enrolled Students Page Error :",err);
        error.push(err);
    }

    if(error.length > 0){
        setErrors(error);
    }

    setLoading(false);
};

export default fetchHistoryBasedOnCourseCode;