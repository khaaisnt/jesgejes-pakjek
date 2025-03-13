'use client'

import Link from "next/link";
import { Train } from "../types"
import DeleteKereta from "./DeleteKereta";
import EditKereta from "./EditKereta";

interface props {
    item: Train;
}

const TrainData = ({ item }: props) => {
  return (
    <div className="w-full bg-white my-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex flex-wrap items-center p-4">
        <div className="w-full md:w-4/12 mb-4 md:mb-0">
          <div className="space-y-1">
            <small className="text-sm font-medium text-gray-500">
              Nama Kereta
            </small>
            <Link 
              href={`/karyawan/kereta/${item.id}`}
              className="block text-lg font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              {item.name}
            </Link>
          </div>
        </div>

        <div className="w-full md:w-4/12 mb-4 md:mb-0">
          <div className="space-y-1">
            <small className="text-sm font-medium text-gray-500">
              Deskripsi
            </small>
            <p className="text-gray-700 line-clamp-2">{item.descriptions}</p>
          </div>
        </div>

        <div className="w-full md:w-2/12 mb-4 md:mb-0">
          <div className="space-y-1">
            <small className="text-sm font-medium text-gray-500 block">
              Tipe Kereta
            </small>
            <span className="px-3 py-1 text-sm max-w-[90px] font-medium text-sky-700 bg-sky-50 rounded-full block">
              {item.type}
            </span>
          </div>
        </div>

        <div className="w-full md:w-2/12">
          <div className="space-y-1">
            <small className="text-sm font-medium text-gray-500">
              Opsi
            </small>
            <div className="flex gap-2 items-center">
              <EditKereta kereta={item}/>
              <DeleteKereta keretaId={item.id}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainData