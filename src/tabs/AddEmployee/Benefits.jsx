import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Unstable_Grid2'
import Radio from '@mui/material/Radio';
import { Typography } from '@mui/material';

const RadioGroup = () => {
  const labelStyles = {
    fontSize: '12px',
  };
  return <div className='block text-xs'>
    <FormControlLabel className='text-gray-400 text-xs' value="admin" control={<Radio />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>Not Applicable</Typography>} />
    <FormControlLabel className='text-gray-400 text-xs' value="admin" control={<Radio />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>Inkid</Typography>} />
    <FormControlLabel className='text-gray-400 text-xs' value="admin" control={<Radio />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>One Time Reimbursement</Typography>} />
    <FormControlLabel className='text-gray-400 text-xs' value="admin" control={<Radio />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>Annual Reimbursement</Typography>} />
  </div>
}

const Benefits = () => {
  return (
    <div className='bg-white mt-5'>
      <Grid container rowSpacing={8} columnSpacing={4} className="mt-10 ml-2 pt-6 pl-4">
        <Grid xs={6}>
          <FormControlLabel control={<Checkbox defaultChecked />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>ACCOMODATION</Typography>} />
          <RadioGroup />
        </Grid>
        <Grid xs={6}>
          <FormControlLabel control={<Checkbox defaultChecked />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>EDUCATION EXP </Typography>} />
          <RadioGroup />
        </Grid>
        <Grid xs={6}>
          <FormControlLabel control={<Checkbox defaultChecked />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>CLUB EXPENSE</Typography>} />
          <RadioGroup />
        </Grid>

        <Grid xs={6}>
          <FormControlLabel control={<Checkbox defaultChecked />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>CREDIT CARD</Typography>} />
          <RadioGroup />
        </Grid>

        <Grid xs={6}>
          <FormControlLabel control={<Checkbox defaultChecked />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>VEHICLE EXPEN</Typography>} />
          <RadioGroup />
        </Grid>

        <Grid xs={6}>
          <FormControlLabel control={<Checkbox defaultChecked />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>GIFT & VOUCHER</Typography>} />
          <RadioGroup />
        </Grid>

        <Grid xs={12}>
          <FormControlLabel className='' control={<Checkbox defaultChecked />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>TRAVELLING EXPENSE </Typography>} />
          <RadioGroup />
        </Grid>
        <Grid xs={12}>
          <FormControlLabel control={<Checkbox defaultChecked />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>HOUSE HELP</Typography>} />
          <RadioGroup />
        </Grid>
        <Grid xs={12}>
          <FormControlLabel control={<Checkbox defaultChecked />} label={<Typography variant="body2" style={{ fontSize: '12px' }}>MEDICAL EXPENSE</Typography>} />
          <RadioGroup />
        </Grid>
      </Grid>
    </div>
  )
}

export default Benefits

