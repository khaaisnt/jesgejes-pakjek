import { getServerCookie } from "@/helper/server.cookie";
import { Train } from "../types";
import { axiosInstance } from "@/helper/api";
import TrainData from "./Kereta";
import AddKereta from "./AddKereta";
import Sidebar from "@/components/sidebar";

const getAllTrain = async (): Promise<Train[]> => {
  try {
    const token = await getServerCookie("token");

    console.log(token);

    const response: any = await axiosInstance.get("/train", {
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

const keretaPage = async () => {
  const dataKereta = await getAllTrain();

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full p-5 bg-white h-screen">
        <h1 className="text-2xl font-bold text-black">Data Kereta</h1>
        <span className="text-base text-black">
          Halaman ini memuat data kereta api yang tersedia
        </span>
        <div className="my-3">
          <AddKereta />
          {dataKereta.map((kereta, index) => (
            <TrainData item={kereta} key={`kereta-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default keretaPage;
