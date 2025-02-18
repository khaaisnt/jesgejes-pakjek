"use client";
import { Seat } from "@/app/karyawan/types";
import Modal from "@/components/modal";
import { FormEvent, useState } from "react";

type SeatBook = {
    passanger_id: string;
    passanger_name: string;
    seat_number: string;
}

type props = {
  item: Seat;
  onSave: (item: SeatBook) => void;
};

const Seats = (myProps: props) => {
  const [show, setShow] = useState<boolean>(false);
  const [passanger_id, setPassangerId] = useState<string>("");
  const [passanger_name, setPassangerName] = useState<string>("");
  const openModal = () => {
    setShow(true);
    setPassangerId("")
    setPassangerName("")
  }
  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent) => {
    try {
        e.preventDefault();
        setShow(false);
        myProps.onSave({
            passanger_id,
            passanger_name,
            seat_number: myProps.item.seat_number
        })
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => openModal()}
        className="size-10 flex items-center justify-center font-semibold rounded-md bg-sky-600 disabled:bg-slate-500 text-white"
        disabled={myProps.item.used}
      >
        {myProps.item.seat_number}
      </button>

      <Modal isShow={show}>
        <form onSubmit={handleSubmit}>
          <div className="w-full p-3 rounded-t-md">
            <h1 className="font-semibold text-lg text-black">
              Identitas Penumpang
            </h1>
            <span className="text-sm text-slate-500">
              Pastikan data terisi dengan benar
            </span>
          </div>

          <div className="w-full p-3">
            <div className="my-2">
              <small className="text-xs font-semibold text-sky-600">
                Nomor Kursi
              </small>
              <strong className="font-semibold">
                {myProps.item.seat_number}
              </strong>
            </div>
            <div className="my-2">
              <small className="text-xs font-semibold text-sky-600">
                NIK Penumpang
              </small>
              <input
                type="number"
                id={`nik-${myProps.item.id}`}
                required={true}
                value={passanger_id}
                onChange={e => setPassangerId(e.target.value)}
                className="w-full p-2 rounded-md border border-slate-400 text-sm"
                />
            </div>
            <div className="my-2">
              <small className="text-xs font-semibold text-sky-600">
                Nama Penumpang
              </small>
              <input
                type="text"
                id={`nama-${myProps.item.id}`}
                required={true}
                value={passanger_name}
                onChange={e => setPassangerName(e.target.value)}
                className="w-full p-2 rounded-md border border-slate-400 text-sm"
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

export default Seats;
