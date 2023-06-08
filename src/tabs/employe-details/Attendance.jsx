import { React, useState, useRef } from "react";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const years=[];
const months=['January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December',]

const staticData = {
  years: years,
  months: months
}

const currentYear=new Date().getFullYear();

for(let year=1900;year<=currentYear;year++){
  years.push(year);
}

const DropdownButton=(props)=> {
  const [age, setAge] = useState(''); 
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  // const options = Array.isArray(props.name) ? props.name : [];
  return (
    <Box sx={{ minWidth: 120, bgcolor:"white" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label={props.name}
          onChange={handleChange}
        >
          {staticData[props.name]?.map((year)=>(
            <MenuItem value={year} key={year}>{year} </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}


const AddAttendanceButton = ({ onClick,setAttendanceTable }) => {
  const fileInputRef = useRef(null);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  }
  const handleFileSelect = (event) => {
    console.log('file select')
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type !== 'text/csv') {
      setIsSnackBarOpen(true);
      return;
    } else {
      setAttendanceTable(true);
      console.log(selectedFile);
    }

    event.target.value = null;
  }
  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  }


  return (
    <div>
      <button className="flex items-center space-x-2 bg-primary hover:bg-slate-300 text-blue-500 font-bold px-4 rounded"
        onClick={handleButtonClick}> +ADD ATTENDANCE </button>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf,.csv"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      <Snackbar open={isSnackBarOpen}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}>
        <MuiAlert onClose={handleSnackBarClose} severity='error' sx={{ width: '100%' }}>Invalid File Type!</MuiAlert>
      </Snackbar>
    </div>
  );
};


const Attendance = () => {

  const [attendanceTable,setAttendanceTable]=useState(false);
  return (
    <div>

      <div className="flex justify-between">
        <p className='text-lg mt-5 ml-5'>Daily Attendance Report </p>
        <div className="flex"> <DropdownButton name="years" /><DropdownButton name="months" />{attendanceTable===true?(<div><button class=" bg-slate-200 hover:bg-gray-100 h-full   text-gray-800 py-2 px-4 border border-gray-200 rounded shadow text-right">
          Download CSV</button><FileDownloadOutlinedIcon className="bg-white h-full w-15 " /></div>):(null)} </div>
      </div>
      
    
      
      {attendanceTable===true?(<div className='mt-9'><Table /></div>):(<div className="flex justify-center mt-12 text-slate-400">No attendance report added yet.  <AddAttendanceButton setAttendanceTable={setAttendanceTable}/> </div>)}
      


    </div>

    
  )
}

export default Attendance









const Table = () => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="mb-3">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            DATE
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            CHECKIN
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            CHECKOUT
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            STATUS
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">January 2023</td>
          <td className="px-6 py-4 whitespace-nowrap">30</td>
          <td className="px-6 py-4 whitespace-nowrap">0</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">January 2023</td>
          <td className="px-6 py-4 whitespace-nowrap">28</td>
          <td className="px-6 py-4 whitespace-nowrap">0</td>
          <td className="px-6 py-4 whitespace-nowrap">User</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">January 2023</td>
          <td className="px-6 py-4 whitespace-nowrap">28</td>
          <td className="px-6 py-4 whitespace-nowrap">1</td>
          <td className="px-6 py-4 whitespace-nowrap">User</td>
          
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">January 2023</td>
          <td className="px-6 py-4 whitespace-nowrap">28</td>
          <td className="px-6 py-4 whitespace-nowrap">1</td>
          <td className="px-6 py-4 whitespace-nowrap">User</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">January 2023</td>
          <td className="px-6 py-4 whitespace-nowrap">28</td>
          <td className="px-6 py-4 whitespace-nowrap">3</td>
          <td className="px-6 py-4 whitespace-nowrap">User</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">January 2023</td>
          <td className="px-6 py-4 whitespace-nowrap">28</td>
          <td className="px-6 py-4 whitespace-nowrap">4</td>
          <td className="px-6 py-4 whitespace-nowrap">User</td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
  );
};