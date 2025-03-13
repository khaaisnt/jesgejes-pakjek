import { getServerCookie } from "@/helper/server.cookie";
import { Train } from "../../types";
import { axiosInstance } from "@/helper/api";
import Gerbong from "./Gerbong";
import Addgerbong from "./Addgerbong";

const getDetailKereta = async (id: string): Promise<Train | null> => {
  try {
    const token = await getServerCookie("token");
    const response: any = await axiosInstance.get(`/train/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success === false) {
      return null;
    }

    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

type props = {
  params: {
    id: string;
  };
};

const DetailsKereta = async (myprops: props) => {
  const id = myprops.params.id;
  const data = await getDetailKereta(id);

  return (
    <div className=" mx-auto p-6">
      {data === null ? (
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-orange-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-orange-800">
                Data Tidak Ditemukan
              </h1>
              <p className="text-orange-600 mt-1">
                Kereta dengan ID tersebut tidak ditemukan dalam sistem
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-white">{data.name}</h1>
                <p className="text-sky-100">{data.descriptions}</p>
              </div>
              <div className="px-3 py-1 bg-sky-500/20 rounded-lg backdrop-blur-sm">
                <span className="text-sm font-medium text-white">
                  {data.type}
                </span>
              </div>
            </div>
          </div>

          {/* Wagons Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
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
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Daftar Gerbong
                  </h2>
                  <p className="text-sm text-gray-500">
                    Total {data.wagons.length} gerbong tersedia
                  </p>
                </div>
              </div>
              <Addgerbong id={data.id} />
            </div>

            {data.wagons.length === 0 ? (
              <div className="text-center py-12">
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
                    Belum Ada Gerbong
                  </h3>
                  <p className="text-gray-600">
                    Mulai tambahkan gerbong untuk kereta ini
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {data.wagons.map((gerbong, index) => (
                  <Gerbong item={gerbong} key={`Gerbong-${index}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsKereta;
