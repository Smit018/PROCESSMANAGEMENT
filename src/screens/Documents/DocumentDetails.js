import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { post, get, patch, deleted } from '../../services/https.service';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { Avatar, Button, Heading, Dialog, TextInputField, Checkbox, SearchIcon, CrossIcon, ChevronRightIcon, toaster } from "evergreen-ui";
import { Autocomplete, TextInput } from 'evergreen-ui'
import { Pane, Text } from 'evergreen-ui'
import TWOPEOPLE from "../../assets/images/twoPeople.png"
import USERIMG from "../../assets/images/userImgs.png";
import { baseUrl } from '../../services/https.service';
import TopBar from '../../components/TopBar/TopBar';
import { AvatarList, MemberList, ProcessList } from '../../components/AvatarList/AvatarList';
import { showEmpty } from '../../components/GlobalComponent';
import PromptDialog from '../../dialogs/PromptDialog/PromptDialog';
import DocDialog from '../../dialogs/DocDialog/DocDialog';

const ImageURL = `http://142.93.212.14:3200/api/photos/employee/download/bee828d8-7fcd-4bbd-8b25-ae2aab884a8a.png`


let initData;

const DocumentDetails = () => {
    const navigate = useNavigate()
    const params = useParams()
    let saveObj = useRef();
    const id = params.id
    const [members, setMembers] = useState([]);
    const [newMembers, setNewMembers] = useState([])
    // const [documentDetail, setDocumentDetail] = useState({});
    const [name,setName]=useState('');
    const [subSheetName,setSubSheetName]=useState('')
    const [link,setLink]=useState('')
    const [search, setSearch] = useState('');
    const [suggestmember, setSuggestMember] = useState([]);
    const [documentInputSources, setDocumentInputSources] = useState([]);
    const [documentOutputSources, setDocumentOutputSources] = useState([]);
    const [newMember, setNewMember] = useState([])
    const [currMember, setCurrMember] = useState([])

    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const [memberQuery, setMemberQuery] = useState([]);
    const [documentInputQuery, setDocumentInputQuery] = useState([]);
    const [documentOutputQuery, setDocumentOutputQuery] = useState([]);

    const [inputSource,setInputSource]=useState(0);
    const [outputSource,setOutputSource]=useState(0);


    const paths = [
        { path: '/admin/documents', title: 'Documents' },
        { path: `/admin/documents/${params.id}/${params.name}`, title: params?.name }
    ]

    useEffect(() => {
        // fetchMembers()
        getDocumentMembers();
        getDocumentDetail()
        getInputSources()

    }, [0])


    const fetchMembers = async () => {
        const endPoint = `members?filter={"where": {"deleted": {"neq": true}}}`
        try {
            const allMembers = await get(endPoint)
            if (allMembers.statusCode >= 200 && allMembers.statusCode < 300) {
                setSuggestMember(allMembers.data)
            }
            else {
                // FAILED TO FETCH ALL MEMBERS
                toaster.dander('Failed to fetch members')
                console.log(allMembers)
            }
        }
        catch (err) {
            // FAILED TO FECTH ALL MEMEBRES
            console.log(err)
            toaster.dander('Failed to fetch members')
        }
    }

    function onQuery(type,text){
        console.log(type,text)
        if(type=="member"){
            if(text==""){
                setMemberQuery(members)
            }
            else{
                console.log(members)
                let proc = members.filter(e=>{
                    if(e.member?.name.toLowerCase().includes(text.toLowerCase())){
                        return e
                    }
                })
                console.log(proc)
                setMemberQuery(proc)
            }
        }
        else if(type=="input"){
            if(text==""){
                setDocumentInputQuery(documentInputSources)
            }
            else{
                // console.log(whatsappInputSources)
                let proc = documentInputSources.filter(e=>{
                    if(e.process.processNumber.toLowerCase().includes(text.toLowerCase())){
                        return e
                    }
                })
                setDocumentInputQuery(proc)
            }
        }else{
            if(text==""){
                setDocumentOutputQuery(documentOutputSources)
            }
            else{
                let proc = documentOutputSources.filter(e=>{
                    if(e.process.processNumber.toLowerCase().includes(text.toLowerCase())){
                        return e
                    }
                })
                setDocumentOutputQuery(proc)
            }
        }
    }


    const updateDocument = async (body) => {
        if (body.name && body.link) {
            try {
                const _body = { name: body.name, link: body.link,subSheetName:body.subSheetName }
                const response = await patch(`documents/${id}`, _body)
                if (response && response.statusCode == 200) {
                    toaster.success('Document updated successfully!')
                    getDocumentDetail()
                }
            }
            catch (err) {
                console.log(err)
                toaster.danger('Unable to update the document!')
            }
        }
        else toaster.danger('Please fill valid details')
    }


    const getInputSources = async() => {
        // let obj = { name: "OPVNXKA", description: "Uploading youtube video for APT Study Students" };
        // let arr = []
        // for (let i = 0; i < 4; i++) {
        //     arr.push(obj)
        // };
        // setDocumentInputSources(arr);
        // setDocumentOutputSources(arr);
        const process = await get(`documentProcesses?filter={"include":{"relation":"process"},"where":{"documentId":"${id}","source":"INPUT"}}`);
        if(process.statusCode>=200 && process.statusCode<300){
            let processData = process.data;
            processData = processData.filter(e=>!e.process.deleted)
            processData= processData.map(e=>{return {...e,processNumber:e.process.processNumber,description:e.process.title}})
            setDocumentInputSources(processData);
            setDocumentInputQuery(processData)
            setInputSource(processData.length)
        }else{
            toaster.danger('Failed to fetch Input Process!')
        }

        const processout = await get(`documentProcesses?filter={"include":{"relation":"process"},"where":{"documentId":"${id}","source":"OUTPUT"}}`);
        if(processout.statusCode>=200 && processout.statusCode<300){
            let processData = processout.data;
            processData = processData.filter(e=>!e.process.deleted)
            processData= processData.map(e=>{return {...e,processNumber:e.process.processNumber,description:e.process.title}})
            setDocumentOutputSources(processData);
            setDocumentOutputQuery(processData)
            setOutputSource(processData.length)
        }else{
            toaster.danger('Failed to fetch Output Process!')
        }
    }

    const getDocumentDetail = async () => {
        const saveDoc = await get(`documents/${id}`);
        if (saveDoc.statusCode >= 200 && saveDoc.statusCode < 300) {
            console.log(saveDoc.data)
            initData = saveDoc.data
            // setDocumentDetail(saveDoc.data);
            setName(saveDoc.data.name)
            setLink(saveDoc.data.link)
            setSubSheetName(saveDoc.data.subSheetName);

        } else {
            // console.log('Fetch Document member')
            toaster.danger('Failed to fetch Document detail!')
        }
    }

    const getDocumentMembers = async () => {
        // const saveDoc = await get(`documents/${id}/documentMember`);
        const saveDoc = await get(`documentMembers?filter={"where":{"documentId":"${id}"},"include":"member"}`)
        if (saveDoc.statusCode >= 200 && saveDoc.statusCode < 300) {
            let memberData = saveDoc.data;
            // memberData = memberData.map(e => { return { ...e.member, admin: e.admin } })
            setMembers(memberData);
            getSearchQueryMember('', memberData)
            setMemberQuery(memberData)
        } else {
            // console.log('Fetch Document member')
            toaster.danger('Failed to fetch Document members!')
        }
    }

    const addMembersToDocument = async (mem) => {

        // let addMember = newMembers.map(e => { return { ...e, documentId: id } });
        let addMember = { memberId: mem.id, documentId: id };
        const saveDoc = await post(`documentMembers`, addMember);
        if (saveDoc.statusCode >= 200 && saveDoc.statusCode < 300) {
            console.log("Members added to Document group");
            getDocumentMembers();
        } else {
            // console.log('Fetch Document member')
            toaster.danger('Failed to fetch Document Members!')
        }

        setSuggestMember([]);
        setNewMembers([]);
        console.log('Check')
    }

    const getSearchQueryMember = async (text, memberList) => {
        let alreadyMember = memberList.map(e => e.member?.id);
        let filter = `members?filter={"where":{"name":{"regexp":"/${text}/i"},"deleted": {"neq": true}}}`;
        const saveDoc = await get(filter);
        if (saveDoc.statusCode >= 200 && saveDoc.statusCode < 300) {
            console.log("Fetch suggested Members", saveDoc.data);
            let dataMember = [...saveDoc.data];
            dataMember = dataMember.filter((e) => !alreadyMember.includes(e.id))
            // dataMember.forEach(element => {
            //     element = { ...element, selected: false, admin: false }
            // });
            console.log('Fetch Document member')
            setSuggestMember(dataMember);
        } else {
            toaster.danger('Failed to fetch Query Members!')
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

    const selectMember = (e, member, i) => {
        let getMembers = [...suggestmember];
        let memberNew = [...newMembers];
        let getIndex = memberNew.findIndex(e => e.memberId == member?.id);
        if (e.target.checked) {
            getMembers[i].selected = true;
            setSuggestMember(getMembers);
            setNewMembers([...newMembers, { memberId: member?.id, admin: false }])
        } else {
            getMembers[i].selected = false;
            getMembers[i].admin = false;
            setSuggestMember(getMembers)
            memberNew.splice(getIndex, 1);
            setNewMembers(memberNew);
        }

    }

    const enableAdmin = (e, member, i) => {
        let getMembers = [...suggestmember];
        let memberNew = [...newMembers];
        let getIndex = memberNew.findIndex(e => e.memberId == member?.id);
        if (e.target.checked) {
            getMembers[i].selected = true;
            getMembers[i].admin = true;
            setSuggestMember(getMembers);
            if (getIndex > -1) {
                memberNew[getIndex] = { ...memberNew[getIndex], admin: true }
                setNewMembers(memberNew);
            } else {
                setNewMembers([...newMembers, { memberId: member?.id, admin: true }])
            }

        } else {
            getMembers[i].admin = false;
            setSuggestMember(getMembers)
            memberNew[getIndex].admin = false;
            setNewMembers(memberNew);
        }

    }

    const ToggleAdmin = async (id, admin) => {
        const toggleAdmin = await patch(`documentMembers/${id}`, { admin: admin });
        if (toggleAdmin.statusCode >= 200 && toggleAdmin.statusCode < 300) {
            console.log('Tog');
            getDocumentMembers();
        }else{
            toaster.danger('Failed to update Admins!')
        }
    }


    const addMemeber = (member) => {
        const _member = members
        _member?.push(member)
        setMembers(_member)
        console.log(newMember)
    }

    const removeMember = async (deleteId) => {
        // REMOVE FROM THE LIST

        const removeMember = await deleted(`documentMembers/${deleteId}`);
        if (removeMember.statusCode >= 200 && removeMember.statusCode < 300) {
            console.log('Member Deleted');
            getDocumentMembers();
        } else {
            // console.log('Failed to remove Members')
            toaster.danger('Failed to remove Members!')
        }
    }

    const deleteMe = async () => {
        const response = await deleted('documents/' + params.id)
        if(response.statusCode === 200) {
            toaster.success('Deleted successfully!')
            navigate(-1)
            setOpenDelete(false)
        }
        else toaster.danger('Failed to delete!')
    }


    const HeaderSection = (myProps) => {
        return (
            <div className='flex justify-between items-center mb-6'>
                <div className='text-xl'>{myProps.title}</div>
                <div className='search-bar flex mr-4'>
                    <div>
                        <TextInput height={40} placeholder="Search..." className='l-blue' />
                    </div>
                    <div className='h-10 rounded flex items-center justify-center px-2 white right'>
                        <SearchIcon size={18} className='primary' />
                    </div>
                </div>
            </div>
        )
    }


    const autoItem = (item) => {
        const img = item.children.profile ? `${baseUrl}photos/${item.children.memberType?.toLowerCase()}/download/${item.children.profile}` : ''
        return (
            <span key={item.children.name} onClick={() => {
                //  setCurrMember(item.children); addMemeber(item.children) 
                addMembersToDocument(item.children);
            }}>
                <AvatarList
                    avatar={img}
                    name={item.children.name}
                    description={item.children.designation || item.children.memberType}
                    action={false}
                    _item={item}
                />
            </span>
        )
    }

    const filterAutoComplete = (items, text) => {
        return items.filter(item => {
            return item.name.toLowerCase().includes(text)
        })
    }


    const AutoTextInput = (myProps) => {
        return (
            <Autocomplete
                onChange={changedItem => console.log(changedItem)}
                items={myProps.datasource}
                itemToString={(item) => { return item ? item : '' }}
                renderItem={(item, index) => autoItem(item)}
                itemSize={75}
                itemsFilter={(item, text) => filterAutoComplete(item, text)}
                onInputValueChange={changedItem => console.log(changedItem)}
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
                    <Pane key={key} ref={getRef} display="flex">
                        <TextInput
                            flex="1"
                            label=""
                            value={inputValue || myProps.value}
                            height={50}
                            placeholder={myProps.placeholder}
                            onFocus={openMenu}
                            onChange={(e) => { myProps.inputChange(e); getSearchQueryMember(e.target.value, members) }}
                            {...getInputProps()}
                        />
                    </Pane>
                )}
            </Autocomplete>
        )
    }


    return (
        <div className='h-full w-full'>
            <TopBar
                title="Documents"
                breadscrubs={paths}
            />
            <br></br>
            <Pane className='w-full l-blue shadow'>
                <div className='flex flex-wrap justify-between items-center px-4 py-5'>
                    <div>
                        <Heading size={600}>
                            {name}
                        </Heading>
                        <Heading size={400} marginTop={8}>
                           <a href={link} target="_blank">{link}</a>
                        </Heading>
                    </div>
                    <div>
                        <Button color="red" onClick={() => setOpenDelete(true)}>Delete</Button>
                        &nbsp;&nbsp;
                        <Button appearance="primary" onClick={() => setOpenEdit(true)}>Edit</Button>
                    </div>
                </div>
                <div className='flex flex-wrap items-center px-4 py-5'>
                    <div className='flex items-center'>
                        <Avatar
                            name="Alan Turing"
                            size={50}
                            marginRight={10}
                        />
                    </div>
                    <div className='w-3/4 flex justify-around items-center'>
                        <div>
                            <Heading size={600}>{members.length}</Heading>
                            <Heading size={400}>Members</Heading>
                        </div>
                        <div>
                            <Heading size={600}>{inputSource}</Heading>
                            <Heading size={400}>Input Sources</Heading>
                        </div>
                        <div>
                            <Heading size={600}>{outputSource}</Heading>
                            <Heading size={400}>Ouput Sources</Heading>
                        </div>
                    </div>
                </div>
            </Pane>
            <br></br>
            <br></br>
            <div className='py-5'>
                {/* <HeaderSection
                    title="MEMBERS"
                /> */}
                <div className='flex justify-between items-center mb-6'>
                <div className='text-xl'>{'MEMBERS'}</div>
                <div className='search-bar flex mr-4'>
                    <div>
                        <TextInput height={40} placeholder="Search..." onChange={e=>{onQuery('member',e.target.value)}} className='l-blue' />
                    </div>
                    <div className='h-10 rounded flex items-center justify-center px-2 white right'>
                        <SearchIcon size={18} className='primary' />
                    </div>
                </div>
            </div>
                {members.length === 0 ? showEmpty() : memberQuery.map((item, index) => {
                    return (
                        <Link key={item.id} to={`/admin/${(item?.member?.memberType == 'EMPLOYEE') ? 'employees' : 'vendors'}/${item.member?.id}`}>
                            <MemberList
                                name={item.member?.name}
                                designation={!item.admin ? (item.member?.employeeCode + ', ' + item.member?.designation) : ''}
                                type={item.admin ? 'Owner' : 'Member'}
                                showSwitch={true}
                                admin={item.admin}
                                switchChange={(ev) => {
                                    // console.log(ev)
                                    ToggleAdmin(item.id, !item.admin)
                                }}
                                onClose={() => removeMember(item.id)}
                            />
                        </Link>
                    )
                })}
                <div className='sm:w-full lg:w-1/2 bg-white my-4'>
                    <AutoTextInput
                        datasource={suggestmember}
                        placeholder="Add Member"
                        value={newMember}
                        inputChange={(e) => setNewMember(e.target.value)}
                    />
                </div>
            </div>
            <br></br>
            <br></br>
            <div className='py-5'>
                {/* <HeaderSection
                    title="INPUT SOURCES"
                /> */}
                <div className='flex justify-between items-center mb-6'>
                <div className='text-xl'>{'INPUT SOURCES'}</div>
                <div className='search-bar flex mr-4'>
                    <div>
                        <TextInput height={40} placeholder="Search..." onChange={e=>{onQuery('input',e.target.value)}} className='l-blue' />
                    </div>
                    <div className='h-10 rounded flex items-center justify-center px-2 white right'>
                        <SearchIcon size={18} className='primary' />
                    </div>
                </div>
            </div>
                {documentInputSources.length === 0 ? showEmpty() : documentInputQuery.map((item, index) => {
                    return (
                        <Link key={item.id} to={`/admin/processes/${item.processId}`}>
                            <ProcessList
                                title={item.processNumber}
                                subTitle={item.description}
                            />
                        </Link>
                    )
                })}
            </div>
            <br></br>
            <br></br>
            <div className='py-5'>
                {/* <HeaderSection
                    title="OUTPUT SOURCES"
                /> */}
                <div className='flex justify-between items-center mb-6'>
                <div className='text-xl'>{'OUTPUT SOURCES'}</div>
                <div className='search-bar flex mr-4'>
                    <div>
                        <TextInput height={40} placeholder="Search..." onChange={e=>{onQuery('output',e.target.value)}} className='l-blue' />
                    </div>
                    <div className='h-10 rounded flex items-center justify-center px-2 white right'>
                        <SearchIcon size={18} className='primary' />
                    </div>
                </div>
            </div>
                {documentInputSources.length === 0 ? showEmpty() : documentOutputQuery.map((item, index) => {
                    return (
                        <Link key={item.id} to={`/admin/processes/${item.processId}`}>
                            <ProcessList
                                title={item.processNumber}
                                subTitle={item.description}
                            />
                        </Link>
                    )
                })}
            </div>
            <PromptDialog
                open={openDelete}
                title={`Document!`}
                onClose={() => setOpenDelete(false)}
                onConfirm={() => deleteMe()}
                message={`Do you really want to delete document ${params.name}?`}
            />
            <DocDialog
                open={openEdit}
                title={`Update Document`}
                onClose={() => { setOpenEdit(false);
                    //  setDocumentDetail(initData) 
                    setName(initData.name)
                    setLink(initData.link)
                    setSubSheetName(initData.subSheetName)
                    
                    }}
                onConfirm={() => { updateDocument({name,link,subSheetName}); setOpenEdit(false) }}
                inject={{name,link,subSheetName}}
                onChange={(e) => {
                    const key = Object.keys(e)[0]
                    console.log(e, key)
                    // const _values = {...documentDetail}
                    //  e.name ? setDocumentDetail({ ...initData, name: e.name }) : setDocumentDetail({ ...initData, link: e.link })
                    if(key === 'name'){
                        
                        // setDocumentDetail({_values, name:e.name})
                        setName(e.name)
                    }
                    else if(key === 'link'){
                        // setDocumentDetail({_values, link:e.link})
                        setLink(e.link)
                    }
                    else if(key === 'subSheetName'){
                        // setDocumentDetail({_values, subSheetName:e.subSheetName})
                        setSubSheetName(e.subSheetName)
                    }

                    }}
            />
        </div>
    )
}

export default DocumentDetails