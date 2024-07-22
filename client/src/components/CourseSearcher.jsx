
import '../styles/CourseSearcher.css';


const CourseSearcher = () => {
    const doStuff = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log("stuff done, formProps is: ", {formProps});
        //to do: have this navigate to the CoursesList page w. formProps set up properly
    }
    return(
        <form onSubmit={doStuff}>
            <label htmlFor='searchQuery'>Course Search</label>
            <input name="searchQuery" id='searchQuery' type='text' placeholder='Course Name or Code'></input>
            <button id='courseSearchFormSubmit' type='submit'>Search</button>
                <fieldset id='searchFilters'>
                    <h4>Search by Tags (Optional)</h4>
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
        </form>
    )
}

export default CourseSearcher;