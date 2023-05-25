import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, ChevronRightIcon, ControlIcon, DashboardIcon } from 'evergreen-ui';

import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

// ICONS
import { userAuthState } from '../../services/recoil.service';
import { logout, updateLocalStorage } from '../../services/https.service';


import { TextInput, TextInputField, Button, Menu, DocumentIcon, PeopleIcon, MugshotIcon, EditIcon, RandomIcon, ChatIcon, toaster } from "evergreen-ui";
import PromptDialog from '../../dialogs/PromptDialog/PromptDialog';
import { ListSubheader } from '@mui/material';
import { Dashboard } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { AllotmentIcon, HomeIcon, ProcessIcon, TodoIcon } from '../ProcessIcons';

const drawerWidth = 240;



function SideBar(props) {

    const appBar = React.useRef(null)

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [menu, setMenu] = React.useState([])

    const [showLogout, setShowLogout] = React.useState(false)
    const _storage = useRecoilValue(userAuthState);
    const [myAdmin, setMyAdmin] = useRecoilState(userAuthState)

    const navigate = useNavigate()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    React.useEffect(() => {
        setMenu(routes[props.role])
    }, [])

    const routes = {
        admin: [
            { title: 'Dashboard', path: 'dashboard', icon: <Dashboard fontSize='32px' /> },
            { title: 'Processes', path: 'processes', icon: <Dashboard fontSize='32px' /> },
            { title: 'Employees', path: 'employees', icon: <Dashboard fontSize='32px' /> },
            {
                title: 'Todos', path: 'todos', icon: <KeyboardArrowRightIcon fontSize='32px' />, tree: true, children: [
                    { title: 'PIP', path: 'pip', icon: <Dashboard fontSize='32px' /> },
                    { title: 'Loans & Advances', path: 'department', icon: <FiberManualRecordIcon fontSize='32px' /> },
                ]
            },
            { title: 'PIP', path: 'pip', icon: <Dashboard fontSize='32px' /> },
            { title: 'Loans & Advances', path: 'department', icon: <FiberManualRecordIcon fontSize='32px' /> },
            { title: 'Attendance', path: 'department', icon: <FiberManualRecordIcon fontSize='32px' /> },
            { title: 'Performance', path: 'department', icon: <FiberManualRecordIcon fontSize='32px' /> },
            { title: 'Payroll', path: 'department', icon: <FiberManualRecordIcon fontSize='32px' /> },
            { title: 'Vendors', path: 'vendors', icon: <Dashboard fontSize='32px' /> },
            { title: 'Whatsapp Groups', path: 'whatsapp-groups', icon: <Dashboard fontSize='32px' /> },
            { title: 'Documents', path: 'documents', icon: <Dashboard fontSize='32px' /> },
            { title: 'Process Matrix', path: 'process-matrix', icon: <Dashboard fontSize='32px' /> },
            { title: 'Allotments', path: 'pm/allotments', icon: <Dashboard fontSize='32px' /> }
            
        ],
        rh: [
            { title: 'Dashboard', path: 'dashboard', icon: <Dashboard fontSize='32px' /> },
            { title: 'Processes', path: 'processes', icon: <Dashboard fontSize='32px' /> },
            { title: 'Employees', path: 'employees', icon: <Dashboard fontSize='32px' /> },
            { title: 'Todos Report', path: 'documents', icon: <Dashboard fontSize='32px' /> },
            { title: 'PIP', path: 'department', icon: <Dashboard fontSize='32px' /> },
            { title: 'Allotments', path: 'allotments', icon: <Dashboard fontSize='32px' /> }
        ],
        hr: [
            { title: 'Dashboard', path: '/hr/dashboard', icon: <Dashboard fontSize='32px' /> },
            { title: 'Processes', path: '/hr/processes', icon: <Dashboard fontSize='32px' /> },
            { title: 'Employees', path: '/hr/employees', icon: <Dashboard fontSize='32px' /> },
            { title: 'Todos Reports', path: '/hr/documents', icon: <Dashboard fontSize='32px' /> },
            { title: 'PIP', path: '/hr/pip', icon: <FiberManualRecordIcon fontSize='32px' /> },
            { title: 'Loans & Advances', path: '/hr/department', icon: <FiberManualRecordIcon fontSize='32px' /> },
            { title: 'Attendance', path: '/hr/department', icon: <FiberManualRecordIcon fontSize='32px' /> },
            { title: 'Performance', path: '/hr/department', icon: <FiberManualRecordIcon fontSize='32px' /> },
            { title: 'Payroll', path: '/hr/department', icon: <FiberManualRecordIcon fontSize='32px' /> },
            { title: 'Allotments', path: '/hr/allotments', icon: <Dashboard fontSize='32px' /> }
        ],
        employee: [
            { title: 'Dashboard', path: '/pm/dashboard', icon: <HomeIcon/> },
            { title: 'Processes', path: '/pm/processes', icon: <ProcessIcon/>},
            { title: 'Todos', path: '/pm/todo', icon: <TodoIcon/> },
            { title: 'Allotments', path: '/pm/allotments', icon: <AllotmentIcon /> }
        ]
    }


    const Me = () => (
        <div className='py-8 w-full flex'>
            <div className='flex justify-start w-full px-4'>
                <Avatar name={'John Doe'} size={36} marginRight={8} />
                <div>
                    <p className='text-sm'>John Doe</p>
                    <p className='text-xs text-gray-400'>johndoe@mailinator.com</p>
                </div>
            </div>
        </div>
    )

    const MyList = (listProps) => (
        listProps?.menu?.map((_menu, index) => (
            _menu.tree ?
                <div key={index} className='w-full hover:bg-sky-50 cursor-pointer'>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={[{
                            background: 'white'
                        }, {
                            '> li > div:hover': {
                                backgroundColor: 'rgb(240 249 255)',
                            },
                            '> li > div': {
                                paddingX: '20px',
                                paddingY: '8px',
                                background: 'transparent'
                            },
                            '> li > div > div:first-of-type': {
                                width: '48px',
                                paddingX: '8px',
                                display: 'flex',
                                justifyContent: 'flex-start'
                            },
                            '> li > div > div:nth-child(2)': {
                                color: '#374151',
                                fontSize: '13px',
                                padding: 0,
                                fontWeight: 600
                            },
                        }]}
                    >
                        <TreeItem nodeId={'expand' + index} label={_menu.title}>
                            {_menu.children.map((__menu, _index) => (
                                <TreeItem key={_index} icon={__menu?.icon} nodeId={'child-expand-' + (index + (_index || 1))} label={__menu.title}
                                    sx={[
                                        {
                                            backgroundColor: 'white',
                                            paddingX: 0,
                                        },
                                        { '.Mui-selected, .Mui-focused': { backgroundColor: 'white !important' } },
                                        {
                                            ' > div': {
                                                background: 'white',
                                                paddingY: '8px',
                                                marginY: '6px'
                                            }
                                        },
                                        {
                                            ' > div:hover': {
                                                backgroundColor: 'rgb(240 249 255) !important',
                                            },
                                            ' > div:active': {
                                                backgroundColor: 'rgb(240 249 255) !important',
                                            }
                                        },
                                        {
                                            ' > div > div:nth-child(1)': {
                                                width: '48px',
                                                padding: '0 8px',
                                            }
                                        },
                                        {
                                            ' > div > div:nth-child(2)': {
                                                color: '#374151',
                                                fontSize: '13px',
                                                padding: 0,
                                                fontWeight: 600
                                            }
                                        }
                                    ]}
                                />
                            ))}
                        </TreeItem>
                    </TreeView>
                    {/* <div className='px-4 py-2 my-4 flex items-center'>
                        <div className='w-12 px-2'>
                            {_menu.icon}
                        </div>
                        <div className='px-2 flex-auto'>
                            <p className='text-xs text-gray-700 font-medium'>{_menu.title}</p>
                        </div>
                    </div> */}
                </div>
                :
                <div key={index} className='w-full hover:bg-sky-50'>
                    <Link to={_menu.path}>
                        <div className='px-4 py-2 my-4 flex items-center'>
                            <div className='w-12 px-2'>
                                {_menu.icon}
                            </div>
                            <div className='px-2 flex-auto'>
                                <p className='text-xs text-gray-700 font-medium'>{_menu.title}</p>
                            </div>
                        </div>
                    </Link>
                </div>
        ))
    )

    const drawer = (
        <div className='overflow-hidden flex flex-col'>
            <Toolbar />
            <Me />
            <div className='px-4'>
                <p className='text-xs text-gray-400 uppercase'>Main Menu</p>
            </div>
            <div className='overflow-auto'>
                <MyList menu={menu} />
            </div>
            {/* <Menu>
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
            </Menu> */}
        </div>
    );

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

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }} className='h-full'>
            <CssBaseline />
            <AppBar
                ref={appBar}
                color='inherit'
                elevation={0}
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    borderBottom: 0.5,
                    borderBottomColor: '#eee'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">

                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                className='flex-auto'
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' }, marginTop: { sm: '64px', xs: '56px' }, overflow: 'auto' }}
            >
                <Outlet />
            </Box>
            <PromptDialog
                open={showLogout}
                title="Logout?"
                message="Do you really want to logout?"
                onConfirm={() => logMeOut()}
                onClose={() => setShowLogout(false)}
            />
        </Box>
    );
}

SideBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default SideBar;