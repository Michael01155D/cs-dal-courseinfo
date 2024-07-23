import '../styles/SearchFilters.css'
import Checkbox from './Checkbox';

const SearchFilters = ({searchType, checkedBoxes, setCheckedBoxes}) => {
    //dont need to pass checkedBoxes/setCheckedBoxes props if this component is used in form
    if (searchType == "form") {
        return(
            <section id="searchFormFilters">
                <Checkbox idName='bcs' text='BCS Requirement'/>
                <Checkbox idName='bacs' text='BACS Requirement'/>
                <Checkbox idName='elective' text='Elective'/>
                <Checkbox idName='co-op' text='Co-Op Requirement'/>
                <Checkbox idName='year1' text='First Year'/>
                <Checkbox idName='year2' text='Second Year'/>
                <Checkbox idName='year3' text='Third Year'/>
                <Checkbox idName='year4' text='Fourth Year'/>
            </section>
        )
    }
    if (searchType=="searchBar") {
        return(
            <section id="courseListFilters">
                <Checkbox checkedBoxes={checkedBoxes} setCheckedBoxes={setCheckedBoxes} idName='bcs' text='BCS Requirement'/>
                <Checkbox checkedBoxes={checkedBoxes} setCheckedBoxes={setCheckedBoxes} idName='bacs' text='BACS Requirement'/>
                <Checkbox checkedBoxes={checkedBoxes} setCheckedBoxes={setCheckedBoxes} idName='elective' text='Elective'/>
                <Checkbox checkedBoxes={checkedBoxes} setCheckedBoxes={setCheckedBoxes} idName='co-op' text='Co-Op Requirement'/>
                <Checkbox checkedBoxes={checkedBoxes} setCheckedBoxes={setCheckedBoxes} idName='year1' text='First Year'/>
                <Checkbox checkedBoxes={checkedBoxes} setCheckedBoxes={setCheckedBoxes} idName='year2' text='Second Year'/>
                <Checkbox checkedBoxes={checkedBoxes} setCheckedBoxes={setCheckedBoxes} idName='year3' text='Third Year'/>
                <Checkbox checkedBoxes={checkedBoxes} setCheckedBoxes={setCheckedBoxes} idName='year4' text='Fourth Year'/>

            </section>
        )
    }
}

export default SearchFilters;