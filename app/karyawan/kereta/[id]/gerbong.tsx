import { wagon } from "../../types"
import DeleteGerbong from "./deleteGerbong"
import EditGerbong from "./editGerbong"
import Seat from "./seat"

type props = {
    item: wagon
}

const Gerbong = (myProps: props) => {
    return (
        <div className="w-full my-2 bg-slate-50 rounded-md border shadow-md flex flex-wrap justify-between">
            <div className="p-3">
                <small className="text-sm font-medium text-blue-700">Nama Gerbong</small>
                <br />
                {myProps.item.name}
                <br />
                Jumlah Kursi: {myProps.item.seat_count}
                
                <div className="w-full my-2">
                    {
                        myProps.item.seats.length == 0?
                            <div className="bg-yellow-100 rounded-md p-3">
                                Gerbong ini belum mempunyai kursi
                            </div> :
                            <div className="flex flex-wrap gap-3">
                                {
                                    myProps.item.seats.map((seat, index) => (
                                        <Seat item={seat} key={`keySeat-${index}`} />
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
            <div className="p-3 flex gap-2">
                <EditGerbong gerbong={myProps.item} />
                <DeleteGerbong gerbongId={myProps.item.id} />
            </div>
        </div>
    )
}

export default Gerbong