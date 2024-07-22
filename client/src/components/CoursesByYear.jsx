import { useParams } from "react-router-dom"

const CoursesByYear = () => {
    const { year } = useParams();
    return(
        <>
        year is: {year}
        </>
    )
}

export default CoursesByYear;