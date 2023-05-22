import {React,useState} from "react";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';







const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="bg-white text-xs h-11 text-gray-500 py-2 px-4  rounded shadow text-right items-center border-white-500 inline-flex justify-center align-middle w-full px-4 py-2 text-sm font-medium leading-5 text-grey transition duration-150 ease-in-out bg-white-800 border border-transparent rounded-md focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700"
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
             TODOS
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              LEAVES
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              PERFORMANCE
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



const PerformanceMeter=()=>{
    
const [selectedText, setSelectedText] = useState('');

const handleClick = (event) => {
  setSelectedText(event.target.innerText);
};






    return (
        <div>
            <div className='w-full h-full flex flex-col mt-4'>
                <div className='flex justify-between items-center mb-10'>
                    <h2 className='text-lg'>Employees &gt; Shivani Chourasia <p className='text-sm text-gray-500'>Marketing head | Bhopal</p></h2>
                    
                    <div className='flex gap-4 mr-5'>
                      <p className="text-blue-500">View Processes</p>&gt;
                    </div>
                </div>
            </div>


            <div className="flex mb-5">
                <p className='ml-8 mr-8 text-gray-400' onClick={handleClick} >OVERVIEW</p>
                <p className='ml-8 mr-8 text-gray-400' onClick={handleClick}>FINANCIALS</p>
                <p className='ml-8 mr-8 text-gray-400' onClick={handleClick}>TODOS</p>
                <p className='ml-8 mr-8 text-gray-400' onClick={handleClick}>ATTENDANCE</p>
                <p className='ml-8 mr-8 text-gray-400' onClick={handleClick}>PERFORMANCE</p>
                <p className='ml-8 mr-8 text-gray-400' onClick={handleClick}>ACCESS CONTROLS</p>
            </div>
            


            <div className="flex justify-between">
                <p className='text-lg mt-5 ml-5'>{selectedText}</p>
               <div> <DropdownButton/><button class="bg-blue-100 hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-200 rounded shadow text-right">Download CSV</button> <FileDownloadOutlinedIcon/></div>
                

            </div>

            <div className='mt-9'><Table/></div>


        </div>
    )
}



export default PerformanceMeter