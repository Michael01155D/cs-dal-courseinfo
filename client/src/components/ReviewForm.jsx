import { useContext, useEffect, useState } from "react";
import { createReview, updateReview } from "../connections/reviews";
import { useLocation, useNavigate } from "react-router-dom";
import RadioField from "./RadioField";
import '../styles/NewReviewForm.css'
import { AuthContext } from "../contexts";
import NotificationMessage from "./NotificationMessage";
import { updateUserLocally } from "../connections/users";

const NewReviewForm = () => {
    const { state } = useLocation();
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState();
    const [content, setContent] = useState("");
    const CURRENT_YEAR = new Date().getFullYear();
    const [msg, setMsg] = useState('');
    useEffect(() => {
        if (state) {
            setCourse(state)
        }
        if (!user) {
            navigate("/courses")
        }
        console.log("in form user is ", user)
    }, []);

    const sendReview = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formObj = Object.fromEntries(new FormData(form).entries());
        console.log("formData is", formObj)
        const difficulty = formObj.Difficulty;
        const quality = formObj.Quality;
        const courseLoad = formObj["Course Load"];
        const prof = formObj.prof;
        const yearTaken = formObj.yearTaken;
        const postedAnonymously = formObj.anonymous ? true : false;

        const newReview = {content, quality, difficulty, courseLoad, yearTaken, prof, postedAnonymously, course, author: user}
        if (!quality || !difficulty || !courseLoad) {
            setMsg("Please select an option for Course Quality, Difficulty, and Course Load")
            return;
        } else {
            setMsg('');
            if (user.reviewsWritten.map(r => r.course).includes(course)) {
                await updateReview(newReview);
            }
            await createReview(newReview);
            await updateUserLocally(user, setUser);
            console.log("after calling updateUserLocally, user is: ", user);
            navigate(`/courses/${course._id}`);
        }
    }

    return(
        course ?
        <div id='reviewFormContainer'>
            <header>
                <h2>Write Your Review For {course.courseCode} </h2>
            </header>
            <form onSubmit={sendReview}>
                <section id='radioFields'>
                    <RadioField 
                        labelText={["1 (easiest)", "2", "3", "4", "5"]} 
                        inputIds={[1, 2, 3, 4, 5]}
                        legendName={"Difficulty"}
                    />
                    <RadioField 
                        labelText={["1 (lowest)", "2", "3", "4", "5"]} 
                        inputIds={[1, 2, 3, 4, 5]}
                        legendName={"Quality"}
                    />
                    <RadioField 
                        labelText={["1 (least work)", "2", "3", "4", "5"]} 
                        inputIds={[1, 2, 3, 4, 5]}
                        legendName={"Course Load"}
                    />
                </section>
                <section id='miscFields'>
                    <label htmlFor="prof">Professor's Name (Optional):</label>
                    <input type='text' name="prof"/>
                    <label htmlFor="yearTaken">Year Taken:</label>
                    <input type='number' name='yearTaken' min={CURRENT_YEAR - 10} max={CURRENT_YEAR} defaultValue={CURRENT_YEAR} onKeyDown={(event) => event.preventDefault()}/> 
                </section>
                <textarea name='content' value={content} rows={20} onChange={(e) => setContent(e.target.value)}/>
                <section id='anonymousCheckBox'>
                    <input  id='anonymous' type='checkbox' name='anonymous'/>
                    <label htmlFor='anonymous'>Post anonymously?</label>
                </section>
                <input type='submit'/>
            </form>
            {msg.length > 0 ?
                <NotificationMessage id='reviewFormError' message={msg} isError={true}/>
                : <></>
            }
        </div>
        :
        <></>
    )
}

export default NewReviewForm;