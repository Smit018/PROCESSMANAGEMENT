import * as React from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'evergreen-ui'


const Paginator = (props) => {
    const totalPages = Math.floor(parseInt(props.total)/parseInt(props.limit))
    return (
        <div className='py-2 flex justify-end bg-white border-t h-16 items-center'>
            <Pagination
                page={props.page}
                totalPages={totalPages}
                onPageChange={(e) => props.pageChange(e)}
                onPreviousPage={(e) => props.prev(e)}
                onNextPage={(e) => props.next(e)}>
            </Pagination>
        </div>
    )
}

export default Paginator