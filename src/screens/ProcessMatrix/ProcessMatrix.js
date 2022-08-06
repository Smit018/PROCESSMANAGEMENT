import React, { useEffect, useRef, useState } from 'react';
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
import { showEmpty, showSpinner } from '../../components/GlobalComponent';




let allProcess = [

]
const ProcessMatrix = () => {
	const path = [{ path: '/admin/process-matrix', title: 'Process Matrix' }]

	const [process, setProcess] = useState([])
	const [openTree, setOpenTree] = useState([])
	const [update, setUpdate] = useState([])

	const [rootProcess, setRootProcess] = useState('')
	const [currentProcesses, setCurrentProcesses] = useState([])

	const pmContainer = useRef(null)



	useEffect(() => {
		if (allProcess.length === 0) {
			fetchProcesses()
		}
		else {
			allProcess = []
			fetchProcesses()
		}
	}, [])

	const fetchProcesses = async () => {
		const filter = `{"where": {"inputProcess":  null}, "order": "createdAt DESC"}`
		const path = `processes?filter=${filter}`
		const response = await get(path)
		if (response.statusCode == 200) {
			allProcess.push(response.data)
			setProcess(allProcess)
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

	const ProcessCard = (myProps) => {
		return (
			<div style={{ backgroundColor: myProps.selected.includes(myProps.process.id) ? '#bbdefb' : '#fff' }} className='px-4 py-3 rounded-md mb-3 cursor-pointer shadow-md' onClick={() => myProps.click(myProps.process)}>
				<Heading textOverflow={'ellipsis'} maxWidth={175} overflow={'hidden'}>{myProps.process.processNumber}</Heading>
				<Text>{myProps.process.title}</Text>
			</div>
		)
	}

	const processClick = async (_process, parent, current) => {
		try {
			if (!currentProcesses.includes(_process?.id)) {
				if (parent === 0) {
					if (!rootProcess) {
						// SHOULD BE ROOT PROCESS
						console.log('1')
						setRootProcess(_process.id)
						const _node = []
						_node.push(_process.id)
						setCurrentProcesses(_node)
						const nextProceses = await fetchSetNextProcess(_process.id)
						allProcess.push(nextProceses)
						setProcess(allProcess)
						pmContainer.current.scrollLeft = pmContainer.current.scrollLeft + 300
						console.log(pmContainer.current.scrollLeft)
					}
					else {
						if (rootProcess !== _process.id) {
							// ALL PROCESS LIST UPDATE
							console.log('2')
							const _node = currentProcesses
							_node.splice(1, _node.length - 1)
							_node.push(_process.id)
							setCurrentProcesses(_node)
							/* --------------------- */
							setRootProcess(_process.id)
							allProcess.splice(1, allProcess.length - 1)
							const nextProceses = await fetchSetNextProcess(_process.id)
							allProcess.push(nextProceses)
							setProcess(allProcess)
							pmContainer.current.scrollLeft = pmContainer.current.scrollLeft + 300
							console.log(pmContainer.current.scrollLeft)
						}
						else {
							console.log('SAME CLICKED')
						}
					}
				}
				else {
					// ALL PROCESS LIST UPDATE
					const nextProceses = await fetchSetNextProcess(_process.id)
					console.log('3 ---> ', parent, currentProcesses.length)
					const _node = currentProcesses
					if (parent === currentProcesses.length) {
						_node.push(_process.id)
						allProcess.push(nextProceses)
					}
					else {
						_node.splice(parent, _node.length - 1)
						_node.push(_process.id)
						allProcess.splice(parent + 1, allProcess.length - 1)
						allProcess.push(nextProceses)
					}
					setCurrentProcesses(_node)
					/******************************** */
					setProcess(allProcess)
					pmContainer.current.scrollLeft = pmContainer.current.scrollLeft + 300
					console.log(pmContainer.current.scrollLeft)
				}
			}
			else {
				if (parent === 0) {
					const _node = []
					console.log('4')
					allProcess.splice(1, allProcess.length - 1)
					setProcess(allProcess)
					setCurrentProcesses(_node)
				}
				else toaster.notify('Process already expanded!')
			}
		}
		catch (err) {
			const _node = currentProcesses
			_node.pop()
			setCurrentProcesses(_node)
			console.log(err)
		}
		setUpdate([true])
	}

	const nextTree = async (_process, parent, current) => {
		try {
			if (currentProcesses.includes(_process.id)) {
				// PROCESS ALREADY INCLUDES IN THE EXPANDED TREE - CLOSE ALL PREVIOUS TREES
				const _node = currentProcesses
				_node.splice(parent, _node.length)
				allProcess.splice(parent + 1, allProcess.length - 1)
				setCurrentProcesses(_node)
				setProcess(allProcess)
			}
			else {
				if (parent === 0) {
					// FOR ROOT TREE
					if (rootProcess) {
						// UPDATE ROOT PROCESS AND CHANGE THE TREE
						if (rootProcess == _process.id) {
							// CLICKED ROOT PROCESS AGAIN - CLOSE ALL CHILD
							setRootProcess(_process.id)
							const _node = []
							_node.push(_process.id)
							allProcess.splice(1, allProcess.length - 1)
							setProcess(allProcess)
							setCurrentProcesses(_node)
						}
						else {
							// CLICKED ANOTHER ROOT TREE PROCESS
							setRootProcess(_process.id)
							const _node = []
							_node.push(_process.id)
							allProcess.splice(1, allProcess.length - 1)
							const nextProceses = await fetchSetNextProcess(_process.id)
							allProcess.push(nextProceses)
							setProcess(allProcess)
							setCurrentProcesses(_node)
						}
					}
					else {
						// FOR THE FIRST TIME --- rootProcess IS EMPTY
						setRootProcess(_process.id)
						const _node = []
						_node.push(_process.id)
						const nextProceses = await fetchSetNextProcess(_process.id)
						allProcess.push(nextProceses)
						setProcess(allProcess)
						setCurrentProcesses(_node)
					}
				}
				else {
					// FOR ALL OTHER TREES
					if (currentProcesses.length == parent) {
						// GOING IN FORWARD FLOW ONLY
						setRootProcess(_process.id)
						const _node = currentProcesses
						_node.push(_process.id)
						const nextProceses = await fetchSetNextProcess(_process.id)
						allProcess.push(nextProceses)
						setProcess(allProcess)
						setCurrentProcesses(_node)
					}
					else {
						if (currentProcesses.length - 1 === parent) {
							const _node = currentProcesses
							_node.pop()
							_node.push(_process.id)
							allProcess.splice(parent + 1, allProcess.length - 1)
							const nextProceses = await fetchSetNextProcess(_process.id)
							allProcess.push(nextProceses)
							setProcess(allProcess)
							setCurrentProcesses(_node)
						}
						else {
							// COMING BACK TO LOW LEVEL NODE PROCESS - TREE 
							const _node = currentProcesses
							_node.splice(parent, _node.length - 1)
							_node.push(_process.id)
							allProcess.splice(parent + 1, allProcess.length - 1)
							const nextProceses = await fetchSetNextProcess(_process.id)
							allProcess.push(nextProceses)
							setProcess(allProcess)
							setCurrentProcesses(_node)
						}
					}
				}
			}
		}
		catch (err) {
			console.log(err)
			if (err.err == 1) {
				const _node = currentProcesses
				_node.pop()
				setCurrentProcesses(_node)
			}
		}
		setUpdate([true])
	}

	const fetchSetNextProcess = (processId) => {
		return new Promise(async (resolve, reject) => {
			try {
				const subProcess = await fetchProcessById(processId)
				if (subProcess?.length) {
					resolve(subProcess)
				}
				else {
					reject({ err: 1, message: 'Not an input process for any other process!' })
					toaster.notify('Not an input process for any other process!')
				}
			}
			catch (err) {
				reject(err)
			}
		})
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
		return new Promise(resolve => {
			const index = array.findIndex(_el => {
				return id === _el.id
			})
			resolve(index)
		})
	}

	return (
		<div className='w-full h-full'>
			<TopBar title="Process Matrix" breadscrubs={path} />
			<div ref={pmContainer} className='flex overflow-x-auto pb-20' style={{ width: window.innerWidth - 350 }}>
				{process ? process?.map((subProcess, index) => {
					return (
						<div key={index} style={{ minWidth: 250, maxWidth: 250 }} className='mx-10'>
							{
								subProcess?.map((_pr, _index) => {
									return (
										<ProcessCard selected={currentProcesses} key={_pr?.id} process={_pr} click={(p) => nextTree(p, index, _index)} />
									)
								})
							}
						</div>
					)
				}) : showSpinner()}
			</div>
		</div>
	)
}

ProcessMatrix.propTypes = {};

ProcessMatrix.defaultProps = {};

export default ProcessMatrix;
