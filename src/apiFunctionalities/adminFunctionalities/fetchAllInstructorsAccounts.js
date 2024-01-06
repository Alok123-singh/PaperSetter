import { AUTH_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function fetchAllInstructorsAccounts( 
    setData = (...input) => {},
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
) {

    let error = [];
    setLoading(true);
    // setErrors([]);

    // console.log("Fetch all instructor accounts data :- ",data);
    
    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(AUTH_ENDPOINTS.GET_INSTRUCTORS_ACCOUNTS,{
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
            // console.log("Fetch all instructors accounts data :- ",data);
            // console.log("Successfully fetched all instructors accounts from backend");
        }
        else{
            // console.log("Failed fetching all instructor account from backend Error :- ");
        }

    }
    catch(err){
        // console.log("Admin Home Fetch all instructor accounts Error :",err);
        error.push(err);
    }

    if(error.length > 0){
        setErrors(error);
    }

    setLoading(false);
};

export default fetchAllInstructorsAccounts;