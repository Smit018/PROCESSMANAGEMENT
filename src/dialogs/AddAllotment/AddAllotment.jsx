import { React, useState } from 'react'
import DateSelect from '../../components/DateSelect';
import { IconButton, CrossIcon } from 'evergreen-ui';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




export default function AddAllotment(props) {

  const [dates, setDates] = useState({
    from: new Date(new Date().setDate(-30)),
    to: new Date()
  })

  return (
    <div>
      <Dialog open={props.open} onClose={() => props.onClose()}>
        <DialogTitle>RECORD ALLOTMENT</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="TITLE"
            type="email"
            fullWidth
            value={props.title}
            variant="standard"
            onChange={(e) => props.onTitleChange(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="email"
            fullWidth
            value={props.description}
            variant="standard"
            onChange={(e) => props.onDescriptionChange(e.target.value)}
          />
          <div className='flex gap-4 mt-5 justify-between'>
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                
                label="Employee"
                type="email"
                fullWidth
                value={props.employeename}
                variant="standard"
                onChange={(e) => props.onNameChange(e.target.value)}
              />
            </div>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onClose()}>Cancel</Button>
          <Button onClick={() => props.save()}>SAVE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

