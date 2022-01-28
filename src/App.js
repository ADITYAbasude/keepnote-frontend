
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import NoteState from './context/notes/NoteState';
import Login from './components/user/Login'
import Signup from './components/user/Signup'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [ShowDisplay, setDisplay] = useState("none")
  const clickNote = () => {
    if (ShowDisplay === "display") {
      setDisplay("none")
    } else {
      setDisplay("display")
    }
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar clickNote={clickNote} />
          <Routes>
            <Route exact path="/" element={ <Home setDisplay={ShowDisplay} clickNote={clickNote} />} />
            <Route exact path="/login" element={ <Login />} />
            <Route exact path="/signup" element={ <Signup />} />

          </Routes>
        </BrowserRouter>
      </NoteState>

    </>
  );
}

export default App;
