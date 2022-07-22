import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Departments.module.css';
import { post } from '../../services/https.service';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Departments = () => {

  const [name,setName] = useState('');
  const [typeCode,setTypeCode] = useState('');
  const [departmentData, setDepartmentData] = useState([]);
  const [open,setOpen] = useState(false);

  const createDepartment = async ()=>{
    let department = {name:name.trim(),typeCode:typeCode.trim()};
    // let department = {name:"Marketing",typeCode:"MKG"}
    let saveDepartment = await post('departments',department);
    if(saveDepartment.statusCode>=200 && saveDepartment.statusCode<300){
      console.log(" Department added")
    }else{
      console.log(saveDepartment.message)
    }

  }

  useEffect(()=>{
    let obj ={name:"Customer Acquisition",code:"CRA"};
    let arr=[]
    for(let i=0;i<10;i++){
      arr.push(obj)
    }
    setDepartmentData(arr);
  },[0]);

  const handleClose =()=>{
    setOpen(false);
  }

  const formValidation = ()=>{
    if(name.trim().length>3 && typeCode.trim().length==3){
      return false;
    }
    else{
      return true;
    }
  }

  return(

      <div className={styles.Departments}>

      <div className='flex justify-between items-center'>
        <div>
          <span>Master</span>
          <span> {'>'} </span>
          <span> Departments </span>
        </div>
        <div className='flex justify-between items-center'>
          
            <span>
              <span>Filter By</span>
              {/* <span>?</span> */}
            </span>
      
          <span style={{margin:'0 20px'}}></span>
          
          <span>
              <span>Download CSV</span>
              {/* <span>?</span> */}
          </span>
          
        
        </div>
      </div>

      <div className='flex justify-end' style={{margin:"20px 0"}}>
        <Button variant="contained" onClick={()=>setOpen(true)}>
          Add Department
        </Button>
      </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableH-Color">SL No.</TableCell>
                <TableCell className="tableH-Color">Name</TableCell>
                <TableCell className="tableH-Color">Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentData.map((item,index)=>{
                return(
                  <TableRow>
                      <TableCell className="tableB-Color">{index+1}</TableCell>
                      <TableCell className="tableB-Color">{item.name}</TableCell>
                      <TableCell className="tableB-Color">{item.code}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>  

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Department</DialogTitle>
          <DialogContent>
            <form>
              <Box  component="form"  sx={{'& > :not(style)': { m: 1, width: '25ch' },  }}  noValidate  autoComplete="off">
                <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} />
                <TextField id="outlined-basic" inputProps={{ maxLength: 3 }} label="Code" variant="outlined" value={typeCode} onChange={(e  )=>setTypeCode(e.target.value)} />
              </Box>
            </form>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type='button' disabled={formValidation()} onClick={createDepartment}>
            Save Department
          </Button>
          </DialogActions>
      </Dialog>

        <form>
        
          
        </form>
      </div>
  )
};

Departments.propTypes = {};

Departments.defaultProps = {};

export default Departments;
