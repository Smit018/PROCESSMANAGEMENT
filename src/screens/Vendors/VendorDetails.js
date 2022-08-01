import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { post, get, patch } from '../../services/https.service';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Table, toaster, Dialog, TextInputField, Checkbox, SearchIcon, CrossIcon, ChevronRightIcon, ChevronUpIcon } from "evergreen-ui";
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

export default function VendorDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [employeeDetail, setEmployeeDetail] = useState({});
    const [allProcess, setAllProcess] = useState([]);
    const [whatsapp, setWhatsapp] = useState([]);
    const [whatsapps, setWhatsapps] = useState(0);
    const [documents, setDocuments] = useState(0);
    const [document, setDocument] = useState([])
    const pathArray = window.location.pathname.split('/');
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


    function getAllProcesses() {
        let obj = {
            name: "OPHSB3A", description: "Uploading Youtube Video for APT Students", role: "Member", accordian: false,
            process: [
                { name: "Step 2", description: "Add Cases" },
                { name: "Step 5", description: "Register Case" },
                { name: "Step 6", description: "Collect Fee" },
                { name: "Step 10", description: "Welcome Call" },
            ]
        };
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push(obj);
        }

        setAllProcess(arr);

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
            let arr = getWhatsapp.data.map(e => { return { name: e.whatsappGroup.name, role: e.admin ? 'Admin' : 'Member' } })
            setWhatsapp(arr);
            console.log(arr)
            setWhatsapps(arr.length);
            setWhatsappQuery(arr)
        }

        const getDocument = await get(`documentMembers?filter={"where":{"memberId":"${id}"},"include":"document"}`)
        if (getDocument.statusCode >= 200 && getDocument.statusCode < 300) {
            let arr = getDocument.data.map(e => { return { name: e.document.name, role: e.admin ? 'Admin' : 'Member' } })
            console.log(arr)
            setDocument(arr);
            setDocuments(arr.length)
            setDocumentQuery(arr)

        }

    }

    function onQuery(type, text) {
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
            console.log('failed to fetch Employee Data')
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

    const saveEmployee = async (form) => {
        if (form) {
            const response = await patch('members/' + id, form)
            if (response.statusCode === 200) {
                showUpdate(false)
                employeeDet();
                toaster.success('Employee updated successfully!')
            }
            else {
                toaster.danger('Failed to update employee!')
            }
        }
    }

    const deleteMe = async () => {
        const response = await patch('members/' + id, { deleted: true })
        if(response.statusCode === 200) {
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
            <Pane width="100%" height="30vh" className='my-7 backCol-WH p-9' elevation={2}>

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

                    {/* <div className='flex flex-col justify-center '>
                                <div className='font-medium'>
                                    0
                                </div>
                                <div className='text-xs text-pri-col'>
                                    Processes
                                </div>
                            </div> */}
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

            {/* <div className='py-10'>
            
                <div className='flex justify-between items-center mb-6'>
                    <div className='text-xl'>PROCESSES</div>
                    <div className='search-bar flex mr-4'>
				        <div>
					        <TextInput height={40} placeholder="Search..."  className='l-blue' />
				        </div>
				        <div className='h-10 rounded flex items-center justify-center px-2 white right'>
					        <SearchIcon size={18} className='primary'/>
				        </div>
			        </div>
                </div>
                <Accordion allowZeroExpanded>
                    {allProcess.map((item,index) => (
                    <AccordionItem key={item.id}>
                        <AccordionItemHeading>
                            <AccordionItemButton className='flex justify-between items-center px-10 py-2 bg-slate-100'>
                            <div className='flex flex-col'>
                                <div className='text-xl pb-1'>{item?.name}</div>
                                <div className='text-pri-col text-sm pb-1'>{item?.description}</div>
                                <div className='text-pri-col text-sm'>{item?.role}</div>
                            </div>
                            <div className='text-lg text-pri-col'>
                                <ChevronRightIcon/>
                            </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className='flex items-center justify-between'>
                                <div className='flex flex-col px-4'>

                                
                            {item?.process.map((item1,index1)=>{
                                return(
                                <div className='flex' >
                                    
                                        <div className='text-lg pr-4'>{item1?.name} :</div>
                                        <div className=' text-lg'>{item1?.description}</div>
                                    
                                    
                            </div>)
                            })}
                            </div>
                            <div>
                                <ChevronUpIcon/>
                            </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                    ))}
                </Accordion>
            </div> */}

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
                        <div className='pointer-Mouse' onClick={() => showAccordian(index, item)}>
                            <Pane className='flex justify-between items-center px-10 py-3 bg-slate-100' style={{ borderBottom: "1px solid #66788A" }}>
                                <div className='flex flex-col'>
                                    <div className='text-xl pb-2'>{item?.name}</div>
                                    <div className='text-pri-col text-sm'>{item?.role}</div>
                                </div>
                                <div className='text-lg text-pri-col'>
                                    <ChevronRightIcon />
                                </div>
                            </Pane>
                            {/* {(item?.accordian)==true?<>
                            {item?.process.map((item1,index1)=>{
                                <Pane className='flex justify-between  px-10 py-4 bg-slate-100 bg-slate-300' >
                                    <div>
                                        <div className='text-lg pr-2'>{item1?.name}:</div>
                                        <div className=' text-lg'>{item1?.description}</div>
                                    </div>
                                    <div>
                                        <ChevronUpIcon/>
                                    </div>
                            </Pane>
                            })}
                        </>:null} */}
                        </div>
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
                        <div className='pointer-Mouse' onClick={() => showAccordian(index, item)}>
                            <Pane className='flex justify-between items-center px-10 py-3 bg-slate-100' style={{ borderBottom: "1px solid #66788A" }}>
                                <div className='flex flex-col'>
                                    <div className='text-xl pb-2'>{item?.name}</div>
                                    <div className='text-pri-col text-sm'>{item?.role}</div>
                                </div>
                                <div className='text-lg text-pri-col'>
                                    <ChevronRightIcon />
                                </div>
                            </Pane>
                            {/* {(item?.accordian)==true?<>
                            {item?.process.map((item1,index1)=>{
                                <Pane className='flex justify-between  px-10 py-4 bg-slate-100 bg-slate-300' >
                                    <div>
                                        <div className='text-lg pr-2'>{item1?.name}:</div>
                                        <div className=' text-lg'>{item1?.description}</div>
                                    </div>
                                    <div>
                                        <ChevronUpIcon/>
                                    </div>
                            </Pane>
                            })}
                        </>:null} */}
                        </div>
                    )
                })}
            </div>

            {_showDelete ?
                <PromptDialog
                    open={_showDelete}
                    title={`Delete Employee!`}
                    onClose={() => showDelete(false)}
                    onConfirm={() => deleteMe(false)}
                    message={`Do you really want to delete this employee?`}
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