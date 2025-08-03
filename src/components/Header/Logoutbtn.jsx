import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from "../../store/authSlice"
import {  useNavigate } from 'react-router-dom'

function Logoutbtn() {
   const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler =()=>{
        authService.logout()
        .then(()=>{dispatch(logout())})
        .catch((error)=> {console.log("❌ Error User Logout:", error)})  
      navigate("/")
    }
  return (
    <button 
    onClick={logoutHandler}
        className="inline-block px-6 py-2 text-white bg-transparent  rounded-full transition duration-200 hover:bg-white hover:text-black"

>Logout</button>
  )
}

export default Logoutbtn
