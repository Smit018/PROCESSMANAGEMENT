import { React, useState, useRef } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import TextField from '@mui/material/TextField'
import DropdownButton from '../../components/DropdownAddEmployee'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const updatedSelectedImages = [...selectedImages];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Validate file type (only accept .jpg and .png files)
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/pdf') {
        updatedSelectedImages.push(file);
      } else {
        setIsSnackBarOpen(true);
      }
    }
    setSelectedImages(updatedSelectedImages);
  };

  const handleImageDelete = (index) => {
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.splice(index, 1);
    setSelectedImages(updatedSelectedImages);
  };

  const handleButtonClick = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  }
  const handleSnackBarClose = () => {
    setIsSnackBarOpen(false);
  }

  return (
    <div className='flex gap-1'>
      <input type="file" multiple onChange={handleImageChange} accept=".jpg, .png,.jsx,.pdf,.jpeg,.csv" ref={fileInputRef} style={{ display: "none" }} />
      <Snackbar open={isSnackBarOpen}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}>
        <MuiAlert onClose={handleSnackBarClose} severity='error' sx={{ width: '100%' }}>Invalid File Type!</MuiAlert>
      </Snackbar>
      <div className='mr-6'>
        <button onClick={handleButtonClick} className='text-blue-600'> Attach Documents <AddCircleOutlineIcon className='text-blue-500' /></button>
      </div>
      <div className="flex flex-wrap gap-3 ">
        {selectedImages.map((image, index) => (
          <div key={index} className="flex relative">
            <img style={{ width: '100px', height: "80px" }} src={URL.createObjectURL(image)} />
            <CloseIcon className=" cursor-pointer text-black absolute top-0 right-0 "
              onClick={() => handleImageDelete(index)} />
          </div>
        ))}
      </div>
    </div>


  );
};



const PersonalInfo = () => {
  const labelStyles = {
    fontSize: '12px',
  };
  return (
    <div className='bg-white mt-5'>
      <Grid container rowSpacing={8} columnSpacing={4} className="mt-10 ml-2 bg-white pt-6 pl-4">
        <Grid xs={6}>
          <TextField fullWidth label="ALTERNATE CONTACT NO." variant="outlined" size="small" InputLabelProps={{ style: labelStyles }} />
        </Grid>
        <Grid xs={6}>
          <TextField fullWidth label="AADHAR NO." variant="outlined" size="small" InputLabelProps={{ style: labelStyles }} type="email" required />
        </Grid>
        <Grid xs={6}>
          <TextField fullWidth label="PANCARD NO" variant="outlined" size="small" InputLabelProps={{ style: labelStyles }} />
        </Grid>
        <Grid xs={6}>
          <TextField fullWidth label="DRIVING LICENSE" variant="outlined" size="small" InputLabelProps={{ style: labelStyles }} />
        </Grid>
        <Grid xs={12} >
          <p className='text-gray-400 '>PAY METHOD</p>
          <FormControlLabel className='text-black' value="admin" control={<Radio />} label="Yes" />
          <FormControlLabel className='text-black ' value="admin" control={<Radio />} label="No" />

        </Grid>
        <Grid xs={4} className="">
          <TextField label="HOLDER NAME" variant="outlined" size="small" InputLabelProps={{ style: labelStyles }} />
        </Grid>
        <Grid xs={4}>
          <TextField label="BANK NAME" variant="outlined" size="small" InputLabelProps={{ style: labelStyles }} />
        </Grid>
        <Grid xs={4}>
          <TextField label="ACCOUNT NO" variant="outlined" size="small" InputLabelProps={{ style: labelStyles }} />
        </Grid>
        <Grid xs={6} className="h-6">
          <p className='text-gray-400'>PERMANENT ADDRESS</p>
          <TextField fullWidth variant="outlined" size="small" InputLabelProps={{ style: labelStyles }} />
        </Grid>
        <Grid xs={6} className="mb-12">
          <p className='text-gray-400 inline mr-3'>CURRENT ADDRESS</p>
          <FormControlLabel className="h-1 text-xs text-gray-300" control={<Checkbox defaultChecked />} label="same as permanent address" />
          <TextField fullWidth variant="outlined" size="small" InputLabelProps={{ style: labelStyles }} />
        </Grid>
        <Grid xs={12}>
          <ImageUploader />
        </Grid>
        <Grid xs={12}>
          <p className='text-gray-400 mb-2'>PERSONAL DECLARATION</p>
          <p className='text-black'>Have you been in close contact with a person diagnosed with,or suspected of being infected by,COVID19?</p>
          <FormControlLabel className='text-black block' value="admin" control={<Radio />} label="Yes" />
          <FormControlLabel className='text-black block' value="admin" control={<Radio />} label="No" />
          <p className='text-black mt-4'>I,the employee,agree with the following statements</p>
          <FormControlLabel className="block" control={<Checkbox defaultChecked />} label="abc" />
          <FormControlLabel className="block" control={<Checkbox defaultChecked />} label="xyz" />
        </Grid>

      </Grid>
    </div>
  )
}

export default PersonalInfo




