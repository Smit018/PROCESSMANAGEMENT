import axios from "axios";

// let url =`http://142.93.212.14:3200/api/`;
let url = "http://localhost:3200/api/";
let token = localStorage.getItem('token');

export const addDepartments = async (data)=>{
    try{
        const res = await axios.post(url+`departments/?access_token=${token}`,data)
        console.log(res);
        return {statusCode:res.status,data:res.data};
    }
    catch(e){
        console.log(e);
        return {statusCode:e.response.data.error.statusCode,message:e.response.data.error.message}
    }
}

export const addType = async (data)=>{
    try{
        const res = await axios.post(url+`types/?access_token=${token}`,data)
        console.log(res);
        return {statusCode:res.status,data:res.data};
    }
    catch(e){
        console.log(e);
        return {statusCode:e.response.data.error.statusCode,message:e.response.data.error.message}
    }
}

export const addMember = async (data)=>{
    try{
        const res = await axios.post(url+`types/?access_token=${token}`,data)
        console.log(res);
        return {statusCode:res.status,data:res.data};
    }
    catch(e){
        console.log(e);
        return {statusCode:e.response.data.error.statusCode,message:e.response.data.error.message}
    }
}