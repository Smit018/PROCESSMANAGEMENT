import React from 'react'
import { useState } from 'react'
import '../App.css'
import DateSelect from '../components/DateSelect';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SearchInput } from 'evergreen-ui'
import IOsources from '../components/IOsources';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ChevronRight } from '@mui/icons-material';


const ProcessList = (list) => (
    <div className='w-full rounded flex justify-between items-center bg-blue-50 px-4 py-5 cursor-pointer shadow-md'>
        <div className='mr-4'>
            <h2 className='text-lg text-black font-semibold mb-1'>OPLAW101</h2>
            <p className='text-sm text-gray-500'>Uploading youtube videos for APT study students</p>
        </div>

    </div>
)

const ProcessDetails = () => {
    const paths = [
        { title: 'Dashboard', path: '/pm' },
        { title: 'Processes', path: '/pm/processes' },
        { title: 'ProcessDetails', path: '/pm/processes/process-details' },
      
      ];

    return (
        <div>
            <div className='w-full h-full flex flex-col'>
                <div className='flex justify-between items-center mb-10'>
                     <Breadcrumbs paths={paths} />
                </div>
            </div>
            <div>
                <ProcessList />
            </div>
            <p className='mt-5 text-lg text-black font-semibold' >STEPS</p>
            <div>
                <SimpleAccordion />
            </div>
            <div className='mt-5 py-12'>
                <IOsources heading="INPUT SOURCES"/>
            </div>
            <div className='mt-5 py-12'>
                <IOsources heading="OUTPUT SOURCES"/>
            </div>
        </div>
    )
}

export default ProcessDetails





const SimpleAccordion = () => {
    return (
        <div className=''>
            <Accordion className='mb-3 mt-3 shadow-md'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography >Data Manager</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography >
                        <AccordianContent />
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className='mb-3 shadow-md'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>APT Study 2.0</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <AccordianContent />
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className='mb-3 shadow-md'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>APT Website Admin</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <AccordianContent />
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}

const AccordianContent = () => {
    const [dates, setDates] = useState({
        from: new Date(new Date().setDate(-30)),
        to: new Date()
    })
    return (
        <div>
            <div className='flex justify-between items-center mb-10'>
                <h2 className='text-lg mt-5 ml-5'>Todos</h2>
                <div className='flex gap-4 mt-5'>
                    <div>
                        <p className='text-xs text-gray-400 ml-2'>From</p>
                        <DateSelect
                            date={dates.from}
                            onDateChange={(date) => setDates({ from: date, to: dates.to })}
                        />
                    </div>
                    <div>
                        <p className='text-xs text-gray-400 ml-2'>To</p>
                        <DateSelect
                            date={dates.to}
                            onDateChange={(date) => setDates({ to: date, from: dates.from })}
                        />
                    </div>
                </div>
            </div>
            <div className='ml-5'>
                <p className='mb-5'>Create a custom thumbnail</p>
                <p className='mb-5'>Create a custom thumbnail</p>
                <p className='mb-5'>Create a custom thumbnail</p>
                <p className='mb-5'>Create a custom thumbnail</p>
                <p className='mb-5'>Create a custom thumbnail</p>
                <p className='mb-5'>Create a custom thumbnail</p>
               

            </div>
        </div>
        )
}