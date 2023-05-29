import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function MoveToPip(props) {

  return (
    <div>
     
      <Dialog open={props.open} onClose={()=>props.onClose()}>
        <DialogTitle>MOVE TO PIP</DialogTitle>
        <DialogContent>
          <DialogContentText>
           No. Of Days
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
         <div className='flex align-middle bg-gray-200 h-300'>
            <div>Continued</div>
            <div className='justify-end mr-5 '>November 18,2022</div>
         </div>
        <DialogActions>
          <Button onClick={() => props.onClose()}>SAVE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}