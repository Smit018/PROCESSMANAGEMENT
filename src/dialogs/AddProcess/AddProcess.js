import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AddProcess.css';
// import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { Button, TextField } from '@mui/material';
import { REGEX } from '../../services/https.service';
import AccountCircle from '@mui/icons-material/AccountCircle'
import InputAdornment from '@mui/material/InputAdornment';
// import Autocomplete from '@mui/material/Autocomplete';
import { get, post } from '../../services/https.service';

import { Dialog, Pane, Button, SelectField, Autocomplete, TextInput, FormField, TextInputField, Text, toaster } from "evergreen-ui";
import { CollectionsBookmarkOutlined } from '@mui/icons-material';

const myForm = {
	"title": {
		value: '',
		error: false,
		regex: REGEX.ALL
	},
	"processNumber": {
		value: '',
		error: false,
		regex: REGEX.ALL
	},
	"typeId": {
		value: '',
		error: false,
		regex: REGEX.ALL
	},
	"departmentId": {
		value: '',
		error: false,
		regex: REGEX.ALL
	},
	"processOwnerId": {
		value: '',
		error: false,
		regex: REGEX.ALL
	},
	"inputProcess": {
		value: '',
		error: false,
		regex: /.*/
	},
	"frequency": {
		value: '',
		error: false,
		regex: REGEX.ALL
	},
	"hours": {
		value: '',
		error: false,
		regex: REGEX.ALL
	},
	"minutes": {
		value: 0,
		error: false,
		regex: REGEX.ALL
	},
	"status": {
		value: '',
		error: false,
		regex: REGEX.ALL
	}
}

let _formDefault = { ...myForm }

