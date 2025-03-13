import React from 'react'
import { seat } from '../../types'
import Editseat from './Editseat'
import Deleteseat from './Deleteseat'

interface props {
  item: seat
}

const Seat = (myprops: props) => {
  return (
    <div className={`
      relative group
      size-24
      rounded-lg
      ${myprops.item.used ? 'bg-gray-500' : 'bg-sky-600 hover:bg-sky-700'}
      transition-all duration-200
      flex flex-col items-center justify-center
      shadow-sm hover:shadow-md
    `}>
      <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
        <div className='bg-white rounded-md shadow-lg p-1'>
          <Editseat 
            seatId={myprops.item.id} 
            seatName={myprops.item.seat_number}
          />
        </div>
        <div className='bg-white rounded-md shadow-lg p-1'>
          <Deleteseat seatId={myprops.item.id} />
        </div>
      </div>

      <div className='flex flex-col items-center gap-1'>
        <span className='text-white font-medium text-lg'>
          {myprops.item.seat_number}
        </span>
      </div>
    </div>
  )
}

export default Seat