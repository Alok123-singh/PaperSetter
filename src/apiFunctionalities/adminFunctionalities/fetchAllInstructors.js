import { ADMIN_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

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

async function fetchAllInstructors( 
    setData = (...input) => {},
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
) {

    let error = [];
    setLoading(true);
    setErrors([]);

    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(ADMIN_ENDPOINTS.GET_INSTRUCTORS,{
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            // body: JSON.stringify(data), // Convert the data to a JSON string
        });
        let data = await response.json();
        console.log("Fetch all instructors data :- ",data);

        // convert startTime and endTime in data from ISO String format to required Date object
        const formatData = () => {
            data.courseEntities = data.courseEntities.map(item => {

                item.startTime = convertIsoStringToObject(item.startTime);
                item.endTime = convertIsoStringToObject(item.endTime);

                return (item);
            });
        }

        
        if(data.message === undefined){
            console.log("Successfully fetched instructor data");
            // formatData();
            setData(data);
            
        }
        else{
            console.log("Failed fetching All Instructors from backend Error :- ");
        }

    }
    catch(err){
        console.log("Admin Home Fetch all instructors Error :",err);
        error.push(err);
    }

    if(error.length > 0){
        setErrors(error);
    }

    setLoading(false);
};

export default fetchAllInstructors;