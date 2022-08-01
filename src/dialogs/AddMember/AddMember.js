import React, { useEffect, useState, useRef } from 'react';
import { Dialog, Pane, Button, SelectField, Autocomplete, TextInput, FormField, TextInputField, SmallPlusIcon, UserIcon, SmallCrossIcon } from "evergreen-ui";
import { baseUrl, get, REGEX } from '../../services/https.service';
import { DateFormat } from '../../services/dateFormat';



const AddMember = (props) => {

    const [image, setImage] = useState();
    const [employee, setEmployee] = useState({});
    const [imgPresent, setImgPresent] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [formValues, setFormValues] = useState()
    const [saveImage, setSaveImage] = useState();

    const [departments, setDepartments] = useState([]);
    const [type, setTypes] = useState([]);

    let imageHandler = useRef(null);


    useEffect(() => {
        fetchTypes()
        fetchDepartments()
        if (props.inject)
            setForm(props.inject)
    }, [])

    const fetchTypes = async () => {
        const response = await get('types')
        if (response) {
            if (response.statusCode == 200) {
                setTypes(response.data)
            }
        }
    }

    const fetchDepartments = async () => {
        const response = await get('departments')
        if (response) {
            if (response.statusCode == 200) {
                setDepartments(response.data)
            }
        }
    }


    const setForm = (data) => {
        console.log(data)
        setEmployee({ ...data, doe: DateFormat(data.doe, 'picker'), doj: DateFormat(data.doj, 'picker') })
        if (data.profile) {
            setImgPresent(true)
            const url = `${baseUrl}photos/${data?.memberType?.toLowerCase()}/download/${data?.profile}`
            setImage(url)
        }
    }

    const header = (title) => {
        return (
            <div>
                {title}
            </div>
        );
    }

    const handleImage = (e) => {
        setSaveImage(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
        setImgPresent(true)
    }

    const submit = async () => {
        setLoading(true)
        props.onSubmit({ ...employee, ...{ upload: saveImage } })
        // const _form = await validateForm(formValues)
        // props.onSubmit(_form)
    }

    const removeImage = () => {
        setSaveImage(null)
        setImage('')
        setImgPresent(false)
    }

    const addImage = () => {
        return (
            <div className='relative p-4' onClick={() => imageHandler.current.click()}>
                <button type="button" className={`h-10 w-10 flex justify-center items-center rounded-full bg-white absolute shadow-md right-3 add-btn ${imgPresent ? 'top-3 text-rose-500' : 'bottom-3 primary'}`}>
                    <SmallPlusIcon size={24} />
                </button>
                <UserIcon size={90} />
            </div>
        )
    }


    const showImage = () => {
        return (
            <div className='relative p-4'>
                <button type="button" className={`h-10 w-10 flex justify-center items-center rounded-full bg-white absolute shadow-md right-3 add-btn ${imgPresent ? 'top-3 text-rose-500' : 'bottom-3 primary'}`} onClick={removeImage}>
                    <SmallCrossIcon size={24} />
                </button>
                <img src={image} className="pol" onClick={(e) => e.stopPropagation()} />
            </div>
        )
    }

    const UploadSegment = () => {
        return (
            <div className='w-full flex justify-center items-center cursor-pointer'>
                {imgPresent ? showImage() : addImage()}
                <TextInputField label="" className='hidden' accept='image/*' ref={imageHandler} type="file" onChange={(e) => handleImage(e)} />
            </div>
        )
    }

    const validateForm = (_form) => {
        // VALIDATES THE DATA IN FORM
        return new Promise(resolve => {
            const _formKeys = Object.keys(_form)
            for (let index = 0; index < _formKeys.length; index++) {
                const _key = _formKeys[index];
                let pattern = _form[_key]['regex']
                _form[_key]['error'] = !(pattern.test(_form[_key]['value']))
                console.log('Key -->', _key, ' | Value -->', _form[_key]['value'], ' | Test --> ', pattern.test(_form[_key]['value']))
                if (index === _formKeys.length - 1) resolve(_form)
            }
        })
    }

    return (
        <Pane>
            <Dialog
                isShown={props.open}
                header={header(props.title)}
                shouldCloseOnOverlayClick={false}
                width={'60%'}
                onCloseComplete={() => props.onClose()}
                onConfirm={submit}
                confirmLabel={props.title}
                hasHeader={false}>
                <form>
                    <UploadSegment />
                    <TextInputField
                        required
                        label="Name"
                        name="name"
                        value={employee.name}
                        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                    />
                    <div className='flex justify-center items-center'>
                        <TextInputField
                            size={100}
                            required
                            label="Email"
                            name="email"
                            value={employee.email}
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                        />
                        {props.type === 'vendor' ? <TextInputField
                            size={100}
                            required
                            marginLeft={20}
                            label="Contact Person Name"
                            value={employee.designation}
                            name="designation"
                            onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}
                        /> : null}
                    </div>
                    {props.type === 'vendor' ? null :
                        <div className='flex justify-center items-center'>
                            <FormField className='w-full' isRequired label="Department">
                                <SelectField
                                    name="departmentId"
                                    label=""
                                    value={employee.departmentId}
                                    onChange={e => setEmployee({ ...employee, departmentId: e.target.value })}>
                                    <option value="">Select a department</option>
                                    {departments.map(dept => {
                                        return (
                                            <option value={dept.id}>{dept.name}</option>
                                        )
                                    })}
                                </SelectField>
                            </FormField>
                            <FormField className='w-full' isRequired label="Type">
                                <SelectField
                                    name="typeId"
                                    label=""
                                    value={employee.typeId}
                                    onChange={e => setEmployee({ ...employee, typeId: e.target.value })}>
                                    <option value="">Select a type</option>
                                    {type.map(typ => {
                                        return (
                                            <option value={typ.id}>{typ.name}</option>
                                        )
                                    })}
                                </SelectField>
                            </FormField>
                        </div>
                    }
                    {props.type === 'vendor' ? null :
                        <div className='flex justify-center items-center'>
                            <TextInputField
                                size={100}
                                required
                                label="Designation"
                                value={employee.designation}
                                name="designation"
                                onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}
                            />
                            <div style={{ margin: "0 10px" }}></div>
                            <TextInputField
                                size={100}
                                required
                                label="Employee Code"
                                value={employee.employeeCode}
                                name="employeeCode"
                                onChange={(e) => setEmployee({ ...employee, employeeCode: e.target.value })}
                            />
                        </div>
                    }
                    {props.type === 'vendor' ? null :
                        <div className='w-full flex justify-center items-center'>
                            <div className='w-full'>
                                <TextInputField
                                    size={100}
                                    type="date"
                                    required
                                    label="Date of Joining"
                                    value={employee.doj}
                                    name="doj"
                                    onChange={(e) => setEmployee({ ...employee, doj: e.target.value })}
                                />
                            </div>
                            <div style={{ margin: "0 10px" }}></div>
                            <div className='w-full'>
                                <TextInputField
                                    size={100}
                                    type="date"
                                    required
                                    label="Date of Exit"
                                    value={employee.doe}
                                    name="doe"
                                    onChange={(e) => setEmployee({ ...employee, doe: e.target.value })}
                                />
                            </div>
                        </div>
                    }
                    <div className='flex justify-center items-center'>
                        <TextInputField
                            size={100}
                            required
                            label="Contact Number"
                            value={employee.contactNo}
                            name="contactNo"
                            onChange={(e) => setEmployee({ ...employee, contactNo: e.target.value })}
                        />
                        <div style={{ margin: "0 10px" }}></div>
                        <TextInputField
                            size={100}
                            required
                            label={props.type == "vendor" ? "Address" : "Bank Details"}
                            name={props.type == "vendor" ? "address" : 'bankDetails'}
                            value={props.type == "vendor" ? employee.address : employee.bankDetails}
                            onChange={(e) => setEmployee({ ...employee, address: props.type == "vendor" ? e.target.value : undefined, bankDetails: props.type == "vendor" ? undefined : e.target.value })}
                        />
                    </div>
                </form>
            </Dialog>
        </Pane>
    )
}


export default AddMember


const _formDefault = {
    "name": {
        value: '',
        error: false,
        regex: REGEX.TITLE
    },
    "email": {
        value: '',
        error: false,
        regex: REGEX.EMAIL
    },
    "password": {
        value: '',
        error: false,
        regex: REGEX.ALL
    },
    "designation": {
        value: '',
        error: false,
        regex: REGEX.ALL
    },
    "employeeCode": {
        value: '',
        error: false,
        regex: REGEX.ALL
    },
    "doj": {
        value: '',
        error: false,
        regex: REGEX.ALL
    },
    "doe": {
        value: '',
        error: false,
        regex: REGEX.ALL
    },
    "contactNo": {
        value: '',
        error: false,
        regex: REGEX.ALL
    },
    "bankDetails": {
        value: '',
        error: false,
        regex: REGEX.ALL
    }
}
