import React, { useEffect, useState } from 'react';
import { get, patch, post,deleted } from '../../services/https.service';
import {Table, IconButton, CrossIcon, EditIcon, Code } from 'evergreen-ui';
import { TextInputField } from 'evergreen-ui'
import { Pane, Dialog, Button, Pagination, toaster } from 'evergreen-ui'
import TopBar from '../../components/TopBar/TopBar';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';
import Paginator from '../../components/Paginator/Paginator';
import {useNavigate} from 'react-router-dom'

let allData = [];

const Departments = () => {
	const navigate = useNavigate();


	const [name, setName] = useState('');
	const [typeCode, setTypeCode] = useState('');
	const [departmentData, setDepartmentData] = useState(null);
	const [open, setOpen] = useState(false);
	const [openEdit,setOpenEdit]=useState(false);
	const [openDelete,setOpenDelete]=useState(false);
	const [search, setSearch] = useState('');
	const [innerHeight, setInnerHeight] = useState();
	const [currentDPcount,setCurrentDPcount]=useState(0);
	const [page, setPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(10);
	const [totalData, setTotalData] = useState(0);
	let currentDeparmentId=''
	let setCurrentDepartmentId=(str)=>{currentDeparmentId=str}
	useEffect(() => {
		fetchDepartment()
	}, []);

	const handleClose = () => {
		setOpen(false);
		setOpenEdit(false)
		setOpenDelete(false);
		setCurrentDPcount(0);

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
		if (name.trim().length > 3) {
			return false;
		}
		else {
			return true;
		}
	}

		// checking for number of process involved in a departement
		const validateDelete=async()=>{
			console.log('clicked validatedelete')
		
			try{

			let processes=await get(`processes?filter={"where":{"departmentId":"${currentDeparmentId}"}}`);
			if(processes.statusCode==200 && processes.data.length>0){
			setCurrentDPcount(processes.data.length);
			}
		else{
			setCurrentDPcount(0)
		}
		}
		catch(err){

			console.log("Error is here "+err);
		}
	
		
	}

	const editDepartment = async () => {
		try{
		console.log(currentDeparmentId)
		console.log(name)
		if(name){
			const response = await patch(`departments/${currentDeparmentId}`, { name })
			if(response.statusCode==200){
				setOpenEdit(false);
				setName('');
				setCurrentDepartmentId('');
				fetchDepartment()
				toaster.success('Departement edited succuessfully');
		
			}
		}
		}
		catch(err){
			toaster.danger(err.message)
		}
	}



	const deleteDepartment = async () => {
		
		try{
		  let res= await deleted(`/departments/${currentDeparmentId}`);
		  if(res.statusCode==200){
			fetchDepartment();

			toaster.success(`${name} department is deleted`);
			setCurrentDepartmentId('');
			setCurrentDPcount(0);
			setName('');
		  }
		}
		catch(err){
			toaster.danger(err)
		}
		setOpenDelete(false)
	}

	const createDepartment = async () => {
		try {

			let department = { name: name.trim(), typeCode: typeCode.trim() };
			let saveDepartment = await post('departments', department);
			if (saveDepartment.statusCode >= 200 && saveDepartment.statusCode < 300) {
				toaster.success('Department added succuessfully')
				setName('');
				setTypeCode('')
				setOpen(false)
				fetchDepartment()
			}
			else {
				console.log(saveDepartment.message)
				toaster.danger(saveDepartment.statusCode==422?"department name and code should be unique":'faild to fetch')
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
		{ path: '/admin/department', title: 'Departments' }
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
					<Table.TextHeaderCell className="th-c">Edit/delete</Table.TextHeaderCell>
				</Table.Head>
				<Table.Body height={departmentData?.length > 10 ? innerHeight - 350 : 'auto'}>
					{!departmentData ? showSpinner() : departmentData.length === 0 ? showEmpty() : departmentData.map((item, index) => {
						return (
							<Table.Row key={index}>
								<Table.TextCell className="tb-c">{(index + 1) + (page > 1 ? (page > 2 ? (pageLimit * (page - 1)) : pageLimit) : 0)}</Table.TextCell>
								<Table.TextCell className="tb-c cursor-pointer hover:underline"
								 onClick={()=>{navigate(`../department-details/${item.id}/${item.name}`);console.log('clicked')}}>
									{item.name}
									</Table.TextCell>
								<Table.TextCell className="tb-c">{item.typeCode}</Table.TextCell>
								<Table.TextCell className="tb-c">
									<IconButton icon={EditIcon} margin={2} onClick={(event) =>{
										setOpenEdit(true);
										setCurrentDepartmentId(item.id);
										setName(item.name)
										

										
										}} />
									<IconButton icon={CrossIcon} margin={2} onClick={()=>{
										setOpenDelete(true);
										 setCurrentDepartmentId(item.id);
										 setName(item.name);
										 validateDelete();
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

			{/* dialog for add department */}
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

			{/* dialog to edit department  */}

			<Dialog isShown={openEdit} title="Edit Department" onCloseComplete={handleClose} confirmLabel="Edit Department"
				isConfirmDisabled={formValidation()}
				onConfirm={editDepartment}>
				<form onSubmit={(event)=>{event.preventDefault();editDepartment()}}>
					<TextInputField required label="Name" value={name} onChange={(e) => setName(e.target.value)} />

				</form>
			</Dialog>
			 
			 {/* dialog to delete department  */}
			
			<Dialog isShown={openDelete} title="Delete Department"
			 onCloseComplete={()=>{handleClose();setCurrentDPcount(0)}} confirmLabel="Delete Department"
				isConfirmDisabled={currentDPcount>0?true:false}
				onConfirm={deleteDepartment} >
				
						<p>
							{currentDPcount} processes involved in {name} Department
						</p>
			</Dialog>




			<br></br>
		</div>
	)
};

Departments.propTypes = {};

Departments.defaultProps = {};

export default Departments;
