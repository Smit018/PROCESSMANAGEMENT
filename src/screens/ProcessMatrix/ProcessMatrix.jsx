import React, { useEffect, useRef, useState } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import { Heading, Pane, Text, toaster, Spinner } from 'evergreen-ui';
import { get } from '../../services/https.service'
import ProcessMatrixBox from './ProcessMatrixBox';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import { SettingsAccessibility } from '@mui/icons-material';




const ProcessMatrix = () => {
  const updateXarrow = useXarrow();
  const path = [{ path: '/admin/process-matrix', title: 'Process Matrix' }];
  const allProcess = []
  const [currentId,setCurrentId]=useState([])



  const [process, setProcess] = useState([]);
  const [connection,setConnection]=useState([]);
  useEffect(() => {

    setConnection([])
    if (allProcess.length === 0) {
      fetchProcesses()
    }
    else {
      allProcess = []
      fetchProcesses()
    }
  }, [])


  const fetchProcesses = async () => {
    const filter = `{"where": {"inputProcess":  null}, "order": "createdAt DESC"}`
    const path = `processes?filter=${filter}`
    const response = await get(path)
    if (response.statusCode == 200) {
     
      allProcess.push(response.data)
     
      setProcess(allProcess)

    }
  }






const clickProcess=async (pId,index) => {

    try{
       
        
    const filter = `{"where": {"inputProcess":  "${pId}"}, "order": "createdAt DESC"}`
    const path = `processes?filter=${filter}`
    const response = await get(path)

    if(response.statusCode==200 && response.data.length && !currentId.includes(pId)){

       
       
        let allprocess=process;
        allprocess.splice(index+1,1,response.data);
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
        let ind=currentides.indexOf(pId);
        currentides.splice(ind,1)
        setCurrentId([...currentides])
    }
   
    }
    catch(err){
        console.log(err)
    }
}
  return (
        <Xwrapper>
    <div className='max-h-screen'>
      <TopBar title="Process Matrix" breadscrubs={path}  className="sticky top-0"/>

      

      <div className="flex w-full  gap-16 mb-10" style={{'height':'71vh'}} onScroll={()=>{
        updateXarrow();
        let connectionarray=connection
        connectionarray.splice(0,1);
        setConnection(connection)
      }} onMouseMove={updateXarrow}>

        {process ? process?.map((p, index) => {
          return (
            <div className=" relative flex-shrink-0 col w-80 mr-3
             bg-blue-300 p-2 mb-5 scrollbar-hide 
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
