import '../App.css'
import React from 'react'
import { useState } from 'react';
import DateSelect from '../components/DateSelect';
import Checkbox from './Checkbox';
import FilterCheckbox from './FilterCheckbox'
import { AlphabetIcon } from '../components/Icons';



const Todos = () => {
    const [dates, setDates] = useState({
        from: new Date(new Date().setDate(-30)),
        to: new Date()
    })

    return (
        <div>
            <div className='w-full h-full flex flex-col'>
                <div className='flex justify-between items-center mb-10'>
                    <h2 className='text-lg'>Dashboard &gt; Assigned To</h2>
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
            </div>

            <div className='flex gap-4 bg-slate-100' >
                <div className='mr-60 ' >
                    <div className='text-lg text-black font-semibold '>36</div>
                    <div>ASSIGNED</div>

                </div>
                <div>
                    <div className='text-lg text-black font-semibold '>12</div>
                    <div>ACCEPTED</div>

                </div>
            </div>



            <div className='flex gap-4'>
                <div >
                    <div className='inline-block mr-15'>
                        <h2 className='mt-10 text-lg text-black font-semibold '>RAJIV (4)</h2>
                        <div className='mr-50'>
                            <div className='mt-5 inline-block'>Create a custom thumbnail class  </div> <div className="inline-block ml-3"> <AlphabetIcon name="M" color="bg-pink-500"/></div><p className='inline-block text-xs ml-1'>  Assigned</p> <div className="inline-block ml-1"> <AlphabetIcon name="2" color="bg-pink-500"/></div>
                            <p className='mt-5'>Providing bhopal detail seminar from an outsider(jdfbjhvjdfjdf)</p>
                            <p className='mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore e</p>

                        </div>
                    </div>
                    <div className='inline-block mr-15'>
                        <h2 className='mt-10 text-lg text-black font-semibold '>SHIVANI (4)</h2>
                        <div className='mr-50'>
                            <div className='mt-5 inline-block'>Create a custom thumbnail class  </div> <div className="inline-block ml-3"> <AlphabetIcon name="M" color="bg-pink-500"/></div><p className='inline-block text-xs ml-1'>  Assigned</p> <div className="inline-block ml-1"> <AlphabetIcon name="2" color="bg-pink-500"/></div>
                            <p className='mt-5'>Providing bhopal detail seminar from an outsider(jdfbjhvjdfjdf)</p>
                            <p className='mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore e</p>

                        </div>
                    </div>


                </div>


                <div className='flex gap-4'>
                    <div className='inline-block mt-10'>
                        <Checkbox />
                    </div>
                    <div className='inline-block mt-10'>
                        <FilterCheckbox />
                    </div>


                </div>




            </div>






        </div>





















    )
}

export default Todos