import React from 'react'
import ProcessCard from './ProcessCard'
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import { useState } from 'react';
import { getTableBodyUtilityClass } from '@mui/material';


const ProcessMatrixBox = (props) => {
    const [cardref,setCardRef]=useState('')

    let handleClick=(p)=>{
        props.clickProcess(p.id,props.id);
        console.log(p.id);
    }



    return (
        <div>
    {props.datasource ? props.datasource?.map((p, index) => {
    return (
         <div onClick={()=>{
            handleClick(p);
            // document.body.style.width>window.screen.width?document.body.scrollLeft='100%':null;
         }}  
         className='shadow-sm m-auto w-full overflow-x-hidden
                    p-2 h-fit bg-gray-100 cursor-pointer hover:shadow my-2 rounded-md'
                    id={p.id}  key={index}>
        <ProcessCard key={index}  index={index}  p={p} className="w-full overflow-clip"/>
         </div>
            )
                        
            }) : null}
        </div>
    )
}

export default ProcessMatrixBox
