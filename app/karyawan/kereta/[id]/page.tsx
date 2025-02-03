import { getServerCookie } from "@/helper/server.cookie";
import { Train } from "../../types";
import { axiosInstance } from "@/helper/api";
import Gerbong from "./Gerbong";
import Addgerbong from "./Addgerbong";

const getDetailKereta = async (
    id: string
): Promise<Train | null> => {
    try {
        const token = await getServerCookie('token')
        const  response: any = await axiosInstance.get(`/train/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.data.success === false) {
            return null
        }

        return response.data.data;

    } catch (error) {
        console.log(error);
        return null
    }
}

type props = {
    params: {
        id: string
    }
}

const DetailsKereta = async (
    myprops: props
) => {

    const id = myprops.params.id

    const data = await getDetailKereta(id)

    return (
        <div className="w-full p-3">
            {
                data === null? (
                    <div className="bg-yellow-100 rounded-md p-3">
                        <h1 className="text-lg font-semibold">Informasi</h1>
                        <p className="text-sm text-slate-500">
                            Data kereta tidak ditermukan
                        </p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-lg font-semibold">{data.name}</h1>
                        <p className="text-sm">
                            {data.descriptions}
                        </p>
                        <h2 className="text-base font-medium">
                            Daftar Gerbong
                        </h2>

                        <Addgerbong id={data.id}/>

                        <div className="my-5">
                            {
                                data.wagons.map((gerbong,index) => (
                                    <Gerbong item={gerbong} key={`Gerbong-${index}`}/>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default DetailsKereta;