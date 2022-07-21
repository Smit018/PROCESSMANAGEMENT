import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AddProcess.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AddProcess = (props) => {
  const [age, setAge] = useState(20)
  const handleClose = () => {
    props.onClose(false);
  };

  const handleChange = (val) => {
    setAge(20)
  }

  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={handleClose}>
        <DialogTitle>Add Process</DialogTitle>
        <Divider />
        <DialogContent>
          <form>
            <div className='flex justify-between'>
              <FormControl fullWidth>
                <p className='m-label'>Type</p>
                <Select
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <FormControl fullWidth>
              <p className='m-label'>Department</p>
                <Select
                  value={age}
                  label="Department"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>Add Process</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AddProcess.propTypes = {};

AddProcess.defaultProps = {};

export default AddProcess;
