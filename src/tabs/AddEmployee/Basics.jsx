import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import TextField from '@mui/material/TextField'
import DropdownButton from '../../components/DropdownAddEmployee'

const Basics = () => {
  const labelStyles={
    fontSize:'12px',
  };
  return (
    <div className='bg-white mt-5'>
      <Grid container rowSpacing={8} columnSpacing={4} className="mt-10 ml-2 bg-white pt-6 pl-4">
        <Grid xs={4}>
          <TextField label="FULL NAME" variant="outlined" size="small" InputLabelProps={{style:labelStyles}} />
        </Grid>
        <Grid xs={4}>
          <TextField label="EMAIL ID" variant="outlined" size="small"  InputLabelProps={{style:labelStyles}} type="email" required/>
        </Grid>
        <Grid xs={4}>
          <TextField label="CONTACT NO" variant="outlined" size="small" InputLabelProps={{style:labelStyles}}/>
        </Grid>
        <Grid xs={4}>
          <DropdownButton butName="department" name="DEPARTMENT" />
        </Grid>
        <Grid xs={4}>
          <DropdownButton butName="type" name="TYPE" />
        </Grid>
        <Grid xs={4}>
          <DropdownButton butName="designation" name="DESIGNATION" />
        </Grid>
        <Grid xs={4}>
          <TextField label="EMPLOYEE CODE" variant="outlined" size="small" InputLabelProps={{style:labelStyles}}/>
        </Grid>
        <Grid xs={4}>
          <TextField label="JOINING DATE" variant="outlined" size="small" InputLabelProps={{style:labelStyles}}/>
        </Grid>
        <Grid xs={4}>
          <TextField label="LOCATION" variant="outlined" size="small" InputLabelProps={{style:labelStyles}}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Basics
