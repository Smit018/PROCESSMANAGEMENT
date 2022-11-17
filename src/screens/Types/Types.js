import React, { useEffect, useState } from 'react';
import { get, patch, post,deleted } from '../../services/https.service';
import { Table, toaster } from 'evergreen-ui'
import { TextInputField } from 'evergreen-ui'
import { Pane, Dialog, Button,IconButton,Pagination,EditIcon,CrossIcon } from 'evergreen-ui'
import TopBar from '../../components/TopBar/TopBar';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';
import Paginator from '../../components/Paginator/Paginator';
import { SettingsBackupRestoreRounded } from '@mui/icons-material';


const page = { limit: 2, page: 0 }

const Types = () => {
	
	const [name, setName] = useState('');
	const [typeCode, setTypeCode] = useState('');
	const [typeData, setTypeData] = useState(null);
	const [open, setOpen] = useState(false);
	// const [search, setSearch] = useState('');
	const [innerHeight, setInnerHeight] = useState();
	
	const [page, setPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(10);
	const [totalData, setTotalData] = useState(0);
	
	const [openEdit,setOpenEdit]=useState(false);
	const [openDelete,setOpenDelete]=useState(false);
	const [processCount, setProcessCount]=useState(0);
	const [currTypeId, setCurrTypeId]=useState('');
	const [currentTypeCode,setCurrentTypeCode]=useState('');
	// const [currentTypeId,setCurrentTypeId]=useState('')

	let currentTypeId=''
	let setCurrentTypeId=(str)=>{
		currentTypeId=str;
	}

	
	
	
	
	let currentTprCount=0;
	
	
	
	const paths = [
		{ path: '/admin/type', title: 'Types' }
	]
	
	useEffect(() => {
		fetchTypes()
	}, []);
	
	
	const fetchCount = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const count = await get('types/count')
				if (count.statusCode >= 200 && count.statusCode < 300) {
					resolve(count.data.count)
				}
			}
			catch (err) {
				resolve(err)
			}
		})
	}
	
	const fetchTypes = async (filter) => {
		// FETCH ALL TYPES FROM THE SERVER
		try {
			setTypeData(null)
			const url = filter ? `types?filter=${filter}` : `types?filter={"limit": ${pageLimit}, "skip": 0, "order": "createdAt DESC"}`
			const allTypes = await get(url)
			const count = await fetchCount()
			setTotalData(count)
			if (allTypes.statusCode >= 200 && allTypes.statusCode < 300) {
				setTypeData(allTypes.data)
				allTypes.data.length <= 5 ? setInnerHeight(600) : allTypes.data.length <= 10 ? setInnerHeight(800) : setInnerHeight(window.innerHeight)
				setInnerHeight(window.innerHeight)
			}
			else toaster.danger('Failed to fetch Types')
		}
		catch (err) {
			console.log(err)
			toaster.danger('Failed to fetch Types')
		}
	}
	
	const createType = async () => {
		// SAVE TYPE TO DB
		try {
			let body = { name: name.trim(), typeCode: typeCode.trim() };
			let saveType = await post('types', body);
			if (saveType.statusCode >= 200 && saveType.statusCode < 300) {
				// TYPE SAVED SUCCESSFULLY
				// CLEAR THE FORM -- SHOW TOAST
				toaster.success('Type added succuessfully')
				setName('');
				setTypeCode('')
				setOpen(false)
				fetchTypes()
			}
			else {
				console.log(saveType.message)
				toaster.danger(saveType.statusCode==422?"Type and code should be unique":"failed to add")
			}
		}
		catch (err) {
			toaster.danger('Failed to add type')
			console.log(err)
		
		}
	}
	
	const handleClose = () => {
		setOpen(false);
		setOpenDelete(false)
		setOpenEdit(false)
	}
	
	const deleteType= async()=>{
		console.log(currTypeId);
		console.log(currentTypeId);
		console.log(currentTypeCode);

		try{
			
			let res= await deleted(`types/${currTypeId}`);
			if(res.statusCode==200){
				fetchTypes();
				toaster.success(`${name} Type is deleted`);
				setCurrentTypeId('');
				currentTprCount=0;
				setName('');
			}
		}
		catch(err){
			toaster.danger(err)
		}
		setOpenDelete(false);
		console.log(currentTypeId)
	}
	
	const editType=async()=>{
		try{
			console.log(currentTypeId,name,currentTypeCode);
			console.log(currTypeId)
			if(name){
				let res=await patch(`types/${currTypeId}`,{name,typeCode:currentTypeCode})
				if(res.statusCode==200){
					toaster.success('Type edited successfully');
					fetchTypes()
					setName('');
					setCurrentTypeId('');
					setOpenEdit(false);
				}
				
				
				
			}
		}
		catch(err){
			toaster.danger(err.message);
		}
		
	}
	
	const validateDelete=async(typeId)=>{
		console.log('clicked validatedelete')
		try{
			let processes=await get(`processes?filter={"where":{"typeId":"${typeId}"}}`);
			console.log(typeId);
			if(processes.statusCode==200){
				setOpenDelete(true);
				setProcessCount(processes.data.length)
				currentTprCount=processes.data.length;
				console.log(currentTprCount);
				setCurrTypeId(typeId)
				setCurrentTypeId(typeId);
			}
			else{
				currentTprCount=0;
			}
		}
		catch(err){	
			console.log("Error is here "+err);
		}	
	}
	
	const _validateForm = () => { 
		
		if (name.trim().length > 3 && !(/\s/).test(typeCode)) return false;
		else return true;
	}
	
	const changePage = (type) => {
		if (type === 'next') {
			const _page = page + 1
			setPage(_page)
			const filter = `{"limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}, "order": "createdAt DESC"}`
			fetchTypes(filter)
		}
		else if (type === 'prev') {
			const _page = page - 1
			setPage(_page)
			const filter = `{"limit": ${pageLimit}, "skip": ${(_page - 1) * pageLimit}, "order": "createdAt DESC"}`
			fetchTypes(filter)
		}
		else {
			setPage(type)
			const filter = `{"limit": ${pageLimit}, "skip": ${(type - 1) * pageLimit}, "order": "createdAt DESC"}`
			fetchTypes(filter)
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
		total={totalData}
		/>
		<br></br>
		<br></br>
		<Table aria-label="simple table">
		<Table.Head>
		<Table.TextHeaderCell className="th-c">SL No.</Table.TextHeaderCell>
		<Table.TextHeaderCell className="th-c">Name</Table.TextHeaderCell>
		<Table.TextHeaderCell className="th-c">Code</Table.TextHeaderCell>
		<Table.TextHeaderCell className="th-c">edit/delete</Table.TextHeaderCell>
		</Table.Head>
		<Table.Body height={typeData?.length > 8 ? innerHeight - 350 : 'auto'}>
		{!typeData ? showSpinner() : typeData.length === 0 ? showEmpty() : typeData.map((item, index) => {
			return (
				<Table.Row key={index}>
				<Table.TextCell className="tb-c">{(index + 1) + (page > 1 ? (page > 2 ? (pageLimit * (page - 1)) : pageLimit) : 0)}</Table.TextCell>
				<Table.TextCell className="tb-c">{item.name}</Table.TextCell>
				<Table.TextCell className="tb-c">{item.typeCode}</Table.TextCell>
				<Table.TextCell className="tb-c">
				<IconButton icon={EditIcon} margin={2} onClick={(event) =>{
					
					setCurrTypeId(item.id);
					setCurrentTypeId(item.id)
					setName(item.name);
					setCurrentTypeCode(item.typeCode);
					setOpenEdit(true);
					
				}} />
				<IconButton icon={CrossIcon} margin={2} onClick={(event) =>{
					setCurrentTypeId(item.id);
					console.log(currentTypeId);
					setName(item.name);
					setCurrTypeId(item.id);
					setCurrentTypeId(item.id)
					validateDelete(item.id);

				}} />
				</Table.TextCell>
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
			isConfirmDisabled={
				_validateForm()
			}
			onConfirm={createType}
			>
			<form>
			<TextInputField required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
			<TextInputField required label="Code" value={typeCode} onChange={(e) => setTypeCode(e.target.value)} />
			</form>
			</Dialog>
			
			{/* dialog to edit Types  */}
			
			<Dialog isShown={openEdit} title="Edit Types" onCloseComplete={handleClose} confirmLabel="Edit Types"
			isConfirmDisabled={_validateForm()}
			onConfirm={()=>{editType()}}>
			<form onSubmit={(event)=>{event.preventDefault();editType()}}>
			<TextInputField required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
			</form>
			</Dialog>
			
			{/* dialog to delete Types*/}
			
			<Dialog 
				isShown={openDelete} 
				title="Delete Types" 
				onCloseComplete={handleClose} 
				confirmLabel="Delete Types"
				onConfirm={()=>{deleteType()}}   
				isConfirmDisabled={processCount?true:false}>
				<form>
				<p>{processCount} {processCount < 2 ? ' process is' : ' processes are'} involved in {name}</p>
				</form>
			</Dialog>
			<br></br>
			</div>
			)
		};
		
		Types.propTypes = {};
		
		Types.defaultProps = {};
		
		export default Types;
		