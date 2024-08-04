import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SliderStyle/style.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Slider() {
  return (
    <>
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
        className="mySwiper "
      >
        <SwiperSlide>
          <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 items-center ">
            <div className=" text-start px-10 flex flex-col gap-7">
              <p className="text-oliveGreen text-[24px]  font-merriweather font-bold">
                Exclusive items
              </p>
              <h1 className="text-[30px] font-bold text-black">
                Mediterranean{" "}
                <span className="text-limeGreen underline">Salad</span> and
                Summer Delight
              </h1>
              <p>
                Experience the essence of the Mediterranean with our light and
                refreshing salads.
              </p>
              <Link className="rounded-md text-warm bg-limeGreen p-3 w-52 text-center ">
                View More
              </Link>
            </div>
            <img src="https://cafeu-react.netlify.app/img/slider/banner-7.png" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" grid  grid-cols-1 gap-5 md:grid-cols-2 items-center ">
            <div className=" text-start px-10 flex flex-col gap-7">
              <p className="text-oliveGreen text-[24px]  font-merriweather font-bold">
                Exclusive items
              </p>
              <h1 className="text-[30px] font-bold text-black">
                Cuisine and{" "}
                <span className="text-limeGreen underline">Cocktails</span>,
                Perfectly Paired
              </h1>
              <p>
                From classic elegance to bold experimentation, our cocktail menu
                has something for everyone.
              </p>
              <Link className="rounded-md text-warm bg-limeGreen p-3 w-52 text-center ">
                View More
              </Link>
            </div>
            <img src="https://cafeu-react.netlify.app/img/slider/banner-9.png" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 items-center ">
            <div className=" text-start px-10 flex flex-col gap-7">
              <p className="text-oliveGreen text-[24px]  font-merriweather font-bold">
                Exclusive items
              </p>
              <h1 className="text-[30px] font-bold text-black">
                Discover the world,
                <span className="text-limeGreen underline">one plate</span> at a
                time.
              </h1>
              <p>
                From spicy curries to delicate sushi, your taste buds will thank
                you.
              </p>
              <Link className="rounded-md text-warm bg-limeGreen p-3 w-52 text-center ">
                View More
              </Link>
            </div>
            <div className="">
              <img
                src="https://cafeu-react.netlify.app/img/slider/banner-8.png"
                alt="Diverse Menu"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
