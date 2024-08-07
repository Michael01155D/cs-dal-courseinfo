import { useEffect, useState } from 'react';
import '../styles/CoursesList.css';
import CoursePreview from './CoursePreview';
import { Link } from 'react-router-dom';
import  SearchFilters, {applyFilters} from './SearchFilters';

const CoursesList = ({courses}) => {
    const [query, setQuery] = useState('');
    const [checkedBoxes, setCheckedBoxes] = useState([]);
    //todo: once course objs are added, render them using filter
    const [filteredCourses, setFilteredCourses] = useState([]);
        //filter courseList based on checkedBoxes
    const applyFilters = () => {
        let filterInProgress = courses;
        if (checkedBoxes.includes("bcs")) {
            filterInProgress = filterInProgress.filter();
        }
    }

    useEffect(() => {
        //first filter by searchbar query, then apply checkboxes (if any)
        const queryFilter = courses.filter(
            course => course.courseCode.includes(query.trim()) 
            || course.courseDescription.includes(query.trim())
        )   
        if (checkedBoxes.length > 0) {
            //todo: implement applyFilters
            queryFilter = applyFilters(queryFilter);
        }
        setFilteredCourses(queryFilter);

    }, [query, checkedBoxes])
    console.log("checkedboxes in courseList page is", checkedBoxes)
    return(
        <div id='coursesListContainer'>
            <header>
                <h2>Courses</h2>
            </header>
            <section id="browseByYear">
                <h4>Browse Courses by Year</h4>
                <Link 
                    id='firstYearLink' 
                    to={"/courses/year/first"} 
                    state={{courseData: courses.filter(course => course.year == 1) }}
                >
                    First Year
                </Link>
                <Link 
                    id='secondYearLink' 
                    to={"/courses/year/second"} 
                    state={ {courseData: courses.filter(course => course.year == 2) } }
                >
                    Second Year
                </Link>
                <Link 
                    id='thirdYearLink' 
                    to={"/courses/year/third"} 
                    state={ {courseData: courses.filter(course => course.year == 3)} }
                >
                    Third Year
                </Link>
                <Link 
                    id='fourthYearLink' 
                    to={"/courses/year/fourth"} 
                    state={{courseData: courses.filter(course => course.year == 4) }}
                >
                    Fourth Year
                </Link>
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
                <h4>Displaying {filteredCourses.length} out of {courses.length} Courses</h4>
                <div id='courseGrid'>
                    {
                    filteredCourses.map(course => <CoursePreview key={course._id} course={course}/>)
                    }
                </div>
            </section>
        </div>
    )
}

export default CoursesList;