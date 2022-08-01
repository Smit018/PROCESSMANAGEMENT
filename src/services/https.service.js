import axios from "axios";
import { userAuthState } from '../services/recoil.service'


export let _localStorage = {}

export const updateLocalStorage = (data) => {
    // UPDATE LOCAL STORAGE
    _localStorage = data
}


export const baseUrl = `http://142.93.212.14:3200/api/`;
// export const baseUrl =`http://localhost:3200/api/`;


// INTERCEPTORS FOR REQUESTS
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = _localStorage.token || ""
    return config;
}, function (error) {
    return Promise.reject(error);
});

export const post = async (url, data) => {
    try {
        const res = await axios.post(baseUrl + url, data)
        return { statusCode: res.status, data: res.data };
    }
    catch (e) {
        console.log(e)
        return { statusCode: e?.response?.data?.error?.statusCode || 404, message: (e.response.data==undefined)?e?.message:e?.response?.data?.error?.message }
    }
}

export const patch = async (url, data) => {
    try {
        const res = await axios.patch(baseUrl + url, data)
        return { statusCode: res.status, data: res.data };
    }
    catch (e) {
        console.log(e)
        return { statusCode: e?.response?.data?.error?.statusCode || 404, message: (e.response.data==undefined)?e?.message:e?.response?.data?.error?.message }
    }
}

export const deleted = async (url) => {
    try {
        const res = await axios.delete(baseUrl + url)
        return { statusCode: res.status, data: res.data };
    }
    catch (e) {
        console.log(e)
        return { statusCode: e?.response?.data?.error?.statusCode || 404, message: (e.response.data==undefined)?e?.message:e?.response?.data?.error?.message }
    }
}


export const get = async (url) => {
    try {
        const res = await axios.get(baseUrl + url)
        return { statusCode: res.status, data: res.data };
    }
    catch (e) {
        console.error(e)
        return { statusCode: e?.response?.data?.error?.statusCode || 404, message: (e.response.data==undefined)?e?.message:e?.response?.data?.error?.message }
    }
}


export const addDepartments = async (data) => {
    try {
        const res = await axios.post(baseUrl + `departments`, data)
        console.log(res);
        return { statusCode: res.status, data: res.data };
    }
    catch (e) {
        console.log(e);
        return { statusCode: e.response.data.error.statusCode, message: e.response.data.error.message }
    }
}

export const addType = async (data) => {
    try {
        const res = await axios.post(baseUrl + `types`, data)
        console.log(res);
        return { statusCode: res.status, data: res.data };
    }
    catch (e) {
        console.log(e);
        return { statusCode: e.response.data.error.statusCode, message: e.response.data.error.message }
    }
}

export const addMember = async (data) => {
    try {
        const res = await axios.post(baseUrl + `types`, data)
        console.log(res);
        return { statusCode: res.status, data: res.data };
    }
    catch (e) {
        console.log(e);
        return { statusCode: e.response.data.error.statusCode, message: e.response.data.error.message }
    }
}


export const ImageURL = (container, filename) => {
    return `${baseUrl}photos/${container}/download/${filename}`
}


export const logout = async () => {
    const res = await axios.post(baseUrl + 'admins/logout/')
    return res;
}

export const REGEX =  {
    EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    PWD: /.{6,}/g,
    NAME: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g,
    TITLE: /^[a-zA-Z0-9 ]*$/gm,
    // ALL: /.*/gm
    ALL: /[^\s\\]/
}