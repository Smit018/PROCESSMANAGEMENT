import React from 'react'
import { useState } from 'react'
import '../App.css'
import DateSelect from '../components/DateSelect';


const ProcessList = (list) => (
    <div className='w-full rounded flex justify-between items-center bg-white px-4 py-5 cursor-pointer hover:bg-stone-50 hover:shadow mb-4'>
        <div className='mr-4'>
            <h2 className='text-lg text-black font-semibold mb-1'>OPLAW101</h2>
            <p className='text-sm text-gray-500'>Uploading youtube videos for APT study students</p>
        </div>

    </div>
)


const CollapseContent = () => {
    const [dates, setDates] = useState({
        from: new Date(new Date().setDate(-30)),
        to: new Date()
    })

    return (
        <div>
            <div className='w-full h-full flex flex-col'>
                <div className='flex justify-between items-center mb-10'>
                    <h2 className='text-lg mt-5 ml-5'>Todos</h2>
                    <div className='flex gap-4 mt-5'>
                        <div>
                            <p className='text-xs text-gray-400 ml-2'>From</p>
                        <DateSelect
                            date={dates.from}
                            onDateChange={(date) => setDates({ from: date, to: dates.to })}
                        />
                        </div>
                        <div>
                        <p className='text-xs text-gray-400 ml-2'>To</p>
                        <DateSelect
                            date={dates.to}
                            onDateChange={(date) => setDates({ to: date, from: dates.from })}
                        />
                        </div>
                    </div>
                </div>
                <div className='ml-5'>
                    <p className='mb-5'>Create a custom thumbnail</p>
                    <p className='mb-5'>Create a custom thumbnail</p>
                    <p className='mb-5'>Create a custom thumbnail</p>
                    <p className='mb-5'>Create a custom thumbnail</p>
                    <p className='mb-5'>Create a custom thumbnail</p>
                    <p className='mb-5'>Create a custom thumbnail</p>
                    <p className='mb-5'>Lorem ipsum dolor sit amet. Et labore recusandae 33 facilis suscipit quo consequuntur omnis qui eveniet ullam aut dolor nisi hic laudantium omnis! Et quis accusamus sed voluptatem galisum qui iste enim et velit sunt? Qui officia explicabo qui maxime galisum in impedit quia a inventore natus est aliquam iure vel delectus exercitationem rem consequuntur nobi</p>



                </div>
            </div>


        </div>
    )
}




const Collapse = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border rounded p-2">
            <button
                className="flex justify-between items-center w-full bg-gray-200 px-4 py-2 rounded focus:outline-none"
                onClick={toggleCollapse}
            >
                <span className="text-lg">{title}</span>
                <svg
                    className={`transform transition-transform duration-300 ${isOpen ? "rotate-360" : ""
                        } h-6 w-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="p-2 mt-2 bg-white rounded">{children}</div>
            )}
        </div>
    );
};










const ProcessDetails = () => {
    return (
        <div>
            <div className='w-full h-full flex flex-col'>
                <div className='flex justify-between items-center mb-10'>
                    <h2 className='text-lg'>Dashboard &gt; Processes &gt; Process Details</h2>
                </div>
            </div>
            <div>
                <ProcessList />
            </div>
            <p className='mt-5 text-lg text-black font-semibold' >STEPS</p>
            <div className='mt-5'>
                <Collapse title="1. Uploading youtube videos"> <CollapseContent /></Collapse>
            </div>
            <div className='mt-5'>
                <Collapse title="2. Share youtube links on social media platforms"> <CollapseContent /></Collapse>
            </div>
            <div className='mt-5'>
                <Collapse title="3. Seminar head gives feedback form physically"> <CollapseContent /></Collapse>
            </div>


        </div>
    )
}







export default ProcessDetails