import { AUTH_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function checkEmailForUsernameAndSendOTP( 
    username,
    email,
    setLoading,
    setErrors = (...input) => {},
    setMessages = (...input) => {},
) {

    if(email === '' || username === '') return;

    setLoading(true);

    setErrors(prev => prev.filter(err => err !== 'Invalid OTP. Click on verify to send the OTP again' && err !== 'Enter OTP' && err !== 'Due to some reason, OTP was not sent to your mail' && err !== 'Username is not availaible' && err !== 'Account not found'));

    setMessages(prev => prev.filter(msg => msg !== 'An OTP has been sent to your email and is valid for 30 minutes. Please verify your email'));

    let errors = [];
    let messages = [];
    let status = false;
    

    try {
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(AUTH_ENDPOINTS.CHECK_EMAIL_FOR_USERNAME(username,email), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`,
            },
        });
        
        if (response.status === 202) {
            
            status = true;
            // console.log("OTP sent successfully");

            messages.push("An OTP has been sent to your email and is valid for 30 minutes. Please verify your email");

        } 
        else {
            const data = await response.json();
            // console.log("Account not found");
            errors.push("Account not found");
        }
    }
    catch (error) {
        setErrors(prev => prev.filter(err => err !== error));
        errors.push(error);
        // console.log('Error checking account and sending otp:', error);
    }

    if(errors.length > 0){
        setErrors(errors);
    }

    if(messages.length > 0){
        setMessages(messages);
    }

    setLoading(false);

    return (status);
};

export default checkEmailForUsernameAndSendOTP;