import React, { useEffect, useRef, useState } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import { Heading, Pane, Text, toaster, Spinner } from 'evergreen-ui';
import { get } from '../../services/https.service'
import ProcessMatrixBox from './ProcessMatrixBox';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import { SettingsAccessibility } from '@mui/icons-material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { userAuthState } from "../../services/recoil.service";
import { atom, RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../services/https.service';


const ProcessMatrix = () => {
  const updateXarrow = useXarrow();
  const path = [{ path: '/admin/process-matrix', title: 'Process Matrix' }];
  const allProcess = []
  const [currentId,setCurrentId]=useState([])
  const [process, setProcess] = useState([]);
  const [connection,setConnection]=useState([]);
  const myadmin = useRecoilValue(userAuthState);
  const navigate=useNavigate()
  
  useEffect(() => {
    
    if(myadmin.token && myadmin.name && myadmin.userId && myadmin){
      setConnection([])
      if (allProcess.length === 0) {
        fetchProcesses()
      }
      else {
        allProcess = []
        fetchProcesses()
      }
    }
    else{
      navigate('/')
    }
    
    
  }, [])
  
  const getProcess=(path)=>{
   return(fetch(`${baseUrl}${path}`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Authorization':myadmin.token
      }
    }))
  }
  
  const fetchProcesses = async () => {
    const filter = `{"where": {"inputProcess":  null}, "order": "createdAt DESC"}`
    const path = `processes?filter=${filter}`
    const response=await getProcess(path)

  const res= await response.json()
  // const response = await get(path)
  if (res.length) {
    
    allProcess.push(res)
    
    setProcess(allProcess)
    
  }
}






const clickProcess=async (pId,index) => {
  
  try{
    
    
    const filter = `{"where": {"inputProcess":  "${pId}"}, "order": "createdAt DESC"}`
    const path = `processes?filter=${filter}`
    const response = await getProcess(path)

    const res=await response.json();
    // console.log(res)
   
   console.log('this is index'+index+'and current ids are'+currentId)


    if (res.length && !currentId.includes(pId)){
      console.log(currentId)
      let allprocess=process;
      allprocess.splice(index+1,1,res);
      setProcess([...allprocess]);
      let connectionobj= {
        startid: pId,
        endid:(index+1).toString()
      }
      let connectionlist=connection;
      connectionlist.splice(index,1,connectionobj);
      let currentides=currentId;
      currentides.push(pId);
      setCurrentId([...currentides])
      console.log(currentId)
      setConnection([...connectionlist]);
    }
    else{
      let allprocess=process;
      allprocess.splice(index+1,process.length-1);
      setProcess([...allprocess]);
      let connectionlist=connection;
      connectionlist.splice(index,1);
      let currentides=currentId;
      currentides.splice(index,currentides.length-index)
      console.log(currentides);
      setCurrentId([...currentides])
    }
    
  }
  catch(err){
    console.log(err)
  }
}
return (
  <Xwrapper>
  <div className='max-h-screen overflow-scroll bg-fixed bg-slate-50' onScroll={updateXarrow}>
  {/* <TopBar title="Process Matrix" breadscrubs={path}   className="sticky top-0  bg-blue-800"/> */}
  <div className="flex p-5 gap-5 align-middle align-center  ">

      <p onClick={()=>{navigate('../')}} className="cursor-pointer text-xl scale-150">  <ArrowCircleLeftIcon/> </p>
      <p className='text-xl'>Process Matrix</p>
  
   
  </div>
  
  
  
  <div className="flex w-full  gap-16 mx-auto" style={{'height':'90vh','width':'auto'}}>
 
  
  {process ? process?.map((p, index) => {
    return (
      <div className=" relative flex-shrink-0 col w-80 mr-3 justify-evenly
      p-2 mb-5 scrollbar-hide 
      overflow-scroll " onScroll={updateXarrow} key={index}>
      
      <div className="absolute top-0 left-0 " id={index.toString()}></div>
      <ProcessMatrixBox datasource={p}
      id={index}  clickProcess={clickProcess}
      setProcess={setProcess} process={process}
      index={index} />
      </div>
      )
    }) : null}
    
    { connection?connection?.map((item,index)=>{
      return(
        <Xarrow key={index}
        path="smooth"
        strokeWidth={1}
        zIndex={1000}
        headSize={16}
        color="blue"
        start={item.startid}
        end={ item.endid}
        
        startAnchor="auto"
        endAnchor="auto"
        // gridBreak="20%"
        />
        )}):null
      }
      
      </div>
      
      </div>
      </Xwrapper>
      )
    }
    
    export default ProcessMatrix;
    