
import '../styles/CourseSearcher.css';
import './SearchFilters';
import SearchFilters from './SearchFilters';
import { useNavigate } from 'react-router-dom';

const CourseSearcher = () => {
    const navigate = useNavigate();
    const doStuff = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log("stuff done, formProps is: ", {formProps});
        //to do: have this navigate to the CoursesList page w. formProps set up properly
        
        navigate('/courses', { state: {formProps}});
    }
    return(
        <form id='homePageSearchForm' onSubmit={doStuff}>
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