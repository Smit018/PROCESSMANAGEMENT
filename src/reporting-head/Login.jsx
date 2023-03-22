import { Button } from 'evergreen-ui'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <Button onClick={() => navigate('dashboard')}>Login Reporting Head</Button>
        </div>
    )
}

export default Login