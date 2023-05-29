import {React,useState} from 'react'
import Overview from '../pages/Employee/Overview'
import Button from '@mui/material/Button';
import MoveToPip from '../dialogs/MoveToPip/MoveToPip';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="OVERVIEW" {...a11yProps(0)} />
          <Tab label="FINANCIALS" {...a11yProps(1)} />
          <Tab label="TODOS" {...a11yProps(2)} />
          <Tab label="ATTENDANCE " {...a11yProps(2)} />
          <Tab label="PERFORMANCE" {...a11yProps(2)} />
          <Tab label="ACCESS CONTROLS" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
  );
}







const EmployeeDetails = () => {
  const [openAddDialog, setAddDialog] = useState(false)
  return (
    <div>
      <div className='w-full h-full flex flex-col mt-4'>
        <div className='flex items-center mb-10'>
          <h2 className='text-lg'>Employees &gt; Cameron Wilson </h2>
          <div className='ml-12'>
          <Button variant="outlined" onClick={() => setAddDialog(true)}>MOVE TO PIP</Button>
          </div>
          <div className='ml-1 '>
           <Button variant="outlined">START EEP</Button>
          </div>
         
          <div className='flex gap-4 mr-5 ml-auto'>
            <p className="text-blue-500">View Processes</p>&gt;
          </div>
        
        </div>
      </div>
      <BasicTabs/>

      <Overview />
      <MoveToPip
        open={openAddDialog}
        onClose={() => setAddDialog(false)}  
      />
    </div>

  )
}

export default EmployeeDetails