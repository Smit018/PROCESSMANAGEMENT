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
	const [pageLimit, setPageLimit] = useState(3);
	const [totalData, setTotalData] = useState(0);

	// FOR CSV
	const [_csvDwn, setCSVDwn] = useState(false);
	const [csv_data, set_csv_data] = useState([]);


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

	const fetchCount = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const url = `members/count?where={"memberType":"EMPLOYEE", "deleted": {"neq": true}}`
				const count = await get(url)
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

	const onSearchType = (value) => {
		const _data = allData.filter(employee => {
			return employee.name.toLowerCase().includes(value?.toLowerCase())
		})
		setEmployeeData(_data)
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
		console.log(_form)
		setShowForm(false)
	}


	const changePage = (type) => {
		const filter = { where: '', include: '', order: '' }
		if (type === 'next') {
			const _page = page + 1
			setPage(_page)
			filter.where = `"where": {"memberType":"EMPLOYEE", "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			employeeUrl(filter)
		}
		else if (type === 'prev') {
			const _page = page - 1
			setPage(_page)
			filter.where = `"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			employeeUrl(filter)
		}
		else {
			setPage(type)
			filter.where = `"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(type - 1) * pageLimit}`
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
				open={showForm}
				title="Add Employee"
				onSubmit={(formData) => { validateForm(formData) }}
				onClose={() => setShowForm(false)}
			/>

			{_csvDwn ? <CSV body={csv_data} headers={headers} filename="employee" /> : null}
		</div>
	)
};

Employee.propTypes = {};
Employee.defaultProps = {};
export default Employee;
