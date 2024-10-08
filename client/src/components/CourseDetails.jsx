import { useParams, Link } from "react-router-dom";
import { getCourse } from "../connections/courses";
import { useContext, useEffect, useState } from "react";
import Review from './Review';
import '../styles/CourseDetails.css';
import { AuthContext } from "../contexts";

const CourseDetails = () => {
    const [course, setCourse] = useState();
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    //string to display if course is required for BCS and BACS, only one, or neither (default)
    const [courseRequiredText, setcourseRequiredText] = useState(" an elective.");

    const getCourseData = async () => {
        const courseData = await getCourse(id);
        setCourse(courseData);
    }
    
    useEffect(() => {
        getCourseData(id);
    }, [])

    const findAvg = (arr) => {
        if (arr.length == 0) {
            return;
        }
        return (arr.reduce((prev, curr) => prev += curr) / arr.length).toFixed(2);
    }

    useEffect(() => {
        if (course) {
            if (course.bcsRequirement == true && course.bacsRequirement == true) {
                setcourseRequiredText(" required for students in both BCS and BACS.");
            }
            else if (course.bcsRequirement == true) {
                setcourseRequiredText(" required only for students in BCS.");
            } else if (course.bacsRequirement == true) {
                setcourseRequiredText(" required only for students in BACS.");
            }
        }
    }, [course])

    return(
        <>
        {course ?
        <main id='courseDetailsContainer'>
            <header>
                <h2>{course.courseCode}: {course.courseDescription}</h2>
            </header>
            <section id="courseInfo">
                <section id='prerequisiteInfo'>
                    Prerequisites:
                    <>
                    {course.prerequisites.length == 0 ? 
                        " None" :
                        <ul>
                            {course.prerequisites.map(p => <li key={p.courseCode}>{p.courseCode}</li>)}
                        </ul>
                    } 
                    </>

                </section>
                <p>This course is {courseRequiredText}</p>
                <section id='courseAverages'>
                    {course.reviews.length > 0 ?
                    <ul>
                       <h3>On average:</h3>
                        <li>
                           Students rate the quality of this course at {findAvg(course.reviews.map(r => r.quality))} / 5.
                        </li>
                        <li>
                            Students find the courses difficulty is {findAvg(course.reviews.map(r => r.difficulty))} / 5.
                        </li>
                        <li>
                            The courseload amount is rated at {findAvg(course.reviews.map(r => r.courseLoad))} / 5.
                        </li>
                    </ul>
                    :
                    <></>    
                    }
                </section>
                <section id='courseReviews'>
                    <header>
                        <h2>Reviews</h2>
                        { user ? 
                            <Link to={`newReview`} state={course}> { user.reviewsWritten.map(r => r.course._id).includes(course._id) ? "Edit Your Review" : "Create Review"} </Link>
                            :<></>
                        }
                    </header>
                    {course.reviews.length > 0 ?
                    <ul>
                        {course.reviews.map(r => <li className="reviewContainer" key={r.createdAt}><Review review={r} getCourseData={getCourseData}/></li>)}
                    </ul> 
                    :
                    <p>This course has no reviews yet.</p>   
                }
                </section>
            </section>
        </main>
        : <h2>Loading...</h2>
        }
        </>
    )
}

export default CourseDetails;