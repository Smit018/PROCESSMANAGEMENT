import * as React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'evergreen-ui'



export const Breadcrumbs = (props) => {
    return (
        <div className='flex'>
            {props.paths.map((path, index) => {
                return (
                    <Link key={index} to={path.path}>
                        <div className='flex justify-center items-center m-label breadcrumb'> <span className={`nav-title text-${path.color || 'black'}-500`}>{props.total? `${path.title}(${props.total})`:`${path.title}`}</span> {(index < props.paths.length - 1) ? <ChevronRightIcon /> : null} </div>
                    </Link>
                )
            })}
        </div>
    )
}