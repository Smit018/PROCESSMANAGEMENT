import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CrossIcon } from '@mui/icons-material';

export default function MoveToPip(props) {

  return (
    <div className='w-56'>
     
      <Dialog open={props.open} onClose={()=>props.onClose()} 
       PaperProps={{
        sx:{maxwidth:"520px!important",  width:"100%",minHeight:"250px"},
    }} >
        <DialogTitle className='bg-slate-100 mb-2'>MOVE TO PIP</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="email"
            fullWidth
            variant="outlined"
            label="No. Of Days"
          />
        </DialogContent>
         <div className='flex bg-slate-200 h-fit justify-between'>
            <div className='pl-24'>Continued</div>
            <div className='pr-10 text-xs text-gray-400 pt-3'>November 18,2022</div>
         </div>
        <DialogActions>
          <Button onClick={() => props.onClose()}>SAVE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}