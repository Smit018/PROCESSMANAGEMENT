import React from 'react'
import {useParams, useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import { get } from '../../services/https.service';
import { useState ,useEffect} from 'react';
import { ListCard } from '../../components/AvatarList/AvatarList';
import { Avatar } from 'evergreen-ui';




export default function DepartmentDetails() {
 const params=useParams()
 const id='62e21f833c9b590af6b1de0d'
 const paths = [
        { path: '/admin/department', title: 'Departments' },
        { path: '', title: params.name },
    ];
 const [departmentId,setDepartmentId]=useState(params.id);
 const [progressdata,setProgressData]=useState([]);
    const fetchprocesses=async()=>{
        try{
           console.log(departmentId);
           if(departmentId){
            const res=await get(`processes?filter={"where": {"departmentId":"${departmentId}"}}`);
            if(res.statusCode==200){
                console.log(res)
                setProgressData(res.data)
            }
           }
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchprocesses();

    },[departmentId]);


  return (
    <div>
        <TopBar
                title="Whatsapp Groups"
                breadscrubs={paths}
            />

            {/* <h1>{params.id} and {params.name}</h1> */}
            {progressdata.length?
                progressdata.map((item,index)=>{
                  return(
                    <ListCard title={item.title}
                    subTitle={item.processNumber}
                    icon= {  <Avatar size={40} src="" name={item.title}/>}
                   />
                  )
                }): <p className='text-2xl text-gray-300 text-center mt-52'>NO DATA FOUND!</p>
            }
    </div>
    
  )
}
