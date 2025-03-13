"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { axiosInstance } from "@/helper/api";
import { getStoresCookie } from "@/helper/client.cookkie";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/components/modal";
import DatePicker from "react-datepicker";
import { ScheduleTypes, Train } from "../types";
import "react-datepicker/dist/react-datepicker.css";

interface props {
  schedule: ScheduleTypes;
  trains: Train[];
}
const EditSchedule = (myprops: props) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [from, setFrom] = useState<string>(
    myprops.schedule.departured_location
  );
  const [to, setTo] = useState<string>(myprops.schedule.arrived_location);
  const [departured_time, setDepatured_time] = useState<Date>(
    new Date(myprops.schedule.departured_time)
  );
  const [arrived_time, setArived_time] = useState<Date>(
    new Date(myprops.schedule.arrived_time)
  );
  const [trainId, setTrainId] = useState<number>(myprops.schedule.train_id);
  const [price, setPrice] = useState<number>(myprops.schedule.price);

  const openModal = () => {
    setShow(true);
    setFrom(myprops.schedule.departured_location);
    setTo(myprops.schedule.arrived_location);
    setDepatured_time(new Date(myprops.schedule.departured_time));
    setArived_time(new Date(myprops.schedule.arrived_time));
    setTrainId(myprops.schedule.train_id);
    setPrice(myprops.schedule.price);
  };
  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const cookie = getStoresCookie("token");
      const response: any = await axiosInstance.put(
        `/schedule/${myprops.schedule.id}`,
        {
          departured_location: from,
          arrived_location: to,
          departured_time: departured_time,
          arrived_time: arrived_time,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      if (!response.data.success) {
        toast(response.data.message, {
          containerId: `EditSchedule-${myprops.schedule.id}`,
          type: "warning",
        });
      }

      closeModal();
      toast(response.data.message, {
        containerId: `EditSchedule-${myprops.schedule.id}`,
        type: "success",
      });

      setTimeout(() => router.refresh(), 1000);
    } catch (error) {
      console.error(error);
      toast("Something went wrong", {
        containerId: `EditSchedule-${myprops.schedule.id}`,
        type: "error",
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`EditSchedule-${myprops.schedule.id}`} />
      <button
        onClick={openModal}
        className="p-2 bg-sky-600 hover:bg-sky-500 rounded-lg text-white transition-all duration-200"
        title="Edit Jadwal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>

      <Modal isShow={show}>
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <div className="w-full p-6 border-b bg-gradient-to-r from-sky-600 to-sky-700">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Edit Jadwal
                </h1>
                <p className="text-sm text-sky-100">
                  Pastikan data terisi dengan benar
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-6 space-y-4">
            {/* Departure Location */}
            <div className="space-y-2">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700"
              >
                Lokasi Keberangkatan
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <input
                  type="text"
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Masukkan lokasi keberangkatan"
                />
              </div>
            </div>

            {/* Arrival Location */}
            <div className="space-y-2">
              <label
                htmlFor="to"
                className="block text-sm font-medium text-gray-700"
              >
                Lokasi Kedatangan
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <input
                  type="text"
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Masukkan lokasi kedatangan"
                />
              </div>
            </div>

            {/* Departure Time */}
            <div className="space-y-2">
              <label
                htmlFor="departured_time"
                className="block text-sm font-medium text-gray-700"
              >
                Waktu Keberangkatan
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <DatePicker
                  id="departured_time"
                  selected={departured_time}
                  onChange={(date) => setDepatured_time(date || new Date())}
                  showTimeInput
                  dateFormat="dd MMMM yyyy HH:mm"
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            {/* Arrival Time */}
            <div className="space-y-2">
              <label
                htmlFor="arrived_time"
                className="block text-sm font-medium text-gray-700"
              >
                Waktu Kedatangan
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <DatePicker
                  id="arrived_time"
                  selected={arrived_time}
                  onChange={(date) => setArived_time(date || new Date())}
                  showTimeInput
                  dateFormat="dd MMMM yyyy HH:mm"
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            {/* Train Selection */}
            <div className="space-y-2">
              <label
                htmlFor="train"
                className="block text-sm font-medium text-gray-700"
              >
                Kereta
              </label>
              <div className="relative rounded-lg border border-gray-300 bg-gray-50 shadow-sm">
                <select
                  id="train"
                  value={trainId}
                  onChange={(e) => setTrainId(Number(e.target.value))}
                  disabled
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-500 focus:outline-none sm:text-sm"
                >
                  <option value="">Pilih Kereta</option>
                  {myprops.trains.map((train) => (
                    <option key={train.id} value={train.id}>
                      {train.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Harga
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">Rp</span>
                </div>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                  min="0"
                  className="block w-full rounded-lg border-0 py-3 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="w-full px-6 py-4 bg-gray-50 border-t flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-500 transition-colors duration-200"
            >
              Simpan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditSchedule;
