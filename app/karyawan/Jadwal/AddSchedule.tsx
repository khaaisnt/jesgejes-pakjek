'use client'

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { axiosInstance } from "@/helper/api"
import { getStoresCookie, storesCookie } from "@/helper/client.cookkie"
import { toast, ToastContainer } from "react-toastify"
import Modal from "@/components/modal"
import DatePicker from "react-datepicker"
import { Train } from "../types"
import "react-datepicker/dist/react-datepicker.css"

interface props {
  trains: Train[]
}
const AddSchedule = (myprops: props) => {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [from, setFrom] = useState<string>("")
    const [to, setTo] = useState<string>("")
    const [departured_time, setDepatured_time] = useState<Date>(new Date())
    const [arrived_time, setArived_time] = useState<Date>(new Date())
    const [trainId, setTrainId] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setShow(true)
        setFrom("")
        setTo("")
        setDepatured_time(new Date())
        setArived_time(new Date())
        setTrainId(0)
        setPrice(0)
    }
    const closeModal = () => setShow(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
       
        try {
            const cookie = getStoresCookie('token')
            const response: any = await axiosInstance.post('/schedule', {
                departured_location: from,
                arrived_location: to,
                departured_time: departured_time,
                arrived_time: arrived_time,
                train_id: trainId,
                price: price
            }, {
                headers: {
                    Authorization: `Bearer ${cookie}`,
                },
            })

            if (!response.data.success) {
                toast(response.data.message, {
                    containerId: 'AddSchedule',
                    type: 'warning',
                })
            }

            closeModal()
            toast(response.data.message, {
                containerId: 'AddSchedule',
                type:'success',
            })

            setTimeout(() => router.refresh(), 1000)

        } catch (error) {
            console.error(error)
            toast("Something went wrong", {
                containerId: 'AddSchedule',
                type: 'error',
            })
        }
    }
  return (
    <div>
        <ToastContainer containerId={'AddSchedule'}/>
        <button onClick={openModal} className="px-4 py-2 rounded-md bg-lime-600 hover:bg-lime-500 text-white">Add Schedule</button>
        <Modal isShow={show}>
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className="w-full p-3 rounded-t-md">
              <h1 className="font-semibold text-lg text-black">Tambah Jadwal</h1>
              <span className="text-sm text-slate-500">
                Pastikan data terisi dengan benar
              </span>
            </div>

            <div className="w-full p-3">
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                 Depature Location
                </small>
                <input type="text" id="name" 
                value={from} 
                onChange={(e) => setFrom(e.target.value)}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black" 
                />
              </div>
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                 Arive Location
                </small>
                <input type="text" id="descriptions" 
                value={to} 
                onChange={(e) => setTo(e.target.value)}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
                />
              </div>
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                 Departured Time
                </small>
              <DatePicker className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black" id="departured-time" 
              showTimeInput
              selected={new Date(departured_time)}
              dateFormat={`dd-MMMM-yyyy HH:mm`}
              onChange={(date) => setDepatured_time(date || new Date())}
              />
              </div>
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                 Arived Time
                </small>
                <DatePicker className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black" id="departured-time" 
                showTimeInput
              selected={new Date(arrived_time)}
              dateFormat={`dd-MMMM-yyyy HH:mm`}
              onChange={(date) => setArived_time(date || new Date())}/>
              </div>
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                 Train Id
                </small>
                <select id="type" 
                value={trainId.toString()} 
                onChange={(e) => setTrainId(Number(e.target.value))}
                required 
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
                >
                   <option value="">Pilih Jenis Kereta</option>
                {
                  myprops.trains.map((train, index) => (
                    <option key={index} value={train.id}>{train.name}</option>
                  ))
                }
                </select>

               
              </div>
              <div className="my-2 border rounded-md p-3">
                <small className="text-sm font-semibold text-sky-600">
                 Price
                </small>
                <input type="text" id="type" 
                value={price.toString()} 
                onChange={(e) => setPrice(Number(e.target.value))}
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

export default AddSchedule