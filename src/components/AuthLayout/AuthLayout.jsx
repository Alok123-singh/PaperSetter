import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Loading1 } from '../index'

export default function AuthLayout({ children, authentication = true, allowedRole }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const loginStatus = useSelector((state) => state.auth.loginStatus);
    const role = useSelector((state) => state.auth.role);
    
    useEffect(() => {
      setLoader(true);

        if(authentication && loginStatus !== authentication){
            navigate("/login")
        } 
        else if(!authentication && loginStatus !== authentication){
            navigate('');
        }
        
      setLoader(false);
    }, [loginStatus, navigate, authentication, allowedRole, role]);
  
    return loader ? <Loading1 /> : <>{children}</>;
}