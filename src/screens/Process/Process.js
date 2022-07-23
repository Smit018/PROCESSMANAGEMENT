import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Process.module.css';
import TopBar from '../../components/TopBar/TopBar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchOutlined } from '@mui/icons-material';
import AddProcess from '../../dialogs/AddProcess/AddProcess';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

const Process = () => {
  const [showForm, setShowForm] = useState(false)

  // let showForm = true
  const _setShowForm = (data) => {
    setShowForm(data)
  }

  const paths = [
    { path: '/admin/processes/', title: 'Processes' }
  ]

  return (
    <div className="w-full h-full px-5 py-4">
      <TopBar title="Processes" breadscrubs={paths} add={true} addEv={() => _setShowForm(true)} />
      <br></br>
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        defaultValue=""
        label="Search"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: <InputAdornment position="end"><SearchOutlined color="primary" /></InputAdornment>,
        }}
      />
      <div>
        <AddProcess open={showForm} onClose={(ev) => _setShowForm(ev)} onSubmit={(form) => {console.log(form)}}/>
      </div>
    </div>
  );
}
Process.propTypes = {};

Process.defaultProps = {};

export default Process;
