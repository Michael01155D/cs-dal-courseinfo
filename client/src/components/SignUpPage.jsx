import UserForm from "./UserForm"

const SignUpPage = () => {

    const handleRegister = () => {
        console.log('this will do stuff')
    }
    return(
        <>
        <UserForm requestHandler={handleRegister} formAction={"Sign Up"}/>
        </>
    )
}

export default SignUpPage