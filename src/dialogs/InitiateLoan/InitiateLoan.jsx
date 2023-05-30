import { React, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DateSelect from '../../components/DateSelect';
import CheckBox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const label={inputProps:{'aria-label':'Checkbox demo'}};

 function DropdownButton() {
  const [age, setAge] =useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-small-label"
          id="demo-select-small"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        
      </FormControl>
     
    </div>
  );
}




export default function IniLoanDialog(props) {


    const [dates, setDates] = useState({
        from: new Date(new Date().setDate(-30)),
        to: new Date()
    })

    return (
        <div>
            <Dialog open={props.open} onClose={() => props.onClose()}>
                <DialogTitle><div className='bg-blue-50'>INITIATE LOAN</div></DialogTitle>
                <DialogContent>
                    <div className='flex mt-3'>
                        <div className='flex-1'>
                            <p className='text-xs text-gray-400 ml-2'>DATE OF LOAN</p>
                            <DateSelect
                                date={dates.from}
                                onDateChange={(date) => setDates({ from: date, to: dates.to })}
                            />
                        </div>
                        <div className='flex-1'>
                            <p className='text-xs text-gray-400 ml-2'>STARTING MONTH OF EDUCATION</p>
                            <DropdownButton butName="June" />

                            <DropdownButton butName="2023" />
                        </div>
                    </div>
                    <div className='flex mt-5'>
                        <div className='flex-1'>
                            <p className='text-xs text-gray-400 ml-2'>DEDUCTION AMOUNT</p>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="outlined-basic"
                                type="email"
                                
                                variant="outlined"
                                size='small'
                            />
                        </div>
                        <div className='flex-1'>
                            <p className='text-xs text-gray-400 ml-2'>TENURE(no of months)</p>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="outlined-basic"
                                type="email"
                                
                                variant="outlined"
                                size='small'
                            />
                        </div>
                    </div>
                    <div className='flex mt-5 '>
                        <div className='flex-1'>
                            <p className='text-xs text-gray-400 ml-2'>LOAN TYPE</p>
                           <DropdownButton butName="Bank"/>
                        </div>
                        <div className='flex-1'>
                            <p className='text-xs text-black mt-3 ml-2'><CheckBox {...label} defaultChecked/> Lien on salary</p>
                      
                        </div>
                    </div>
                    <div className='flex mt-5'>
                        <div className='flex-1'>
                            <p className='text-xs text-gray-400 ml-2'>HOLDER NAME</p>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="outlined-basic"
                                type="email"
                                variant="outlined"
                                size='small'
                            />
                        </div>
                        <div className='flex-1'>
                            <p className='text-xs text-gray-400 ml-2'>BANK NAME</p>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="outlined-basic"
                                type="email"
                                variant="outlined"
                                size='small'
                            />
                        </div>
                        <div className='flex-1'>
                            <p className='text-xs text-gray-400 ml-2'>ACCOUNT NO</p>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="outlined-basic"
                                type="email"
                                variant="outlined"
                                size='small'
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.onClose()}>SAVE</Button>
                    
                </DialogActions>
            </Dialog>
        </div>
    );
}