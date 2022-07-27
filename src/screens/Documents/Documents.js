import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Documents.module.css';

import { post, get } from '../../services/https.service';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { DateFormat } from '../../services/dateFormat';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Table } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui'
import { Pane, Dialog, Button } from 'evergreen-ui'
import TWOPEOPLE from "../../assets/images/twoPeople.png"


const Documents = () => {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [documentData, setDocumentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [addMembers, setAddMembers] = useState([])

  useEffect(() => {
    getAllDocument()
  },[0]);

  const getAllDocument = async()=>{
    const saveDoc = await get("documents");
    if(saveDoc.statusCode>=200 && saveDoc.statusCode<300){
      let dataFromServer = saveDoc.data;
      setDocumentData(dataFromServer);
    }else{
      alert('Error Document Group')
    }
  }

  const createDocument = async ()=>{
    let newDoc = {name:name.trim(),link:link.trim()};
    let saveDoc = await post('documents',newDoc);
    if(saveDoc.statusCode>=200 && saveDoc.statusCode<300){
      console.log('Document Saved');
      getAllDocument();
    }else{
      console.log(saveDoc.message)
    }

    handleClose();

  }

  const handleClose =()=>{
    setOpen(false);
  }

  const formValidation = () => {
    if (name.trim().length > 3 && link.trim().length>1) {
      return false;
    }
    else {
      return true;
    }
  }

  return (
    <div>
    <div className='flex justify-between items-center m-label'>
      <div>
        <span> Documents </span>
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
      <Button appearance="primary" onClick={() => setOpen(true)}>
        Add Document
      </Button>
    </div>
    
    {documentData.map((item,index)=>{
      return(
      <Link to={`${item.id}`}>  
      <Pane elevation={1} display="flex" justifyContent="space-between" alignItems="center" height={"90px"} width={"100%"}>
        <div className='flex items-center justify-center margin_wh'>
          <div className='circleC1 flex items-center justify-center'>
            <img src={TWOPEOPLE} className="img-201"/>
          </div>
          <div style={{ margin: "0 10px" }}></div>
          <div className='flex flex-col '>
            <div className='m-label'>
              {item.name}
            </div>
            <div className='text-m-label-30'>
              {/* 20 July 2020, 10:30 AM */}
              {DateFormat(item.createdAt,"date-time")}
            </div>
          </div>
        </div>
        <div className='margin_wh1' style={{color:"#66788A"}}>
          42 Members
        </div>
      </Pane>
      </Link>
      )
    }
    )}

    <Dialog isShown={open} onCloseComplete={handleClose}
      title="ADD DOCUMENT"
      width={'50%'}
      confirmLabel="Save Document"
      isConfirmDisabled={formValidation()}
      onConfirm={createDocument}
    >
      <form>
        <div className='flex justify-center items-center'>
          <TextInputField size={100} required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <div style={{ margin: "0 10px" }}></div>
          <TextInputField size={100} required label="Link" value={link} onChange={(e) => setLink(e.target.value)} />
        </div>
      
      </form>

    </Dialog>
  </div>
  )
};

Documents.propTypes = {};

Documents.defaultProps = {};

export default Documents;
