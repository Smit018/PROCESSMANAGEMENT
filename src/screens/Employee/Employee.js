import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import styles from './Employee.module.css';
import "./Employee.css";
import { baseUrl, get, post } from '../../services/https.service';
import { DateFormat } from '../../services/dateFormat';
import { Table } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import USERIMG from "../../assets/images/userImgs.png";
import { Pane, Dialog, Button, MediaIcon, SmallPlusIcon, UserIcon, SmallCrossIcon, Pagination, toaster } from 'evergreen-ui'
import TopBar from '../../components/TopBar/TopBar';
import AddMember from '../../dialogs/AddMember/AddMember';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';
import Paginator from '../../components/Paginator/Paginator';
import { CSV } from '../../services/csv.service';
import { constSelector } from 'recoil';


let allData = []

const Employee = () => {
	const [showForm, setShowForm] = useState(false)
	const [employee, setEmployee] = useState({});
	const [imgPresent, setImgPresent] = useState(false);
	const [image, setImage] = useState();
	const [employeeData, setEmployeeData] = useState([]);
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [saveImage, setSaveImage] = useState();
	const [height, setHeight] = useState(0);

	const [url, setUrl] = useState('');

	const [page, setPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(25);
	const [totalData, setTotalData] = useState(0);

	// FOR CSV
	const [_csvDwn, setCSVDwn] = useState(false);
	const [csv_data, set_csv_data] = useState([]);
	const [filterDialog, setFilterDialog] = useState(false)
	const [filterData, setFilterData] = useState({})

	let imageHandler = useRef(null);



	const createEmployee = async () => {
		let imgToServer, saveEmp;
		if (image) {
			imgToServer = await _uploadFile(saveImage);
			if (imgToServer) {
				saveEmp = { ...employee, profile: imgToServer }
			}
		}
		saveEmp = { ...saveEmp, memberType: "EMPLOYEE", userName: saveEmp.email }
		let saveType = await post('members', saveEmp);
		if (saveType.statusCode >= 200 && saveType.statusCode < 300) {
			handleClose()
			console.log("Employee added");
			fetchAllEmployees();

		} else {
			console.log(saveType.message)
		}

	}


	useEffect(() => {
		setHeight(window.innerHeight)
		fetchAllEmployees()
		// setEmployeeData();
		fetchForCsv()
	}, [0]);

	const fetchCount = (where) => {
		console.log('fetch count got called here......................')
		return new Promise(async (resolve, reject) => {
			try {
				where = where || `where={"memberType":"EMPLOYEE", "deleted": {"neq": true}}`
				console.log(where+"is here............")
				const url = `members/count?${where}`
				const count = await get(url)
				console.log(count)
				if (count.statusCode >= 200 && count.statusCode < 300) {
					resolve(count.data.count)
				}
			}
			catch (err) {
				resolve(err)
			}
		})
	}

	const fetchAllEmployees = async (filter) => {
		setEmployeeData(null)
		try {
			if (!filter) {
				const count = await fetchCount()
				console.log(count)
				setTotalData(count)
			}
			const _url = filter || employeeUrl()
			console.log(_url)
			const employ = await get(_url);
			console.log(employ)
			if (employ.statusCode >= 200 && employ.statusCode < 300) {
				setEmployeeData(employ.data);
				allData = employ.data
			}
			else {
				setEmployeeData([])
				toaster.danger('Failed to fetch vendors!')
			}
		}
		catch (err) {
			setEmployeeData([])
			toaster.danger('Failed to fetch vendors!')
		}
	}

	const employeeUrl = (filters, all) => {
		console.log(filters)
		const where = (filters && filters.where) ? filters.where : `"where": {"memberType":"EMPLOYEE", "deleted": {"neq": true}}${all ? '' : `, "limit": ${pageLimit}, "skip": ${(page - 1) * pageLimit}`}`
		const include = (filters && filters.include) ? filters.include : `"include": [{"relation": "documentMember", "scope": {"fields": ["id"]}}]`
		const order = (filters && filters.order) ? filters.order : `"order": "createdAt DESC"`
		const _url = `members?filter={${where}, ${order}, ${include}}`
		setUrl(_url)
		if (filters) {
			fetchAllEmployees(_url)
		}
		else return _url
	}

	const onSearchType = async (value) => {
		console.log(value)
		if (value) {
			const whereCount = `where={"name":{"regexp":"/${value}/i"}, "memberType":"EMPLOYEE", "deleted": {"neq": true}}`
			const count = await fetchCount(whereCount)
			setTotalData(count)
			// SEARCH THROUGH THE DB
			const where = `"where": {"name":{"regexp":"/${value}/i"}, "memberType":"EMPLOYEE", "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(page - 1) * pageLimit}`
			employeeUrl({ where })
		}
		else fetchAllEmployees()
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
		// _uploadFile(e.target.files[0]);
		setSaveImage(e.target.files[0]);
		setImage(URL.createObjectURL(e.target.files[0]))
		setImgPresent(true);

	}

	const _uploadFile = async (file) => {
		// UPLOAD IMAGE
		return new Promise(async (resolve, reject) => {
			try {
				const body = JSON.stringify({"name":"employee"})
				const options = {
					method:'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body
				}
				const container = await fetch('http://192.168.1.12:3200/api/photos/', options)
				
			  const res=await container.json()
			   if(res.error.message.includes('EEXIST') && res.error.statusCode==500){
				if(container.statusCode==500 && container.message==''){}
				const formData = new FormData();
				console.log(file)
				formData.append('file', file)
				console.log(formData)
				const image = await post("photos/employee/upload", formData)
				console.log(image)
				if (image.data) {
				resolve(image.data.result.files.file[0].name)
				}
				else {
				reject(image);
				}
			
			   }
				}
			catch (err) {
				console.log(err)
				reject(err)
			}
		})
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
			<img className='circleC1' src={source} onError={(e) => imageErrHandling(e)} />
		)
	}

	const imageErrHandling = (e) => {
		e.target.src = USERIMG
	}


	const paths = [
		{ path: '/admin/employees/', title: 'Employees' }
	]

	const validateForm = (_form) => {
		return new Promise(resolve => {
			let err = ''
			for (let index = 0; index < employeForm.length; index++) {
				const key = employeForm[index];
				if (!_form[key.key] && key.required) {
					err = `${key.label} is required`
					resolve({ err })
					break;
				}
				if ((index === employeForm.length - 1) && !err) resolve(_form)
			}
		})
	}

	const submitEmployee = async (_form) => {
		console.log(_form)
		try {
			console.log('form', _form)
			console.log(_form.contactNo.length)
			if(_form.contactNo.length!=10){
				throw new Error('contact number should have 10 digits')
			}
			if(!_form.employeeCode){
				throw new Error('employee code is required')
			}
			_form['password'] = _form.contactNo;
			console.log(_form['upload'])
			if (_form['upload'])
				_form['profile'] = await _uploadFile(_form['upload'])
			_form['memberType'] = 'EMPLOYEE'
			const response = await post('members', _form)
			if (response.statusCode === 200) {
				// EMPLOYEE ADDED SUCCESSFULLY!
				toaster.success('Employee added successfully!')
				fetchAllEmployees()
				setShowForm(false)
			}
			else {
				console.log(response)
				toaster.danger('Failed to add employee', {
					description: response.message
				})
			}
		}
		catch (err) {
			console.log(err)
			toaster.danger('Failed to add employee', {
				description: err.message
			})
		}


	}


	const changePage = (type) => {
		const _search = search ? `"name":{"regexp":"/${search}/i"},` : ''
		const filter = { where: '', include: '', order: '' }
		if (type === 'next') {
			const _page = page + 1
			setPage(_page)
			filter.where = `"where": {${_search} "memberType":"EMPLOYEE", "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			employeeUrl(filter)
		}
		else if (type === 'prev') {
			const _page = page - 1
			setPage(_page)
			filter.where = `"where": {${_search} "memberType":"EMPLOYEE","deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			employeeUrl(filter)
		}
		else {
			setPage(type)
			filter.where = `"where": {${_search} "memberType":"EMPLOYEE","deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(type - 1) * pageLimit}`
			employeeUrl(filter)
		}
	}

	const fetchForCsv = async () => {
		const url = employeeUrl(null, true)
		const response = await get(url)
		const csv = await createCSVData(response.data)
		set_csv_data(csv)
	}

	const headers = [
		{ label: "Name", key: "name" },
		{ label: "Designation", key: "designation" },
		{ label: "Code", key: "code" },
		{ label: "Date of Joining", key: "doj" },
		{ label: "Date of Exit", key: "doe" },
		{ label: "Contact Number", key: "mobile" },
		{ label: "Bank Details", key: "bankDetails" },
		{ label: "Time Created", key: "createdAt" },
	];

	const createCSVData = (data) => {
		// CREATE CSV DATA - data HERE IS ALL DATA -- EXCLUDE LIMIT AND INCLUDES ALL FILTER EVENTS
		let csvHolder = [];
		return new Promise(async (resolve, reject) => {
			try {
				for (let index = 0; index < data.length; index++) {
					const member = data[index];
					const obj = {
						name: member.name,
						designation: member.designation,
						code: `${member?.employeeCode}`,
						doj: DateFormat(member.doj),
						doe: member.doe ? DateFormat(member.doe) : '--',
						mobile: member.contactNo,
						bankDetails: member.bankDetails,
						createdAt: DateFormat(member.createdAt),
					}
					csvHolder.push(obj)
					if (index === data.length - 1) resolve(csvHolder)
				}
			}
			catch (err) {
				reject(err)
			}
		})
	}

	const setDownLoad = () => {
		setCSVDwn(true)
		setTimeout(() => {
			setCSVDwn(false)
		}, 3000);
	}

	const applyFilter = () => {
		try{
			console.log(new Date(), new Date(filterData.to));
			const dateFilter=`"and": [
				{
					"doj": {
						"gte": "${filterData.from ? new Date(filterData.from).toISOString() : new Date('1970').toISOString()}"
					}
				},
				{
					"doj": {
						"lte": "${filterData.to ? new Date(filterData.to).toISOString() : new Date().toISOString()}"
					}
				}
			]`

			console.log(dateFilter)
			
			// const _dateFilter = `"doj": {"between": ["${filterData.from ? new Date(filterData.from).toISOString() : new Date('1970').toISOString()}","${filterData.to ? new Date(filterData.to).toISOString() : new Date().toISOString()}"]}`


		// const where = `"where": { ${_filter.doj } "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(page - 1) * pageLimit}`
		const where=`  "where": {
			"memberType": "EMPLOYEE",
			"deleted": {
				"neq": false
			},
			${dateFilter}
		}`
			
		
		const _url = `members?filter={${where}}`

		fetchAllEmployees(_url);
		setFilterDialog(false);



		}
		catch(err){
			console.log(err)
		}
	}

	const handleClear=()=>{
		setFilterData({})
		fetchAllEmployees()
		setFilterDialog(false);

	}

	return (
		<div className="w-full h-full">
			<TopBar
				title="Employee"
				breadscrubs={paths}
				add={true}
				addTitle="Add Employee"
				addEv={() => setShowForm(true)}
				onDownload={() => setDownLoad()}
				csv="true"
				filter="true"
				search={search}
				onFilter={() => { setFilterDialog(true) }}
				onSearch={(e) => { setSearch(e.target.value); onSearchType(e.target.value) }}
			/>
			<br></br>
			<Table aria-label="simple table">
				<Table.Head>
					<Table.TextHeaderCell className="tableH-Color">Profile</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Name</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Designation</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Employee Code</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Date Joining</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Date Exit</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Contact Number</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Bank Details</Table.TextHeaderCell>
				</Table.Head>
				<Table.Body height={employeeData?.length > 10 ? (height - 300) : 'auto'}>
					{!employeeData ? showSpinner() : employeeData?.length === 0 ? showEmpty() : employeeData.map((item, index) => {
						return (
							<Link key={item.id} to={item.id}>
								<Table.Row key={index}>
									<Table.TextCell className="tableB-Color">{showMemberImage(item.profile)}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{item.name}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{item.designation}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{item.employeeCode}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{DateFormat(item.doj)}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{(item.doe) ? DateFormat(item.doe) : "-"}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{item.contactNo}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{item.bankDetails}</Table.TextCell>
								</Table.Row>
							</Link>
						)
					})}
				</Table.Body>
				<Paginator
					page={page}
					total={totalData}
					limit={pageLimit}
					prev={(e) => changePage('prev')}
					next={(e) => changePage('next')}
					pageChange={(e) => changePage(e)}
				/>
			</Table>
			<AddMember
				type="employee"
				open={showForm}
				title="Add Employee"
				onSubmit={(formData) => { submitEmployee(formData) }}
				onClose={() => setShowForm(false)}
			/>

			{_csvDwn ? <CSV body={csv_data} headers={headers} filename="employee" /> : null}
			<Dialog isShown={filterDialog} onCloseComplete={()=>{
				setFilterDialog(false);
			}}
				onCancel={!filterData?.to && !filterData?.from?setFilterDialog:handleClear}
				title="Filter Employs"
				width={'50%'}
				confirmLabel="Filter"
				cancelLabel={!filterData?.to && !filterData?.from?'close':'clear'}
				isConfirmDisabled={!filterData?.to && !filterData?.from}
				onConfirm={applyFilter}>
				<form>
					<div className='flex justify-center items-center w-full'>
						<div className='w-full'>
							<TextInputField required label="From" max={new Date()} type="date" value={filterData.from} onChange={(e) => setFilterData({ ...filterData, from: e.target.value })} />
						</div>
						<div style={{ margin: "0 10px" }}></div>
						<div className='w-full'>
							<TextInputField required label="To" type="date" min={filterData.from} value={filterData.to} onChange={(e) => setFilterData({ ...filterData, to: e.target.value })} />
						</div>
					</div>
				</form>
			</Dialog>
		</div>
	)
};

Employee.propTypes = {};
Employee.defaultProps = {};
export default Employee;



const employeForm = [
	{ key: 'name', label: 'Name', required: true },
	{ key: 'email', label: 'Email', required: true },
	{ key: 'departmentId', label: 'Department', required: true },
	{ key: 'typeId', label: 'Type', required: true },
	{ key: 'doe', label: 'D.O.E', required: false },
	{ key: 'doj', label: 'D.O.L', required: true },
	{ key: 'contactNo', label: 'Conact Number', required: true },
	{ key: 'bankDetails', label: 'Bank Details', required: false },
	{ key: 'upload', label: 'profile', required: false }
]