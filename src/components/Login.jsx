import React ,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import {login as authlogin} from "../store/authSlice"
import {Button,Input,Logo} from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"
function Login() {
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState("")

    const login = async(data)=>{
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authlogin(userData))
                navigate("/")
                window.location.href = '/';
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
   <div className="min-h-screen flex items-center justify-center bg-white-50 px-4">
  <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 mb-10">
    {/* Logo */}
    <div className="flex justify-center mb-6">
      <span>
        <Logo width="100%" />
      </span>
    </div>

    {/* Heading */}
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
      Sign in to your account
    </h2>

    {/* Subtext */}
    <p className="text-center text-gray-600 mb-6 text-sm">
      Don’t have an account?{" "}
      <Link to="/signup" className="text-blue-600 hover:underline">
        Sign up
      </Link>
    </p>

    {/* Error message */}
    {error && (
      <p className="text-red-500 text-sm text-center mb-4">
        {error}
      </p>
    )}

    {/* Form */}
    <form onSubmit={handleSubmit(login)} className="space-y-4">
      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        {...register("email", {
          required: true,
          validate: {
            matchPatern: (value) =>
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
              "Invalid email address",
          },
        })}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        {...register("password", {
          required: true,
        })}
      />

      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  </div>
</div>

  )
}

export default Login

