//todo: add change password option, let user see all their reviews, let user delete account

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import Review from "./Review";
import "../styles/UserProfile.css";
import { updateUserLocally, updateUser } from "../connections/users";
import NotificationMessage, {removeMsg} from "./NotificationMessage";

const UserProfile = () => {

    const { user, setUser }  = useContext(AuthContext); 
    const navigate = useNavigate();
    const [showReviews, setShowReviews] = useState(false);
    const [newName, setNewName] = useState("");
    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(false);

    //update user in localstorage so that review data is populated
    const getUserData = async() => {
        await updateUserLocally(user, setUser);
    }

    const changeName = async() => {
        if (newName == user.username || newName.trim().length == 0) {
            return;
        }
        const verify = confirm("Are you sure you want to change your username to " + newName.trim() + "? \nThis action cannot be undone.");
        if (verify == true) {
            const updatedUser = await updateUser({...user, username: newName})
            setNewName("")
            if (updatedUser.errorResponse) {
                if (updatedUser.errorResponse.codeName == "DuplicateKey") {
                    setMsg("Error: A User with that username already exists.")
                    setIsError(true);
                }
            } 
            else {
                console.log("updated user is : ", updatedUser.username)
                setMsg("Username updated to " + updatedUser.username);
                setIsError(false);
            }

        }

    }

    const updateName = (e) => {
        removeMsg(setMsg, setIsError);
        setNewName(e.target.value);
    }

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        else {
            getUserData()
        }

    }, [user])

    return(
        <div id='userProfileContainer'>
            <header>
                <h1>Profile</h1>
            </header>
            <main id='userInfo'>
                <p>Username: {user.username}</p>
                <input id='newUserName' placeholder="Enter new username" value={newName} onChange={(e) => updateName(e)}/>
                <button onClick={() => changeName()} id="changeUserNameButton">Change Username</button>
                {msg.length > 0 ? 
                    <NotificationMessage message={msg} isError={isError}/>
                    : <></>
                }
                <p>Reviews Written:  {user.reviewsWritten.length}</p>
            </main>
                {user.reviewsWritten.length > 0 ?
                    <button id="showUserReviewsButton" onClick={()=> setShowReviews(!showReviews)}>
                        {showReviews ? "Hide Reviews" : "Show Reviews"}
                    </button>
                    : <></>
                }
                {showReviews == true ? 
               
                    <ul id='reviewsInProfile'>
                        {user.reviewsWritten.map(r => <Review review={ {...r, author: user}} getCourseData={() => {}} key={r._id}/>)}
                    </ul>
                    : <></>
                }
        </div>
    )
}

export default UserProfile;