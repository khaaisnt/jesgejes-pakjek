"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { axiosInstance } from "@/helper/api";
import { getStoresCookie, storesCookie } from "@/helper/client.cookkie";
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
        className="px-4 py-2 rounded-md bg-lime-600 hover:bg-lime-500 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>
      <Modal isShow={show}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-md">
            <h1 className="font-semibold text-lg text-black">Tambah Jadwal</h1>
            <span className="text-sm text-slate-500">
              Pastikan data terisi dengan benar
            </span>
          </div>

          <div className="w-full p-3">
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Depature Location
              </small>
              <input
                type="text"
                id="name"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Arive Location
              </small>
              <input
                type="text"
                id="descriptions"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Departured Time
              </small>
              <DatePicker
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
                id="departured-time"
                showTimeInput
                selected={new Date(departured_time)}
                dateFormat={`dd-MMMM-yyyy HH:mm`}
                onChange={(date) => setDepatured_time(date || new Date())}
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Arived Time
              </small>
              <DatePicker
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
                id="departured-time"
                showTimeInput
                selected={new Date(arrived_time)}
                dateFormat={`dd-MMMM-yyyy HH:mm`}
                onChange={(date) => setArived_time(date || new Date())}
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Train Id
              </small>
              <select
                id="type"
                value={trainId.toString()}
                onChange={(e) => setTrainId(Number(e.target.value))}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
                disabled
              >
                 <option value="">Pilih Jenis Kereta</option>
                {
                  myprops.trains.map((train, index) => (
                    <option key={index} value={train.id}>{train.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Price
              </small>
              <input
                type="text"
                id="type"
                value={price.toString()}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
          </div>

          <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => closeModal()}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditSchedule;
