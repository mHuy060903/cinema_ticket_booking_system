import { useGetBooking } from "../features/booking/useGetBooking";
import Loader from "../components/Loader";
import man_hinh from "../assets/images/man-hinh.png";
import Chair from "../components/Chair";
import { arrayLetters, formatCurrency } from "../../utils/constant";
import { useState } from "react";
import { RiArmchairFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useAddBooking } from "../features/booking/useAddBooking";
import { useSelector } from "react-redux";
const Booking = () => {
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const { isLoading, isError, data } = useGetBooking();
  const { isLoadingAdd, isErrorAdd, handleAddBooking } = useAddBooking();
  const [arrayChairSelected, setArrayChairSelected] = useState([]);
  const [priceTotal, setPriceTotal] = useState(0);
  const navigate = useNavigate();

  const onHandleToggleSelected = (name) => {
    const arrayChairSelectedCopy = [...arrayChairSelected];
    const price = data?.showtimes.status_seat.find((cur) => cur.name === name);
    if (arrayChairSelectedCopy.includes(name)) {
      const index = arrayChairSelectedCopy.findIndex((cur) => cur === name);
      setPriceTotal((cur) => cur - price.price);
      arrayChairSelectedCopy.splice(index, 1);
    } else {
      arrayChairSelectedCopy.push(name);
      setPriceTotal((cur) => cur + price.price);
    }

    setArrayChairSelected(arrayChairSelectedCopy);
  };

  const handlePayment = () => {
    const now = new Date();

    const booking = {
      user_id: user.id,
      showtime_id: id,
      seat_number: arrayChairSelected,
      booking_time: now,
      total_price: priceTotal,
      date: now,
    };

    handleAddBooking(booking, {
      onSuccess: (data) => {
        navigate(`/payment/${data.id}`);
      },
    });
  };

 

  return (
    <div className="bg-white my-8 flex flex-col rounded-lg  gap-2">
      {isLoading ? (
        <div className="flex-1 flex justify-center w-full">
          <Loader size={100} color="blue" />
        </div>
      ) : (
        <div className="flex flex-col ">
          <p className="w-full text-center text-white font-bold bg-black py-2">
            BOOKING ONLINE
          </p>
          <div className="flex flex-col bg-[#fff1ce] p-2 font-semibold">
            <span>
              {data.showtimes.screens.cinemas.name} | {data.showtimes.screens.name} | Số ghế
              ({data.showtimes.num})
            </span>
            <span>
              {data.showtimes.show_date} {data.showtimes.show_time_start} ~{" "}
              {data.showtimes.date_end} {data.showtimes.show_time_end}
            </span>
          </div>
          <div className="bg-[#fdfcf0] flex flex-col">
            <div className="mt-4 py-2 bg-[#bcbdc0] text-center text-lg font-semibold">
              Người / Ghế
            </div>
            <h1 className="text-center my-4 font-medium text-xl text-gray-500">
              Screen
            </h1>
            <div className="flex justify-center w-full px-20">
              <img
                src={man_hinh}
                className="h-6 w-full"
                title="image_screen"
                alt="image_screen"
              />
            </div>
            <div className="mt-20 ">
              {data?.showtimes.screens.arrayNumRowChair.map(
                (rowChair, indexRow) => {
                  const type = data?.seat_types.find(
                    (seat) =>
                      seat.id ===
                      data?.showtimes.screens.arraySeatTypes[indexRow]
                  );

                  let i = 0;

                  return (
                    <div key={indexRow} className="flex gap-2 justify-center">
                      {rowChair.map((cur, indexCol) => {
                        if (cur === 1) {
                          i += 1;
                          const status = data?.showtimes.status_seat.find(
                            (seat) =>
                              seat.name === `${arrayLetters[indexRow]}${i}`
                          );
                          return (
                            <Chair
                              key={indexCol}
                              color={type.color}
                              name={`${arrayLetters[indexRow]}${i}`}
                              isEmptyChair={false}
                              isStatus={status.status}
                              isSelected={arrayChairSelected.includes(
                                `${arrayLetters[indexRow]}${i}`
                              )}
                              handleToggleSelected={onHandleToggleSelected}
                            />
                          );
                        } else if (cur == 0) {
                          return (
                            <Chair
                              key={indexCol}
                              color={type.color}
                              name={`${arrayLetters[indexRow]}${indexCol + 1}`}
                              isEmptyChair={true}
                            />
                          );
                        }
                      })}
                    </div>
                  );
                }
              )}
            </div>
            <div className="flex items-start justify-between mt-12 mx-10 gap-8">
              <div className="flex flex-col">
                <h1
                  className="text-2xl underline relative after:absolute after:block after:w-2 after:h-2 after:bg-red-500
                after:top-4 after:rotate-45 after:-left-4"
                >
                  CHÚ THÍCH GHẾ
                </h1>
                <div className="flex items-start gap-3 mt-4">
                  <div className="flex flex-col gap-1">
                    {data?.seat_types.map((seat) => (
                      <div key={seat.id} className="flex gap-2 items-center">
                        <RiArmchairFill
                          style={{ color: seat.color }}
                          size={26}
                        />
                        <span>{seat.type_name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                      <RiArmchairFill color="blue" size={26} />
                      <span>Ghế đang chọn</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <RiArmchairFill color="gray" size={26} />
                      <span>Ghế đã bán</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col">
                  <h1
                    className="text-2xl underline relative after:absolute after:block after:w-2 after:h-2 after:bg-red-500
                after:top-4 after:rotate-45 after:-left-4"
                  >
                    GHẾ ĐÃ CHỌN
                  </h1>
                  <div>
                    {arrayChairSelected.length <= 0
                      ? "..."
                      : arrayChairSelected.join(", ")}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1
                    className="text-2xl underline relative after:absolute after:block after:w-2 after:h-2 after:bg-red-500
                after:top-4 after:rotate-45 after:-left-4"
                  >
                    GIÁ VÉ
                  </h1>
                  <div>{formatCurrency(priceTotal)} VNĐ</div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="bg-red-500 rounded-lg text-white font-semibold p-4 px-1 mt-4 flex items-center gap-2"
              >
                PAYMENT {isLoadingAdd ? <Loader size={20} /> : <FaArrowRight />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
