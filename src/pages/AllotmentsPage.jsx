import { React, useState } from 'react';
import AddAllotment from '../dialogs/AddAllotment/AddAllotment';
import Button from '@mui/material/Button';
import { Table } from 'evergreen-ui'


const AllotmentsPage = (props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [employeename, setEmployeeName] = useState('');
  const [openAddDialog, setAddDialog] = useState(false)

  const Demo = () => {
    const profiles = [
      {
        "id": "1",
        "lastActivity": "a few seconds ago",
        "ltv": "$365",
        "name": "Cheryl Carter"
      },
      {
        "id": "2",
        "lastActivity": "a minute ago",
        "ltv": "$427",
        "name": "Heather Morales"
      },
      {
        "id": "3",
        "lastActivity": "3 minutes ago",
        "ltv": "$538",
        "name": "Sean Jackson"
      }]

    return (
      <Table>
        <Table.Head>
          {props.profile && (<Table.TextHeaderCell>Profile</Table.TextHeaderCell>)}
          {props.Name && (<Table.TextHeaderCell>Name</Table.TextHeaderCell>)}
          {props.Empcode && (<Table.TextHeaderCell>Employee Code</Table.TextHeaderCell>)}
          {props.title && (<Table.TextHeaderCell>Title</Table.TextHeaderCell>)}
          {props.description && (<Table.TextHeaderCell>Description</Table.TextHeaderCell>)}
          {props.duration && (<Table.TextHeaderCell>Duration</Table.TextHeaderCell>)}
        </Table.Head>
        <Table.Body height={240}>
          {profiles.map((profile) => (
            <Table.Row key={profile.id} isSelectable onSelect={() => alert(profile.name)}>
              <Table.TextCell>{profile.name}</Table.TextCell>
              <Table.TextCell>{profile.lastActivity}</Table.TextCell>
              <Table.TextCell isNumber>{profile.ltv}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }



  return (
    <div>
      <div className='w-full h-full flex flex-col mt-4'>
        <div className='flex justify-between items-center mb-10'>
          <h2 className='text-lg'>Allotments</h2>
          <div className='flex gap-4 mr-5'>
            {props.button === true ? (<Button variant="outlined" onClick={() => setAddDialog(true)}>
              ADD RECORD
            </Button>) : (<p></p>)}
          </div>
        </div>
        <AddAllotment
          open={openAddDialog}
          onClose={() => setAddDialog(false)}
          title={title}
          description={description}
          employeename={employeename}
          onTitleChange={(value) => setTitle(value)}
          onNameChange={(value) => setEmployeeName(value)}
          onDescriptionChange={(value) => setDescription(value)}
          save={() => console.log(title)}
        />

        <div className=''>
          <Demo />
        </div>
      </div>
    </div>
  )
}

export default AllotmentsPage