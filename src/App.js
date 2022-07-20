import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import Login from './screens/Login/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { theme } from './components/Theme';


function App() {


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' exact element={<Login/>}/>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
