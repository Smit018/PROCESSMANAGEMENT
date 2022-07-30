
import styles from './Vendors.module.css';
import React, { useEffect, useRef, useState } from 'react';
// import styles from './vendor.module.css';
import "../Employee/Employee.css";
import { baseUrl, get, post } from '../../services/https.service';
import { DateFormat } from '../../services/dateFormat';
import { Table, toaster } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui';
import USERIMG from "../../assets/images/userImgs.png";
import { Pane, Dialog, Button, MediaIcon, SmallPlusIcon, UserIcon, SmallCrossIcon, Pagination } from 'evergreen-ui'
import AddMember from '../../dialogs/AddMember/AddMember';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import TopBar from '../../components/TopBar/TopBar';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';
import Paginator from '../../components/Paginator/Paginator';
import { CSV } from '../../services/csv.service';

let allData = []

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
	const [url, setUrl] = useState('');

	const [page, setPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(10);
	const [totalData, setTotalData] = useState(0);

	let imageHandler = useRef(null);

	// FOR CSV
	const [_csvDwn, setCSVDwn] = useState(false);
	const [csv_data, set_csv_data] = useState([]);




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
		fetchVendors()
		fetchForCsv()
	}, []);

	const fetchCount = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const url = `members/count?where={"memberType":"VENDOR", "deleted": {"neq": true}}`
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

	const vendorUrl = (filters, all) => {
		console.log(filters)
		const where = (filters && filters.where) ? filters.where : `"where": {"memberType":"VENDOR", "deleted": {"neq": true}}${all ? '' : `, "limit": ${pageLimit}, "skip": ${(page - 1) * pageLimit}`}`
		const include = (filters && filters.include) ? filters.include : `"include": [{"relation": "documentMember", "scope": {"fields": ["id"]}}]`
		const order = (filters && filters.order) ? filters.order : `"order": "createdAt DESC"`
		const _url = `members?filter={${where}, ${order}, ${include}}`
		setUrl(_url)
		if (filters) {
			fetchVendors(_url)
		}
		else return _url
	}


	const fetchVendors = async (filter) => {
		setEmployeeData(null)
		try {
			if (filter) {
				const count = await fetchCount()
				setTotalData(count)
			}
			const _url = filter || vendorUrl()
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


	const onSearchType = (value) => {
		const _data = allData.filter(vendor => {
			return vendor.name.toLowerCase().includes(value?.toLowerCase())
		})
		setEmployeeData(_data)
	}

	const _upload = async (file) => {
		return new Promise(async (resolve, reject) => {
			try {
				let _formdata = new FormData()
				_formdata.append('file', file)
				const _img = await post(`photos/vendor/upload`, _formdata)
				if (_img.data) {
					resolve(image.data.result.files.file[0].name)
				}
				else reject({ err: 'Failed to upload image!' })
			}
			catch (err) {
				reject(err)
			}
		})
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

	const validateForm = async (_form) => {
		console.log(_form)
		setShowForm(false)
		let body = _form
		body.profile = _form.image ? await _upload(_form.image) : ''
		body = { ...body, memberType: "VENDOR", userName: _form.email }
		const response = await post('members', body);
		if (response.statusCode >= 200 && response.statusCode < 300) {
			toaster.success('Vendor added successfully!')
			setShowForm(false)
			fetchVendors();
		}
		else {
			toaster.danger('Failed to add vendor!')
		}

	}

	const changePage = (type) => {
		const filter = { where: '', include: '', order: '' }
		if (type === 'next') {
			const _page = page + 1
			setPage(_page)
			filter.where = `"where": {"memberType":"VENDOR", "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			vendorUrl(filter)
		}
		else if (type === 'prev') {
			const _page = page - 1
			setPage(_page)
			filter.where = `"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			vendorUrl(filter)
		}
		else {
			setPage(type)
			filter.where = `"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(type - 1) * pageLimit}`
			vendorUrl(filter)
		}
	}

	const fetchForCsv = async () => {
		const url = vendorUrl(null, true)
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
		<div className='w-full h-full'>
			<TopBar
				title="Vendors"
				breadscrubs={paths}
				add={true}
				addTitle="Add Vendor"
				addEv={() => setShowForm(true)}
				csv="true"
				onDownload={() => setDownLoad()}
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
					<Table.TextHeaderCell className="tableH-Color">vendor Code</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Date Joining</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Date Exit</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Contact Number</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Bank Details</Table.TextHeaderCell>
				</Table.Head>
				<Table.Body height={employeeData?.length > 10 ? innerHeight - 300 : 'auto'}>
					{!employeeData ? showSpinner() : employeeData?.length === 0 ? showEmpty() : employeeData.map((item, index) => {
						return (
							<Link key={index} to={item.id}>
								<Table.Row key={index.toString()}>
									<Table.TextCell className="tableB-Color">{showMemberImage(item?.profile)}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{item?.name}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{item?.vendorName}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{item?.employeeCode}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{(item.doe) ? DateFormat(item.doe) : "-"}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{item?.doe || "-"}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{item?.contactNo}</Table.TextCell>
									<Table.TextCell className="tableB-Color">{item?.bankDetails}</Table.TextCell>
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
				title="Add Vendor"
				onSubmit={(formData) => { validateForm(formData) }}
				onClose={() => setShowForm(false)}
			/>
			{_csvDwn ? <CSV body={csv_data} headers={headers} filename="vendors" /> : null}
		</div>
	)
}

Vendors.propTypes = {};

Vendors.defaultProps = {};

export default Vendors;
