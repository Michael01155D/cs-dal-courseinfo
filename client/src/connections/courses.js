//make .env file in client w BACKEND_URL
import dotenv from 'dotenv';
dotenv.config();

const url = `${process.env.BACKEND_URL}/courses`;

const getCourses = async () => {
    try {
        const courses = await fetch(url);
        return courses;
    }
    catch (e) {
        console.log("exception! its: ", e);
        return;
    }
}

export { getCourses }