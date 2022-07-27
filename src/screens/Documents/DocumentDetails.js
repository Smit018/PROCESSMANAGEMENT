import React, { useState, useEffect, useRef }from 'react';
import PropTypes from 'prop-types';
import { post, get } from '../../services/https.service';
import { Link, useLocation } from 'react-router-dom';
import { Button, Table, Dialog, TextInputField, Checkbox, SearchIcon,CrossIcon, ChevronRightIcon } from "evergreen-ui";
import { Autocomplete, TextInput } from 'evergreen-ui'
import { Pane, Text } from 'evergreen-ui'
import TWOPEOPLE from "../../assets/images/twoPeople.png"
import USERIMG from "../../assets/images/userImgs.png";
import { baseUrl } from '../../services/https.service';

const DocumentDetails = () =>{
    const pathArray = window.location.pathname.split('/');
    let saveObj = useRef();
    const id = pathArray[3]
    const [members,setMembers] = useState([]);
    const [newMembers,setNewMembers] = useState([])
    const [documentDetail, setDocumentDetail] = useState({});
    const [search, setSearch] = useState('');
    const [suggestmember, setSuggestMember] = useState([]);
    const [documentInputSources, setDocumentInputSources] = useState([]);
    const [documentOutputSources, setDocumentOutputSources] = useState([]);

    useEffect(()=>{
        getDocumentMembers(id);
        getDocumentDetail()

        getInputSources()
        
    },[0])

    const getInputSources = ()=>{
            let obj={name:"OPVNXKA",description:"Uploading youtube video for APT Study Students"};
            let arr=[]
        for(let i=0;i<4;i++){
            arr.push(obj)
        };
        setDocumentInputSources(arr);
        setDocumentOutputSources(arr);
    }

    const getDocumentDetail = async()=>{
        const saveDoc = await get(`documents/${id}`);
        if(saveDoc.statusCode>=200 && saveDoc.statusCode<300){
            console.log(saveDoc.data)
            setDocumentDetail(saveDoc.data);
        }else{
            console.log('Fetch Document member')
        }
    }

    const getDocumentMembers = async()=>{
        // const saveDoc = await get(`documents/${id}/documentMember`);
        const saveDoc = await get(`documentMembers?filter={"where":{"documentId":"${id}"},"include":"member"}`)
        if(saveDoc.statusCode>=200 && saveDoc.statusCode<300){
            let memberData = saveDoc.data;
            memberData = memberData.map(e=>{return{...e.member,admin:e.admin}})
            setMembers(memberData);
        }else{
            console.log('Fetch Document member')
        }
    }

    const addMembersToDocument = async()=>{
        if(newMembers.length>0){
            let addMember = newMembers.map(e=>{return{...e,documentId:id}});
            const saveDoc = await post(`documentMembers`,addMember);
                if(saveDoc.statusCode>=200 && saveDoc.statusCode<300){
                    console.log("Members added to Document group");
                    getDocumentMembers();
                }else{
                    console.log('Fetch Document member')
                }
        }
        setSuggestMember([]);
            setNewMembers([]);
            console.log('Check')
    }

    const getSearchQueryMember = async(text)=>{
        let alreadyMember = members.map(e=>e.id);
        let filter = `members?filter={"where":{"memberType":"EMPLOYEE","name":{"regexp":"/${text}/i"}}}`;
        const saveDoc = await get(filter);
        if(saveDoc.statusCode>=200 && saveDoc.statusCode<300){
            console.log("Fetch suggested Members",saveDoc.data);
            let dataMember = [...saveDoc.data];
            dataMember = dataMember.filter((e)=>!alreadyMember.includes(e.id))
            dataMember.forEach(element => {
                element={...element,selected:false,admin:false}
            });
            setSuggestMember(dataMember);
        }else{
            console.log('Fetch Document member')
        }
    }

    const ImageUrl = (container, file) => {
		return `${baseUrl}photos/${container}/download/${file}`
	}

	const showMemberImage = (img) => {
		const source = ImageUrl('employee', img)
		// alert(source)
		return (
			<img className='img-20' src={source} onError={(e) => imageErrHandling(e)} />
		)
	}

	const imageErrHandling = (e) => {
		e.target.src = USERIMG
	}

    const selectMember = (e,member,i)=>{
        let getMembers = [...suggestmember];
        let memberNew = [...newMembers];
        let getIndex = memberNew.findIndex(e=>e.memberId==member.id);
        if(e.target.checked){
            getMembers[i].selected=true;
            setSuggestMember(getMembers);
            setNewMembers([...newMembers,{memberId:member.id,admin:false}])
        }else{
            getMembers[i].selected=false;
            getMembers[i].admin=false;
            setSuggestMember(getMembers)
            memberNew.splice(getIndex,1);
            setNewMembers(memberNew);
        }
        
    }

    const enableAdmin = (e,member,i)=>{
        let getMembers = [...suggestmember];
        let memberNew = [...newMembers];
        let getIndex = memberNew.findIndex(e=>e.memberId==member.id);
        if(e.target.checked){
            getMembers[i].selected=true;
            getMembers[i].admin=true;
            setSuggestMember(getMembers);
            if(getIndex>-1){
                memberNew[getIndex] = {...memberNew[getIndex],admin:true}
                setNewMembers(memberNew);
            }else{
                setNewMembers([...newMembers,{memberId:member.id,admin:true}])
            }
            
        }else{
            getMembers[i].admin=false;
            setSuggestMember(getMembers)
            memberNew[getIndex].admin=false;
            setNewMembers(memberNew);
        }
        
    }

    const handleBlur =(event)=>{
        addMembersToDocument()
    }

    return(
        <div>
            <div className='flex justify-between items-center'>
                <div>
                    <span className='m-label'> Documents </span>
                    <span style={{margin:"0 10px"}}>/</span>
                    <span className='m-label'> {documentDetail.name} </span>
                </div>
            </div>
            <Pane width="100%" height="30vh" className='my-7 backCol-WH p-10' elevation={2}>
                <div className='flex justify-between '>
                    <div className='flex flex-col '>
                        <div className='text-2xl '>
                            {documentDetail.name}
                        </div>
                        <div className='pb-10'>
                            {documentDetail.link}
                        </div>
                        
                    </div>
                    <div className='flex'>
                    <Button marginRight={16} color="#ED342D">Delete</Button>
                    <Button marginRight={16} appearance="primary">Edit</Button>
                    </div>
                </div>
                {/* <div className='pb-5'></div> */}
                <div className='flex lg:w-1/2  sm:w-full justify-between'>
                    <div className='flex'>
                        <div className='circleC1 flex items-center justify-center mr-5'>
                                <img src={TWOPEOPLE} className="img-201"/>
                            </div>
                            <div className='flex flex-col justify-center '>
                                <div className='font-medium'>
                                    0
                                </div>
                                <div className='text-xs text-pri-col'>
                                    Members
                                </div>
                        </div>
                    </div>
                            
                            <div className='flex flex-col justify-center '>
                                <div className='font-medium'>
                                    0
                                </div>
                                <div className='text-xs text-pri-col'>
                                    Input Sources
                                </div>
                            </div>
                            <div className='flex flex-col justify-center '>
                                <div className='font-medium'>
                                    0
                                </div>
                                <div className='text-xs text-pri-col'>
                                    Output Sources
                                </div>
                            </div>
                            
                </div>
                
            </Pane>
            {/* <div className='mb-5'>
                <span className='pr-2'>MEMBERS</span><span className='pr-2'>/</span><span>OWNERS</span>
            </div> */}

<div className='py-10'>
                <div className='flex justify-between items-center mb-6'>
                    <div className='text-xl'>MEMBERS</div>
                    <div className='search-bar flex mr-4'>
				        <div>
					        <TextInput height={40} placeholder="Search..."  className='l-blue' />
				        </div>
				        <div className='h-10 rounded flex items-center justify-center px-2 white right'>
					        <SearchIcon size={18} className='primary'/>
				        </div>
			        </div>
                </div>
                {members.map((item,index)=>{
                    return(
                        <Pane className='flex justify-between items-center px-8 py-4 bg-slate-100 pb-1/2' elevation={3}>
                            <div className='flex flex-col'>
                                <div className='text-lg'>{item.name}</div>
                                <div className='text-pri-col text-xs'>{item?.employeeCode} {item.designation}</div>
                                <div className='text-pri-col text-sm'>{(item.admin)?"Admin":"Member"}</div>
                            </div>
                            <div className='flex'>
                                <div className=' text-pri-col pr-7 text-lg'>
                                    <CrossIcon/>
                                </div>
                                <div className='text-blue-500 text-2xl'>
                                    <ChevronRightIcon/>
                                </div>
                                
                            </div>
                        </Pane>
                    )
                })}
            </div>

            <div className='sm:w-full lg:w-1/2 bg-white search pb-10'>
                <TextInputField className='border-2' value={search} onChange={e=>{setSearch(e.target.value);getSearchQueryMember(e.target.value)}} />
                <Pane style={{overflowY:"auto",maxHeight:"250px"}} onMouseLeave={(e=>handleBlur())} >
                {suggestmember.map((item,index)=>{
                    return(
                        <Pane className='flex justify-between m-5'>
                            <div className='flex'>
                                <img src={showMemberImage(item.profile)} className="img-20 mr-4" />
                                <div className='flex flex-col'>
                                    <div className='pb-1 text-xl font-medium'>
                                        {item.name}
                                    </div>
                                    <div className='text-pri-col text-xs'>
                                        {item.employeeCode} , {item.designation}
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center items-center text-pri-col text-lg'>
                                <div className='flex justify-center items-center mr-5'>
                                    <Checkbox className='mr-2' checked={item.admin} onChange={(e)=>{enableAdmin(e,item,index)}} />
                                    <span>Admin</span>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <Checkbox className='mr-2' checked={item.selected} onChange={(e)=>{selectMember(e,item,index)}} />
                                    <span>Member</span>
                                </div>
                            </div>
                        </Pane>
                    )
                })}
                </Pane>
                
                
            </div>

            <div className='pb-10'>
                <div className='flex justify-between items-center mb-6'>
                    <div className='text-xl'>INPUT SOURCES</div>
                    <div className='search-bar flex mr-4'>
				        <div>
					        <TextInput height={40} placeholder="Search..."  className='l-blue' />
				        </div>
				        <div className='h-10 rounded flex items-center justify-center px-2 white right'>
					        <SearchIcon size={18} className='primary'/>
				        </div>
			        </div>
                </div>
                {documentInputSources.map((item,index)=>{
                    return(
                        <Pane className='flex justify-between items-center px-8 py-4 bg-slate-100 pb-1/2' elevation={3}>
                            <div className='flex flex-col'>
                                <div className='text-xl'>{item.name}</div>
                                <div className='text-pri-col text-sm'>{item.description}</div>
                            </div>
                            <div className='text-pri-col text-xl'>
                                <ChevronRightIcon/>
                            </div>
                        </Pane>
                    )
                })}
            </div>

            <div className='py-10'>
                <div className='flex justify-between items-center mb-6'>
                    <div className='text-xl'>OUTPUT SOURCES</div>
                    <div className='search-bar flex mr-4'>
				        <div>
					        <TextInput height={40} placeholder="Search..."  className='l-blue' />
				        </div>
				        <div className='h-10 rounded flex items-center justify-center px-2 white right'>
					        <SearchIcon size={18} className='primary'/>
				        </div>
			        </div>
                </div>
                {documentInputSources.map((item,index)=>{
                    return(
                        <Pane className='flex justify-between items-center px-8 py-4 bg-slate-100 pb-1/2' elevation={3}>
                            <div className='flex flex-col'>
                                <div className='text-xl'>{item.name}</div>
                                <div className='text-pri-col text-sm'>{item.description}</div>
                            </div>
                            <div className='text-pri-col text-xl'>
                                <ChevronRightIcon/>
                            </div>
                        </Pane>
                    )
                })}
            </div>

        </div>
    )

}

export default DocumentDetails