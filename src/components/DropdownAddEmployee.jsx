import  {React,useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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
const type=["Sales","nonsales"]
const designation=["Marketing Head","reportinghead"]
const department=["marketing","sales","finance"]

const staticData = {
    years: years,
    months: months,
    LOANTYPE:LOANTYPE,
    type:type,
    designation:designation,
    department:department
  }
  


export default function DropdownButton(props) {
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div >
            <FormControl fullWidth size='small' sx={{ maxWidth: 236, }} >
                <InputLabel id="demo-simple-select-helper-label" className='text-xs pt-1'>{props.name}</InputLabel>
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