import './SideBar.css';
import * as React from 'react';

import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

// ICONS
import { userAuthState } from '../../services/recoil.service';
import { updateLocalStorage } from '../../services/https.service';


import { TextInput, TextInputField, Button, HomeIcon, Menu, DocumentIcon, PeopleIcon, MugshotIcon, EditIcon, RandomIcon, ChatIcon } from "evergreen-ui";


const drawerWidth = 300;


const menu = [
	{ title: 'Dashboard', path: '', icon: HomeIcon },
	{ title: 'Processes', path: 'processes', icon: RandomIcon },
	{ title: 'Employees', path: 'employees', icon: PeopleIcon },
	{ title: 'Vendors', path: 'vendors', icon: MugshotIcon },
	{ title: 'Whatsapp Groups', path: 'whatsapp-groups', icon: ChatIcon },
	{ title: 'Documents', path: 'documents', icon: DocumentIcon },
	{ title: 'Departments', path: 'department', icon: DocumentIcon },
	{ title: 'Types', path: 'type', icon: DocumentIcon },
	{ title: 'Process Matrix', path: 'process-matrix', icon: RandomIcon },
]

const SideBar = () => {
	const _storage = useRecoilValue(userAuthState);



	React.useEffect(() => {
		updateLocalStorage(_storage)
	}, [])

	return (
		<div className='w-full h-full flex'>
			<div className='sidenav'>
				{/* DEFINE ROUTES  AND ADMIN INFO */}
				<div style={{ height: 200 }}>

				</div>
				<hr></hr>
				<Menu>
					<Menu.Group>
						{menu.map((_menu, index) => {
							return (
								<Link key={index.toString()} to={_menu.path}>
									<Menu.Item icon={_menu.icon}>{_menu.title}</Menu.Item>
								</Link>
							)
						})
						}
					</Menu.Group>
					<Menu.Divider />
					<Menu.Group>
						<Menu.Item intent="danger">
							Logout
						</Menu.Item>
					</Menu.Group>
				</Menu>
			</div>
			<div className='side-main'>
				<div className='app-bar'></div>
				<div className='routes px-5 py-4'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

SideBar.propTypes = {};

SideBar.defaultProps = {};

export default SideBar;
