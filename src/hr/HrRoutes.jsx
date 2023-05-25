import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import SideBar from '../components/SideBar/SideBar'
import AssignedTodo from './AssignedTodo'
import Dashboard from './Dashboard'
import Login from './Login'
import PerformanceImp from './PerformanceImp'
import Allotments from './Allotments'

const HumanResourceRoutes = () => (
    <Routes>
        <Route path='hr' element={<Login />} />
        <Route path='hr/login' element={<Login />} />
        <Route path='hr' element={<SideBar role="hr" />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='assigned/:type/:mode' element={<AssignedTodo />} />
            <Route path='pip' element={<PerformanceImp />} />
            <Route path='allotments' element={<Allotments />} />
        </Route>
    </Routes>
)

export default HumanResourceRoutes