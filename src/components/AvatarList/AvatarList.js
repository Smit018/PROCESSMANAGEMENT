import { Avatar, CrossIcon, Heading, IconButton, Text } from 'evergreen-ui';
import * as React from 'react';

const AvatarList = (props) => {
    return (
        <div className='flex items-center px-4 py-3 rounded'>
            <div className='mr-4'>
                <Avatar size={40} src={props.avatar}/>
            </div>
            <div className='flex justify-between items-center w-full'>
                <div>
                    <Heading size={500}>{props.name}</Heading>
                    <Text size={400}>{props.description}</Text>
                </div>
                <div className='w-6'></div>
                <div className='flex items-center'>
                    {props.actionText ? <Text size={300}>{props.actionText}</Text> : null}
                    &nbsp;&nbsp;
                    <IconButton className='border-hidden outline-none' icon={CrossIcon}/>
                </div>
            </div>
        </div>
    );
}

export default AvatarList;