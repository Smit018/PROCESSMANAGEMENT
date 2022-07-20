import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import Login from './screens/Login/Login';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { theme } from './components/Theme';


function App() {


  return (
    <ThemeProvider theme={theme}>
      <Login/>
    </ThemeProvider>
  );
}

export default App;
