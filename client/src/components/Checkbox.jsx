const Checkbox = ({idName, text, checkedBoxes, setCheckedBoxes}) => {
    //if this box is checked, add field name to array of checkedBoxes passed from CourseList component
    const isChecked = (e) => {
        if (checkedBoxes && e.target.checked) {
            setCheckedBoxes(checkedBoxes.concat(idName));
        } else {
            const updatedArr = checkedBoxes.filter(box => box != idName);
            setCheckedBoxes(updatedArr);
        }
    }
    const handleChange = (e) => {
        isChecked(e);
    }
    return (
        <div className="checkBox">
            <input onChange={(e) => handleChange(e)} name={idName} id={idName} type='checkbox'/>
            <label htmlFor={idName}>{text}</label>
        </div>
    )
}

export default Checkbox;