import { React, useState } from "react";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const years=[];
const currentYear=new Date().getFullYear();

for(let year=1900;year<=currentYear;year++){
  years.push(year);
}



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [...years];

const DropdownButton=()=> {
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{width: 150,bgcolor:"white" }}>
      <InputLabel id="demo-simple-select-label">year</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          label="year"
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

  
// {years.map((year)=>(
//   <MenuItem value={year} key={year}>{year-1}{"-"}{year} </MenuItem>
// ))}




function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
];

const Table2=()=> {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ }} aria-label="simple table">
        <TableHead className=" w-full">
          <TableRow className="bg-slate-100 h-16">
            <TableCell>Month-Year</TableCell>
            <TableCell align="right">TODOS</TableCell>
            <TableCell align="right">LEAVES</TableCell>
            <TableCell align="right">PERFORMANCE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}







const Performance = () => {
  
  return (
    <div>

      <div className="flex justify-between">
        <p className='text-lg mt-5 ml-5'>Performance</p>
        <div className="flex items-center max-w-full  "> <DropdownButton /><button class=" bg-slate-200 hover:bg-gray-100 h-full   text-gray-800 py-2 px-4 border border-gray-200 rounded shadow text-right">
          Download CSV</button>
          <FileDownloadOutlinedIcon className="bg-white h-full w-15 " />
        </div>


      </div>

      <div className='mt-9'><Table2 /></div>


    </div>
  )
}

export default Performance