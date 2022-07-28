import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { post, get, patch, deleted } from '../../services/https.service';
import { Link, useLocation, useParams } from 'react-router-dom';
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
    const params = useParams()
    let saveObj = useRef();
    const id = params.id
    const [members, setMembers] = useState([]);
    const [newMembers, setNewMembers] = useState([])
    const [documentDetail, setDocumentDetail] = useState({});
    const [search, setSearch] = useState('');
    const [suggestmember, setSuggestMember] = useState([]);
    const [documentInputSources, setDocumentInputSources] = useState([]);
    const [documentOutputSources, setDocumentOutputSources] = useState([]);
    const [newMember, setNewMember] = useState([])
    const [currMember, setCurrMember] = useState([])

    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)


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


    const updateDocument = async (body) => {
        if (body.name && body.link) {
            try {
                const _body = { name: body.name, link: body.link }
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


    const getInputSources = () => {
        let obj = { name: "OPVNXKA", description: "Uploading youtube video for APT Study Students" };
        let arr = []
        for (let i = 0; i < 4; i++) {
            arr.push(obj)
        };
        setDocumentInputSources(arr);
        setDocumentOutputSources(arr);
    }

    const getDocumentDetail = async () => {
        const saveDoc = await get(`documents/${id}`);
        if (saveDoc.statusCode >= 200 && saveDoc.statusCode < 300) {
            console.log(saveDoc.data)
            initData = saveDoc.data
            setDocumentDetail(saveDoc.data);
        } else {
            console.log('Fetch Document member')
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
        } else {
            console.log('Fetch Document member')
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
            console.log('Fetch Document member')
        }

        setSuggestMember([]);
        setNewMembers([]);
        console.log('Check')
    }

    const getSearchQueryMember = async (text, memberList) => {
        let alreadyMember = memberList.map(e => e.member.id);
        let filter = `members?filter={"where":{"name":{"regexp":"/${text}/i"}}}`;
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

    const ToggleAdmin = async (id, admin) => {
        const toggleAdmin = await patch(`documentMembers/${id}`, { admin: admin });
        if (toggleAdmin.statusCode >= 200 && toggleAdmin.statusCode < 300) {
            console.log('Tog');
            getDocumentMembers();
        }
    }


    const addMemeber = (member) => {
        const _member = members
        _member.push(member)
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
            console.log('Failed to remove Members')
        }
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
        return (
            <span key={item.children.name} onClick={() => {
                //  setCurrMember(item.children); addMemeber(item.children) 
                addMembersToDocument(item.children);
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
                            {documentDetail.name}
                        </Heading>
                        <Heading size={400} marginTop={8}>
                            {documentDetail.link}
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
                <HeaderSection
                    title="MEMBERS"
                />
                {members.length === 0 ? showEmpty() : members.map((item, index) => {
                    return (
                        <Link key={item.id} to={`/admin/${(item?.member.memberType == 'EMPLOYEE') ? 'employees' : 'vendors'}/${item.member.id}`}>
                            <MemberList
                                name={item.member.name}
                                designation={!item.admin ? (item.member.employeeCode + ', ' + item.member.designation) : ''}
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
                <HeaderSection
                    title="INPUT SOURCES"
                />
                {documentInputSources.length === 0 ? showEmpty() : documentInputSources.map((item, index) => {
                    return (
                        <Link key={item.id} to={`/admin/processes/${item.id}`}>
                            <ProcessList
                                title={item.name}
                                subTitle={item.description}
                            />
                        </Link>
                    )
                })}
            </div>
            <br></br>
            <br></br>
            <div className='py-5'>
                <HeaderSection
                    title="OUTPUT SOURCES"
                />
                {documentInputSources.length === 0 ? showEmpty() : documentInputSources.map((item, index) => {
                    return (
                        <Link key={item.id} to={`/admin/processes/${item.id}`}>
                            <ProcessList
                                title={item.name}
                                subTitle={item.description}
                            />
                        </Link>
                    )
                })}
            </div>
            <PromptDialog
                open={openDelete}
                title={`Delete Document!`}
                onClose={() => setOpenDelete(false)}
                onConfirm={() => setOpenDelete(false)}
                message={`Do you really want to delete document ${params.name}?`}
            />
            <DocDialog
                open={openEdit}
                title={`Update Document`}
                onClose={() => { setOpenEdit(false); setDocumentDetail(initData) }}
                onConfirm={() => { updateDocument(documentDetail); setOpenEdit(false) }}
                inject={documentDetail}
                onChange={(e) => { e.name ? setDocumentDetail({ ...initData, name: e.name }) : setDocumentDetail({ ...initData, link: e.link }) }}
            />
        </div>
    )
}

export default DocumentDetails