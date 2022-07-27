import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Documents.module.css';

import { post, get } from '../../services/https.service';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { DateFormat } from '../../services/dateFormat';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Table } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui'
import { Pane, Dialog, Button, PeopleIcon, DocumentIcon } from 'evergreen-ui'
import TopBar from "../../components/TopBar/TopBar";

import TWOPEOPLE from "../../assets/images/twoPeople.png"
import { ListCard } from '../../components/AvatarList/AvatarList';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';


const Documents = () => {
	const [showForm, setShowForm] = useState(false)
	const [search, setSearch] = useState('');
	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	const [documentData, setDocumentData] = useState(null);
	const [open, setOpen] = useState(false);
	const [addMembers, setAddMembers] = useState([])

	const paths = [
		{ path: '/admin/documents', title: 'Documents' }
	]

	useEffect(() => {
		getAllDocument()
	}, [0]);

	const getAllDocument = async () => {
		const saveDoc = await get("documents");
		if (saveDoc.statusCode >= 200 && saveDoc.statusCode < 300) {
			let dataFromServer = saveDoc.data;
			setDocumentData(dataFromServer);
		} else {
			alert('Error Document Group')
		}
	}

	const createDocument = async () => {
		let newDoc = { name: name.trim(), link: link.trim() };
		let saveDoc = await post('documents', newDoc);
		if (saveDoc.statusCode >= 200 && saveDoc.statusCode < 300) {
			console.log('Document Saved');
			getAllDocument();
		} else {
			console.log(saveDoc.message)
		}
		handleClose();
	}

	const handleClose = () => {
		setOpen(false);
	}

	const formValidation = () => {
		if (name.trim().length > 3 && link.trim().length > 1) return false;
		else return true;
	}

	const showContent = () => {
		return documentData.map((item, index) => {
			return (
				<Link key={item.id} to={`${item.id}/${item.name}`}>
					<ListCard
						icon={<DocumentIcon size={20} color={'#262626'} />}
						title={item.name}
						subTitle={DateFormat(item.createdAt, "date-time")}
						actionText={'42 Members'}
					/>
				</Link>
			)
		})
	}

	return (
		<div className='h-full w-full'>
			<TopBar
				title="Documents"
				breadscrubs={paths}
				add={true}
				addTitle="Add Document"
				addEv={() => setShowForm(true)}
				csv="true"
				filter="true"
				search={search}
				onSearch={(e) => setSearch(e.target.value)}
			/>
			<br></br>
			{!documentData ? showSpinner() : documentData.length === 0 ? showEmpty() : showContent()}
			<Dialog isShown={showForm} onCloseComplete={handleClose}
				title="ADD DOCUMENT"
				width={'50%'}
				confirmLabel="Save Document"
				isConfirmDisabled={formValidation()}
				onConfirm={createDocument}>
				<form>
					<div className='flex justify-center items-center'>
						<TextInputField size={100} required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
						<div style={{ margin: "0 10px" }}></div>
						<TextInputField size={100} required label="Link" value={link} onChange={(e) => setLink(e.target.value)} />
					</div>
				</form>
			</Dialog>
		</div>
	)
};

Documents.propTypes = {};

Documents.defaultProps = {};

export default Documents;
