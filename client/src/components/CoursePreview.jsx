import { useEffect, useState } from 'react';
import '../styles/CoursePreview.css';
import {Link} from 'react-router-dom';


const CoursePreview = ({course}) => {
    
    const [tags, setTags] = useState([]);
    //year-colors consisted with 'about year' backgrounds, see CoursesByYear.jsx
    const tagBackgrounds = {
                            "First Year" :"rgba(144, 238, 144, 0.352)",
                            "Second Year": "rgba(140, 217, 243, 0.352)", 
                            "Third Year": "rgba(229, 43, 43, 0.352)",
                            "Fourth Year": "rgba(255, 234, 1, 0.352)",
                            "BCS Requirement": "lightpink",
                            "BACS Requirement": "orange",
                            "Elective": "goldenRod",
                            "Co-op": "magenta",
                            "Certificate": "cyan"
                        };
    useEffect(() => {
        let tagsToAdd = [];
        switch(course.year) {
            case 1:
                tagsToAdd.push("First Year");
                break;
            case 2:
                tagsToAdd.push("Second Year");
                break;
            case 3:
                tagsToAdd.push("Third Year");
                break;
            case 4:
                tagsToAdd.push("Fourth Year");
                break;
            default:
                break;
        }

        if (course.bcsRequirement == true){
            tagsToAdd.push("BCS Requirement");
        }
        
        if (course.bacsRequirement == true){
            tagsToAdd.push("BACS Requirement");
        }
        
        if ( ! (course.bcsRequirement == true || course.bacsRequirement == true) ) {
            tagsToAdd.push("Elective");
        }

        if (course.coopRequirement == true) {
            tagsToAdd.push("Co-op");
        }

        if (course.certificateRequirement == true || course.certificateElective == true) {
            tagsToAdd.push("Certificate");
        }

        setTags(tagsToAdd);
        
    }, [])

    const avgDifficulty = course.reviews.length > 0 ? 
        course.reviews.map(r => r.difficulty).reduce((prev, cur) => prev += cur, 0) / course.reviews.length + "/5"
        :
        "No Ratings"

    return (
        <section className='coursePreviewContainer'>
            <Link className="coursePreview" to={`/courses/${course._id}`}>
                <p>{course.courseCode}</p>
                <p>{course.courseDescription}</p>
                <p> Difficulty: {avgDifficulty} </p>
            </Link>
            <section id='courseTags'>
                {tags.map( (tag) => 

                        <div  key={tag} className='tag' style={ {backgroundColor: tagBackgrounds[tag] }}> {tag} </div> )}
            </section>
        </section>
    )
}


export default CoursePreview;