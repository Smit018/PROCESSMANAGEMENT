import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { post, get, patch,deleted } from '../../services/https.service';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Table, Dialog, TextInputField, Checkbox, SearchIcon, CrossIcon, ChevronRightIcon, ChevronUpIcon, toaster, Heading } from "evergreen-ui";
import { Autocomplete, TextInput } from 'evergreen-ui'
import { Pane, Text } from 'evergreen-ui'
import TWOPEOPLE from "../../assets/images/twoPeople.png"
import USERIMG from "../../assets/images/userImgs.png";
import { baseUrl } from '../../services/https.service';
import { WhatsApp } from '@mui/icons-material';
import PromptDialog from '../../dialogs/PromptDialog/PromptDialog'
import AddMember from '../../dialogs/AddMember/AddMember';


import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import TopBar from '../../components/TopBar/TopBar';
import { ProcessList } from '../../components/AvatarList/AvatarList';
import { data } from 'autoprefixer';

export default function EmployeeDetails() {
    const navigate = useNavigate()
    const params = useParams()
    const [employeeDetail, setEmployeeDetail] = useState({});
    const [allProcess, setAllProcess] = useState([]);
    const [whatsapp, setWhatsapp] = useState([]);
    const [document, setDocument] = useState([])
    const pathArray = window.location.pathname.split('/');
    // const [employeeDetails,setEmployeeDetails] = useState({});
    const [process, setProcess] = useState(0);
    const [whatsapps, setWhatsapps] = useState(0);
    const [documents, setDocuments] = useState(0);
    const [processQuery, setProcessQuery] = useState([]);
    const [whatsappQuery, setWhatsappQuery] = useState([]);
    const [documentQuery, setDocumentQuery] = useState([]);
    const id = pathArray[3]


    const [_showDelete, showDelete] = useState(false);
    const [_showUpdate, showUpdate] = useState(false);

    useEffect(() => {
        employeeDet();
        getAllProcesses();
        getAllWhatsapp_Documents()

    }, [0]);



    async function getAllProcesses(text = "") {

        const getProcessInfo = await get(`processMembers?filter={"where":{"memberId":"${id}"},"include":{"relation":"process","scope":{"include":{"relation":"process","scope":{"include":{"relation":"processOwner"}}}}}}`);
        //  const getProcessInfo=[]

        const getProcessfromProcessOwner=await get(`processes?filter={"where":{"processOwner":"${id}"}}`);
        console.log(getProcessfromProcessOwner.data);
        if (getProcessInfo.statusCode >= 200 && getProcessInfo.statusCode < 300) {
            let stepmemberArr = getProcessInfo.data;
            console.log(stepmemberArr)
            stepmemberArr = stepmemberArr.map(e => { return { ...e, processNumber: e.process.processNumber, stepDescription:'',processTitle:e.process.title}});
            let arr = [];
            getProcessfromProcessOwner.data.forEach((p)=>{
                arr.push({ "processNumber": p.processNumber, process:[], processTitle: p.title,processId:p.id,processOwner:'Owned process' })
            })
            const groupedMap = stepmemberArr.reduce(
                (entryMap, e) => entryMap.set(e.processNumber, [...entryMap.get(e.processNumber) || [], e]),
                new Map()
            );
            console.log('line 72 ghrerer ',groupedMap);

            for (let [key, value] of groupedMap) {
                if (key.toLowerCase().includes(text.toLowerCase()) && !value[0]?.process?.deleted) {
                    let stepProcess = value.map(e => e.stepDescription);
                    arr.push({ "processNumber": key, process: stepProcess, processTitle: value[0].processTitle,processId:value[0].processId,processOwner:'' })
                }
            }
            console.log('hello tehrejd jlksdadfjl lkd df')
            
            // setEmployeeDetails({...employeeDetails,process:arr.length});
            setProcess(arr.length)
            setAllProcess(arr);
            setProcessQuery(arr)
        } else {
            toaster.danger(getProcessInfo.message)
        }

    }

    function onQuery(type, text) {
        if (type == "process") {
            if (text == "") {
                setProcessQuery(allProcess)
            }
            else {
                console.log(allProcess)
                let proc = allProcess.filter(e => {
                    if (e.processNumber.toLowerCase().includes(text.toLowerCase())) {
                        return { ...e }
                    }
                })

                setProcessQuery(proc)
            }
        }
        else if (type == "whatsapp") {
            if (text == "") {
                setWhatsappQuery(whatsapp)
            }
            else {
                let proc = whatsapp.filter(e => {
                    if (e.name.toLowerCase().includes(text.toLowerCase())) {
                        return e
                    }
                })
                setWhatsappQuery(proc)
            }
        } else {
            if (text == "") {
                setWhatsappQuery(document)
            }
            else {
                let proc = document.filter(e => {
                    if (e.name.toLowerCase().includes(text.toLowerCase())) {
                        return e
                    }
                })
                setWhatsappQuery(proc)
            }
        }
    }

    const getAllWhatsapp_Documents = async (what = "", doc = "") => {

        const getWhatsapp = await get(`whatsappMembers?filter={"include":{"relation":"whatsappGroup"},"where":{"memberId":"${id}"}}`)
        // getWhatsapp = await get(`member/${id}/whatsappMembers?filter={"where":}`)
        if (getWhatsapp.statusCode >= 200 && getWhatsapp.statusCode < 300) {
            getWhatsapp.data = getWhatsapp.data.filter(e => !e.whatsappGroup.deleted)
            let arr = getWhatsapp.data.map(e => { return { name: e.whatsappGroup.name, role: e.admin ? 'Admin' : 'Member', id: e.whatsappGroup.id } })
            setWhatsapp(arr);
            setWhatsapps(arr.length);
            setWhatsappQuery(arr)
        } else {
            toaster.danger('Failed to fetch Whatsapp details!')
        }

        const getDocument = await get(`documentMembers?filter={"where":{"memberId":"${id}"},"include":"document"}`)
        if (getDocument.statusCode >= 200 && getDocument.statusCode < 300) {
            getDocument.data = getDocument.data.filter(e => !e.document.deleted)
            let arr = getDocument.data.map(e => { return { name: e.document.name, role: e.admin ? 'Admin' : 'Member', id: e.document.id } })
            setDocument(arr);
            setDocuments(arr.length)
            setDocumentQuery(arr)
        } else {
            toaster.danger('Failed to fetch Document details!')
        }

    }

    const employeeDet = async () => {
        const getDetail = await get(`members/${id}`);
        if (getDetail.statusCode >= 200 && getDetail.statusCode < 300) {
            console.log(getDetail.data)
            setEmployeeDetail(getDetail.data)
        } else {
            toaster.danger('Failed to fetch Employee Details')
        }
    }

    const ImageUrl = (container, file) => {
        return `${baseUrl}photos/${container}/download/${file}`
    }

    const showMemberImage = (img) => {
        const source = ImageUrl('employee', img)
        // alert(source)
        return (
            <img className='circleC1' src={source} onError={(e) => imageErrHandling(e)} />
        )
    }

    const imageErrHandling = (e) => {
        e.target.src = USERIMG
    }

    const showAccordian = (index, item) => {
        console.log(index, item);
        let getProcess = [...allProcess]
        getProcess.forEach((e) => {
            e.accordian = false
        })
        getProcess[index].accordian = true;
        setAllProcess(getProcess)
        console.log(allProcess)
    }

    const _uploadFile = async (file) => {
		// UPLOAD IMAGE
		return new Promise(async (resolve, reject) => {
			try {
				const body = JSON.stringify({"name":"employee"})
				const options = {
					method:'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body
				}
				const container = await fetch(`${baseUrl}photos/`, options)
				
			  const res=await container.json()
			   if(res.error.message.includes('EEXIST') && res.error.statusCode==500){
				if(container.statusCode==500 && container.message==''){}
				const formData = new FormData();
				// console.log(file)
				formData.append('file', file)
				// console.log(formData)
				const image = await post("photos/employee/upload", formData)
				// console.log(image)
				if (image.data) {
				resolve(image.data.result.files.file[0].name)
				}
				else {
				reject(image);
				}
			
			   }
				}
			catch (err) {
				console.log(err)
				reject(err)
			}
		})
	}




    const saveEmployee = async (form) => {
      try{
        if (form) {

            if (form['upload'])
				form['profile'] = await _uploadFile(form['upload'])

            if(form.contactNo.length!=10){
                console.log(form.contactNo)
                throw('contact number should have 10 digits')
            }
            const response = await patch('members/' + id, form)
            if (response.statusCode === 200 && form.contactNo.length==10) {
                showUpdate(false)
                employeeDet();
                toaster.success('Employee updated successfully!')
            }
            else {
                toaster.danger('Failed to update employee!', { description: response.message })
            }
        }
      }
      catch(err){
        toaster.danger(err)
      }
    }

    const deleteMe = async () => {
        const response = await deleted('members/' + id)
        if (response.statusCode === 200) {
            toaster.success('Deleted successfully!')
            navigate(-1)
            showDelete(false)
        }
        else toaster.danger('Failed to delete member!')
    }

    const paths = [
        { path: '/admin/employees', title: 'Employees' },
        { path: `/admin/employees/${params.id}`, title: employeeDetail?.name }
    ]

    return (
        <div>
            <TopBar
                title="Whatsapp Groups"
                breadscrubs={paths}
            />
            <Pane width="100%" className='l-blue px-4 py-5' elevation={2}>
                <div className='flex justify-end items-center pb-5'>
                    <Button marginRight={16} color="#ED342D" onClick={() => showDelete(true)}>Delete</Button>
                    <Button marginRight={16} appearance="primary" onClick={() => showUpdate(true)}>Edit</Button>
                </div>

                {/* <div className='pb-5'></div> */}
                <div className='flex lg:w-3/4  sm:w-full justify-between'>
                    <div className='flex'>
                        <div className='circleC1 flex items-center justify-center mr-5'>
                            {/* <img src={showMemberImage(employeeDetail?.profile)} className="img-201"/> */}
                            {showMemberImage(employeeDetail?.profile)}
                        </div>
                        <div className='flex flex-col justify-center '>
                            <div className='font-medium text-xl'>
                                {employeeDetail?.name}
                            </div>
                            <div className='text-xs text-pri-col'>
                                {employeeDetail?.employeeCode} , {employeeDetail?.designation}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center '>
                        <div className='font-medium'>
                            {process || 0}
                        </div>
                        <div className='text-xs text-pri-col'>
                            Processes
                        </div>
                    </div>
                    <div className='flex flex-col justify-center '>
                        <div className='font-medium'>
                            {whatsapps || 0}
                        </div>
                        <div className='text-xs text-pri-col'>
                            Whatsapp Groups
                        </div>
                    </div>
                    <div className='flex flex-col justify-center '>
                        <div className='font-medium'>
                            {documents || 0}
                        </div>
                        <div className='text-xs text-pri-col'>
                            Documents
                        </div>
                    </div>
                </div>
            </Pane>
            <div className='py-10'>
                <div className='flex justify-between items-center mb-6'>
                    <div className='text-xl'>PROCESSES</div>
                    <div className='search-bar flex mr-4'>
                        <div>
                            <TextInput height={40} placeholder="Search..." onChange={e => { onQuery('process', e.target.value) }} className='l-blue' />
                        </div>
                        <div className='h-10 rounded flex items-center justify-center px-2 white right'>
                            <SearchIcon size={18} className='primary' />
                        </div>
                    </div>
                </div>
                {/* {allProcess.map((item,index)=>{
                    return(
                        <div className='pointer-Mouse' >
                        <Pane className='flex justify-between items-center px-10 py-2 bg-slate-100' onClick={()=>{showAccordian(index,item)}} style={{borderBottom:"1px solid #66788A"}}>
                            <div className='flex flex-col'>
                                <div className='text-xl pb-1'>{item?.name}</div>
                                <div className='text-pri-col text-sm pb-1'>{item?.description}</div>
                                <div className='text-pri-col text-sm'>{item?.role}</div>
                            </div>
                            <div className='text-lg text-pri-col'>
                                <ChevronRightIcon/>
                            </div>
                        </Pane>
                        {(item?.accordian)===true?<>
                            {item?.process.map((item1,index1)=>{
                                <div>
                                <div>Hello</div>
                                <Pane className='flex justify-between  px-10 py-4 bg-slate-100 bg-slate-300' >
                                    <div>
                                        <div className='text-lg pr-2'>{item1?.name}:</div>
                                        <div className=' text-lg'>{item1?.description}</div>
                                    </div>
                                    <div>
                                        <ChevronUpIcon/>
                                    </div>
                            </Pane>
                            </div>
                            })}
                        </>:null}
                        </div>
                    )
                })} */}
                <Accordion allowZeroExpanded>
                    {processQuery?.map((item, index) => (
                        <AccordionItem key={item.id} onClick={()=>{navigate(`../processes/${item.processId}`)}}>
                           
                            <AccordionItemHeading>
                                <AccordionItemButton className='flex justify-between items-center px-10 py-2 bg-white shadow'>
                                    <div className='flex flex-col'>
                                        <small className='text-pri-col text-sm text-blue-700 pb-1'>{item.processOwner}</small>
                                        <Heading size={500}>{item?.processNumber}</Heading>
                                        <div className='text-pri-col text-sm pb-1'>{item?.processTitle}</div>
                                    </div>
                                    
                                    <div className='text-lg text-pri-col'>
                                        <ChevronRightIcon />
                                    </div>
                                </AccordionItemButton>
                          
                            </AccordionItemHeading>
                        
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className='py-10'>

                <div className='flex justify-between items-center mb-6'>
                    <div className='text-xl font-medium'>WHATSAPP GROUPS</div>
                    <div className='search-bar flex mr-4'>
                        <div>
                            <TextInput height={40} placeholder="Search..." onChange={e => { onQuery('whatsapp', e.target.value) }} className='l-blue' />
                        </div>
                        <div className='h-10 rounded flex items-center justify-center px-2 white right'>
                            <SearchIcon size={18} className='primary' />
                        </div>
                    </div>
                </div>
                {whatsappQuery?.map((item, index) => {
                    return (
                        <Link to={`/admin/whatsapp-groups/${item.id}/${item.name}`}>
                            <ProcessList
                                title={item?.name}
                                description={item?.role}
                            />
                        </Link>
                    )
                })}
            </div>


            <div className='py-10'>

                <div className='flex justify-between items-center mb-6'>
                    <div className='text-xl font-medium'>DOCUMENTS</div>
                    <div className='search-bar flex mr-4'>
                        <div>
                            <TextInput height={40} placeholder="Search..."
                                onChange={e => { onQuery('document', e.target.value) }}
                                className='l-blue' />
                        </div>
                        <div className='h-10 rounded flex items-center justify-center px-2 white right'>
                            <SearchIcon size={18} className='primary' />
                        </div>
                    </div>
                </div>
                {documentQuery?.map((item, index) => {
                    return (
                        <Link to={`/admin/documents/${item.id}/${item.name}`}>
                            <ProcessList
                                title={item?.name}
                                description={item?.role}
                            />
                        </Link>
                    )
                })}
            </div>


            {_showDelete ?
                <PromptDialog
                    open={_showDelete}
                    title={`Delete employee!`}
                    onClose={() => showDelete(false)}
                    onConfirm={() => deleteMe(false)}
                    message={`Do you really want to delete this Vendor?`}
                /> : null
            }
            {_showUpdate ?
                <AddMember
                    type="employee"
                    open={_showUpdate}
                    onClose={(ev) => showUpdate(ev)}
                    inject={employeeDetail}
                    onSubmit={(form) => { saveEmployee(form) }}
                /> : null

            }
        </div>
    )
}