import React from "react";
import { User } from "../types";
import Editemployee from "./Editemployee";
import Deleteemployee from "./Deleteemployee";
import Forgotpassword from "./Forgotpassword";

interface props {
  item: User;
}

const Employee = (myprops: props) => {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 my-3">
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="space-y-1.5">
          <small className="text-sm font-medium text-gray-500">NIK</small>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-sky-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
              />
            </svg>
            <p className="text-gray-900 font-medium">{myprops.item.nik}</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <small className="text-sm font-medium text-gray-500">Username</small>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-sky-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <p className="text-gray-900 font-medium">
              {myprops.item.user_details.username}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <small className="text-sm font-medium text-gray-500">Name</small>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-sky-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-gray-900 font-medium">{myprops.item.name}</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <small className="text-sm font-medium text-gray-500">Phone</small>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-sky-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <p className="text-gray-900 font-medium">{myprops.item.phone}</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <small className="text-sm font-medium text-gray-500">Address</small>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-sky-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <p className="text-gray-900 font-medium truncate">
              {myprops.item.address}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <small className="text-sm font-medium text-gray-500">Actions</small>
          <div className="flex items-center gap-2">
            <Editemployee item={myprops.item} />
            <Deleteemployee item={myprops.item} />
            <Forgotpassword item={myprops.item} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
