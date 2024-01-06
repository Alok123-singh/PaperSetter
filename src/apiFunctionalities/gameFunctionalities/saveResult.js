import { GAME_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function saveResult( 
    data,
    length,
    url = '',
    dispatch = (...input) => {},
    navigate = (...input) => {},
    setData = (...input) => {},
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
) {

    setLoading(true);
    // setErrors('');
    // console.log("Result Data",JSON.stringify(data));
    
    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(GAME_ENDPOINTS.SAVE_RESULT,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            body: JSON.stringify(data), // Convert the data to a JSON string
        });

        if(response.status === 201){
            // console.log("Result saved");
            dispatch(setData({noOfQueries: length, score: data.score, title: data.examType, resultDescription: data.resultDescription}))
            navigate(url);
        }

    }
    catch(err){
        dispatch(setData({noOfQueries: length, score: data.score, title: data.examType, resultDescription: data.resultDescription}))
        navigate(url);
        // console.log("Save result error :",err);
    }

    setLoading(false);
};

export default saveResult;