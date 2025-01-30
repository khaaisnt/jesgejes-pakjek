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
     <div className="w-dvw h-dvh flex justify-center items-center">
      <ToastContainer containerId={`toastLogin`} />
      <form className="w-5/6 md:w-1/2 border rounded-lg bg-white shadow-sm" onSubmit={e => handleSubmit(e)}>
        {/* header login */}
        <div className="w-full bg-blue-600 rounded-t-lg text-white p-3">
          <h1 className="text-xl bg-blue-600 font-semibold">Login KAI</h1>
        </div>
        {/* login body */}
        <div className="w-full p-5">
          <div className="mb-3">
            <span className="text-sm text-blue-600">Username</span>
            <input
              className="w-full p-2 border rounded-md"
              required={true}
              type="text"
              id={`username`}
              value={username}
              placeholder='masukkan username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <span className="text-sm text-blue-600">Password</span>
            <input
              className="w-full p-2 border rounded-md"
              required={true}
              type="password"
              id={`password`}
              value={password}
              placeholder='masukkan password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-gradient-to-tl duration-200 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage