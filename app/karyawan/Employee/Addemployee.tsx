'use client'
import Modal from '@/components/modal'
import React, { FormEvent, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { getStoresCookie } from '@/helper/client.cookkie'
import { axiosInstance } from '@/helper/api'

const Addemployee = () => {
    const [show, setShow] = useState(false);
    const [username,setUsername]= useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [nik, setNik] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone,setPhone] = useState<string>("")

    const router = useRouter()

    const openModal = () => {
        setUsername("")
        setPassword("")
        setNik("")
        setName("")
        setAddress("")
        setPhone("")
        setShow(true)
    }

    const closeModal = () => setShow(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const cookie = getStoresCookie('token')
            const response: any = await axiosInstance.post('/employee/register', {
                username,
                password,
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
                    containerId: "AddEmployee",
                    type: "warning",
                })
            }

            toast(response.data.message, {
                containerId: "AddEmployee",
                type: "success",
            })
            setShow(false)
            setTimeout(() => router.refresh(), 1000)
        } catch (error) {
            console.log(error)
            toast(`Something went wrong`, {
                containerId: "AddEmployee",
                type: "error",
            })
        }

    }
  return (
    <div>
        <ToastContainer containerId={'AddEmployee'}/>
      <button onClick={() => openModal()} type="submit" className="px-4 py-2 rounded-md bg-lime-600 hover:bg-lime-500 text-white">
            Tambah Karyawan
        </button>
        <Modal isShow={show}>
         <form onSubmit={(e) => handleSubmit(e)}>
         <div className="w-full p-3 rounded-t-md">
              <h1 className="font-semibold text-lg text-black">Tambah Karyawan</h1>
              <span className="text-sm text-slate-500">
                Pastikan data terisi dengan benar
              </span>
            </div>

            <div className="w-full p-3">
                
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Username
                </small>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-lime-600"
                  required
                />
              </div>

              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Password
                </small>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-lime-600"
                  required
                />
              </div>

              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Nik
                </small>
                <input
                  type="text"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-lime-600"
                  required
                />
              </div>

              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Name
                </small>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-lime-600"
                  required
                />
              </div>

              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Address
                </small>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-lime-600"
                  required
                />
              </div>

              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Phone
                </small>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-lime-600"
                  required
                />
              </div>
              </div>

              <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
             <button type="button" onClick={() => closeModal()}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
              >Close</button>
             <button type="submit"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-md" disabled={password.length < 8 || password === ""? true : false}
              >Submit</button>
            </div>
         </form>
        </Modal>
    </div>
  )
}

export default Addemployee