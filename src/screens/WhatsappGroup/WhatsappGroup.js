import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './WhatsappGroup.css';
import { post, get } from '../../services/https.service';
import { DateFormat } from '../../services/dateFormat';
import { Link } from 'react-router-dom';
import { Button, Table, Dialog, TextInputField, PeopleIcon, Spinner } from "evergreen-ui";
import { Pane, Text } from 'evergreen-ui'
import USERIMG from "../../assets/images/userImgs.png";
import TWOPEOPLE from "../../assets/images/twoPeople.png"
import { ErrorTwoTone } from '@mui/icons-material';
import TopBar from '../../components/TopBar/TopBar';
import { ListCard } from '../../components/AvatarList/AvatarList';
import { showEmpty, showSpinner } from '../../components/GlobalComponent';

const WhatsappGroup = () => {
	const [search, setSearch] = useState('');
	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	const [whatsappData, setWhatsappData] = useState(null);
	const [open, setOpen] = useState(false);

	const paths = [
		{ path: 'whatsapp-groups', title: 'Whatsapp Groups' }
	]


	useEffect(() => {
		getAllWhatsappGroup();
	}, [0]);

	async function getAllWhatsappGroup() {
		const whatsap = await get("whatsappGroups");
		if (whatsap.statusCode >= 200 && whatsap.statusCode < 300) {
			let dataFromServer = whatsap.data;
			setWhatsappData(dataFromServer);
		} else {
			alert('Error whatsapp Group')
		}
	}

	const createWhatsapp = async () => {
		let newDoc = { name: name.trim(), link: link.trim() };
		let saveDoc = await post('whatsappGroups', newDoc);
		if (saveDoc.statusCode >= 200 && saveDoc.statusCode < 300) {
			console.log('Whtsapp group added');
			getAllWhatsappGroup()
		} else {
			console.log(saveDoc.message)
		}
		handleClose()
	}

	const handleClose = () => {
		setOpen(false);
	}

	const formValidation = () => {
		if (name.trim().length > 3 && link.trim().length > 1) {
			return false;
		}
		else {
			return true;
		}
	}

	const showContent = () => {
		return whatsappData?.map((item, index) => {
			return (
				<Link key={item.id} to={`${item.id}/${item.name}`}>
					<ListCard
						title={item.name}
						subTitle={DateFormat(item.createdAt, "date-time")}
						icon={<PeopleIcon size={20} color={'#262626'} />}
						actionText={'40 Members'}
					/>
				</Link>
			)
		})
	}

	return (
		<div className='w-full h-full'>
			<TopBar
				title="Whatsapp Groups"
				breadscrubs={paths}
				add={true}
				addTitle="Add Whatsapp Group"
				addEv={() => setOpen(true)}
				csv="true"
				filter="true"
				search={search}
				onSearch={(e) => setSearch(e.target.value)}
			/>
			<br></br>
			{!whatsappData ? showSpinner() : whatsappData?.length === 0 ? showEmpty() : showContent()}
			<Dialog isShown={open} onCloseComplete={handleClose}
				title="ADD WHATSAPP GROUP"
				width={'50%'}
				confirmLabel="Save Whatsapp"
				isConfirmDisabled={formValidation()}
				onConfirm={createWhatsapp}
			>
				<form>
					<div className='flex justify-center items-center'>
						<TextInputField size={100} required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
						<div style={{ margin: "0 10px" }}></div>
						<TextInputField size={100} required label="Link" value={link} onChange={(e) => setLink(e.target.value)} />
					</div>
				</form>
			</Dialog>
		</div>
	)
};

WhatsappGroup.propTypes = {};

WhatsappGroup.defaultProps = {};

export default WhatsappGroup;
