import { React, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton } from 'evergreen-ui';
import { CrossIcon } from 'evergreen-ui';
import ClearIcon from '@mui/icons-material/Clear';



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

const Card = ({ selectedOption, close }) => {
  return (
    <div>
      <div style={{width:"19vw",height:"12vh"}} className='bg-white shadow-sm justify-between flex items-center  hover:bg-blue-100 cursor-pointer'>
        <h2 className='pl-3'>{selectedOption?.label}</h2>
       
        <ClearIcon className='pr-3' onClick={() => close(selectedOption?.label)}  />

      </div>
    </div>
  )
}

const ComboBox = ({ label }) => {
  const [collector, setCollector] = useState([])
  const [inputValue, setInputValue] = useState('');


  const handleOptionSelect = (event, option) => {
    console.log(event, option)
    if(option) {
      const _arr = [...collector]
      // CHECK ALREADY AVAIL
      const found = _arr.filter(element => ( element?.label === option?.label ))
      console.log('--found', found)
      if(found?.length) {
        // FOUND ALREADY AVAILABLE IN LIST
        alert('already available')
      }
      else {
        _arr.push(option)
        setCollector([..._arr])
        setInputValue('');
      }
   
    }
  }
  const handleInputChange = (event, value) => {
    setInputValue(value);
  }

  const handleClose = (value) => {
    setInputValue('');
    const _arr = [...collector]
    const index = _arr.findIndex((element) => element.label === value)
    _arr.splice(index, 1)
    setCollector([..._arr])
  }
  
  

  return (
    <div>
      <div className='mb-4'>
          {collector && collector.length ? collector.map((_opt, index) =>{ return (
        <Card selectedOption={_opt} close={(value) => handleClose(value)} />)
          }): null }
   </div>

      <Autocomplete className='w-60 bg-white'
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        getOptionLabel={(option) => option?.label}
        sx={{ width: 300 }}
        renderInput={(params) => (<div>
            <TextField {...params} label={label} onChange={handleInputChange} />
          </div>)
        }
        freeSolo="true"
        onChange={handleOptionSelect}
        
      />

   
    </div>

  );
};



const IOsources = ({ heading }) => {


  return (
    <div className='ml-3'>
      <h1 className='mb-2 text-black text-2xl'>{heading}</h1>
      <div className='flex flex-wrap'>
        <div className='flex-1'>
          <p className='py-4 text-sm'>Employees and vendors</p>
          <ComboBox label="Add members and vendors" />
        </div>
        <div className='flex-1'>
          <p className='py-4 text-sm'>Whatsapp groups</p>
          <ComboBox label="Add whatsapp groups" />
        </div>
        <div className='flex-1'>
          <p className='py-4 text-sm'>Documents</p>
          <ComboBox label="Add Documents" />
        </div>
      </div>
    </div>
  )
}

export default IOsources




