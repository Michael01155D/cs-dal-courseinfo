import '../styles/Review.css'

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

const Review = ({review}) => {
    const day = review.createdAt.substring(8, 10);
    const month = YEARS[review.createdAt.substring(5, 7)];
    const year = review.createdAt.substring(0, 4);

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
        </div>
    )
}

export default Review;