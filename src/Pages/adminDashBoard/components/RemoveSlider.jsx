import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../Home/SliderStyle/style.css";
import axiosInstance from "../../../api/axiosInstance";

export default function RemoveSlider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axiosInstance.get("/home-slider-upload");
        setSlides(response.data);
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };

    fetchSlides();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/home-slider-upload?id=${id}`);
      setSlides((prevSlides) => prevSlides.filter((slide) => slide.id !== id));
      console.log(`Slide with id ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting slide:", error);
    }
  };

  return (
    <div className="myStaticSlider">
      {slides.map((slide) => (
        <div key={slide.id} className="grid grid-cols-1 gap-4 md:grid-cols-2 items-center mb-10 relative">
          <div className="text-start px-10 flex flex-col gap-7">
            <p className="text-oliveGreen text-[24px] font-merriweather font-bold">
              {slide.title}
            </p>
            <h1 className="text-[30px] font-bold text-black">
              {slide.heading} 
            </h1>
            <p>{slide.description}</p>
            <Link to="/" className="rounded-md text-textWhite bg-limeGreen p-3 w-52 text-center">
              view more
            </Link>
          </div>
          <img src={slide.imageUrl} alt={slide.headline} />

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(slide._id)}
            className="absolute bottom-4 right-4 w-32 h-16 bg-red-600 text-white p-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
