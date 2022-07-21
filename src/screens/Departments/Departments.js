import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Departments.module.css';
import { addDepartments } from '../../services/https.service';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Departments = () => {

  const [name,setName] = useState('');
  const [typeCode,setTypeCode] = useState('');

  const createDepartment = async ()=>{
    // let department = {name:name.trim(),typeCode:typeCode.trim()};
    let department = {name:"Marketing",typeCode:"MKG"}
    let saveDepartment = await addDepartments(department);
    if(saveDepartment.statusCode>=200 && saveDepartment.statusCode<300){
      console.log(" Department added")
    }else{
      console.log(saveDepartment.message)
    }

  }
  return(

      <div className={styles.Departments}>
        Departments Component
        <form>
        <Box  component="form"  sx={{'& > :not(style)': { m: 1, width: '25ch' },  }}  noValidate  autoComplete="off">
          <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} />

          <TextField id="outlined-basic" inputProps={{ maxLength: 3 }} label="Code" variant="outlined" value={typeCode} onChange={(e)=>setTypeCode(e.target.value)} />
          
          </Box>
          <Button variant="contained" onClick={createDepartment}>
            Save Department
          </Button>
        </form>
      </div>
  )
};

Departments.propTypes = {};

Departments.defaultProps = {};

export default Departments;
