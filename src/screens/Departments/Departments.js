import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Departments.module.css';
import { post } from '../../services/https.service';
import { Table } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui'
import { Pane, Dialog, Button, Pagination } from 'evergreen-ui'
import TopBar from '../../components/TopBar/TopBar';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';


const Departments = () => {

	const [name, setName] = useState('');
	const [typeCode, setTypeCode] = useState('');
	const [departmentData, setDepartmentData] = useState(null);
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [innerHeight, setInnerHeight] = useState();

	const createDepartment = async () => {
		let department = { name: name.trim(), typeCode: typeCode.trim() };
		// let department = {name:"Marketing",typeCode:"MKG"}
		let saveDepartment = await post('departments', department);
		if (saveDepartment.statusCode >= 200 && saveDepartment.statusCode < 300) {
			console.log(" Department added")
		} else {
			console.log(saveDepartment.message)
		}

	}

	useEffect(() => {
		setInnerHeight(window.innerHeight)
		let obj = { name: "Customer Acquisition", code: "CRA" };
		let arr = []
		for (let i = 0; i < 1000; i++) {
			arr.push(obj)
		}
		setDepartmentData(arr);
	}, [0]);

	const handleClose = () => {
		setOpen(false);
	}

	const formValidation = () => {
		if (name.trim().length > 3 && typeCode.trim().length == 3) {
			return false;
		}
		else {
			return true;
		}
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
				csv="true"
				filter="true"
				search={search}
				onSearch={(e) => setSearch(e.target.value)}
			/>
			<br></br>
			<br></br>
			<Table aria-label="simple table">
				<Table.Head>
					<Table.TextHeaderCell className="th-c">SL No.</Table.TextHeaderCell>
					<Table.TextHeaderCell className="th-c">Name</Table.TextHeaderCell>
					<Table.TextHeaderCell className="th-c">Code</Table.TextHeaderCell>
				</Table.Head>
				<Table.Body height={innerHeight - 350}>
					{ !departmentData ? showSpinner() : departmentData.length === 0 ? showEmpty() : departmentData.map((item, index) => {
						return (
							<Table.Row>
								<Table.TextCell className="tb-c">{index + 1}</Table.TextCell>
								<Table.TextCell className="tb-c">{item.name}</Table.TextCell>
								<Table.TextCell className="tb-c">{item.typeCode}</Table.TextCell>
							</Table.Row>
						)
					})}
				</Table.Body>
				<div className='py-2 flex justify-end bg-white border-t h-16 items-center'>
					<Pagination page={1} totalPages={5}></Pagination>
				</div>
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
