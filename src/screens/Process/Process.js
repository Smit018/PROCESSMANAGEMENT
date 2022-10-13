import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Process.module.css';
import TopBar from '../../components/TopBar/TopBar';
import AddProcess from '../../dialogs/AddProcess/AddProcess';
import { baseUrl, get, post } from '../../services/https.service';
import { useNavigate, Outlet } from "react-router-dom";

import { SearchInput, Table, Pagination, toaster, Pane, Avatar, Dialog, TextInputField, SelectField } from 'evergreen-ui';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';
import Paginator from '../../components/Paginator/Paginator';
import { DateFormat } from '../../services/dateFormat';
import { CSV } from '../../services/csv.service';
import { AvatarList } from '../../components/AvatarList/AvatarList';


let allData = []

const Process = () => {
	const navigate = useNavigate()
	const [showForm, setShowForm] = useState(false)
	const [search, setSearch] = useState('')
	const [screenHeight, setScreenHeight] = useState('')
	const [types, setTypes] = useState([])
	const [departments, setDept] = useState([])
	const [members, setMembers] = useState([])
	const [process, setProcess] = useState([]);
	const [uniqueNumber, setUniqueNumber] = useState(1);
	const [allProcess, setAllProcess] = useState(null);
	const [_csvDwn, setCSVDwn] = useState(false);
	const [csv_data, set_csv_data] = useState([]);

	const [url, setUrl] = useState('');

	const [page, setPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(25);
	const [totalData, setTotalData] = useState(0);

	const [filterDialog, setFilterDialog] = useState(false)
	const [filterData, setFilterData] = useState({})
	const [filterApplied, setFilterApplied] = useState(false)

	useEffect(() => {
		setScreenHeight(window.innerHeight)
		fetchDepartments() //TO SET IN DIALOG
		fetchMembers() //TO SET IN DIALOG
		fetchTypes() //TO SET IN DIALOG
		fetchProcessesNumbers()
		fetchProccesses()
	}, [])

	useEffect(() => {
		return () => {
			console.log("cleaned up");
		};
	}, []);


	window.addEventListener('resize', (event) => {
		setScreenHeight(event.target.innerHeight)
	})

	const processUrl = (filters) => {
		const personeProcessInclude = `{"relation": "personProcess", "scope": {"include": "member"}}`
		const waProcessInclude = `{"relation": "documentProcess", "scope": {"include": "document"}}`
		const docProcessInclude = `{"relation": "whatsappProcess", "scope": {"include": "whatsappGroup"}}`
		const where = (filters && filters.where) ? filters.where : `"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(page - 1) * pageLimit}`
		const include = (filters && filters.include) ? filters.include : `"include":["processOwner", "type", "department", ${personeProcessInclude}, ${docProcessInclude}, ${waProcessInclude}]`
		const order = (filters && filters.order) ? filters.order : `"order": "createdAt DESC"`
		const _url = `processes?filter={${where}, ${order}, ${include}}`
		setUrl(_url)
		if (filters) {
			fetchProccesses(_url)
		}
		else return _url
	}

	const fetchTypes = async () => {
		const response = await get('types')
		if (response) {
			if (response.statusCode == 200) {
				setTypes(response.data)
			}
		}
	}

	const fetchCount = (where) => {
		return new Promise(async (resolve, reject) => {
			try {
				where = where || `where={"deleted": {"neq": true}}`
				const url = `processes/count?${where}`
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

	const fetchProccesses = async (filter) => {
		try {
			setAllProcess(null)
			if (!filter) {
				const count = await fetchCount()
				setTotalData(count)
				isFilterApplied = false
			}
			const _url = filter || processUrl()
			const response = await get(_url)
			if (response) {
				if (response.statusCode == 200) {
					
					setAllProcess(response.data)
					allData = response.data
					setFilterApplied(isFilterApplied)
					if (response.data.length) {
						const csv = await createCSVData(response.data)
						set_csv_data(csv)
					}
					else set_csv_data([])
				}
				else setAllProcess([])
			}
		}
		catch (err) {
			console.log(err)
			toaster.danger('Something went wrong!!')
		}
	}

	const onSearchType = async (value) => {
		console.log(value)
		if (value) {
			const whereCount = `where={"or":[{"title":{"regexp":"/${value}/i"}},{"processNumber":{"regexp":"/${value}/i"}}], "deleted": {"neq": true}}`
			const count = await fetchCount(whereCount);
			setTotalData(count)
			console.log(count)
			// SEARCH THROUGH THE DB
			const where = `"where": {"or":[{"title":{"regexp":"/${value}/i"}},{"processNumber":{"regexp":"/${value}/i"}}], "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(page - 1) * pageLimit}`
			processUrl({ where })
		
		}
		else fetchProccesses()
	}

	const fetchDepartments = async () => {
		const response = await get('departments')
		if (response) {
			if (response.statusCode == 200) {
				setDept(response.data)
			}
		}
	}

	const fetchMembers = async () => {
		const response = await get('members?filter={"where": {"memberType": "EMPLOYEE"}}')
		if (response) {
			if (response.statusCode == 200) {
				setMembers(response.data)
			}
		}
	}


	const fetchProcessesNumbers = async () => {
		const response = await get('processes?filter={"fields": ["id", "processNumber"]}')
		// const response = await get('processes')
		if (response) {
			if (response.statusCode == 200) {
				setProcess(response.data)
			}
		}
	}

	const saveProcess = async (form) => {
		console.log(form)
		let process = {};
		for (let i in form) {
			process[`${i}`] = form[i].value ? form[i].value : form[i].value;
		}
		if (process['inputProcess'] == "") {
			process.inputProcess = null
		}
		process['duration'] = `${process['hours']}:${process['minutes']}`;
		process['processNumber'] = `${form['processNoPrefix'] + form['processNumber']['value']}`;
		try {
			const response = await post("processes", process);
			if (response.statusCode >= 200 && response.statusCode < 300) {
				toaster.success('Process created successfully!')
				setShowForm(false)
				fetchProccesses()
			}
			else toaster.danger('Failed to create process!')
		}
		catch (err) {
			console.log(err)
			toaster.danger('Failed to create process!')
		}
	}

	const changePage = (type) => {
		const _search = search ? `"title":{"regexp":"/${search}/i"},` : ''
		const filter = { where: '', include: '', order: '' }
		if (type === 'next') {
			const _page = page + 1
			setPage(_page)
			filter.where = `"where": { ${_search} "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			processUrl(filter)
		}
		else if (type === 'prev') {
			const _page = page - 1
			setPage(_page)
			filter.where = `"where": {${_search} "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			processUrl(filter)
		}
		else {
			setPage(type)
			filter.where = `"where": {${_search} "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(type - 1) * pageLimit}`
			processUrl(filter)
		}
	}

	// let showForm = true
	const _setShowForm = (data) => {
		setShowForm(data)
	}

	const paths = [
		{ path: '/admin/processes/', title: 'Processes' }
	]

	const verifyProcessNumber = async (e) => {
		const check = await get(`processes?filter={"where":{"processNumber":"${e}"}}`);
		if (check.statusCode >= 200 && check.statusCode < 300) {
			if (check.data.length > 0) {
				setUniqueNumber(uniqueNumber + 1);
			}
		}
	}

	const nestedTableHead = (columns) => {
		return (
			<div className='flex flex-col items-center'>
				<span className='my-1 className="th-c"'>{columns._value}</span>
				<div className='flex justify-between'>
					{columns.value.map((column, index) => {
						return (<Table.TextHeaderCell minWidth={column.width} maxWidth={column.width} className="th-c" key={`${column.key}_${index}`}>{column.value}</Table.TextHeaderCell>)
					})}
				</div>
			</div>
		)
	}

	const nestedTableBody = (row, source) => {
		const wag = row.whatsappProcess.filter(_row => {
			return _row.source.toLowerCase() === source.toLowerCase()
		})
		const doc = row.documentProcess.filter(_row => {
			return _row.source.toLowerCase() === source.toLowerCase()
		})
		return (
			<div className='flex justify-between'>
				<Table.TextCell minWidth={'50%'} maxWidth={'50%'} className="tb-c">{wag.length > 0 ? `${wag[0]?.whatsappGroup?.name}` : '--'}&nbsp;<span className="primary">{wag.length === 0 ? '' : '+' + (wag.length - 1)}</span></Table.TextCell>
				<Table.TextCell minWidth={'50%'} maxWidth={'50%'} className="tb-c">{doc.length > 0 ? `${doc[0]?.document?.name}` : '--'}&nbsp;<span className="primary">{doc.length === 0 ? '' : '+' + (doc.length - 1)}</span></Table.TextCell>
			</div>
		)
	}

	const headers = [
		{ label: "Process Number", key: "processNo" },
		{ label: "Process Title", key: "title" },
		{ label: "Type", key: "type" },
		{ label: "Department", key: "dept" },
		{ label: "Process Owner", key: "processOwner" },
		{ label: "Members", key: "members" },
		{ label: "Input Documents", key: "inputDocuments" },
		{ label: "Input Whatsapp Group", key: "inputWAGroup" },
		{ label: "Output Documents", key: "outputDocuments" },
		{ label: "Output Whatsapp Group", key: "outputWAGroup" },
		{ label: "Status", key: "status" },
		{ label: "Time Created", key: "createdAt" },
	];

	const createCSVData = (data) => {
		// CREATE CSV DATA - data HERE IS ALL DATA -- EXCLUDE LIMIT AND INCLUDES ALL FILTER EVENTS
		let csvHolder = [];
		return new Promise(async (resolve, reject) => {
			try {
				for (let index = 0; index < data.length; index++) {
					const _process = data[index];
					const obj = {
						processNo: _process.processNumber,
						title: _process.title,
						type: `${_process.type?.name} (${_process.type?.typeCode})`,
						dept: `${_process.department?.name} (${_process.department?.typeCode})`,
						processOwner: _process.processOwner?.name,
						members: _process.personProcess?.length,
						inputDocuments: await differInputOutput(_process.documentProcess, 'document', 'input'),
						inputWAGroup: await differInputOutput(_process.whatsappProcess, 'whatsappGroup', 'input'),
						outputDocuments: await differInputOutput(_process.documentProcess, 'document', 'output'),
						outputWAGroup: await differInputOutput(_process.whatsappProcess, 'whatsappGroup', 'output'),
						status: _process.status,
						createdAt: DateFormat(_process.createdAt),
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


	const differInputOutput = (array, key, type) => {
		return new Promise((resolve, reject) => {
			let text = ''
			if (array.length) {
				for (let index = 0; index < array.length; index++) {
					const ioProcess = array[index];
					if (ioProcess.source?.toLowerCase() == type.toLowerCase()) {
						text = text ? text + ', ' + ioProcess[key]['name'] : ioProcess[key]['name']
					}
					if (index === array.length - 1) resolve(text)
				}
			}
			else resolve(text || '--')
		})
	}

	const setDownLoad = () => {
		setCSVDwn(true)
		setTimeout(() => {
			setCSVDwn(false)
		}, 3000);
	}

	let isFilterApplied = false
	
	const applyFilter = () => {
		isFilterApplied = true;
		console.log(filterData);
		const _filter = {
			typeId: filterData.type ? `"typeId": "${filterData.type}",` : '',
			departmentId: filterData.department ? `"departmentId": "${filterData.department}",` : '',
			processOwner: filterData.owner ? `"processOwner": "${filterData.owner}",` : '',
			status: filterData.status ? `"status": "${filterData.status}",` : '',
		}
		const where = `"where": { ${_filter.typeId + _filter.departmentId + _filter.processOwner + _filter.status} "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(page - 1) * pageLimit}`
		setFilterDialog(false)
		processUrl({ where })	
	}

	const onFilterClose = () => {
		setFilterDialog(false)
		isFilterApplied = false
		setFilterApplied(false);
		filterData.department=''
		filterData.status=''
		filterData.type=''
		filterData.owner=''
		fetchProccesses();
	}

	const ProcessPage = () => {
		return (
			<div className="w-full h-full">
				<TopBar
					filter="true"
					filterLabel={filterApplied ? 'Filter Applied' : 'Filter'}
					csv="true"
					onDownload={() => setDownLoad()}
					title="Processes"
					breadscrubs={paths}
					add={true}
					addTitle="Add Process"
					addEv={() => _setShowForm(true)}
					search={search}
					onSearch={(e) => { setSearch(e.target.value); onSearchType(e.target.value) }}
					onFilter={() => setFilterDialog(true)}
					placeholder="Search by title or process number"
				/>
				<br></br>
				<Table>
					<Table.Head>
						{columns.map((column, index) => {
							return (<Table.TextHeaderCell minWidth={column.width} maxWidth={column.width} key={column.key} className="th-c">
								{column.key == 'inputSource' || column.key == 'outputSource' ? nestedTableHead(column) : column.value}
							</Table.TextHeaderCell>)
						})}
					</Table.Head>
					<Table.Body height={allProcess?.length > 10 ? screenHeight - 300 : 'auto'}>
						{!allProcess ? showSpinner() : allProcess?.length === 0 ? showEmpty() : allProcess.map((profile, index) => (
							<Table.Row key={`"${index}"`} isSelectable onSelect={() => { navigate(`/admin/processes/${profile.id}`) }}>
								<Table.TextCell minWidth={'10%'} maxWidth={'10%'} className="tb-c">{profile.processNumber}</Table.TextCell>
								<Table.TextCell minWidth={'10%'} maxWidth={'10%'} className="tb-c">{profile.title}</Table.TextCell>
								<Table.TextCell minWidth={'10%'} maxWidth={'10%'} className="tb-c">{profile?.type?.name}</Table.TextCell>
								<Table.TextCell minWidth={'10%'} maxWidth={'10%'} className="tb-c">{profile?.department?.name}</Table.TextCell>
								<Table.TextCell minWidth={'25%'} maxWidth={'25%'} className="tb-c">
									<AvatarList
										avatar={`${baseUrl}photos/${profile?.processOwner?.memberType?.toLowerCase()}/download/${profile?.processOwner?.profile}`}
										name={profile?.processOwner?.name}
										description={`${profile?.processOwner?.employeeCode}, ${profile?.processOwner?.designation}`}
										action={false}
									/>
								</Table.TextCell>
								<Table.TextCell minWidth={'15%'} maxWidth={'10%'} className="tb-c">
									<span className='flex items-center'>
										{profile?.personProcess?.length === 0 ? '--' : [1, 2, 3].map((iter, index) => {
											const member = profile?.personProcess[index]
											return (<Avatar
												zIndex={index + 2}
												key={index}
												marginLeft={index > 0 ? (-((index * 2) + 20)) : 0}
												size={40}
												src={member?.member?.profile ? `${baseUrl}photos/${member?.member?.memberType?.toLowerCase()}/download/${member?.member?.profile}` : null}
												name={member?.member?.name}
											/>)
										})}
										<span className="primary">
											{profile?.personProcess?.length <= 3 ? null : `+ ${profile?.personProcess?.length - 3} more`}
										</span>
									</span>
								</Table.TextCell>
								{/* <Table.TextCell minWidth={'16%'} maxWidth={'16%'} className="tb-c">{nestedTableBody(profile, 'input')}</Table.TextCell>
								<Table.TextCell minWidth={'16%'} maxWidth={'16%'} className="tb-c">{nestedTableBody(profile, 'output')}</Table.TextCell> */}
								<Table.TextCell minWidth={'10%'} maxWidth={'10%'} className="tb-c">{profile?.status}</Table.TextCell>
								<Table.TextCell minWidth={'10%'} maxWidth={'10%'} className="tb-c">{DateFormat(profile?.createdAt)}</Table.TextCell>
							</Table.Row>
						))}
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
				{!showForm ? null :
					<div>
						<AddProcess open={showForm} data={{ types, members, departments, process }} onClose={(ev) => _setShowForm(ev)} onSubmit={(form) => { saveProcess(form) }} />
					</div>
				}
				{_csvDwn ? <CSV body={csv_data} headers={headers} filename="process.csv" /> : null}

				<Dialog isShown={filterDialog} onCancel={onFilterClose}
					title="Filter Processes"
					width={'50%'}
					confirmLabel="Filter"
					cancelLabel={filterApplied ? 'Clear filter' : 'Close'}
					onConfirm={applyFilter}>
					<form>
						<div className='flex justify-center items-center w-full'>
							<div className='w-full'>
								<SelectField
									label="Choose type"
									required
									value={filterData.type}
									onChange={(e) => setFilterData({ ...filterData, type: e.target.value })}>
									<option value="">Choose a type</option>
									{types.map(_type => {
										return (
											<option key={_type.id} value={_type.id}>
												{_type.name} ({_type.typeCode})
											</option>
										)
									})}
								</SelectField>
							</div>
							<div style={{ margin: "0 10px" }}></div>
							<div className='w-full'>
								<SelectField
									label="Choose department"
									required
									value={filterData.department}
									onChange={(e) => setFilterData({ ...filterData, department: e.target.value })}>
									<option value="">Choose a department</option>
									{departments.map(__dept => {
										return (
											<option key={__dept.id} value={__dept.id}>
												{__dept.name} ({__dept.typeCode})
											</option>
										)
									})}
								</SelectField>
							</div>
						</div>
						<div className='flex justify-center items-center w-full'>
							<div className='w-full'>
								<SelectField
									label="Choose Owner"
									required
									value={filterData.owner}
									onChange={(e) => setFilterData({ ...filterData, owner: e.target.value })}>
									<option value="">Choose an owner</option>
									{members.map(__mem => {
										return (
											<option key={__mem.id} value={__mem.id}>
												{__mem.name} ({__mem.employeeCode})
											</option>
										)
									})}
								</SelectField>
							</div>
							<div style={{ margin: "0 10px" }}></div>
							<div className='w-full'>
								<SelectField
									label="Choose status"
									required
									value={filterData.status}
									onChange={(e) => setFilterData({ ...filterData, status: e.target.value })}>
									<option value="">Choose a status</option>
									<option value="Not Implemented">Not Implemented</option>
									<option value="Partially Implemented">Partially Implemented</option>
									<option value="Implemented">Implemented</option>
								</SelectField>
							</div>
						</div>
					</form>
				</Dialog>
			</div>
		)
	}
	return ProcessPage();
}



Process.propTypes = {};

Process.defaultProps = {};

export default Process;

const columns = [
	{ key: 'processNumber', value: 'Processess', width: '10%' },
	{ key: 'title', value: 'Process Title', width: '10%' },
	{ key: 'type', value: 'Type', width: '10%' },
	{ key: 'department', value: 'Department', width: '10%' },
	{ key: 'processOwner', value: 'Owner', width: '25%' },
	{ key: 'members', value: 'Members', width: '15%' },
	// {
	// 	key: 'inputSource', _value: 'Input Source', width: '16%', value: [
	// 		{ key: 'whatsapp', value: 'Whatsapp', width: '50%' },
	// 		{ key: 'documents', value: 'Documents', width: '50%' }
	// 	]
	// },
	// {
	// 	key: 'outputSource', _value: 'Output Source', width: '16%', value: [
	// 		{ key: 'whatsapp', value: 'Whatsapp', width: '50%' },
	// 		{ key: 'documents', value: 'Documents', width: '50%' }
	// 	]
	// },
	{ key: 'status', value: 'Status', width: '10%' },
	{ key: 'createdAt', value: 'Created At', width: '10%' }
]