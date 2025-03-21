import { useState } from "react";
import { Booking } from "../../../lib/redux/slices/Mybookings";
import Popup from "./Popup";

function BookingList({ item }: { item: Booking }) {
    const [pop, setpop] = useState<boolean>(false);

    return (
        <>
            <tr className="bg-white hover:bg-gray-100 border border-gray-400 cursor-pointer group relative" onClick={() => setpop(true)}>
                <td className="border border-gray-400 px-4 py-2">{item.HospitalName}</td>
                <td className="border border-gray-400 px-4 py-2">{item.AdmissionDate}</td>
                <td className="border border-gray-400 px-4 py-2">{item.Name}</td>
                <td className="border border-gray-400 px-4 py-2 ">{item.TotalPrice}</td>
            </tr>
            {pop && <Popup item={item} setpop={setpop} />}
        </>
    );
}

export default BookingList;