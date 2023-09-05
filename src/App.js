import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import NotFound from './components/notFound/NotFound';
import Login from './components/login/Login';
import UserHome from './components/userhome/UserHome'
import QuizForm from './components/quizForm/QuizForm';
import Footer from './components/footer/Footer';

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home/>} ></Route>
            <Route path="/login" element={<Login/>} ></Route>
            <Route path="*" element = {<NotFound/>}></Route>
            <Route path="/userhome/:username" element = {<UserHome/>}></Route>
            <Route path="/quizform/:username" element = {<QuizForm/>}></Route>
          </Route>
      </Routes>
      <Footer/>

    </div>
  );
}

export default App;