"use client";

import Modal from "@/components/modal";
import { axiosInstance } from "@/helper/api";
import { getStoresCookie } from "@/helper/client.cookkie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Train } from "../types";

type props = {
  kereta: Train;
};

const EditKereta = (myprops: props) => {
  const [name, setName] = useState<string>(myprops.kereta.name);
  const [descriptions, setDescriptions] = useState<string>(
    myprops.kereta.descriptions
  );
  const [type, setType] = useState<string>(myprops.kereta.type);
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setName(myprops.kereta.name);
    setDescriptions(myprops.kereta.descriptions);
    setType(myprops.kereta.type);
    setShow(true);
  };

  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const cookie = getStoresCookie("token");
      const request = {
        name,
        descriptions,
        type,
      };

      const response: any = await axiosInstance.put(
        `/train/${myprops.kereta.id}`,
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
          containerId: `toastEdit-${myprops.kereta.id}`,
        });
      }

      toast(message, {
        type: "success",
        containerId: `toastEdit-${myprops.kereta.id}`,
      });
      setShow(false);
      setTimeout(() => router.refresh(), 1000);
    } catch (error) {
      console.log(error);
      toast(
        `Something went wrong`,

        {
          toastId: `toastEdit-${myprops.kereta.id}`,
          type: "error",
        }
      );
    }
  };

  return (
    <div>
      <ToastContainer containerId={`toastEdit-${myprops.kereta.id}`} />
      <button
        type="button"
        className="p-2 bg-sky-600 hover:bg-sky-500 rounded-lg text-white transition-all duration-200"
        onClick={() => openModal()}
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
            <h1 className="text-xl font-semibold text-white">Edit Kereta</h1>
            <p className="text-sm text-sky-100 mt-1">
              Pastikan data terisi dengan benar
            </p>
          </div>

          <div className="w-full p-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor={`name-${myprops.kereta.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Nama Kereta
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <input
                  type="text"
                  id={`name-${myprops.kereta.id}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Masukkan nama kereta"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`description-${myprops.kereta.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Deskripsi Kereta
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <textarea
                  id={`description-${myprops.kereta.id}`}
                  value={descriptions}
                  onChange={(e) => setDescriptions(e.target.value)}
                  required
                  rows={3}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Masukkan deskripsi kereta"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`type-${myprops.kereta.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Tipe Kereta
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <select
                  id={`type-${myprops.kereta.id}`}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 focus:outline-none sm:text-sm"
                >
                  <option value="">Pilih tipe kereta</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="Eksekutif">Eksekutif</option>
                </select>
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

export default EditKereta;
