import React from 'react'
import { LogoImage } from '../../assets'

function Logo({width = '300px'}) {
    return (
        <img className='w-[8.5rem] h-[1.7rem] flex justify-center items-center rounded-sm bg-cover' style={{backgroundImage: `url(${LogoImage})`}} />
    )
}

export default Logo
