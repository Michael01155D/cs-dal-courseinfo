import '../styles/CoursePreview.css';

const CoursePreview = ({course}) => {
    //todo: give each CoursePreview a Link to the CourseDetails component
    return (
        <div className="coursePreview">
            <p>Title</p>
            <p>Brief Description</p>
            <p>avg difficulty rating</p>
            <p>tags (elective, required, etc.)</p>
        </div>
    )
}

export default CoursePreview;