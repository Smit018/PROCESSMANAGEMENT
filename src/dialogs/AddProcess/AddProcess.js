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

import { Dialog, Pane, Button, SelectField, Autocomplete, TextInput, FormField, TextInputField, Text } from "evergreen-ui";

const _formDefault = {
	"title": {
		value: '',
		error: false,
		regex: REGEX.TITLE
	},
	"processNumber": {
		value: '',
		error: false,
		regex: REGEX.TITLE
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
	"processOwner": {
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
		value: '',
		error: false,
		regex: REGEX.ALL
	},
	"status": {
		value: '',
		error: false,
		regex: REGEX.ALL
	}
}

const AddProcess = (props) => {
	const [formValues, setFormValues] = useState(_formDefault)
	const [submitted, setSubmitted] = useState(false)
	const [hours, setHours] = useState('')
	const [minutes, setMinutes] = useState('')
	const [loading, setLoading] = React.useState(false);
	const [pTypeCode, setpTypeCode] = useState('');
	const [dTypeCode, setdTypeCode] = useState('');
	const [uniqueNumber, setUniqueNumber] = useState(1);
	const [processNoPrefix, setProcessNoPrefix] = useState('');


	useEffect(() => {
	}, []);

	const departmentChange = (item, type) => {
		let formData = { ...formValues };
		if (type == 'department') {
			setdTypeCode(item.typeCode);

			formData['departmentId']['value'] = item.id;
			// formData['processNumber']['value'] = pTypeCode + item.typeCode + props.uniqueNumber;
			// verifyProcessNumber(pTypeCode + item.typeCode + uniqueNumber);
		}
		else {
			formData['processOwner']['value'] = item.id;
		}
		setFormValues(formData);
	}

	const handleInputChange = (e) => {
		// HANDLE INPUT CHANGE
		const { name, value } = e.target;
		const _formValues = { ...formValues }
		_formValues[name]['value'] = value;
		// if (name == "typeId") {
		// 	let processTypeCode = props.data.types.filter(e => e.id == value)[0]['typeCode']
		// 	setpTypeCode(processTypeCode);
		// 	_formValues['processNumber']['value'] = processTypeCode + dTypeCode + uniqueNumber;
		// 	verifyProcessNumber(processTypeCode + dTypeCode + uniqueNumber);
		// }
		setFormValues(_formValues);
	};


	const setProcessNumberPrefix = (e) => {
		const { name, value } = e.target ? e.target : { name: null, value: null }
		let prefix = ''
		const _code = processNoPrefix
		if (name === 'typeId') {
			const processTypeCode = props.data.types.filter(e => e.id == value)[0]['typeCode']
			if(formValues.departmentId.value) {
				// ALREADY DEPT OPTED
				if(processNoPrefix && processNoPrefix.length == 5) {
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
			if(formValues.typeId.value) {
				// TYPE CODE ALREADY OPTED
				if(processNoPrefix && processNoPrefix.length === 5) {
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
				ADD PROCESS
			</div>
		);
	}

	const submit = async () => {
		setLoading(true)
		const _form = await validateForm(formValues)
		props.onSubmit({ ..._form, processNoPrefix })
	}

	const setDuration = () => {

	}

	const verifyProcessNumber = async (e) => {
		const check = await get(`processes?filter={"where":{"processNumber":"${e}"}}`);
		if (check.statusCode >= 200 && check.statusCode < 300) {
			if (check.data.length > 0) {
				let formData = { ...formValues };
				formData['processNumber']['value'] = pTypeCode + dTypeCode + uniqueNumber + 1;
				setUniqueNumber(uniqueNumber + 1);
			}
		}
	}

	const validateForm = (_form) => {
		// VALIDATES THE DATA IN FORM
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
				if (index === _formKeys.length - 1) resolve(_form)
			}
		})
	}

	return (
		<Pane>
			<Dialog
				isShown={props.open}
				header={header}
				shouldCloseOnOverlayClick={false}
				width={'60%'}
				onCloseComplete={() => props.onClose()}
				onConfirm={submit}
				confirmLabel="Add Process"
				hasHeader={false}>
				<br></br>
				<form>
					<div className="flex">
						<FormField className='w-full' isRequired label="Process Type">
							<SelectField
								name="typeId"
								label=""
								isInvalid={formValues.typeId.error}
								value={formValues.typeId.value || ""}
								validationMessage={formValues.typeId.error ? "Type is mandatory!" : null}
								onChange={e => { handleInputChange(e); setProcessNumberPrefix(e) }}>
								<option disabled>Select Process Type</option>
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
						<FormField className='w-full' isRequired label="Process Department" validationMessage={formValues.departmentId.error ? "Process department is required!" : null}>
							<Autocomplete
								onChange={changedItem => { setProcessNumberPrefix(changedItem); departmentChange(changedItem, 'department') }}
								items={props.data.departments}
								itemToString={(item) => { return item ? `${item.name} (${item.typeCode})` : '' }}
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
											isInvalid={formValues.departmentId.error}
											value={formValues.departmentId.value}
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
					<div className="flex">
						<FormField position="relative" className='w-full' isRequired label="Process No." validationMessage={formValues.processNumber.error ? "Process Number is required!" : null}>
							<span className='flex items-center'>
								<TextInputField className='border-r-0 rounded-r-none' isInvalid={processNoPrefix || formValues.processNumber.error} width={90} value={processNoPrefix} />
								{/* <input value="HHTYU"/> */}
								<TextInputField
									width={'100%'}
									className='border-l-0 rounded-l-none'
									name="processNumber"
									label=""
									isInvalid={formValues.processNumber.error}
									value={formValues.processNumber.value}
									onChange={e => { handleInputChange(e); verifyProcessNumber(e.target.value) }}
								/>
							</span>
						</FormField>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FormField className='w-full' isRequired label="Process Title">
							<TextInputField
								name="title"
								label=""
								isInvalid={formValues.title.error}
								value={formValues.title.value}
								validationMessage={formValues.title.error ? "Process title is required!" : null}
								onChange={e => handleInputChange(e)}
							/>
						</FormField>
					</div>
					<br></br>
					<div className="flex">
						<FormField className='w-full' label="Input Process" validationMessage={formValues.inputProcess.error ? "Format is invalid!" : null}>
							<Autocomplete
								onChange={changedItem => console.log(changedItem)}
								items={props.data.process}
								itemToString={(item) => { return item ? item.processNumber : '' }}
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
											// isInvalid={formValues.inputProcess.error}
											value={formValues.inputProcess.value}
											onFocus={openMenu}
											onChange={(e) => handleInputChange(e)}
											{...getInputProps()}
										/>
									</Pane>
								)}
							</Autocomplete>
						</FormField>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FormField className='w-full' isRequired label="Process Owner" validationMessage={formValues.processOwner.error ? "Process owner is required!" : null}>
							<Autocomplete
								onChange={changedItem => { departmentChange(changedItem, 'owner') }}
								items={props.data.members}
								itemToString={(item) => { return item ? item.name : '' }}
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
											isInvalid={formValues.processOwner.error}
											value={formValues.processOwner.value}
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
								isInvalid={formValues.frequency.error}
								value={formValues.frequency.value}
								validationMessage={formValues.frequency.error ? "Frequency is mandatory!" : null}
								onChange={e => handleInputChange(e)}>
								<option disabled>Select Frequency</option>
								<option value="Daily">Daily</option>
								<option value="Weekly">Weekly</option>
								<option value="Monthly">Monthly</option>
								<option value="Yearly">Yearly</option>
							</SelectField>
						</FormField>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FormField className='w-full' isRequired label="Duration" validationMessage={formValues.hours.error || formValues.minutes.error ? "Duration is required!" : null}>
							<div className='flex justify-center items-center'>
								<TextInput
									style={{ marginTop: 8, width: '100%' }}
									name="hours"
									placeholder='Hrs'
									type="number"
									max={72}
									min={0}
									isInvalid={formValues.hours.error}
									value={formValues.hours.value}
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
									isInvalid={formValues.minutes.error}
									value={formValues.minutes.value}
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
						</FormField>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FormField className='w-full' isRequired label="Status">
							<SelectField
								name="status"
								label=""
								isInvalid={formValues.status.error}
								value={formValues.status.value}
								validationMessage={formValues.status.error ? "Status is mandatory!" : null}
								onChange={e => handleInputChange(e)}>
								<option disabled>Select Status</option>
								<option value="Not Implemented">Not Implemented</option>
								<option value="Partially Implemented">Partially Implemented</option>
								<option value="Implemented">Implemented</option>
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