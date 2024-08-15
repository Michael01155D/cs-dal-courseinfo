import UserForm from "./UserForm"
import '../styles/SignUpPage.css'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import NotificationMessage from "./NotificationMessage"
import { register } from "../connections/users";

const SignUpPage = () => {
    const [isError, setIsError] = useState(false);
    const [displayMsg, setDisplayMsg] = useState("");

    const handleRegister = async (username, password) => {
        const result = await register(username, password);
        console.log('result is: ', result);
    }

    return(
        <main id='signUpPageContainer'>
            { displayMsg.length > 0 ?  
                <NotificationMessage message={displayMsg} isError={isError}/>
                :<></>
             }
            <UserForm requestHandler={handleRegister} formAction={"Create Account"}/>
            <Link id='loginLink' to="/login"> Return to Login Page</Link>
        </main>
    )
}

export default SignUpPage