"use client"

import Seat from "@/app/pelanggan/jadwal/[schedule_id]/seats"
import { Wagon } from "@/app/karyawan/types"
import { axiosInstance } from "@/helper/api"
import { getStoresCookie } from "@/helper/client.cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

type props = {
    schedule_id: number,
    wagons: Wagon[]
}

type SeatBook = {
    passenger_id: string;
    passenger_name: string;
    seat_number: string;
}

const Booking = (myProps: props) => {   
    const [details, setDetails] = useState<SeatBook[]>([])
    const [wagons, setWagons] = useState<Wagon[]>([])
    const router = useRouter()

    useEffect(() => {
    // copy data array dari props "wagons" ke state "wagons"
        setWagons([...myProps.wagons])
    }, [myProps])

    const handleAddSeat = (seatBook: SeatBook) => {
        const temp = [...details]
        temp.push(seatBook)
        setDetails(temp)

        const tempWagons = [...wagons]
        // mencari posisi index dari gerbong yg mempunyai "seat_number" dari yg dipilih user
        const findWagonIndex = tempWagons.findIndex(
            item => item.seats.map(it => it.seat_number).includes(seatBook.seat_number)
        )
        // mencari posisi index dari kursi yg dipilih
        const findSeatIndex = tempWagons[findWagonIndex].seats.findIndex(
            item => item.seat_number === seatBook.seat_number
        )

        // mengubah status "used" menjadi true
        tempWagons[findWagonIndex].seats[findSeatIndex].used = true

        setWagons([...tempWagons])
    }
    
    const handleRemoveSeat = (index: number, seatBook: SeatBook) => {
        const temp = [...details]
        temp.splice(index, 1)
        setDetails(temp)

        const tempWagons = [...wagons]
        // mencari posisi index dari gerbong yg mempunyai "seat_number" dari yg dipilih user
        const findWagonIndex = tempWagons.findIndex(
            item => item.seats.map(it => it.seat_number).includes(seatBook.seat_number)
        )
        // mencari posisi index dari kursi yg dipilih
        const findSeatIndex = tempWagons[findWagonIndex].seats.findIndex(
            item => item.seat_number === seatBook.seat_number
        )

        // mengubah status "used" menjadi true
        tempWagons[findWagonIndex].seats[findSeatIndex].used = false

        setWagons([...tempWagons])
    }

    const handleSave = async () => {
        try {
            if (details.length == 0){
                toast(`Pilih kursih terlebih dahulu`, {
                    containerId: `toastBook`,
                    type: `warning`
                })
                return
            }

            const url = `/purchase/customer`
            const requestData = {
                purchase_date: new Date().toISOString().substring(0, 10),
                schedule_id: myProps.schedule_id,
                details: details
            }
            const TOKEN = await getStoresCookie(`token`) || ""
            const response: any = await axiosInstance.post(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })
            if (response.data.success == true){
                const message = response.data.message
                toast(message, {
                    containerId: `toastBook`,
                    type: `success`
                })
                // direck ke halaman pencarian jadwal
                router.replace(`/pelanggan/jadwal`)
            }

        } catch (error) {
            console.log(error)
            toast(`Something went wrong`, {
                containerId: `toastBook`,
                type: `error`
            })
        }
    }
    
    return (
        <div>
            <ToastContainer containerId={`toastBook`} />
            {
                myProps.wagons.map((item, index) => (
                    <div key={`keyWagon-${index}`} className="w-full my-2 p-3 rounded-md border shadow-md">
                        <h3 className="font-semibold my-2">{item.name}</h3>
                        <div className="flex flex-wrap gap-3">
                            {
                                item.seats.map((seat, indexSeat) => (
                                    <Seat 
                                    key={`keySeat-${index}-${indexSeat}`}
                                    item={seat}
                                    onSave={seatBook => handleAddSeat(seatBook)} 
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            <button 
            type="button"
            onClick={() => handleSave()}
            className="w-full rounded-md my-2 p-2 bg-purple-600 hover:bg-purple-500 text-white"
            >
                Pesan
            </button>
        </div>
    )
}

export default Booking