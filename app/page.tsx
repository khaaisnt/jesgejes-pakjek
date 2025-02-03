'use client'
import { axiosInstance } from '@/helper/api'
import { storesCookie } from '@/helper/client.cookkie'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const LoginPage = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
     try {
      e.preventDefault()

      const response: any = await axiosInstance.post('/auth', {
        username,
        password
      })

      if (response.data.success === false) {
       return toast(response.data.message, {
          type: 'warning',
          containerId: 'toastLogin'
        })
      }

      storesCookie('token', response.data.token)

      toast(response.data.message, {
        containerId: 'toastLogin',
        type:'success',
      })

      if (response.data.role === 'ADMIN') {
        setTimeout(() => router.replace('/karyawan/kereta'), 1000)
      }

     } catch (error) {
      console.log(error)
      toast('some thing went wrong', {
        containerId: 'toastLogin',
        type: 'error',
      })
     }
  }

  return (
    <div className="w-dvh h-dvh flex justify-center items-center">
      <ToastContainer containerId={'toastLogin'}/>
      <form action="" className='w-5/6 md:w-1/2 border rounded-lg ' onSubmit={(e) => handleSubmit(e)}>
      <div className='w-full bg-blue-600 text-white p-3'>
      Login
      </div>
      <div className='w-full p-5'>
        <div className='mb-3'>
          <span className='text-sm text-blue-600'>Username</span>
          <input type='text' id='username' value={username} 
          onChange={(e) => {setUsername(e.target.value)}}
          className='w-full p-2 border-2 rounded-md text-black' required
          ></input>
        </div>

        <div className='mb-3'>
          <span className='text-sm text-blue-600'>Password</span>
          <input type='password' id='password' value={password} 
          onChange={(e) => {setPassword(e.target.value)}}
           className='w-full p-2 border-2 rounded-md text-black' required
          ></input>
        </div>

        <button type='submit' 
        className='w-full bg-green-600 text-white p-3 rounded-md px-4 py-2 hover:bg-green-700'>
          Login</button>
      </div>
      </form>
    </div>
  )
}

export default LoginPage