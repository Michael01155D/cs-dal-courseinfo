import { useContext } from 'react';
import '../styles/Review.css'
import { AuthContext } from '../contexts';
import { deleteReview } from '../connections/reviews';
import { updateUserLocally } from '../connections/users';

const YEARS = {
    "01": "Jan",
    "02": "Feb",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "Aug",
    "09": "Sept",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
}

const Review = ({review, getCourseData}) => {
    
    const day = review.createdAt.substring(8, 10);
    const month = YEARS[review.createdAt.substring(5, 7)];
    const year = review.createdAt.substring(0, 4);
    const { user, setUser } = useContext(AuthContext);

    const removeReview = async () => {
        await deleteReview(review._id);
        await updateUserLocally(user, setUser);
        await getCourseData();
    }

    return (
        <div className='review'>
            <section id='authorAndDate'>
                <p>Reviewed By { review.postedAnonymously == true ? "Anonymous" : review.author.username} </p> 
                <p>{day + " " + month + " " + year} </p>
            </section>
            <section id='reviewRatings'>
                <p>Quality: {review.quality}</p>
                <p>Difficulty: {review.difficulty}</p>
                <p>Course Load: {review.courseLoad}</p>
            </section>
            <section id='miscReviewDetails'>
                <p>Year Taken: {review.yearTaken ? review.yearTaken : "Not provided"}</p>
                <p>Course Instructor: {review.professor ? review.professor : "Not provided"} </p>
            </section>
            <main id='reviewContent'>
                <p>{review.content}</p>
            </main>
            <footer>
                {
                    user && user._id == review.author._id ? 
                    <button id='deleteReviewButton' onClick={removeReview}>Delete Review</button>
                    :
                    <></>
                }
            </footer>
        </div>
    )
}

export default Review;