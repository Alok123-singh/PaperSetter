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

    let status = false;

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

    setError(prev => prev.filter(err => err !== 'Invalid OTP. Click on verify to send the OTP again' && err !== 'Enter OTP' && err !== 'Due to some reason, OTP was not sent to your mail' && err !== 'Username is not availaible'));

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
            status = true;
            // console.log("OTP validated");
        }
        else{
            errors.push('Invalid OTP. Click on verify to send the OTP again');
            setValidateByOtp(false);
            // console.log("OTP validation failed");
        }
    }
    catch(error){
        // console.log("Create Account Error :",error);
        errors.push(error);
    }

    if(errors.length > 0){
        setError(errors);
    }

    if(message.length > 0){
        setMessages(message);
    }

    setLoading(false);

    return (status);
};

export default verifyOTP;