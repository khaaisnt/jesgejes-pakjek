import React from "react";
import FilterTicket from "./FilterTicket";
import { ScheduleTypes } from "@/app/karyawan/types";
import { axiosInstance } from "@/helper/api";
import { getServerCookie } from "@/helper/server.cookie";
import Schedule from "./Schedule";
export const dynamic = "force-dynamic";

interface props {
  searchParams: {
    departured_location: string;
    arrived_location: string;
  };
}

const getJadwal = async (
  departured_location: string,
  arrived_location: string
): Promise<ScheduleTypes[]> => {
  try {
    const cookie = await getServerCookie("token");
    if (!departured_location || !arrived_location) return [];

    const response: any = await axiosInstance.get(
      `/schedule?departured_location=${departured_location}&arrived_location=${arrived_location}`,
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );

    if (!response.data?.success) {
      return [];
    }

    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const JadwalPage = async (myprops: props) => {
  const departured_location = await myprops.searchParams!.departured_location;
  const arrived_location = await myprops.searchParams!.arrived_location;
  const listJadwal = await getJadwal(departured_location, arrived_location);

  return (
    <div className=" mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="relative px-6 py-12 sm:px-8 sm:py-16">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-white/10 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-white text-3xl font-bold mb-2">
                  Pemesanan Tiket Kereta Api
                </h1>
                <p className="text-sky-100 text-sm">
                  Temukan jadwal perjalanan kereta api sesuai kebutuhan Anda
                </p>
              </div>
            </div>
            <FilterTicket
              arrived_location={arrived_location}
              departured_location={departured_location}
            />
          </div>
        </div>
      </div>

      {departured_location !== "" && arrived_location !== "" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Hasil Pencarian
            </h2>
          </div>

          {listJadwal.length === 0 ? (
            <div className="w-full p-8 rounded-xl bg-orange-50 border border-orange-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-orange-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">
                    Maaf, jadwal tidak tersedia
                  </h3>
                  <p className="text-orange-600">
                    Tidak ditemukan jadwal kereta api untuk rute ini. Silakan
                    coba:
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-orange-700">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                      Mengubah tanggal keberangkatan
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                      Mencoba rute perjalanan yang berbeda
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {listJadwal.map((jadwal, index) => (
                <Schedule
                  item={jadwal}
                  key={`schedule-${jadwal.id}-${index}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JadwalPage;
