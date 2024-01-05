import { AUTH_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function createAccount( 
    data,
    ROLES,
    usernameAvailability,
    navigate = (...input) => {},
    setStep = (...input) => {},
    reset = (...input) => {},
    setValidateByOtp = (...input) => {},
    setShowVerifyEmail = (...input) => {},
    setMessages = (...input) => {},
    setLoading = (...input) => {},
    setError = (...input) => {},
) {

    setLoading(true);
    setError([]);

    if(data.roleName === ROLES.INSTRUCTOR){
        data.role = [ROLES.INSTRUCTOR,ROLES.PARTICIPANT];
    }

    if(data.roleName === ROLES.PARTICIPANT){
        data.role = [ROLES.PARTICIPANT];
    }

    console.log("Data",data);

    const errors = [];

    if(usernameAvailability === false){
        errors.push("Username is not availaible");
    }
    
    // Validation for First Name
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(data.firstName)) {
        errors.push("First name must be at least 2 characters long");
    }

    // Validation for First Name
    if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+)*$/.test(data.firstName)) {
        errors.push("First name must be at least 2 characters long");
    }

    // Validation for Last Name
    if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+)*$/.test(data.lastName)) {
        errors.push("Last name must be at least 2 characters long");
    }

    // Validation for Email
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
        errors.push("Email address must be a valid address");
    }

    // Validation for Password
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#(){}[\]:;<>,.?/~_+\-=|\\\"'`!^&*()$%^,{}?<>_])[A-Za-z\d@$!%*?&^#(){}[\]:;<>,.?/~_+\-=|\\\"'`!^&*()$%^,{}?<>_ ]{5,}$/.test(data.password)) {
        errors.push("Password must have at least 1 special character, 1 small alphabet, 1 capital alphabet, 1 digit, and at least 5 characters long");
    }

    // console.log("Data",JSON.stringify(data));

    try{
        if(usernameAvailability === true && errors.length === 0){
            const credentials = btoa(config.username + ':' + config.password);
            const response = await fetch(AUTH_ENDPOINTS.SIGNUP,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                    'Authorization': `Basic ${credentials}`,
                    // Add any other headers if needed
                },
                body: JSON.stringify(data), // Convert the data to a JSON string
            });

            
            if(response.status === 201){
                console.log("Account Created");
                alert('Your account has been created');
                navigate('/login');
            }
        }
        else{
            setStep(prev => prev-1);
        }

    }
    catch(error){
        console.log("Create Account Error :",error);
        errors.push(error);
    }

    if (errors.length > 0) {
        setError(errors);
    }

    // reset();
    setMessages([]);
    setValidateByOtp(false);
    setShowVerifyEmail(false);
    setLoading(false);
};

export default createAccount;