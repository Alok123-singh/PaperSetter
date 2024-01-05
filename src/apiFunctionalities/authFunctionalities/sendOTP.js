import { AUTH_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function sendOTP( 
    email,
    error,
    setValidateByOtp = (...input) => {},
    setMessages = (...input) => {},
    setLoading = (...input) => {},
    setError = (...input) => {},
) {

    let errors = [];
    let message = [];

    setLoading(true);
    
    setError(prev => prev.filter(err => err !== 'Invalid OTP. Click on verify to send the OTP again' && err !== 'Enter OTP' && err !== 'Due to some reason, OTP was not sent to your mail' && err !== 'Username is not availaible'));

    // console.log("Inside SendOTP");
    // console.log("Username", username);
    // console.log("Email", email);

    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(AUTH_ENDPOINTS.SEND_OTP(email),{
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            // body: JSON.stringify(data), // Convert the data to a JSON string
        });

        
        if(response.status === 200){
            // console.log("OTP sent");
            setError(errors);
            message.push("An OTP has been sent to your email and is valid for 30 minutes. Please verify your email")
            setValidateByOtp(true);
        }
        else{
            // console.log('Send OTP Response :-',response);
            errors.push('Due to some reason, OTP was not sent to your mail');
        }

    }
    catch(error){
        console.log("Create Account Error :",error);
        errors.push(error);
    }

    if(errors.length > 0){
        setError(errors);
    }

    if(message.length > 0){
        setMessages(message);
    }

    setLoading(false);
};

export default sendOTP;