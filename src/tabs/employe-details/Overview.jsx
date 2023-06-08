import { React, useState, useRef, useEffect } from 'react'
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import Grid from '@mui/material/Unstable_Grid2';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const Benefits = () => {
  return (
    <div className="w-full h-40 bg-primary shadow-xl">
      <div className='flex ml-4 pt-4'>
        <div className='font-semibold pl-5'>BENEFITS
        </div>
        <div className='ml-auto'>
          <CreateOutlinedIcon />
        </div>

      </div>
      <div className='flex ml-4 text-sm'>
        <div className='flex-1 mt-7 ml-4'>
          <p className='text-black-300'><DoneAllRoundedIcon /> Accomodation</p>

        </div>
        <div className='flex-1 mt-7 ml-4'>
          <p className='text-black-300'><DoneAllRoundedIcon /> Vehicle Expense</p>

        </div>
        <div className='flex-1 mt-7 ml-4'>
          <p className='text-black-300'><DoneAllRoundedIcon /> House Help</p>

        </div>
        <div className='flex-1 mt-7 ml-4'>
          <p className='text-black-300'><DoneAllRoundedIcon /> Education Expense</p>
        </div>
      </div>

    </div>
  )
}


const Salaryterms = ({ name, email, designation, photo }) => {
  return (
    <div className="w-full h-full bg-primary">
      <div className='flex ml-4 pt-4'>
        <div className='font-semibold pl-5'>SALARY TERMS
        </div>
        <div className='ml-auto'>
          <CreateOutlinedIcon />
        </div>

      </div>
      <div className='text-xs ml-4 mt-5 pl-5'>
        <p className='text-gray-400 underline'>ALLOWANCES</p>
      </div>
      <div className='flex mt-4 ml-5 text-xs pl-4'>
        <div className='flex-1'>
          <p className='text-gray-400'>HRA</p>
          <p className='text-black-300'>RS 6000</p>
        </div>
        <div className='flex-1'>
          <p className='text-gray-400'>Travelling Allowances</p>
          <p className='text-black-300'>MASE2210</p>
        </div>
        <div className='flex-1'>
          <p className='text-gray-400'>Hostel Allowances</p>
          <p className='text-black-300'>Rs 6000</p>
        </div>
        <div className='flex-1'>
          <p className='text-gray-400'>Special Allowances</p>
          <p className='text-black-300'>Rs 6000</p>
        </div>
        <div className='flex-1'>
          <p className='text-gray-400'>Telecommunication</p>
          <p className='text-black-300'>Rs 6000</p>
        </div>
        <div className='flex-1'>
          <p className='text-gray-400'>Special Allowances</p>
          <p className='text-black-300'>Rs 6000</p>
        </div>
      </div>
      <div className='text-xs ml-4 mt-10 pl-5'>
        <p className='text-gray-400 underline'>APPLICABLE FACTS</p>
      </div>
      <div className='flex mt-4 ml-5 text-xs pl-4'>
        <div className='flex-1'>
          <p className='text-gray-400'>PF</p>
          <p className='text-black-300'>MASE2210</p>
        </div>
        <div className='flex-1'>
          <p className='text-gray-400'>PT</p>
          <p className='text-black-300'>MASE2210</p>
        </div>
        <div className='flex-1'>
          <p className='text-gray-400'>ESIC</p>
          <p className='text-black-300'>MASE2210</p>
        </div>
        <div className='flex-1'>
          <p className='text-gray-400'>Graduty</p>
          <p className='text-black-300'>MASE2210</p>
        </div>
        <div className='flex-1'>
          <p className='text-gray-400'>Bonus</p>
          <p className='text-black-300'>MASE2210</p>
        </div>
        <div className='flex-1'>
          <p className='text-gray-400'>TDS</p>
          <p className='text-black-300'>MASE2210</p>
        </div>
      </div>
      <div className='flex mt-6 ml-5 text-xs pl-4'>
        <div className='flex-1'>
          <p className='text-gray-400'>GST</p>
          <p className='text-black-300'>Rs 6000</p>
        </div>
        <div className='flex-1'>
          <p className='text-gray-400'>Workmen compensation</p>
          <p className='text-black-300'>Rs 6000</p>
        </div>

      </div>

      <div className='flex mt-8 ml-5 text-s pl-4 bg-gray-200 h-14'>
        <div className='flex-1 flex pt-4'>
          <div className='text-gray-400 flex'>GROSS PAY </div><div className='text-black-400 ml-3 flex'>Rs 6000</div>
        </div>
        <div className='flex-1 flex pt-4'>
          <div className='text-gray-400 flex'>VARIABLE PAY </div><div className='text-black-400 ml-3 flex'>Rs 6000</div>
        </div>
        <div className='flex-1 flex pt-4'>
          <div className='text-gray-400 flex'>NET PAY</div><div className='text-black-400 ml-3 flex'>Rs 6000</div>
        </div>
        <div className='flex-1 flex pt-4'>
          <div className='text-gray-400 flex'>APPRAISAL DATE </div><div className='text-black-400 ml-3 flex'>Rs 6000</div>
        </div>
      </div>

    </div>
  );
};


