import { React, useState, useRef } from "react";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';




const AddAttendanceButton = ({ onClick }) => {
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



const DropdownButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative inline-block text-left">
      <button
        className="bg-white h-11 text-black mt-3 py-2 px-4  rounded shadow text-right items-center border-white-500 inline-flex justify-center align-middle w-full  text-sm font-medium leading-5 text-grey transition duration-150 ease-in-out bg-white-800 border border-transparent focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700"
        // bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow text-right
        onClick={toggleDropdown}
      >
        {props.name}
        <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" >
          <path fillRule="evenodd" d="M10 14l6-6H4l6 6z" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg">
          <div className="py-1 bg-white rounded-md shadow-xs">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
          </div>
        </div>
      )}
    </div>
  );
};



const Attendance = () => {


  return (
    <div>

      <div className="flex justify-between">
        <p className='text-lg mt-5 ml-5'>Daily Attendance Report </p>
        <div> <DropdownButton name="2023" /><DropdownButton name="February" /></div>
      </div>

      <div className="flex justify-center mt-12 text-slate-400">No attendance report added yet.  <AddAttendanceButton /> </div>

      
      <div className="flex justify-between">
        <p className='text-lg mt-5 ml-5'>Daily Attendance Report</p>
        <div> <DropdownButton name="2023" /><button class="bg-blue-100 hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-200 rounded shadow text-right">
          Download CSV</button>
          <FileDownloadOutlinedIcon />
        </div>
      </div>

      <div className='mt-9'><Table /></div>


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
            Month-Year
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            PAID-DAYS
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            PAYABLEDAYS
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            GROSSPAY
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