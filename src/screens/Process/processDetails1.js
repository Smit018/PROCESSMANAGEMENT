import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Process.module.css';
import TopBar from '../../components/TopBar/TopBar';
import AddProcess from '../../dialogs/AddProcess/AddProcess';
import { deleted, get, patch, post } from '../../services/https.service';
import { useParams } from 'react-router-dom';
import { Pane, Text, Avatar, Button, Heading, TextInput, Autocomplete, Switch, IconButton, CrossIcon, EditIcon, toaster } from 'evergreen-ui';
import { AvatarList, AvatarCard } from '../../components/AvatarList/AvatarList';
import PromptDialog from '../../dialogs/PromptDialog/PromptDialog'

const ImageURL = `http://142.93.212.14:3200/api/photos/employee/download/bee828d8-7fcd-4bbd-8b25-ae2aab884a8a.png`

const ProcessDetails1 = () => {
    const pathArray = window.location.pathname.split('/');
    const id = pathArray[3]
    const params = useParams();
    const [processId, setProcessId] = useState('');
    const [processDetail, setProcessDetail] = useState({})
    const [newMember, setNewMember] = useState('')
    const [newWaGroup, setNewWaGroup] = useState('')
    const [newDocument, setNewDocument] = useState('')
    const [processOwner, setProcessOwner] = useState('');
    const [_showDelete, showDelete] = useState(false);
    const [_showUpdate, showUpdate] = useState(false);

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
            setProcessDetail(getDetaills.data);
        }
        else {
            console.log('Process Detail Not FOund')
        }
    }

    const getSearchQueryProcessMembers = async (text, memberList) => {
        const alreadyMember = memberList.map(e => e.member.id);
        let filter = `members?filter={"where":{"name":{"regexp":"/${text}/i"},"memberType":"EMPLOYEE"}}`;
        const whatsap = await get(filter);
        if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
            // console.log("Fetch suggested Members", whatsap.data);
            let dataMember = [...whatsap.data];
            let filtered = []
            console.log(alreadyMember)
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
        const alreadyGroup = groupList.map(e => e.whatsappGroup.id);
        let filter = `whatsappGroups?filter={"where":{"name":{"regexp":"/${text}/i"}}}`;
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
        let filter = `whatsappGroups?filter={"where":{"name":{"regexp":"/${text}/i"}}}`;
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
        const alreadyGroup = groupList.map(e => e.document.id);
        let filter = `documents?filter={"where":{"name":{"regexp":"/${text}/i"}}}`;
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
        let filter = `documents?filter={"where":{"name":{"regexp":"/${text}/i"}}}`;
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
        const alreadyGroup = groupList.map(e => e.member.id);
        let filter = `members?filter={"where":{"name":{"regexp":"/${text}/i"}}}`;
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
        const alreadyGroup = groupList.map(e => e.member.id);
        let filter = `members?filter={"where":{"name":{"regexp":"/${text}/i"}}}`;
        const members = await get(filter);
        if (members.statusCode >= 200 && members.statusCode < 300) {
            // console.log("Fetch suggested Members", whatsap.data);
            let dataMember = [...members.data];
            console.log(alreadyGroup)
            dataMember = dataMember.filter((e) => !alreadyGroup.includes(e.id))
            console.log(dataMember)
            setSuggestOutputPerson(dataMember);
        } else {
            console.log('Failed fetching Output Person')
        }
    }

    const getAllSteps = async () => {
        const getSteps = await get(`steps?filter={"where":{"processId":"${id}"},"order":"createdAt ASC"}`);
        if (getSteps.statusCode >= 200 && getSteps.statusCode < 300) {
            let step = [...getSteps.data];
            for (let i = 0; i < step.length; i++) {
                let memberStep = await get(`stepsMembers?filter={"where":{"stepId":"${step[i].id}"},"include":"member"}`);
                if (memberStep.statusCode >= 200 && memberStep.statusCode < 300) {
                    let memStep = memberStep.data.map(e => {
                        return {
                            name: e.member.name, code: e.member.employeeCode, position: e.member.designation,
                            type: e.member.memberType, memberid: e.member.id, id: e.id, stepId: step[i].id
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
        const alreadyGroup = memberList.map(e => e.id);
        let filter = `members?filter={"where":{"name":{"regexp":"/${text}/i"}}}`;
        const members = await get(filter);
        if (members.statusCode >= 200 && members.statusCode < 300) {
            // console.log("Fetch suggested Members", whatsap.data);
            let dataMember = [...members.data];
            console.log(alreadyGroup)
            dataMember = dataMember.filter((e) => !alreadyGroup.includes(e.id))
            console.log(dataMember)
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
            suggestQueryStepMembers(e, saveStepMember);
        }
    }

    const addSteps = async () => {
        const addStep = await post(`steps`, { description: description, processId: id });
        if (addStep.statusCode >= 200 && addStep.statusCode < 300) {
            let StepData = addStep.data;
            let stepData_DB = saveStepMember.map(e => {
                return { memberId: e.id, stepId: StepData.id }
            })
            const addStepMem = await post(`stepsMembers`, stepData_DB);
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
        let addMember = { processId: id, memberId: mem.id, source: source }
        const persons = await post(`personProcesses`, addMember);
        if (persons.statusCode >= 200 && persons.statusCode < 300) {
            console.log("Persons added to process");
            (source == 'INPUT') ? getAllInputPerson() : getAllOutputPerson()

        } else {
            console.log('Failed to add process Persons')
        }
    }

    const postProcess = (type, mem) => {
        if (type == "processMember") {
            addProcessMember(mem);
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
            // console.log(mem)
            pushStepmember(mem)
        }
    }


    const autoItem = (item, variable) => {
        return (
            <span key={item.children.name} onClick={() => { console.log('items', item.children, variable); postProcess(variable, item.children) }}>
                <AvatarList
                    avatar={ImageURL}
                    name={item.children.name}
                    description={item.children.designation || ''}
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
                renderItem={(item, index) => autoItem(item, myProps.variable)}
                itemSize={75}
                itemsFilter={(item, text) => filterAutoComplete(item, text)}
                onInputValueChange={changedItem => {
                    console.log(changedItem)
                    checkSuggest(myProps.variable, changedItem)
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


    const Steps = (myProps) => {
        // console.log(myProps.datasource)
        return (
            myProps.datasource.map((data, index) => {
                return (<div key={index} className="flex flex-col mb-6">
                    <div className='flex justify-between items-center'>
                        <Heading size={500}>{index + 1}. {data.description}</Heading>
                        <div className='flex items-center'>
                            <IconButton icon={EditIcon} marginRight={2} />
                            <IconButton icon={CrossIcon} marginRight={2} onClick={() => removeMember('step', data)} />
                        </div>
                    </div>
                    <div className='flex flex-wrap my-3'>
                        {data.member.map((member, _index) => {
                            return (
                                <div key={_index} className='mx-2 my-2'>
                                    <AvatarCard
                                        avatar={ImageURL}
                                        sendDelete={e => fetchRemovelist('step', index, member)}
                                        name={member.name}
                                        description={`${member.code}, ${member.position}`}
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

    const removeMember = async (type, data) => {
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
                getAllOutputDocument()
                getAllOutputDocument()
            }
            console.log('Success Delete')
        }
    }


    async function fetchRemovelist(type, ind, mem) {
        console.log(mem)
        if (type == "suggestedStep") {
            popStepmember(ind)
        }
        else if (type == "step") {
            removeMember("step-member", mem.id)
        }
    }

    const saveProcess = async (form) => {
        let process = {};
        for (let i in form) {
            process[`${i}`] = form[i].value ? form[i].value.trim() : form[i].value;
        }
        if (process['inputProcess'] == "") {
            delete process.inputProcess
        }
        process['duration'] = `${process['hours']}:${process['minutes']}`;
        process['processNumber'] = `${form['processNoPrefix'] + form['processNumber']['value']}`;
        console.log(process)
        try {
            const response = await patch("processes/" + params.id, process);
            if (response.statusCode === 200) {
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


    return (
        <div className="w-full h-full">
            <TopBar title="Processes" breadscrubs={paths} />
            <Pane className="w-full l-blue" elevation={1}>
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
                            src={ImageURL}
                            name="Alan Turing"
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
                            <Heading className="primary" fontWeight={500} size={500}>{processDetail.process.processNumber}</Heading>
                            <Text size={300}>{processDetail.process.title}</Text>
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
                                avatar={ImageURL}
                                sendDelete={e => removeMember('processMember', item.id)}
                                name={item?.member?.name}
                                description={item?.member?.designation}
                                actionText={item?.member?.memberType}
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
                                avatar={ImageURL}
                                name={item?.name}
                                description={item?.designation}
                                actionText={item?.memberType}
                            />
                        )
                    })}
                    <div className='flex'>
                        <div className='w-1/2'>
                            <TextInput className="w-full" height={50} value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter step description here" />
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className='w-1/2'>
                            <AutoTextInput
                                datasource={suggestStepMember}
                                placeholder="Add Member"
                                variable="step"
                                value={newMember}
                                inputChange={(e) => setNewMember(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex justify-end py-2'>
                        <Button className="primary" onClick={addSteps}>
                            Add Step
                        </Button>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            {/* INPUT SOURCES */}
            <div className='flex flex-wrap justify-between items-center'>
                <Heading size={800} marginBottom={10}>INPUT SOURCES</Heading>
                <div className='flex items-center'>
                    <Text size={400}>Process Owner &nbsp; &nbsp;</Text>
                    <Switch checked={processOwner} onChange={(e) => setProcessOwner(e.target.checked)} />
                </div>
            </div>
            <div className='flex flex-wrap justify-between'>
                <div>
                    <Text size={400}>Employees & Vendors</Text>
                    <br></br>
                    {/* <AvatarList
                        avatar={ImageURL}
                        name="Rajiv Ranjan"
                        description="Product Manager"
                        actionText="Employee"
                    /> */}
                    {inputPerson.map((item, index) => {
                        return (
                            <AvatarList
                                avatar={ImageURL}
                                name={item?.member?.name}
                                sendDelete={e => removeMember('processPerson', item.id)}
                                description={''}
                                actionText={''}
                            />
                        )
                    })}
                    <div className='py-3 w-full'>
                        <AutoTextInput
                            datasource={suggestInputPerson}
                            placeholder="Add Member"
                            variable="input-person"
                            value={newMember}
                            inputChange={(e) => setNewMember(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <Text size={400}>Whatsapp Groups</Text>
                    <br></br>
                    {/* <AvatarList
                        avatar={ImageURL}
                        name="Rajiv Ranjan"
                        description="Product Manager"
                        actionText="Employee"
                    /> */}
                    {inputWhatsapp.map((item, index) => {
                        return (
                            <AvatarList
                                avatar={ImageURL}
                                name={item?.whatsappGroup?.name}
                                sendDelete={e => removeMember('whatsappProcess', item.id)}
                                description={''}
                                actionText={''}
                            />
                        )
                    })}

                    <div className='py-3 w-full'>
                        <AutoTextInput
                            datasource={suggestInputWhatsapp}
                            placeholder="Add Member"
                            variable="input-whatsapp"
                            value={newMember}
                            inputChange={(e) => setNewMember(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <Text size={400}>Documents</Text>
                    <br></br>
                    {/* <AvatarList
                        avatar={ImageURL}
                        name="Rajiv Ranjan"
                        description="Product Manager"
                        actionText="Employee"
                    /> */}

                    {inputDocument.map((item, index) => {
                        return (
                            <AvatarList
                                avatar={ImageURL}
                                name={item?.document?.name}
                                sendDelete={e => removeMember('documentProcess', item.id)}
                                description={''}
                                actionText={''}
                            />
                        )
                    })}

                    <div className='py-3 w-full'>
                        <AutoTextInput
                            datasource={suggestInputDocument}
                            placeholder="Add Member"
                            value={newMember}
                            variable="input-document"
                            inputChange={(e) => setNewMember(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Heading size={800} marginBottom={10}>OUTPUT SOURCES</Heading>
            <div className='flex flex-wrap justify-between'>
                <div>
                    <Text size={400}>Employees & Vendors</Text>
                    <br></br>
                    {/* <AvatarList
                        avatar={ImageURL}
                        name="Rajiv Ranjan"
                        description="Product Manager"
                        actionText="Employee"
                    /> */}
                    {outputPerson.map((item, index) => {
                        return (
                            <AvatarList
                                avatar={ImageURL}
                                name={item?.member?.name}
                                sendDelete={e => removeMember('processPerson', item.id)}
                                description={''}
                                actionText={''}
                            />
                        )
                    })}
                    <div className='py-3 w-full'>
                        <AutoTextInput
                            datasource={suggestOutputPerson}
                            variable="output-person"
                            placeholder="Add Member"
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
                                avatar={ImageURL}
                                sendDelete={e => removeMember('whatsappProcess', item.id)}
                                name={item?.whatsappGroup?.name}
                                description={''}
                                actionText={''}
                            />
                        )
                    })}
                    <div className='py-3 w-full'>
                        <AutoTextInput
                            datasource={suggestOutputWhatsapp}
                            placeholder="Add Member"
                            variable="output-whatsapp"
                            value={newMember}
                            inputChange={(e) => setNewMember(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <Text size={400}>Documents</Text>
                    <br></br>
                    {/* <AvatarList
                        avatar={ImageURL}
                        name="Rajiv Ranjan"
                        description="Product Manager"
                        actionText="Employee"
                    /> */}
                    {outputDocument.map((item, index) => {
                        return (
                            <AvatarList
                                avatar={ImageURL}
                                name={item?.document?.name}
                                sendDelete={e => removeMember('documentProcess', item.id)}
                                description={''}
                                actionText={''}
                            />
                        )
                    })}
                    <div className='py-3 w-full'>
                        <AutoTextInput
                            datasource={suggestOutputDocument}
                            placeholder="Add Member"
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
                    title={`Delete Process!`}
                    onClose={() => showDelete(false)}
                    onConfirm={() => showDelete(false)}
                    message={`Do you really want to delete this process?`}
                /> : null
            }
            {_showUpdate ?
                <AddProcess
                    open={_showUpdate}
                    data={{ types, members, departments, process }}
                    onClose={(ev) => showUpdate(ev)}
                    inject={processDetail}
                    onSubmit={(form) => { saveProcess(form) }}
                /> : null

            }
        </div>
    );
}


export default ProcessDetails1;
