import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SliderStyle/style.css";

import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function Slider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axiosInstance.get("/home-slider-upload");
        console.log(response.data)
        setSlides(response.data);
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Navigation]}
      className="mySwiper"
    >
      {slides.map(slide => (
        <SwiperSlide key={slide._id}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 items-center">
            <div className="text-start px-10 flex flex-col gap-7">
              <p className="text-oliveGreen text-[24px] font-merriweather font-bold">
                {slide.title}
              </p>
              <h1 className="text-[30px] font-bold text-black">
                {slide.heading}
              </h1>
              <p>{slide.description}</p>
              <Link to="/" className="rounded-md text-warm bg-limeGreen p-3 w-52 text-center">
                View More
              </Link>
            </div>
            <img src="https://drive.google.com/uc?export=view&id=17EqBYdKTEXp43I4ITzRcWHPwr560a0Sn" alt={slide.heading} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
