import {React,useState} from "react";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EmployeeDetailscomp from '../screens/Employee/EmployeeDetails';


const PerformanceMeter=()=>{
    return (
        <div>
           <EmployeeDetailscomp show={4}/>
        </div>
    )
}



export default PerformanceMeter