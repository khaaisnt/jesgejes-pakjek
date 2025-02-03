"use client";
import { seat } from "@/app/karyawan/types";
import Modal from "@/components/modal";
import { axiosInstance } from "@/helper/api";
import { getStoresCookie } from "@/helper/client.cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface props {
    kursi: seat;
}

const EditSeat = (myProps: props) => {
    const [seat_number, setSeatNumber] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const router = useRouter();

    const openModal = () => {
        setSeatNumber(myProps.kursi.seat_number);
        setShow(true);
    };

    const closeModal = () => setShow(false);

    const handleSubmit = async (e: FormEvent) => {
        try {
          e.preventDefault();
    
          const cookie = getStoresCookie("token");
          const request = {
            seat_number
          };
    
          const response: any = await axiosInstance.put(
            `/train/wagon/seat/${myProps.kursi.id}`,
            request,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
              },
            }
          );
    
          const message = response.data.message;
    
          if (response.data.success != true) {
            toast(message, {
              type: "warning",
              containerId: `toastEdit-${myProps.kursi.id}`,
            });
          }
    
          toast(message, {
            type: "success",
            containerId: `toastEdit-${myProps.kursi.id}`,
          });
          setShow(false);
          setTimeout(() => router.refresh(), 1000);
        } catch (error) {
          console.log(error);
          toast(
            `Something went wrong`,
    
            {
              toastId: `toastEdit-${myProps.kursi.id}`,
              type: "error",
            }
          );
        }
      };

    return (
    <div>
      <ToastContainer containerId={`toastEdit-${myProps.kursi.id}`} />
      <button
        type="button"
        className="px-1 py-1 bg-yellow-500 hover:bg-yellow-400 duration-200 text-black rounded-full"
        onClick={() => openModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <Modal isShow={show}>
      <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-md">
            <h1 className="font-semibold text-lg text-black">Edit Gerbong</h1>
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
                type="text"
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

export default EditSeat;
