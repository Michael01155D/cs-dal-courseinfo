import { useContext, useEffect, useState } from "react";
import { createReview } from "../connections/reviews";
import { useLocation, useNavigate } from "react-router-dom";
import RadioField from "./RadioField";
import '../styles/NewReviewForm.css'
import { AuthContext } from "../contexts";

const NewReviewForm = () => {
    const { state } = useLocation();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState();
    const [content, setContent] = useState("");
    const [quality, setQuality] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [courseLoad, setCourseLoad] = useState(0);
    const [yearTaken, setYearTaken] = useState('');
    const [prof, setProf] = useState('');
    const [postedAnonymously, setPostedanonymously] = useState(false); 
    const CURRENT_YEAR = new Date().getFullYear();

    useEffect(() => {
        if (state) {
            setCourse(state)
        }
        if (!user) {
            navigate("/courses")
        }
    }, []);

    const sendReview = async (event) => {
        setPostedanonymously(false);
        event.preventDefault();
        const form = event.target;
        const formObj = Object.fromEntries(new FormData(form).entries());
        console.log("formData is", formObj)
        setDifficulty(formObj.Difficulty);
        setQuality(formObj.Quality);
        setCourseLoad(formObj["Course Load"]);
        setProf(formObj.prof);
        setYearTaken(formObj.yearTaken);
        if (formObj.anonymous) {
            setPostedanonymously(true);
        }
    
        const newReview = {content, quality, difficulty, courseLoad, yearTaken, prof, postedAnonymously, course, author: user}

        console.log("new Review is :" , newReview)
        // setReview(...review, course);

        //await createReview(review);
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
        </div>
        :
        <></>
    )
}

export default NewReviewForm;