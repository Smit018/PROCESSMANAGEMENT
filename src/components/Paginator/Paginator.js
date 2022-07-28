import * as React from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'evergreen-ui'


const Paginator = (props) => {
    const _pages = parseInt(props.total)/parseInt(props.limit)
    const totalPages = _pages > Math.floor(_pages) ? Math.floor(_pages) + 1 : Math.floor(_pages)
    console.log(props)
    return (
        <div className='py-2 flex justify-end bg-white border-t h-16 items-center'>
            <Pagination
                page={props.page}
                totalPages={totalPages || 1}
                onPageChange={(e) => props.pageChange(e)}
                onPreviousPage={(e) => props.prev(e)}
                onNextPage={(e) => props.next(e)}>
            </Pagination>
        </div>
    )
}

export default Paginator