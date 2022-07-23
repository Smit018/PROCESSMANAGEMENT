import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Process.module.css';
import TopBar from '../../components/TopBar/TopBar';
import AddProcess from '../../dialogs/AddProcess/AddProcess';
import { get } from '../../services/https.service';

import { SearchInput, Table, Pagination } from 'evergreen-ui';

const Process = () => {
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [types, setTypes] = useState([])
  const [departments, setDept] = useState([])
  const [members, setMembers] = useState([])
  const [process, setProcess] = useState([])

  useEffect(() => {
    fetchDepartments()
    fetchMembers()
    fetchProcesses()
    fetchTypes()
  }, [])


  const fetchTypes = async () => {
    const response = await get('types')
    if (response) {
      console.log(response)
      if (response.statusCode == 200) {
        setTypes(response.data)
      }
    }
  }

  const fetchDepartments = async () => {
    const response = await get('departments')
    if (response) {
      console.log(response)
      if (response.statusCode == 200) {
        setDept(response.data)
      }
    }
  }

  const fetchMembers = async () => {
    const response = await get('members?filter={"where": {"memberType": "employee"}}')
    if (response) {
      console.log(response)
      if (response.statusCode == 200) {
        setMembers(response.data)
      }
    }
  }


  const fetchProcesses = async () => {
    const response = await get('processes?filter={"fields": ["id", "processNumber"]}')
    if (response) {
      console.log(response)
      if (response.statusCode == 200) {
        setProcess(response.data)
      }
    }
  }





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
      <div className='mb-4'>
        <SearchInput onChange={(e) => setSearch(e.target.value)} value={search} />
      </div>
      <Table>
        <Table.Head>
          {columns.map((column, index) => {
            return (<Table.TextHeaderCell key={column.key}>{column.value}</Table.TextHeaderCell>)
          })}
        </Table.Head>
        <Table.Body height={240}>
          {profiles.map((profile, index) => (
            <Table.Row key={`"${index}"`} isSelectable onSelect={() => alert(profile.name)}>
              <Table.TextCell>{profile.name}</Table.TextCell>
              <Table.TextCell>{profile.lastActivity}</Table.TextCell>
              <Table.TextCell isNumber>{profile.ltv}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
        <div className='py-2 flex justify-end bg-white border-t'>
          <Pagination page={1} totalPages={5}></Pagination>
        </div>
      </Table>
      <div>
        <AddProcess open={showForm} data={{ types, members, departments, process }} onClose={(ev) => _setShowForm(ev)} onSubmit={(form) => { console.log(form) }} />
      </div>
    </div>
  );
}
Process.propTypes = {};

Process.defaultProps = {};

export default Process;

const profiles = [
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "Peter Parker", id: "2", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "Tony Stark", id: "3", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "4", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "5", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 },
  { name: "John Doe", id: "1", lastActivity: new Date().getTime(), ltv: 89 }
]


const columns = [
  { key: 'processNumber', value: 'Processess' },
  { key: 'title', value: 'Process Title' },
  { key: 'type', value: 'Type' },
  { key: 'department', value: 'Department' },
  { key: 'processOwner', value: 'Owner' },
  { key: 'members', value: 'Members' },
  

  { key: 'status', value: 'Status' },
  { key: 'createdAt', value: 'Created At' }
]