import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from "react-router-dom";
function App() {
  const [loading,setLoading] =useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{ 
      if (userData) {        
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
    console.log("❌ Error fetching user:", error);
  })
    .finally(()=> setLoading(false))
  },[])

  return !loading ?(
   <div className="min-h-screen flex flex-col text-gray-900">
    {/* Header */}
    <Header />

    {/* Main content */}
    <main>
      <Outlet />
    </main>

    {/* Footer */}
    <Footer />
  </div>
  ): null
}

export default App
