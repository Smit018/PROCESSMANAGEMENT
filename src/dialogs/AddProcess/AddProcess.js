import React, { useState } from 'react';
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


import { Dialog, Pane, Button, SelectField, Autocomplete, TextInput, FormField, TextInputField } from "evergreen-ui";




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
		regex: REGEX.ALL
	},
	"frequency": {
		value: '',
		error: false,
		regex: REGEX.ALL
	},
	"duration": {
		value: '',
		error: false,
		regex: REGEX.ALL
	},
	"inputSourceSelf": {
		value: '',
		error: false,
		regex: REGEX.ALL
	},
	"reportingHead": {
		value: '',
		error: false,
		regex: REGEX.ALL
	},
	"status": {
		value: '',
		error: false,
		regex: REGEX.ALL
	},
}

const AddProcess = (props) => {
	const [formValues, setFormValues] = useState(_formDefault)
	const [submitted, setSubmitted] = useState(false)
	const [loading, setLoading] = React.useState(false);

	const [age, setAge] = useState(20);

	const handleInputChange = (e) => {
		// HANDLE INPUT CHANGE
		const { name, value } = e.target;
		const _formValues = { ...formValues }
		_formValues[name]['value'] = value
		setFormValues(_formValues);
		console.log(_formValues);
	};

	const handleChange = (e) => {
		console.log(e.target.value)
	}

	const header = () => {
		return (
			<div>
				ADD PROCESS
			</div>
		);
	}

	return (
		<Pane>
			<Dialog
				isShown={props.open}
				header={header}
				shouldCloseOnOverlayClick={false}
				width={'60%'}
				onCloseComplete={() => props.onClose()}
				hasHeader={false}>
				<br></br>
				<form>
					<div className="flex">
						<FormField className='w-full' isRequired label="Process Type">
							<SelectField
								name="typeId"
								label=""
								isInvalid={formValues.typeId.error}
								value={formValues.typeId.value}
								validationMessage={formValues.typeId.error ? "Type is mandatory!" : null}
								onChange={e => handleInputChange(e)}>
								<option value="foo">
									Foo
								</option>
								<option value="bar">Bar</option>
							</SelectField>
						</FormField>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FormField className='w-full' isRequired label="Process Department">
							<Autocomplete
								onChange={changedItem => console.log(changedItem)}
								items={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']}
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
											validationMessage={formValues.departmentId.error ? "Process department is required!" : null}
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
						<FormField className='w-full' isRequired label="Process No.">
							<TextInputField
								name="processNumber"
								label=""
								isInvalid={formValues.processNumber.error}
								value={formValues.processNumber.value}
								validationMessage={formValues.processNumber.error ? "Process Type is required!" : null}
								onChange={e => handleInputChange(e)}
							/>
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
						<FormField className='w-full' isRequired label="Input Process">
							<Autocomplete
								onChange={changedItem => console.log(changedItem)}
								items={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']}
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
											isInvalid={formValues.inputProcess.error}
											value={formValues.inputProcess.value}
											validationMessage={formValues.inputProcess.error ? "Format is invalid!" : null}
											onFocus={openMenu}
											onChange={(e) => handleInputChange(e)}
											{...getInputProps()}
										/>
									</Pane>
								)}
							</Autocomplete>
						</FormField>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FormField className='w-full' isRequired label="Process Owner">
							<Autocomplete
								onChange={changedItem => console.log(changedItem)}
								items={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']}
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
											validationMessage={formValues.processOwner.error ? "Process owner is required!" : null}
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
								<option value="foo">
									Foo
								</option>
								<option value="bar">Bar</option>
							</SelectField>
						</FormField>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<FormField className='w-full' isRequired label="Duration">
							<TextInput
								style={{ marginTop: 8, width: '100%' }}
								name="duration"
								type="time"
								isInvalid={formValues.duration.error}
								value={formValues.duration.value}
								validationMessage={formValues.duration.error ? "Duration is required!" : null}
								onChange={(e) => handleInputChange(e)}
							/>
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
								<option value="foo">
									Foo
								</option>
								<option value="bar">Bar</option>
							</SelectField>
						</FormField>
					</div>
				</form>
			</Dialog>
		</Pane>
		// <div>
		//   <Dialog fullWidth open={props.open} onClose={handleClose}>
		//     <DialogTitle>Add Process</DialogTitle>
		//     <Divider />
		//     <DialogContent>
		//       <form>
		//         <div className='flex justify-between'>
		//           <FormControl fullWidth>
		//             <p className='m-label'>Type</p>
		//             <Select
		//               value={age}
		//               onChange={handleChange}
		//             >
		//               <MenuItem value={10}>Ten</MenuItem>
		//               <MenuItem value={20}>Twenty</MenuItem>
		//               <MenuItem value={30}>Thirty</MenuItem>
		//             </Select>
		//           </FormControl>
		//           <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
		//           <FormControl fullWidth>
		//             <p className='m-label'>Department</p>
		//             <Autocomplete
		//               disablePortal
		//               id="department"
		//               options={_options}
		//               renderInput={(params) => <TextField {...params} />} />
		//           </FormControl>
		//         </div>
		//         <br></br>
		//         <div className='flex justify-between'>
		//           <FormControl fullWidth>
		//             <p className='m-label'>Process No</p>
		//             <TextField
		//               required
		//               error={formValues.processNumber.error}
		//               id="processNumber"
		//               name="processNumber"
		//               type="text"
		//               value={formValues.processNumber.value}
		//               onChange={handleInputChange}
		//               helperText={formValues.processNumber.error ? "Process number is invalid!" : ""}
		//               InputProps={{
		//                 startAdornment: (
		//                   <div style={{ padding: 16, background: '#f5f5f5', marginLeft: -14 }}>
		//                     A
		//                   </div>
		//                 ),
		//               }}
		//               variant="outlined"
		//             />
		//           </FormControl>
		//           <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
		//           <FormControl fullWidth>
		//             <p className='m-label'>Process Title</p>
		//             <TextField
		//               required
		//               error={formValues.title.error}
		//               id="title"
		//               name="title"
		//               type="text"
		//               value={formValues.title.value}
		//               onChange={handleInputChange}
		//               helperText={formValues.title.error ? "Process title is invalid!" : ""}
		//             />
		//           </FormControl>
		//         </div>
		//         <br></br>
		//         <div className='flex justify-between'>
		//           <FormControl fullWidth>
		//             <p className='m-label'>Input Process</p>
		//             <Autocomplete
		//               disablePortal
		//               id="inputProcess"
		//               options={_options}
		//               renderInput={(params) => <TextField {...params} />} />
		//           </FormControl>
		//           <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
		//           <FormControl fullWidth>
		//             <p className='m-label'>Process Owner</p>
		//             <Autocomplete
		//               disablePortal
		//               id="processOwner"
		//               options={_options}
		//               renderInput={(params) => <TextField {...params} />} />
		//           </FormControl>
		//         </div>
		//       </form>
		//     </DialogContent>
		//     <DialogActions>
		//       <Button variant="outlined" onClick={handleClose}>Cancel</Button>
		//       <Button variant="contained" onClick={handleClose}>Add Process</Button>
		//     </DialogActions>
		//   </Dialog>
		// </div>
	)
}

AddProcess.propTypes = {};

AddProcess.defaultProps = {};

export default AddProcess;


const _options = ['Hello', 'World', 'This', 'Time']