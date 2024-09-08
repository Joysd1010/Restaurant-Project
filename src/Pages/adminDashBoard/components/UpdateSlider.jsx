import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../Home/SliderStyle/style.css";
import axiosInstance from "../../../api/axiosInstance";

export default function UpdateSlider() {
  const [slides, setSlides] = useState([]);
  const [editableSlide, setEditableSlide] = useState(null);

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

  const handleEditClick = (slide) => {
    setEditableSlide(slide);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableSlide((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const { title, heading, description } = editableSlide;
      console.log(editableSlide)
      await axiosInstance.put(`/home-slider-upload?id=${id}`, {
        title,
        heading,
        description,
      });

      setSlides((prevSlides) =>
        prevSlides.map((slide) =>
          slide._id === id ? { ...slide, title, heading, description } : slide
        )
      );

      toast.success("Slide updated successfully!");
      setEditableSlide(null); 
    } catch (error) {
      toast.error("Failed to update slide. Please try again.");
      console.error("Error updating slide:", error);
    }
  };

  return (
    <div className="myStaticSlider">
      <ToastContainer position="bottom-right" autoClose={3000} />

      {slides.map((slide) => (
        <div key={slide._id} className="grid grid-cols-1 gap-4 md:grid-cols-2 items-center mb-10 relative">
          {editableSlide && editableSlide._id === slide._id ? (
           
            <div className="text-start px-10 flex flex-col gap-7">
              <input
                type="text"
                name="title"
                value={editableSlide.title}
                onChange={handleInputChange}
                className="text-oliveGreen text-[24px] font-merriweather bg-white font-bold p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="heading"
                value={editableSlide.heading}
                onChange={handleInputChange}
                className="text-[30px] font-bold text-black p-2 border bg-white border-gray-300 rounded"
              />
              <textarea
                name="description"
                value={editableSlide.description}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 bg-white rounded"
              />
              <button
                onClick={() => handleUpdate(slide._id)}
                className="rounded-md text-textWhite  bg-green-600 p-3 w-32 text-center "
              >
                Save
              </button>
            </div>
          ) : (
          
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
          )}

          <img src={slide.imageUrl} alt={slide.headline} />

          {/* Update Button */}
          {!editableSlide || editableSlide._id !== slide._id ? (
            <button
              onClick={() => handleEditClick(slide)}
              className="absolute bottom-4 right-4 w-32 h-16 bg-green-600 text-white p-2 rounded"
            >
              Update
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
