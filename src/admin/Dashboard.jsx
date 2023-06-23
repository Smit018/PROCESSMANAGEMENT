import React, { useState } from 'react';
import DateSelect from '../components/DateSelect';
import DashboardCard from '../components/DashboardCard';
import { AddToArtifactIcon, Avatar, PeopleIcon } from 'evergreen-ui';
import { assets, Dot, people, performance, process, todo } from '../components/Icons';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    

	const [dates, setDates] = useState({
		from: new Date(new Date().setDate(-30)),
		to: new Date()
	})

	const paths = [
		{ path: '/admin/dashboard/', title: 'Dashboard' }
	]
   

	const top = [{
		"profile": "https://robohash.org/facilisvoluptatemdolorem.png?size=75x75&set=set1",
		"name": "Minetta Toulch",
		"code": "42747-222",
		"designation": "MKS Integrity",
		"task": 61,
		"pp": 6.3
	}, {
		"profile": "https://robohash.org/sintsuscipitdignissimos.png?size=75x75&set=set1",
		"name": "Ferrel Bracken",
		"code": "0245-0057",
		"designation": "HF",
		"task": 218,
		"pp": 6.5
	}, {
		"profile": "https://robohash.org/eumaliasaccusantium.png?size=75x75&set=set1",
		"name": "Shir McKeever",
		"code": "55111-122",
		"designation": "CQ5",
		"task": 127,
		"pp": 6.8
	}, {
		"profile": "https://robohash.org/fugiatsintquibusdam.png?size=75x75&set=set1",
		"name": "Hernando Wrangle",
		"code": "0591-0453",
		"designation": "XP Professional",
		"task": 182,
		"pp": 5.2
	}, {
		"profile": "https://robohash.org/exercitationemvoluptateexpedita.png?size=75x75&set=set1",
		"name": "Liz Tasker",
		"code": "67191-001",
		"designation": "Post Production",
		"task": 53,
		"pp": 9.5
	}, {
		"profile": "https://robohash.org/suscipitautemin.png?size=75x75&set=set1",
		"name": "Marcy Dermott",
		"code": "0363-0019",
		"designation": "WFC",
		"task": 144,
		"pp": 5.5
	}]

	const TopEmployee = (emp) => (
		
		<div className='full-w shadow'>
			{emp?.data?.map((e, index) => (
				<div key={index} className='flex mb-4 items-center'>
					<div className='px-2 w-20'>
						<Avatar size={40} src={e.profile} name={e.name} />
					</div>
					<div className='px-2 w-2/12'>
						<p>{e?.name}</p>
					</div>
					<div className='px-2 w-2/12'>
						<p>{e?.code}</p>
					</div>
					<div className='px-2 w-2/12'>
						<p>{e?.designation}</p>
					</div>
					<div className='flex-auto'>&nbsp;</div>
					<div className='px-2 w-2/12'>
						<p>{e?.task} tasks</p>
					</div>
					<div className='flex-auto'>&nbsp;</div>
					<div className='px-2 flex-auto'>
						<p className='text-green-600'>{e?.pp} PP</p>
					</div>
				</div>
			))}
		</div>
	)

 

	return (
		<div className='w-full h-full flex flex-col'>
			<div className='flex justify-between items-center mb-10'>
				<h2 className='text-lg'>Welcome Admin!</h2>
				<div className='flex gap-4'>
					<DateSelect
						date={dates.from}
						onDateChange={(date) => setDates({ from: date, to: dates.to })}
					/>
					<DateSelect
						date={dates.to}
						onDateChange={(date) => setDates({ to: date, from: dates.from })}
					/>
				</div>
			</div>
			<div className='flex-auto'>
				<div className='w-full flex flex-wrap gap-10 mb-10'>
					<div>
						<div className='flex align-middle'>
						<h3 className='text-base mb-4'>Employees</h3>
						<Link to="/admin/employees/employee-report" className='text-blue-500 ml-2 underline text-sm font-normal'>Employee Report</Link>
						</div>
						<DashboardCard
							title={'Active Employees'}
							desc={236}
							icon={people}
							color={`#7EBF7D`}
							path="/admin/employees"
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>&nbsp;</h3>
						<DashboardCard
							title={'PIP'}
							desc={`21`}
							icon={people}
							color={`#F2A633`}
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>Pendings</h3>
						<DashboardCard
							title={<span className='text-red-500'>TODOS</span>}
							desc={`10`}
							icon={todo}
							color={`#8F95B2`}
							dot={<Dot color='#F46767' />}
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>&nbsp;</h3>
						<DashboardCard
							title={<span className='text-yellow-500'>TODOS</span>}
							desc={`10`}
							icon={todo}
							color={`#8F95B2`}
							dot={<Dot color='#EF9000' />}
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>Employee Exit Program</h3>
						<DashboardCard
							title={'Employee Exit Program'}
							desc={`07`}
							icon={people}
							color={`#F46767`}
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>Performance Meter</h3>
						<DashboardCard
							title={'Average Performance'}
							desc={8.9}
							icon={performance}
							color={`#0084FE`}
							button={<AddIcon className='bg-blue-500 text-white w-5 h-5'/>}
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>Assets</h3>
						<DashboardCard
							title={'Assets Allotted'}
							desc={5}
							icon={assets}
							color={`#6E62B6`}
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>Process</h3>
						<DashboardCard
							title={'Processes'}
							desc={28}
							icon={process}
							color={`#25CBD6`}
							path="/admin/processes"
						/>
					</div>
				</div>
				<div>
					<h1 className='text-lg mb-6'>Top Employees</h1>
					<TopEmployee data={top} />
				</div>
			</div>
			<br></br>
			<br></br>
			<br></br>
		</div>
	)
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
