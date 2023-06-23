import {React,useState} from 'react';
import AllotmentsPage from '../pages/AllotmentsPage'

const Allotments=()=>{
    return (
       <AllotmentsPage button={false} title={true}  description={true} duration={true} />
    )
}


export default Allotments;