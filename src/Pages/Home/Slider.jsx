import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SliderStyle/style.css";

import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function Slider() {
  const [slides, setSlides] = useState();
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
      // navigation={true}
      modules={[Autoplay, Navigation]}
      className="mySwiper"
    >
      {slides?.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 items-center py-5">
            <div className="text-start px-10 flex flex-col gap-7">
              <p className="text-oliveGreen text-[24px] font-merriweather font-bold">
                {slide.title}
              </p>
              <p className="text-[30px] font-bold text-black">
                {slide.heading}
              </p>
              <p>{slide.description}</p>
              <Link to={'/menu'} className="rounded-md text-textWhite bg-limeGreen p-3 w-52 text-center">
                view more
              </Link>
            </div>
            <img src={slide.imageUrl} alt={slide.heading} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
