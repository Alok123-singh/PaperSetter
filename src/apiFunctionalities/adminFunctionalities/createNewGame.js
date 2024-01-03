import { config } from "../../configurations";
import { GAME_ENDPOINTS } from "../../apiEndpoints";

async function createNewGame(
    data,
    setRefreshData = (...input) => {},
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
) {
    
    let error = [];
    setLoading(true);
    setErrors([]);

    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(GAME_ENDPOINTS.CREATE_NEW_GAME,{
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
            console.log("Form submitted to backend");
        }
        else{
            const data1 = await response.json();
            error.push(data1.message);
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

export default createNewGame;