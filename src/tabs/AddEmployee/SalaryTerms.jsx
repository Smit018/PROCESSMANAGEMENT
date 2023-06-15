import React from "react";
import Grid from '@mui/material/Unstable_Grid2'
import TextField from '@mui/material/TextField'

const TextFieldC = (props) => {
  const labelStyles = {
    fontSize: '12px',
  };
  return <TextField {...props} label={props.label} variant={props.variant || "outlined"} size={props.size || "small"} InputLabelProps={{ style: labelStyles }} />
}


const SalaryTerms = () => {

  return (
    <div className='bg-white mt-5  '>
      
        <Grid container rowSpacing={6} columnSpacing={8} className="mt-2 ml-2 bg-white pt-3 pl-1">
          <Grid xs={12}>
            <p className="text-black font-semibold">ALLOWANCES</p>
          </Grid>
          <Grid xs={3}>
            <TextFieldC label="HRA" />
          </Grid>
          <Grid xs={3}>
            <TextFieldC label="TRAVELLING ALLOWANCE" />
          </Grid>
          <Grid xs={3}>
            <TextFieldC label="HOSTEL ALLOWANCE" />
          </Grid>
          <Grid xs={3} >
            <TextFieldC label="SPECIAL ALLOWANCE" />
          </Grid>
          <Grid xs={3}>
            <TextFieldC label="TELECOMMUNICATION ALLOWANCE" />
          </Grid>
          <Grid xs={3} >
            <TextFieldC label="BASIC SALARY" />
          </Grid>
        </Grid>

        <Grid container className="mt-5 ml-2 bg-white pt-6 pl-1b" columnSpacing={8}>
          <Grid xs={6} >
            <div className="flex items-center gap-4">
              <p className="text-black font-semibold ">GROSS PAY</p>
              <TextFieldC
                className='bg-slate-50 mr-12'
                disabled
                value={45000}
                style={{ width: "450px" }}
                
              />
            </div>
          </Grid>
          <Grid xs={6} >
            <div className="flex items-center gap-4">
              <p className="text-black font-semibold ">VARIABLE PAY</p>
              <TextFieldC
                style={{ width: "450px" }} />
            </div>
          </Grid>
        </Grid>

        <Grid container rowSpacing={8} columnSpacing={8} className="mt-5 ml-2 bg-white pt-3 pl-1">
          <Grid xs={12}>
            <p className="text-black font-semibold">APPLICABLE FACTS</p>
          </Grid>
          <Grid xs={3}>
            <TextFieldC label="PF" />
          </Grid>
          <Grid xs={3}>
            <TextFieldC label="PT" />
          </Grid>
          <Grid xs={3}>
            <TextFieldC label="ESIC" />
          </Grid>
          <Grid xs={3} >
            <TextFieldC label="GRATUITY" />
          </Grid>
          <Grid xs={3}>
            <TextFieldC label="BONUS" />
          </Grid>
          <Grid xs={3} >
            <TextFieldC label="TDS" />
          </Grid>
          <Grid xs={3} >
            <TextFieldC label="GST" />
          </Grid>
          <Grid xs={3} >
            <TextFieldC label="WORKMEN COMPENSATION" />
          </Grid>

        </Grid>

        <Grid container className="mt-5 ml-2 bg-white pt-6 pl-1" columnSpacing={8}>
          <Grid xs={6} >
            <div className="flex items-center gap-4">
              <p className="text-black font-semibold inline ">NET PAY</p>
              <TextFieldC
                className='bg-slate-50'
                disabled
                value={45000}
                style={{ width: "450px" }}
              />
            </div>
          </Grid>
          <Grid xs={6} >
            <div className="flex items-center gap-4">
              <p className="text-black font-semibold inline">APPRAISAL DATE</p>
              <TextFieldC
                style={{ width: "450px" }} />
            </div>
          </Grid>
        </Grid>
     
    </div>
  )
}

export default SalaryTerms





