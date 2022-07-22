import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import Login from './screens/Login/Login';
import SideBar from './components/SideBar/SideBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { theme } from './components/Theme';


// SCREENS
import Dashboard from './screens/Dashboard/Dashboard';
import Process from './screens/Process/Process';
import Departments from './screens/Departments/Departments';
import Documents from './screens/Documents/Documents';
import Employee from './screens/Employee/Employee';
import Members from './screens/Members/Members';
import ProcessMatrix from './screens/ProcessMatrix/ProcessMatrix';
import Types from './screens/Types/Types';
import Vendors from './screens/Vendors/Vendors';
import WhatsappGroup from './screens/WhatsappGroup/WhatsappGroup';


function App() {


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='' exact element={<Login />} />
          <Route path='admin' exact element={<SideBar />}>
            <Route path="" element={<Dashboard/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="processes" element={<Process/>}/>
            <Route path="employees" element={<Employee/>}/>
            <Route path="vendors" element={<Vendors/>}/>
            <Route path="whatsapp-groups" element={<WhatsappGroup/>}/>
            <Route path="documents" element={<Documents/>}/>
            <Route path="department" element={<Departments/>}/>
            <Route path="type" element={<Types/>}/>
            <Route path="process-matrix" element={<ProcessMatrix/>}/>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
