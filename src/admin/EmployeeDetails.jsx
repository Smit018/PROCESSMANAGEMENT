import React from 'react'



const EmployeeCard1 = ({ name, designation, email, profilePic }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-md bg-white">
      <img className="w-full" src={profilePic} alt="Profile" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base mb-2">{designation}</p>
        <p className="text-gray-600 text-base">{email}</p>
      </div>
    </div>
  );
};















const EmployeeDetails = () => {
  return (
    <div>EmployeeDetails</div>
  )
}

export default EmployeeDetails