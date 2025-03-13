import React from "react";
import { ScheduleTypes, Train } from "../types";
import { axiosInstance } from "@/helper/api";
import { getServerCookie } from "@/helper/server.cookie";
import Schedule from "./Schedule";
import AddSchedule from "./AddSchedule";
export const dynamic = "force-dynamic";

const getAllTrain = async (): Promise<Train[]> => {
  try {
    const token = await getServerCookie("token");

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

const getJadwal = async (): Promise<ScheduleTypes[]> => {
  try {
    const cookie = await getServerCookie("token");
    const response: any = await axiosInstance.get(`/schedule`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    if (!response.data.success) {
      return [];
    }

    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// ...existing imports...

const JadwalPage = async () => {
  const listJadwal = await getJadwal();
  const kereta = await getAllTrain();

  return (
    <div className=" mx-auto p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white">
              Data Jadwal Kereta
            </h1>
            <p className="text-sky-100">
              Kelola semua jadwal perjalanan kereta api
            </p>
          </div>
          <AddSchedule trains={kereta} />
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-sky-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">
              Daftar Jadwal
            </h2>
          </div>
        </div>

        {listJadwal.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-gray-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Belum ada jadwal tersedia
              </h3>
              <p className="text-gray-600">
                Mulai tambahkan jadwal perjalanan kereta api baru
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {listJadwal.map((jadwal, index) => (
              <Schedule
                key={`schedule-${jadwal.id}-${index}`}
                item={jadwal}
                trains={kereta}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JadwalPage;
