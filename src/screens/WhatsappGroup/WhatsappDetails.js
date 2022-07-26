import React, { useState, useEffect }from 'react';
import PropTypes from 'prop-types';
import './WhatsappGroup.css';
import { post, get } from '../../services/https.service';
import { Link, useLocation } from 'react-router-dom';
import { Button, Table, Dialog, TextInputField, Checkbox } from "evergreen-ui";
import { Pane, Text } from 'evergreen-ui'
import TWOPEOPLE from "../../assets/images/twoPeople.png"
import USERIMG from "../../assets/images/userImgs.png";

const WhatsappDetails = () =>{
    const pathArray = window.location.pathname.split('/');
    const id = pathArray[3]
    const [members,setMembers] = useState([]);
    const [whatsappDetail, setWhatsappDetail] = useState({});

    useEffect(()=>{
        getWhatsappMembers(id);
        getWhatsappDetail()
        
    },[0])

    const getWhatsappDetail = async()=>{
        const whatsap = await get(`whatsappGroups/${id}`);
        if(whatsap.statusCode>=200 && whatsap.statusCode<300){
            setWhatsappDetail(whatsap.data);
        }else{
            console.log('Fetch Whatsapp member')
        }
    }

    const getWhatsappMembers = async(id)=>{
        const whatsap = await get(`whatsappGroups/${id}/whatsappMember`);
        if(whatsap.statusCode>=200 && whatsap.statusCode<300){
            setMembers(whatsap.data);
        }else{
            console.log('Fetch Whatsapp member')
        }
    }

    // const addMembersToWhatsapp = async(memberId)


    return(
        <div>
            <div className='flex justify-between items-center'>
                <div>
                    <span className='m-label'> Whatsapp Group </span>
                    <span style={{margin:"0 10px"}}>/</span>
                    <span className='m-label'> Whatsapp Group 1</span>
                </div>
            </div>
            <Pane width="100%" height="30vh" className='my-7 backCol-WH p-10' elevation={2}>
                <div className='flex justify-between '>
                    <div className='flex flex-col '>
                        <div className='text-2xl '>
                            Whatsapp Group - 1
                        </div>
                        <div className='pb-10'>
                            https://google.com/Eulogik
                        </div>
                        
                    </div>
                    <div className='flex'>
                    <Button marginRight={16} color="#ED342D">Delete</Button>
                    <Button marginRight={16} appearance="primary">Edit</Button>
                    </div>
                </div>
                {/* <div className='pb-5'></div> */}
                <div className='flex w-1/2  xs:w-full justify-between'>
                    <div className='flex'>
                        <div className='circleC1 flex items-center justify-center mr-5'>
                                <img src={TWOPEOPLE} className="img-201"/>
                            </div>
                            <div className='flex flex-col justify-center '>
                                <div className='font-medium'>
                                    0
                                </div>
                                <div className='text-xs text-pri-col'>
                                    Members
                                </div>
                        </div>
                    </div>
                            
                            <div className='flex flex-col justify-center '>
                                <div className='font-medium'>
                                    0
                                </div>
                                <div className='text-xs text-pri-col'>
                                    Input Sources
                                </div>
                            </div>
                            <div className='flex flex-col justify-center '>
                                <div className='font-medium'>
                                    0
                                </div>
                                <div className='text-xs text-pri-col'>
                                    Output Sources
                                </div>
                            </div>
                            
                </div>
                
            </Pane>
            <div className='mb-5'>
                <span className='pr-2'>MEMBERS</span><span className='pr-2'>/</span><span>OWNERS</span>
            </div>

            <div className='xs:w-full sm:w-1/2 bg-white search'>
                <TextInputField className='border-2'/>
                <Pane style={{overflowY:"scroll",maxHeight:"250px"}}>
                {members.map((item,index)=>{
                    return(
                        <Pane className='flex justify-between m-5'>
                            <div className='flex'>
                                <img src={USERIMG} className="img-20 mr-4" />
                                <div className='flex flex-col'>
                                    <div className='pb-1 text-xl font-medium'>
                                        John Doe
                                    </div>
                                    <div className='text-pri-col text-xs'>
                                        {1011+index} , SALES MANAGER
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center items-center text-pri-col text-lg'>
                                <div className='flex justify-center items-center mr-5'>
                                    <Checkbox className='mr-2' />
                                    <span>Admin</span>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <Checkbox className='mr-2' />
                                    <span>Member</span>
                                </div>
                            </div>
                        </Pane>
                    )
                })}
                </Pane>
                
            </div>
        </div>
    )

}

export default WhatsappDetails