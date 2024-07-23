import { useState } from 'react';
import '../styles/CoursesList.css';
import CoursePreview from './CoursePreview';
import { Link } from 'react-router-dom';
import SearchFilters from './SearchFilters';

const CoursesList = ({courses}) => {
    const [query, setQuery] = useState(''); 
    //todo: once course objs are added, render them using filter
    return(
        <div id='coursesListContainer'>
            <header>
                <h2>Courses</h2>
            </header>
            <section id="browseByYear">
                <h4>Browse Courses by Year</h4>
                <Link id='firstYearLink' to={"/courses/first"}>First Year</Link>
                <Link id='secondYearLink'to={"/courses/second"}>Second Year</Link>
                <Link id='thirdYearLink' to={"/courses/third"}>Third Year</Link>
                <Link id='fourthYearLink'to={"/courses/fourth"}>Fourth Year</Link>
            </section>
            <h3>Browse Through All Courses</h3>
            <section id='search'>
                <label  className='visuallyHidden' htmlFor='searchInput'>Search</label>
                <input type='text' id='searchInput' name='searchInput'
                    placeholder='Course Name or Code'
                    onChange={(e) => setQuery(e.target.value)}
                />
                <section id='searchFilters'>
                    <p>Filters (optional)</p>
                    <SearchFilters searchType='searchBar' />
                </section>
            </section>
            <section id='courseSection'>
                <h4>Found (replace w. size of courses array) Courses</h4>
                <div id='courseGrid'>
                    <CoursePreview/>
                    <CoursePreview/>
                </div>
            </section>

        </div>
    )
}

export default CoursesList;