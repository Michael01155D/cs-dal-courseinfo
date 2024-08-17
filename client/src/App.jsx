import { useState, useEffect, useContext } from 'react';
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
import ReviewForm from './components/ReviewForm';
import NotFoundPage from './components/NotFoundPage';
import { getCourses } from './connections/courses';
import { AuthContext } from './contexts';

function App() {
  const [courses, setCourses] = useState([]);

  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem('csDal')) {
      setUser(JSON.parse(localStorage.getItem('csDal')))
    }
  }, [])

  const fetchCourseData = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (e) {
      console.error("Error fetching course data from server")
    }
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
      <AuthContext.Provider value={ {user, setUser} }>
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
              <Route path="/courses/:id/newReview" element={<ReviewForm/>}/>
              <Route path="*" element={<NotFoundPage/>} />
            </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
    </>
  )
}

export default App
