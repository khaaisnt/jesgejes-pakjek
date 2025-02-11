import React from 'react'
import { User } from '../types'
import EditKereta from '../kereta/EditKereta'
import Editemployee from './Editemployee'
import Deleteemployee from './Deleteemployee'
import Forgotpassword from './Forgotpassword'

interface props {
    item: User
}
const Employee = (myprops: props) => {
  return (
    <div className="w-full flex justify-between my-2 border border-black text-black rounded-md">
        <div className="w-full flex flex-col md:w-4/12 p-2">
        <small className="text-sm font-medium">
           Nik
        </small>
        <span >
           {myprops.item.nik}
        </span>
    </div>
    <div className="w-full flex flex-col  md:w-4/12 p-2">
        <small className="text-sm font-medium">
            Username
        </small>
        <span >
           {myprops.item.user_details.username}
        </span>
    </div>
    <div className="w-full flex flex-col  md:w-4/12 p-2">
        <small className="text-sm font-medium">
            Name
        </small>
        <span >{myprops.item.name}</span>
    </div>
    <div className="w-full flex flex-col md:w-4/12 p-2">
        <small className="text-sm font-medium">
            Phone
        </small>
        <span >
           {myprops.item.phone}
        </span>
    </div>
    <div className="w-full flex flex-col md:w-4/12 p-2">
        <small className="text-sm font-medium">
            Address
        </small>
        <span >
           {myprops.item.address}
        </span>
    </div>
    <div className="w-full flex flex-col  md:w-2/12 p-2">
        <small className="text-sm font-medium">
           Action
        </small>
       <div className='flex gap-2 items-center'>
        <Editemployee item={myprops.item}/>
        <Deleteemployee item={myprops.item}/>
        <Forgotpassword item={myprops.item}/>
       </div>
    </div>
</div>
  )
}

export default Employee