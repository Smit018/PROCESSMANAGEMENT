import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Process.module.css';
import TopBar from '../../components/TopBar/TopBar';
import AddProcess from '../../dialogs/AddProcess/AddProcess';
import { get, post } from '../../services/https.service';
import { useNavigate, Outlet } from "react-router-dom";

import { SearchInput, Table, Pagination } from 'evergreen-ui';


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
	const [allProcess, setAllProcess] = useState([]);

	useEffect(() => {
		setScreenHeight(window.innerHeight)
		fetchDepartments()
		fetchMembers()
		fetchProcesses()
		fetchTypes()
		fetchAllProcess()
	}, [])

	window.addEventListener('resize', (event) => {
		setScreenHeight(event.target.innerHeight)
	})

	const fetchTypes = async () => {
		const response = await get('types')
		if (response) {
			if (response.statusCode == 200) {
				setTypes(response.data)
			}
		}
	}

	const fetchAllProcess=async()=>{
		const response = await get('processes?filter={"include":["processOwner","type","department"]}')
		// const response = await get('processes')
		if (response) {
			console.log(response)
			if (response.statusCode == 200) {
				setAllProcess(response.data)
			}
		}
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


	const fetchProcesses = async () => {
		const response = await get('processes?filter={"fields": ["id", "processNumber"]}')
		// const response = await get('processes')
		if (response) {
			console.log(response)
			if (response.statusCode == 200) {
				setProcess(response.data)
			}
		}
	}

	const saveProcess = async (form)=>{
		console.log(form)
		let process={};
		for(let i in form){
			process[`${i}`]=form[i].value.trim();
		}
		if(process['inputProcess']==""){
			delete process.inputProcess
		}
		process['duration'] = `${process['hours']}:${process['hours']}`;
		const processSave = await post("processes",process);
		if(processSave.statusCode>=200 && processSave.statusCode<300){
			console.log('process Save');
		}

		console.log(process)
	}

	// let showForm = true
	const _setShowForm = (data) => {
		setShowForm(data)
	}

	const paths = [
		{ path: '/admin/processes/', title: 'Processes' }
	]

	const verifyProcessNumber = async(e)=>{
		console.log(e)
		const check = await get(`processes?filter={"where":{"processNumber":"${e}"}}`);
		console.log(check)
		if(check.statusCode>=200 && check.statusCode<300){
			if(check.data.length>0){
				console.log('hjjhb')
				setUniqueNumber(uniqueNumber+1);
			}
		}
	}

	const nestedTableHead = (columns) => {
		return (
			<div className='flex flex-col items-center w-60'>
				<span className='my-1 className="th-c"'>{columns._value}</span>
				<div className='flex justify-between'>
					{columns.value.map((column, index) => {
						return (<Table.TextHeaderCell className="th-c" key={`${column.key}_${index}`}>{column.value}</Table.TextHeaderCell>)
					})}
				</div>
			</div>
		)
	}

	const ProcessPage = () => {
		return (
			<div className="w-full h-full">
				<TopBar
					filter="true"
					csv="true"
					title="Processes"
					breadscrubs={paths}
					add={true}
					addTitle="Add Process"
					addEv={() => _setShowForm(true)}
					search={search}
					onSearch={(e) => setSearch(e.target.value)}
				/>
				<br></br>
				<Table>
					<Table.Head>
						{columns.map((column, index) => {
							return (<Table.TextHeaderCell key={column.key} className="th-c">
								{column.key == 'inputSource' || column.key == 'outputSource' ? nestedTableHead(column) : column.value}
							</Table.TextHeaderCell>)
						})}
					</Table.Head>
					<Table.Body height={screenHeight - 300}>
						{allProcess.map((profile, index) => (
							<Table.Row key={`"${index}"`} isSelectable onSelect={() => { navigate(`/admin/processes/${profile.id}`) }}>
								<Table.TextCell className="tb-c">{profile.processNumber}</Table.TextCell>
								<Table.TextCell className="tb-c">{profile.title}</Table.TextCell>
								{/* <Table.TextCell isNumber className="tb-c">{profile.ltv}</Table.TextCell> */}
								<Table.TextCell className="tb-c">{profile?.type?.name}</Table.TextCell>
								<Table.TextCell className="tb-c">{profile?.department?.name}</Table.TextCell>
								<Table.TextCell className="tb-c">{profile?.processOwner?.name}</Table.TextCell>
							</Table.Row>
						))}
					</Table.Body>
					<div className='py-2 flex justify-end bg-white border-t h-16 items-center'>
						<Pagination page={1} totalPages={5}></Pagination>
					</div>
				</Table>
				<div>
					<AddProcess open={showForm} data={{ types, members, departments, process }} onClose={(ev) => _setShowForm(ev)} onSubmit={(form) => { saveProcess(form) }} />
				</div>
			</div>
		)
	}
	return ProcessPage();
}



Process.propTypes = {};

Process.defaultProps = {};

export default Process;

const profiles = [
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "Peter Parker", id: "2", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "Tony Stark", id: "3", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "4", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "5", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
	{ name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 }
]


const columns = [
	{ key: 'processNumber', value: 'Processess' },
	{ key: 'title', value: 'Process Title' },
	{ key: 'type', value: 'Type' },
	{ key: 'department', value: 'Department' },
	{ key: 'processOwner', value: 'Owner' },
	{ key: 'members', value: 'Members' },
	{
		key: 'inputSource', _value: 'Input Source', value: [
			{ key: 'whatsapp', value: 'Whatsapp' },
			{ key: 'documents', value: 'Documents' }
		]
	},
	{
		key: 'outputSource', _value: 'Output Source', value: [
			{ key: 'whatsapp', value: 'Whatsapp' },
			{ key: 'documents', value: 'Documents' }
		]
	},

	{ key: 'status', value: 'Status' },
	{ key: 'createdAt', value: 'Created At' }
]