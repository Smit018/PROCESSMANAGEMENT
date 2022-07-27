import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Types.module.css';

import { post } from '../../services/https.service';
import Box from '@mui/material/Box';
import { Table } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui'
import { Pane, Dialog, Button, Pagination } from 'evergreen-ui'
import TopBar from '../../components/TopBar/TopBar';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';


const Types = () => {

	const [name, setName] = useState('');
	const [typeCode, setTypeCode] = useState('');
	const [typeData, setTypeData] = useState(null);
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [innerHeight, setInnerHeight] = useState();

	const paths = [
		{ path: '/admin/types', title: 'Types' }
	]

	const createType = async () => {
		let Type = { name: name.trim(), typeCode: typeCode.trim() };
		// let department = {name:"Marketing",typeCode:"MKG"}
		let saveType = await post('types', Type);
		if (saveType.statusCode >= 200 && saveType.statusCode < 300) {
			console.log(" Type added")
		} else {
			console.log(saveType.message)
		}

	}

	useEffect(() => {
		setInnerHeight(window.innerHeight)
		let obj = { name: "Human Resource", typeCode: "HR" };
		let arr = []
		for (let i = 0; i < 300; i++) {
			arr.push(obj)
		}
		setTypeData(arr);
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

	return (
		<div className='h-full w-full'>
			<TopBar
				title="Type"
				breadscrubs={paths}
				add={true}
				addTitle="Add Type"
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
					{!typeData ? showSpinner() : typeData.length === 0 ? showEmpty() : typeData.map((item, index) => {
						return (
							<Table.Row key={index}>
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
				onConfirm={createType}
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

Types.propTypes = {};

Types.defaultProps = {};

export default Types;
