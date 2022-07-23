import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Process.module.css';
import TopBar from '../../components/TopBar/TopBar';
import AddProcess from '../../dialogs/AddProcess/AddProcess';
import { get } from '../../services/https.service';
import { useParams } from 'react-router-dom';
import { SearchInput, Table, Pagination } from 'evergreen-ui';

const ProcessDetails = () => {
    const params = useParams();
    const [processId, setProcessId] = useState('')
    const paths = [
        { path: '/admin/processes', title: 'Processes' },
        { path: '/admin/processes/' + params.id, title: 'Processes Details' }
    ]

    useEffect(() => {
        console.log(params)
    }, [])

    return (
        <div className="w-full h-full">
            <TopBar title="Processes" breadscrubs={paths} />
        </div>
    );
}


export default ProcessDetails;