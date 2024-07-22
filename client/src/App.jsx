import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import AboutPage from './components/AboutPage';
import CoursesList from './components/CoursesList';
import CourseDetails from './components/CourseDetails';
import CoursesByYear from './components/CoursesByYear';
import NotFoundPage from './components/NotFoundPage';
function App() {

  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage />} /> 
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/userProfile" element={<UserProfile/>}/>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/courses:id" element={<CourseDetails />} />
          <Route path="/courses/:year" element={<CoursesByYear />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
