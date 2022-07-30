import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './WhatsappGroup.css';
import { post, get, patch, deleted } from '../../services/https.service';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button, Table, Dialog, TextInputField, Checkbox, SearchIcon, CrossIcon, ChevronRightIcon, PeopleIcon, toaster, Heading } from "evergreen-ui";
import { Autocomplete, TextInput } from 'evergreen-ui'
import { Pane, Text } from 'evergreen-ui'
import TWOPEOPLE from "../../assets/images/twoPeople.png"
import USERIMG from "../../assets/images/userImgs.png";
import { baseUrl } from '../../services/https.service';
import TopBar from '../../components/TopBar/TopBar';
import { AvatarList, MemberList, ProcessList } from '../../components/AvatarList/AvatarList';
import { showEmpty } from '../../components/GlobalComponent';
import { getSuggestedQuery } from '@testing-library/react';
import PromptDialog from '../../dialogs/PromptDialog/PromptDialog';
import DocDialog from '../../dialogs/DocDialog/DocDialog';
const ImageURL = `http://142.93.212.14:3200/api/photos/employee/download/bee828d8-7fcd-4bbd-8b25-ae2aab884a8a.png`

let initData;


const WhatsappDetails = () => {
    const params = useParams()
    const pathArray = window.location.pathname.split('/');
    let saveObj = useRef();
    const id = pathArray[3]
    const [members, setMembers] = useState([]);
    const [newMembers, setNewMembers] = useState([])
    const [whatsappDetail, setWhatsappDetail] = useState({});
    const [search, setSearch] = useState('');
    const [suggestmember, setSuggestMember] = useState([]);
    const [whatsappInputSources, setWhatsappInputSources] = useState([]);
    const [whatsappOutputSources, setWhatsappOutputSources] = useState([]);
    const [newMember, setNewMember] = useState([])
    const [currMember, setCurrMember] = useState([])

    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const [memberQuery, setMemberQuery] = useState([]);
    const [whatsappInputQuery, setWhatsappInputQuery] = useState([]);
    const [whatsappOutputQuery, setWhatsappOutputQuery] = useState([]);

    const paths = [
        { path: '/admin/whatsapp-groups', title: 'Whatsapp Groups' },
        { path: `/admin/whatsapp-groups/${params.id}/${params.name}`, title: params?.name }
    ]


    useEffect(() => {
        // fetchMembers()
        getWhatsappMembers();
        getWhatsappDetail()
        getInputSources()
        // getSearchQueryMember('')
    }, [0]);


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
                    if(e.member.name.toLowerCase().includes(text.toLowerCase())){
                        return e
                    }
                })
                console.log(proc)
                setMemberQuery(proc)
            }
        }
        else if(type=="input"){
            if(text==""){
                setWhatsappInputQuery(whatsappInputSources)
            }
            else{
                console.log(whatsappInputSources)
                let proc = whatsappInputSources.filter(e=>{
                    if(e.process.processNumber.toLowerCase().includes(text.toLowerCase())){
                        return e
                    }
                })
                setWhatsappInputQuery(proc)
            }
        }else{
            if(text==""){
                setWhatsappOutputQuery(whatsappOutputSources)
            }
            else{
                let proc = whatsappOutputSources.filter(e=>{
                    if(e.process.processNumber.toLowerCase().includes(text.toLowerCase())){
                        return e
                    }
                })
                setWhatsappOutputQuery(proc)
            }
        }
    }


    const getInputSources = async() => {
        // let obj = { name: "OPVNXKA", description: "Uploading youtube video for APT Study Students" };
        // let arr = []
        // for (let i = 0; i < 4; i++) {
        //     arr.push(obj)
        // };
        // setWhatsappInputSources(arr);
        // setWhatsappOutputSources(arr);
        const process = await get(`whatsappProcesses?filter={"include":{"relation":"process"},"where":{"whatsappId":"${id}","source":"INPUT"}}`);
        if(process.statusCode>=200 && process.statusCode<300){
            let processData = process.data;
            processData= processData.map(e=>{return {...e,processNumber:e.process.processNumber,description:e.process.title}})
            setWhatsappInputSources(processData);
            setWhatsappInputQuery(processData)
        }

        const processout = await get(`whatsappProcesses?filter={"include":{"relation":"process"},"where":{"whatsappId":"${id}","source":"OUTPUT"}}`);
        if(processout.statusCode>=200 && processout.statusCode<300){
            let processData = processout.data;
            processData= processData.map(e=>{return {...e,processNumber:e.process.processNumber,description:e.process.title}})
            setWhatsappOutputSources(processData);
            setWhatsappOutputQuery(processData)
        }
    }

    const getWhatsappDetail = async () => {
        const whatsap = await get(`whatsappGroups/${id}`);
        if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
            console.log(whatsap.data)
            setWhatsappDetail(whatsap.data);
            initData = whatsap.data
        } else {
            console.log('Fetch Whatsapp member')
        }
    }

    const getWhatsappMembers = async () => {
        // const whatsap = await get(`whatsappGroups/${id}/whatsappMember`);
        const whatsap = await get(`whatsappMembers?filter={"where":{"whatsappGroupId":"${id}"},"include":"member"}`)
        if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
            let memberData = whatsap.data;
            // memberData = memberData.map(e => { return { ...e.member, admin: e.admin } })
            console.log(whatsap.data)
            setMembers(memberData);
            getSearchQueryMember('', whatsap.data)
            setMemberQuery(whatsap.data)
        } else {
            console.log('Fetch Whatsapp member')
        }
    }

    

    const addMembersToWhatsapp = async (mem) => {
        console.log(mem)
        // let addMember = newMembers.map(e => { return { ...e, whatsappGroupId: id } });
        let addMember = { whatsappGroupId: id, memberId: mem.id }
        const whatsap = await post(`whatsappMembers`, addMember);
        if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
            console.log("Members added to Whatsapp group");
            getWhatsappMembers();
        } else {
            console.log('Fetch Whatsapp member')
        }
        // setSuggestMember([]);
        // setNewMembers([]);
        console.log('Check')
    }

    const ToggleAdmin = async (id, admin) => {
        const toggleAdmin = await patch(`whatsappMembers/${id}`, { admin: admin });
        if (toggleAdmin.statusCode >= 200 && toggleAdmin.statusCode < 300) {
            console.log('Tog');
            getWhatsappMembers();
        }
    }

    const getSearchQueryMember = async (text, memberList) => {
        let alreadyMember = memberList.map(e => e.member.id);

        // let filter = `members?filter={"where":{"memberType":"EMPLOYEE","name":{"regexp":"/${text}/i"}}}`;
        let filter = `members?filter={"where":{"name":{"regexp":"/${text}/i"}}}`;
        const whatsap = await get(filter);
        if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
            // console.log("Fetch suggested Members", whatsap.data);
            let dataMember = [...whatsap.data];
            let filtered = []
            console.log(alreadyMember)
            dataMember = dataMember.filter((e) => !alreadyMember.includes(e.id))
            console.log(dataMember)
            setSuggestMember(dataMember);
        } else {
            console.log('Fetch Whatsapp member')
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
        let getIndex = memberNew.findIndex(e => e.memberId == member.id);
        if (e.target.checked) {
            getMembers[i].selected = true;
            setSuggestMember(getMembers);
            setNewMembers([...newMembers, { memberId: member.id, admin: false }])
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
        let getIndex = memberNew.findIndex(e => e.memberId == member.id);
        if (e.target.checked) {
            getMembers[i].selected = true;
            getMembers[i].admin = true;
            setSuggestMember(getMembers);
            if (getIndex > -1) {
                memberNew[getIndex] = { ...memberNew[getIndex], admin: true }
                setNewMembers(memberNew);
            } else {
                setNewMembers([...newMembers, { memberId: member.id, admin: true }])
            }

        } else {
            getMembers[i].admin = false;
            setSuggestMember(getMembers)
            memberNew[getIndex].admin = false;
            setNewMembers(memberNew);
        }

    }

    const handleBlur = (event) => {
        addMembersToWhatsapp()
    }

    const addMemeber = (member) => {
        const _member = members
        _member.push(member)
        setMembers(_member)
    }

    const removeMember = async (deleteId) => {
        // REMOVE FROM THE LIST
        const removeMember = await deleted(`whatsappMembers/${deleteId}`);
        if (removeMember.statusCode >= 200 && removeMember.statusCode < 300) {
            console.log('Member Deleted');
            getWhatsappMembers();
        } else {
            console.log('Failed to remove Members')
        }
    }

    const updateGroup = async (body) => {
        if (body.name && body.link) {
            try {
                const _body = { name: body.name, link: body.link }
                const response = await patch(`whatsappGroups/${id}`, _body)
                if (response && response.statusCode == 200) {
                    toaster.success('Whatsapp group updated successfully!')
                    getWhatsappDetail()
                }
            }
            catch (err) {
                console.log(err)
                toaster.danger('Unable to update the wa group!')
            }
        }
        else toaster.danger('Please fill valid details')
    }

    

    const HeaderSection = (myProps) => {
        return (
            <div className='flex justify-between items-center mb-6'>
                <div className='text-xl'>{myProps.title}</div>
                <div className='search-bar flex mr-4'>
                    <div>
                        <TextInput height={40} placeholder="Search..." onChange={e=>{onQuery(myProps.variable,e.target.value)}} className='l-blue' />
                    </div>
                    <div className='h-10 rounded flex items-center justify-center px-2 white right'>
                        <SearchIcon size={18} className='primary' />
                    </div>
                </div>
            </div>
        )
    }


    const autoItem = (item) => {
        return (
            <span key={item.children.name} onClick={() => {
                // setCurrMember(item.children); addMemeber(item.children) 
                addMembersToWhatsapp(item.children)
            }}>
                <AvatarList
                    avatar={ImageURL}
                    name={item.children.name}
                    description={item.children.designation || item.children.memberType}
                    action={false}
                    _item={item}
                />
            </span>
        )
    }

    const filterAutoComplete = (items, text) => {
        console.log(items, text)
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
                onInputValueChange={changedItem => {
                    console.log(changedItem);

                }}
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
                title="Whatsapp Groups"
                breadscrubs={paths}
            />
            <br></br>
            <Pane className='w-full l-blue shadow'>
                <div className='flex flex-wrap justify-between items-center px-4 py-5'>
                    <div>
                        <Heading size={600}>
                            {whatsappDetail.name}
                        </Heading>
                        <Heading size={400} marginTop={8}>
                            {whatsappDetail.link}
                        </Heading>
                    </div>
                    <div>
                        <Button color="red" onClick={() => setOpenDelete(true)}>Delete</Button>
                        &nbsp;&nbsp;
                        <Button appearance="primary" onClick={() => setOpenEdit(true)}>Edit</Button>
                    </div>
                </div>
                <div className='flex flex-wrap items-center px-4 py-5'>
                    <div className='flex items-center rounded-full bg-white p-4'>
                        <PeopleIcon color="#262626" size={22} />
                    </div>
                    <div className='w-3/4 flex justify-around items-center'>
                        <div>
                            <Heading size={600}>{members.length}</Heading>
                            <Heading size={400}>Members</Heading>
                        </div>
                        <div>
                            <Heading size={600}>0</Heading>
                            <Heading size={400}>Input Sources</Heading>
                        </div>
                        <div>
                            <Heading size={600}>0</Heading>
                            <Heading size={400}>Ouput Sources</Heading>
                        </div>
                    </div>
                </div>
            </Pane>
            <br></br>
            <br></br>
            <div className='py-5'>
                {/* <HeaderSection
                    title="MEMBERS" variable="member"
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
                        <Link key={item.id} to={`/admin/${(item?.member.memberType == 'EMPLOYEE') ? 'employees' : 'vendors'}/${item.member.id}`}>
                            <MemberList
                                name={item.member.name}
                                designation={!item.admin ? (item.member.employeeCode + ', ' + item.member.designation) : ''}
                                type={item.admin ? 'Owner' : 'Member'}
                                admin={item.admin}
                                showSwitch={true}
                                switchChange={(ev) => ToggleAdmin(item.id, !item.admin)}
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
                        inputChange={(e) => { setNewMember(e.target.value) }}
                    />
                </div>
            </div>
            <br></br>
            <br></br>
            <div className='py-5'>
                {/* <HeaderSection
                    title="INPUT SOURCES" variable="input"
                    
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
                {whatsappInputSources.length === 0 ? showEmpty() : whatsappInputQuery.map((item, index) => {
                    return (
                        <Link key={item.id} to={`/admin/processes/${item.id}`}>
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
                    title="OUTPUT SOURCES" variable="output"
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
                {whatsappOutputSources.length === 0 ? showEmpty() : whatsappOutputQuery.map((item, index) => {
                    return (
                        <Link key={item.id} to={`/admin/processes/${item.id}`}>
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
                title={`Delete Whatsapp Group!`}
                onClose={() => setOpenDelete(false)}
                onConfirm={() => setOpenDelete(false)}
                message={`Do you really want to delete whatsapp group ${params.name}?`}
            />
            <DocDialog
                open={openEdit}
                title={`Update WA Group!`}
                onClose={() => { setOpenEdit(false); setWhatsappDetail(initData) }}
                onConfirm={() => { updateGroup(whatsappDetail); setOpenEdit(false) }}
                inject={whatsappDetail}
                onChange={(e) => { e.name ? setWhatsappDetail({ ...initData, name: e.name }) : setWhatsappDetail({ ...initData, link: e.link }) }}
            />
        </div>
    )

}

export default WhatsappDetails