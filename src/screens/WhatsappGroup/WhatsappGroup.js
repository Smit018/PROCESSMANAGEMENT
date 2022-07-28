import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './WhatsappGroup.css';
import { post, get } from '../../services/https.service';
import { DateFormat } from '../../services/dateFormat';
import { Link } from 'react-router-dom';
import { Button, Table, Dialog, TextInputField, PeopleIcon, Spinner, toaster } from "evergreen-ui";
import { Pane, Text } from 'evergreen-ui'
import USERIMG from "../../assets/images/userImgs.png";
import TWOPEOPLE from "../../assets/images/twoPeople.png"
import { ErrorTwoTone } from '@mui/icons-material';
import TopBar from '../../components/TopBar/TopBar';
import { ListCard } from '../../components/AvatarList/AvatarList';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';
import Paginator from '../../components/Paginator/Paginator';


let allData = []

const WhatsappGroup = () => {
	const [search, setSearch] = useState('');
	const [url, setUrl] = useState('');

	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	const [whatsappData, setWhatsappData] = useState(null);
	const [open, setOpen] = useState(false);
	const [filterDialog, setFilterDialog] = useState(false)
	const [filterData, setFilterData] = useState({})


	const [page, setPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(10);
	const [totalData, setTotalData] = useState(0);

	const paths = [
		{ path: 'whatsapp-groups', title: 'Whatsapp Groups' }
	]


	useEffect(() => {
		fetchWhatsappGroups();
	}, []);


	const fetchCount = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const url = `whatsappGroups/count?where={"deleted": {"neq": true}}`
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

	const whatsappUrl = (filters) => {
		console.log(filters)
		const where = (filters && filters.where) ? filters.where : `"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(page - 1) * pageLimit}`
		const include = (filters && filters.include) ? filters.include : `"include": [{"relation": "whatsappMember", "scope": {"fields": ["id"]}}]`
		const order = (filters && filters.order) ? filters.order : `"order": "createdAt DESC"`
		const _url = `whatsappGroups?filter={${where}, ${order}, ${include}}`
		setUrl(_url)
		if (filters) {
			fetchWhatsappGroups(_url)
		}
		else return _url
	}

	const onSearchType = (value) => {
		const _data = allData.filter(_grp => {
			return _grp.name.toLowerCase().includes(value?.toLowerCase())
		})
		setWhatsappData(_data)
	}

	const fetchWhatsappGroups = async (filter) => {
		try {
			setWhatsappData(null)
			if (!filter) {
				const count = await fetchCount()
				setTotalData(count)
			}
			const _url = filter || whatsappUrl()
			const response = await get(_url);
			if (response.statusCode >= 200 && response.statusCode < 300) {
				allData = response.data
				setWhatsappData(allData)
			}
			else {
				toaster.danger('Failed to fetch whatsapp groups!')
			}
		}
		catch (err) {
			console.log(err)
			toaster.danger('Failed to fetch whatsapp groups!')
		}
	}

	const clearForm = () => {
		setName('')
		setLink('')
	}

	const createWhatsapp = async () => {
		let newDoc = { name: name.trim(), link: link.trim() };
		let saveDoc = await post('whatsappGroups', newDoc);
		if (saveDoc.statusCode >= 200 && saveDoc.statusCode < 300) {
			clearForm()
			fetchWhatsappGroups()
			toaster.success('Whatsapp group created successfully!')
			setOpen(false)
		}
		else toaster.danger('Failed to whatsapp group!')
	}

	const handleClose = () => {
		setOpen(false);
	}

	const formValidation = () => {
		if (name.trim().length > 3 && link.trim().length > 1) {
			return false;
		}
		else {
			return true;
		}
	}

	const changePage = (type) => {
		const filter = { where: '', include: '', order: '' }
		if (type === 'next') {
			const _page = page + 1
			setPage(_page)
			filter.where = `"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			whatsappUrl(filter)
		}
		else if (type === 'prev') {
			const _page = page - 1
			setPage(_page)
			filter.where = `"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			whatsappUrl(filter)
		}
		else {
			setPage(type)
			filter.where = `"where": {"deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(type - 1) * pageLimit}`
			whatsappUrl(filter)
		}
	}

	const _filterGroups = () => {
		const filter = { where: '', include: '', order: '' }
		const _dateFilter = `"createdAt": {"between": ["${new Date(filterData.from)}", "${new Date(filterData.to)}"]}`
		filter.where = `"where": {"deleted": {"neq": true}, ${_dateFilter}}`
		whatsappUrl(filter)
		setTotalData(1)
		setFilterDialog(false)
	}

	const openFilterDialog = (value) => {
		setFilterDialog(value)
	}


	const donwloadCsv = () => {
		console.log('Download csv here')
	}

	const showContent = () => {
		return (
			<div>
				{whatsappData?.map((item, index) => {
					return (
						<Link key={index} to={`${item.id}/${item.name}`}>
							<ListCard
								title={item.name}
								subTitle={DateFormat(item.createdAt, "date-time")}
								icon={<PeopleIcon size={20} color={'#262626'} />}
								actionText={`${item?.whatsappMember?.length} ${item?.whatsappMember?.length > 1 ? 'Members' : 'Member'}`}
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

	return (
		<div className='w-full h-full'>
			<TopBar
				title="Whatsapp Groups"
				breadscrubs={paths}
				add={true}
				addTitle="Add Whatsapp Group"
				addEv={() => setOpen(true)}
				csv="true"
				onDownload={() => donwloadCsv()}
				onFilter={() => openFilterDialog(true)}
				filter="true"
				search={search}
				onSearch={(e) => { setSearch(e.target.value); onSearchType(e.target.value) }}
			/>
			<br></br>
			<br></br>
			{!whatsappData ? showSpinner() : whatsappData?.length === 0 ? showEmpty() : showContent()}
			<Dialog isShown={open} onCloseComplete={handleClose}
				title="ADD WHATSAPP GROUP"
				width={'50%'}
				confirmLabel="Save Whatsapp"
				isConfirmDisabled={formValidation()}
				onConfirm={createWhatsapp}
			>
				<form>
					<div className='flex justify-center items-center'>
						<TextInputField size={100} required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
						<div style={{ margin: "0 10px" }}></div>
						<TextInputField size={100} required label="Link" value={link} onChange={(e) => setLink(e.target.value)} />
					</div>
				</form>
			</Dialog>

			<Dialog isShown={filterDialog} onCloseComplete={setFilterDialog}
				title="Filter Documents"
				width={'50%'}
				confirmLabel="Filter"
				isConfirmDisabled={!filterData?.to || !filterData?.from}
				onConfirm={_filterGroups}>
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
		</div>
	)
};

WhatsappGroup.propTypes = {};

WhatsappGroup.defaultProps = {};

export default WhatsappGroup;
