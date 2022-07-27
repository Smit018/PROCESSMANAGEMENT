import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { RecoilRoot } from 'recoil'
import { userAuthState } from './services/recoil.service';
import Login from './screens/Login/Login';
import SideBar from './components/SideBar/SideBar';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from "react-router-dom";

import { Pane, ThemeProvider, defaultTheme, Heading, majorScale, Button, Alert, Checkbox } from 'evergreen-ui'
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import { theme } from './components/Theme';


// SCREENS
import Dashboard from './screens/Dashboard/Dashboard';
import Process from './screens/Process/Process';
import Departments from './screens/Departments/Departments';
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


function App() {
	const [state, setState] = useState(userAuthState);


	return (
		<ThemeProvider value={theme}>
			<Router>
				<RecoilRoot value={state}>
					<Routes>
						<Route path='' exact element={<Login />} />
						<Route path='admin' exact element={<SideBar />}>
							<Route path="" element={<Dashboard />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="processes" exact element={<Process />} />
							<Route path="processes/:id" element={<ProcessDetails />} />
							<Route path="employees" element={<Employee />} />
							<Route path="employees/:id" element={<EmployeeDetails />} />
							<Route path="vendors" element={<Vendors />} />
							<Route path="vendors/:id" element={<VendorDetails />} />
							<Route path="whatsapp-groups" element={<WhatsappGroup />} />
							<Route path="whatsapp-groups/:id" element={<WhatsappDetails />} />
							<Route path="documents" element={<Documents />} />
							<Route path="documents/:id" element={<DocumentDetails />} />
							<Route path="department" element={<Departments />} />
							<Route path="type" element={<Types />} />
							<Route path="process-matrix" element={<ProcessMatrix />} />
						</Route>
					</Routes>
				</RecoilRoot>
			</Router>
		</ThemeProvider>
	);
}

export default App;
