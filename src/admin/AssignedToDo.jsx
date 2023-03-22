import * as React from 'react'
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';




const AssignedToDo = (props) => {
    // const params = useParams()

    const paths = [
        { path: '/admin/dashboard', title: 'Dashboard' },
        { path: '', title: 'Assigned To' },
    ];

    // console.log(params)

    return (
        <div className='w-full h-full flex flex-col'>
            <Breadcrumbs paths={paths} />
        </div>
    )
}

export default AssignedToDo