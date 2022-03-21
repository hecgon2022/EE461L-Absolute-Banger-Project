import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'


function App() {
  return (
    <>
      <Router>
        <h1>Hello</h1>
        <Navbar />
        <Routes>
          <Route />
        </Routes>
      </Router>
    </>
  );
}

export default App;
