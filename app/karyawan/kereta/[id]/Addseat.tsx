"use client"
import Modal from '@/components/modal'
import { axiosInstance } from '@/helper/api'
import { getStoresCookie } from '@/helper/client.cookkie'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

interface props {
  wagonId: number
  id: number
}

const Addseat = (myprops: props) => {
  const [show, setShow] = useState<boolean>(false)
  const [seatNumber, setSeatNumber] = useState<string>("")
  const router = useRouter()

  const openModal = () => setShow(true)
  const closeModal = () => setShow(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const cookie = getStoresCookie('token')
      const response: any = await axiosInstance.post(`/train/wagon/seat`, {
        seat_number: seatNumber,
        wagon_id: myprops.wagonId,
      }, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })

      if (response.data.success === false) {
        toast(response.data.message, {
          containerId: `toastAddSeat-${myprops.id}`,
          type: "warning",
        })
        setSeatNumber("")
        setShow(false)
      }

      setShow(false)
      toast('Gerbong Kereta Berhasil Ditambahkan', {
        containerId: `toastAddSeat-${myprops.id}`,
        type: "success",
      })
      setSeatNumber("")
      setTimeout(() => router.refresh(), 1000)
      
    } catch (error) {
      console.log(error)
      toast('Something Went Wrong', {
        containerId: `toastAddSeat-${myprops.id}`,
        type: "error",
      })
    }
  }

  return (
    <>
    <ToastContainer containerId={`toastAddSeat-${myprops.id}`}/>
    <button className='size-20 rounded-sm flex items-center justify-center bg-green-700 text-white font-bold text-2xl cursor-pointer'
    onClick={() => setShow(true)}
    >
        &#43;
    </button>
    <Modal isShow={show}>
    <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-md">
              <h1 className="font-semibold text-lg text-black">Tambah Kursi Kereta</h1>
              <span className="text-sm text-slate-500">
                Pastikan data terisi dengan benar
              </span>
            </div>

            <div className="w-full p-3">
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Seat Number
                </small>
                <input type="text" id="name" 
                value={seatNumber} 
                onChange={(e) => setSeatNumber(e.target.value)}
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
    </>
  )
}

export default Addseat