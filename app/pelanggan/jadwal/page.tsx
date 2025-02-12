const JadwalPage = async () => {
    return (
        <div className="w-full p-3 bg-white">
            <div className="bg-blue-600 w-full rounded-md shadow-md">
                <h1 className="text-white text-xl font-bold">
                    Pemesanan Tiket Kereta Api
                </h1>

                <div className="my-5 w-full flex flex-wrap items-center">
                    <div className="w-full md:w-1/2 p-3">
                        <strong className="font-semibold text-white">Stasiun Asal</strong>
                        <input 
                        type="text" 
                        id={`departure_location`}
                        className="w-full p-2 border rounded-md"
                        
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JadwalPage