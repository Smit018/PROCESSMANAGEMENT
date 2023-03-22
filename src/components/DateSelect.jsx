import { CalendarIcon, IconButton } from 'evergreen-ui'
import * as React from 'react'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment'

const DateSelect = (props) => {
    const [date, setDate] = React.useState(new Date(props.date))

    return (
        <div className='px-2'>
            <DatePicker
                selected={date}
                onChange={(date) => { props?.onDateChange(date); setDate(date) }}
                customInput={
                    <div className='bg-white py-2 px-2 flex gap-2 items-center border-gray-200 border rounded'>
                        <p className='text-xs text-gray-500 font-medium mr-16'>{moment(date)?.format('MMM DD, yyyy')}</p>
                        <CalendarIcon color='#757575' size={16}/>
                    </div>
                }
            />
        </div>
    )
}

export default DateSelect;