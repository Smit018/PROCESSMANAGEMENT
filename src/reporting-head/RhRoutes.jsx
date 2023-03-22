import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import SideBar from '../components/SideBar/SideBar'
import Dashboard from './Dashboard'
import Login from './Login'

const ReportingHeadRoutes = () => (
    <Routes>
        <Route path='rh' element={<Login />} />
        <Route path='rh/login' element={<Login />} />
        <Route path='rh' element={<SideBar role="rh" />}>
            <Route path='dashboard' element={<Dashboard />} />
        </Route>
    </Routes>
)

export default ReportingHeadRoutes