import { getServerCookie } from "@/helper/server.cookie";
import { Schedule } from "../../types";
import { axiosInstance } from "@/helper/api";
import Jadwal from "./Jadwal";
import { Train } from "../../types";
import AddJadwal from "./AddJadwal";

const getJadwal = async (): Promise<Schedule[]> => {
  try {
    const url = `/schedule`;
    const TOKEN = await getServerCookie(`token`);

    const response: any = await axiosInstance.get(url, {
      headers: { authorization: `Bearer ${TOKEN}` },
    });

    if (response.data.success === true) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

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

const JadwalPage = async () => {
  const dataJadwal = await getJadwal();
  const dataKereta = await getAllTrain();

  return (
    <div className="w-full p-5 bg-white">
      <h1 className="text-xl font-bold">Data Jadwal</h1>
      <span className="text-sm text-slate-500">
        Halaman ini memuat daftar jadwal kereta api yang tersedia
      </span>

      <div className="my-3">
        <AddJadwal trains={dataKereta} />
        {dataJadwal.map((jadwal, index) => (
          <Jadwal key={`keyJadwal-${index}`} item={jadwal} train={dataKereta} />
        ))}
      </div>
    </div>
  );
};

export default JadwalPage;
