import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SliderStyle/style.css";

import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Exclusive items",
    headline: "Mediterranean Salad and Summer Delight",
    description: "Experience the essence of the Mediterranean with our light and refreshing salads.",
    buttonText: "View More",
    image: "https://cafeu-react.netlify.app/img/slider/banner-7.png",
  },
  {
    id: 2,
    title: "Exclusive items",
    headline: "Cuisine and Cocktails, Perfectly Paired",
    description: "From classic elegance to bold experimentation, our cocktail menu has something for everyone.",
    buttonText: "View More",
    image: "https://cafeu-react.netlify.app/img/slider/banner-9.png",
  },
  {
    id: 3,
    title: "Exclusive items",
    headline: "Discover the world, one plate at a time.",
    description: "From spicy curries to delicate sushi, your taste buds will thank you.",
    buttonText: "View More",
    image: "https://cafeu-react.netlify.app/img/slider/banner-8.png",
  },
];

export default function Slider() {
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
      {slides.map(slide => (
        <SwiperSlide key={slide.id}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 items-center">
            <div className="text-start px-10 flex flex-col gap-7">
              <p className="text-oliveGreen text-[24px] font-merriweather font-bold">
                {slide.title}
              </p>
              <h1 className="text-[30px] font-bold text-black">
                {slide.headline}
              </h1>
              <p>{slide.description}</p>
              <Link className="rounded-md text-warm bg-limeGreen p-3 w-52 text-center">
                {slide.buttonText}
              </Link>
            </div>
            <img src={slide.image} alt={slide.headline} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
