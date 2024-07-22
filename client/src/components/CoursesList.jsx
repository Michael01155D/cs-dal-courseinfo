import { useState } from 'react';
import '../styles/CoursesList.css';
import CoursePreview from './CoursePreview';

const CoursesList = ({courses}) => {
    const [query, setQuery] = useState(''); 
    //todo: once course objs are added, render them using filter
    return(
        <div id='coursesListContainer'>
            <header>
                <h2>Courses</h2>
            </header>
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