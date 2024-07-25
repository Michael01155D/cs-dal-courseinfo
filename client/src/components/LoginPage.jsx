import UserForm from './UserForm';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {

    const handleLogin = () => {
        console.log("this will do stuff");
    }
    return(
        <main id='loginPageContainer'>
            <UserForm formAction={"Login"} requestHandler={handleLogin} />
            <Link id='registrationLink' to="/signUp"> New User? Register Here! </Link>
        </main>
    )
}

export default LoginPage;