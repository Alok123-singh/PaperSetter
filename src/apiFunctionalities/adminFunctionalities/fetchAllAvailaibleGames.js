import { GAME_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function fetchAllAvailaibleGames( 
    setData = (...input) => {},
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
) {

    let error = [];
    setLoading(true);
    // setErrors([]);

    // console.log("Fetch all availaible games from backend data :- ",data);
    
    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(GAME_ENDPOINTS.FETCH_ALL_GAMES,{
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            // body: JSON.stringify(data), // Convert the data to a JSON string
        });
        const data = await response.json();
        
        
        if(data.message === undefined){
            setData(data);
            // console.log("Fetch all games data :- ",data);
            // console.log("Successfully fetched all games from backend");
        }
        else{
            // console.log("Failed fetching all availaible games from backend Error :- ");
        }

    }
    catch(err){
        // console.log("Admin Home Fetch all games Error :",err);
        error.push(err);
    }

    if(error.length > 0){
        setErrors(error);
    }

    setLoading(false);
};

export default fetchAllAvailaibleGames;