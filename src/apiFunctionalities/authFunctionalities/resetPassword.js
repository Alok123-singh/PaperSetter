import { AUTH_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function resetPassword( 
    data,
    navigate = (...input) => {},
    setLoading = (...input) => {}, 
    setError = (...input) => {},
) {

    setLoading(true);
    console.log(data);
    setError([]);

    let errors = [];

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#(){}[\]:;<>,.?/~_+\-=|\\\"'`!^&*()$%^,{}?<>_])[A-Za-z\d@$!%*?&^#(){}[\]:;<>,.?/~_+\-=|\\\"'`!^&*()$%^,{}?<>_ ]{5,}$/.test(data.newPassword)) {
        errors.push("New password must have at least 1 special character, 1 small alphabet, 1 capital alphabet, 1 digit, and at least 5 characters long");
        setLoading(false);
        setError(errors);
        return;
    }

    if(data.newPassword === data.oldPassword){
        errors.push("Enter new password")
        setLoading(false);
        setError(errors);
        return;
    }

    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(AUTH_ENDPOINTS.RESET_PASSWORD,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            body: JSON.stringify(data), // Convert the data to a JSON string
        });
        // const data2 = await response.json();
        console.log("Response",response);
        
        if(response.status === 200){
            alert('Password has been reset');
            console.log("Reset Successfull");
            navigate('/login');
        }
        else{
            errors.push('Invalid username or password');
            console.log("Reset Failed");
        }

    }
    catch(error){
        console.log("Reset Password Error :",error);
        errors.push(error);
    }

    if (errors.length > 0) {
        setError(errors);
    }

    setLoading(false);
};

export default resetPassword;