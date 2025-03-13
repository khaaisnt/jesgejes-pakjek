"use client";
import { removeCookie } from "@/helper/client.cookkie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";

interface props {
  children: ReactNode;
}

const EmployeeTemplate = (myprops: props) => {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    removeCookie("token");
    router.push("/");
  };

  const navLinks = [
    {
      href: "/karyawan/kereta",
      label: "Data Kereta",
      icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    },
    {
      href: "/karyawan/Employee",
      label: "Data Petugas",
      icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
    },
    {
      href: "/karyawan/Customer",
      label: "Data Pelanggan",
      icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    },
    {
      href: "/karyawan/Jadwal",
      label: "Jadwal",
      icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    },
  ];

  return (
    <div className="w-dvw overflow-x-hidden min-h-screen">
      <header className="w-full px-4 py-3 bg-gradient-to-r from-sky-600 to-sky-700 shadow-md flex items-center gap-4">
        <button
          type="button"
          className="size-10 rounded-lg flex justify-center items-center bg-sky-500/20 hover:bg-sky-500/30 text-white transition-all"
          onClick={() => setShow(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white">Sekopling Jesgejes</h1>
      </header>

      {/* Overlay */}
      {show && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setShow(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-72 bg-white shadow-xl h-dvh fixed top-0 z-50 transform transition-transform duration-300 ease-in-out ${
          show ? "left-0" : "-left-72"
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-sky-600 to-sky-700">
          <div className="flex items-center gap-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
            <span className="font-semibold">Dashboard</span>
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-white/80 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-sky-50 hover:text-sky-600 transition-all group"
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
                  d={link.icon}
                />
              </svg>
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-0 w-full p-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          Logout
        </button>
      </div>

      <main className="p-6">{myprops.children}</main>
    </div>
  );
};

export default EmployeeTemplate;
