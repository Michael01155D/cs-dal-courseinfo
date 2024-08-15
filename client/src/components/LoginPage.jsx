import UserForm from './UserForm';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { login } from '../connections/users';
import { AuthContext } from '../contexts';
import { useContext, useEffect, useState } from 'react';
import NotificationMessage, {removeMsg} from './NotificationMessage';

const LoginPage = () => {
    const navigate = useNavigate();
    const  { user, setUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleLogin = async (username, password) => {
        if (isError) {
            removeMsg(setMessage, setIsError);
        }
        const res = await login({username, password});
        console.log('res is:', res)
        if (res.error) {
            setMessage("Invalid Username or Password");
            setIsError(true);
        } else {
            setUser(res);
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user])

    return(
        <main id='loginPageContainer'>
            {message.length > 0 ?
            <NotificationMessage message={message} isError={isError}/>
            : <></>
            }
            <UserForm formAction={"Login"} requestHandler={handleLogin} />
            <Link id='registrationLink' to="/signUp"> New User? Register Here! </Link>
        </main>
    )
}

export default LoginPage;