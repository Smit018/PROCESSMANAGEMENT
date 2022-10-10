import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Documents.css';

import { post, get } from '../../services/https.service';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { DateFormat } from '../../services/dateFormat';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Table, toaster } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui'
import { Pane, Dialog, Button, PeopleIcon, DocumentIcon } from 'evergreen-ui'
import TopBar from "../../components/TopBar/TopBar";

import TWOPEOPLE from "../../assets/images/twoPeople.png"
import { ListCard } from '../../components/AvatarList/AvatarList';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';
import Paginator from '../../components/Paginator/Paginator';
import { CSV } from '../../services/csv.service';


let allDocuments = []

const Documents = () => {
	const [search, setSearch] = useState('');
	const [url, setUrl] = useState('');
	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	const [documentData, setDocumentData] = useState(null);
	const [open, setOpen] = useState(false);
	const [addMembers, setAddMembers] = useState([])
	const [filterDialog, setFilterDialog] = useState(false)
	const [filterData, setFilterData] = useState({})
	const [subSheetName,setSubsheetName]=useState('')
	const [page, setPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(25);
	const [totalData, setTotalData] = useState(0);
	const [filterApplied, setFilterApplied] = useState(false)
	let isFilterApplied=false;
	



	// FOR CSV
	const [_csvDwn, setCSVDwn] = useState(false);
	const [csv_data, set_csv_data] = useState([]);

	const paths = [
		{ path: '/admin/documents', title: 'Documents' }
	]


	useEffect(() => {
		fetchDocuments()
		fetchForCsv()
	}, [])



	const fetchCount = (where) => {
		return new Promise(async (resolve, reject) => {
			try {
				where = where || `where={"deleted": {"neq": true}}`
				const url = `documents/count?${where}`
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

	const documentUrl = (filters, all) => {
		// console.log(filters)
		const where = (filters && filters.where) ? filters.where : `"where": {"deleted": {"neq": true}}${all ? '' : `, "limit": ${pageLimit}, "skip": ${(page - 1) * pageLimit}`}`
		const include = (filters && filters.include) ? filters.include : `"include": [{"relation": "documentMember", "scope": {"fields": ["id", "name"]}}]`
		const order = (filters && filters.order) ? filters.order : `"order": "createdAt DESC"`
		const _url = `documents?filter={${where}, ${order}, ${include}}`
		setUrl(_url)
		if (filters) {
			fetchDocuments(_url)
		}
		else return _url
	}

	const fetchDocuments = async (filter) => {
		setDocumentData(null)
		try {
			if (!filter) {
				const count = await fetchCount()
				setTotalData(count)
			}
			const _url = filter || documentUrl()
			// console.log(_url)
			const response = await get(_url)
			if (response.statusCode >= 200 && response.statusCode < 300) {
				setFilterApplied(isFilterApplied);
				console.log(response)
				setDocumentData(response.data)
				allDocuments = [...response.data]
			}
			else {
				setDocumentData([])
				toaster.danger('Failed to fetch decuments!')
			}
		}
		catch (err) {
			console.log(err)
			setDocumentData([])
			toaster.danger('Failed to fetch documents!')
		}
	}

	const createDocument = async () => {
		try {
			const pattern= /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
			if(pattern.test(link.trim())){
				let newDoc = { name: name.trim(), link: link.trim(),subSheetName:subSheetName.trim()};
			let saveDoc = await post('documents', newDoc);
			if (saveDoc.statusCode >= 200 && saveDoc.statusCode < 300) {
				toaster.success('Document added successfully!')
				setName('')
				setLink('')
				fetchDocuments();
				setOpen(false);
			} else {
				console.log(saveDoc.message)
				toaster.danger('Failed to add document!')
			}
			}
			else{
				toaster.danger('link is not valid')
			}
		}
		catch (err) {
			console.log(err)
			toaster.danger(err)
		}
	}

	const handleClose = () => {
		isFilterApplied=false;
		setOpen(false);
	}

	const formValidation = () => {
		// const pattern= /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
		if( name.trim().length > 3 && link.trim().length > 1) {
			return false;
		}
		else {
			return true;
		}
	}

	const showContent = () => {
		return (
			<div>
				{documentData.map((item, index) => {
					return (
						<Link key={item.id} to={`${item.id}/${item.name}`}>
							<ListCard
								icon={<DocumentIcon size={20} color={'#262626'} />}
								title={item.name}
								subTitle={DateFormat(item.createdAt, "date-time")}
								actionText={`${item?.documentMember?.length} ${item?.documentMember?.length > 1 ? 'Members' : 'Member'}`}
							/>
						</Link>
					)
				})}
				<Paginator
					page={page}
					total={totalData}
					limit={pageLimit}
					prev={(e) => changePage('prev')}
					next={(e) => changePage('next')}
					pageChange={(e) => changePage(e)}
				/>
			</div>
		)
	}

	const onSearchType = async (value) => {
		if (value) {
			const whereCount = `where={"name":{"regexp":"/${value}/i"}, "deleted": {"neq": true}}`
			const count = await fetchCount(whereCount)
			setTotalData(count)
			// SEARCH THROUGH THE DB
			const where = `"where": {"name":{"regexp":"/${value}/i"}, "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(page - 1) * pageLimit}`
			documentUrl({ where })
		}
		else fetchDocuments()
	}

	const changePage = (type) => {
		const _search = search ? `"name":{"regexp":"/${search}/i"},` : ''

		const filter = { where: '', include: '', order: '' }
		if (type === 'next') {
			const _page = page + 1
			setPage(_page)
			filter.where = `"where": { ${_search} "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			documentUrl(filter)
		}
		else if (type === 'prev') {
			const _page = page - 1
			setPage(_page)
			filter.where = `"where": { ${_search} "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			documentUrl(filter)
		}
		else {
			setPage(type)
			filter.where = `"where": { ${_search} "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(type - 1) * pageLimit}`
			documentUrl(filter)
		}
	}

	const _filterDocuments = () => {
		isFilterApplied=true;
		try{
			const filter = { where: '', include: '', order: '' }
			// let dummyfromdate= new Date(filterData.from)
			// dummyfromdate.setHours(23,59,59,500);
			// const fromDate=new Date(dummyfromdate)
			console.log(filter.from,filter.to);

			//  const _dateFilter = `"createdAt": {"between": ["${filterData.from || new Date('1970')}", "${filterData.from || new Date()}"]}`

			const _dateFilter=` "and": [
				{
					"createdAt": {
						"gte": "${filterData.from?new Date(filterData.from):new Date('1970')}"
					}
				},
				{
					"createdAt": {
						"lte": " ${filterData.to?new Date(filterData.to):new Date()}"
					}
				}
			]`

	
			
	
			filter.where = `"where": {"deleted": {"neq": true}, ${_dateFilter}}`
			documentUrl(filter)
			setTotalData(1)
			setFilterDialog(false)
		}
		catch(err){
             toaster.danger(err)
		}
	}

	const openFilterDialog = (value) => {
		setFilterDialog(value)
	}


	const donwloadCsv = () => {
		console.log('Download csv here')
	}

	const fetchForCsv = async () => {
		const url = documentUrl(null, true)
		const response = await get(url)
		const csv = await createCSVData(response.data)
		set_csv_data(csv)
	}

	const headers = [
		{ label: "Name", key: "name" },
		{ label: "Link/Location", key: "link" },
		{ label: "Members", key: "members" },
		{ label: "Time Created", key: "createdAt" },
	];

	const createCSVData = (data) => {
		// CREATE CSV DATA - data HERE IS ALL DATA -- EXCLUDE LIMIT AND INCLUDES ALL FILTER EVENTS
		let csvHolder = [];
		return new Promise(async (resolve, reject) => {
			try {
				for (let index = 0; index < data.length; index++) {
					const wa = data[index];
					const obj = {
						name: wa.name,
						link: wa.link,
						members: wa.documentMember.map(mem => mem.name),
						createdAt: DateFormat(wa.createdAt),
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

    const handleClear=()=>{
		 fetchDocuments()
		 setFilterData({})
		 setFilterDialog(false);
	}
	const setDownLoad = () => {
		setCSVDwn(true)
		setTimeout(() => {
			setCSVDwn(false)
		}, 3000);
	}

	return (
		<div className='h-full w-full'>
			<TopBar
				title="Documents"
				breadscrubs={paths}
				add={true}
				addTitle="Add Document"
				addEv={() => setOpen(true)}
				csv="true"
				onDownload={() => setDownLoad()}
				filter="true"
				onFilter={() => openFilterDialog(true)}
				search={search}
				onSearch={(e) => { setSearch(e.target.value); onSearchType(e.target.value) }}
				filterLabel={filterApplied ? 'Filter Applied' : 'Filter'}

			/>
			<br></br>
			<br></br>
			{!documentData ? showSpinner() : documentData.length === 0 ? showEmpty() : showContent()}
			<br></br>
			<br></br>
			<br></br>
			<Dialog isShown={open} onCloseComplete={handleClose}
				title="ADD DOCUMENT"
				width={'50%'}
				confirmLabel="Save Document"
				isConfirmDisabled={formValidation()}
				onConfirm={createDocument}>
				<form>
					<div className='flex justify-center items-center'>
						<TextInputField size={100} required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
						<div style={{ margin: "0 10px" }}></div>
						<TextInputField size={100} required label="Sub Sheet Name" value={subSheetName} onChange={(e) => setSubsheetName(e.target.value)} />
						
						<div style={{ margin: "0 10px" }}></div>

						<TextInputField size={100} required  label="Link" value={link} onChange={(e) => setLink(e.target.value)} />
					</div>
				</form>
			</Dialog>

			<Dialog isShown={filterDialog} onCloseComplete={setFilterDialog}
				title="Filter Documents"
				width={'50%'}
				onCancel={!filterData?.to && !filterData?.from?setFilterDialog:handleClear}
				confirmLabel="Filter"
				cancelLabel={!filterData?.to && !filterData?.from?'close':'clear'}
				isConfirmDisabled={!filterData?.to && !filterData?.from}
				onConfirm={_filterDocuments}>
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
			{_csvDwn ? <CSV body={csv_data} headers={headers} filename="wa.csv" /> : null}
		</div>
	)
};

Documents.propTypes = {};

Documents.defaultProps = {};

export default Documents;
