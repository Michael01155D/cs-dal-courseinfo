import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import './styles/App.css';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import AboutPage from './components/AboutPage';
import CoursesList from './components/CoursesList';
import CourseDetails from './components/CourseDetails';
import CoursesByYear from './components/CoursesByYear';
import NotFoundPage from './components/NotFoundPage';
import { getCourses } from './connections/courses';

function App() {
  const [courses, setCourses] = useState([]);

  const fetchCourseData = async () => {
    const data = await getCourses();
    setCourses(data);
  }

  useEffect(() => {
    fetchCourseData();
  }, [])

  if (courses.length == 0) {
    return (
      <h1>...Loading</h1>
    )
  }
  
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage courses={courses}/>} /> 
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/userProfile" element={<UserProfile/>}/>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesList courses={courses}/>} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/courses/year/:year" element={<CoursesByYear />} />
            <Route path="*" element={<NotFoundPage/>} />
          </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
