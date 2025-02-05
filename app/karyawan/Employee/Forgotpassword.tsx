'use client'
import React, { FormEvent, useState } from 'react'
import { User } from '../types'
import { toast, ToastContainer } from 'react-toastify';
import { getStoresCookie } from '@/helper/client.cookkie';
import { axiosInstance } from '@/helper/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/modal';

interface props {
    item: User
}
const Forgotpassword = (myprops: props) => {
     const [show, setShow] = useState(false);
     const [password, setPassword] = useState('')
     const router = useRouter()

     const openModal = () => {
        setShow(true)
        setPassword('')
     };
     const closeModal = () => setShow(false);
     const handleSubmit = async (e: FormEvent) => {
         e.preventDefault();
         
         try {
            const cookie = getStoresCookie('token')
            const response: any = await axiosInstance.put(`/employee/${myprops.item.id}`, {
                password
            }, {
                headers: {
                    Authorization: `Bearer ${cookie}`,
                },
            })

            if (response.data.success !== true) {
                toast(response.data.message, {
                    containerId: `toastForgot-${myprops.item.id}`,
                    type: 'warning',
                })
            } 

             toast(response.data.message, {
                containerId: `toastForgot-${myprops.item.id}`,
                type:'success',
             })

             setShow(false)
             setTimeout(() => {
                router.refresh()
             }, 1000)
            
            
         } catch (error) {
            console.log(error)
            toast(`Something went wrong`, {
                containerId: `toastForgot-${myprops.item.id}`,
                type: 'error',
            })
         }
     }

  return (
    <div>
        <ToastContainer containerId={`toastForgot-${myprops.item.id}`} />
      <button
        type="button"
        className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded-md"
        onClick={() => openModal()}
      >
        Forgot Password
      </button>
      <Modal isShow={show}>
      <form onSubmit={(e) => handleSubmit(e)}>
            <div className="w-full p-3 rounded-t-md">
              <h1 className="font-semibold text-lg text-black">Forgot Password</h1>
              <span className="text-sm text-slate-500">
                Pastikan data terisi dengan benar
              </span>
            </div>
            
            <div className="w-full p-3">
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Password
                </small>
                <input type="password" id={`description-${myprops.item.id}`} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black" 
                />
              </div>
            </div>

            <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
             <button type="button" onClick={() => closeModal()}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
              >Close</button>
             <button type="submit"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-md"
              disabled={password.length < 8 || password === ""? true : false}
              >Submit</button>
            </div>

          </form>
        </Modal>
    </div>
  )
}

export default Forgotpassword