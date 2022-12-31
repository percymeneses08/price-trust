import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SignIn from './pages/SignIn/SignIn'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
