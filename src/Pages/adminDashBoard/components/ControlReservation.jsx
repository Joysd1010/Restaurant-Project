import React, { useEffect, useState } from "react";

const ControlReservation = () => {
  const [timeSlot, setSlot] = useState([]);
  const [selected, setSelected] = useState(new Date().toISOString());

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

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setSelected(selectedDate.toISOString());
  };

  return (
    <div className=" h-[500px]">
      <h1 className="font-merriweather text-32 font-bold text-center text-oliveGreen">
        Manage Reservation Slots
      </h1>
      <div>
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
            type="date"
            onChange={handleDateChange}
            className="mt-1 block w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {
            timeSlot.map((item)=><div key={item._id}>
                <h1>{item.time}</h1>
            </div>)
        }

      </div>
    </div>
  );
};

export default ControlReservation;
