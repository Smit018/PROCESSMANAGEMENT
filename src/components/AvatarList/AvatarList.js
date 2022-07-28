import { Avatar, CrossIcon, Heading, IconButton, Text, Pane, PeopleIcon, ChevronRightIcon, Switch } from 'evergreen-ui';
import * as React from 'react';
import { DateFormat } from '../../services/dateFormat';

const AvatarList = (props) => {
    return (
        <div className='hover:bg-slate-100 hover:cursor-pointer flex items-center px-4 py-3 shadow rounded'>
            <div className='mr-4'>
                <Avatar size={40} src={props.avatar} />
            </div>
            <div className='flex justify-between items-center w-full'>
                <div>
                    <Heading size={500}>{props.name}</Heading>
                    <Text className='capitalize' size={400}>{props.description}</Text>
                </div>
                <div className='w-6'></div>
                {props.action != false ? (
                    < div className='flex items-center'>
                        {props.actionText ? <Text size={300}>{props.actionText}</Text> : null}
                        &nbsp;&nbsp;
                        <IconButton className='border-hidden outline-none' icon={CrossIcon} />
                    </div>
                ) : null
                }
            </div>
        </div >
    );
}

const AvatarCard = (props) => {
    return (
        <div className='flex items-center px-4 py-3 shadow border rounded relative'>
            <div className='mr-4'>
                <Avatar size={40} src={props.avatar} />
            </div>
            <div className='flex justify-between items-center w-full'>
                <div>
                    <Heading size={500}>{props.name}</Heading>
                    <Text size={400}>{props.description}</Text>
                    <br></br>
                    <Text size={300}>{props.type}</Text>
                </div>
                <IconButton className='border-hidden outline-none absolute right-2 top-2' icon={CrossIcon} />
            </div>
        </div>
    )
}


const ListCard = (props) => {
    return (
        <div className='w-full flex justify-between items-center px-6 py-5 shadow rounded-none'>
            <div className='flex items-center justify-center'>
                <div className='rounded-full bg-slate-200 h-12 w-12 flex items-center justify-center'>
                    {props.icon}
                </div>
                <div className='mr-3'></div>
                <div className='flex flex-col'>
                    <Heading color="#262626" size={500} marginBottom={5}>{props.title}</Heading>
                    <Text color="#66788A" size={300}>{props.subTitle}</Text>
                </div>
            </div>
            <div className='flex justify-end items-center'>
                <Text size={400} color="#424242" marginRight={10}>{props.actionText}</Text>
                <ChevronRightIcon className="primary" />
            </div>
        </div >
    )
}

const ProcessList = (props) => {
    return (
        <div className='w-full flex justify-between items-center px-6 py-5 shadow rounded-none hover:bg-slate-100'>
            <div className='flex flex-col'>
                <Heading color="#262626" size={500} marginBottom={5}>{props.title}</Heading>
                <Text color="#66788A" size={300}>{props.subTitle}</Text>
            </div>
            <div className='flex justify-end items-center'>
                <ChevronRightIcon className="primary" />
            </div>
        </div >
    )
}

const MemberList = (props) => {
    return (
        <div className='w-full flex justify-between items-center px-6 py-5 shadow rounded-none hover:bg-slate-100 relative'>
            <div className='flex flex-col w-52'>
                <Heading color="#262626" size={500} marginBottom={5}>{props.name}</Heading>
                <Text color="#66788A" size={300}>{props.designation}</Text>
                <Text className='capitalize' color="#66788A" size={300}>{props.type?.toLowerCase()}</Text>
            </div>
            <div className='flex justify-end items-center'>
                <div className='flex bottom-1 right-6'>
                    <Text size={300} marginRight={10}>admin</Text>
                    <Switch height={16} checked={props.admin} onClick={(ev) => ev.preventDefault()} onClickCapture={(ev) => {props.switchChange(ev);ev.preventDefault(); }} />
                </div>
                &nbsp;
                &nbsp;
                <IconButton onClick={ev => { ev.preventDefault(); props.onClose() }} className='border-hidden outline-none' icon={CrossIcon} />
                &nbsp;
                &nbsp;
                <ChevronRightIcon className="primary" />
            </div>
        </div >
    )
}



export { AvatarList, AvatarCard, ListCard, ProcessList, MemberList };