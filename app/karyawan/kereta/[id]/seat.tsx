import { seat } from "../../types";
import EditSeat from "./editSeat";

type props = {
  item: seat;
};

const Seat = (myProps: props) => {
  return (
    <div className="size-20 rounded-md flex flex-col items-center justify-center bg-sky-700">
      <span className="text-white font-semibold">
        {myProps.item.seat_number}
      </span>
      <div>
        <EditSeat kursi={myProps.item} />
      </div>
    </div>
  );
};

export default Seat;
