import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import './TopBar.css';
import Link from '@mui/material/Link';

import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const topBarButton = `top-btn`


const TopBar = (props) => {

  const add = () => {
    props.addEv(true)
  }

  return (
    <div className="flex justify-between items-center h-16">
      <div role="presentation" onClick={handleClick}>
        {props.breadscrubs && props.breadscrubs.length > 0 ?
          <Breadcrumbs paths={props.breadscrubs} /> : null
        }
      </div>
      {props.filter && props.csv ?
        <div className='flex' role="presentation">
          <button className={topBarButton}>
            <span className="b-label">Filter</span>
            <span className='b-icon'>
              <FilterAltIcon />
            </span>
          </button>
          &nbsp;
          &nbsp;
          &nbsp;
          <button className={topBarButton}>
            <span className="b-label">Download CSV</span>
            <span className='b-icon'>
              <DownloadIcon />
            </span>
          </button>
        </div> : props.add ? <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => add()}>{props.addTitle}</Button> : null
      }
    </div>

  );
}

TopBar.propTypes = {};

TopBar.defaultProps = {};

export default TopBar;
