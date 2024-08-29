import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axiosInstance";
import { InfinitySpin } from "react-loader-spinner";
import ConfettiExplosion from "react-confetti-explosion";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }, []);
  // console.log(new Date('08:00:00.000Z'))
  const [selected, setSelected] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [reserVationData, setreserVationData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completed, setComplete] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [filteredTimes, setFilteredTimes] = useState([]);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState(null);
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!selected) {
      setIsNextEnabled(false);
    }
  }, [selected]);

  const handleNextSlide = async () => {
    if (currentSlide === 0 && selected) {
      
      try {
        console.log(selected.toISOString())
        const dayName = selected.toLocaleDateString("en-US", {
          weekday: "long",
        });
        const response = await axiosInstance.get("/reserve/time", {
          params: {
            date: selected.toISOString(),
          },
        });
        console.log(response)

        if (dayName.toLowerCase() == "sunday") {
          const offDay = response.data.filter((slot) => {
            const startHour = new Date(slot.startTime).getUTCHours();
            return startHour >= 9 && startHour < 22;
          });
          console.log(offDay);
          setFilteredTimes(offDay);
        } else {
          setFilteredTimes(response.data);
        }

        setIsNextEnabled(false);
        setCurrentSlide(currentSlide + 1);
      } catch (error) {
        console.error("Error fetching time slots:", error);
        toast.error("Failed to fetch time slots. Please try again.");
      }
    } else if (currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
      setIsNextEnabled(false);
    }
    // console.log(selectedTimeSlot);
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0 && currentSlide < 2) {
      setCurrentSlide(currentSlide - 1);
    }

    if (selected && currentSlide == 1) {
      setIsNextEnabled(true);
    }
  };

  const handleCompleteSlide = () => {
    setIsNextEnabled(true);
  };

  const formRef = useRef(null);

  const handleCancel = () => {
    reset(); // Reset the form fields
    setCurrentSlide(0);
    setSelected(null);
    setSelectedTimeSlot(null);
    setFilteredTimes([]);
    setOtp("");
    console.log("Cancel button clicked, slider reset to beginning");
  };

  const handleDaySelect = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    // Normalize `day` to midnight UTC
    const utcDay = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()));
  
    if (utcDay < today) {
      toast.warn("Please select a valid date.", {
        position: "top-center",
      });
      setSelected(null);
      setIsNextEnabled(false);
    } else {
      if (selected && day && selected.getTime() === utcDay.getTime()) {
        setSelected(null);
        setIsNextEnabled(false);
      } else {
        setSelected(utcDay);
        if (day) handleCompleteSlide();
      }
    }
  };
  

  const onTimeClick = (time) => {
    setIsNextEnabled(true);
    setSelectedTimeSlot(time);
    console.log(time);
  };

  const onSubmit = async (data) => {
    setFormData(data);
    console.log(data);
    const response = await axiosInstance.post(
      "/reserve/send-otp",
      {
        email: data.email,
        userName: data.fullName,
      },
      {
        headers: {
          "Content-Type": "application/json", // Ensure content type is set to application/json
        },
      }
    );
    if (response.status == 200) {
      reset();
      response.data.message=="OTP sent to email"&&toast.success("OTP sent to your Mail", {
        position: "top-center",
      });
      setCurrentSlide(currentSlide + 1);
    }
  };
  const OtpVerification = async () => {
    console.log('selected:',selected.toISOString())
    console.log('formData:',formData)
    console.log('otp:',otp)
    console.log('selectedTimeSlot:',selectedTimeSlot)
    const response = await axiosInstance.post(
      "/reserve/verify-otp",
      {
        email: formData.email,
        otp: otp,
        reservationData: {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          numberOfPeople: parseInt(formData.people),
          note: formData.note,
          date: selected.toISOString(),
          timeSlot: selectedTimeSlot._id,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    
    if (response.status == 200) {
      reset();
      toast.success("OTP sent to your Mail", {
        position: "top-center",
      });

      setreserVationData(true);
      setComplete(true);
      toast.success("Congratulations, your reservation is confirmed", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate('/')
      }, 5000);
    } else {
      toast.error(`Sorry ${response.message}`, {
        position: "top-center",
      });
    }
    setLoading(false);
  };
  return (
    <div className="md:mx-28">
      <h1 className="font-merriweather text-28 text-center pt-5">
        Reserve your Table
      </h1>
      <hr className="mx-10 my-2 border-2" />

      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-5">
        <div className="slider relative w-full h-96 md:h-128 lg:h-160 overflow-hidden">
          <div
            className={`slide absolute top-0 left-0 w-full h-full transition duration-500 ease-in-out ${
              currentSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <h1 className="font-merriweather text-20 rounded hover:border-limeGreen border-2 text-center mb-5 mx-20 md:mx-60">
              Select your suitable date
            </h1>
            <div className="flex justify-around">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleDaySelect}
                modifiersClassNames={{
                  selected: "bg-blue-500 text-white rounded-full",
                }}
              />
            </div>
            {selected && (
              <h1 className="font-merriweather text-center font-bold text-18">
                Selected: {selected.toLocaleDateString()}
              </h1>
            )}
          </div>

          <div
            className={`slide absolute top-0 left-0 w-full overflow-y-auto h-full transition duration-500 ease-in-out ${
              currentSlide === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <h1 className="font-merriweather text-20 rounded hover:border-limeGreen border-2 text-center mb-5 mx-20 md:mx-60">
              Select your time
            </h1>
            <div className="flex justify-around pb-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 text-center">
                {
                  //console.log(filteredTimes)
                }

                {filteredTimes.map((time, index) => (
                  <div
                    onClick={() => {
                      if (time.availability && time.status) {
                        onTimeClick(time);
                      }
                    }}
                    key={index}
                    className={`border-2 p-1 rounded cursor-pointer ${
                      time.availability && time.status
                        ? selectedTimeSlot === time
                          ? "bg-limeGreen text-white"
                          : "hover:bg-limeGreen hover:border-limeGreen md:py-2 md:px-3 hover:text-white"
                        : "bg-gray-200 border-gray-400 opacity-40 cursor-not-allowed"
                    }`}
                  >
                    {time.time}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`slide absolute top-0 left-0 w-full h-full transition duration-500 ease-in-out overflow-y-auto ${
              currentSlide === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <h1 className="font-merriweather text-20 rounded hover:border-limeGreen border-2 text-center mb-5 mx-20 md:mx-60">
              Provide your details
            </h1>

            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 p-4 md:mx-28"
            >
              <p className="text-18 text-gray-600 mb-4">
                Fields marked with <span className="text-red-500">*</span> are
                required.
              </p>

              <div>
                <label className="block text-18 font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("fullName", {
                    required: "Full Name is required",
                  })}
                  className="mt-1 p-2 block w-full border bg-white border-gray-300 rounded-md"
                />
                {errors.fullName && (
                  <span className="text-red-500 text-18">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-18 font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="mt-1 p-2 block w-full border bg-white border-gray-300 rounded-md"
                />
                {errors.email && (
                  <span className="text-red-500 text-18">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-18 font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                  className="mt-1 p-2 block w-full border bg-white border-gray-300 rounded-md"
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-18">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-18 font-medium text-gray-700">
                  How many people? <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("people", {
                    required: "Please specify the number of people",
                    min: {
                      value: 1,
                      message: "There must be at least one person",
                    },
                  })}
                  className="mt-1 p-2 block w-full border bg-white border-gray-300 rounded-md"
                />
                {errors.people && (
                  <span className="text-red-500 text-18">
                    {errors.people.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-18 font-medium text-gray-700">
                  Note
                </label>
                <textarea
                  {...register("note")}
                  className="mt-1 p-2 block w-full border bg-white border-gray-300 rounded-md"
                ></textarea>
              </div>
            </form>
          </div>
          <div
            className={`slide absolute top-0 left-0 w-full h-full transition duration-500 ease-in-out overflow-y-auto ${
              currentSlide === 3 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <h1 className="font-merriweather text-20 rounded hover:border-limeGreen border-2 text-center mb-5 mx-20 md:mx-60">
              Please verify your reservation
            </h1>
            <div className=" flex justify-around">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="p-2 border bg-white border-gray-300 rounded-md mb-4"
                placeholder="Enter OTP"
              />
            </div>
            <div className="ml-[200px] md:ml-[600px]">
              {completed && (
                <ConfettiExplosion
                  force={0.9}
                  duration={2500}
                  particleSize={20}
                  particleCount={500}
                  width={1600}
                />
              )}
            </div>
          </div>
        </div>
        <div className="navigation flex justify-center mt-4 space-x-4">
          {currentSlide > 0 && currentSlide < 2 && (
            <button
              onClick={handlePrevSlide}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Back
            </button>
          )}
          {currentSlide < 2 && (
            <button
              onClick={handleNextSlide}
              disabled={!isNextEnabled}
              className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ${
                !isNextEnabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:opacity-100"
              }`}
            >
              Next
            </button>
          )}
          {currentSlide === 2 && (
            <div className="flex space-x-4">
              <button
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => formRef.current.requestSubmit()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          )}
          {currentSlide === 3 && (
            <div className="flex space-x-4">
              {!reserVationData && (
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              )}
              {!loading ? (
                <button
                  onClick={() => OtpVerification()}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Submit otp
                </button>
              ) : (
                <div className=" flex justify-around text-gray-800 font-bold py-2 px-4 rounded">
                  <InfinitySpin
                    visible={true}
                    width="200"
                    ariaLabel="infinity-spin-loading"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Reservation;
