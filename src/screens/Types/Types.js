import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Types.module.css';

import { post } from '../../services/https.service';
import Box from '@mui/material/Box';
import { Table } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui'
import { Pane, Dialog, Button } from 'evergreen-ui'

const Types = () => {

  const [name,setName] = useState('');
  const [typeCode,setTypeCode] = useState('');
  const [typeData, setTypeData] = useState([]);
  const [open,setOpen] = useState(false);

  const createType = async ()=>{
    let Type = {name:name.trim(),typeCode:typeCode.trim()};
    // let department = {name:"Marketing",typeCode:"MKG"}
    let saveType = await post('types',Type);
    if(saveType.statusCode>=200 && saveType.statusCode<300){
      console.log(" Type added")
    }else{
      console.log(saveType.message)
    }

  }

  useEffect(()=>{
    let obj ={name:"Human Resource",typeCode:"HR"};
    let arr=[]
    for(let i=0;i<10;i++){
      arr.push(obj)
    }
    setTypeData(arr);
  },[0]);

  const handleClose =()=>{
    setOpen(false);
  }

  const formValidation = ()=>{
    if(name.trim().length>3 && typeCode.trim().length==3){
      return false;
    }
    else{
      return true;
    }
  }

  return(
  <div className={styles.Types}>
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
      
          <span style={{margin:'0 20px'}}></span>
          
          <span>
              <span>Download CSV</span>
              {/* <span>?</span> */}
          </span>
          
        
        </div>
      </div>

      <div className='flex justify-end' style={{margin:"20px 0"}}>
        <Button appearance="primary" onClick={()=>setOpen(true)}>
          Add Type
        </Button>
      </div>

      <Table aria-label="simple table">
            <Table.Head>
              
                <Table.TextHeaderCell className="th-c">SL No.</Table.TextHeaderCell>
                <Table.TextHeaderCell className="th-c">Name</Table.TextHeaderCell>
                <Table.TextHeaderCell className="th-c">Code</Table.TextHeaderCell>
          
            </Table.Head>
            <Table.Body>
              {typeData.map((item,index)=>{
                return(
                  <Table.Row>
                      <Table.TextCell className="tb-c">{index+1}</Table.TextCell>
                      <Table.TextCell className="tb-c">{item.name}</Table.TextCell>
                      <Table.TextCell className="tb-c">{item.typeCode}</Table.TextCell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          
      </Table>

      <Dialog isShown={open} onCloseComplete={handleClose}
        title="Add Type"
        confirmLabel="Save Type"
        isConfirmDisabled={formValidation()}
        onConfirm={createType}
      >
          <form>
            <TextInputField  required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <TextInputField  required label="Code" value={typeCode} onChange={(e) => setTypeCode(e.target.value)} />
          </form>
        
      </Dialog>
  </div>
  )
};

Types.propTypes = {};

Types.defaultProps = {};

export default Types;
