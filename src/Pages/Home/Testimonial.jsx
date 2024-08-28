import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReactStars from "react-rating-stars-component";
import "./SliderStyle/style.css";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Avatar from "../../assets/profile.png"


const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axiosInstance.get("/reviews");
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <div className="group">
        <h1 className="text-18 text-olive font-merriweather font-bold text-center py-5">
          Testimonials
        </h1>
        <h1 className="text-[30px] font-bold text-Charcoal text-center">
          Our Clients Choose Us
        </h1>
        <hr className="border-2 w-3/4 mx-auto border-Charcoal group-hover:border-limeGreen group-hover:shadow-2xl shadow-yellow-400" />
      </div>
      <div className="py-5">
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
          {testimonials.map((testimonial) => (
            <SwiperSlide
              key={testimonial.id}
              className="py-5 text-center flex flex-col px-3 md:px-20"
            >
              <div className="w-[150px] rounded-full p-2 border-2 border-limeGreen">
                <img
                  src={testimonial.image || Avatar}
                  alt={testimonial.name}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col gap-5">
                <h1 className="text-22 font-bold text-Charcoal">
                  {testimonial.name}
                </h1>
                <p>{testimonial.role}</p>
                <div className="mx-auto">
                  <ReactStars
                    count={5}
                    edit={false}
                    value={testimonial.rating}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                </div>
                <p className="text-18 font-merriweather">{testimonial.comment}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Testimonial;
