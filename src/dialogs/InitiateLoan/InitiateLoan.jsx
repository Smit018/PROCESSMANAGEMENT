import { React, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DateSelect from '../../components/DateSelect';
import CheckBox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import { CrossIcon } from 'evergreen-ui';
import Grid from '@mui/material/Unstable_Grid2'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const years = [];
const months = ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const LOANTYPE= ["Govt", "Private"];

const currentYear = new Date().getFullYear();

for (let year = 1900; year <= currentYear; year++) {
    years.push(year);
}
const staticData = {
    years: years,
    months: months,
    LOANTYPE:LOANTYPE
  }
  


function DropdownButton(props) {
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div >
            <FormControl fullWidth size='small' sx={{ minWidth: 120, }} >
                <InputLabel id="demo-simple-select-helper-label">{props.name}</InputLabel>
                <Select
                    labelId="demo-simple-small-label"
                    id="demo-select-small"
                    value={age}
                    label={props.name}
                    onChange={handleChange}
                >
                    {staticData[props.butName].map((year) => (
                        <MenuItem value={year} key={year}>{year} </MenuItem>
                    ))}
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
            <Dialog open={props.open} >
                <DialogTitle><div className='flex justify-between bg-blue-50'><h1>INITIATE LOAN</h1><ClearIcon onClick={() => props.onClose()} /></div></DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} rowGap={2} className='mt-2' >
                        <Grid xs={6}>

                            <div className='mr-1 '>
                                <p className='text-base text-gray-400 ml-2 mb-1 font-semibold'>DATE OF LOAN</p>
                                <DateSelect
                                    date={dates.from}
                                    onDateChange={(date) => setDates({ from: date, to: dates.to })}
                                />
                            </div>
                        </Grid>
                        <Grid xs={6}>
                            <div className='flex-1'>
                                <p className=' text-base text-gray-400  mb-1 font-semibold '>STARTING MONTH OF EDUCATION</p>
                                <div className='flex
                                '>
                                    <DropdownButton butName="months" name="months"/>
                                    <DropdownButton butName="years" name="years"/>
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={6}>     
                                <TextField
                                    required
                                    fullWidth
                                    label='DEDUCTION AMOUNT'
                                    autoFocus
                                    margin="dense"
                                    id="outlined-basic"
                                    type="email"
                                    variant="outlined"
                                    size='small'
                                />
                        </Grid>
                        <Grid xs={6}>
                                <TextField fullWidth
                                    autoFocus
                                    margin="dense"
                                    id="outlined-basic"
                                    label='Tenure (no of months)'
                                    type="email"
                                    variant="outlined"
                                    size='small'
                                />
                        </Grid>
                        <Grid xs={6}>
                                <DropdownButton butName="LOANTYPE" name="LOAN TYPE" />
                        </Grid>
                        <Grid className='' xs={6}>
                                <p className='text-xs text-black mt-3 ml-2'><CheckBox {...label} defaultChecked /> Lien on salary</p>
                        </Grid>

                        <Grid container spacing={0}  >
                        <Grid xs={4}>
                            <TextField
                                fullWidth
                                label='HOLDER NAME'
                                autoFocus
                                margin="dense"
                                id="outlined-basic"
                                type="email"
                                variant="outlined"
                                size='small'
                            />

                        </Grid>
                        <Grid xs={4}>
                            <TextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="outlined-basic"
                                type="email"
                                variant="outlined"
                                size='small'
                                label='BANK NAME'
                            />
                        </Grid>
                        <Grid xs={4}>
                            <TextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="outlined-basic"
                                type="email"
                                variant="outlined"
                                size='small'
                                label='ACCOUNT NUMBER'
                            />
                        </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" className='mb-2 mr-2' onClick={() => props.onClose()}>SAVE</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}