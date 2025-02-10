"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/helper/client.cookie";

type props = {
  children: ReactNode
}

const Sidebar = (myProps: props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();
  
  const handleLogout = () => {
    removeCookie("token");
    router.replace("/");
  }

  return (
    <div>
      <div className="flex justify-between md:hidden items-center bg-purple-800 text-white">
        <h1 className="p-4 text-2xl font-bold">SekopTix</h1>
        <button
          className="md:hidden p-4 text-white bg-purple-800"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block md:w-56 w-full transition-all duration-100 md:h-screen relative overflow-y-auto bg-purple-800 text-white flex flex-col`}
      >
        <div className="p-4 text-2xl hidden md:block font-bold">SekopTix</div>
        <nav className="flex w-full flex-col gap-3 p-4">
          <Link
            href="/karyawan/kereta"
            className="w-full py-2 px-2 hover:bg-purple-600 font-medium duration-200 rounded"
          >
            Kereta
          </Link>
          <Link
            href="/karyawan/pelanggan"
            className="w-full py-2 px-2 hover:bg-purple-600 font-medium duration-200 rounded"
          >
            Pelanggan
          </Link>
          <Link
            href="/karyawan/admin"
            className="w-full py-2 px-2 hover:bg-purple-600 font-medium duration-200 rounded"
          >
            Admin
          </Link>
          <div className="fles items-end h-full justify-end">
            <button
              onClick={handleLogout}
              className="w-full py-2 px-2 bg-red-600 hover:bg-red-700 font-medium duration-200 rounded-md"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
