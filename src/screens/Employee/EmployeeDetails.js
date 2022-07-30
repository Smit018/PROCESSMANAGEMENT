import React, { useState, useEffect, useRef }from 'react';
import PropTypes from 'prop-types';
import { post, get } from '../../services/https.service';
import { Link, useLocation } from 'react-router-dom';
import { Button, Table, Dialog, TextInputField, Checkbox, SearchIcon,CrossIcon, ChevronRightIcon, ChevronUpIcon } from "evergreen-ui";
import { Autocomplete, TextInput } from 'evergreen-ui'
import { Pane, Text } from 'evergreen-ui'
import TWOPEOPLE from "../../assets/images/twoPeople.png"
import USERIMG from "../../assets/images/userImgs.png";
import { baseUrl } from '../../services/https.service';
import { WhatsApp } from '@mui/icons-material';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

export default function EmployeeDetails(){

    const [employeeDetail,setEmployeeDetail] = useState({});
    const [allProcess, setAllProcess] = useState([]);
    const [whatsapp, setWhatsapp] = useState([]);
    const [document, setDocument] = useState([])
    const pathArray = window.location.pathname.split('/');
    // const [employeeDetails,setEmployeeDetails] = useState({});
    const [process,setProcess] = useState(0);
    const [whatsapps,setWhatsapps] = useState(0);
    const [documents,setDocuments] = useState(0);
    const [processQuery, setProcessQuery] = useState('');
    const [whatsappQuery, setWhatsappQuery] = useState('');
    const [documentQuery, setDocumentQuery] = useState('');
    const id = pathArray[3]

    useEffect(()=>{

        employeeDet();

        getAllProcesses();

        getAllWhatsapp_Documents()

    },[0]);


    async function getAllProcesses(text=""){

        const getProcessInfo = await get(`stepsMembers?filter={"where":{"memberId":"${id}"},"include":{"relation":"steps","scope":{"include":{"relation":"process","scope":{"include":{"relation":"processOwner"}}}}}}`);
        if(getProcessInfo.statusCode>=200 && getProcessInfo.statusCode<300){
            let stepmemberArr = getProcessInfo.data;
            stepmemberArr= stepmemberArr.map(e=>{return {...e,processNumber:e.steps.process.processNumber,stepDescription:e.steps.description,processTitle:e.steps.process.title}});
            let arr=[];
            const groupedMap = stepmemberArr.reduce(
                (entryMap, e) => entryMap.set(e.processNumber, [...entryMap.get(e.processNumber)||[], e]),
                new Map()
            );
            for(let [key, value] of groupedMap){
                if(key.toLowerCase().includes(text.toLowerCase())){
                    let stepProcess = value.map(e=>e.stepDescription);
                    arr.push({"processNumber":key,process:stepProcess,processTitle:value[0].processTitle})
                }
            }
            console.log(arr)
            // setEmployeeDetails({...employeeDetails,process:arr.length});
            setProcess(arr.length)
            setAllProcess(arr);
        }

    }

    const getAllWhatsapp_Documents =async(text="")=>{
        
        const getWhatsapp = await get(`whatsappMembers?filter={"include":{"relation":"whatsappGroup"},"where":{"memberId":"${id}"}}`)
        // getWhatsapp = await get(`member/${id}/whatsappMembers?filter={"where":}`)
        if(getWhatsapp.statusCode>=200 && getWhatsapp.statusCode<300){
            let arr = getWhatsapp.data.map(e=>{return {name:e.whatsappGroup.name,role:e.admin?'Admin':'Member'}})
            setWhatsapp(arr);
            setWhatsapps(arr.length);
        }

        const getDocument = await get(`documentMembers?filter={"where":{"memberId":"${id}"},"include":"document"}`)
        if(getDocument.statusCode>=200 && getDocument.statusCode<300){
            let arr = getDocument.data.map(e=>{return {name:e.document.name,role:e.admin?'Admin':'Member'}})
            setDocument(arr);
            setDocuments(arr.length)
        }
        
    }

    const employeeDet = async ()=>{
        const getDetail = await get(`members/${id}`);
        if(getDetail.statusCode>=200 && getDetail.statusCode<300){
            console.log(getDetail.data)
            setEmployeeDetail(getDetail.data)
        }else{
            console.log('failed to fetch Employee Data')
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

    const showAccordian = (index,item)=>{
        console.log(index,item);
        let getProcess = [...allProcess]
        getProcess.forEach((e)=>{
            e.accordian=false
        })
        getProcess[index].accordian=true;
        setAllProcess(getProcess)
        console.log(allProcess)
    }

    return(
        <div>
            <div className='flex justify-between items-center'>
                <div>
                    <span className='m-label'> Employee </span>
                    <span style={{margin:"0 10px"}}>/</span>
                    <span className='m-label'> {employeeDetail.name} </span>
                </div>
            </div>
            <Pane width="100%" height="30vh" className='my-7 backCol-WH p-9' elevation={2}>
                
                <div className='flex justify-end items-center pb-5'>
                    <Button marginRight={16} color="#ED342D">Delete</Button>
                    <Button marginRight={16} appearance="primary">Edit</Button>
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
					        <TextInput height={40} placeholder="Search..." value={processQuery} onChange={e=>{setProcessQuery(e.target.value);getAllProcesses(e.target.value)}}  className='l-blue' />
				        </div>
				        <div className='h-10 rounded flex items-center justify-center px-2 white right'>
					        <SearchIcon size={18} className='primary'/>
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
                    {allProcess.map((item,index) => (
                    <AccordionItem key={item.id}>
                        <AccordionItemHeading>
                            <AccordionItemButton className='flex justify-between items-center px-10 py-2 bg-slate-100'>
                            <div className='flex flex-col'>
                                <div className='text-xl pb-1'>{item?.processNumber}</div>
                                <div className='text-pri-col text-sm pb-1'>{item?.processTitle}</div>
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
                                    
                                        {/* <div className='text-lg pr-4'>{item1?.name} :</div> */}
                                        <div className=' text-lg'>{index1+1} : {item1}</div>
                                    
                                    
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
            </div>

            <div className='py-10'>
            
                <div className='flex justify-between items-center mb-6'>
                    <div className='text-xl font-medium'>WHATSAPP GROUPS</div>
                    <div className='search-bar flex mr-4'>
				        <div>
					        <TextInput height={40} placeholder="Search..."  className='l-blue' />
				        </div>
				        <div className='h-10 rounded flex items-center justify-center px-2 white right'>
					        <SearchIcon size={18} className='primary'/>
				        </div>
			        </div>
                </div>
                {whatsapp.map((item,index)=>{
                    return(
                        <div className='pointer-Mouse' onClick={()=>showAccordian(index,item)}>
                        <Pane className='flex justify-between items-center px-10 py-3 bg-slate-100' style={{borderBottom:"1px solid #66788A"}}>
                            <div className='flex flex-col'>
                                <div className='text-xl pb-2'>{item?.name}</div>
                                <div className='text-pri-col text-sm'>{item?.role}</div>
                            </div>
                            <div className='text-lg text-pri-col'>
                                <ChevronRightIcon/>
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
					        <TextInput height={40} placeholder="Search..."  className='l-blue' />
				        </div>
				        <div className='h-10 rounded flex items-center justify-center px-2 white right'>
					        <SearchIcon size={18} className='primary'/>
				        </div>
			        </div>
                </div>
                {document.map((item,index)=>{
                    return(
                        <div className='pointer-Mouse' onClick={()=>showAccordian(index,item)}>
                        <Pane className='flex justify-between items-center px-10 py-3 bg-slate-100' style={{borderBottom:"1px solid #66788A"}}>
                            <div className='flex flex-col'>
                                <div className='text-xl pb-2'>{item?.name}</div>
                                <div className='text-pri-col text-sm'>{item?.role}</div>
                            </div>
                            <div className='text-lg text-pri-col'>
                                <ChevronRightIcon/>
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



        </div>
    )
}