import { config } from "../../configurations";
import { ADMIN_ENDPOINTS, AUTH_ENDPOINTS } from "../../apiEndpoints";


async function joinGame(
    data,
    groupName,
    email,
    fullName,
    username,
    navigate = (...input) => {},
    url = '',
    setLoading = (...input) => {}, 
    setErrors = (...input) => {},
) {
    
    let errors = [];
    setLoading(true);
    setErrors([]);

    

    try{
        const credentials = btoa(config.username + ':' + config.password);
        const response = await fetch(ADMIN_ENDPOINTS.ENROLL_COURSE(data.courseCode,groupName),{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
                'Authorization': `Basic ${credentials}`,
                // Add any other headers if needed
            },
            body: JSON.stringify({fullName : fullName, email: email}), // Convert the data to a JSON string
        });

        
        if(response.status === 200){

            const response1 = await fetch(AUTH_ENDPOINTS.SAVE_ENROLLED_GAME(username),{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                    'Authorization': `Basic ${credentials}`,
                    // Add any other headers if needed
                },
                body: JSON.stringify({gameId : data.gameId, gameName: data.courseName, attempts : data.attempts, courseCode: data.courseCode}), // Convert the data to a JSON string
            });

            if(response1.status === 200){
                alert("You have successfully enrolled in the game!");
                console.log("Sucessfully joined game");
            }
            else{
                alert("Failed to enroll");
                console.log("Failed to enroll");
            }

            navigate(url);
        }
        else{
            errors.push('Student is already enrolled in this course');
            console.log("Join Game backend Error :- ");
        }

    }
    catch(err){
        console.log("Participant Home Error :",err);
        // errors.push(err);
    }

    if(errors.length > 0){
        setErrors(errors);
    }

    setLoading(false);
};

export default joinGame;