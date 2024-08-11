import { useEffect, useState } from 'react';
import '../styles/CoursePreview.css';
import {Link} from 'react-router-dom';


const CoursePreview = ({course}) => {
    //todo: add styling for tags
    const [tags, setTags] = useState([]);
    const [tagBgIndex, setTagBgIndex] = useState(0);

    const tagBackgrounds = ["lightblue", "lightgreen", "lightred", "lightyellow"];
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
                <p> difficulty: {avgDifficulty} </p>
            </Link>
            <section id='courseTags'>
                {tags.map(tag => <div  key={tag} className='tag'> {tag} </div>)}
            </section>
        </section>
    )
}


export default CoursePreview;