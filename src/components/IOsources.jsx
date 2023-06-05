import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ComboBox=({label})=> {
  return (
    <Autocomplete className='w-60 bg-white'
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
      freeSolo="true"
    />
  );
}

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];

const IOsources = ({heading}) => {
  return (
    <div className='ml-3'>
      <h1 className='mb-2 text-black text-2xl'>{heading}</h1>
      <div className='flex flex-wrap'>
        <div className='flex-1'>
            <p className='py-4 text-sm'>Employees and vendors</p>
            <ComboBox label="Add members and vendors"/>
        </div>
        <div className='flex-1'>
            <p className='py-4 text-sm'>Whatsapp groups</p>
            <ComboBox label="Add whatsapp groups"/>
        </div>
        <div className='flex-1'>
            <p className='py-4 text-sm'>Documents</p>
            <ComboBox label="Add Documents"/>
        </div>
      </div>
    </div>
  )
}

export default IOsources
