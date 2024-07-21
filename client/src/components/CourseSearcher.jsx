
import { useState } from 'react';
import '../styles/CourseSearcher.css';


const CourseSearcher = () => {
    const [showFilters, setShowFilters] = useState(false);
    const doStuff = (e) => {
        e.preventDefault();
        console.log("stuff done");
    }
    return(
            <form onSubmit={doStuff}>
                <label htmlFor='searchQuery'>Search For Courses</label>
                <input name="searchQuery" id='searchQuery' type='text' placeholder='Course Name or Code'></input>
                <button type='submit'>Search</button>
                <button type='button' onClick={() => setShowFilters(!showFilters)}>{showFilters ? "Hide Search Options" : "Display Search Options"}</button>
                {showFilters ? 
                    <fieldset id='searchFilters'>
                        <div>
                            <input name='bcs' id='bcs' type='checkbox'/>
                            <label htmlFor="bcs">BCS Requirement</label>
                        </div>
                        <div>
                            <input name='bacs' id='bacs' type='checkbox' />
                            <label htmlFor="bacs">BACS Requirement</label>
                        </div>
                        <div>
                            <input name='elective' id='elective' type='checkbox'/>
                            <label htmlFor="elective">Elective</label>
                        </div>
                        <div>
                            <input name='co-op' id='co-op' type='checkbox'/>
                            <label htmlFor="co-op">Co-Op Requirement</label>
                        </div>
                        <div>
                            <input name="year1" id="year1" type="checkbox"/>
                            <label htmlFor="year1">First Year</label>
                        </div>
                        <div>
                            <input name="year2" id="year2" type="checkbox"/>
                            <label htmlFor="year2">Second Year</label>
                        </div>
                        <div>
                            <input name="year3" id="year3" type="checkbox"/>
                            <label htmlFor="year3">Third Year</label>
                        </div>
                        <div>
                            <input name="year4" id="year4" type="checkbox"/>
                            <label htmlFor="year4">Fourth Year</label>
                        </div>
                    </fieldset>
                    : 
                    <></>}
            </form>
    )
}

export default CourseSearcher;