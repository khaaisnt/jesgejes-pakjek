import { Schedule, Train } from "@/app/karyawan/types";
import { axiosInstance } from "@/helper/api";
import { getServerCookie } from "@/helper/server.cookie";
import Booking from "./booking";

const showTime = (date: string) => {
    const currentDate = new Date(date);
    return currentDate.toLocaleTimeString(`id-ID`, {
      year: `numeric`,
      month: `long`,
      day: `2-digit`,
    });
};

const getTrainBySchedule = async (schedule_id: number): Promise<Train | null> =>{
    try {
        const url = `/schedule/train/${schedule_id}`
        const TOKEN = await getServerCookie(`token`)
        const response: any = await axiosInstance.get(url, {
            headers: { 
                authorization: `Bearer ${TOKEN}` 
            },
        })

        if (response.data.success === true) {
            return response.data.data
        }

        return null
    } catch (error) {
        console.log(error)
        return null
    }
}

const getScheduleDetail = async (schedule_id: number): Promise<Schedule | null> =>{
    try {
        const url = `/schedule/${schedule_id}`
        const TOKEN = await getServerCookie(`token`)
        const response: any = await axiosInstance.get(url, {
            headers: { 
                authorization: `Bearer ${TOKEN}` 
            },
        })

        if (response.data.success === true) {
            return response.data.data
        }

        return null
    } catch (error) {
        console.log(error)
        return null
    }
}

type props = {
    params: {
        schedule_id: number
    }
}

const KeretaDetailPage = async (myProps: props) => {
    const schedule_id = Number(myProps.params.schedule_id)
    const detailJadwal = await getScheduleDetail(schedule_id)
    const detailKereta = await getTrainBySchedule(schedule_id)

    return (
        <div className="w-full p-3">
            <h1 className="text-2xl font-bold">
                Detail Keberangkatan Kereta
            </h1>

            <table>
                <tbody>
                    <tr>
                        <td>Stasiun Keberangkatan</td>
                        <td>: {detailJadwal?.departured_location}</td>
                    </tr>
                    <tr>
                        <td>Waktu Keberangkatan</td>
                        <td>: {showTime(detailJadwal?.departured_time || "")}</td>
                    </tr>
                    <tr>
                        <td>Stasiun Tujuan</td>
                        <td>: {detailJadwal?.arrived_location}</td>
                    </tr>
                    <tr>
                        <td>Waktu Kedatangan</td>
                        <td>: {showTime(detailJadwal?.arrived_time || "")}</td>
                    </tr>
                    <tr>
                        <td>Nama Kereta</td>
                        <td>: {detailKereta?.name}</td>
                    </tr>
                </tbody>
            </table>
            <Booking 
            schedule_id={schedule_id}
            wagons={detailKereta?.wagons || []}
            />
        </div>
    )
}

export default KeretaDetailPage