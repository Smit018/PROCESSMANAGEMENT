import { React, useState } from 'react'
import Overview from '../tabs/employe-details/Overview';
import Financials from '../tabs/employe-details/Financials';
import Todos from '../tabs/employe-details/Todos'
import Attendance from '../tabs/employe-details/Attendance';
import Performance from '../tabs/employe-details/Performance';
import AccessControls from '../tabs/employe-details/AccessControls';
import EmployeeDetailscomp from '../screens/Employee/EmployeeDetails';


const EmployeeDetails = (props) =>{
  return (
    <div>
       <EmployeeDetailscomp/>
    </div>
  )
}


export default EmployeeDetails










