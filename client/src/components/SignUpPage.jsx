import UserForm from "./UserForm"
import '../styles/SignUpPage.css'
import { Link } from 'react-router-dom'
import NotificationMessage from "./NotificationMessage"
const SignUpPage = () => {

    const handleRegister = () => {
        console.log('this will do stuff');
    }

    return(
        <main id='signUpPageContainer'>
            <NotificationMessage message={"test"} isError={true}/>
            <UserForm requestHandler={handleRegister} formAction={"Create Account"}/>
            <Link id='loginLink' to="/login"> Return to Login Page</Link>
        </main>
    )
}

export default SignUpPage