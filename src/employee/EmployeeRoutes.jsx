import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import SideBar from '../components/SideBar/SideBar';
import Dashboard from './Dashboard';
import Login from './Login';
import Process from './Process';

const EmployeeRoutes = () => (
    <Routes>
        <Route path='/' exact element={<Login/>} ></Route>
        <Route path='login' element={<Login/>} ></Route>
        <Route path='pm' element={<SideBar role={'employee'}/>} >
            <Route path='' element={<Dashboard/>}/>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='processes' element={<Process/>}/>
        </Route>
    </Routes>
)

export default EmployeeRoutes;