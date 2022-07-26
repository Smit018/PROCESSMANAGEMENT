import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import './TopBar.css';
import Link from '@mui/material/Link';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DownloadIcon from '@mui/icons-material/Download';




import { Button, AddIcon, SearchInput, SearchIcon, TextInput } from "evergreen-ui";
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

	const searchBar = () => {
		return (
			<div className='search-bar flex mr-4'>
				<div>
					<TextInput height={40} placeholder="Search..." onChange={(e) => props.onSearch(e)} value={props.search} className='l-blue' />
				</div>
				<div className='h-10 rounded flex items-center justify-center px-2 white right'>
					<SearchIcon size={18} className='primary'/>
				</div>
			</div>
		)
	}

	const filterButton = () => {
		return (
			<button className='top-btn mr-4'>
				<span className="b-label l-blue">Filter</span>
				<span className='b-icon'>
					<FilterAltIcon />
				</span>
			</button>
		)
	}

	const downloadButton = () => {
		return (
			<button className='top-btn mr-4'>
				<span className="b-label l-blue">Download CSV</span>
				<span className='b-icon'>
					<DownloadIcon />
				</span>
			</button>
		)
	}

	const addButton = () => {
		return (
			<Button appearance="primary" iconBefore={AddIcon} onClick={() => add()}>{props.addTitle}</Button>
		)
	}

	return (
		<div className="flex flex-wrap justify-between items-center h-16">
			<div role="presentation" onClick={handleClick}>
				{props.breadscrubs && props.breadscrubs.length > 0 ?
					<Breadcrumbs paths={props.breadscrubs} /> : null
				}
			</div>
			<div className='flex flex-wrap items-center' role="presentation">
				{props.search != undefined ? searchBar() : null}
				{props.filter ? filterButton() : null}
				{props.csv ? downloadButton() : null}
				{props.add ? addButton() : null}
			</div>
		</div>
	);
}

TopBar.propTypes = {};

TopBar.defaultProps = {};

export default TopBar;
