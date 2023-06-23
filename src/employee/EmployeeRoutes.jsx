import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import SideBar from '../components/SideBar/SideBar';
import Dashboard from './Dashboard';
import Login from './Login';
import Process from './Process';
import AssignedBy from './AssignedTodo'
import ProcessDetails from './ProcessDetails';
import PerformanceMeter from './PerformaceMeter';
import Allotments from './Allotments';
import Whatsappgroup from '../screens/WhatsappGroup/WhatsappGroup'

const EmployeeRoutes = () => (
    <Routes>
        <Route path='/' exact element={<Login/>} ></Route>
        <Route path='login' element={<Login/>} ></Route>
        <Route path='pm' element={<SideBar role={'employee'}/>} >
            <Route path='' element={<Dashboard/>}/>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='processes' element={<Process/>}/>
            <Route path='allotments' element={<Allotments/>}/>
            <Route path='assigned/:type/:mode' element={<AssignedBy/>}/>
            <Route path='processes/process-details' element={<ProcessDetails/>}/>
            <Route path='performance-meter' element={<PerformanceMeter/>}/>
            <Route path='whatsapp-groups' element={<Whatsappgroup/>}/>

        </Route>
    </Routes>
)

export default EmployeeRoutes;