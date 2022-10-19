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
import { CSV } from '../../services/csv.service';


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
	const [pageLimit, setPageLimit] = useState(25);
	const [totalData, setTotalData] = useState(0);

	// FOR CSV
	const [_csvDwn, setCSVDwn] = useState(false);
	const [csv_data, set_csv_data] = useState([]);
	const [filterApplied, setFilterApplied] = useState(false)
	let isFilterApplied=false;
    


	const paths = [
		{ path: '/admin/whatsapp-groups', title: 'Whatsapp Groups' }
	]


	useEffect(() => {
		fetchWhatsappGroups();
		fetchForCsv()
	}, []);


	const fetchCount = (where) => {
		return new Promise(async (resolve, reject) => {
			try {
				where = where || `where={"deleted": {"neq": true}}`
				const url = `whatsappGroups/count?${where}`
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

	const whatsappUrl = (filters, all) => {
		console.log(filters)
		const where = (filters && filters.where) ? filters.where : `"where": {"deleted": {"neq": true}} ${all ? '' : `, "limit": ${pageLimit}, "skip": ${(page - 1) * pageLimit}`}`
		const include = (filters && filters.include) ? filters.include : `"include": [{"relation": "whatsappMember", "scope": {"fields": ["id", "name"]}}]`
		const order = (filters && filters.order) ? filters.order : `"order": "createdAt DESC"`
		const _url = `whatsappGroups?filter={${where}, ${order}, ${include}}`
		setUrl(_url)
		if (filters) {
			fetchWhatsappGroups(_url)
		}
		else return _url
	}

	const onSearchType = async (value) => {
		if (value) {
			const whereCount = `where={"name":{"regexp":"/${value}/i"}, "deleted": {"neq": true}}`
			const count = await fetchCount(whereCount)
			setTotalData(count)
			// SEARCH THROUGH THE DB
			const where = `"where": {"name":{"regexp":"/${value}/i"}, "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(page - 1) * pageLimit}`
			whatsappUrl({ where })
		}
		else fetchWhatsappGroups()
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
				setFilterApplied(isFilterApplied)
				allData = response.data
				console.log(allData)
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
		try{
			const pattern= /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
			if(pattern.test(link.trim())){
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
		else{
			toaster.danger('invalid Link');
		}
		}
		catch(err){
			toaster.danger(err)
		}
		
	}

	const handleClose = () => {
		isFilterApplied=false;
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
		const _search = search ? `"name":{"regexp":"/${search}/i"},` : ''
		const filter = { where: '', include: '', order: '' }
		if (type === 'next') {
			const _page = page + 1
			setPage(_page)
			filter.where = `"where": { ${_search} "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			whatsappUrl(filter)
		}
		else if (type === 'prev') {
			const _page = page - 1
			setPage(_page)
			filter.where = `"where": { ${_search} "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}`
			whatsappUrl(filter)
		}
		else {
			setPage(type)
			filter.where = `"where": { ${_search} "deleted": {"neq": true}}, "limit": ${pageLimit}, "skip": ${(type - 1) * pageLimit}`
			whatsappUrl(filter)
		}
	}

	const _filterGroups = () => {
		isFilterApplied=true;
		let dummydate=new Date(filterData.to)
		dummydate.setHours(24,60,60,1100);
		let modifiedDate=new Date(dummydate)


		const filter = { where: '', include: '', order: '' }
		// console.log(new Date(filterData.from).toISOString(),new Date('1970'))

		// const _dateFilter = `"createdAt": {"between": ["${filterData.from || new Date('1970') }", "${filterData.to || new Date().toISOString()}"]}`
			const _dateFilter= ` "and": [
				{
					"createdAt": {
						"gte": "${filterData.from?new Date(filterData.from):new Date('1970')}"
					}
				},
				{
					"createdAt": {
						"lte": " ${filterData.to?new Date(modifiedDate):new Date()}"
					}
				}
			]`
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
								actionText={`${item?.whatsappMember?.length}
								 ${item?.whatsappMember?.length > 1 ? 'Members' : 'Member'}`}
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


	const fetchForCsv = async () => {
		const url = whatsappUrl(null, true)
		const response = await get(url)
		const csv = await createCSVData(response.data)
		set_csv_data(csv)
	}

	const headers = [
		{ label: "Name", key: "name" },
		{ label: "Link/Location", key: "link" },
		{ label: "Members", key: "members" },
		{ label: "Time Created", key: "createdAt" },
	];

	const createCSVData = (data) => {
		// CREATE CSV DATA - data HERE IS ALL DATA -- EXCLUDE LIMIT AND INCLUDES ALL FILTER EVENTS
		let csvHolder = [];
		return new Promise(async (resolve, reject) => {
			try {
				for (let index = 0; index < data.length; index++) {
					const wa = data[index];
					const obj = {
						name: wa.name,
						link: wa.link,
						members: wa.whatsappMember.map(mem => mem.name),
						createdAt: DateFormat(wa.createdAt),
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

	const setDownLoad = () => {
		setCSVDwn(true)
		setTimeout(() => {
			setCSVDwn(false)
		}, 3000);
	}

	const handleCancel=()=>{
		setFilterData({});
		fetchWhatsappGroups();
		setFilterDialog(false)
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
				onDownload={() => setDownLoad()}
				onFilter={() => openFilterDialog(true)}
				filter="true"
				search={search}
				filterLabel={filterApplied ? 'Filter Applied' : 'Filter'}
				placeholder="search by name"
				total={totalData}

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
				title="Filter Whatsaap Group"
				width={'50%'}
				confirmLabel="Filter"
				onCancel={!filterData?.to && !filterData?.from?setFilterDialog:handleCancel}
				cancelLabel={!filterData?.to && !filterData?.from?'close':'clear'}
				isConfirmDisabled={!filterData?.to && !filterData?.from}
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
			{_csvDwn ? <CSV body={csv_data} headers={headers} filename="wa.csv" /> : null}
		</div>
	)
};

WhatsappGroup.propTypes = {};

WhatsappGroup.defaultProps = {};

export default WhatsappGroup;
