"use client";

import Modal from "@/components/modal";
import { axiosInstance } from "@/helper/api";
import { getStoresCookie } from "@/helper/client.cookkie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddKereta = () => {
  const [name, setName] = useState<string>("");
  const [descriptions, setDescriptions] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setName("");
    setDescriptions("");
    setType("");
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

      const response: any = await axiosInstance.post("/train", request, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });

      const message = response.data.message;

      if (response.data.success != true) {
        toast(message, {
          type: "warning",
          containerId: "toastAdd",
        });
      }

      toast(message, {
        type: "success",
        containerId: "toastAdd",
      });
      setShow(false);
      setTimeout(() => router.refresh(), 1000);
    } catch (error) {
      console.log(error);
      toast(
        `Something went wrong`,

        {
          containerId: "toastAdd",
          type: "error",
        }
      );
    }
  };

  return (
    <div>
      <ToastContainer containerId={"toastAdd"} />
      <button
        onClick={() => openModal()}
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
        Tambah Kereta
      </button>

      <Modal isShow={show}>
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <div className="w-full p-6 border-b bg-gradient-to-r from-sky-600 to-sky-700">
            <h1 className="text-xl font-semibold text-white">Tambah Kereta</h1>
            <p className="text-sm text-sky-100 mt-1">
              Pastikan data terisi dengan benar
            </p>
          </div>

          <div className="w-full p-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Kereta
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <input
                  type="text"
                  id="name"
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
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Tipe Kereta
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 focus:outline-none sm:text-sm"
                >
                  <option value="">Pilih tipe kereta</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="Bisnis">Bisnis</option>
                  <option value="Eksekutif">Eksekutif</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="descriptions"
                className="block text-sm font-medium text-gray-700"
              >
                Deskripsi
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <textarea
                  id="descriptions"
                  rows={4}
                  value={descriptions}
                  onChange={(e) => setDescriptions(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Masukkan deskripsi kereta"
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

export default AddKereta;
