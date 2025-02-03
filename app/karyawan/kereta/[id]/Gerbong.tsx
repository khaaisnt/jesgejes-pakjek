import { wagon } from "../../types"
import Deletegerbong from "./Deletegerbong"
import Editgerbong from "./Editgerbong"
import Seat from "./Seat"

interface props {
  item: wagon
}

const Gerbong = (myProps: props) => {
  return (
    <div className="w-full my-2 bg-slate-50 rounded-md shadow-md flex flex-wrap justify-between">
      <div className="p-3">
        <small className="text-xs">Nama Gerbong</small>
        <br />
        {myProps.item.name}
        <br />
        Jumlah Kursi: {myProps.item.seat_count}

        <div className="w-full my-2">
          {
            myProps.item.seats.length == 0? 
            <div className="bg-sky-200 p-5 rounded-md">
              Gerbong ini belum mempunyai kursi
            </div>
            :
            <div className="flex flex-wrap gap-3">
              {
                myProps.item.seats.map((seat, index) => (
                  <Seat key={`seat-${index}`}
                  item={seat}
                  />
                ))
              }
            </div>
          }
        </div>
      </div>
      <div className="p-3 flex gap-3">
        <Editgerbong item={myProps.item}/>
        <Deletegerbong item={myProps.item}/>
      </div>
    </div>
  )
}

export default Gerbong