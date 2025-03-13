"use client";

import { seat as seatType } from "@/app/karyawan/types";
import Modal from "@/components/modal";
import { getStoresCookie } from "@/helper/client.cookkie";
import { FormEvent, useState } from "react";

interface SeatBook {
  passanger_id: string;
  passanger_name: string;
  seat_number: string;
}

interface Props {
  item: seatType;
  onSave: (item: SeatBook) => void;
}
const Seat = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [passanger_id, setPasanger_id] = useState<string>("");
  const [passanger_name, setPasanger_name] = useState<string>("");

  const openModal = () => {
    setShow(true);
    setPasanger_id("");
    setPasanger_name("");
  };

  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const cookie = getStoresCookie("token");
    setShow(false);
    props.onSave({
      passanger_id,
      passanger_name,
      seat_number: props.item.seat_number,
    });
  };

  return (
    <div>
      <button
        disabled={props.item.used}
        onClick={() => openModal()}
        type="button"
        className={`
          size-14 flex items-center justify-center font-medium rounded-lg 
          transition-all duration-200 relative group
          ${
            props.item.used
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-sky-600 hover:bg-sky-500 text-white hover:shadow-md"
          }
        `}
      >
        <div className="relative">
          <span>{props.item.seat_number}</span>
        </div>
      </button>

      <Modal isShow={show}>
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <div className="w-full p-6 border-b bg-gradient-to-r from-sky-600 to-sky-700">
            <h1 className="text-xl font-semibold text-white">Pesan Kursi</h1>
            <p className="text-sm text-sky-100 mt-1">
              Pastikan data terisi dengan benar
            </p>
            <div className="inline-block mt-3 px-3 py-1 bg-sky-500/20 backdrop-blur-sm rounded-lg">
              <span className="text-sm font-medium text-white">
                Kursi {props.item.seat_number}
              </span>
            </div>
          </div>

          <div className="w-full p-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor={`NIK-${props.item.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Nomor Induk Kependudukan (NIK)
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <input
                  type="number"
                  id={`NIK-${props.item.id}`}
                  value={passanger_id}
                  onChange={(e) => setPasanger_id(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Masukkan 16 digit NIK"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`Name-${props.item.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Nama Lengkap
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <input
                  type="text"
                  id={`Name-${props.item.id}`}
                  value={passanger_name}
                  onChange={(e) => setPasanger_name(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>
          </div>

          <div className="w-full px-6 py-4 bg-gray-50 border-t flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => closeModal()}
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

export default Seat;
