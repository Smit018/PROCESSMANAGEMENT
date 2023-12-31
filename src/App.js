import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { RecoilRoot } from 'recoil'
import { userAuthState } from './services/recoil.service';
import Login from './screens/Login/Login';
import SideBar from './components/SideBar/SideBar';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useNavigate
} from "react-router-dom";

import { Pane, ThemeProvider, defaultTheme, Heading, majorScale, Button, Alert, Checkbox } from 'evergreen-ui'
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import { theme } from './components/Theme';


// SCREENS
import Dashboard from './screens/Dashboard/Dashboard';
import Process from './screens/Process/Process';
import Departments from './screens/Departments/Departments';
import DepartmentDetails from './screens/Departments/DepartmentDetails';
import Documents from './screens/Documents/Documents';
import DocumentDetails from './screens/Documents/DocumentDetails';
import Employee from './screens/Employee/Employee';
import Members from './screens/Members/Members';
import ProcessMatrix from './screens/ProcessMatrix/ProcessMatrix';
import Types from './screens/Types/Types';
import Vendors from './screens/Vendors/Vendors';
import WhatsappGroup from './screens/WhatsappGroup/WhatsappGroup';
import ProcessDetails from './screens/Process/ProcessDetails';
import WhatsappDetails from './screens/WhatsappGroup/WhatsappDetails';
import EmployeeDetails from './screens/Employee/EmployeeDetails';
import VendorDetails from './screens/Vendors/VendorDetails';
import ProcessDetails1 from './screens/Process/processDetails1';
import ProcessMatrix2 from './screens/ProcessMatrix/ProcessMatrix2';
import Main from './screens/Main/Main';
import { useXarrow } from 'react-xarrows';
import AdminRoutes from './admin/AdminRoutes';
import EmployeeRoutes from './employee/EmployeeRoutes';
import ReportingHeadRoutes from './reporting-head/RhRoutes';
import HumanResourceRoutes from './hr/HrRoutes';


function App() {
	const [state, setState] = useState(userAuthState);
	let updateXarrow = useXarrow()


	useEffect(() => {

	}, [])



	return (
		<ThemeProvider value={theme}>
			<Router>
				<RecoilRoot value={state}>
					<EmployeeRoutes />
					<AdminRoutes />
					<ReportingHeadRoutes />
					<HumanResourceRoutes />
				</RecoilRoot>
			</Router>
		</ThemeProvider>
	);
}




export default App;
