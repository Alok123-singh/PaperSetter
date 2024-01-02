import { config } from "../../configurations";
import { INSTRUCTOR_ENDPOINTS } from "../../apiEndpoints";


async function enrollInGame(
    data,
    navigate = (...input) => {},
    dispatch = (...input) => {},
    setData = (...input) => {},
    url = '',
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
) {
    
    let error = [];
    setLoading(true);
    setErrors([]);

    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(INSTRUCTOR_ENDPOINTS.ENROLL_GAME(data.courseCode),{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            // body: JSON.stringify(data), // Convert the data to a JSON string
        });
        const data2 = await response.json();

        
        if(data2.message === undefined){
            dispatch(setData(data2));
            navigate(url);
            console.log("Sucessfully enrolled in game");
        }
        else{
            error.push('Invalid Course Code');
            console.log("Entroll Game backend Error :- ");
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

export default enrollInGame;