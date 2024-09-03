//component receives array of filtered courses, divides them into nested arrays of size 4. current nested array display is toggled by button presses 

import { useEffect, useState } from "react";

import CoursePreview from "./CoursePreview";
import ScrollButton from "./ScrollButton";

import '../styles/CourseGroup.css'

//TODO: figure out why selecting 4th year courses-only isnt impacting visible list

const CourseGroup = ( {filteredCourses} ) => {

    const GROUP_SIZE = 4;
    const [courseGroups, setCourseGroups] = useState([]);
    const [activeGroupIndex, setActiveGroupIndex] = useState(0);

    const divideCourses = () => {
        const numCourses = filteredCourses.length;

        if (numCourses == 0) {
            const reRender = [];
            setCourseGroups(reRender);
        }
        const remainder = numCourses % GROUP_SIZE;
    
        const numFullGroups = (numCourses - remainder) / GROUP_SIZE;
        let index = 0;
        let localArr = []
        //for each full group, add course[index] and increment index, GROUP_SIZE times. 
        for (let i = 0; i < numFullGroups; i++) {
            let courseGrp = [];
            for (let j = 0; j < GROUP_SIZE; j++) {
                courseGrp.push(filteredCourses[index]);
                index++;
            }
            localArr = [...localArr, courseGrp];
            setCourseGroups(localArr);
        }

        if (remainder != 0) {
            let lastGrp = [];
            for (let k = 0; k < remainder; k++) {
                lastGrp.push(filteredCourses[index]);
                index++;
            }
            localArr = [...localArr, lastGrp];
            setCourseGroups(localArr);
        }
    }

    const changeActiveGroup = (dir) => {
        if (dir == "forward") {
            const nextIndex = activeGroupIndex == courseGroups.length - 1 ? 0 : activeGroupIndex + 1;
            setActiveGroupIndex(nextIndex)
        } else {
            const nextIndex = activeGroupIndex == 0 ? courseGroups.length - 1 : activeGroupIndex - 1;
            setActiveGroupIndex(nextIndex);
        }
    }

    useEffect(() => {
        if (filteredCourses) {
            divideCourses();
        }
    }, [filteredCourses])
    
    return (
            courseGroups[activeGroupIndex] ?
            <>
                <header>Use the arrow buttons to cycle between courses</header>
                <section id='courseGridButtons'>
                    <ScrollButton clickHandler={changeActiveGroup} scrollDir={"back"}/>
                    <ScrollButton clickHandler={changeActiveGroup} scrollDir={"forward"}/>
                </section>
                <section id='courseGroupContainer'>
                    {courseGroups[activeGroupIndex].map(course => <CoursePreview  key={course._id} course={course}/>)}
                </section>
            </>
            :
            <></>
            
    )
}

export default CourseGroup; 