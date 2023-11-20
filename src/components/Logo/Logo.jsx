import React from 'react'
import LogoImage from '../../assets/logo.jpg'

function Logo({width = '100px'}) {
    return (
        <img className='w-[5rem] h-[4rem] rounded-lg bg-cover' style={{backgroundImage: `url(${LogoImage})`}} />
    )
}

export default Logo
