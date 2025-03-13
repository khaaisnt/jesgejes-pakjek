import React from "react";
import HistoryCard from "./_components/HistoryCard";
import { axiosInstance } from "@/helper/api";
import { getServerCookie } from "@/helper/server.cookie";
import FilterHistory from "./_components/FilterHistory";
import { History } from "@/app/karyawan/types";
export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    start_date?: string;
    end_date?: string;
  };
}

const GetDataHistory = async (
  start_date?: string,
  end_date?: string
): Promise<History[]> => {
  try {
    const token = await getServerCookie("token");

    const isValidDate = (date: string | undefined) =>
      date && !isNaN(new Date(date).getTime());

    let url = "/purchase/customer";
    if (isValidDate(start_date) && isValidDate(end_date)) {
      const startTime = new Date(start_date!).getTime();
      const endTime = new Date(end_date!).getTime();

      if (startTime <= endTime) {
        url = `/purchase/customer?start_date=${start_date}&end_date=${end_date}`;
      }
    }

    const response: any = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) return [];

    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Page = async ({ searchParams }: Props) => {
  const { start_date, end_date } = searchParams;
  const historyData = await GetDataHistory(start_date, end_date);

  return (
    <div className="mx-auto p-6">
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Riwayat Pemesanan</h1>
            <p className="text-blue-100 text-sm">
              Lihat semua riwayat pemesanan tiket Anda
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <FilterHistory
          start_date={start_date ? new Date(start_date) : new Date()}
          end_date={end_date ? new Date(end_date) : new Date()}
        />
      </div>

      <div className="space-y-4">
        {historyData.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 002.25 2.25h.75m0-3.75h3.75M9 15h3.75M9 12h3.75m3-3H18"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Daftar Pemesanan
                </h2>
              </div>
              <div className="px-4 py-2 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-700">
                  {historyData.length} Pemesanan
                </span>
              </div>
            </div>
            <div className="grid gap-4">
              {historyData.map((item, index) => (
                <HistoryCard key={`history-${item.id}-${index}`} item={item} />
              ))}
            </div>
          </>
        ) : (
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
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Tidak Ada Pemesanan
              </h3>
              <p className="text-gray-600">
                Belum ada riwayat pemesanan tiket untuk periode ini
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
