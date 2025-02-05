'use client'
import React, { FormEvent, useState } from 'react'
import { User } from '../types'
import { useRouter } from 'next/navigation'
import { getStoresCookie } from '@/helper/client.cookkie'
import { axiosInstance } from '@/helper/api'
import { toast, ToastContainer } from 'react-toastify'
import Modal from '@/components/modal'

interface props {
    item: User
}
const Editemployee = (myprops: props) => {
        const [show, setShow] = useState(false);
        const [username,setUsername]= useState<string>(myprops.item.user_details.username)
        const [nik, setNik] = useState<string>(myprops.item.nik)
        const [name, setName] = useState<string>(myprops.item.name)
        const [address, setAddress] = useState<string>(myprops.item.address)
        const [phone,setPhone] = useState<string>(myprops.item.phone)

        const openModal = () => {
            setUsername(myprops.item.user_details.username)
            setNik(myprops.item.nik)
            setName(myprops.item.name)
            setAddress(myprops.item.address)
            setPhone(myprops.item.phone)
            setShow(true)
        }

        const router = useRouter()

        const closeModal = () => setShow(false)

        const handleSubmit = async (e: FormEvent) => {
                e.preventDefault()
        
                try {
                    const cookie = getStoresCookie('token')
                    const response: any = await axiosInstance.put(`/employee/${myprops.item.id}`, {
                        username,
                        nik,
                        name,
                        address,
                        phone,
                    }, {
                        headers: {
                            Authorization: `Bearer ${cookie}`,
                        },
                    })
        
                    if (response.data.success !== true) {
                        toast(response.data.message, {
                            containerId: `EditEmployee-${myprops.item.id}`,
                            type: "warning",
                        })
                    }
        
                    toast(response.data.message, {
                        containerId: `EditEmployee-${myprops.item.id}`,
                        type: "success",
                    })
                    setShow(false)
                    setTimeout(() => router.refresh(), 1000)
                } catch (error) {
                    console.log(error)
                    toast(`Something went wrong`, {
                        containerId: `EditEmployee-${myprops.item.id}`,
                        type: "error",
                    })
                }
        
            }

  return (
    <div>
        <div>
      <ToastContainer containerId={`EditEmployee-${myprops.item.id}`}/>
        <button type="submit" className="px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white"
        onClick={() => openModal()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
        </button>
        <Modal isShow={show}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="w-full p-3 rounded-t-md">
              <h1 className="font-semibold text-lg text-black">Edit Karyawan</h1>
              <span className="text-sm text-slate-500">
                Pastikan data terisi dengan benar
              </span>
            </div>
            
            <div className="w-full p-3">
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Username
                </small>
                <input type="text" id={`description-${myprops.item.user_details.username}`} 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black" 
                />
              </div>
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                Nik
                </small>
                <input type="text"  id={`description-${myprops.item.id}`}
                value={nik} 
                onChange={(e) => setNik(e.target.value)}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
                />
              </div>
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                 Name
                </small>
                <input type="text" id={`description-${myprops.item.id}`} 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
                />
              </div>
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                Address
                </small>
                <input type="text"  id={`description-${myprops.item.id}`}
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
                />
              </div>
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                Phone
                </small>
                <input type="text"  id={`description-${myprops.item.id}`}
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
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
              >Submit</button>
            </div>

          </form>
        </Modal>
    </div>
    </div>
  )
}

export default Editemployee