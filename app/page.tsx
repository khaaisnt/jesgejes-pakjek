"use client";
import { axiosInstance } from "@/helper/api";
import { storesCookie } from "@/helper/client.cookkie";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const response: any = await axiosInstance.post("/auth", {
        username,
        password,
      });

      if (response.data.success === false) {
        return toast(response.data.message, {
          type: "warning",
          containerId: "toastLogin",
        });
      }

      storesCookie("token", response.data.token);

      toast(response.data.message, {
        containerId: "toastLogin",
        type: "success",
      });

      // Redirect based on the role
      if (response.data.role === "ADMIN") {
        setTimeout(() => {
          router.replace("/karyawan/Customer"); // Redirect to karyawan page for admins
        }, 1000);
      } else {
        setTimeout(() => {
          router.replace("/pelanggan/Jadwal"); // Redirect to pelanggan page for other users
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast("some thing went wrong", {
        containerId: "toastLogin",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <ToastContainer containerId={"toastLogin"} />

      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please login to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200"
            >
              Login
              <span className="absolute right-3 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-sky-100 group-hover:text-sky-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
