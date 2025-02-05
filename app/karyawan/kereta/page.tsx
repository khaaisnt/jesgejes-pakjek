import { getServerCookie } from "@/helper/server.cookie";
import { Train } from "../types";
import { axiosInstance } from "@/helper/api";
import TrainData from "./Train";
import AddKereta from "./addKereta";

const getAllTrain = async (): Promise<Train[]> => {
        try {
            const token = await getServerCookie('token')

            const response: any = await axiosInstance.get('/train', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if(response.data.success == true) {
                return response.data.data
            }

            return []
        } catch (error) {
            console.log(error);
            return []
        }
}

 const keretaPage = async () => {

    const dataKereta = await getAllTrain();

    return (
        <div className="w-full p-5 bg-white h-screen">
            <h1 className="text-xl font-semibold text-black">Data Kereta</h1>
            <span className="text-sm text-black">
                Halaman ini memuat data kereta api yang tersedia
            </span>
            <div className="my-3">
                <AddKereta/>
                {
                    dataKereta.map((kereta, index) => (
                        <TrainData item={kereta} key={`kereta-${index}`} />
                    ))
                }
            </div>
        </div>
    )
}

export default keretaPage;