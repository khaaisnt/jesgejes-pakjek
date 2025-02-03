"use client";

import Modal from "@/components/modal";
import { axiosInstance } from "@/helper/api";
import { getStoresCookie } from "@/helper/client.cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface props {
  id: number;
}

const AddSeat = (myProps: props) => {
  const [seat_number, setSeatNumber] = useState<string>("");
  const [wagon_id, setWagonId] = useState<number | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setShow(true);
    setSeatNumber("");
    setWagonId(myProps.id);
    setShow(true);
  };

  const closeModal = () => setShow(false);

  const handleReset = () => {
    setSeatNumber(0);
    setWagonId(myProps.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const cookie = getStoresCookie("token");

      const respose: any = await axiosInstance.post(
        "/train/wagon/seat",
        {
          seat_number,
          wagon_id: Number(wagon_id),
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      if (respose.data.success === false) {
        setShow(false);
        toast(`${respose.data.message}`, {
          containerId: "toastAddSeat",
          type: "warning",
        });
        handleReset();
      } else {
        setShow(false);
        toast(`${respose.data.message}`, {
          containerId: "toastAddSeat",
          type: "success",
        });
        handleReset();
        setTimeout(() => router.refresh(), 1000);
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong", {
        containerId: "toastAddSeat",
        type: "error",
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`toastAddSeat`} />
      <button
        type="button"
        className="bg-green-600 hover:bg-green-500 duration-200 cursor-pointer rounded-md size-20 justify-center text-2xl text-white font-semibold flex items-center"
        onClick={() => openModal()}
      >
        +
      </button>
      <Modal isShow={show}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-md">
            <h1 className="font-semibold text-lg text-black">Tambah Kursi</h1>
            <span className="text-sm text-slate-500">
              Pastikan data terisi dengan benar
            </span>
          </div>

          <div className="w-full p-3">
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Nama Kursi
              </small>
              <input
                type="string"
                id={`seat_number`}
                value={seat_number}
                onChange={(e) => setSeatNumber(e.target.value)}
                required={true}
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

export default AddSeat;
