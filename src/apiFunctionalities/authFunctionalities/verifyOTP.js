import { AUTH_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function verifyOTP( 
    email,
    otp,
    error,
    setValidateByOtp = (...input) => {},
    setValidated = (...input) => {},
    setMessages = (...input) => {},
    setLoading = (...input) => {},
    setError = (...input) => {},
) {

    let errors = [];
    let message = [];
    setMessages([]);
    setLoading(true);

    if(otp.length === 0){
        errors.push("Enter OTP");
        error.map((err) => {
            if(err !== 'Enter OTP')
                errors.push(err);

            return (err);
        });
        setError(errors);
        setLoading(false);
        return;
    }

    error.map((err) => {
        if(err !== 'Invalid OTP. Click on verify to send the OTP again' && err !== 'Enter OTP')
            errors.push(err);

        return (err);
    })
    setError(errors);

    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(AUTH_ENDPOINTS.VALIDATE_OTP(email,otp),{
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            // body: JSON.stringify(data), // Convert the data to a JSON string
        });
        const data3 = await response.json();

        
        if(data3.message === undefined){
            setValidated(true);
            setValidateByOtp(false);
            message.push('Email has been verified');
            // console.log("OTP validated");
        }
        else{
            errors.push('Invalid OTP. Click on verify to send the OTP again');
            setValidateByOtp(false);
            // console.log("OTP validation failed");
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

export default verifyOTP;