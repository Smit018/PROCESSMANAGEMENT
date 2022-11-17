import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Process.module.css';
import TopBar from '../../components/TopBar/TopBar';
import AddProcess from '../../dialogs/AddProcess/AddProcess';
import { deleted, get, patch, post, baseUrl } from '../../services/https.service';
import { useParams, useNavigate } from 'react-router-dom';
import { Pane, Text, Avatar, Button, Heading, TextInput, Autocomplete, Switch, IconButton, CrossIcon, EditIcon, toaster } from 'evergreen-ui';
import { AvatarList, AvatarCard } from '../../components/AvatarList/AvatarList';
import PromptDialog from '../../dialogs/PromptDialog/PromptDialog'
import { showWaitToast } from '../../components/GlobalComponent';

import waImg from '../../assets/images/wa.png'
import docImg from '../../assets/images/doc.png'
import axios from 'axios';

const ImageURL = `${baseUrl}photos/employee/download/bee828d8-7fcd-4bbd-8b25-ae2aab884a8a.png`

const ProcessDetails1 = () => {
    const navigate = useNavigate();

    const pathArray = window.location.pathname.split('/');
    const id = pathArray[3]
    const params = useParams();
    const [processId, setProcessId] = useState('');
    const [processDetail, setProcessDetail] = useState({})
    const [newMember, setNewMember] = useState('')
    const [newWaGroup, setNewWaGroup] = useState('')
    const [newDocument, setNewDocument] = useState('')
    const [processOwner, setProcessOwner] = useState(false);
    const [_showDelete, showDelete] = useState(false);
    const [_showUpdate, showUpdate] = useState(false);
    const [_updateStep, setUpdateStep] = useState(false);
    const [_updateStepId, setUpdateStepId] = useState(null);
    const [addstepDisabled, setAddstepDisabled] = useState(true)

    // FOR DIALOG
    const [types, setTypes] = useState([])
    const [departments, setDept] = useState([])
    const [members, setMembers] = useState([])
    const [process, setProcess] = useState([]);

    // For Process Members
    const [suggestProcessMembers, setSuggestProcessMembers] = useState([]);
    const [processMembers, setProcessMembers] = useState([]);

    // For Input Whatsapp    

    const [suggestInputWhatsapp, setSuggestInputWhatsapp] = useState([]);
    const [inputWhatsapp, setInputWhatsapp] = useState([]);

    // For Output Whatsapp    

    const [suggestOutputWhatsapp, setSuggestOutputWhatsapp] = useState([]);
    const [outputWhatsapp, setOutputWhatsapp] = useState([]);

    // For Input Document    

    const [suggestInputDocument, setSuggestInputDocument] = useState([]);
    const [inputDocument, setInputDocument] = useState([]);

    // For Output Document    

    const [suggestOutputDocument, setSuggestOutputDocument] = useState([]);
    const [outputDocument, setOutputDocument] = useState([]);

    // For Input Person    

    const [suggestInputPerson, setSuggestInputPerson] = useState([]);
    const [inputPerson, setInputPerson] = useState([]);

    // For Output Person    

    const [suggestOutputPerson, setSuggestOutputPerson] = useState([]);
    const [outputPerson, setOutputPerson] = useState([]);

    const [allStep, setAllStep] = useState([]);
    const [description, setDescription] = useState('');
    const [suggestStepMember, setSuggestStepMember] = useState([]);
    const [saveStepMember, setSaveStepMember] = useState([]);

    const paths = [
        { path: '/admin/processes', title: 'Processes' },
        { path: '/admin/processes/' + params.id, title: 'Processes Details' }
    ]

    useEffect(() => {
        console.log(params)
        getProcessDetails()
        getAllProcessMembers()
        getAllInputWhatsapp()
        getAllOutputWhatsapp()
        getAllInputDocument()
        getAllOutputDocument()
        getAllInputPerson()
        getAllOutputPerson()
        getAllSteps()
    }, [])


    useEffect(() => {
        fetchDepartments()
        fetchTypes()
        fetchProcessesNumbers()
        fetchMembers()
    }, [])

    useEffect(() => {
        return () => {
            console.log("cleaned up");
        };
    }, []);


    const fetchTypes = async () => {
        const response = await get('types')
        if (response) {
            if (response.statusCode == 200) {
                setTypes(response.data)
            }
        }
    }

    const fetchMembers = async () => {
        const response = await get('members?filter={"where": {"memberType": "EMPLOYEE"}}')
        if (response) {
            if (response.statusCode == 200) {
                setMembers(response.data)

            }
        }
    }


    const fetchProcessesNumbers = async () => {
        const response = await get('processes?filter={"fields": ["id", "processNumber"]}')
        // const response = await get('processes')
        if (response) {
            if (response.statusCode == 200) {
                setProcess(response.data)
            }
        }
    }


    const fetchDepartments = async () => {
        const response = await get('departments')
        if (response) {
            if (response.statusCode == 200) {
                setDept(response.data)
            }
        }
    }

    const getProcessDetails = async () => {
        const getDetaills = await get(`processes/${id}?filter={"include":["processOwner", "process"]}`);
        if (getDetaills.statusCode >= 200 && getDetaills.statusCode < 300) {
            console.log(getDetaills?.data)
            setProcessDetail(getDetaills.data);
            setProcessOwner(getDetaills.data.inputSourceSelf)
        }
        else {
            console.log('Process Detail Not FOund')
        }
    }

    const getSearchQueryProcessMembers = async (text, memberList) => {
        const alreadyMember = memberList.map(e => e.member.id);

        let filter = `members?filter={"where":{"name":{"regexp":"/${text}/i"}}}`;
        // let filter =`processes/${params.id}/personProcess?filter={"include":"member"}`

        const whatsap = await get(filter);
        if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
            console.log("Fetch suggested Members", whatsap);
            let dataMember = [...whatsap.data];
            console.log(dataMember)
            let filtered = []
            console.log(alreadyMember)
            console.log(processMembers)
            dataMember = dataMember.filter((e) => !alreadyMember.includes(e.id))
            console.log(dataMember)
            setSuggestProcessMembers(dataMember);
        } else {
            console.log('Fetch Whatsapp member')
        }
    }

    const getAllProcessMembers = async () => {
        const allProcessMembers = await get(`processMembers?filter={"where":{"processId":"${id}"},"include":"member"}`);
        if (allProcessMembers.statusCode >= 200 && allProcessMembers.statusCode < 300) {
            setProcessMembers(allProcessMembers.data);
            getSearchQueryProcessMembers('', allProcessMembers.data);
        }
        else {
            console.log('Process Members Not FOund')
        }
    }

    async function patchProcessOwner(self) {
        const changeProcessOwner = await patch(`processes/${id}`, { inputSourceSelf: self });
        if (changeProcessOwner.statusCode >= 200 && changeProcessOwner.statusCode < 300) {
            console.log('Process Owner')
            getProcessDetails()
        } else {
            console.log('failed to update processOwner')
        }
    }

    const getAllInputWhatsapp = async () => {
        const inputswhatsap = await get(`whatsappProcesses?filter={"where":{"processId":"${id}","source":"INPUT"},"include":"whatsappGroup"}`);
        if (inputswhatsap.statusCode >= 200 && inputswhatsap.statusCode < 300) {
            setInputWhatsapp(inputswhatsap.data);
            getSearchQueryInputWhatsapp('', inputswhatsap.data);
        }
        else {
            console.log('Process Input Whtsapp Not FOund')
        }
    }

    const getAllOutputWhatsapp = async () => {
        const outputswhatsap = await get(`whatsappProcesses?filter={"where":{"processId":"${id}","source":"OUTPUT"},"include":"whatsappGroup"}`);
        if (outputswhatsap.statusCode >= 200 && outputswhatsap.statusCode < 300) {
            setOutputWhatsapp(outputswhatsap.data);
            getSearchQueryOutputWhatsapp('', outputswhatsap.data);
        }
        else {
            console.log('Process Input Whtsapp Not FOund')
        }
    }

    const getSearchQueryInputWhatsapp = async (text, groupList) => {
        const alreadyGroup = groupList.map(e => e.whatsappGroup?.id);
        let filter = `whatsappGroups?filter={"where":{"name":{"regexp":"/${text}/i"},"deleted": {"neq": true}}}`;
        const whatsap = await get(filter);
        if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
            // console.log("Fetch suggested Members", whatsap.data);
            let dataMember = [...whatsap.data];
            console.log(alreadyGroup)
            dataMember = dataMember.filter((e) => !alreadyGroup.includes(e.id))
            console.log(dataMember)
            setSuggestInputWhatsapp(dataMember);
        } else {
            console.log('Failed fetching whatsapp Group')
        }
    }

    const getSearchQueryOutputWhatsapp = async (text, groupList) => {
        const alreadyGroup = groupList.map(e => e.whatsappGroup.id);
        let filter = `whatsappGroups?filter={"where":{"name":{"regexp":"/${text}/i"},"deleted":{"neq": true}}}`;
        const whatsap = await get(filter);
        if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
            // console.log("Fetch suggested Members", whatsap.data);
            let dataMember = [...whatsap.data];
            console.log(alreadyGroup)
            dataMember = dataMember.filter((e) => !alreadyGroup.includes(e.id))
            console.log(dataMember)
            setSuggestOutputWhatsapp(dataMember);
        } else {
            console.log('Failed fetching whatsapp Group')
        }
    }


    const getAllInputDocument = async () => {
        const inputsdocument = await get(`documentProcesses?filter={"where":{"processId":"${id}","source":"INPUT"},"include":"document"}`);
        if (inputsdocument.statusCode >= 200 && inputsdocument.statusCode < 300) {
            setInputDocument(inputsdocument.data);
            getSearchQueryInputDocument('', inputsdocument.data);
        }
        else {
            console.log('Process Input Whtsapp Not FOund')
        }
    }

    const getAllOutputDocument = async () => {
        const outputsdocument = await get(`documentProcesses?filter={"where":{"processId":"${id}","source":"OUTPUT"},"include":"document"}`);
        if (outputsdocument.statusCode >= 200 && outputsdocument.statusCode < 300) {
            setOutputDocument(outputsdocument.data);
            getSearchQueryOutputDocument('', outputsdocument.data);
        }
        else {
            console.log('Process Input Whtsapp Not FOund')
        }
    }

    const getSearchQueryInputDocument = async (text, groupList) => {
        const alreadyGroup = groupList.map(e => e?.document?.id);
        let filter = `documents?filter={"where":{"name":{"regexp":"/${text}/i"},"deleted": {"neq": true}}}`;
        const documents = await get(filter);
        if (documents.statusCode >= 200 && documents.statusCode < 300) {
            // console.log("Fetch suggested Members", whatsap.data);
            let dataMember = [...documents.data];
            console.log(alreadyGroup)
            dataMember = dataMember.filter((e) => !alreadyGroup.includes(e.id))
            console.log(dataMember)
            setSuggestInputDocument(dataMember);
        } else {
            console.log('Failed fetching whatsapp Group')
        }
    }

    const getSearchQueryOutputDocument = async (text, groupList) => {
        const alreadyGroup = groupList.map(e => e.document.id);
        let filter = `documents?filter={"where":{"name":{"regexp":"/${text}/i"},"deleted": {"neq": true}}}`;
        const documents = await get(filter);
        if (documents.statusCode >= 200 && documents.statusCode < 300) {
            // console.log("Fetch suggested Members", whatsap.data);
            let dataMember = [...documents.data];
            console.log(alreadyGroup)
            dataMember = dataMember.filter((e) => !alreadyGroup.includes(e.id))
            console.log(dataMember)
            setSuggestOutputDocument(dataMember);
        } else {
            console.log('Failed fetching whatsapp Group')
        }
    }

    const getAllInputPerson = async () => {
        const inputsperson = await get(`personProcesses?filter={"where":{"processId":"${id}","source":"INPUT"},"include":"member"}`);

        if (inputsperson.statusCode >= 200 && inputsperson.statusCode < 300) {
            setInputPerson(inputsperson.data);
            getSearchQueryInputPerson('', inputsperson.data);
        }
        else {
            console.log('Process Input Person Not FOund')
        }
    }

    const getAllOutputPerson = async () => {
        const outputsperson = await get(`personProcesses?filter={"where":{"processId":"${id}","source":"OUTPUT"},"include":"member"}`);
        if (outputsperson.statusCode >= 200 && outputsperson.statusCode < 300) {
            setOutputPerson(outputsperson.data);
            getSearchQueryOutputPerson('', outputsperson.data);
        }
        else {
            console.log('Process Output Whtsapp Not Found')
        }
    }

    const getSearchQueryInputPerson = async (text, groupList) => {
        const alreadyGroup = groupList.map(e => e?.member?.id);
        let filter = `members?filter={"where":{"name":{"regexp":"/${text}/i"},"deleted": {"neq": true}}}`;
        const members = await get(filter);
        if (members.statusCode >= 200 && members.statusCode < 300) {
            // console.log("Fetch suggested Members", whatsap.data);
            let dataMember = [...members.data];
            console.log(alreadyGroup)
            dataMember = dataMember.filter((e) => !alreadyGroup.includes(e.id))
            console.log(dataMember)
            setSuggestInputPerson(dataMember);
        } else {
            console.log('Failed fetching Input Person')
        }


    }

    const getSearchQueryOutputPerson = async (text, groupList) => {
        const alreadyGroup = groupList.map(e => e?.member?.id);
        let filter = `members?filter={"where":{"name":{"regexp":"/${text}/i"},"deleted": {"neq": true}}}`;
        const members = await get(filter);
        if (members.statusCode >= 200 && members.statusCode < 300) {
            // console.log("Fetch suggested Members", whatsap.data);
            let dataMember = [...members.data];
            console.log(alreadyGroup)
            dataMember = dataMember.filter((e) => !alreadyGroup.includes(e.id))
            // dataMember=dataMember.filter((e)=>{
            //     processMembers.includes(e)
            // })



            console.log("datamemeber" + dataMember)
            setSuggestOutputPerson(dataMember);
        } else {
            console.log('Failed fetching Output Person')
        }
    }

    const getAllSteps = async () => {
        setAllStep([])
        const getSteps = await get(`steps?filter={"where":{"processId":"${id}"},"order":"createdAt ASC", "include": "stepMember"}`);
        if (getSteps.statusCode >= 200 && getSteps.statusCode < 300) {
            let step = [...getSteps.data];
            for (let i = 0; i < step.length; i++) {
                let memberStep = await get(`stepsMembers?filter={"where":{"stepId":"${step[i].id}"},"include":"member"}`);
                if (memberStep.statusCode >= 200 && memberStep.statusCode < 300) {
                    let memStep = memberStep.data.map(e => {
                        return {
                            name: e.member.name, code: e.member.employeeCode, position: e.member.designation,
                            type: e.member.memberType, memberid: e.member.id, id: e.id, stepId: step[i].id, profile: e.member.profile
                        }
                    })
                    step[i]['member'] = memStep;
                }
            }
            suggestQueryStepMembers('', [])
            setAllStep(step);
        }

    }

    async function suggestQueryStepMembers(text, memberList) {
        console.log(memberList)
        if (memberList.length && description.length) {
            setAddstepDisabled(false);
        }
        else {

            setAddstepDisabled(true);
        }
        const alreadyGroup = memberList.map(e => e?.id);
        console.log(memberList)
        console.log(alreadyGroup)
        // let filter = `members?filter={"where":{"name":{"regexp":"/${text}/i"},"deleted": {"neq": true}}}`;
        let filter = `processMembers?filter={"where": {"processId": "${params.id}"},"include": "member"}`
        const members = await get(filter);
        console.log(members)
        let newDataMember = members?.data.map((m) => {
            return m['member']
        })

        if (members.statusCode >= 200 && members.statusCode < 300 && newDataMember) {
            console.log("Fetch suggested Members", [members?.data[0]['member']]);
            console.log(newDataMember)
            let dataMember = [...newDataMember]
            console.log(alreadyGroup)
            dataMember = dataMember.filter((e) => !alreadyGroup.includes(e.id))
            console.log(dataMember, alreadyGroup)
            setSuggestStepMember(dataMember);
        } else {
            console.log('Failed fetching Output Person')
        }
    }

    const pushStepmember = (mem) => {
        let memArr = [...saveStepMember];
        console.log(mem)
        memArr.push({ ...mem });
        setSaveStepMember(memArr)
        console.log(memArr)
        suggestQueryStepMembers('', memArr)
    }

    const popStepmember = (index) => {
        let memArr = [...saveStepMember];
        memArr.splice(index, 1)
        setSaveStepMember(memArr)
        suggestQueryStepMembers('', memArr)
    }

    const checkSuggest = (variable, e) => {
        console.log(e)
        // alert(variable)
        if (variable == 'processMember') {
            getSearchQueryProcessMembers(e, processMembers);
        }
        else if (variable == 'input-whatsapp') {
            getSearchQueryInputWhatsapp(e, inputWhatsapp);
        }
        else if (variable == 'output-whatsapp') {
            getSearchQueryOutputWhatsapp(e, outputWhatsapp);
        }
        else if (variable == 'input-document') {
            getSearchQueryInputDocument(e, inputDocument);
        }
        else if (variable == 'output-document') {
            getSearchQueryOutputDocument(e, outputDocument);
        }
        else if (variable == 'input-person') {
            getSearchQueryInputPerson(e, inputPerson);
        }
        else if (variable == 'output-person') {
            getSearchQueryOutputPerson(e, outputPerson);
        }
        else if (variable == 'step') {
            // alert('it is called')
            suggestQueryStepMembers(e, saveStepMember);
        }
    }


    const updatesteps = async () => {
        try {
            if (description) {
                const body = { description: description, processId: id }
                const res = await patch(`steps/${_updateStepId}`, body);
                if (res) {
                    console.log(saveStepMember)
                    if (saveStepMember.length > 0) {
                        const membersData = saveStepMember.map((member) => {
                            return { stepId: _updateStepId, memberId: member.id }
                        })
                        for (let index = 0; index < membersData.length; index++) {
                            const _member = membersData[index];
                            let where = JSON.stringify(_member)
                            const res = await post(`stepsMembers/upsertWithWhere?where=${where}`, _member);
                            console.log(res)
                            if (index === membersData.length - 1) {
                                getAllSteps()
                                setUpdateStepId(null)
                                setDescription('')
                                setSaveStepMember([])
                            }
                        }
                    }
                    else {
                        setUpdateStepId(null)
                        setSaveStepMember([])
                        setDescription('')
                        getAllSteps()
                    }
                }
                else {
                    setDescription('')
                    setSaveStepMember([])
                    setUpdateStepId(null)
                }

            }

            // const getSteps = await get(`steps?filter={"where":{"processId":"${id}"},"order":"createdAt ASC", "include": "stepMember"}`);
            // if (getSteps.statusCode >= 200 && getSteps.statusCode < 300) {
            //     let step = [...getSteps.data];
            //     setAllStep(step);
            // }




        }
        catch (err) {
            console.log(err)
        }







    }

    const addSteps = async () => {
        const addStep = await post(`steps`, { description: description, processId: id });
        console.log(addStep.data)
        if (addStep.statusCode >= 200 && addStep.statusCode < 300) {
            let StepData = addStep.data;
            let stepData_DB = saveStepMember.map(e => {
                return { memberId: e.id, stepId: StepData.id }
            })
            const addStepMem = await post(`stepsMembers`, stepData_DB);
            console.log("addstepsMem --------------------" + addStepMem)
            if (addStepMem.statusCode >= 200 && addStepMem.statusCode < 300) {
                console.log('Added Step and Step Members');
                setSaveStepMember([]);
                setDescription('');
                getAllSteps();
            }
        }
    }

    const addProcessMember = async (mem) => {
        let addMember = { processId: id, memberId: mem.id, memberType: mem.memberType, source: "Whatsapp" }
        console.log(addMember);
        const whatsap = await post(`processMembers`, addMember);
        if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
            console.log("Members added to process");
            getAllProcessMembers();
        } else {
            console.log('Failed to add process Member')
        }
    }

    const addInput_OutputWhatsapp = async (what, source) => {
        let addGroup = { processId: id, whatsappId: what.id, source: source }
        const whatsap = await post(`whatsappProcesses`, addGroup);
        if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
            console.log("Whatsapp added to process");
            (source == 'INPUT') ? getAllInputWhatsapp() : getAllOutputWhatsapp()

        } else {
            console.log('Failed to add process whatsapp')
        }
    }


    const addInput_OutputDocument = async (doc, source) => {
        let addGroup = { processId: id, documentId: doc.id, source: source }
        const documents = await post(`documentProcesses`, addGroup);
        if (documents.statusCode >= 200 && documents.statusCode < 300) {
            console.log("Documents added to process");
            (source == 'INPUT') ? getAllInputDocument() : getAllOutputDocument()

        } else {
            console.log('Failed to add process Document')
        }
    }

    const addInput_OutputPerson = async (mem, source) => {
        console.log('580000000000' + JSON.stringify(mem), source)

        let memberlist;
        if(source == 'INPUT') {
            memberlist = inputPerson.map(e => {
                return (e.member.id)
            })
        }
        else {
            memberlist = outputPerson.map(e => {
                return (e.member.id)
            })
        }

        
        if (!memberlist.includes(mem.id)) {
            let addMember = { processId: id, memberId: mem.id, source: source }
            const persons = await post(`personProcesses`, addMember);
            if (persons.statusCode >= 200 && persons.statusCode < 300) {
                console.log("Persons added to process");
                (source == 'INPUT') ? getAllInputPerson(mem) : getAllOutputPerson(mem)

            } else {
                console.log('Failed to add process Persons');
            }
        }
        else {
            toaster.warning('member is already there')
        }


    }

    const postProcess = (type, mem) => {
        if (type == "processMember") {
            addProcessMember(mem);
            addSteps();
            setSuggestStepMember([...suggestStepMember, mem])

        }
        else if (type == 'input-whatsapp') {
            addInput_OutputWhatsapp(mem, 'INPUT')
        }
        else if (type == 'output-whatsapp') {
            addInput_OutputWhatsapp(mem, 'OUTPUT')
        }
        else if (type == 'input-document') {
            addInput_OutputDocument(mem, 'INPUT')
        }
        else if (type == 'output-document') {
            addInput_OutputDocument(mem, 'OUTPUT')
        }
        else if (type == 'input-person') {
            addInput_OutputPerson(mem, 'INPUT')
        }
        else if (type == 'output-person') {
            addInput_OutputPerson(mem, 'OUTPUT')
        }
        else if (type == 'step') {
            console.log('hello brother')
            pushStepmember(mem)
        }
    }



    const autoItem = (item, variable) => {
        // const Img = item.children.profile ? `${baseUrl}photos/${item.children.memberType?.toLowerCase()}/download/${item.children.profile}` : ''
        return (
            <div key={item.children.name} onClick={() => {
                console.log('items is here', item.children, variable);
                postProcess(variable, item.children)
            }}  >
                <AvatarList
                    name={item.children.name}
                    description={item.children.designation || ''}
                    action={false}
                    _item={item}
                />

            </div>

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
                onChange={(changedItem) => {

                    postProcess(myProps.variable, changedItem);



                }}
                items={myProps.datasource}

                itemToString={(item) => {
                    return item ?
                        item.memberType ? (`${item?.name} (${item?.memberType})`) : `${item?.name}`
                        : ''
                }}
                itemSize={50}
                popoverMaxHeight={200}
                itemsFilter={(item, text) => filterAutoComplete(item, text)}
                onInputValueChange={changedItem => {
                    console.log(changedItem)

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
                    <Pane key={key} style={{ marginTop: 16 }} ref={getRef} display="flex">
                        <TextInput className='w-full relative bottom-2'
                            flex="1"
                            value={inputValue || myProps.value}
                            height={50}
                            placeholder={myProps.placeholder}
                            onFocus={openMenu}
                            onChange={(e) => { myProps.inputChange(e); checkSuggest(myProps.variable, e.target.value) }}
                            {...getInputProps()}
                        />
                    </Pane>
                )}
            </Autocomplete>
        )
    }

    const updateStep = (step) => {
        console.log(step)
        setUpdateStep(true)
        setUpdateStepId(step.id);
        setDescription(step.description)
    }


    const Steps = (myProps) => {
        // console.log(myProps.datasource)
        return (
            myProps.datasource.map((data, index) => {

                return (<div key={index} className="flex flex-col mb-6">
                    <div className='flex justify-between items-center'>
                        <Heading size={500}>{index + 1}. {data.description}</Heading>
                        <div className='flex items-center'>
                            <IconButton icon={EditIcon} marginRight={2} onClick={() => updateStep(data)} />
                            <IconButton icon={CrossIcon} marginRight={2} onClick={() => removeMember('step', data)} />
                        </div>
                    </div>
                    <div className='flex flex-wrap my-3'>
                        {data.member?.map((member, _index) => {
                            return (
                                <div key={_index} className='mx-2 my-2'>
                                    <AvatarCard
                                        avatar={`${baseUrl}photos/${member?.type?.toLowerCase()}/download/${member?.profile}`}
                                        sendDelete={e => fetchRemovelist('step', index, member)}
                                        name={member.name}
                                        description={member.code ? `${member.code} , ${member.position}` : `${member.position}`}
                                        type={member.type}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>)
            })
        );
    }

    const removeMember = async (type, data, itemia) => {
        let deleteRecord;
        if (type == "step-member") {
            deleteRecord = await deleted(`stepsMembers/${data}`);
        }
        else if (type == "step") {
            console.log(data)
            for (let mem of data.member) {
                let deleteMember = await deleted(`stepsMembers/${mem.id}`);
                if (deleteMember.statusCode > 300) {
                    console.log('failed to delete Member')
                }
            }
            deleteRecord = await deleted(`steps/${data.id}`);

        }
        else if (type == "processMember") {
            deleteRecord = await deleted(`processMembers/${data}`);
            console.log(suggestStepMember)
            console.log('data is ataaaaaa  ', data, itemia);
            let meme = suggestStepMember.find((m) => {
                return (m.id == itemia.member.id)
            })
            console.log(meme, suggestStepMember.indexOf(meme))
            let newsuggestions = suggestStepMember
            newsuggestions.splice(suggestStepMember.indexOf(meme), 1);
            setSuggestStepMember(newsuggestions);

        }
        else if (type == "processPerson") {
            deleteRecord = await deleted(`personProcesses/${data}`);
        }
        else if (type == "whatsappProcess") {
            deleteRecord = await deleted(`whatsappProcesses/${data}`);
        }
        else if (type == "documentProcess") {
            deleteRecord = await deleted(`documentProcesses/${data}`);
        }

        if (deleteRecord?.statusCode >= 200 && deleteRecord?.statusCode < 300) {
            if (type == "step-member") {
                getAllSteps()
            }
            else if (type == 'step') {
                getAllSteps();
            }
            else if (type == 'processMember') {
                getAllProcessMembers()

            }
            else if (type == 'processPerson') {
                getAllInputPerson();
                getAllOutputPerson()
            }
            else if (type == 'whatsappProcess') {
                getAllOutputWhatsapp()
                getAllInputWhatsapp()
            }
            else if (type == 'documentProcess') {
                getAllInputDocument()
                getAllOutputDocument()

            }
            console.log('Success Delete')
        }
    }


    async function fetchRemovelist(type, ind, mem) {
        if (type == "suggestedStep") {
            popStepmember(ind)
            console.log('meep is not better than perry the platipuss', mem)

        }
        else if (type == "step") {
            removeMember("step-member", mem.id);
            console.log('meep is not better than perry the platipuss', mem)


        }
    }

    const saveProcess = async (form) => {
        console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        console.log({ ...form })
        let process = {};
        for (let i in form) {
            process[`${i}`] = form[i].value ? form[i].value : form[i].value;
        }
        if (process['inputProcess'] == "") {
            process.inputProcess = null
        }
        process['duration'] = `${process['hours']}:${process['minutes']}`;
        process['processNumber'] = `${form['processNoPrefix'] + form['processNumber']['value']}`;
        console.log('nearrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
        console.log(JSON.stringify(process))

        try {
            const response = await patch("processes/" + params.id, process);
            if (response.statusCode === 200) {
                console.log('')
                console.log(response.data)
                toaster.success('Process Updated successfully')
                showUpdate(false)
                getProcessDetails()
            }
            else toaster.danger('Failed to update the process!')
        }
        catch (err) {
            console.log(err)
            toaster.danger('Failed to update the process!')
        }
    }


    const deleteProcess = async () => {
        const response = await patch('processes/' + params.id, { deleted: true })
        if (response.statusCode === 200) {
            toaster.success('Deleted successfully!')
            navigate(-1)
            showDelete(false)
        }
        else toaster.danger('Failed to delete member!')
    }

    return (
        <div className="w-full">
            <TopBar title="Processes" breadscrubs={paths} total='' />
            <Pane className="w-full l-blue" elevation={1} >
                <div className='flex flex-wrap justify-between items-center px-4 py-5'>
                    <div>
                        <Heading size={600}>
                            {processDetail.processNumber}
                        </Heading>
                        <Heading size={400} marginTop={8}>
                            {/* Uploading youtube videos for study app. */}

                            {processDetail.title}
                        </Heading>
                    </div>
                    <div>
                        <Button color="red" onClick={() => showDelete(true)}>Delete</Button>
                        &nbsp;&nbsp;
                        <Button appearance="primary" onClick={() => showUpdate(true)}>Edit</Button>
                    </div>
                </div>
                <hr></hr>
                <div className='flex flex-wrap justify-between items-center px-4 py-5'>
                    <div className='flex items-center'>
                        <Avatar
                            src={`${baseUrl}photos/${processDetail?.processOwner?.memberType?.toLowerCase()}/download/${processDetail?.processOwner?.profile}`}
                            name={processDetail?.processOwner?.name}
                            size={50}
                            marginRight={10}
                        />
                        <div>
                            <Heading size={500}>{processDetail?.processOwner?.name}</Heading>
                            <Text size={300}>{processDetail?.processOwner?.designation}</Text>
                            <Heading size={200}>Process Owner</Heading>
                        </div>
                    </div>
                    {processDetail.process ?
                        <div>
                            <Heading className="primary cursor-pointer" fontWeight={500} size={500} onClick={() => {
                                navigate(`../processes/${processDetail.process.id}`)
                                window.open(window.location.href, '_self')
                            }} >{processDetail.process.processNumber}</Heading>
                            <Text size={300}>{processDetail.process.title} </Text>
                            <Heading size={200}>Input Process</Heading>
                        </div> : null
                    }
                    <div>
                        <Heading size={400}>{processDetail?.frequency}, {processDetail?.hours} hrs {processDetail?.minutes} min</Heading>
                        <Text size={300}>Process Duration</Text>
                    </div>
                    <div>
                        <Heading size={400}>Status</Heading>
                        <Text size={300}>{processDetail.status}</Text>
                    </div>
                </div>
            </Pane>
            <br></br>
            <div className='flex'>
                {/* MEMBERS */}
                <div className='mr-4'>
                    <Heading size={800} marginBottom={10}>MEMBERS</Heading>
                    {processMembers.map((item, index) => {
                        return (
                            <AvatarList
                                avatar={`${baseUrl}photos/${item?.member?.memberType?.toLowerCase()}/download/${item?.member?.profile}`}
                                sendDelete={e => removeMember('processMember', item.id, item)}
                                name={item?.member?.name}
                                description={item?.member?.designation}
                                actionText={item?.member?.memberType}
                                memberId={item?.memberId}
                                memberT={item?.member?.memberType.toLowerCase() + 's'}
                            />
                        )
                    })}
                    <div className='py-3 w-full'>
                        <AutoTextInput
                            datasource={suggestProcessMembers}
                            variable="processMember"
                            placeholder="Add Member"
                            value={newMember}
                            inputChange={(e) => setNewMember(e.target.value)}
                        />
                    </div>
                </div>
                {/* STEPS */}
                <div>
                    <Heading size={800} marginBottom={10}>STEPS</Heading>
                    <Steps
                        datasource={allStep}
                    />
                    {saveStepMember.map((item, index) => {
                        return (
                            <AvatarList
                                sendDelete={e => fetchRemovelist('suggestedStep', index)}
                                avatar={`${baseUrl}photos/${item.memberType?.toLowerCase()}/download/${item.profile}`}
                                name={item?.name}
                                description={item?.designation}
                                actionText={item?.memberType}


                            />
                        )
                    })}
                    <div className='flex py-3 align-middle justify-center m-auto'>
                        <div className='w-1/2 flex align-middle m-auto'>
                            <TextInput className="w-full" height={50} value={description} onChange={e => {
                                setDescription(e.target.value)
                                if (saveStepMember.length && e.target.value) {
                                    console.log(e.target.value, saveStepMember.length);
                                    setAddstepDisabled(false);
                                }
                                else {

                                    setAddstepDisabled(true);
                                }
                            }} placeholder="Enter step description here" />
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className='w-1/2 flex align-middle'>
                            <AutoTextInput
                                datasource={suggestStepMember}
                                placeholder="Add Member"
                                variable="step"
                                value={newMember}
                                inputChange={(e) => {
                                    console.log(description.length)
                                    setNewMember(e.target.value);
                                }}
                            />




                        </div>
                    </div>
                    <div className='flex justify-end py-2'>
                        {_updateStepId ?
                            <Button className="primary" onClick={updatesteps}>
                                Update Step
                            </Button> :
                            <Button className="primary relative right-1 disabled:opacity-50" disabled={addstepDisabled} onClick={addSteps}>
                                Add Step
                            </Button>
                        }
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            {/* INPUT SOURCES */}

            <div>
                <div className='flex flex-wrap justify-between items-center'>
                    <Heading size={800} marginBottom={10}>INPUT SOURCES</Heading>
                    <div className='flex items-center'>
                        <Text size={400}>Process Owner &nbsp; &nbsp;</Text>
                        <Switch checked={processOwner} onChange={(e) => { setProcessOwner(e.target.checked); patchProcessOwner(e.target.checked); console.log(e) }} />
                    </div>
                </div>
                <div className='flex flex-wrap justify-between'>
                    <div>
                        <Text size={400}>Employees & Vendors</Text>
                        <br></br>
                        {inputPerson.map((item, index) => {
                            return (
                                <AvatarList
                                    avatar={`${baseUrl}photos/${item.member?.memberType?.toLowerCase()}/download/${item.member?.profile}`}
                                    name={item?.member?.name}
                                    sendDelete={e => removeMember('processPerson', item.id)}
                                    description={''}
                                    actionText={item.member?.memberType}
                                    memberId={item?.memberId}
                                    memberT={item?.member?.memberType.toLowerCase() + 's'}
                                />
                            )
                        })}
                        <div className='py-3 w-full'>
                            <AutoTextInput
                                datasource={suggestStepMember}
                                placeholder="Add Member and Vendors"
                                variable="input-person"
                                value={newMember}
                                inputChange={(e) => {
                                    console.log(e.target.value)
                                    setNewMember(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <Text size={400}>Whatsapp Groups</Text>
                        <br></br>
                        {inputWhatsapp.map((item, index) => {
                            return (
                                <AvatarList
                                    avatar={waImg}
                                    name={item?.whatsappGroup?.name}
                                    sendDelete={e => removeMember('whatsappProcess', item.id)}
                                    description={''}
                                    actionText={''}
                                    memberId={`${item?.whatsappId}/${item?.whatsappGroup?.name}`}
                                    memberT={`whatsapp-groups`}
                                />
                            )
                        })}

                        <div className='py-3 w-full'>
                            <AutoTextInput
                                datasource={suggestInputWhatsapp}
                                placeholder="Add Whatsapp Groups"
                                variable="input-whatsapp"
                                value={newMember}
                                inputChange={(e) => setNewMember(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <Text size={400}>Documents</Text>
                        <br></br>
                        {inputDocument.map((item, index) => {
                            return (
                                <AvatarList
                                    avatar={docImg}
                                    name={item?.document?.name}
                                    sendDelete={e => removeMember('documentProcess', item.id)}
                                    description={''}
                                    actionText={''}
                                    memberId={`${item?.documentId}/${item?.document?.name}`}
                                    memberT={`documents`}
                                />
                            )
                        })}

                        <div className='py-3 w-full'>
                            <AutoTextInput
                                datasource={suggestInputDocument}
                                placeholder="Add Documents"
                                value={newMember}
                                variable="input-document"
                                inputChange={(e) => setNewMember(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <br></br>
                <Heading size={800} marginBottom={10}>OUTPUT SOURCES</Heading>
                <div className='flex flex-wrap justify-between'>
                    <div>
                        <Text size={400}>Employees & Vendors</Text>
                        <br></br>
                        {outputPerson.map((item, index) => {
                            return (
                                <AvatarList
                                    avatar={`${baseUrl}photos/${item.member?.memberType?.toLowerCase()}/download/${item.member?.profile}`}
                                    name={item?.member?.name}
                                    sendDelete={e => removeMember('processPerson', item.id)}
                                    description={''}
                                    actionText={item.member?.memberType}
                                    memberId={item?.memberId}
                                    memberT={item?.member?.memberType.toLowerCase() + 's'}
                                />
                            )
                        })}
                        <div className='py-3 w-full'>
                            <AutoTextInput
                                datasource={suggestStepMember}
                                variable="output-person"
                                placeholder="Add Employees and Vendors"
                                value={newMember}
                                inputChange={(e) => setNewMember(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <Text size={400}>Whatsapp Groups</Text>
                        <br></br>
                        {outputWhatsapp.map((item, index) => {
                            return (
                                <AvatarList
                                    avatar={waImg}
                                    sendDelete={e => removeMember('whatsappProcess', item.id)}
                                    name={item?.whatsappGroup?.name}
                                    description={''}
                                    actionText={''}
                                    memberId={`${item?.whatsappId}/${item?.whatsappGroup?.name}`}
                                    memberT={`whatsapp-groups`}
                                />
                            )
                        })}
                        <div className='py-3 w-full'>
                            <AutoTextInput
                                datasource={suggestOutputWhatsapp}
                                placeholder="Add Whatsaap Group"
                                variable="output-whatsapp"
                                value={newMember}
                                inputChange={(e) => setNewMember(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <Text size={400}>Documents</Text>
                        <br></br>
                        {outputDocument.map((item, index) => {
                            return (
                                <AvatarList
                                    avatar={docImg}
                                    name={item?.document?.name}
                                    sendDelete={e => removeMember('documentProcess', item.id)}
                                    description={''}
                                    actionText={''}
                                    memberId={`${item?.documentId}/${item?.document?.name}`}
                                    memberT={`documents`}
                                />
                            )
                        })}
                        <div className='py-3 w-full'>
                            <AutoTextInput
                                datasource={suggestOutputDocument}
                                placeholder="Add Documents"
                                variable="output-document"
                                value={newMember}
                                inputChange={(e) => setNewMember(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                {_showDelete ?
                    <PromptDialog
                        open={_showDelete}
                        title={`Process!`}
                        onClose={() => showDelete(false)}
                        onConfirm={() => deleteProcess()}
                        message="Do you really want to delete this process?"
                    /> : null
                }
                {_showUpdate ?
                    <AddProcess
                        open={_showUpdate}
                        data={{ types, members, departments, process, id: params.id }}
                        onClose={(ev) => showUpdate(ev)}
                        inject={processDetail}
                        onSubmit={(form) => { saveProcess(form) }}
                    /> : null

                }
            </div>
        </div>
    );



}


export default ProcessDetails1;
