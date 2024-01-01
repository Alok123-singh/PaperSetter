import { AUTH_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function checkEmailAvailability( 
    email,
    error,
    setEmailAvailability = (...input) => {},
    setShowVerifyEmail = (...input) => {},
    setError = (...input) => {},
) {

    if(email === '') return;

    let errors = [];
    
    try {
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(AUTH_ENDPOINTS.CHECK_EMAIL(email), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`,
            },
        });
        const data = await response.json();
        
        if (data.message !== undefined) {
            
            errors.push('Email is not availaible');
            setEmailAvailability(false);
            setShowVerifyEmail(false);
            console.log("Email is not availaible");

        } else {
            setError(prev => prev.filter(err => err !== 'Email is not availaible'));
            setEmailAvailability(true);
            setShowVerifyEmail(true);
            console.log("Email is availaible");
        }
    }
    catch (error) {
        
        setEmailAvailability(true);
        console.error('Error checking email availability:', error);
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

export default checkEmailAvailability;