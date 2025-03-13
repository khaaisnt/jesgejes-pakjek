"use client";
import React, { FormEvent, useState } from "react";
import { User } from "../types";
import { useRouter } from "next/navigation";
import { getStoresCookie } from "@/helper/client.cookkie";
import { axiosInstance } from "@/helper/api";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/components/modal";

interface props {
  item: User;
}
const Editemployee = (myprops: props) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState<string>(
    myprops.item.user_details.username
  );
  const [nik, setNik] = useState<string>(myprops.item.nik);
  const [name, setName] = useState<string>(myprops.item.name);
  const [address, setAddress] = useState<string>(myprops.item.address);
  const [phone, setPhone] = useState<string>(myprops.item.phone);

  const openModal = () => {
    setUsername(myprops.item.user_details.username);
    setNik(myprops.item.nik);
    setName(myprops.item.name);
    setAddress(myprops.item.address);
    setPhone(myprops.item.phone);
    setShow(true);
  };

  const router = useRouter();

  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const cookie = getStoresCookie("token");
      const response: any = await axiosInstance.put(
        `/employee/${myprops.item.id}`,
        {
          username,
          nik,
          name,
          address,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      if (response.data.success !== true) {
        toast(response.data.message, {
          containerId: `EditEmployee-${myprops.item.id}`,
          type: "warning",
        });
      }

      toast(response.data.message, {
        containerId: `EditEmployee-${myprops.item.id}`,
        type: "success",
      });
      setShow(false);
      setTimeout(() => router.refresh(), 1000);
    } catch (error) {
      console.log(error);
      toast(`Something went wrong`, {
        containerId: `EditEmployee-${myprops.item.id}`,
        type: "error",
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`EditEmployee-${myprops.item.id}`} />
      <button
        type="button"
        onClick={() => openModal()}
        className="p-2 bg-sky-600 hover:bg-sky-500 rounded-lg text-white transition-all duration-200"
        title="Edit Karyawan"
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
                  Edit Karyawan
                </h1>
                <p className="text-sm text-sky-100">
                  Pastikan data terisi dengan benar
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-6 space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <label
                htmlFor={`username-${myprops.item.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <input
                  type="text"
                  id={`username-${myprops.item.id}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Masukkan username"
                />
              </div>
            </div>

            {/* NIK Field */}
            <div className="space-y-2">
              <label
                htmlFor={`nik-${myprops.item.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                NIK
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <input
                  type="text"
                  id={`nik-${myprops.item.id}`}
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Masukkan NIK"
                />
              </div>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor={`name-${myprops.item.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Nama Lengkap
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <input
                  type="text"
                  id={`name-${myprops.item.id}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <label
                htmlFor={`address-${myprops.item.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Alamat
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <textarea
                  id={`address-${myprops.item.id}`}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows={3}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Masukkan alamat lengkap"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label
                htmlFor={`phone-${myprops.item.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Nomor Telepon
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <input
                  type="tel"
                  id={`phone-${myprops.item.id}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Masukkan nomor telepon"
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

export default Editemployee;
