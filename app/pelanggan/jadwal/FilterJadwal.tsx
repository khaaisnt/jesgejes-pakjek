"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type props = {
  departuredLocation: string;
  arrivedLocation: string;
};

const FilterJadwal = (myProps: props) => {
  const [departured_location, setDeparturedLocation] = useState<string>("");
  const [arrived_location, setArrivedLocation] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    if (departured_location !== "" && arrived_location !== "") {
      router.push(
        `/pelanggan/jadwal?departured_location=${departured_location}&arrived_location=${arrived_location}`
      );
    }
  };

  //   digunakan untuk update data saat komponen dimuat ulang
  useEffect(() => {
    setDeparturedLocation(myProps.departuredLocation);
    setArrivedLocation(myProps.arrivedLocation);
  }, [myProps]);

  return (
    <div className="py-5 w-full flex flex-wrap items-center">
      <div className="w-full md:w-1/2 p-3">
        <strong className="font-semibold text-white">Stasiun Asal</strong>
        <br />
        <input
          type="text"
          id={`departured_location`}
          className="w-full p-2 border rounded-md"
          value={departured_location}
          onChange={(e) => setDeparturedLocation(e.target.value)}
        />
      </div>
      <div className="w-full md:w-1/2 p-3">
        <strong className="font-semibold text-white">Stasiun Tujuan</strong>
        <br />
        <input
          type="text"
          id={`arrived_location`}
          className="w-full p-2 border rounded-md"
          value={arrived_location}
          onChange={(e) => setArrivedLocation(e.target.value)}
        />
      </div>
      <button
        className="bg-purple-600 mx-3 hover:bg-purple-500 transition-all duration-200 text-white px-4 py-2 rounded-md"
        onClick={handleSearch}
      >
        Cari Kereta
      </button>
    </div>
  );
};

export default FilterJadwal;
