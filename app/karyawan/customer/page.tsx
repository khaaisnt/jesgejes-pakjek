import { getServerCookie } from "@/helper/server.cookie";
import { Customer } from "../types";
import { axiosInstance } from "@/helper/api";
import CustomerData from "./Customer";
import AddCustomer from "./AddCustomer";

const getAllCustomer = async (): Promise<Customer[]> => {
  try {
    const token = await getServerCookie("token");
    console.log(token);

    const response: any = await axiosInstance.get("/customer", {
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

const customerPage = async () => {
  const dataCustomer = await getAllCustomer();

  return (
      <div className="w-full p-5 bg-white h-screen">
        <h1 className="text-2xl font-bold text-black">Data Pelanggan</h1>
        <span>Halaman ini memuat data karyawan SekopTix</span>
        <div className="my-3">
          <AddCustomer />
          {dataCustomer.map((customer, index) => (
            <CustomerData item={customer} key={`customer-${index}`} />
          ))}
        </div>
      </div>
  );
};

export default customerPage;
