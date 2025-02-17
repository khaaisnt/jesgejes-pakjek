import FilterJadwal from "./FilterJadwal"
import { Schedule } from "@/app/karyawan/types";
import { axiosInstance } from "@/helper/api";
import { getServerCookie } from "@/helper/server.cookie";
import Jadwal from "./Jadwal";

const getJadwal = async (departured_location: string, arrived_location: string): Promise<Schedule[]> => {
  try {
    const url = `/schedule?departured_location=${departured_location}&arrived_location=${arrived_location}`;
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

type props = {
    queryParam: Record<string, string | string[] | undefined>
}

const JadwalPage = async (myProps: props) => {
    const departured_location = myProps.queryParam?.departured_location?.toString() || ""
    const arrived_location = myProps.queryParam?.arrived_location?.toString() || ""
    const dataJadwal = await getJadwal(departured_location, arrived_location)

    return (
        <div className="w-full p-3 bg-white">
            <div className="bg-blue-700 w-full rounded-md shadow-md">
                <h1 className="text-white p-3 text-xl font-bold">
                    Pemesanan Tiket Kereta Api
                </h1>

                <FilterJadwal 
                departuredLocation={departured_location}
                arrivedLocation={arrived_location}
                />
            </div>

            {
                departured_location !== "" &&
                arrived_location !== "" &&
                <div className="my-3">
                    {
                        dataJadwal.length == 0 ?
                            <div className="w-full p-3 rounded-md bg-orange-200">
                                Maaf, jadwal tidak tersedia
                            </div> :
                            <div>
                                {
                                    dataJadwal.map((jadwal, index) => (
                                        <Jadwal key={`keyJadwal-${index}`} item={jadwal} />
                                    ))
                                }
                            </div>
                    }
                </div>
            }
        </div>
    )
}

export default JadwalPage