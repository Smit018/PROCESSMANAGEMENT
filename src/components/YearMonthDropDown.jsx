import { React, useState, useRef } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const years=[];
const months=['January',
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
'December',]

const staticData = {
  years: years,
  months: months
}

const currentYear=new Date().getFullYear();

for(let year=1900;year<=currentYear;year++){
  years.push(year);
}

const YearMonthDropDown=(props)=> {
  const [age, setAge] = useState(''); 
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  // const options = Array.isArray(props.name) ? props.name : [];
  return (
    <Box sx={{ minWidth: 120, bgcolor:"white" ,  }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" className="pb-3">{props.name}</InputLabel>
        <Select
          className=" h-10"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label={props.name}
          onChange={handleChange}
        >
          {staticData[props.name]?.map((year)=>(
            <MenuItem value={year} key={year}>{year} </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default YearMonthDropDown;