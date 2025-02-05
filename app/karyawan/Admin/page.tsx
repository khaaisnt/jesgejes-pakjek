import { getServerCookie } from "@/helper/server.cookie";
import { Employee } from "../types";
import { axiosInstance } from "@/helper/api";
import AddAdmin from "./AddAdmin";
import EmployeeData from "./Admin";
import Sidebar from "@/components/sidebar";

const getAllAdmin = async (): Promise<Employee[]> => {
  try {
    const token = await getServerCookie("token");
    console.log(token);

    const response: any = await axiosInstance.get("/employee", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success == true) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const adminPage = async () => {
  const dataAdmin = await getAllAdmin();

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-5 bg-white h-screen">
        <h1 className="text-2xl font-bold text-black">Data Karyawan</h1>
        <span>Halaman ini memuat data karyawan SekopTix</span>
        <div className="my-3">
          <AddAdmin />
          {dataAdmin.map((admin, index) => (
            <EmployeeData item={admin} key={`admin-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default adminPage;
