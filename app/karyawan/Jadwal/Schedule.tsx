import React from 'react'
import { ScheduleTypes, Train } from '../types'
import EditSchedule from './EditJadwal'
import DeleteSchedule from './DeleteSchedule'

interface props {
    item: ScheduleTypes
    trains: Train[]
}

const showTime = (date: string) => {
    const currentDate = new Date(date)
    return currentDate.toLocaleTimeString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}
const Schedule = (myprops: props) => {
  return (
    <div className='flex flex-wrap w-full border rounded-md shadow-md my-2'>
        <div className="w-full md:w-3/12 p-3 flex flex-col">
        <small className='text-xs font-semibold text-sky-700'>
            Berangkat Dari
        </small>
        <strong>{myprops.item.departured_location}</strong>
        <small className='text-xs font-semibold text-sky-700'>Waktu Keberangkatan</small>
        <strong>{showTime(myprops.item.departured_time)}</strong>
        </div>

        <div className="w-full md:w-3/12 p-3 flex flex-col">
        <small className='text-xs font-semibold text-sky-700'>
            Tiba Di
        </small>
        <strong>{myprops.item.arrived_location}</strong>
        <small className='text-xs font-semibold text-sky-700'>Waktu Kedatangan</small>
        <strong>{showTime(myprops.item.arrived_time)}</strong>
        </div>

        <div className="w-full md:w-4/12 p-3 flex flex-col">
        <small className='text-xs font-semibold text-sky-700'>
            Unit Kereta
        </small>
        <strong>{myprops.item.train_details.name}</strong>
        <small className='text-xs font-semibold text-sky-700'>Harga</small>
        <strong>{myprops.item.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'IDR',
        })}</strong>
        </div>

        <div className='p-3 flex'>
        <EditSchedule trains={myprops.trains} schedule={myprops.item}/>
        <DeleteSchedule item={myprops.item}/>
        </div>
    </div>
  )
}

export default Schedule