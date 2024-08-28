import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

const ViewReservation = () => {
  const [selected, setSelected] = useState(new Date().toISOString());
  const [timeSlot, setSlot] = useState([]);
  const [Reservation, setReservation] = useState([]);
  const [time, setTime] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(10); 

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axiosInstance.get("/reserve/alltime");
        setSlot(response.data);
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    };

    fetchTimeSlots();
  }, []);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        
        const params = new URLSearchParams();
        if (selected) params.append('date', selected);
        if (time) params.append('time', time);

        const response = await axiosInstance.get(`/reserve/all?${params.toString()}`);
        setReservation(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservation();
  }, [selected, time]);
  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setSelected(selectedDate.toISOString());
  };

  
  const totalPages = Math.ceil(Reservation.length / reservationsPerPage);

  
  const currentReservations = Reservation.slice(
    (currentPage - 1) * reservationsPerPage,
    currentPage * reservationsPerPage
  );

  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="h-[550px]">
      <h1 className="font-merriweather text-32 font-bold text-center text-oliveGreen">
        View All Reservations
      </h1>
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-3">
          <div className="grid grid-cols-8 bg-olive text-white py-3 px-4 text-center rounded-l-full rounded-r-full">
            <div className="col-span-2 border-r-2 border-gray-200">Name</div>
            <div className="col-span-2 border-r-2 border-gray-200">Email</div>
            <div className="col-span-2 border-r-2 border-gray-200">Phone</div>
            <div className="border-r-2 border-gray-200">Person</div>
            <div>Note</div>
          </div>
          <div>
            {Reservation.length>0?currentReservations.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-8 bg-white border-2 border-olive text-start text-Charcoal hover:scale-105 duration-300 px-4 my-2 py-1 rounded-r-full rounded-l-full"
              >
                <div className="px-1 col-span-2">{item.fullName}</div>
                <div className="px-1 col-span-2">{item.email}</div>
                <div className="px-1 col-span-2 text-center">{item.phoneNumber}</div>
                <div className="px-1 text-center">{item.numberOfPeople}</div>
                <div className="text-center cursor-pointer bg-olive rounded-full text-white">
                  view
                </div>
              </div>
            )):<div className=" text-22 font-bold font-merriweather text-center py-6">Sorry No Reservation Found</div>}
          </div>
          {/* Pagination Controls */}
          {Reservation.length > reservationsPerPage && (
            <div className="flex justify-center mt-4">
              {
                currentPage!==1&&<button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-olive text-white rounded-l-md"
              >
                Prev
              </button>
              }
              <span className="px-4 py-2 text-olive">
                Page {currentPage} of {totalPages}
              </span>
              {
                currentPage!==totalPages&&<button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-olive text-white rounded-r-md"
              >
                Next
              </button>
              }
            </div>
          )}
        </div>
        <div>
          <div>
            <div className="text-white bg-olive rounded-full px-2 py-3 text-center">
              Select Time Slot
            </div>
            <div>
              <select
                value={time?.time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-5 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select Time Slot</option>
                {timeSlot.map((slot) => (
                  <option key={slot._id} value={slot._id}>
                    {slot.time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-white bg-olive my-5 rounded-full px-2 py-3 text-center">
            Select Date
          </div>
          <div>
            <style>
              {`
                input[type="date"]::-webkit-calendar-picker-indicator {
                  background: url('data:image/svg+xml;utf8,<svg fill="black" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M760 256V136h-80v120H280V136h-80v120H120v640h720V256h-80Zm80-40v640q0 17-11.5 28.5T800 896H160q-17 0-28.5-11.5T120 856V256q0-17 11.5-28.5T160 216h40V96h160v120h240V96h160v120h40q17 0 28.5 11.5T840 256Zm-680 80v560h640V336H160Zm0 0v560-560Z"/></svg>') no-repeat;
                  color: black;
                  cursor: pointer;
                  width: 24px;
                  height: 24px;
                }

                input[type="date"]::-webkit-inner-spin-button,
                input[type="date"]::-webkit-clear-button {
                  display: none;
                }

                input[type="date"]::-moz-focus-inner {
                  border: 0;
                }

                input[type="date"] {
                  appearance: none;
                  -webkit-appearance: none;
                  -moz-appearance: none;
                  background: none;
                  padding: 8px 12px;
                  border-radius: 4px;
                  border: 1px solid #ccc;
                }
              `}
            </style>
            <input
              type="date"
              onChange={handleDateChange}
              className="mt-1 block w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ViewReservation;
