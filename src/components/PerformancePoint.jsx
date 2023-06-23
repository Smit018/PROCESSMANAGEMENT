import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import styles from './Employee.module.css';
import "../screens/Employee/Employee.css";
import { baseUrl, get, post } from '../services/https.service';
import { DateFormat } from '../services/dateFormat';
import { Table } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import USERIMG from "../assets/images/userImgs.png";
import { Pane, Dialog, Button, MediaIcon, SmallPlusIcon, UserIcon, SmallCrossIcon, Pagination, toaster } from 'evergreen-ui'
import TopBar from '../components/TopBar/TopBar';
import AddMember from '../dialogs/AddMember/AddMember';
import { showEmpty, showSpinner } from '../components/GlobalComponent';
import Paginator from '../components/Paginator/Paginator';
import { CSV } from '../services/csv.service';
import { constSelector } from 'recoil';


let allData = []

const PerformancePoint = () => {
	const [showForm, setShowForm] = useState(false)
	const [employee, setEmployee] = useState({});
	const [imgPresent, setImgPresent] = useState(false);
	const [image, setImage] = useState('');
	const [employeeData, setEmployeeData] = useState([]);
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [saveImage, setSaveImage] = useState('');
	const [height, setHeight] = useState(0);
	const [filterApplied, setFilterApplied] = useState(false)
    let isFilterApplied=false;

	const [url, setUrl] = useState('');

	const [page, setPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(25);
	const [totalData, setTotalData] = useState(0);

	// FOR CSV
	const [_csvDwn, setCSVDwn] = useState(false);
	const [csv_data, set_csv_data] = useState([]);
	const [filterDialog, setFilterDialog] = useState(false)
	const [filterData, setFilterData] = useState({})


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
				setFilterApplied(isFilterApplied)

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
		{ path: '/admin/performance-point/', title: 'Performance Point' }
	]


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
		isFilterApplied=true;

		try{

			let dummydatefrom=new Date(filterData.from)
			dummydatefrom.setHours(0,0,0,100)
			let modifiedFromDate=new Date(dummydatefrom)

			let dummydate=new Date(filterData.to)
			dummydate.setHours(24,60,60,1100);
			let modifiedDate=new Date(dummydate)
			
			const dateFilter=` "and": [
				{
					"doj": {
						"gte": "${filterData.from?new Date(modifiedFromDate):new Date('1970')}"
						
					}
				},
				{
					"doj": {
						"lte": " ${filterData.to?new Date(modifiedDate):new Date()}"
					}
				}
			]`

			console.log(dateFilter)
			
		const where=`  "where": {
			"memberType": "EMPLOYEE",
			"deleted": {
				"neq": true
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

	return (
		<div className="w-full h-full">
			<TopBar
				title="Performance Point"
				breadscrubs={paths}
				addEv={() => setShowForm(true)}
				onDownload={() => setDownLoad()}
				csv="true"
				onFilter={() => { setFilterDialog(true) }}
				total={totalData}
				dropdown="true"
			/>

			<br></br>
			<Table aria-label="simple table">
				<Table.Head>
					<Table.TextHeaderCell className="tableH-Color">Profile</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Name</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Employee Code</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">Designation</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">TODOS</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">LEAVES</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">REPORTING HEAD PP</Table.TextHeaderCell>
					<Table.TextHeaderCell className="tableH-Color">PERFORMANCE</Table.TextHeaderCell>
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
		
		</div>
	)
};

PerformancePoint.propTypes = {};
PerformancePoint.defaultProps = {};
export default PerformancePoint;


