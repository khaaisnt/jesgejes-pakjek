import { User } from "../types";
import { getServerCookie } from "@/helper/server.cookie";
import { axiosInstance } from "@/helper/api";
import Addemployee from "./Addemployee";
import Employee from "./Employee";
export const dynamic = "force-dynamic";

const getAllEmployee = async (): Promise<User[]> => {
  try {
    const token = await getServerCookie("token");

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
const page = async () => {
  const employees = await getAllEmployee();
  console.log(employees);

  return (
    <div className="w-full p-5 bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white">Data Petugas</h1>
            <p className="text-sky-100">
              Kelola semua data petugas yang tersedia
            </p>
          </div>
          <Addemployee />
        </div>
      </div>
      <div className="my-3">
        {employees.map((employee, index) => (
          <Employee item={employee} key={`employee-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default page;
