import { getServerCookie } from "@/helper/server.cookie";
import { Train } from "../types";
import { axiosInstance } from "@/helper/api";
import TrainData from "./Train";
import AddKereta from "./addKereta";
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

const keretaPage = async () => {
  const dataKereta = await getAllTrain();

  return (
    <div className="mx-auto p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white">Data Kereta</h1>
            <p className="text-sky-100">
              Kelola semua data kereta api yang tersedia
            </p>
          </div>
          <AddKereta />
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Daftar Kereta
            </h2>
          </div>
        </div>

        {dataKereta.length === 0 ? (
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
                Belum Ada Kereta
              </h3>
              <p className="text-gray-600">Mulai tambahkan data kereta baru</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {dataKereta.map((kereta, index) => (
              <TrainData item={kereta} key={`kereta-${kereta.id}-${index}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default keretaPage;
