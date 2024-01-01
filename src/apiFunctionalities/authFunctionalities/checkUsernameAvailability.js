import { AUTH_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function checkUsernameAvailability( 
    username,
    error,
    setUsernameAvailability = (...input) => {},
    setError = (...input) => {},
) {

    if(username === '') return;

    let errors = [];
    
    try {
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(AUTH_ENDPOINTS.CHECK_USERNAME(username), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`,
            },
        });
        const data = await response.json();
        
        if (!data) {
            
            errors.push('Username is not availaible');
            setUsernameAvailability(false);
            console.log("Username is not availaible");

        } else {
            setError(prev => prev.filter(err => err !== 'Username is not availaible'));
            setUsernameAvailability(true);
            console.log("Username is availaible");
        }
    }
    catch (error) {
        
        setUsernameAvailability(true);
        console.error('Error checking username availability:', error);
    }

    if(errors.length > 0){
        error.map(err => errors.push(err));
        
        function removeDuplicates(arr) {
            return Array.from(new Set(arr));
        }

        errors = removeDuplicates(errors);
        setError(errors);
    }
};

export default checkUsernameAvailability;