import CourseSearcher from './CourseSearcher';
import CoursePreview from './CoursePreview';
import '../styles/HomePage.css';
import { getCourses } from '../connections/courses';
import { useEffect, useState } from 'react';
const HomePage = ({courses}) => {

    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [recentCourses, setRecentCourses] = useState([]);
    
    // const fetchCourseData = async () => {
    //     const data = await getCourses();
    //     //sort by most reviews to determine featured courses todo: filter data to only sort degree requirements
    //     const mostFeatured = data.toSorted((a, b) => {
    //         return a.reviews.length < b.reviews.length ? 1 : -1;
    //     })

    //     const mostRecentReviewed = data.toSorted((a, b) => {
    //         if (a.reviews.length == 0) {
    //             return 1;
    //         } else if (b.reviews.length == 0) {
    //             return -1;
    //         }
    //         //if both courses have reviews, prioritize most recently reviewed course
    //         return Date.parse(b.reviews[b.reviews.length - 1].createdAt)
    //             - Date.parse(a.reviews[a.reviews.length - 1].createdAt) 
    //     })

    //     setCourses(data);
    //     //todo: make it so only 6 featured and 3 or 4 recents are set
    //     setFeaturedCourses(mostFeatured);
    //     setRecentCourses(mostRecentReviewed);
    // }

    useEffect(() => {
         const mostFeatured = courses.toSorted((a, b) => {
            return a.reviews.length < b.reviews.length ? 1 : -1;
        })

        const mostRecentReviewed = courses.toSorted((a, b) => {
            if (a.reviews.length == 0) {
                return 1;
            } else if (b.reviews.length == 0) {
                return -1;
            }
            //if both courses have reviews, prioritize most recently reviewed course
            return Date.parse(b.reviews[b.reviews.length - 1].createdAt)
                - Date.parse(a.reviews[a.reviews.length - 1].createdAt) 
        })
        setFeaturedCourses(mostFeatured);
        setRecentCourses(mostRecentReviewed);
    }, [])

    return(
        <div id="homeContainer">
            <header>
                <h2>Dalhousie CS Course Info</h2>
            </header>
            <nav>
                <CourseSearcher/>
            </nav>
            <main>
                <section id="featuredCourses">
                    <h3>Featured Courses</h3>
                    <div id="featuredCourseContainer">
                        {featuredCourses.map(course => <CoursePreview key={course._id} course={course}/>)}
                    </div>
                </section>
                <section id="recentlyUpdatedCourses">
                    <h3>Recently Reviewed Courses</h3>
                    <div id="recentCourseContainer">
                        {recentCourses.map(course => <CoursePreview key={course._id} course={course}/>)}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default HomePage;