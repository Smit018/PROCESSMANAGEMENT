import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Process.module.css';
import TopBar from '../../components/TopBar/TopBar';
import AddProcess from '../../dialogs/AddProcess/AddProcess';
import { get, post } from '../../services/https.service';
import { useParams } from 'react-router-dom';
import { Pane, Text, Avatar, Button, Heading, TextInput, Autocomplete, Switch, IconButton, CrossIcon, EditIcon } from 'evergreen-ui';
import { AvatarList, AvatarCard } from '../../components/AvatarList/AvatarList';

const ImageURL = `http://142.93.212.14:3200/api/photos/employee/download/bee828d8-7fcd-4bbd-8b25-ae2aab884a8a.png`

const ProcessDetails1 = () => {
    const pathArray = window.location.pathname.split('/');
    const id = pathArray[3]
    const params = useParams();
    const [processId, setProcessId] = useState('');
    const [processDetail,setProcessDetail] = useState({})
    const [newMember, setNewMember] = useState('')
    const [newWaGroup, setNewWaGroup] = useState('')
    const [newDocument, setNewDocument] = useState('')
    const [processOwner, setProcessOwner] = useState('');

// For Process Members
    const [suggestProcessMembers, setSuggestProcessMembers] = useState([]);
    const [processMembers, setProcessMembers] = useState([]);

// For Input Whatsapp    

    const [suggestInputWhatsapp, setSuggestInputWhatsapp] = useState([]);
    const [inputWhatsapp, setInputWhatsapp] = useState([]);

// For Output Whatsapp    

    const [suggestOutputWhatsapp, setSuggestOutputWhatsapp] = useState([]);
    const [outputWhatsapp, setOutputWhatsapp] = useState([]);

// For Input Whatsapp    

    const [suggestInputDocument, setSuggestInputDocument] = useState([]);
    const [inputDocument, setInputDocument] = useState([]);

// For Output Whatsapp    

    const [suggestOutputDocument, setSuggestOutputDocument] = useState([]);
    const [outputDocument, setOutputDocument] = useState([]);

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
    }, [])

    const  getProcessDetails= async ()=>{
        const getDetaills = await get(`processes/${id}?filter={"include":["processOwner"]}`);
        if(getDetaills.statusCode>=200 && getDetaills.statusCode<300){
            setProcessDetail(getDetaills.data);
        }
        else{
            console.log('Process Detail Not FOund')
        }
    }

    const getSearchQueryProcessMembers =async(text,memberList)=>{
        const alreadyMember = memberList.map(e=>e.member.id);
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

    const getAllProcessMembers =async ()=>{
        const allProcessMembers = await get(`processMembers?filter={"where":{"processId":"${id}"},"include":"member"}`);
        if(allProcessMembers.statusCode>=200 && allProcessMembers.statusCode<300){
            setProcessMembers(allProcessMembers.data);
            getSearchQueryProcessMembers('',allProcessMembers.data);
        }
        else{
            console.log('Process Members Not FOund')
        }
    }

    const getAllInputWhatsapp =async ()=>{
        const inputswhatsap = await get(`whatsappProcesses?filter={"where":{"processId":"${id}","source":"INPUT"},"include":"whatsappGroup"}`);
        if(inputswhatsap.statusCode>=200 && inputswhatsap.statusCode<300){
            setInputWhatsapp(inputswhatsap.data);
            getSearchQueryInputWhatsapp('',inputswhatsap.data);
        }
        else{
            console.log('Process Input Whtsapp Not FOund')
        }
    }

    const getAllOutputWhatsapp =async ()=>{
        const outputswhatsap = await get(`whatsappProcesses?filter={"where":{"processId":"${id}","source":"OUTPUT"},"include":"whatsappGroup"}`);
        if(outputswhatsap.statusCode>=200 && outputswhatsap.statusCode<300){
            setOutputWhatsapp(outputswhatsap.data);
            getSearchQueryOutputWhatsapp('',outputswhatsap.data);
        }
        else{
            console.log('Process Input Whtsapp Not FOund')
        }
    }

    const getSearchQueryInputWhatsapp =async(text,groupList)=>{
        const alreadyGroup = groupList.map(e=>e.whatsappGroup.id);
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

    const getSearchQueryOutputWhatsapp =async(text,groupList)=>{
        const alreadyGroup = groupList.map(e=>e.whatsappGroup.id);
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


    const getAllInputDocument =async ()=>{
        const inputsdocument = await get(`documentProcesses?filter={"where":{"processId":"${id}","source":"INPUT"},"include":"document"}`);
        if(inputsdocument.statusCode>=200 && inputsdocument.statusCode<300){
            setInputDocument(inputsdocument.data);
            getSearchQueryInputDocument('',inputsdocument.data);
        }
        else{
            console.log('Process Input Whtsapp Not FOund')
        }
    }

    const getAllOutputDocument =async ()=>{
        const outputsdocument = await get(`documentProcesses?filter={"where":{"processId":"${id}","source":"OUTPUT"},"include":"document"}`);
        if(outputsdocument.statusCode>=200 && outputsdocument.statusCode<300){
            setOutputDocument(outputsdocument.data);
            getSearchQueryOutputDocument('',outputsdocument.data);
        }
        else{
            console.log('Process Input Whtsapp Not FOund')
        }
    }

    const getSearchQueryInputDocument =async(text,groupList)=>{
        const alreadyGroup = groupList.map(e=>e.document.id);
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

    const getSearchQueryOutputDocument =async(text,groupList)=>{
        const alreadyGroup = groupList.map(e=>e.document.id);
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

    const checkSuggest = (variable,e)=>{
        console.log(e)
        if(variable=='processMember'){
            getSearchQueryProcessMembers(e,processMembers);
        }
        else if(variable=='input-whatsapp'){
            getSearchQueryInputWhatsapp(e,inputWhatsapp);
        }
        else if(variable=='output-whatsapp'){
            getSearchQueryOutputWhatsapp(e,outputWhatsapp);
        }
        else if(variable=='input-document'){
            getSearchQueryInputDocument(e,inputDocument);
        }
        else if(variable=='output-document'){
            getSearchQueryOutputDocument(e,outputDocument);
        }
    }

    const addProcessMember = async (mem)=>{
        let addMember = { processId: id, memberId: mem.id, memberType:mem.memberType, source:"Whatsapp" }
        const whatsap = await post(`processMembers`, addMember);
        if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
            console.log("Members added to process");
            getAllProcessMembers();
        } else {
            console.log('Failed to add process Member')
        }
    }

    const addInput_OutputWhatsapp = async (what,source)=>{
        let addGroup = { processId: id, whatsappId: what.id, source:source }
        const whatsap = await post(`whatsappProcesses`, addGroup);
        if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
            console.log("Whatsapp added to process");
            (source=='INPUT')?getAllInputWhatsapp():getAllOutputWhatsapp()
            
        } else {
            console.log('Failed to add process whatsapp')
        }
    }

    const addInput_OutputDocument = async (doc,source)=>{
        let addGroup = { processId: id, documentId: doc.id, source:source }
        const documents = await post(`documentProcesses`, addGroup);
        if (documents.statusCode >= 200 && documents.statusCode < 300) {
            console.log("Documents added to process");
            (source=='INPUT')?getAllInputDocument():getAllOutputDocument()
            
        } else {
            console.log('Failed to add process Document')
        }
    }

    const postProcess = (type,mem)=>{
        if(type=="processMember"){
            addProcessMember(mem);
        }
        else if(type=='input-whatsapp'){
            addInput_OutputWhatsapp(mem,'INPUT')
        }
        else if(type=='output-whatsapp'){
            addInput_OutputWhatsapp(mem,'OUTPUT')
        }
        else if(type=='input-document'){
            addInput_OutputDocument(mem,'INPUT')
        }
        else if(type=='output-document'){
            addInput_OutputDocument(mem,'OUTPUT')
        }
    }


    const autoItem = (item,variable) => {
        return (
            <span key={item.children.name} onClick={() => {console.log('items', item.children,variable);postProcess(variable,item.children)}}>
                <AvatarList
                    avatar={ImageURL}
                    name={item.children.name}
                    description={item.children.designation||''}
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
                renderItem={(item, index) => autoItem(item,myProps.variable)}
                itemSize={75}
                itemsFilter={(item, text) => filterAutoComplete(item, text)}
                onInputValueChange={changedItem => {console.log(changedItem)
                    checkSuggest(myProps.variable,changedItem)
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
                            onChange={(e) => {myProps.inputChange(e);checkSuggest(myProps.variable,e.target.value)}}
                            {...getInputProps()}
                        />
                    </Pane>
                )}
            </Autocomplete>
        )
    }


    const Steps = (myProps) => {
        return (
            myProps.datasource.map((data, index) => {
                return (<div key={index} className="flex flex-col mb-6">
                    <div className='flex justify-between items-center'>
                        <Heading size={500}>{index + 1}. {data.description}</Heading>
                        <div className='flex items-center'>
                            <IconButton icon={EditIcon} marginRight={2} />
                            <IconButton icon={CrossIcon} marginRight={2} />
                        </div>
                    </div>
                    <div className='flex flex-wrap my-3'>
                        {data.member.map((member, _index) => {
                            return (
                                <div key={_index} className='mx-2 my-2'>
                                    <AvatarCard
                                        avatar={ImageURL}
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
                        <Button color="red">Delete</Button>
                        &nbsp;&nbsp;
                        <Button appearance="primary">Edit</Button>
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
                    <div>
                        <Heading className="primary" fontWeight={500} size={500}>OPSMM012</Heading>
                        <Text size={300}>Change the delivery status of students to whom the book has been delivered.</Text>
                        <Heading size={200}>Input Process</Heading>
                    </div>
                    <div>
                        <Heading size={400}>{processDetail?.frequency}, {processDetail?.hours} hrs {processDetail?.minutes} min</Heading>
                        <Text size={300}>Process Duration</Text>
                    </div>
                    <div>
                        <Heading size={400} marginBottom={10}>In Progress</Heading>
                        <progress id="file" value="32" max="100"> 32% </progress>
                    </div>
                </div>
            </Pane>
            <br></br>
            <div className='flex'>
                {/* MEMBERS */}
                <div className='mr-4'>
                    <Heading size={800} marginBottom={10}>MEMBERS</Heading>
                    {processMembers.map((item,index)=>{
                        return(
                            <AvatarList
                        avatar={ImageURL}
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
                        datasource={steps}
                    />
                    <div className='flex'>
                        <div className='w-1/2'>
                            <TextInput className="w-full" height={50} placeholder="Enter step description here" />
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className='w-1/2'>
                            <AutoTextInput
                                datasource={datasource}
                                placeholder="Add Member"
                                value={newMember}
                                inputChange={(e) => setNewMember(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex justify-end py-2'>
                        <Button className="primary">
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
                    <AvatarList
                        avatar={ImageURL}
                        name="Rajiv Ranjan"
                        description="Product Manager"
                        actionText="Employee"
                    />
                    <div className='py-3 w-full'>
                        <AutoTextInput
                            datasource={datasource}
                            placeholder="Add Member"
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
                    {inputWhatsapp.map((item,index)=>{
                        return(
                            <AvatarList
                        avatar={ImageURL}
                        name={item?.whatsappGroup?.name}
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

                    {inputDocument.map((item,index)=>{
                        return(
                            <AvatarList
                        avatar={ImageURL}
                        name={item?.document?.name}
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
                    <AvatarList
                        avatar={ImageURL}
                        name="Rajiv Ranjan"
                        description="Product Manager"
                        actionText="Employee"
                    />
                    <div className='py-3 w-full'>
                        <AutoTextInput
                            datasource={datasource}
                            placeholder="Add Member"
                            value={newMember}
                            inputChange={(e) => setNewMember(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <Text size={400}>Whatsapp Groups</Text>
                    <br></br>
                    {outputWhatsapp.map((item,index)=>{
                        return(
                            <AvatarList
                        avatar={ImageURL}
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
                    {outputDocument.map((item,index)=>{
                        return(
                            <AvatarList
                        avatar={ImageURL}
                        name={item?.document?.name}
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
        </div>
    );
}


export default ProcessDetails1;



const datasource = [{ name: "hello" }, { name: "world" }, { name: "drek" }, { name: "john" }, { name: "oswald" }, { name: "honey" }]

const steps = [
    {
        description: 'Uploading youtube videos', member: [
            { name: "Rahul Kumar", code: '1025', position: 'Sales Manager', type: 'Employee' }
        ]
    },
    {
        description: 'Add cases via MIS panel', member: [
            { name: "Rahul Kumar", code: '1025', position: 'Sales Manager', type: 'Employee' },
            { name: "Rahul Kumar", code: '1025', position: 'Sales Manager', type: 'Employee' }
        ]
    },
    {
        description: 'Send Payment Links', member: [
            { name: "Rahul Kumar", code: '1025', position: 'Sales Manager', type: 'Employee' },
            { name: "Rahul Kumar", code: '1025', position: 'Sales Manager', type: 'Employee' },
            { name: "Rahul Kumar", code: '1025', position: 'Sales Manager', type: 'Employee' },
            { name: "Rahul Kumar", code: '1025', position: 'Sales Manager', type: 'Employee' }
        ]
    }
]