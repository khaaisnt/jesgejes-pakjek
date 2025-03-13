import { ScheduleTypes } from "@/app/karyawan/types";
import Link from "next/link";
import React from "react";

interface props {
  item: ScheduleTypes;
}

export const showTime = (date: string) => {
  const currentDate = new Date(date);
  return currentDate.toLocaleTimeString("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
const Schedule = (myprops: props) => {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-sky-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <div>
              <small className="text-sm font-medium text-gray-500">
                Berangkat Dari
              </small>
              <p className="text-gray-900 font-semibold">
                {myprops.item.departured_location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-sky-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <small className="text-sm font-medium text-gray-500">
                Waktu Keberangkatan
              </small>
              <p className="text-gray-900 font-semibold">
                {showTime(myprops.item.departured_time)}
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-emerald-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <div>
              <small className="text-sm font-medium text-gray-500">
                Tiba Di
              </small>
              <p className="text-gray-900 font-semibold">
                {myprops.item.arrived_location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-emerald-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <small className="text-sm font-medium text-gray-500">
                Waktu Kedatangan
              </small>
              <p className="text-gray-900 font-semibold">
                {showTime(myprops.item.arrived_time)}
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-purple-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </div>
            <div>
              <small className="text-sm font-medium text-gray-500">
                Unit Kereta
              </small>
              <p className="text-gray-900 font-semibold">
                {myprops.item.train_details.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-purple-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <small className="text-sm font-medium text-gray-500">Harga</small>
              <p className="text-gray-900 font-semibold">
                {myprops.item.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/12 p-3 flex flex-col">
          <small className="text-sm font-medium text-gray-500">Opsi</small>
          <Link href={`/pelanggan/Jadwal/${myprops.item.id}`}>
            <button
              type="button"
              className="bg-orange-600 hover:bg-orange-500 text-white rounded-md py-2 px-4"
            >
              Pesan
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