const AddProcess = (props) => {
	const [formValues, setFormValues] = useState(myForm)
	const [submitted, setSubmitted] = useState(false)
	const [hours, setHours] = useState('')
	const [minutes, setMinutes] = useState('')
	const [loading, setLoading] = React.useState(false);
	const [pTypeCode, setpTypeCode] = useState('');
	const [dTypeCode, setdTypeCode] = useState('');
	const [uniqueNumber, setUniqueNumber] = useState(1);
	const [processNoPrefix, setProcessNoPrefix] = useState('');
	const [processFound, setProcessFound] = useState(false);
	const [addbuttondisabled,setAddButtonDisabled]=useState(false);
	const [showErrors, setShowErrors] = useState(false);

	const [selectedDept, setSelectedDept] = useState(null);
	const [selectedInpProcess, setSelectedInpProcess] = useState(null);
	const [selectedProcessOwner, setSelectedProcessOwner] = useState(null);
	const [inProcessSel, setInProcessSel] = useState(null);
	const [initialProcessNumberPrefix,setInitialProcessNumberPrefix]=useState(null);

	useEffect(() => {
		if (props.inject)
		{	
			console.log(props.inject.processOwner.name)
			setUpdateData(props.inject)
		
			setAddButtonDisabled(false)}	
		else {
			cleanUpForm()
			setFormValues(_formDefault)
		}
	}, []);

	useEffect(() => {
		return () => {
			console.log("cleaned up");
		};
	}, []);

	const cleanUpForm = () => {
		for (let key in _formDefault) {
			if (key !== 'frequency' && key !== 'status')
				_formDefault[key]['value'] = ""
		}
	}


	const setUpdateData = async (data) => {
		for (let key in _formDefault) {
			if (data[key]) {
				if (key === 'processNumber') {
					const abbr = data[key].substring(0, 5)
					setProcessNoPrefix(abbr)
					const abbr2=abbr.substring(2)
					setInitialProcessNumberPrefix(abbr2);

					_formDefault[key]['value'] = data[key].substring(5, data[key].length)
				}
				else if (key == 'departmentId') {
					const item = await _arrayFilter(props.data.departments, data[key], 'id')
					console.log(item[0]);
					setSelectedDept(item[0])
					_formDefault[key]['value'] = data[key]
				}
				else if (key == 'inputProcess') {
					const item = await _arrayFilter(props.data.process, data[key], 'id')
					setSelectedInpProcess(item[0])
					_formDefault[key]['value'] = data[key]
				}
				else if (key === 'processOwnerId') {
					console.log(key)
					console.log(props.data.members)
					console.log( data[key], 'id')
					const item = props.inject? await _arrayFilter(props.data.members, data[key], 'id'):
					await _arrayFilter(props.data.members, data[key]['id'], 'id')
					setSelectedProcessOwner(item[0])
					_formDefault[key]['value'] = data[key]['id']
					console.log(_formDefault)
				}

				// else if(key=='processOwner'){
				// 	console.log(key)
				// 	console.log('Process owener name is here'+data.processOwner.name)
				// 	// setSelectedProcessOwner(data.processOwner.name)
				// 	_formDefault[key]['value']=data[key]['name']
				// 	console.log(_formDefault[key]['value']);
				// }
				else{ 
					_formDefault[key]['value'] = data[key]
				}
			}
		}
		setFormValues(_formDefault)
	}


	const _arrayFilter = (array, id, key) => {
		return new Promise(resolve => {
			const _data = array.filter(element => element[key] === id)
			resolve(_data)
		})
	}
	

	const departmentChange = (item, type) => {
		let formData = { ...formValues };
		if (type == 'department') {
			setdTypeCode(item.typeCode);

			formData['departmentId']['value'] = item.id;
			// formData['processNumber']['value'] = pTypeCode + item.typeCode + props.uniqueNumber;
			// verifyProcessNumber(pTypeCode + item.typeCode + uniqueNumber);
		}
		else {
			formData['processOwnerId']['value'] = item.id;
		}
		setFormValues(formData);
	}

	const handleInputChange = (e) => {
		// HANDLE INPUT CHANGE
		// console.log()
		const { name, value } = e.target;
		console.log(name,value)
		const _formValues = { ...formValues }
		
		if(name==='minutes' && value>59){
				let hourInc=Math.floor(value/60)
				let actualMin=value%60;
				console.log(hourInc,actualMin)

				let hours=parseInt(_formValues['hours']['value'])
				hours+=hourInc;
				_formValues['hours']['value']=hours;

				_formValues[name]['value'] = actualMin;
		}
		else{
			_formValues[name]['value'] = value;
		}
		if (e.target.name == 'inputProcess') {
			if (value) setInProcessSel(true)
			else setInProcessSel(false)
		}
		if (name == "typeId") {
			let processTypeCode = props.data.types.filter(e => e.id == value)[0]['typeCode']
			// setpTypeCode(processTypeCode);
			// _formValues['processNumber']['value'] = processTypeCode + dTypeCode + uniqueNumber;
			verifyProcessNumber(processTypeCode + dTypeCode + uniqueNumber);
		}
		setFormValues(_formValues);
	};


	const setProcessNumberPrefix = (e) => {
		const { name, value } = e.target ? e.target : { name: null, value: null }
		let prefix = ''
		const _code = processNoPrefix
		if (name === 'typeId') {
			const processTypeCode = props.data.types.filter(e => e.id == value)[0]['typeCode']
			if (formValues?.departmentId?.value) {
				// ALREADY DEPT OPTED
				if (processNoPrefix && processNoPrefix.length == 5) {
					// ALREADY TYPE ADDED -- REPLACE TYPE WITH CURRENT
					const currTypeCode = _code.substring(0, 2)
					prefix = _code.replace(currTypeCode, processTypeCode)
				}
				else prefix = processTypeCode + processNoPrefix

			}
			else prefix = processTypeCode
			setProcessNoPrefix(prefix)
		}
		else {
			// THIS WILL BE TRIGGERED FOR DEPT
			let processDeptCode = e['typeCode']
			if (formValues?.typeId?.value) {
				// TYPE CODE ALREADY OPTED
				if (processNoPrefix && processNoPrefix.length === 5) {
					const currDeptCode = _code.substring(2, 5)
					prefix = _code.replace(currDeptCode, processDeptCode)
				}
				else prefix = _code + processDeptCode
			}
			else prefix = processDeptCode
			setProcessNoPrefix(prefix)
		}
	}

	const header = () => {
		return (
			<div>
				{props.inject ? "EDIT PROCESS" : "ADD PROCESS"}
			</div>
		);
	}

	const submit = async () => {
		console.log(selectedInpProcess)
		setLoading(true)
		try{
			const _form = await validateForm(formValues)

		if (_form && _form.error) {
			console.log(_form);
			toaster.danger('Invalid form values, please check the form values and try again')
			setShowErrors(true)
		}
		else {
			if (!selectedInpProcess && !inProcessSel) {
				_form.form.inputProcess.value = null
			}
			props.onSubmit({ ..._form.form, processNoPrefix })
			setFormValues(null)
		}
		}
		catch(err){
              toaster.danger(err);
		}
	}

	const validateForm = (_form) => {
		console.log(_form);
		// VALIDATES THE DATA IN FORM
		let error = false
		return new Promise(resolve => {
			const _formKeys = Object.keys(_form)
			for (let index = 0; index < _formKeys.length; index++) {
				const _key = _formKeys[index];
				let pattern = _form[_key]['regex']
				// if(_key == 'processNumber') {
				// 	// CONCATENATION -- PROCESS NUMBER WITH TYPE AND DEPT
				// 	_form[_key]['value'] = processNoPrefix + _form[_key]['value']
				// }
				_form[_key]['error'] = !(pattern.test(_form[_key]['value']))
				if (_form[_key]['error']) error = true
				if (index === _formKeys.length - 1) resolve({ form:_form, error })
			}
		})
	}

	const setDuration = () => {

	}

	const verifyProcessNumber = async (e) => {
		const check = await get(`processes?filter={"where":{"processNumber":"${processNoPrefix + e}"}}`);
		console.log(check)
		if (check.statusCode >= 200 && check.statusCode < 300 && props.data.id) {
			if (check.data.length > 0 && props.data.id!=check?.data[0].id) {
				let formData = { ...formValues };
					// formData['processNumber']['value'] = (e) + uniqueNumber + 1;
				setUniqueNumber(uniqueNumber + 1);
				setProcessFound(processNoPrefix + e);
				setAddButtonDisabled(true)
}	

				

			else{ setProcessFound(false)
			setAddButtonDisabled(false)}
		}
		else{
			if (check.data.length > 0) {
				let formData = { ...formValues };
					// formData['processNumber']['value'] = (e) + uniqueNumber + 1;
				setUniqueNumber(uniqueNumber + 1);
				setProcessFound(processNoPrefix + e);
				setAddButtonDisabled(true)

				}
				else{ setProcessFound(false)
					setAddButtonDisabled(false)}
				}	
		}
			

	return (
		<Pane>


			<Dialog
				isShown={props.open}
				header={header}
				shouldCloseOnOverlayClick={false}
				width={'60%'}
				isConfirmDisabled={addbuttondisabled}
				onCloseComplete={() => { props.onClose() }}
				onConfirm={submit}
				confirmLabel={props.inject ? "Edit Process" : "Add Process"}
				hasHeader={false}>
				<br></br>
				<form>
					<div className="flex">
						<FormField className='w-full' isRequired label="Process Type">
							<SelectField
								name="typeId"
								label=""
								isInvalid={formValues?.typeId?.error}
								value={formValues?.typeId?.value || ""}
								validationMessage={formValues?.typeId?.error ? "Type is mandatory!" : null}
								onChange={e => { handleInputChange(e); setProcessNumberPrefix(e) }}>
								<option value="" disabled selected>Select Process Type</option>
								{props.data.types.map(_type => {
									return (
										<option key={_type.id} value={_type.id}>
											{_type.name} ({_type.typeCode})
										</option>
									)
								})}
							</SelectField>
						</FormField>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FormField className='w-full' isRequired label="Process
						 Department" validationMessage={formValues?.departmentId?.error ? "Process department is required!" : null}>
							<Autocomplete
								onChange={changedItem => {
									console.log(changedItem)
									setProcessNumberPrefix(changedItem); departmentChange(changedItem, 'department') }}
								items={props.data.departments}

								
								itemToString={(item) => { return item ? `${item.name} (${item.typeCode})` : '' }}
								selectedItem={selectedDept}
							>
								{({
									key,
									getInputProps,
									getToggleButtonProps,
									getRef,
									inputValue,
									openMenu,
									toggleMenu
								}) => (
									<Pane style={{ marginTop: 16 }} key={key} ref={getRef} display="flex">
										<TextInput
											flex="1"
											name="departmentId"
											isInvalid={formValues?.departmentId?.error}
											value={formValues?.departmentId?.value}
											onFocus={openMenu}
											onChange={(e) => handleInputChange(e)}
											{...getInputProps()}
											onBlur={(e)=>{
												if(!e.target.value && props.inject){
													let typeCode=processNoPrefix.substring(0,2)
													setProcessNoPrefix(`${typeCode}${initialProcessNumberPrefix}`)
												}
												
												
											}}
										/>
									</Pane>
								)}
							</Autocomplete>
						</FormField>
					</div>
					<br></br>
					<div className="flex">
						<FormField position="relative" className='w-full' isRequired label="Process No." validationMessage={formValues?.processNumber?.error ? "Process Number is required!" : null}>
							<span className='flex items-center relative'>
								<TextInputField
									label=""
									className='border-r-0 rounded-r-none'
									width={90}
									value={processNoPrefix}
									onChange={ev => console.log(ev.target.value)} />
								{/* <input value="HHTYU"/> */}
								<TextInputField
									width={'100%'}
									className='border-l-0 rounded-l-none'
									name="processNumber"
									label=""
									isInvalid={formValues?.processNumber?.error}
									value={formValues?.processNumber?.value}
									onChange={e => { handleInputChange(e); verifyProcessNumber(e.target.value) }}
								/>
								{processFound ? <Text className="absolute" color="danger" bottom={0}>{processFound} exists!</Text> : null}
							</span>
						</FormField>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FormField className='w-full' isRequired label="Process Title">
							<TextInputField
								name="title"
								label=""
								isInvalid={formValues?.title?.error}
								value={formValues?.title?.value}
								validationMessage={formValues?.title?.error ? "Process title is required!" : null}
								onChange={e => handleInputChange(e)}
							/>
						</FormField>
					</div>
					<br></br>
					<div className="flex">
						<FormField className='w-full' label="Input Process" validationMessage={formValues?.inputProcess?.error ? "Format is invalid!" : null}>
							<Autocomplete
								onChange={changedItem => handleInputChange({ target: { name: "inputProcess", value: changedItem.id } })}
								items={props.data.process}
								itemToString={(item) => { return item ? item.processNumber : '' }}
								selectedItem={selectedInpProcess}
							>
								{({
									key,
									getInputProps,
									getToggleButtonProps,
									getRef,
									inputValue,
									openMenu,
									toggleMenu
								}) => (
									<Pane style={{ marginTop: 16 }} key={key} ref={getRef} display="flex">
										<TextInput
											flex="1"
											name="inputProcess"
											// isInvalid={formValues?.inputProcess?.error}
											value={formValues?.inputProcess?.value}
											onFocus={openMenu}
											onChange={(e) => handleInputChange(e)}
											{...getInputProps()}
										/>
									</Pane>
								)}
							</Autocomplete>
						</FormField>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FormField className='w-full' isRequired label="Process Owner" validationMessage={formValues?.processOwnerId?.error ? "Process owner is required!" : null}>
							<Autocomplete
								onChange={changedItem => { departmentChange(changedItem, 'owner') }}
								items={props.data.members}
								itemToString={(item) => { return item ? item.name : '' }}
								selectedItem={selectedProcessOwner}
							>
								{({
									key,
									getInputProps,
									getToggleButtonProps,
									getRef,
									inputValue,
									openMenu,
									toggleMenu
								}) => (
									<Pane style={{ marginTop: 16 }} key={key} ref={getRef} display="flex">
										<TextInput
											flex="1"
											name="processOwner"
											isInvalid={formValues?.processOwnerId?.error}
											value={formValues?.processOwner?.value}
											onFocus={openMenu}
											onChange={(e) => handleInputChange(e)}
											{...getInputProps()}
										/>
									</Pane>
								)}
							</Autocomplete>
						</FormField>
					</div>
					<br></br>
					<div className='flex justify-between'>
						<FormField className='w-full' isRequired label="Frequency">
							<SelectField
								name="frequency"
								label=""
								isInvalid={formValues?.frequency?.error}
								validationMessage={formValues?.frequency?.error ? "Frequency is mandatory!" : null}
								onChange={e => handleInputChange(e)}
								value={formValues?.frequency?.value}
								>
								
								<option selected  value="" disabled >Select Frequency</option>
								<option value="Daily">Daily</option>
								<option value="Weekly">Weekly</option>
								<option value="Monthly">Monthly</option>
								<option value="Yearly">Yearly</option>
							</SelectField>
						</FormField>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FormField className='w-full' isRequired label="Duration" validationMessage={formValues?.hours?.error || formValues?.minutes?.error ? "Duration is required!" : null}>
							<div className='flex justify-center items-center'>
								<TextInput
									style={{ marginTop: 8, width: '100%' }}
									name="hours"
									placeholder='Hrs'
									type="number"
									max={72}
									min={0}
									isInvalid={formValues?.hours?.error}
									value={formValues?.hours?.value}
									onChange={(e) => handleInputChange(e)}
								/>
								<span>&nbsp;&nbsp;</span>
								<TextInput
									style={{ marginTop: 8, width: '100%' }}
									name="minutes"
									placeholder='Min'
									type="number"
									max={60}
									min={0}
									isInvalid={formValues?.minutes?.error}
									value={formValues?.minutes?.value}
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
						</FormField>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FormField className='w-full' isRequired label="Status">
							<SelectField
								name="status"
								label=""
								isInvalid={formValues?.status?.error}
								value={formValues?.status?.value}
								validationMessage={formValues?.status?.error ? "Status is mandatory!" : null}
								onChange={e => handleInputChange(e)}>
								<option value="" selected>Select Status</option>
								<option value="Partially Implemented">Partially Implemented</option>
								<option value="Implemented">Implemented</option>
								<option value="Not Implemented">Not Implemented</option>
							</SelectField>
						</FormField>
					</div>
				</form>
			</Dialog>
		</Pane>
	)
}

AddProcess.propTypes = {};

AddProcess.defaultProps = {};

export default AddProcess;


const _options = ['Hello', 'World', 'This', 'Time']