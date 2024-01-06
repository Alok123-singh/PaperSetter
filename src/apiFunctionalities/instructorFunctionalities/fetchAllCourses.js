import { config } from "../../configurations";
import { INSTRUCTOR_ENDPOINTS } from "../../apiEndpoints";

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


// function to fetch all the instructors from the backend
async function fetchAllCourses(
    username, 
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
    setData = (...input) => {},
) {
    let error = [];
    setLoading(true);
    // setErrors([]);

    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(INSTRUCTOR_ENDPOINTS.GET_COURSES(username),{
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            // body: JSON.stringify(data), // Convert the data to a JSON string
        });
        let data = await response.json();
        // console.log("Fetch all courses data :- ",data);

        // convert startTime and endTime in data from ISO String format to required Date object
        const formatData = () => {
            data.courseEntities = data.courseEntities.map(item => {

                item.startTime = convertIsoStringToObject(item.startTime);
                item.endTime = convertIsoStringToObject(item.endTime);
                // item.courseCode = generateUniqueCourseCode();

                return (item);
            });
        }

        
        if(data.message === undefined){
            // console.log("Successfully fetched courses from backend");
            formatData();
            setData(data.courseEntities);
            // console.log("Fetch all courses data after formatting :- ",items);
        }
        else{
            // console.log("Fetched Courses from backend Error :- ");
        }

    }
    catch(err){
        // console.log("Instructor Home Error :",err);
        error.push(err);
    }

    if(error.length > 0){
        setErrors(error);
    }

    setLoading(false);
};

export default fetchAllCourses;