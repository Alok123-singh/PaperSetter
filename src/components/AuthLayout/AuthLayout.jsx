import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const loginStatus = useSelector(state => state.auth.loginStatus)
    
    useEffect(() => {
        setLoader(true);
        //TODO: make it more easy to understand

        // if (loginStatus === true){
        //     navigate("/")
        // } else if (loginStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = loginStatus === true ? true : false

        if(authentication && loginStatus !== authentication){
            navigate("/login")
        } else if(!authentication && loginStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [loginStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}