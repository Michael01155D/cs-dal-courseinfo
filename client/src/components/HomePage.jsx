import CourseSearcher from './CourseSearcher';
import CoursePreview from './CoursePreview';
import '../styles/HomePage.css';

const HomePage = () => {
    return(
        <div id="homeContainer">
            <header>
                <h2>Dalhousie CS Course Info</h2>
            </header>
            <aside>
                <CourseSearcher/>
            </aside>
            <main>
                <section id="featuredCourses">
                    <h3>Featured Courses</h3>
                    <div id="featuredCourseContainer">
                        <CoursePreview/>
                        <CoursePreview/>
                        <CoursePreview/>
                        <CoursePreview/>
                        <CoursePreview/>
                        <CoursePreview/>
                    </div>
                </section>
                <section id="recentlyUpdatedCourses">
                    <h3>Recently Reviewed Courses</h3>
                    <div id="recentCourseContainer">
                        <CoursePreview />
                        <CoursePreview/>
                        <CoursePreview/>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default HomePage;