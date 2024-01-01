import { GAME_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function fetchHistory( 
    username,
    setData = (...input) => {},
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
) {

    setLoading(true);
    setErrors('');

    let errors = [];

    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(GAME_ENDPOINTS.FETCH_HISTORY(username), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`,
            },
        });
        const data = await response.json();

        if(data.length !== 0)
        setData(data.reverse());

    }
    catch(err){
        errors.push(err);
        console.log("History error :",err);
    }

    if(errors.length > 0){
        setErrors(errors);
    }

    setLoading(false);
};

export default fetchHistory;