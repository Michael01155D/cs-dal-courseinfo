import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import AboutPage from './components/AboutPage';
import CoursesList from './components/CoursesList';
import CourseDetails from './components/CourseDetails';
import Footer from './components/Footer';
function App() {


  return (
    <BrowserRouter>
      <div id="rootContainer">
        <header>
          <nav>
            <NavBar />
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/userProfile" element={<UserProfile/>}/>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/courses:id" element={<CourseDetails />} />
        </Routes>
        <footer>
          <Footer/>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
