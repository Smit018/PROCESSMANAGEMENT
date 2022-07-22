import * as React from 'react';
import './Card.css'


export const Card = (props) => {

    return (
        <div className='shadow'>
            <div className='flex justify-between'>
                <div>
                    {props.title}
                </div>
                <div>

                </div>
            </div>
            <br></br>
            <div>
                {props.content}
            </div>
            <br></br>
            <div className='d-flex justify-center items-center'>
                {props.actions}
            </div>
        </div>
    )
}