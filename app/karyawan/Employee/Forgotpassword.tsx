"use client";
import React, { FormEvent, useState } from "react";
import { User } from "../types";
import { toast, ToastContainer } from "react-toastify";
import { getStoresCookie } from "@/helper/client.cookkie";
import { axiosInstance } from "@/helper/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal";

interface props {
  item: User;
}
const Forgotpassword = (myprops: props) => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const openModal = () => {
    setShow(true);
    setPassword("");
  };
  const closeModal = () => setShow(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const cookie = getStoresCookie("token");
      const response: any = await axiosInstance.put(
        `/employee/${myprops.item.id}`,
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      if (response.data.success !== true) {
        toast(response.data.message, {
          containerId: `toastForgot-${myprops.item.id}`,
          type: "warning",
        });
      }

      toast(response.data.message, {
        containerId: `toastForgot-${myprops.item.id}`,
        type: "success",
      });

      setShow(false);
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast(`Something went wrong`, {
        containerId: `toastForgot-${myprops.item.id}`,
        type: "error",
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`toastForgot-${myprops.item.id}`} />
      <button
        type="button"
        className="p-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-white transition-all duration-200 hover:shadow-md"
        onClick={() => openModal()}
        title="Reset Password"
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
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </button>

      <Modal isShow={show}>
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <div className="w-full p-6 border-b bg-gradient-to-r from-amber-600 to-amber-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Reset Password
                </h1>
                <p className="text-amber-100 text-sm">
                  Masukkan password baru untuk akun ini
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor={`password-${myprops.item.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Password Baru
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500">
                <input
                  type="password"
                  id={`password-${myprops.item.id}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Minimal 8 karakter"
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
              disabled={password.length < 8}
              className="px-4 py-2.5 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Reset Password
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Forgotpassword;