const PersonalInfo = ({ name, email, designation, photo }) => {
  return (
    <div style={{ maxHeight: "90vh" }} className="w-full h-80 bg-primary shadow-lg">
      <div className='flex ml-4 py-4'>
        <h1 className='font-semibold'>PERSONAL INFO</h1>
        <div className='ml-auto mr-3'>
          <CreateOutlinedIcon />
        </div>
      </div>

      <Grid container spacing={2} rowGap={2} className='mt-2 ml-2' >
        <Grid xs={3}>
          <p style={{ fontSize: "10px" }} className='text-gray-400'>ALTERNATE CONTACT NO.</p>
          <p style={{ fontSize: "12px" }} className='text-black'>8835676567</p>
        </Grid>
        <Grid xs={3}>
          <p style={{ fontSize: "10px" }} className='text-gray-400'>AADHAR NO.</p>
          <p style={{ fontSize: "12px" }} className='text-black'>456456456456456</p>
        </Grid>

        <Grid xs={3}>
          <p style={{ fontSize: "10px" }} className='text-gray-400'>PANCARD NO.</p>
          <p style={{ fontSize: "12px" }} className='text-black'>+91 5t45645645</p>
        </Grid>
        <Grid xs={3}>
          <p style={{ fontSize: "10px" }} className='text-gray-400'>DRIVER LISENCE</p>
          <p style={{ fontSize: "12px" }} className='text-black'>8765434564</p>
        </Grid>
        <Grid xs={3}>
          <p style={{ fontSize: "10px" }} className='text-gray-400'>BANK HOLDER NAME</p>
          <p style={{ fontSize: "12px" }} className='text-black'>MASE2210</p>
        </Grid>
        <Grid xs={3}>
          <p style={{ fontSize: "10px" }} className='text-gray-400'>BANK NAME</p>
          <p style={{ fontSize: "12px" }} className='text-black'>SEO</p>
        </Grid>
        <Grid xs={3}>
          <p style={{ fontSize: "10px" }} className='text-gray-400'>ACCOUNT NO.</p>
          <p style={{ fontSize: "12px" }} className='text-black'>MASE2210</p>
        </Grid>


        <Grid xs={6}>
          <p style={{ fontSize: "10px" }} className='text-gray-400'>PERMANENT ADDRESS</p>
          <p style={{ fontSize: "12px" }} className='text-black'>MP NAGAR FJNKFJdfughdfhjdfhbdjfgbdfjvhbdfjghbdfjhbdfjghbdfjbhrtrtthgfhffghfhgthfghfhfg</p>
        </Grid>
        <Grid xs={6}>
          <p style={{ fontSize: "10px" }} className='text-gray-400'>TEMPORARY ADDRESS</p>
          <p style={{ fontSize: "12px" }} className='text-black'>TT tyhtyhyttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttdhhfghfghfgh</p>
        </Grid>
      </Grid>
    </div>
  );
};



const Markhead = ({ name, email, designation, photo }) => {
  return (
    <div className="max-w-[300px]  rounded overflow-hidden shadow-lg bg-primary">
      <div className="flex gap-4 ">
        <div>
          <img className="w-20 h-20 rounded-full object-cover object-center ml-5 mt-5" src="https://cdnb.artstation.com/p/assets/images/images/010/538/307/large/midhat-kapetanovic-random-creature-mashup-046-aloose.jpg?1524951918" alt="Employee" />
          <div><p className='text-xs pl-7 py-1 text-green-800 bg-green-100 ml-2 border rounded-lg align-middle'>Active</p></div>
        </div>
        <div className="text-xs mb-2 mt-12"> <p className='text-gray-400'>MAE00134</p><p className='font-semibold '>Marketing Head</p>
        </div>
      </div>
      <hr className='mt-5' />
      <div className="px-6 py-4 text-xs text-black-300">

        <p className="text-xs text-black-300 mt-3">
          < DraftsOutlinedIcon style={{ fontSize: '18px', marginRight: '5px' }} className='text-gray-400' />
          cameron456@gmail.com
        </p>
        <p className="text-xs text-black-300 mt-3">
          < LocalPhoneIcon style={{ fontSize: '18px', marginRight: '5px' }} className='text-gray-400' />
          94545345345
        </p>
        <p className="text-xs text-black-300 mt-3">
          < DraftsOutlinedIcon style={{ fontSize: '18px', marginRight: '5px' }} className='text-gray-400' />
          Marketing
        </p>
        <p className="text-xs text-black-300 mt-3">
          < CalendarTodayOutlinedIcon style={{ fontSize: '18px', marginRight: '5px' }} className='text-gray-400' />
          November 28,2023
        </p>
        <p className="text-xs text-black-300 mt-3 mb-3">
          < LocationOnOutlinedIcon style={{ fontSize: '18px', marginRight: '5px' }} className='text-gray-400' />
          Bhopal
        </p>

      </div>
    </div>
  );
};




const Overview = () => {

  return (

    <div>
      <div className='text-xs bg-orange-50 h-8 pt-2 pl-5 flex align-middle'><InfoRoundedIcon className='bg-yellow-50 mr-2' /> This employee's profile is incomplete.<a className="text-blue-600 ml-3" href="">Complete now</a></div>
      <div className='flex gap-2'>
        <div><Markhead /></div>
        <div className='flex-1' ><PersonalInfo /></div>
      </div>
      <div className='mt-3'>
        <Salaryterms />
      </div>
      <div className='mt-5'>
        <Benefits />
      </div>

    </div>
  )
}

export default Overview