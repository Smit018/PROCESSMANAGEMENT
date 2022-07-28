import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Departments.module.css';
import { get, post } from '../../services/https.service';
import { Table } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui'
import { Pane, Dialog, Button, Pagination, toaster } from 'evergreen-ui'
import TopBar from '../../components/TopBar/TopBar';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';
import Paginator from '../../components/Paginator/Paginator';

let allData = [];

const Departments = () => {


	const [name, setName] = useState('');
	const [typeCode, setTypeCode] = useState('');
	const [departmentData, setDepartmentData] = useState(null);
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [innerHeight, setInnerHeight] = useState();

	const [page, setPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(10);
	const [totalData, setTotalData] = useState(0);

	useEffect(() => {
		fetchDepartment()
	}, []);

	const handleClose = () => {
		setOpen(false);
	}

	const fetchDepartment = async (filter) => {
		try {
			setDepartmentData(null)
			const url = filter ? `departments?filter=${filter}` : `departments?filter={"limit": ${pageLimit}, "skip": 0, "order": "createdAt DESC"}`
			const allDept = await get(url)
			const count = await fetchCount()
			setTotalData(count)
			if (allDept.statusCode >= 200 && allDept.statusCode < 300) {
				setDepartmentData(allDept.data)
				allData = [...allDept.data]
				console.log(allData)
				allDept.data.length <= 5 ? setInnerHeight(600) : allDept.data.length <= 10 ? setInnerHeight(800) : setInnerHeight(window.innerHeight)
				setInnerHeight(window.innerHeight)
			}
			else toaster.danger('Failed to fetch Types')
		}
		catch (err) {
			console.log(err)
			toaster.danger('Failed to fetch Types')
		}
	}

	const fetchCount = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const count = await get('departments/count')
				if (count.statusCode >= 200 && count.statusCode < 300) {
					resolve(count.data.count)
				}
			}
			catch (err) {
				resolve(err)
			}
		})
	}

	const formValidation = () => {
		if (name.trim().length > 3 && typeCode.trim().length == 3) {
			return false;
		}
		else {
			return true;
		}
	}

	const createDepartment = async () => {
		try {

			let department = { name: name.trim(), typeCode: typeCode.trim() };
			let saveDepartment = await post('departments', department);
			if (saveDepartment.statusCode >= 200 && saveDepartment.statusCode < 300) {
				toaster.success('Type added succuessfully')
				setName('');
				setTypeCode('')
				setOpen(false)
				fetchDepartment()
			}
			else {
				console.log(saveDepartment.message)
				toaster.danger('Failed to add type')
			}
		}
		catch (err) {
			console.log(err)
			toaster.danger('Failed to add type')
		}
	}

	const changePage = (type) => {
		if (type === 'next') {
			const _page = page + 1
			setPage(_page)
			const filter = `{"limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}, "order": "createdAt DESC"}`
			fetchDepartment(filter)
		}
		else if (type === 'prev') {
			const _page = page - 1
			setPage(_page)
			const filter = `{"limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}, "order": "createdAt DESC"}`
			fetchDepartment(filter)
		}
		else {
			setPage(type)
			const filter = `{"limit": ${pageLimit}, "skip": ${(type - 1) * pageLimit}, "order": "createdAt DESC"}`
			fetchDepartment(filter)
		}
	}


	const onSearchType = (value) => {
		console.log(allData)
		const _data = allData.filter(dept => {
			return dept.name.toLowerCase().includes(value?.toLowerCase()) || dept.typeCode.toLowerCase().includes(value?.toLowerCase()) 
		})
		setDepartmentData(_data)
	}


	const paths = [
		{ path: '/admin/departments', title: 'Departments' }
	]




	return (
		<div className='h-full w-full'>
			<TopBar
				title="Departments"
				breadscrubs={paths}
				add={true}
				addTitle="Add Department"
				addEv={() => setOpen(true)}
				search={search}
				onSearch={(e) => { setSearch(e.target.value); onSearchType(e.target.value) }}
			/>
			<br></br>
			<br></br>
			<Table aria-label="simple table">
				<Table.Head>
					<Table.TextHeaderCell className="th-c">SL No.</Table.TextHeaderCell>
					<Table.TextHeaderCell className="th-c">Name</Table.TextHeaderCell>
					<Table.TextHeaderCell className="th-c">Code</Table.TextHeaderCell>
				</Table.Head>
				<Table.Body height={departmentData?.length > 10 ? innerHeight - 350 : 'auto'}>
					{!departmentData ? showSpinner() : departmentData.length === 0 ? showEmpty() : departmentData.map((item, index) => {
						return (
							<Table.Row key={index}>
								<Table.TextCell className="tb-c">{(index + 1) + (page > 1 ? (page > 2 ? (pageLimit * (page - 1)) : pageLimit) : 0)}</Table.TextCell>
								<Table.TextCell className="tb-c">{item.name}</Table.TextCell>
								<Table.TextCell className="tb-c">{item.typeCode}</Table.TextCell>
							</Table.Row>
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
			<Dialog isShown={open} onCloseComplete={handleClose}
				title="Add Type"
				confirmLabel="Save Type"
				isConfirmDisabled={formValidation()}
				onConfirm={createDepartment}
			>
				<form>
					<TextInputField required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
					<TextInputField required label="Code" value={typeCode} onChange={(e) => setTypeCode(e.target.value)} />
				</form>
			</Dialog>
			<br></br>
		</div>
	)
};

Departments.propTypes = {};

Departments.defaultProps = {};

export default Departments;
