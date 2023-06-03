import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SearchInput } from 'evergreen-ui'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const AccessControls = () => {
  return (
    <div>


      <div className='w-full rounded flex justify-between items-center bg-blue-100 px-4 cursor-pointer hover:bg-stone-50 hover:shadow mb-4'>
        <div className='mr-4 flex-1 py-2'>
          <h2 className='text-lg text-black font-semibold mb-1'>5</h2>
          <p className='text-sm text-gray-400 '>Whatsapp groups</p>
        </div>
        <div className='mr-4 flex-1 py-2'>
          <h2 className='text-lg text-black font-semibold mb-1'>5</h2>
          <p className='text-sm text-gray-400 '>Whatsapp groups</p>
        </div>
        <div className='mr-4 flex-1 py-2'>
          <h2 className='text-lg text-black font-semibold mb-1'>5</h2>
          <p className='text-sm text-gray-400 '>Whatsapp groups</p>
        </div>

      </div>

      <div className='mt-12 pt-5 mb-4'>
        <h1 className='mb-3'>APPLICATIONS</h1>
        <SimpleAccordion/>
      </div>

      <div className='mt-12 pt-5 mb-4'>
        <div className='flex'>
        <h1 className='mb-2 pt-3s'>WHATSAPP GROUPS</h1>
        <div className='flex ml-auto mb-3 pb-3'><SearchInput placeholder="Search..." /></div>
        </div>
        <SimpleAccordion/>
      </div>


    </div>
  )
}

export default AccessControls






const SimpleAccordion=()=>{
  
  return (
    <div className=''>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Data Manager</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography >
            <RadioButtonsGroup/>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>APT Study 2.0</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>APT Website Admin</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>APT Website</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>MIS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}




const RadioButtonsGroup=()=> {
  return (
    <FormControl>
     
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      > <div className='flex '>
        <FormControlLabel className='text-gray-400 flex-1 ' value="No Access" control={<Radio />} label="Female" />
        <FormControlLabel className='text-gray-400 flex-1' value="admin" control={<Radio />} label="Male" />
        <FormControlLabel className='text-gray-400 flex-1' value="Database manager" control={<Radio />} label="Other" />
        <FormControlLabel className='text-gray-400 flex-1' value="Notes Manager" control={<Radio />} label="Female" />
        <FormControlLabel className='text-gray-400 flex-1' value="Video Manager" control={<Radio />} label="Male" />
        <FormControlLabel className='text-gray-400 flex-1' value="Demo Video Manager" control={<Radio />} label="Other" />
        <FormControlLabel className='text-gray-400 flex-1' value="Objective Question Manager" control={<Radio />} label="Other" />
        <FormControlLabel className='text-gray-400 flex-1' value="SUbjective Question Manager" control={<Radio />} label="Other" />   
      </div>
  
      </RadioGroup>
    </FormControl>
  );
}