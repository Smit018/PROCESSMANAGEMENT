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


let allDocuments = []

const Documents = () => {
	const [search, setSearch] = useState('');
	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	const [documentData, setDocumentData] = useState(null);
	const [open, setOpen] = useState(false);
	const [addMembers, setAddMembers] = useState([])

	const [page, setPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(3);
	const [totalData, setTotalData] = useState(0);

	const paths = [
		{ path: '/admin/documents', title: 'Documents' }
	]

	useEffect(() => {
		fetchDocuments()
	}, []);


	const fetchCount = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const url = `documents/count?where={"deleted": {"neq": true}}`
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

	const fetchDocuments = async (filter) => {
		try {
			const documentMembers = `"include": [{"relation": "documentMember", "scope": {"fields": ["id"]}}]`
			const url = `documents?filter={"where": {"deleted": {"neq": true}}, "order": "createdAt DESC", ${documentMembers}}`
			const response = await get(url)
			if (response.statusCode >= 200 && response.statusCode < 300) {
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
			let newDoc = { name: name.trim(), link: link.trim() };
			let saveDoc = await post('documents', newDoc);
			const count = await fetchCount()
			setTotalData(count)
			if (saveDoc.statusCode >= 200 && saveDoc.statusCode < 300) {
				toaster.success('Document added successfully!')
				fetchDocuments();
				setOpen(false);
			} else {
				console.log(saveDoc.message)
				toaster.danger('Failed to add document!')
			}
		}
		catch (err) {
			console.log(err)
			toaster.danger('Failed to add document!')
		}
	}

	const handleClose = () => {
		setOpen(false);
	}

	const formValidation = () => {
		if (name.trim().length > 3 && link.trim().length > 1) return false;
		else return true;
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

	const onSearchType = (value) => {
		const _data = allDocuments.filter(doc => {
			return doc.name.toLowerCase().includes(value?.toLowerCase())
		})
		setDocumentData(_data)
	}

	const changePage = (type) => {
		const documentMembers = `"include": [{"relation": "documentMember", "scope": {"fields": ["id"]}}]`
		if (type === 'next') {
			const _page = page + 1
			setPage(_page)
			const filter = `{"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}, "order": "createdAt DESC", ${documentMembers}}`
			fetchDocuments(filter)
		}
		else if (type === 'prev') {
			const _page = page - 1
			setPage(_page)
			const filter = `{"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}, "order": "createdAt DESC", ${documentMembers}}`
			fetchDocuments(filter)
		}
		else {
			setPage(type)
			const filter = `{"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(type - 1) * pageLimit}, "order": "createdAt DESC", ${documentMembers}}`
			fetchDocuments(filter)
		}
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
				filter="true"
				search={search}
				onSearch={(e) => { setSearch(e.target.value); onSearchType(e.target.value) }}
			/>
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
