import { Seat } from "../../types";
import DeleteSeat from "./deleteKursi";
import EditSeat from "./editKursi";

type props = {
  item: Seat;
};

const Seat = (myProps: props) => {
  return (
    <div className="size-20 rounded-md flex flex-col items-center justify-center bg-sky-700">
      <span className="text-white font-semibold">
        {myProps.item.seat_number}
      </span>
      <div className="flex gap-1 mt-1">
        <EditSeat kursi={myProps.item} />
        <DeleteSeat kursiId={myProps.item.id} />
      </div>
    </div>
  );
};

export default Seat;
