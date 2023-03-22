import './SideBar.css';
import * as React from 'react';
import { Avatar, ControlIcon, DashboardIcon } from 'evergreen-ui';

import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

// ICONS
import { userAuthState } from '../../services/recoil.service';
import { logout, updateLocalStorage } from '../../services/https.service';


import { TextInput, TextInputField, Button, HomeIcon, Menu, DocumentIcon, PeopleIcon, MugshotIcon, EditIcon, RandomIcon, ChatIcon, toaster } from "evergreen-ui";
import PromptDialog from '../../dialogs/PromptDialog/PromptDialog';
import { useXarrow, Xwrapper } from 'react-xarrows';


const drawerWidth = 300;


const menu = [
	{ title: 'Dashboard', path: 'dashboard', icon: ControlIcon },
	{ title: 'Processes', path: 'processes', icon: RandomIcon },
	{ title: 'Employees', path: 'employees', icon: PeopleIcon },
	{ title: 'Vendors', path: 'vendors', icon: MugshotIcon },
	{ title: 'Whatsapp Groups', path: 'whatsapp-groups', icon: ChatIcon },
	{ title: 'Documents', path: 'documents', icon: DocumentIcon },
	{ title: 'Departments', path: 'department', icon: DocumentIcon },
	{ title: 'Types', path: 'type', icon: DocumentIcon },
	{ title: 'Process Matrix', path: '../process-matrix', icon: RandomIcon },
]

const SideBar = () => {
	const [showLogout, setShowLogout] = React.useState(false)
	const _storage = useRecoilValue(userAuthState);
	const [admin, setMyAdmin] = useRecoilState(userAuthState)

	const navigate = useNavigate()


	React.useEffect(() => {
		if (_storage.token)

			updateLocalStorage(_storage)
		else navigate('/')
	}, [])

	const updateXarrow = useXarrow()


	const logMeOut = () => {
		localStorage.removeItem('process-management');
		logout().then(res => {
			setMyAdmin({
				token: null,
				name: null,
				userId: null
			})
			toaster.success('Logged out succussfully!')
			navigate('/')
		})
	}

	return (
		<div className='w-full h-screen flex'>
			<div className='sidenav sticky top-0'>
				{/* DEFINE ROUTES  AND ADMIN INFO */}
				<div className='flex items-center justify-center h-16 border-b border-r bg-gray-50'
					style={{ 'color': '#66788A', 'fontWeight': '500', 'fontSize': '18' }}>
					<h1 className=''>PROCESS MANAGEMENT</h1>
				</div>
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
						<Menu.Item intent="danger" onClick={() => setShowLogout(true)}>
							Logout
						</Menu.Item>
					</Menu.Group>
				</Menu>
			</div>
			<div className='side-main'>
				<div className='app-bar shadow-lg flex justify-end align-middle'>
					<div className="avatar">
						<p className='relative bottom-1 mr-1'>{_storage?.name}</p>
						<div>

							<Avatar
								// zIndex={index + 2}
								size={50}
								// src={member?.member?.profile ? `${baseUrl}photos/${member?.member?.memberType?.toLowerCase()}/download/${member?.member?.profile}` : null}
								name={_storage?.name}
							/>
						</div>





					</div>
				</div>
				{/* <Xwrapper> */}
				{/* <div onScroll={updateXarrow}> */}
				<div className='routes px-5 py-4 overflow-auto'>
					<Outlet />
				</div>
				{/* </div> */}
				{/* </Xwrapper> */}



			</div>
			<PromptDialog
				open={showLogout}
				title="Logout?"
				message="Do you really want to logout?"
				onConfirm={() => logMeOut()}
				onClose={() => setShowLogout(false)}
			/>
		</div>
	);
}

SideBar.propTypes = {};

SideBar.defaultProps = {};

export default SideBar;
