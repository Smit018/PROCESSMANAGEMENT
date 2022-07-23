import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Employee.module.css';
import { post } from '../../services/https.service';
import { Table } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui'
import { Pane, Dialog, Button } from 'evergreen-ui'

const Employee = () => {
  const [employee,setEmployee] = useState({});
  const [employeeData, setEmployeeData] = useState([]);
  const [open,setOpen] = useState(false);

  const createEmployee = async ()=>{
    let saveType = await post('types',employee);
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
    setEmployeeData(arr);
  },[0]);

  const handleClose =()=>{
    setOpen(false);
  }

  const formValidation = ()=>{
    Object.keys(employee).forEach(e=>{
      if(employee[e].trim().length>1){
        return true
      }else{
        return false;
      }
    })
  }

  return(
  <div className={styles.Employee}>
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
              
                <Table.TextHeaderCell className="tableH-Color">SL No.</Table.TextHeaderCell>
                <Table.TextHeaderCell className="tableH-Color">Name</Table.TextHeaderCell>
                <Table.TextHeaderCell className="tableH-Color">Designation</Table.TextHeaderCell>
                <Table.TextHeaderCell className="tableH-Color">Employee Code</Table.TextHeaderCell>
                <Table.TextHeaderCell className="tableH-Color">Date Joining</Table.TextHeaderCell>
                <Table.TextHeaderCell className="tableH-Color">Date Exit</Table.TextHeaderCell>
                <Table.TextHeaderCell className="tableH-Color">Contact Number</Table.TextHeaderCell>
                <Table.TextHeaderCell className="tableH-Color">Bank Details</Table.TextHeaderCell>
          
            </Table.Head>
            <Table.Body>
              {employeeData.map((item,index)=>{
                return(
                  <Table.Row>
                      <Table.TextCell className="tableB-Color">{index+1}</Table.TextCell>
                      <Table.TextCell className="tableB-Color">{item.name}</Table.TextCell>
                      <Table.TextCell className="tableB-Color">{item.typeCode}</Table.TextCell>
                      <Table.TextCell className="tableB-Color">{item.typeCode}</Table.TextCell>
                      <Table.TextCell className="tableB-Color">{item.typeCode}</Table.TextCell>
                      <Table.TextCell className="tableB-Color">{item.typeCode}</Table.TextCell>
                      <Table.TextCell className="tableB-Color">{item.typeCode}</Table.TextCell>
                      <Table.TextCell className="tableB-Color">{item.typeCode}</Table.TextCell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          
      </Table>

      <Dialog isShown={open} onCloseComplete={handleClose}
        title="Add Type"
        confirmLabel="Save Type"
        isConfirmDisabled={formValidation()}
        onConfirm={createEmployee}
      >
          <form>
            <TextInputField  required label="Name" value={employee.name} onChange={(e) => setEmployee({...employee,name:e.target.value})} />
            <TextInputField  required label="Designation" value={employee.designation} onChange={(e) => setEmployee({...employee,designation:e.target.value})} />
            <TextInputField  required label="Employee Code" value={employee.employeeCode} onChange={(e) => setEmployee({...employee,employeeCode:e.target.value})} />
            <TextInputField  required label="Date Of Joining" value={employee.doj} onChange={(e) => setEmployee({...employee,doj:e.target.value})} />
            <TextInputField  required label="Date Of Exit" value={employee.doe} onChange={(e) => setEmployee({...employee,doe:e.target.value})} />
            <TextInputField  required label="Contact Number" value={employee.contactNo} onChange={(e) => setEmployee({...employee,contactNo:e.target.value})} />
            <TextInputField  required label="Bank Details" value={employee.bankDetails} onChange={(e) => setEmployee({...employee,bankDetails:e.target.value})} />
            <TextInputField  required label="Photo" value={employee.photo} onChange={(e) => setEmployee({...employee,photo:e.target.value})} />
          </form>
        
      </Dialog>
  </div>
  )
};

Employee.propTypes = {};

Employee.defaultProps = {};

export default Employee;
