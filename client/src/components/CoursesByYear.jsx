import { useParams } from "react-router-dom"
import '../styles/CoursesByYear.css'

const CoursesByYear = () => {
    const { year } = useParams();
    return(
        <div id='byYearContainer'>
            <header>
                <h2>{year[0].toUpperCase() + year.substring(1)}-Year Courses</h2>
            </header>
        <main id='yearCoursesList'>
        <p>this is where filtered courses obj will be mapped to display each course</p>
        </main>
        </div>
    )
}

export default CoursesByYear;