import { AUTH_ENDPOINTS } from '../../apiEndpoints'
import { config } from '../../configurations';

async function login( 
    data,
    email,
    ROLES,
    validateByOtp,
    setValidateByOtp = (...input) => {},
    dispatch = (...input) => {},
    navigate = (...input) => {},
    reset = (...input) => {},
    setMessage = (...input) => {},
    setUsername = (...input) => {},
    setLoginStatus = (...input) => {},
    setRole = (...input) => {},
    setEmail = (...input) => {},
    setFullName = (...input) => {},
    setStep = (...input) => {},

    
    setLoading = (...input) => {}, 
    setError = (...input) => {},
) {

    setLoading(true);
    // console.log("Data before sending mail",data);
    setError("");
    setMessage('');

    try{
        let data2;
        if(validateByOtp === false){
            const credentials = btoa(config.username + ':' + config.password);
            const response = await fetch(AUTH_ENDPOINTS.LOGIN,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                    'Authorization': `Basic ${credentials}`,
                    // Add any other headers if needed
                },
                body: JSON.stringify(data), // Convert the data to a JSON string
            });
            data2 = await response.json();
            console.log("Data2",data2);

            if((data2.validateByEmailOTP === true) && validateByOtp === false){
                setValidateByOtp(true);
                setMessage('OTP has been sent to mail and is valid for 30 minutes');
                // console.log('OTP sent to mail');
                setLoading(false);
                return;
            }
        }

        if(validateByOtp === true){
            
            // console.log('Data after sending mail',data);
            // console.log(AUTH_ENDPOINTS.VALIDATE_OTP(data.username,data.otp));
            // console.log("Data type of otp is :- ",typeof(data.otp));
            const credentials = btoa(config.username + ':' + config.password);
            const response = await fetch(AUTH_ENDPOINTS.VALIDATE_OTP(email,data.otp),{
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json', // Specify the content type as JSON
                    'Authorization': `Basic ${credentials}`,
                    // Add any other headers if needed
                },
                // body: JSON.stringify(data), // Convert the data to a JSON string
            });
            const data3 = await response.json();
            // console.log('Data3', data3);
            // console.log('Data type of data3',typeof data3);

            if(data3.message === undefined){
                dispatch(setFullName(data2.fullName));
                dispatch(setEmail(data2.email));
                dispatch(setUsername(data2.username));
                dispatch(setLoginStatus(true));
                dispatch(setRole(ROLES.ADMIN));
                
                // console.log("Login as Admin Successfull");
                navigate('/');
            }
            else{
                // console.log("Login OTP Failed");
                setError('Invalid OTP');
                // console.log('Login Failed');
                reset();
                setStep(1);
                setValidateByOtp(false);
            }
        }
        else if(data2.message === undefined){
            dispatch(setFullName(data2.fullName));
            dispatch(setEmail(data2.email));
            dispatch(setUsername(data2.username));
            dispatch(setLoginStatus(true));
            dispatch(setRole(data.role));

            console.log("Login Successfull");
            navigate('/');
        }
        else{
            console.log('Login Error -: ',data2.message);
            setError("Invalid username or password");
            console.log("Login Failed");
        }

    }
    catch(error){
        console.log("Login Error :",error);
        // setError(error);

        const fakeError = new Error('Fetch API was not able to connect to the requested resource');

        // Create an error event
        const errorEvent = new Event('error');
        errorEvent.error = fakeError;

        // Dispatch the error event
        window.dispatchEvent(errorEvent);

        // throw new Error('Fetch API was not able to connect to the requested resource');
    }
    
    setLoading(false);
};

export default login;