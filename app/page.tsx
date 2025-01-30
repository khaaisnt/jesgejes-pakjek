"use client";

import { axiosInstance } from "@/helper/api";
import { storeCookie } from "@/helper/client-cookie";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `/auth`
      const requestData = {
        username,
        password
      }
      // hit endpoint
      const response: any = await axiosInstance.post(url, requestData);
      if(response.data.success === false) {
      const message = response.data.message;
        toast(
          message, {
          type: `warning`,
          containerId: `toastLogin`
        })
      } else {
        const message = response.data.message;
        const token = response.data.token;
        const role = response.data.role;

        // store token in cookie
        storeCookie(`token`, token);
        toast(
          message, {
          type: `success`,
          containerId: `toastLogin`
        }
        )

        // redirect to home

      }
    } catch (error) {
      console.log(error);
      // toast.error("Login failed");
      toast(
        `Something wrong`,
        {
          containerId: `toastLogin`,
          type: `error`,
        }
      )
    }
  }

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <ToastContainer containerId={`toastLogin`} />
      <form className="w-5/6 md:w-1/2 border rounded-lg bg-white shadow-sm" onSubmit={e => handleSubmit(e)}>
        {/* header login */}
        <div className="w-full bg-blue-600 rounded-t-lg text-white p-3">
          <h1 className="text-xl font-semibold">Login KAI</h1>
        </div>

        {/* login body */}
        <div className="w-full p-5">
          <div className="mb-3">
            <span className="text-sm text-blue-600">Username</span>
            <input
              className="w-full p-2 border rounded-md"
              required={true}
              type="text"
              id={`username`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <span className="text-sm text-blue-600">Password</span>
            <input
              className="w-full p-2 border rounded-md"
              required={true}
              type="password"
              id={`password`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-gradient-to-tl duration-200 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
