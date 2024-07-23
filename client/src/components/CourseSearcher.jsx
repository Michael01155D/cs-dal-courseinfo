
import '../styles/CourseSearcher.css';
import './SearchFilters';
import SearchFilters from './SearchFilters';

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
                <fieldset id='searchFormFilters'>
                    <h4>Search by Tags (Optional)</h4>
                    <SearchFilters searchType='form' />
                </fieldset>
        </form>
    )
}

export default CourseSearcher;