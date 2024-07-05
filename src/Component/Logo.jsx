import React from 'react'
import logo from '../image/logo.png'

function Logo({ width='10px'}) {
    return (
        <div ><img src={logo} width={50} height={50} className='rounded-full' /></div>
    )
}

export default Logo
