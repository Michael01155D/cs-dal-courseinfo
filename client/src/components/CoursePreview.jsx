import '../styles/CoursePreview.css';
import {Link} from 'react-router-dom';

const CoursePreview = ({course}) => {
    console.log('course object is ', course)
    //for each review's difficulty rating, sum them then divide by num reviews
    const avgDifficulty = course.reviews.map(review => review.difficulty).reduce((total, cur) => total += cur) / course.reviews.length;
    //todo: give each CoursePreview a Link to the CourseDetails component
    return (
        <Link className="coursePreview" to={`/courses/${course._id}`}>
            <p>{course.courseCode}</p>
            <p>{course.courseDescription}</p>
            <p>
                avg difficulty rating:
                {course.reviews.length > 0 ? 
                    <p>
                        {course.reviews
                            .map(r => r.difficulty)
                            .reduce((prev, cur) => { return prev += cur; }, 0) / course.reviews.length}</p> : "Course has not yet been rated"}
            </p>
            <p>tags (elective, required, etc.)</p>
        </Link>
    )
}

export default CoursePreview;