import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

const ControlReservation = () => {
  const [timeSlot, setSlot] = useState([]);
  const [selected, setSelected] = useState(new Date().toISOString());

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    console.log(selected)
    const fetchTimeSlots = async () => {
        const params = new URLSearchParams();
        if (selected) {
          params.append('date', selected);
        }
        
        try {
          const response = await axiosInstance.get(`/reserve/timeStatus?${params.toString()}`);
          console.log(response);
          setSlot(response.data);
        } catch (error) {
          console.error("Error fetching time slots:", error);
        }
        
    };

    fetchTimeSlots();
  }, [selected]);

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setSelected(selectedDate.toISOString());
  };

  const handleStatus = (item) => {
    setSelectedSlot(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  

  return (
    <div className="h-[550px]">
      <h1 className="font-merriweather text-32 font-bold text-center text-oliveGreen">
        Manage Reservation Slots
      </h1>
      <div>
      <h1 className=" text-22 font-bold text-center text-Charcoal">
       
        Select the date
      </h1> <hr className=" mx-48 border-2"/>
        <div className="w-1/4 py-6 mx-auto">
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
          value={new Date(selected).toISOString().split('T')[0]}
            type="date"
            onChange={handleDateChange}
            className="mt-1 block w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <h1 className=" text-22 font-bold text-center text-Charcoal">
       
       Check and Manipulate Time Slots
     </h1> <hr className=" mx-48 border-2 mb-10"/>
        <div className="grid grid-cols-3 gap-5 text-center text-white px-20">
          {timeSlot.map((item) => (
            <div
              key={item._id}
              className={`px-5 py-2 ${item.status?"bg-oliveGreen":"bg-warm text-gray-700"} rounded-l-full rounded-r-full cursor-pointer`}
              onClick={() => handleStatus(item)}
            >
              <h1>{item.time}</h1>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box bg-white border-2 border-olive">
            <form method="dialog">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
            {selectedSlot && (
              <>
                <h3 className="font-bold text-lg">Time Slot Details</h3>
                <p className="py-4">
                  <strong>Time:</strong> {selectedSlot.time}
                </p>
                
               <div className=" flex justify-between">
                    <p className="py-4">
                      <strong>Status:</strong> {selectedSlot.status ? "Active" : "Inactive"}
                    </p>
                    {selectedSlot.status?<div className="btn border-olive bg-warm hover:bg-red-500 hover:text-white text-Charcoal "> Turn Off this Slot For {new Date(selected).toISOString().split('T')[0]}</div>:<div className="btn border-olive bg-warm hover:bg-green-500 hover:text-white text-Charcoal "> Turn On this Slot For {new Date(selected).toISOString().split('T')[0]}</div>}
               </div>
              </>
            )}
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ControlReservation;
