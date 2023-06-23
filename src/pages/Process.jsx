import { Pagination, Select } from 'evergreen-ui';
import React, { useState, useEffect } from 'react'
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const ProcessPage = (props) => {
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate("/pm/processes/process-details")
    }

    const paths = [
        { path: '/pm/dashboard', title: 'Dashboard' },
        { path: '', title: 'Processes' }
    ];

    const arr = new Array(20).fill(0)

    const ProcessList = (list) => (
        <div onClick={handleClick} className='w-full rounded flex justify-between items-center bg-white px-4 py-5 cursor-pointer hover:bg-stone-50 hover:shadow mb-4'>
            <div className='mr-4'>
                <h2 className='text-lg text-black font-semibold mb-1'>OPLAW101</h2>
                <p className='text-sm text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias, temporibus non. Consequatur voluptate dolore amet nobis porro incidunt, aspernatur sit impedit asperiores adipisci laborum eum recusandae cumque qui quibusdam nulla?</p>
            </div>
            <div className='flex justify-end items-center'>
                <p className='text-xs mr-2'>Owner</p>
                <ChevronRight className='text-blue-600'/>
            </div>
        </div>
    )

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full flex justify-between mb-4'>
                <Breadcrumbs paths={paths} />
                <Select multiple={true} maxWidth={200}>
                    <option value="owner" selected>Owner</option>
                    <option value="member">Member</option>
                </Select>
            </div>
            <div className='flex-1 overflow-auto bg-white'>
                {arr.map((a, i) => (
                    <ProcessList/>
                ))}
            </div>
            <div className='flex justify-end py-2 bg-white'>
                <Pagination page={1} totalPages={5}></Pagination>
            </div>
        </div>
    )
}

export default ProcessPage