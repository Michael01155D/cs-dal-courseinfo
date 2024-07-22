import { useState } from 'react';
import '../styles/CoursesList.css';
import CoursePreview from './CoursePreview';
import { useNavigate } from 'react-router-dom';

const CoursesList = ({courses}) => {
    const [query, setQuery] = useState(''); 
    const navigate = useNavigate();
    //todo: once course objs are added, render them using filter
    const yearCourseRedirect = (year) => {
        navigate(`/courses/${year}`)
    }
    return(
        <div id='coursesListContainer'>
            <header>
                <h2>Courses</h2>
            </header>
            <section id="browseByYear">
                <h4>Browse Courses by Year</h4>
                <button onClick={() => yearCourseRedirect('first')}>First Year Courses</button>
                <button onClick={() => yearCourseRedirect('second')}>Second Year Courses</button>
                <button onClick={() => yearCourseRedirect('third')}>Third Year Courses</button>
                <button onClick={() => yearCourseRedirect('fourth')}>Fourth Year Courses</button>
            </section>
            <section id='searchBar'>
                <label  className='visuallyHidden' htmlFor='searchInput'>Search</label>
                <input type='text' id='searchInput' name='searchInput'
                    placeholder='Course Name or Code'
                    onChange={(e) => setQuery(e.target.value)}
                />
                <p>temporary: need to decide where to add the optional search filters here, maybe remove them from homepage?</p>
                <p>current idea: change page from flex to grid, put filters on left side</p>
            </section>
            <section id='courses'>
                <CoursePreview/>
                <CoursePreview/>
            </section>

        </div>
    )
}

export default CoursesList;