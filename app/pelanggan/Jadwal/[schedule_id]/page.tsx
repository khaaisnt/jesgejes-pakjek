import React from "react";
import { ScheduleTypes, Train } from "../../../karyawan/types";
import { axiosInstance } from "@/helper/api";
import { getServerCookie } from "@/helper/server.cookie";
import Reservasion from "./reservasion";

const getTrainBySchedule = async (
  schedule_id: number
): Promise<Train | null> => {
  try {
    const token = await getServerCookie("token");

    const response: any = await axiosInstance.get(
      `/schedule/train/${schedule_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.success) return null;

    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getScheduleDetails = async (
  schedule_id: number
): Promise<ScheduleTypes | null> => {
  try {
    const token = await getServerCookie("token");

    const response: any = await axiosInstance.get(`/schedule/${schedule_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) return null;

    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const showTime = (date: string) => {
  const currentDate = new Date(date);
  return currentDate.toLocaleTimeString("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

interface Props {
  params: {
    schedule_id: number;
  };
}

const page = async (myprops: Props) => {
  const detailsKereta = await getTrainBySchedule(myprops.params.schedule_id);
  const detailsSchedule = await getScheduleDetails(myprops.params.schedule_id);

  return (
    <div className=" mx-auto p-6">
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Detail Perjalanan
        </h1>
        <p className="text-sky-100">
          Informasi lengkap jadwal keberangkatan kereta
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Keberangkatan
            </h2>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-sky-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-sky-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Stasiun Keberangkatan
                </p>
                <p className="text-gray-900 font-medium">
                  {detailsSchedule?.departured_location}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-sky-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-sky-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Waktu Keberangkatan
                </p>
                <p className="text-gray-900 font-medium">
                  {showTime(detailsSchedule?.departured_time as string)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Kedatangan
            </h2>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-emerald-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Stasiun Kedatangan
                </p>
                <p className="text-gray-900 font-medium">
                  {detailsSchedule?.arrived_location}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-emerald-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Waktu Kedatangan
                </p>
                <p className="text-gray-900 font-medium">
                  {showTime(detailsSchedule?.arrived_time as string)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-purple-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Unit Kereta</p>
              <p className="text-gray-900 font-medium">{detailsKereta?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <Reservasion
        schedule_id={detailsSchedule!.id}
        wagons={detailsKereta!.wagons}
      />
    </div>
  );
};

export default page;
