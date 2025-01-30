'use client'

import Link from "next/link";
import { Train } from "../types"
import DeleteKereta from "./DeleteKereta";
import EditKereta from "./EditKereta";

interface props {
    item: Train;  // Assuming Train is the type of data that this component expects to receive from the parent component  // assuming Train is the type of data that this component expects to receive from the parent component  // assuming Train is the type of data that this component expects to receive from the parent component  // assuming Train is the type of data that this component expects to receive from the parent component  // assuming Train is the type of data that this component expects to receive from the parent component  // assuming Train is the type of data that this component expects to receive from the parent component  // assuming Train is the type of data that this component expects to receive from the parent component  // assuming Train is the type of data that this component expects to receive from the parent component  // assuming Train is the type of data that this component expects to receive from the parent component  // assuming Train is the type of data that this component expects to receive from the parent component  // assuming Train
}

const TrainData = (
    { item }: props
) => {
  return (
    <div className="w-full flex flex-wrap my-2 border border-black text-black rounded-md">
        <div className="w-full flex flex-col  md:w-4/12 p-2">
            <small className="text-sm font-medium">
                Nama Kereta
            </small>
            <span >
                <Link href={`/karyawan/kereta/${item.id}`}>
                {item.name}
                </Link>
            </span>
        </div>
        <div className="w-full flex flex-col  md:w-4/12 p-2">
            <small className="text-sm font-medium">
                Deskripsi
            </small>
            <span >{item.descriptions}</span>
        </div>
        <div className="w-full flex flex-col  md:w-2/12 p-2">
            <small className="text-sm font-medium">
                Tipe Kereta
            </small>
            <span >{item.type}</span>
        </div>
        <div className="w-full flex flex-col  md:w-2/12 p-2">
            <small className="text-sm font-medium">
                Opsi
            </small>
            <div className="flex gap-2 items-center">
                <EditKereta kereta={item}/>
                <DeleteKereta keretaId={item.id}/>
            </div>
        </div>
    </div>
  )
}

export default TrainData