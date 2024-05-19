import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../AppWrite/Auth'
import {logout} from '../../Store/AuthSlice'

function LogoutBtn() {
    const dispatch=useDispatch()
    const  logOutHandler=()=>{
        authService.logOut().then(()=>{
            dispatch(logout())
        })
    }
    return (
        <button
        onClick={logOutHandler}

        
        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' >
            Logout 

        </button>
    )
}

export default LogoutBtn
