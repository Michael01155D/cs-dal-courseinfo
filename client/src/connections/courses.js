//make .env file in client w BACKEND_URL

const url = `${import.meta.env.VITE_BACKEND_URL}/courses`;

const getCourses = async () => {
    try {
        const courses = await fetch(url);
        return courses.json();
    }
    catch (e) {
        console.log("exception! its: ", e);
        return;
    }
}

export { getCourses }