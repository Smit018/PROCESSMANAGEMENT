import React from 'react';
import PropTypes from 'prop-types';
import styles from './WhatsappGroup.module.css';

const WhatsappGroup = () => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [documentData, setDocumentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [addMembers, setAddMembers] = useState([])

  useEffect(() => {
    let obj = { name: "HR Group", link: "/" };
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(obj)
    }
    setDocumentData(arr);
  },[0]);

  const createDocument = async ()=>{
    let newDoc = {name:name.trim(),link:link.trim()};
    let saveDoc = await post('documents',newDoc);
    if(saveDoc.statusCode>=200 && saveDoc.statusCode<300){
      addMembers.forEach((e)=>{
        e={...e,documentId:saveDoc._id}
      })
      let addMember_Document = await post("documentMembers",addMembers);
      if(addMember_Document.statusCode>=200 && addMember_Document.statusCode<300){
        console.log('members in a document added')
      }else{
        console.log(addMember_Document.message)
      }
    }else{
      console.log(saveDoc.message)
    }

  }

  const memberAdd = (memId,admin)=>{
    setAddMembers(...addMembers,{memberId:memId,admin:admin})
  }

  const handleClose =()=>{
    setOpen(false);
  }

  const formValidation = () => {
    if (name.trim().length > 3 && link.trim().length>1) {
      return false;
    }
    else {
      return true;
    }
  }

  return (
    <div className={styles.Documents}>
      <div className='flex justify-between items-center'>
        <div>
          <span>Master</span>
          <span> {'>'} </span>
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
          Add Type
        </Button>
      </div>

          <Table aria-label="simple table">
            <Table.Head>
              
                <Table.TextHeaderCell className="tableH-Color">SL No.</Table.TextHeaderCell>
                <Table.TextHeaderCell className="tableH-Color">Name</Table.TextHeaderCell>
                <Table.TextHeaderCell className="tableH-Color">Link</Table.TextHeaderCell>
          
            </Table.Head>
            <Table.Body>
              {documentData.map((item,index)=>{
                return(
                  <Table.Row>
                      <Table.TextCell className="tableB-Color">{index+1}</Table.TextCell>
                      <Table.TextCell className="tableB-Color">{item.name}</Table.TextCell>
                      <Table.TextCell className="tableB-Color"><Link to={item.link}>{'See File'}</Link></Table.TextCell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>

      <Dialog isShown={open} onCloseComplete={handleClose}
        title="Add Document"
        confirmLabel="Save Document"
        isConfirmDisabled={formValidation()}
        onConfirm={createDocument}
      >
          <form>
            <TextInputField  required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <TextInputField  required label="Link" value={link} onChange={(e) => setLink(e.target.value)} />
          </form>
        
      </Dialog>
    </div>
  )
};

WhatsappGroup.propTypes = {};

WhatsappGroup.defaultProps = {};

export default WhatsappGroup;
