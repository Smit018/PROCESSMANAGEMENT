import * as React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from "recoil";
import { updateLocalStorage } from './services/https.service';
import { userAuthState } from './services/recoil.service';

export const Root = () => {

	const _storage = useRecoilValue(userAuthState);
	const navigate = useNavigate()

    React.useEffect(() => {
        if(_storage.token) {
            updateLocalStorage(_storage)
        }
        else navigate('/admin/login')
    }, [])

    return (
        <Outlet/>
    )
}