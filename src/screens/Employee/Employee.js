import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import styles from './Employee.module.css';
import "./Employee.css";
import { baseUrl, get, post } from '../../services/https.service';
import { DateFormat } from '../../services/dateFormat';
import { Table } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui';
import USERIMG from "../../assets/images/userImgs.png";
import { Pane, Dialog, Button, MediaIcon, SmallPlusIcon, UserIcon, SmallCrossIcon } from 'evergreen-ui'

const Employee = () => {
  const [employee, setEmployee] = useState({});
  const [imgPresent, setImgPresent] = useState(false);
  const [image, setImage] = useState();
  const [saveImage, setSaveImage] = useState();
  const [employeeData, setEmployeeData] = useState([]);
  const [open, setOpen] = useState(false);
  let imageHandler = useRef(null);

  const createEmployee = async () => {
    let imgToServer, saveEmp;
    if (image) {
      imgToServer = await UploadImage(saveImage);
      if (imgToServer) {
        saveEmp = { ...employee, profile: imgToServer }
      }
    }
    saveEmp = { ...saveEmp, memberType: "EMPLOYEE", userName: saveEmp.email }
    let saveType = await post('members', saveEmp);
    if (saveType.statusCode >= 200 && saveType.statusCode < 300) {
      console.log("Employee added")
    } else {
      console.log(saveType.message)
    }

  }

  useEffect(() => {
    getAllEmpoloyees()
    // setEmployeeData();
  }, [0]);

  const getAllEmpoloyees = async () => {
    const employ = await get('members?filter={"where":{"memberType":"EMPLOYEE"}}');
    console.log(employ)
    if (employ.statusCode >= 200 && employ.statusCode < 300) {
      setEmployeeData(employ.data);
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  const formValidation = () => {
  }

  const removeImage = (e) => {
    e.stopPropagation();
    setImgPresent(false);
    setImage(null)
  }

  const handleImage = async (e) => {
    // UploadImage(e.target.files[0]);
    setSaveImage(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]))
    setImgPresent(true);

  }

  const UploadImage = async (file) => {

    let formData = new FormData();
    formData.append('file', file)
    const image = await post("photos/employee/upload", formData)
    console.log(image)
    if (image.data) {
      return image.data.result.files.file[0].name
    } else {
      return null;
    }

  }

  const getImage = async (img) => {
    if (img == "" || !img) {
      return true
    }
    const getImg = await get(`photos/employee/files/${img}`);
    if (getImg.statusCode > 200 && getImg.statusCode < 300) {
      return false
    }
    else {
      return true
    }
  }

  const ImageUrl = (container, file) => {
    return `${baseUrl}photos/${container}/download/${file}`
  }

  const showMemberImage = (img) => {
    const source = ImageUrl('employee', img)
    // alert(source)
    return (
      <img className='img-20' src={source} onError={(e) => imageErrHandling(e)} />
    )
  }

  const imageErrHandling = (e) => {
    e.target.src = USERIMG
  }



  return (
    // <div className={styles.Employee}>
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <span className='m-label'> Employees </span>
        </div>
        <div className='flex justify-between items-center'>

          <span>
            <span className='m-label'>Filter By</span>
            {/* <span>?</span> */}
          </span>

          <span style={{ margin: '0 20px' }}></span>

          <span>
            <span className='m-label'>Download CSV</span>
            {/* <span>?</span> */}
          </span>


        </div>
      </div>

      <div className='flex justify-end' style={{ margin: "20px 0" }}>
        <Button appearance="primary" onClick={() => setOpen(true)}>
          Add Employee
        </Button>
      </div>

      <Table aria-label="simple table">
        <Table.Head>
          <Table.TextHeaderCell className="tableH-Color">Profile</Table.TextHeaderCell>
          <Table.TextHeaderCell className="tableH-Color">Name</Table.TextHeaderCell>
          <Table.TextHeaderCell className="tableH-Color">Vendor Name</Table.TextHeaderCell>
          <Table.TextHeaderCell className="tableH-Color">Employee Code</Table.TextHeaderCell>
          <Table.TextHeaderCell className="tableH-Color">Date Joining</Table.TextHeaderCell>
          <Table.TextHeaderCell className="tableH-Color">Date Exit</Table.TextHeaderCell>
          <Table.TextHeaderCell className="tableH-Color">Contact Number</Table.TextHeaderCell>
          <Table.TextHeaderCell className="tableH-Color">Bank Details</Table.TextHeaderCell>

        </Table.Head>
        <Table.Body>
          {employeeData.map((item, index) => {
            return (
              <Table.Row>
                <Table.TextCell className="tableB-Color">{showMemberImage(item.profile)}</Table.TextCell>
                <Table.TextCell className="tableB-Color">{item.name}</Table.TextCell>
                <Table.TextCell className="tableB-Color">{item.designation}</Table.TextCell>
                <Table.TextCell className="tableB-Color">{item.employeeCode}</Table.TextCell>
                <Table.TextCell className="tableB-Color">{DateFormat(item.doj)}</Table.TextCell>
                <Table.TextCell className="tableB-Color">{item.doe || "-"}</Table.TextCell>
                <Table.TextCell className="tableB-Color">{item.contactNo}</Table.TextCell>
                <Table.TextCell className="tableB-Color">{item.bankDetails}</Table.TextCell>
              </Table.Row>
            )
          })}
        </Table.Body>

      </Table>

      <Dialog isShown={open} onCloseComplete={handleClose}
        title="Add Employee"
        confirmLabel="Save Employee"
        isConfirmDisabled={formValidation()}
        onConfirm={createEmployee}
      >
        <form className='employee'>
          <div className='flex flex-col justify-center items-center'>
            <div className="flex-col flex justify-center items-center pol" style={{ position: "relative", cursor: "pointer" }} onClick={() => { console.log(imageHandler); imageHandler.current.click() }}>
              {!imgPresent ? <>
                <SmallPlusIcon size={21} style={{ position: "absolute", top: 0, right: 0, color: "white", backgroundColor: "black", borderRadius: "30px" }} />
                <UserIcon size={90} />
              </> :
                <>
                  <SmallCrossIcon style={{ position: "absolute", top: 0, right: 0, color: "white", backgroundColor: "black", borderRadius: "30px" }} onClick={removeImage} />
                  <img src={image} className="pol" onClick={(e) => e.stopPropagation()} />
                </>}
            </div>
            <TextInputField accept='image/*' ref={imageHandler} type="file" onChange={(e) => handleImage(e)} />
          </div>
          <TextInputField required label="Name" value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
          <div className='flex justify-center items-center'>
            <TextInputField size={100} required label="Email" value={employee.email} onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
            <div style={{ margin: "0 10px" }}></div>
            <TextInputField size={100} required label="Password" type="password" value={employee.password} onChange={(e) => setEmployee({ ...employee, password: e.target.value })} />
          </div>

          <div className='flex justify-center items-center'>
            <TextInputField size={100} required label="Designation" value={employee.designation} onChange={(e) => setEmployee({ ...employee, designation: e.target.value })} />
            <div style={{ margin: "0 10px" }}></div>
            <TextInputField size={100} required label="Employee Code" value={employee.employeeCode} onChange={(e) => setEmployee({ ...employee, employeeCode: e.target.value })} />
          </div>

          <div className='w-full flex justify-center items-center doe-doj' >
            <div className='w-full'>
              <TextInputField size={100} type="date" required label="Date Of Joining" value={employee.doj} onChange={(e) => setEmployee({ ...employee, doj: e.target.value })} />
            </div>
            <div style={{ margin: "0 10px" }}></div>
            <div className='w-full'>
              <TextInputField size={100} type="date" label="Date Of Exit" value={employee.doe} onChange={(e) => setEmployee({ ...employee, doe: e.target.value })} />
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <TextInputField size={100} required label="Contact Number" value={employee.contactNo} onChange={(e) => setEmployee({ ...employee, contactNo: e.target.value })} />
            <div style={{ margin: "0 10px" }}></div>
            <TextInputField size={100} required label="Bank Details" value={employee.bankDetails} onChange={(e) => setEmployee({ ...employee, bankDetails: e.target.value })} />
          </div>
        </form>

      </Dialog>
    </div>
  )
};

Employee.propTypes = {};

Employee.defaultProps = {};

export default Employee;
