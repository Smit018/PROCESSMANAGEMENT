import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Process.module.css';
import TopBar from '../../components/TopBar/TopBar';
import AddProcess from '../../dialogs/AddProcess/AddProcess';
import { get } from '../../services/https.service';
import { useParams } from 'react-router-dom';
import { Pane, Text, Avatar, Button, Heading, TextInput, Autocomplete } from 'evergreen-ui';
import AvatarList from '../../components/AvatarList/AvatarList';

const ProcessDetails = () => {
    const params = useParams();
    const [processId, setProcessId] = useState('')
    const [newMember, setNewMember] = useState('')
    const [newWaGroup, setNewWaGroup] = useState('')
    const [newDocument, setNewDocument] = useState('')
    const paths = [
        { path: '/admin/processes', title: 'Processes' },
        { path: '/admin/processes/' + params.id, title: 'Processes Details' }
    ]

    useEffect(() => {
        console.log(params)
    }, [])


    const AutoTextInput = (myProps) => {
        console.log(myProps)
        return (
            <Autocomplete
                onChange={changedItem => console.log(changedItem)}
                items={myProps.datasource}
                itemToString={(item) => { return item ? item.name : '' }}
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
                    <Pane style={{ marginTop: 16 }} key={key} ref={getRef} display="flex">
                        <TextInput
                            flex="1"
                            value={myProps.value}
                            height={50}
                            placeholder={myProps.placeholder}
                            onFocus={openMenu}
                            onChange={(e) => myProps.inputChange(e)}
                            {...getInputProps()}
                        />
                    </Pane>
                )}
            </Autocomplete>
        )
    }

    return (
        <div className="w-full h-full">
            <TopBar title="Processes" breadscrubs={paths} />
            <Pane className="w-full l-blue" elevation={1}>
                <div className='flex justify-between items-center px-4 py-5'>
                    <div>
                        <Heading size={600}>
                            OPLAW101
                        </Heading>
                        <Heading size={400} marginTop={8}>
                            Uploading youtube videos for study app.
                        </Heading>
                    </div>
                    <div>
                        <Button color="red">Delete</Button>
                        &nbsp;&nbsp;
                        <Button appearance="primary">Edit</Button>
                    </div>
                </div>
                <hr></hr>
                <div className='flex justify-between items-center px-4 py-5'>
                    <div className='flex items-center'>
                        <Avatar
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
                            name="Alan Turing"
                            size={50}
                            marginRight={10}
                        />
                        <div>
                            <Heading size={500}>John Doe</Heading>
                            <Text size={300}>Product Manager</Text>
                            <Heading size={200}>Process Owner</Heading>
                        </div>
                    </div>
                    <div>
                        <Heading className="primary" fontWeight={500} size={500}>OPSMM012</Heading>
                        <Text size={300}>Change the delivery status of students to whom the book has been delivered.</Text>
                        <Heading size={200}>Input Process</Heading>
                    </div>
                    <div>
                        <Heading size={400}>Weekly, 47 hrs 30 min</Heading>
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
                <div className='mr-4'>
                    <Heading size={600} marginBottom={10}>MEMBERS</Heading>
                    <AvatarList
                        avatar="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
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
                    <Heading size={600} marginBottom={10}>STEPS</Heading>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Heading size={600} marginBottom={10}>INPUT SOURCES</Heading>
            <div className='flex justify-between'>
                <div>
                    <Text size={400}>Employees & Vendors</Text>
                    <br></br>
                    <AvatarList
                        avatar="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
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
                    <AvatarList
                        avatar="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
                        name="Rajiv Ranjan"
                        description="Product Manager"
                        actionText="Employee"
                    />
                    <AvatarList
                        avatar="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
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
                    <Text size={400}>Documents</Text>
                    <br></br>
                    <AvatarList
                        avatar="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
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
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Heading size={600} marginBottom={10}>OUTPUT SOURCES</Heading>
            <div className='flex justify-between'>
                <div>
                    <Text size={400}>Employees & Vendors</Text>
                    <br></br>
                    <AvatarList
                        avatar="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
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
                    <AvatarList
                        avatar="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
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
                    <Text size={400}>Documents</Text>
                    <br></br>
                    <AvatarList
                        avatar="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
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
            </div>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}


export default ProcessDetails;



const datasource = [{ name: "hello" }, { name: "world" }, { name: "drek" }, { name: "john" }, { name: "oswald" }, { name: "honey" }]