import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Process.module.css';
import TopBar from '../../components/TopBar/TopBar';
import AddProcess from '../../dialogs/AddProcess/AddProcess';
import { get } from '../../services/https.service';
import { useNavigate, Outlet } from "react-router-dom";

import { SearchInput, Table, Pagination } from 'evergreen-ui';


const Process = () => {
	const navigate = useNavigate()
	const [showForm, setShowForm] = useState(false)
	const [search, setSearch] = useState('')
	const [types, setTypes] = useState([])
	const [departments, setDept] = useState([])
	const [members, setMembers] = useState([])
	const [process, setProcess] = useState([])

	useEffect(() => {
		fetchDepartments()
		fetchMembers()
		fetchProcesses()
		fetchTypes()
	}, [])

	const fetchTypes = async () => {
		const response = await get('types')
		if (response) {
			console.log(response)
			if (response.statusCode == 200) {
				setTypes(response.data)
			}
		}
	}

	const fetchDepartments = async () => {
		const response = await get('departments')
		if (response) {
			console.log(response)
			if (response.statusCode == 200) {
				setDept(response.data)
			}
		}
	}

	const fetchMembers = async () => {
		const response = await get('members?filter={"where": {"memberType": "employee"}}')
		if (response) {
			console.log(response)
			if (response.statusCode == 200) {
				setMembers(response.data)
			}
		}
	}


	const fetchProcesses = async () => {
		const response = await get('processes?filter={"fields": ["id", "processNumber"]}')
		if (response) {
			console.log(response)
			if (response.statusCode == 200) {
				setProcess(response.data)
			}
		}
	}

	// let showForm = true
	const _setShowForm = (data) => {
		setShowForm(data)
	}

	const paths = [
		{ path: '/admin/processes/', title: 'Processes' }
	]

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
				<TopBar title="Processes" breadscrubs={paths} add={true} addEv={() => _setShowForm(true)} />
				<div className='mb-4'>
					<SearchInput onChange={(e) => setSearch(e.target.value)} value={search} />
				</div>
				<Table>
					<Table.Head>
						{columns.map((column, index) => {
							return (<Table.TextHeaderCell key={column.key} className="th-c">
								{column.key == 'inputSource' || column.key == 'outputSource' ? nestedTableHead(column) : column.value}
							</Table.TextHeaderCell>)
						})}
					</Table.Head>
					<Table.Body height={240}>
						{profiles.map((profile, index) => (
							<Table.Row key={`"${index}"`} isSelectable onSelect={() => { navigate(`/admin/processes/${profile.id}`) }}>
								<Table.TextCell className="tb-c">{profile.name}</Table.TextCell>
								<Table.TextCell className="tb-c">{profile.lastActivity}</Table.TextCell>
								<Table.TextCell isNumber className="tb-c">{profile.ltv}</Table.TextCell>
							</Table.Row>
						))}
					</Table.Body>
					<div className='py-2 flex justify-end bg-white border-t'>
						<Pagination page={1} totalPages={5}></Pagination>
					</div>
				</Table>
				<div>
					<AddProcess open={showForm} data={{ types, members, departments, process }} onClose={(ev) => _setShowForm(ev)} onSubmit={(form) => { console.log(form) }} />
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