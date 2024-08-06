import { useState } from 'react';
import '../styles/CoursesList.css';
import CoursePreview from './CoursePreview';
import { Link } from 'react-router-dom';
import SearchFilters from './SearchFilters';

const CoursesList = ({courses}) => {
    const [query, setQuery] = useState('');
    const [showFilters, setShowFilters] = useState(true);
    const [checkedBoxes, setCheckedBoxes] = useState([]);
    //todo: once course objs are added, render them using filter
    const [filteredCourses, setFilteredCourses] = useState([]);
    //use this to filter courses
    console.log("in CoursesList checkedBoxes are: ", checkedBoxes)
    return(
        <div id='coursesListContainer'>
            <header>
                <h2>Courses</h2>
            </header>
            <section id="browseByYear">
                <h4>Browse Courses by Year</h4>
                {/* todo: add filtered courses as prop for each Link*/}
                <Link id='firstYearLink' to={"/courses/year/first"}>First Year</Link>
                <Link id='secondYearLink'to={"/courses/year/second"}>Second Year</Link>
                <Link id='thirdYearLink' to={"/courses/year/third"}>Third Year</Link>
                <Link id='fourthYearLink'to={"/courses/year/fourth"}>Fourth Year</Link>
            </section>
            <section id='searchSection'>
                <section id='searchBar'>
                    <h3>Browse Through All Courses</h3>
                    <label  className='visuallyHidden' htmlFor='searchInput'>Search</label>
                    <input type='text' id='searchInput' name='searchInput'
                        placeholder='Course Name or Code'
                        onChange={(e) => setQuery(e.target.value)}
                        />
                </section>
                <section id='searchFilters'>
                    <p>Search Filters (optional)</p>
                    <SearchFilters searchType='searchBar' checkedBoxes={checkedBoxes} setCheckedBoxes={setCheckedBoxes}/>
                </section>
            </section>
            <section id='courseSection'>
                <h4>Displaying (filtered arr.length) out of {courses.length} Courses</h4>
                <div id='courseGrid'>
                    {courses.map(course => <CoursePreview key={course._id} course={course}/>)}
                </div>
            </section>
        </div>
    )
}

export default CoursesList;