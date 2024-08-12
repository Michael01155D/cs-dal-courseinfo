import { useEffect, useState } from 'react';
import '../styles/CoursesList.css';
import CoursePreview from './CoursePreview';
import { Link } from 'react-router-dom';
import  SearchFilters from './SearchFilters';

const CoursesList = ({courses}) => {
    const [query, setQuery] = useState('');
    const [checkedBoxes, setCheckedBoxes] = useState([]);
    //todo: once course objs are added, render them using filter
    const [filteredCourses, setFilteredCourses] = useState([]);

        //filter courseList based on checkedBoxes
    const applyFilters = () => {
        let filterInProgress = [];
        if (checkedBoxes.includes("year1")) {
            filterInProgress = courses.filter(c => c.year == 1);
        }
        if (checkedBoxes.includes("year2")) {
            filterInProgress = courses.filter(c => c.year == 2);
        }
        if (checkedBoxes.includes("year3")) {
            filterInProgress = courses.filter(c => c.year == 3);
        }
        if (checkedBoxes.includes("year4")) {
            filterInProgress = courses.filter(c => c.year == 4);
        }
        if (checkedBoxes.includes("bacs")) {
            filterInProgress = filterInProgress.concat(
                courses.filter(c => c.bacsRequirement == true && !filterInProgress.includes(c)));
        }
        if (checkedBoxes.includes("bcs")) {
            filterInProgress = filterInProgress.concat(
                courses.filter(c => c.bcsRequirement == true && !filterInProgress.includes(c)));
        }
        if (checkedBoxes.includes("elective")) {
            filterInProgress = filterInProgress.concat(
                courses.filter(c => c.bacsRequirement == false 
                    && c.bcsRequirement == false 
                    && !filterInProgress.includes(c)))
        }
        if (checkedBoxes.includes("co-op")) {
            filterInProgress = filterInProgress.concat(
                courses.filter(c => c.coopRequirement == true && !filterInProgress.includes(c)));
        }
        
        return filterInProgress;
    }

    useEffect(() => {
        //apply query and checkbox filters to course list if any
        if (query.length == 0 && checkedBoxes.length == 0) {
            setFilteredCourses(courses);
            return;
        }
        let queryFilter = [];
        if (checkedBoxes.length > 0) {
            queryFilter = applyFilters();
        }

        if (query.length > 0) {
            queryFilter = queryFilter.concat(
                courses.filter(
                    c => c.courseCode.toLowerCase().includes(query.trim().toLowerCase())
                    || c.courseDescription.includes(query.trim())
                )
            )
        }
        setFilteredCourses(queryFilter);
        console.log("after applying all filters, filteredCourses is ", filteredCourses)
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