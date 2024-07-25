import { useParams } from "react-router-dom"
import '../styles/CoursesByYear.css'
import { useEffect, useState } from "react";

const CoursesByYear = () => {
    const { year } = useParams();
    const [yearInfo, setYearInfo] = useState();
    const [yearBgColor, setYearBgColor] = useState("white");
    useEffect(() => {
        switch(year) {
            case "first": 
                setYearInfo("For first year students, courses are designed to introduce foundational CS concepts.");
                setYearBgColor("rgba(144, 238, 144, 0.352)");
                break;
            case "second":
                setYearInfo("In the second year, course choices are very limited as the year has many degree requirements. One common piece of advice is to not pair 2122 and 2115 together!");
                setYearBgColor("rgba(140, 217, 243, 0.352)");
                break;
            case "third":
                setYearInfo("Considered by many CS students to be the hardest year, third year contains several extremely challenging courses that build on the foundations. It's okay, you've got this!");
                setYearBgColor("rgba(229, 43, 43, 0.352)");
                break;
            case "fourth": 
                setYearInfo("The final stretch! Fourth year offers students a lot of freedom to complete their degree based on their areas of interest.")
                setYearBgColor("rgba(255, 234, 1, 0.352");
                break;
            default:
                break;
            }
    }, [])

    return(
        <>
            <header>
                <h2>{year[0].toUpperCase() + year.substring(1)}-Year Courses</h2>
            </header>
            <main id='byYearContainer'>
                <aside style={{backgroundColor: yearBgColor}} id='aboutYear'>
                    {yearInfo}
                </aside>
                <section id='yearCoursesList'>
                    <p>this is where filtered courses obj will be mapped to display each course</p>
                </section>
            </main>
        </>
    )
}

export default CoursesByYear;