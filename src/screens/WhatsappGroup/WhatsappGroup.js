import React, { useState, useEffect }from 'react';
import PropTypes from 'prop-types';
import './WhatsappGroup.css';
import { post, get } from '../../services/https.service';
import { DateFormat } from '../../services/dateFormat';
import { Link } from 'react-router-dom';
import { Button, Table, Dialog, TextInputField } from "evergreen-ui";
import { Pane, Text } from 'evergreen-ui'
import USERIMG from "../../assets/images/userImgs.png";
import TWOPEOPLE from "../../assets/images/twoPeople.png"
import { ErrorTwoTone } from '@mui/icons-material';

const WhatsappGroup = () => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [whatsappData, setWhatsappData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllWhatsappGroup();
  }, [0]);

  async function getAllWhatsappGroup(){
    const whatsap = await get("whatsappGroups");
    if(whatsap.statusCode>=200 && whatsap.statusCode<300){
      let dataFromServer = whatsap.data;
      setWhatsappData(dataFromServer);
    }else{
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

  return (
    <div>
      <div className='flex justify-between items-center m-label'>
        <div>
          <span> Types </span>
        </div>
        <div className='flex justify-between items-center'>

          <span>
            <span>Filter By</span>
            {/* <span>?</span> */}
          </span>

          <span style={{ margin: '0 20px' }}></span>

          <span>
            <span>Download CSV</span>
            {/* <span>?</span> */}
          </span>


        </div>
      </div>

      <div className='flex justify-end' style={{ margin: "20px 0" }}>
        <Button appearance="primary" onClick={() => setOpen(true)}>
          Add Whatsapp
        </Button>
      </div>

      {/* <Table aria-label="simple table">
        <Table.Head>

          <Table.TextHeaderCell className="th-c">SL No.</Table.TextHeaderCell>
          <Table.TextHeaderCell className="th-c">Name</Table.TextHeaderCell>
          <Table.TextHeaderCell className="th-c">Link</Table.TextHeaderCell>

        </Table.Head>
        <Table.Body>
          {documentData.map((item, index) => {
            return (
              <Table.Row>
                <Table.TextCell className="tb-c">{index + 1}</Table.TextCell>
                <Table.TextCell className="tb-c">{item.name}</Table.TextCell>
                <Table.TextCell className="tb-c"><Link to={item.link}>{'See File'}</Link></Table.TextCell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table> */}
      
      {whatsappData.map((item,index)=>{
        return(
        <Link to={`${item.id}`}>  
        <Pane elevation={1} display="flex" justifyContent="space-between" alignItems="center" height={"90px"} width={"100%"}>
          <div className='flex items-center justify-center margin_wh'>
            <div className='circleC1 flex items-center justify-center'>
              <img src={TWOPEOPLE} className="img-201"/>
            </div>
            <div style={{ margin: "0 10px" }}></div>
            <div className='flex flex-col '>
              <div className='m-label'>
                {item.name}
              </div>
              <div className='text-m-label-30'>
                {/* 20 July 2020, 10:30 AM */}
                {DateFormat(item.createdAt,"date-time")}
              </div>
            </div>
          </div>
          <div className='margin_wh1' style={{color:"#66788A"}}>
            42 Members
          </div>
        </Pane>
        </Link>
        )
      }
      )}

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
