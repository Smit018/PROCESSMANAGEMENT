import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProcessMatrix.module.css';
import TopBar from '../../components/TopBar/TopBar';
import { ProcessList } from '../../components/AvatarList/AvatarList';
import { get } from '../../services/https.service';
import { Heading, Pane, Text, toaster, Spinner } from 'evergreen-ui';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { showSpinner } from '../../components/GlobalComponent';



let allProcess = []

const ProcessMatrix = () => {
	const path = [{ path: '/admin/process-matrix', title: 'Process Matrix' }]

	const [process, setProcess] = useState([])
	const [openTree, setOpenTree] = useState([])
	const [update, setUpdate] = useState([])

	useEffect(() => {
		fetchProcesses()
	}, [])

	const fetchProcesses = async () => {
		const filter = `{"where": {"inputProcess":  null}, "order": "createdAt DESC"}`
		const path = `processes?filter=${filter}`
		const response = await get(path)
		if (response.statusCode == 200) {
			allProcess.push(response.data)
			console.log(allProcess)
			setProcess(response.data)
		}
	}

	const fetchProcessById = async (pid) => {
		return new Promise(async (resolve, reject) => {
			try {
				const filter = `{"where": {"inputProcess":  "${pid}"}, "order": "createdAt DESC"}`
				const path = `processes?filter=${filter}`
				const response = await get(path)
				if (response.statusCode == 200) {
					resolve(response.data)
				}
				else reject(response)
			}
			catch (err) {
				reject(err)
			}
		})
	}

	const ProcessCard = (myProps) => (
		<div className='bg-white px-4 py-3 rounded-md shadow mb-3 cursor-pointer' onClick={() => myProps.click(myProps.process)}>
			<Heading>{myProps.process.processNumber}</Heading>
			<Text>{myProps.process.title}</Text>
		</div>
	)

	const processClick = (process, parent, current) => {
		console.log(process, parent, current)
		fetchProcessById(process.id)
	}

	const CustomTree = (myProps) => {
		return (
			<TreeItem ContentComponent={ProcessCard} {...myProps} />
		)
	}

	const _showSpinner = () => {
		return (
			<div className='flex py-4 items-center justify-center w-64'>
				<Spinner size={20} />
			</div>
		)
	}

	const findIndex = (id, array) => {
		return new Promise(resolve=> {
			const index = array.findIndex(_el => {
				return id === _el.id
			})
			resolve(index)
		})
	}

	const loadProcess = async (processId) => {
		const index = await findIndex(processId, process)
		try {
			if (!openTree.includes(processId)) {
				let _x = openTree
				_x.push(processId)
				setOpenTree(_x)
				const nestedProcess = await fetchProcessById(processId)
				let store = process
				store[index]['process'] = nestedProcess
				console.log(openTree, process[index]['process'])
				setProcess(store)
				setUpdate([true])
			}
			else {
				const index = openTree.indexOf(processId)
				let _x = openTree
				_x.splice(index, 1)
				setOpenTree(_x)
				console.log(openTree)
			}
		}
		catch (err) {
			console.log(err)
			toaster.danger('Something went wrong', {
				description: err
			})
		}
	}

	const showNestedTree = (_process) => {
		return _process?.process?.map((__process, index) => {
			return (
				<TreeItem key={__process.id} nodeId={__process.id + index} label={__process.processNumber} />
			)
		})
	}

	return (
		<div className='w-full h-full'>
			<TopBar title="Process Matrix" breadscrubs={path} />
			<TreeView
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpandIcon={<ChevronRightIcon />}
				onNodeSelect={(ev, node) => loadProcess(node)}
			>
				{process.map((_process, index) => {
					return (
						<TreeItem key={_process.id} nodeId={_process.id} label={_process.processNumber}>
							{  _process?.process?.length > 0 ? showNestedTree(_process) : <Text>{'count  ' + _process?.processNumber}</Text> }
						</TreeItem>
					)
				})}
				<TreeItem nodeId="5" label="Documents">
					<TreeItem nodeId="10" label="OSS" />
					<TreeItem nodeId="6" label="MUI">
						<TreeItem nodeId="8" label="index.js" />
					</TreeItem>
				</TreeItem>
			</TreeView>
			{/* <div className='flex overflow-x-auto'>
				{allProcess?.map((subProcess, index) => {
					return (
						<div key={index} className='w-72 mx-5'>
							{
								subProcess.map((_pr, _index) => {
									return (
										<ProcessCard key={_pr?.id} process={_pr} click={(p) => processClick(p, index, _index)} />
									)
								})
							}
						</div>
					)
				})}
			</div> */}
		</div>
	)
}

ProcessMatrix.propTypes = {};

ProcessMatrix.defaultProps = {};

export default ProcessMatrix;
