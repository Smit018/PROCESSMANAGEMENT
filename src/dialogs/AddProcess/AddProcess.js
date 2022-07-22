import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AddProcess.css';
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
import { Button, TextField } from '@mui/material';
import { REGEX } from '../../services/https.service';
import AccountCircle from '@mui/icons-material/AccountCircle'
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';



const _formDefault = {
  "title": {
    value: '',
    error: false,
    regex: REGEX.TITLE
  },
  "processNumber": {
    value: '',
    error: false,
    regex: REGEX.TITLE
  },
  "typeId": {
    value: '',
    error: false,
    regex: REGEX.ALL
  },
  "departmentId": {
    value: '',
    error: false,
    regex: REGEX.ALL
  },
  "processOwner": {
    value: '',
    error: false,
    regex: REGEX.ALL
  },
  "inputProcess": {
    value: '',
    error: false,
    regex: REGEX.ALL
  },
  "frequency": {
    value: '',
    error: false,
    regex: REGEX.ALL
  },
  "duration": {
    value: '',
    error: false,
    regex: REGEX.ALL
  },
  "inputSourceSelf": {
    value: '',
    error: false,
    regex: REGEX.ALL
  },
  "reportingHead": {
    value: '',
    error: false,
    regex: REGEX.ALL
  },
}

const AddProcess = (props) => {
  const [formValues, setFormValues] = useState(_formDefault)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = React.useState(false);

  const [age, setAge] = useState(20)

  const handleClose = () => {
    props.onClose(false);
  };

  const handleInputChange = (e) => {
    // HANDLE INPUT CHANGE
    const { name, value } = e.target;
    const _formValues = { ...formValues }
    _formValues[name]['value'] = value
    setFormValues(_formValues);
  };

  const handleChange = (e) => {
    console.log(e.target.value)
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
                <Autocomplete
                  disablePortal
                  id="department"
                  options={_options}
                  renderInput={(params) => <TextField {...params} />} />
              </FormControl>
            </div>
            <br></br>
            <div className='flex justify-between'>
              <FormControl fullWidth>
                <p className='m-label'>Process No</p>
                <TextField
                  required
                  error={formValues.processNumber.error}
                  id="processNumber"
                  name="processNumber"
                  type="text"
                  value={formValues.processNumber.value}
                  onChange={handleInputChange}
                  helperText={formValues.processNumber.error ? "Process number is invalid!" : ""}
                  InputProps={{
                    startAdornment: (
                      <div style={{ padding: 16, background: '#f5f5f5', marginLeft: -14 }}>
                        A
                      </div>
                    ),
                  }}
                  variant="outlined"
                />
              </FormControl>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <FormControl fullWidth>
                <p className='m-label'>Process Title</p>
                <TextField
                  required
                  error={formValues.title.error}
                  id="title"
                  name="title"
                  type="text"
                  value={formValues.title.value}
                  onChange={handleInputChange}
                  helperText={formValues.title.error ? "Process title is invalid!" : ""}
                />
              </FormControl>
            </div>
            <br></br>
            <div className='flex justify-between'>
              <FormControl fullWidth>
                <p className='m-label'>Input Process</p>
                <Autocomplete
                  disablePortal
                  id="inputProcess"
                  options={_options}
                  renderInput={(params) => <TextField {...params} />} />
              </FormControl>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <FormControl fullWidth>
                <p className='m-label'>Process Owner</p>
                <Autocomplete
                  disablePortal
                  id="processOwner"
                  options={_options}
                  renderInput={(params) => <TextField {...params} />} />
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


const _options = ['Hello', 'World', 'This', 'Time']