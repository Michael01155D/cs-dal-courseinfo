import UserForm from "./UserForm"
import '../styles/SignUpPage.css'
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import NotificationMessage, {removeMsg} from "./NotificationMessage"
import { login, register } from "../connections/users";
import { AuthContext } from "../contexts";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [displayMsg, setDisplayMsg] = useState("");
    const {user, setUser} = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);
    
    const handleRegister = async (username, password) => {
        if (isError) {
            removeMsg(setDisplayMsg, setIsError);
        }
        const result = await register({username, password});

        if (result.error) {
            setIsError(true);
            setDisplayMsg(result.error);
        } else if (result.username) {
            const loggedInUser = await login({username, password});
            setUser(loggedInUser);
        }
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