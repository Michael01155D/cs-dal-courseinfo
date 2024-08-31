//todo: add change password option, let user see all their reviews, let user delete account

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import Review from "./Review";
import "../styles/UserProfile.css";
import { updateUserLocally } from "../connections/users";

const UserProfile = () => {

    const { user, setUser }  = useContext(AuthContext); 
    const navigate = useNavigate();
    const [showReviews, setShowReviews] = useState(false);
    //update user in localstorage so that review data is populated
    const updateUser = async() => {
        await updateUserLocally(user, setUser);
    }

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        else {
            updateUser()
        }

    }, [user])

    return(
        <div id='userProfileContainer'>
            <header>
                <h1>Profile</h1>
            </header>
            <main id='userInfo'>
                <p><span className="profileCategory">Username:</span> {user.username}</p>
                <p><span className="profileCategory">Reviews Written:</span>  {user.reviewsWritten.length}</p>
                {user.reviewsWritten.length > 0 ?
                    <button onClick={()=> setShowReviews(!showReviews)}>{showReviews ? "Hide Reviews" : "Show Reviews"}</button>
                    : <></>
                }
                {showReviews == true ? 
                <ul>
                    {user.reviewsWritten.map(r => <Review review={ {...r, author: user}} getCourseData={() => {}} key={r._id}/>)}
                </ul>
                : <></>
                }
            </main>
        </div>
    )
}

export default UserProfile;