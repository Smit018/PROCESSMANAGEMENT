import { React, useState } from 'react'
import Button from '@mui/material/Button';
import MoveToPip from '../dialogs/MoveToPip/MoveToPip';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Overview from '../tabs/employe-details/Overview';
import Financials from '../tabs/employe-details/Financials';
import Todos from '../tabs/employe-details/Todos'
import Attendance from '../tabs/employe-details/Attendance';
import Performance from '../tabs/employe-details/Performance';
import AccessControls from '../tabs/employe-details/AccessControls';
import DateSelect from '../components/DateSelect';
import MultiSelect from '../components/MultiSelect';
import { PersonRemoveAlt1OutlinedIcon } from '@mui/icons-material/PersonRemoveAlt1Outlined';



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

function BasicTabs(props) {
  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={props.value} onChange={(ev, value) => props.onChange(ev, value)} aria-label="basic tabs example">
          <Tab label="OVERVIEW" {...a11yProps(0)} />
          <Tab label="FINANCIALS" {...a11yProps(1)} />
          <Tab label="TODOS" {...a11yProps(2)} />
          <Tab label="ATTENDANCE " {...a11yProps(3)} />
          <Tab label="PERFORMANCE" {...a11yProps(4)} />
          <Tab label="ACCESS CONTROLS" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={props.value} index={0} >
        <Overview />
      </TabPanel>
      <TabPanel value={props.value} index={1}>
        <Financials />
      </TabPanel>
      <TabPanel value={props.value} index={2}>
        <Todos />
      </TabPanel>
      <TabPanel value={props.value} index={3}>
        <Attendance />
      </TabPanel>
      <TabPanel value={props.value} index={4}>
        <Performance />
      </TabPanel>
      <TabPanel value={props.value} index={5}>
        <AccessControls />
      </TabPanel>
    </Box>
  );
}







const EmployeeDetails = (props) => {
  const [openAddDialog, setAddDialog] = useState(false)

  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const [dates, setDates] = useState({
    from: new Date(new Date().setDate(-30)),
    to: new Date()
  })

  return (
    <div>
      <div className='w-full h-full flex flex-col mt-4'>
        <div className='flex items-center mb-10'>
          <div className='flex mr-2'>

            <h2 className='text-lg'>Employees &gt; Cameron Wilson {(value === 1 || value === 2 || value === 3 || value === 4 || value === 5)
              ? <div className='flex '><p className='text-sm text-gray-500'>Marketing head | Bhopal </p><p className='text-xs px-1 py-1 text-green-800 bg-green-100 ml-2 border rounded-lg'>Active</p></div> : null}
            </h2>
            {(value === 0) ? (<div className='ml-2 bg-white text-blue-400 mb-4 border-white ' >

              <Button variant="outlined" className='border-white' onClick={() => setAddDialog(true)}>MOVE TO PIP </Button>
            </div>) : null}

            {(value === 0) ? (<div className='ml-2 bg-white mb-4'>

              <Button variant="outlined" className='border-white' onClick={() => setAddDialog(true)}>START EEP  </Button>
            </div>) : (<p></p>)}
          </div>



          <div className='flex ml-auto'>
            {value === 2 ?

              <div className='flex ml-5'>
                <div className='ml-8'>
                  <p className='text-xs text-gray-400 ml-2'>From</p>
                  <DateSelect
                    date={dates.from}
                    onDateChange={(date) => setDates({ from: date, to: dates.to })}
                  />
                </div>
                <div className=''>
                  <p className='text-xs text-gray-400 ml-2'>To</p>
                  <DateSelect
                    date={dates.to}
                    onDateChange={(date) => setDates({ to: date, from: dates.from })}
                  />
                </div>
                <div className='mt-4'>
                  <MultiSelect
                    options={[]}
                    label={'FILTER'}
                    filter={true}
                  />
                </div>
              </div>

              : null}

            <p className="text-blue-500 mt-6 ml-2">View Processes &gt;</p>

          </div>
        </div>
      </div>

      <BasicTabs
        value={value}
        onChange={(e, v) => handleChangeTab(e, v)}
      />
      <MoveToPip
        open={openAddDialog}
        onClose={() => setAddDialog(false)}
      />
    </div>

  )
}

export default EmployeeDetails










