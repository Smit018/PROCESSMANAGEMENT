
import styles from './Vendors.module.css';
import React, { useEffect, useRef, useState } from 'react';
// import styles from './vendor.module.css';
import "../Employee/Employee.css";
import { baseUrl, get, post } from '../../services/https.service';
import { DateFormat } from '../../services/dateFormat';
import { Table } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui';
import USERIMG from "../../assets/images/userImgs.png";
import { Pane, Dialog, Button, MediaIcon, SmallPlusIcon, UserIcon, SmallCrossIcon, Pagination } from 'evergreen-ui'
import AddMember from '../../dialogs/AddMember/AddMember';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import TopBar from '../../components/TopBar/TopBar';

const Vendors = () => {

	const [showForm, setShowForm] = useState(false)
	const [innerHeight, setHeight] = useState()
	const [vendor, setVendor] = useState({});
	const [imgPresent, setImgPresent] = useState(false);
	const [image, setImage] = useState();
	const [saveImage, setSaveImage] = useState();
	const [employeeData, setEmployeeData] = useState([]);
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	let imageHandler = useRef(null);

	const createVendor = async () => {
		let imgToServer, saveEmp;
		if (image) {
			imgToServer = await UploadImage(saveImage);
			if (imgToServer) {
				saveEmp = { ...vendor, profile: imgToServer }
			}
		}
		saveEmp = { ...saveEmp, memberType: "VENDOR", userName: saveEmp.email }
		let saveType = await post('members', saveEmp);
		if (saveType.statusCode >= 200 && saveType.statusCode < 300) {
			console.log(" Vendor added")
		} else {
			console.log(saveType.message)
		}

	}

	useEffect(() => {
		setHeight(window.innerHeight)
		getAllVendors()
		// setEmployeeData();
	}, [0]);

	const getAllVendors = async () => {
		const employ = await get('members?filter={"where":{"memberType":"VENDOR"}}');
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
		const image = await post("photos/vendor/upload", formData)
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
		const getImg = await get(`photos/vendor/files/${img}`);
		if (getImg.statusCode >= 200 && getImg.statusCode < 300) {
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
		const source = ImageUrl('vendor', img)
		// alert(source)
		return (
			<img className='circleC1' src={source} onError={(e) => imageErrHandling(e)} />
		)
	}

	const imageErrHandling = (e) => {
		e.target.src = USERIMG
	}


	const paths = [
		{ path: '/admin/vendors/', title: 'Vendors' }
	]

	const validateForm = (_form) => {
		console.log(_form)
		setShowForm(false)
	}

	return (

		<div className='w-full h-full'>
			<TopBar
				title="Vendors"
				breadscrubs={paths}
				add={true}
				addTitle="Add Vendor"
				addEv={() => setShowForm(true)}
				csv="true"
				filter="true"
				search={search}
				onSearch={(e) => setSearch(e.target.value)}
			/>
			<br></br>
			<Table aria-label="simple table">
				<Table.Head>
					<Table.TextHeaderCell className="tableH-Color">Profile</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Name</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Designation</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">vendor Code</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Date Joining</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Date Exit</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Contact Number</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Bank Details</Table.TextHeaderCell>
				</Table.Head>
				<Table.Body height={innerHeight - 300}>
					{employeeData.map((item, index) => {
						return (
							<Link to={item.id}>
							<Table.Row key={index.toString()}>
								<Table.TextCell className="tableB-Color">{showMemberImage(item?.profile)}</Table.TextCell>
								<Table.TextCell className="tableB-Color">{item?.name}</Table.TextCell>
								<Table.TextCell className="tableB-Color">{item?.vendorName}</Table.TextCell>
								<Table.TextCell className="tableB-Color">{item?.employeeCode}</Table.TextCell>
								<Table.TextCell className="tableB-Color">{(item.doe)?DateFormat(item.doe) : "-"}</Table.TextCell>
								<Table.TextCell className="tableB-Color">{item?.doe || "-"}</Table.TextCell>
								<Table.TextCell className="tableB-Color">{item?.contactNo}</Table.TextCell>
								<Table.TextCell className="tableB-Color">{item?.bankDetails}</Table.TextCell>
							</Table.Row>
							</Link>
						)
					})}
				
				</Table.Body>
				<div className='py-2 flex justify-end bg-white border-t h-16 items-center'>
					<Pagination page={1} totalPages={5}></Pagination>
				</div>
			</Table>
			<AddMember
				open={showForm}
				title="Add Vendor"
				onSubmit={(formData) => { validateForm(formData) }}
				onClose={() => setShowForm(false)}
			/>
			{/* <Dialog isShown={open} onCloseComplete={handleClose}
				title="Add vendor"
				confirmLabel="Save vendor"
				isConfirmDisabled={formValidation()}
				onConfirm={createVendor}
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
					<TextInputField required label="Name" value={vendor.name} onChange={(e) => setVendor({ ...vendor, name: e.target.value })} />
					<div className='flex justify-center items-center'>
						<TextInputField size={100} required label="Email" value={vendor.email} onChange={(e) => setVendor({ ...vendor, email: e.target.value })} />
						<div style={{ margin: "0 10px" }}></div>
						<TextInputField size={100} required label="Password" type="password" value={vendor.password} onChange={(e) => setVendor({ ...vendor, password: e.target.value })} />
					</div>

					<div className='flex justify-center items-center'>
						<TextInputField size={100} required label="Vendor Name" value={vendor.vendorName} onChange={(e) => setVendor({ ...vendor, vendorName: e.target.value })} />
						<div style={{ margin: "0 10px" }}></div>
						<TextInputField size={100} required label="Vendor Code" value={vendor.employeeCode} onChange={(e) => setVendor({ ...vendor, employeeCode: e.target.value })} />
					</div>

					<div className='flex justify-center items-center doe-doj' >
						<TextInputField size={100} type="date" required label="Date Of Joining" value={vendor.doj} onChange={(e) => setVendor({ ...vendor, doj: e.target.value })} />
						<div style={{ margin: "0 10px" }}></div>
						<TextInputField size={100} type="date" label="Date Of Exit" value={vendor.doe} onChange={(e) => setVendor({ ...vendor, doe: e.target.value })} />
					</div>

					<div className='flex justify-center items-center'>
						<TextInputField size={100} required label="Contact Number" value={vendor.contactNo} onChange={(e) => setVendor({ ...vendor, contactNo: e.target.value })} />
						<div style={{ margin: "0 10px" }}></div>
						<TextInputField size={100} required label="Bank Details" value={vendor.bankDetails} onChange={(e) => setVendor({ ...vendor, bankDetails: e.target.value })} />
					</div>





				</form>

			</Dialog> */}
		</div>

	)
}

Vendors.propTypes = {};

Vendors.defaultProps = {};

export default Vendors;
