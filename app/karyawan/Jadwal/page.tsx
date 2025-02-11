import React from 'react'
import { ScheduleTypes } from '../types'
import { axiosInstance } from '@/helper/api'
import { getServerCookie } from '@/helper/server.cookie'
import Schedule from './Schedule'
import AddSchedule from './AddSchedule'


const getJadwal = async (): Promise<ScheduleTypes[]> => {
    try {

        const cookie = await getServerCookie('token')
        const response: any = await axiosInstance.get(`/schedule`, {
            headers: {
                Authorization: `Bearer ${cookie}`,
            }
        })

        if (!response.data.success) {
            return []
        }

        return response.data.data
    } catch (error) {
        console.error(error)
        return []
    }
 }

const JadwalPage = async () => {

    const listJadwal = await getJadwal()

  return (
    <div className="w-full p-5 bg-white">
         <h1 className="text-xl font-semibold text-black">Data Jadwal</h1>
            <span className="text-sm text-black">
                Halaman ini memuat data jadwal kereta
            </span>
            <div className="my-3">
                <AddSchedule/>
                {
                    listJadwal.map((jadwal, index) => (
                        <Schedule key={index} item={jadwal}/>
                    ))
                }
            </div>
    </div>
  )
}

export default JadwalPage