"use client"
import Modal from '@/components/modal'
import { axiosInstance } from '@/helper/api'
import { getStoresCookie } from '@/helper/client.cookkie'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

interface props {
  id: number
}

const Addgerbong = (myprops: props) => {
  const [name,setName] = useState<string>("")
  const [seatCount, setSeatCount] = useState<number>(0)
  const [trainId, setTrainId] = useState<number | null>(null)
  const [show, setShow] = useState<boolean>(false)
  const router = useRouter()

  const openModal = () => {
    setShow(true)
    setName("")
    setSeatCount(0)
    setTrainId(myprops.id)
    setShow(true)
  }

  const closeModal = () => setShow(false)

  const handleReset = () => {
    setName("")
    setSeatCount(0)
    setTrainId(myprops.id)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
    const cookie = getStoresCookie('token')

    const response: any = await axiosInstance.post('/train/wagon', {
      name,
      seat_count: seatCount,
      train_id: Number(trainId),
    },
    {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    })
  

    if (response.data.success === false) {
      setShow(false)
      toast(`${response.data.message}`, {
        containerId: "toastAddGerbong",
        type: "warning",
      })
      handleReset()
    } else {
      setShow(false)
      toast(`${response.data.message}`, {
        containerId: "toastAddGerbong",
        type: "success",
      })
      handleReset()
      setTimeout(() => router.refresh(), 1000)
    }
    } catch (error) {
      console.log(error)
      toast("Something went wrong", {
        containerId: "toastAddGerbong",
        type: "error",
      })
    }

  }
  return (
    <div>
      <ToastContainer containerId={`toastAddGerbong`}/>
        <button type='button' 
        className='px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white'
        onClick={() => openModal()}
        >
            Tambah Gerbong
        </button>
        <Modal isShow={show}>
          <form onSubmit={handleSubmit}>
          <div className="w-full p-3 rounded-t-md">
              <h1 className="font-semibold text-lg text-black">Tambah Gerbong Kereta</h1>
              <span className="text-sm text-slate-500">
                Pastikan data terisi dengan benar
              </span>
            </div>

            <div className="w-full p-3">
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Nama Gerbong
                </small>
                <input type="text" id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black" 
                />
              </div>

              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                 Jumlah Kursi
                </small>
                <input type="text" id="descriptions" 
                value={seatCount.toString()} 
                onChange={(e) => setSeatCount(Number(e.target.value))}
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
  )
}

export default Addgerbong