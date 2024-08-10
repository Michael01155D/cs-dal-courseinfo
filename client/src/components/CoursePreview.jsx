import '../styles/CoursePreview.css';
import {Link} from 'react-router-dom';

const CoursePreview = ({course}) => {
    //console.log('course object is ', course)
    //todo: give each CoursePreview a Link to the CourseDetails component
    return (
        <Link className="coursePreview" to={`/courses/${course._id}`}>
            <p>{course.courseCode}</p>
            <p>{course.courseDescription}</p>
            <p>
                avg difficulty rating:
                {course.reviews.length > 0 ? 
                    <>
                        {course.reviews
                            .map(r => r.difficulty)
                            .reduce((prev, cur) => { return prev += cur; }, 0) / course.reviews.length}
                            </> : "Course has not yet been rated"}
            </p>
            <p>tags (elective, required, etc.)</p>
        </Link>
    )
}

export default CoursePreview;