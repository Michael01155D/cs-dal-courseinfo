import { useEffect, useState } from "react";
import { createReview } from "../connections/reviews";
import { useLocation } from "react-router-dom";
import RadioField from "./RadioField";
import '../styles/NewReviewForm.css'
const NewReviewForm = () => {
    const { state } = useLocation();
    const [course, setCourse] = useState();
    const [content, setContent] = useState("");
    const [quality, setQuality] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [courseLoad, setCourseLoad] = useState(0);
    const [yearTaken, setYearTaken] = useState('');
    const [prof, setProf] = useState('');
    const [postedAnonymously, setPostedanonymously] = useState(false); 


    useEffect(() => {
        if (state) {
            console.log('state is ' , state.courseCode)
            setCourse(state)
        }
    }, []);

    const sendReview = async (event) => {
        //event target values: 0: content, 1: quality, 2: difficulty, 3: courseload, 4: yeartaken, 5: prof, 6:postedanon
        event.preventDefault();
        const form = event.target;
        const formObj = Object.fromEntries(new FormData(form).entries());
        console.log("formData is", formObj)
        const newReview = {content, quality, difficulty, courseLoad, yearTaken, prof, postedAnonymously, course,}
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
                        inputIds={["difficulty1", "difficulty2", "difficulty3", "difficulty4", "difficulty5"]}
                        legendName={"Difficulty"}
                    />
                    <RadioField 
                        labelText={["1 (lowest)", "2", "3", "4", "5"]} 
                        inputIds={["quality1", "quality2", "quality3", "quality4", "quality5"]}
                        legendName={"Quality"}
                    />
                    <RadioField 
                        labelText={["1 (least work)", "2", "3", "4", "5"]} 
                        inputIds={["load1", "load2", "load3", "load4", "load5"]}
                        legendName={"Course Load"}
                    />
                </section>
                <section id='miscFields'>
                    <label htmlFor="prof">Professor's Name (Optional)</label>
                    <input type='text' name="prof"/>
                    <label htmlFor="yearTaken">Year Taken: (Optional)</label>
                    {/*todo: sanitize input on yearTaken better using attribs */}
                    <input type='number' name='yearTaken' min='2014' max='2024'/> 
                </section>
                <textarea name='content' value={content} rows={20} onChange={(e) => setContent(e.target.value)}/>
                <input type='submit'/>
            </form>
        </div>
        :
        <></>
    )
}

export default NewReviewForm;