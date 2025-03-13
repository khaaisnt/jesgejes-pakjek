"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { axiosInstance } from "@/helper/api";
import { getStoresCookie } from "@/helper/client.cookkie";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/components/modal";
import DatePicker from "react-datepicker";
import { Train } from "../types";
import "react-datepicker/dist/react-datepicker.css";

interface props {
  trains: Train[];
}
const AddSchedule = (myprops: props) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [departured_time, setDepatured_time] = useState<Date>(new Date());
  const [arrived_time, setArived_time] = useState<Date>(new Date());
  const [trainId, setTrainId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const openModal = () => {
    setShow(true);
    setFrom("");
    setTo("");
    setDepatured_time(new Date());
    setArived_time(new Date());
    setTrainId(0);
    setPrice(0);
  };
  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const cookie = getStoresCookie("token");
      const response: any = await axiosInstance.post(
        "/schedule",
        {
          departured_location: from,
          arrived_location: to,
          departured_time: departured_time,
          arrived_time: arrived_time,
          train_id: trainId,
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
          containerId: "AddSchedule",
          type: "warning",
        });
      }

      closeModal();
      toast(response.data.message, {
        containerId: "AddSchedule",
        type: "success",
      });

      setTimeout(() => router.refresh(), 1000);
    } catch (error) {
      console.error(error);
      toast("Something went wrong", {
        containerId: "AddSchedule",
        type: "error",
      });
    }
  };
  return (
    <div>
      <ToastContainer containerId={"AddSchedule"} />
      <button
        onClick={openModal}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Tambah Jadwal
      </button>

      <Modal isShow={show}>
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <div className="w-full p-6 border-b bg-gradient-to-r from-sky-600 to-sky-700">
            <h1 className="text-xl font-semibold text-white">Tambah Jadwal</h1>
            <p className="text-sm text-sky-100 mt-1">
              Pastikan data terisi dengan benar
            </p>
          </div>

          <div className="w-full p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Lokasi Keberangkatan
                </label>
                <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    placeholder="Masukkan lokasi keberangkatan"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Lokasi Tujuan
                </label>
                <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    placeholder="Masukkan lokasi tujuan"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Waktu Keberangkatan
                </label>
                <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                  <DatePicker
                    selected={new Date(departured_time)}
                    onChange={(date) => setDepatured_time(date || new Date())}
                    showTimeInput
                    dateFormat="dd-MMMM-yyyy HH:mm"
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Waktu Kedatangan
                </label>
                <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                  <DatePicker
                    selected={new Date(arrived_time)}
                    onChange={(date) => setArived_time(date || new Date())}
                    showTimeInput
                    dateFormat="dd-MMMM-yyyy HH:mm"
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 focus:outline-none sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Unit Kereta
                </label>
                <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                  <select
                    value={trainId.toString()}
                    onChange={(e) => setTrainId(Number(e.target.value))}
                    required
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 focus:outline-none sm:text-sm"
                  >
                    <option value="">Pilih Unit Kereta</option>
                    {myprops.trains.map((train, index) => (
                      <option key={index} value={train.id}>
                        {train.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Harga Tiket
                </label>
                <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    min="0"
                    step="1000"
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    placeholder="Masukkan harga tiket"
                  />
                </div>
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

export default AddSchedule;
