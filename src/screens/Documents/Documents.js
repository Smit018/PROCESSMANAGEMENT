import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Documents.module.css';

import { post } from '../../services/https.service';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

<<<<<<< HEAD
const Documents = () =>{ 
  
  const [name,setName] = useState('');
  const [link,setLink] = useState('');
  const [documentData, setDocumentData] = useState([]);
  const [addMembers, setAddMembers] = useState([]);
  const [open,setOpen] = useState(false);
=======
const Documents = () => {
>>>>>>> b3fe4d895f7647e94463af36a917051dfd920e79

  const [name, setName] = useState('');
  const [typeCode, setTypeCode] = useState('');
  const [link, setLink] = useState('');
  const [documentData, setDocumentData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let obj = { name: "HR Group", link: "http://localhost:3000/admin/documents" };
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(obj)
    }
    setDocumentData(arr);
<<<<<<< HEAD
  },[0]);

  const createDocument = async ()=>{
    let newDoc = {name:name.trim(),link:link.trim()};
    let saveDoc = await post('documents',newDoc);
    if(saveDoc.statusCode>=200 && saveDoc.statusCode<300){
      addMembers.forEach((e)=>{
        e={...e,documentId:saveDoc._id}
      })
      let addMember_Document = await post("documentMembers",addMembers);
      if(addMember_Document.statusCode>=200 && addMember_Document.statusCode<300){
        console.log('members in a document added')
      }else{
        console.log(addMember_Document.message)
      }
    }else{
=======
  }, [0]);

  const createDocument = async () => {
    let Type = { name: name.trim(), link: typeCode.trim() };
    let saveType = await post('types', Type);
    if (saveType.statusCode >= 200 && saveType.statusCode < 300) {
      console.log(" Type added")
    } else {
>>>>>>> b3fe4d895f7647e94463af36a917051dfd920e79
      console.log(saveType.message)
    }

  }

<<<<<<< HEAD
  const memberAdd = (memId,admin)=>{
    setAddMembers(...addMembers,{memberId:memId,admin:admin})
  }

  const handleClose =()=>{
=======
  const handleClose = () => {
>>>>>>> b3fe4d895f7647e94463af36a917051dfd920e79
    setOpen(false);
  }

  const formValidation = () => {
    if (name.trim().length > 3 && typeCode.trim().length == 3) {
      return false;
    }
    else {
      return true;
    }
  }

  return (
    <div className={styles.Documents}>
      <div className='flex justify-between items-center'>
        <div>
          <span>Master</span>
          <span> {'>'} </span>
          <span> Types </span>
        </div>
        <div className='flex justify-between items-center'>

          <span>
            <span>Filter By</span>
            {/* <span>?</span> */}
          </span>

          <span style={{ margin: '0 20px' }}></span>

          <span>
            <span>Download CSV</span>
            {/* <span>?</span> */}
          </span>


        </div>
      </div>

      <div className='flex justify-end' style={{ margin: "20px 0" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Type
        </Button>
      </div>

<<<<<<< HEAD
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableH-Color">SL No.</TableCell>
                <TableCell className="tableH-Color">Name</TableCell>
                <TableCell className="tableH-Color">Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documentData.map((item,index)=>{
                return(
                  <TableRow>
                      <TableCell className="tableB-Color">{index+1}</TableCell>
                      <TableCell className="tableB-Color">{item.name}</TableCell>
                      <TableCell className="tableB-Color">{item.code}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>  
=======
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableH-Color">SL No.</TableCell>
              <TableCell className="tableH-Color">Name</TableCell>
              <TableCell className="tableH-Color">Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentData.map((item, index) => {
              return (
                <TableRow>
                  <TableCell className="tableB-Color">{index + 1}</TableCell>
                  <TableCell className="tableB-Color">{item.name}</TableCell>
                  <TableCell className="tableB-Color">{item.code}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
>>>>>>> b3fe4d895f7647e94463af36a917051dfd920e79

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Document</DialogTitle>
        <DialogContent>
          <form>
            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
              <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField id="outlined-basic" inputProps={{ maxLength: 2 }} label="Code" variant="outlined" value={typeCode} onChange={(e) => setTypeCode(e.target.value)} />
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type='button' disabled={formValidation()} onClick={createDocument}>
            Save Type
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

Documents.propTypes = {};

Documents.defaultProps = {};

export default Documents;
