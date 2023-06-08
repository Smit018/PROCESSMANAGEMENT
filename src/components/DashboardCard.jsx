import { AddToArtifactIcon, CalendarIcon, Icon, IconButton } from 'evergreen-ui'
import * as React from 'react'


import moment from 'moment'

const DashboardCard = (props) => {
    const [date, setDate] = React.useState(new Date(props.date))

    return (
        <div className='bg-white flex w-60 md:w-72 lg:w-80 rounded-md shadow-none p-4 hover:bg-gray-100 cursor-pointer' onClick={() => props.click()}>
            <div className='px-4 py-0 flex justify-center items-center'>
                <div className='p-2 rounded relative' style={{backgroundColor: props.color}}>
                    {props.icon}
                    <div className='absolute -right-1 -bottom-1'>{props.dot}</div>
                </div>
            </div>
            <div className='flex-auto px-4 py-0'>
                <p className='text-gray-400 text-xs uppercase mb-1'>{props.title}</p>
                <p className='text-black text-lg'>{props.desc}</p>
            </div>
            <div className='align-middle flex items-center'>
               {props.button}
            </div>
        </div>
    )
}

export default DashboardCard;