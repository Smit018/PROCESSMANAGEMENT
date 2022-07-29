import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Process.module.css';
import TopBar from '../../components/TopBar/TopBar';
import AddProcess from '../../dialogs/AddProcess/AddProcess';
import { get, post } from '../../services/https.service';
import { useNavigate, Outlet } from "react-router-dom";

import { SearchInput, Table, Pagination, toaster } from 'evergreen-ui';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';
import Paginator from '../../components/Paginator/Paginator';
import { DateFormat } from '../../services/dateFormat';
import { CSV } from '../../services/csv.service';


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
	const [pageLimit, setPageLimit] = useState(10);
	const [totalData, setTotalData] = useState(0);

	useEffect(() => {
		setScreenHeight(window.innerHeight)
		fetchDepartments() //TO SET IN DIALOG
		fetchMembers() //TO SET IN DIALOG
		fetchTypes() //TO SET IN DIALOG
		fetchProcessesNumbers()
		fetchProccesses()
	}, [])

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

	const fetchCount = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const url = `processes/count?where={"deleted": {"neq": true}}`
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
			}
			const _url = filter || processUrl()
			const response = await get(_url)
			if (response) {
				if (response.statusCode == 200) {
					setAllProcess(response.data)
					allData = response.data
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

	const onSearchType = (value) => {
		const _data = allData.filter(process => {
			return process.title.toLowerCase().includes(value?.toLowerCase())
		})
		setAllProcess(_data)
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
		let process = {};
		for (let i in form) {
			process[`${i}`] = form[i].value ? form[i].value.trim() : form[i].value;
		}
		if (process['inputProcess'] == "") {
			delete process.inputProcess
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
		const filter = { where: '', include: '', order: '' }
		if (type === 'next') {
			const _page = page + 1
			setPage(_page)
			filter.where = `"where": { "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			processUrl(filter)
		}
		else if (type === 'prev') {
			const _page = page - 1
			setPage(_page)
			filter.where = `"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			processUrl(filter)
		}
		else {
			setPage(type)
			filter.where = `"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(type - 1) * pageLimit}`
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

	const ProcessPage = () => {
		return (
			<div className="w-full h-full">
				<TopBar
					filter="true"
					csv="true"
					onDownload={() => setDownLoad()}
					title="Processes"
					breadscrubs={paths}
					add={true}
					addTitle="Add Process"
					addEv={() => _setShowForm(true)}
					search={search}
					onSearch={(e) => { setSearch(e.target.value); onSearchType(e.target.value) }}
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
								<Table.TextCell minWidth={'8%'} maxWidth={'8%'} className="tb-c">{profile.processNumber}</Table.TextCell>
								<Table.TextCell minWidth={'10%'} maxWidth={'10%'} className="tb-c">{profile.title}</Table.TextCell>
								<Table.TextCell minWidth={'8%'} maxWidth={'8%'} className="tb-c">{profile?.type?.name}</Table.TextCell>
								<Table.TextCell minWidth={'8%'} maxWidth={'8%'} className="tb-c">{profile?.department?.name}</Table.TextCell>
								<Table.TextCell minWidth={'8%'} maxWidth={'8%'} className="tb-c">{profile?.processOwner?.name}</Table.TextCell>
								<Table.TextCell minWidth={'8%'} maxWidth={'8%'} className="tb-c">{profile?.personProcess?.length}</Table.TextCell>
								<Table.TextCell minWidth={'16%'} maxWidth={'16%'} className="tb-c">{nestedTableBody(profile, 'input')}</Table.TextCell>
								<Table.TextCell minWidth={'16%'} maxWidth={'16%'} className="tb-c">{nestedTableBody(profile, 'output')}</Table.TextCell>
								<Table.TextCell minWidth={'8%'} maxWidth={'8%'} className="tb-c">{profile?.status}</Table.TextCell>
								<Table.TextCell minWidth={'8%'} maxWidth={'8%'} className="tb-c">{DateFormat(profile?.createdAt)}</Table.TextCell>
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
				<div>
					<AddProcess open={showForm} data={{ types, members, departments, process }} onClose={(ev) => _setShowForm(ev)} onSubmit={(form) => { saveProcess(form) }} />
				</div>
				{_csvDwn ? <CSV body={csv_data} headers={headers} filename="process.csv" /> : null}
			</div>
		)
	}
	return ProcessPage();
}



Process.propTypes = {};

Process.defaultProps = {};

export default Process;

const columns = [
	{ key: 'processNumber', value: 'Processess', width: '8%' },
	{ key: 'title', value: 'Process Title', width: '10%' },
	{ key: 'type', value: 'Type', width: '8%' },
	{ key: 'department', value: 'Department', width: '8%' },
	{ key: 'processOwner', value: 'Owner', width: '8%' },
	{ key: 'members', value: 'Members', width: '8%' },
	{
		key: 'inputSource', _value: 'Input Source', width: '16%', value: [
			{ key: 'whatsapp', value: 'Whatsapp', width: '50%' },
			{ key: 'documents', value: 'Documents', width: '50%' }
		]
	},
	{
		key: 'outputSource', _value: 'Output Source', width: '16%', value: [
			{ key: 'whatsapp', value: 'Whatsapp', width: '50%' },
			{ key: 'documents', value: 'Documents', width: '50%' }
		]
	},
	{ key: 'status', value: 'Status', width: '8%' },
	{ key: 'createdAt', value: 'Created At', width: '8%' }
]