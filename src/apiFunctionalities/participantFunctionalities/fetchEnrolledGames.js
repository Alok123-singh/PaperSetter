import { config } from "../../configurations";
import { AUTH_ENDPOINTS } from "../../apiEndpoints";


// function to fetch all the instructors from the backend
async function fetchEnrolledGames(
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
        const response = await fetch(AUTH_ENDPOINTS.GET_ENROLLED_GAMES(username),{
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            // body: JSON.stringify(data), // Convert the data to a JSON string
        });
        let data = await response.json();
        console.log("Fetch all games data :- ",data);


        if(response.status === 200){
            console.log("Successfully fetched games from backend");
            setData(data);
            // console.log("Fetch all courses data after formatting :- ",items);
        }
        else{
            console.log("Fetched Games from backend Error :- ");
        }

    }
    catch(err){
        console.log("Participant Home Error :",err);
        error.push(err);
    }

    if(error.length > 0){
        setErrors(error);
    }

    setLoading(false);
};

export default fetchEnrolledGames;