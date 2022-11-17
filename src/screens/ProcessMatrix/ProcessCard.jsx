import React from 'react'





export default function ProcessCard(props) {


  return (
    <div>
          <p>{props.p.title}</p>
         
          <p className='text-blue-800'>{props.p.processNumber}</p>
    </div>
  )
}
