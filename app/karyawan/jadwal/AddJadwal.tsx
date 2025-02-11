"use client";

import Modal from "@/components/modal";
import { axiosInstance } from "@/helper/api";
import { getStoresCookie } from "@/helper/client.cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import { Train } from "../types";
import "react-datepicker/dist/react-datepicker.css";

type props = {
  trains: Train[];
};

const AddJadwal = (myProps: props) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [departured_location, setDeparturedLocation] = useState<string>("");
  const [arrived_location, setArrivedLocation] = useState<string>("");
  const [departured_time, setDeparturedTime] = useState<Date>(new Date());
  const [arrived_time, setArrivedTime] = useState<Date>(new Date());
  const [train_id, setTrainId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const openModal = () => {
    setShow(true);
    setDeparturedLocation("");
    setArrivedLocation("");
    setDeparturedTime(new Date());
    setArrivedTime(new Date());
    setTrainId(0);
    setPrice(0);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `/schedule`;
      const requestData = {
        departured_location,
        arrived_location,
        departured_time,
        arrived_time,
        train_id,
        price,
      };

      const token = getStoresCookie(`token`);

      const response: any = await axiosInstance.post(url, requestData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const message = response.data.message;
      if (response.data.success === true) {
        toast(message, {
          containerId: `toastAddJadwal`,
          type: `success`,
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(message, {
          containerId: `toastAddJadwal`,
          type: `warning`,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Something wrong`, {
        containerId: `toastAddJadwal`,
        type: `error`,
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={"toastAddJadwal"} />
      <button
        className="text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-md duration-200"
        onClick={openModal}
      >
        Tambah Jadwal Kereta
      </button>
      <Modal isShow={show}>
        <form onSubmit={handleSubmit}>
          {/* Modal header */}
          <div className="w-full p-3 rounded-t-md">
            <h1 className="font-semibold text-lg text-black">Tambah Kereta</h1>
            <span className="text-sm text-slate-500">
              Pastikan data terisi dengan benar
            </span>
          </div>

          {/* Modal body */}
          <div className="w-full p-3">
            <div className="my-2 border rounded-md">
              <small className="text-xs p-1 font-semibold text-sky-500">
                Berangkat dari
              </small>
              <input
                type="text"
                id={`departured_location`}
                value={departured_location}
                onChange={(e) => setDeparturedLocation(e.target.value)}
                className="p-1 outline-none w-full hover:border-b border-b-sky-500"
                required={true}
              />
            </div>
            <div className="my-2 border rounded-md">
              <small className="text-xs p-1 font-semibold text-sky-500">
                Waktu Keberangkatan
              </small>
              <br />

              <DatePicker
                showTimeInput={true}
                id={`departured_time`}
                selected={new Date(departured_time)}
                dateFormat={`dd MMMM yyyy HH:mm`}
                className="p-1 outline-none w-full hover:border-b border-b-sky-500"
                onChange={(date) => setDeparturedTime(date || new Date())}
              />
            </div>
            <div className="my-2 border rounded-md">
              <small className="text-xs p-1 font-semibold text-sky-500">
                Tiba di
              </small>
              <input
                type="text"
                id={`arrived_location`}
                value={arrived_location}
                onChange={(e) => setArrivedLocation(e.target.value)}
                className="p-1 outline-none w-full hover:border-b border-b-sky-500"
                required={true}
              />
            </div>
            <div className="my-2 border rounded-md">
              <small className="text-xs p-1 font-semibold text-sky-500">
                Waktu Kedatangan
              </small>
              <br />
              <DatePicker
                showTimeInput={true}
                id={`arrived_time`}
                selected={new Date(arrived_time)}
                dateFormat={`dd MMMM yyyy HH:mm`}
                className="p-1 outline-none w-full hover:border-b border-b-sky-500"
                onChange={(date) => setArrivedTime(date || new Date())}
              />
            </div>
            <div className="my-2 border rounded-md">
              <small className="text-xs p-1 font-semibold text-sky-500">
                Harga
              </small>
              <input
                type="number"
                id={`price`}
                value={price.toString()}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="p-1 outline-none w-full hover:border-b border-b-sky-500"
                required={true}
              />
            </div>
            <div className="my-2 border rounded-md">
              <small className="text-xs p-1 font-semibold text-sky-500">
                Jenis Kereta
              </small>
              <select
                id={`train_id`}
                value={train_id.toString()}
                onChange={(e) => setTrainId(Number(e.target.value))}
                className="p-1 outline-none w-full border border-b-sky-500"
                required={true}
              >
                <option value="">Pilih Jenis Kereta</option>
                {myProps.trains.map((kereta, index) => (
                  <option
                    className="rounded-md shadow-sm border-none"
                    key={`optionKereta-${index}`}
                    value={kereta.id}
                  >
                    {kereta.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Modal Footer */}
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

export default AddJadwal;
