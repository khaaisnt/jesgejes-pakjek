import { seat } from "../../types";

type props = {
    item: seat
}

const Seat = (myProps: props) => {
    return (
        <div className="size-20 rounded-md flex items-center justify-center bg-sky-700">
            <span className="text-white font-semibold">
                {myProps.item.seat_number}
            </span>
        </div>
    );
}

export default Seat;