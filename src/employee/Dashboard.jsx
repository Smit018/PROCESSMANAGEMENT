import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import DateSelect from '../components/DateSelect';
import { assets, Dot, process, todo, performance } from '../components/Icons';
import {useNavigate} from 'react-router-dom';


const Dashboard = () => {

	const [dates, setDates] = useState({
		from: new Date(new Date().setDate(-30)),
		to: new Date()
	})
 
    return (
        <div className='w-full h-full flex flex-col'>
			<div className='flex justify-between items-center mb-10'>
				<h2 className='text-lg'>Welcome John Doe!</h2>
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
						<h3 className='text-base mb-4'>Pending Todos</h3>
						<DashboardCard
							title={<span className='text-red-500'>Assigned To</span>}
							desc={236}
							icon={todo}
							color={`#8F95B2`}
							path='/pm/assigned/to/overdue'
                            dot={<Dot color='#F46767' />}
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>&nbsp;</h3>
						<DashboardCard
							title={<span className='text-yellow-500'>Assigned To</span>}
							desc={`21`}
							icon={todo}
							color={`#8F95B2`}
							path='/pm/assigned/to/pending'
                            dot={<Dot color='#EF9000' />}
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>&nbsp;</h3>
						<DashboardCard
							title={<span className='text-red-500'>Assigned By</span>}
							desc={`10`}
							icon={todo}
							color={`#8F95B2`}
							path='/pm/assigned/by/overdue'
							dot={<Dot color='#F46767' />}
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>&nbsp;</h3>
						<DashboardCard
							title={<span className='text-yellow-500'>Assigned By</span>}
							desc={`10`}
							icon={todo}
							color={`#8F95B2`}
							path='/pm/assigned/by/pending'
							dot={<Dot color='#EF9000' />}
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>Process</h3>
						<DashboardCard
							title={'Process Owner'}
							desc={`21`}
							icon={process}
							color={`#25CBD6`}
							path='/pm/processes'
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>&nbsp;</h3>
						<DashboardCard
							title={'Process Member'}
							desc={26}
							icon={process}
							color={`#25CBD6`}
							path='/pm/processes'
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>Performance Meter</h3>
						<DashboardCard
							title={'Average Performance'}
							desc={8.9}
							icon={performance}
							color={`#0084FE`}
							path='/pm/performance-meter'
						/>
					</div>
					<div>
						<h3 className='text-base mb-4'>Assets</h3>
						<DashboardCard
							title={'Assets Allotted'}
							desc={5}
							icon={assets}
							color={`#6E62B6`}
							path='/pm/allotments'
						/>
					</div>
				</div>
			</div>
			<br></br>
			<br></br>
			<br></br>
		</div>
    )
}

export default Dashboard