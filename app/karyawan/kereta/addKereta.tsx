'use client'

import Modal from "@/components/modal"
import { axiosInstance } from "@/helper/api"
import { getStoresCookie } from "@/helper/client.cookkie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const AddKereta = () => {
    const [name, setName] = useState<string>('')
    const [descriptions, setDescriptions] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
      setName("")
      setDescriptions("")
      setType("")
      setShow(true)
      
    }

    const closeModal = () => setShow(false)

    const handleSubmit = async (e: FormEvent) => {
      
      try {
       e.preventDefault()
        
       const cookie = getStoresCookie('token')
       const request = {
        name, descriptions, type
       }

       const response: any = await axiosInstance.post('/train',
        request, {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
       )

       const message = response.data.message

       if (response.data.success != true) {
        toast(message, {
          type:'warning',
          containerId: 'toastAdd'
        })
       }

       toast(message, {
        type:'success',
        containerId: 'toastAdd'
      })
     setShow(false)
     setTimeout(() => router.refresh(), 1000)


    } catch (error) {
      console.log(error)
      toast(
        `Something went wrong`,

        {
          containerId: 'toastAdd',
          type: 'error',
        }
      )      
     }
    }


  return (
    <div>
      <ToastContainer containerId={'toastAdd'}/>
        <button type="submit" className="px-4 py-2 rounded-md bg-lime-600 hover:bg-lime-500 text-white"
        onClick={() => openModal()}
        >
            Tambah Kereta
        </button>
        <Modal isShow={show}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="w-full p-3 rounded-t-md">
              <h1 className="font-semibold text-lg text-black">Tambah Kereta</h1>
              <span className="text-sm text-slate-500">
                Pastikan data terisi dengan benar
              </span>
            </div>
            
            <div className="w-full p-3">
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                  Nama Kereta
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
                 Deskripsi Kereta
                </small>
                <input type="text" id="descriptions" 
                value={descriptions} 
                onChange={(e) => setDescriptions(e.target.value)}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
                />
              </div>
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                 Tipe Kereta
                </small>
                <input type="text" id="type" 
                value={type} 
                onChange={(e) => setType(e.target.value)}
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

export default AddKereta