import { React, useState } from "react";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import IniLoanDialog from "../../dialogs/InitiateLoan/InitiateLoan";






const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="bg-white h-11 text-gray-500 py-2 px-4  rounded shadow text-right items-center border-white-500 inline-flex justify-center align-middle w-full  text-sm font-medium leading-5 text-grey transition duration-150 ease-in-out bg-white-800 border border-transparent focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700"
        // bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded shadow text-right
        onClick={toggleDropdown}
      >
        2023,2022
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 14l6-6H4l6 6z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg">
          <div className="py-1 bg-white rounded-md shadow-xs">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
};



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
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            NET PAY
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            PERFORMANCE
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            PAYSLIP
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">January 2023</td>
          <td className="px-6 py-4 whitespace-nowrap">30</td>
          <td className="px-6 py-4 whitespace-nowrap">0</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">January 2023</td>
          <td className="px-6 py-4 whitespace-nowrap">28</td>
          <td className="px-6 py-4 whitespace-nowrap">0</td>
          <td className="px-6 py-4 whitespace-nowrap">User</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">January 2023</td>
          <td className="px-6 py-4 whitespace-nowrap">28</td>
          <td className="px-6 py-4 whitespace-nowrap">1</td>
          <td className="px-6 py-4 whitespace-nowrap">User</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">January 2023</td>
          <td className="px-6 py-4 whitespace-nowrap">28</td>
          <td className="px-6 py-4 whitespace-nowrap">1</td>
          <td className="px-6 py-4 whitespace-nowrap">User</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">January 2023</td>
          <td className="px-6 py-4 whitespace-nowrap">28</td>
          <td className="px-6 py-4 whitespace-nowrap">3</td>
          <td className="px-6 py-4 whitespace-nowrap">User</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">January 2023</td>
          <td className="px-6 py-4 whitespace-nowrap">28</td>
          <td className="px-6 py-4 whitespace-nowrap">4</td>
          <td className="px-6 py-4 whitespace-nowrap">User</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
          <td className="px-6 py-4 whitespace-nowrap">Admin</td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
  );
};


const Financials = () => {
  const [openAddDialog,setAddDialog]=useState(false);
  const handleClick=()=>{
    setAddDialog(true);
  }

  return (
    <div>

      <div className="flex justify-between">
        <p className='text-lg mt-5 ml-5'>Salary Pay History</p>
        <div> <DropdownButton /><button class="bg-blue-100 hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-200 rounded shadow text-right">
          Download CSV</button>
          <FileDownloadOutlinedIcon className="bg-white h-full w-15 " />
        </div>
      </div>

      <div className='mt-9'><Table /></div>
      
      <div className="flex mt-5">
        <p className='text-lg mt-7 ml-5'>Loan And Advances</p>
         <button className="bg-blue-100 ml-auto mt-4 hover:bg-gray-100 text-blue-600 py-2 px-4 border border-gray-200 rounded text-right"
      onClick={handleClick} > Initiate loan</button>
      </div>
      <div className=" flex mt-8 text-gray-400 items-center justify-center">
        No loans initiated yet...
      </div>
      <IniLoanDialog
          open={openAddDialog}
          onClose={() => setAddDialog(false)}
          
       />
    </div>
  )
}



export default Financials