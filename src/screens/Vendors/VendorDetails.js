import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { post, get, patch,deleted } from '../../services/https.service';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Table, toaster, Dialog, TextInputField, Checkbox, SearchIcon, CrossIcon, ChevronRightIcon, ChevronUpIcon,Heading } from "evergreen-ui";
import { Autocomplete, TextInput } from 'evergreen-ui'
import { Pane, Text } from 'evergreen-ui'
import TWOPEOPLE from "../../assets/images/twoPeople.png"
import USERIMG from "../../assets/images/userImgs.png";
import { baseUrl } from '../../services/https.service';
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
import { upload } from '@testing-library/user-event/dist/upload';

export default function VendorDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [employeeDetail, setEmployeeDetail] = useState({});
    const [allProcess, setAllProcess] = useState([]);
    const [whatsapp, setWhatsapp] = useState([]);
    const [whatsapps, setWhatsapps] = useState(0);
    const [documents, setDocuments] = useState(0);
    const [document, setDocument] = useState([])
    const [process, setProcess] = useState(0);

    const pathArray = window.location.pathname.split('/');
    const [whatsappQuery, setWhatsappQuery] = useState([]);
    const [documentQuery, setDocumentQuery] = useState([]);
    const [processQuery,setProcessQuery]=useState([])

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

    const getAllWhatsapp_Documents = async () => {
        // let arr=[],arr1=[];
        // for(let i=0;i<7;i++){
        //     arr.push({name:`Whatsapp group-${i+1}`,role:(i%3==0)?'Admin':'Member'})
        //     arr1.push({name:`Document-${i+1}`,role:(i%3==0)?'Admin':'Member'})
        // }
        // setDocument(arr1);
        // setWhatsapp(arr);

        const getWhatsapp = await get(`whatsappMembers?filter={"include":{"relation":"whatsappGroup"},"where":{"memberId":"${id}"}}`)
        // getWhatsapp = await get(`member/${id}/whatsappMembers?filter={"where":}`)
        if (getWhatsapp.statusCode >= 200 && getWhatsapp.statusCode < 300) {
            getWhatsapp.data = getWhatsapp.data.filter(e => !e.whatsappGroup.deleted)
            let arr = getWhatsapp.data.map(e => { return { name: e.whatsappGroup.name, role: e.admin ? 'Admin' : 'Member', id: e.whatsappGroup.id } })
            setWhatsapp(arr);
            console.log(arr)
            setWhatsapps(arr.length);
            setWhatsappQuery(arr)
        } else {
            toaster.danger('Failed to fetch Whatsapp details!')
        }

        const getDocument = await get(`documentMembers?filter={"where":{"memberId":"${id}"},"include":"document"}`)
        if (getDocument.statusCode >= 200 && getDocument.statusCode < 300) {
            getDocument.data = getDocument.data.filter(e => !e.document.deleted)
            let arr = getDocument.data.map(e => { return { name: e.document.name, role: e.admin ? 'Admin' : 'Member', id: e.document.id } })
            console.log(arr)
            setDocument(arr);
            setDocuments(arr.length)
            setDocumentQuery(arr)

        } else {
            toaster.danger('Failed to fetch Document details!')
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


        if (type == "whatsapp") {
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


    const employeeDet = async () => {
        const getDetail = await get(`members/${id}`);
        if (getDetail.statusCode >= 200 && getDetail.statusCode < 300) {
            console.log(getDetail.data)
            setEmployeeDetail(getDetail.data)
        } else {
            toaster.danger('Failed to fetch employee!')
        }
    }

    const ImageUrl = (container, file) => {
        return `${baseUrl}photos/${container}/download/${file}`
    }

    const showMemberImage = (img) => {
        const source = ImageUrl('vendor', img)
        // alert(source)
        return (
            <img className='circleC1' src={source} onError={(e) => imageErrHandling(e)} />
        )
    }

    const imageErrHandling = (e) => {
        e.target.src = USERIMG
    }

    const showAccordian = (index, item) => {
        console.log(index, item)
        allProcess.forEach((e) => {
            e.accordian = false
        })
        allProcess[index].accordian = true;
        setAllProcess(allProcess)
    }

    const _upload = async (file) => {
		return new Promise(async (resolve, reject) => {
			try {
				let _formdata = new FormData()
				_formdata.append('file', file)
				const _img = await post(`photos/vendor/upload`, _formdata)
				// console.log(_img)
				if (_img.data) {
					resolve(_img.data.result.files.file[0].name)
				}
				else reject({ err: 'Failed to upload image!' })
			}
			catch (err) {
				reject(err)
			}
		})
	}

    const saveEmployee = async (form) => {

       
       try{
        if (form['upload'])
        {
           let uploadRes= await _upload(form['upload']);
           console.log(uploadRes)
            form['profile']=uploadRes;
        }
        if(form.contactNo.length!=10){
            throw('phone number should have 10 digits')
        }
        console.log(form)
        if (form) {
            const response = await patch('members/' + id, form)
            if (response.statusCode === 200) {
                showUpdate(false)
                employeeDet();
                toaster.success('Employee updated successfully!')
            }
            else {
                toaster.danger('Failed to update employee!', {
                    description: response.message
                })
            }
        }
       }
       catch(err){
             toaster.danger(err,{duration:2})
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
        { path: '/admin/vendors', title: 'Vendors' },
        { path: `/admin/vendors/${params.id}`, title: employeeDetail?.name }
    ]

    return (
        <div>
            <TopBar
                title="Vendors"
                breadscrubs={paths}
            />
            <Pane width="100%" className='l-blue px-4 py-5' elevation={2}>
                <div className='flex justify-end items-center pb-5'>
                    <Button marginRight={16} color="#ED342D" onClick={() => showDelete(true)}>Delete</Button>
                    <Button marginRight={16} appearance="primary" onClick={() => showUpdate(true)}>Edit</Button>
                </div>
                <div className='flex lg:w-3/4  sm:w-full justify-between'>
                    <div className='flex'>
                        <div className='circleC1 flex items-center justify-center mr-5'>
                            {showMemberImage(employeeDetail?.profile)}
                        </div>
                        <div className='flex flex-col justify-center '>
                            <div className='font-medium text-xl'>
                                {employeeDetail?.name}
                            </div>
                            <div className='text-xs text-pri-col'>
                                {employeeDetail?.contactNo} , {employeeDetail?.designation}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center '>
                        <div className='font-medium'>
                            {process}
                        </div>
                        <div className='text-xs text-pri-col'>
                             Processes
                        </div>
                    </div>
                    <div className='flex flex-col justify-center '>
                        <div className='font-medium'>
                            {whatsapps}
                        </div>
                        <div className='text-xs text-pri-col'>
                            Whatsapp Groups
                        </div>
                    </div>
                    <div className='flex flex-col justify-center '>
                        <div className='font-medium'>
                            {documents}
                        </div>
                        <div className='text-xs text-pri-col'>
                            Documents
                        </div>
                    </div>
                </div>
            </Pane>

             {/* //Process section */}
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
                        <Link key={index} className='my-4' to={`/admin/whatsapp-groups/${item.id}/${item.name}`}>
                            <ProcessList
                                title={item?.name}
                                description={item?.role}
                            />
                            {/* <div className='pointer-Mouse' onClick={() => showAccordian(index, item)}>
                                <Pane className='flex justify-between items-center px-10 py-3 bg-slate-100' style={{ borderBottom: "1px solid #66788A" }}>
                                    <div className='flex flex-col'>
                                        <div className='text-xl pb-2'>{item?.name}</div>
                                        <div className='text-pri-col text-sm'>{item?.role}</div>
                                    </div>
                                    <div className='text-lg text-pri-col'>
                                        <ChevronRightIcon />
                                    </div>
                                </Pane>
                            </div> */}
                        </Link>
                    )
                })}
            </div>

            <div className='py-10'>

                <div className='flex justify-between items-center mb-6'>
                    <div className='text-xl font-medium'>DOCUMENTS</div>
                    <div className='search-bar flex mr-4'>
                        <div>
                            <TextInput height={40} placeholder="Search..." onChange={e => { onQuery('document', e.target.value) }} className='l-blue' />
                        </div>
                        <div className='h-10 rounded flex items-center justify-center px-2 white right'>
                            <SearchIcon size={18} className='primary' />
                        </div>
                    </div>
                </div>
                {documentQuery?.map((item, index) => {
                    return (
                        <Link key={index} className='my-4' to={`/admin/documents/${item.id}/${item.name}`}>
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
                    title={`Vendor!`}
                    onClose={() => showDelete(false)}
                    onConfirm={() => deleteMe(false)}
                    message="Do you really want to delete this vendor ?"
                /> : null
            }
            {_showUpdate ?
                <AddMember
                    type="vendor"
                    open={_showUpdate}
                    onClose={(ev) => showUpdate(ev)}
                    inject={employeeDetail}
                    onSubmit={(form) => { saveEmployee(form) }}

                /> : null

            }

        </div>
    )
}