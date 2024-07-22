import { useParams } from "react-router-dom"
import '../styles/CoursesByYear.css'

const CoursesByYear = () => {
    const { year } = useParams();
    return(
        <>
        This page will render all courses of the year passed by parameter.
        year is: {year}
        </>
    )
}

export default CoursesByYear;