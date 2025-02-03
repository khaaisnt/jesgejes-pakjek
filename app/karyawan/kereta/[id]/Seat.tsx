import React from 'react'
import { seat } from '../../types'

interface props {
  item: seat
}
const Seat = (myprops: props) => {
  return (
    <div className='size-20 rounded-sm flex items-center justify-center bg-sky-700'>
        <span className='text-white font-semibold'>
            {myprops.item.seat_number}
        </span>
    </div>
  )
}

export default Seat