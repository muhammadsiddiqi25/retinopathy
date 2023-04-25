
import {Outlet, Navigate} from 'react-router-dom'
export  const PrivateRoutes  = ()  =>{
    const token = localStorage.getItem('accessToken')
    return (
        token ? <Outlet /> : <Navigate to='/' />      
    ) 
}