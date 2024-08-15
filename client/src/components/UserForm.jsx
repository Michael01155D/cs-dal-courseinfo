import { useState } from "react";
import '../styles/UserForm.css';

const UserForm = ({requestHandler, formAction}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRequest = async (e) => {
        e.preventDefault();
        //requestHandler sends POST to either /login or /user 
        await requestHandler(username, password);
        setPassword("");
    }

    return (
        <form className="userForm" onSubmit={handleRequest}>
            <header className="formHeader">
                <h2>{formAction}</h2>
            </header>
            <section id="usernameSection">
                <label className='visuallyHidden' htmlFor="usernameForm">Username</label>
                <input placeholder='username' maxLength={20} id='usernameForm' type='text' value={username} name="Username" 
                onChange={(newName) => setUsername(newName.target.value) }
                />
            </section>
            <section>
                <label className='visuallyHidden' htmlFor="passwordForm">Password</label>
                <input placeholder="password" id='passwordForm' type='password' value={password} name="Password" 
                onChange={(newPw) => setPassword(newPw.target.value) }
                />
            </section>
            <button id="formSubmitButton" type="submit">{formAction}</button>
        </form>
    )
}

export default UserForm;