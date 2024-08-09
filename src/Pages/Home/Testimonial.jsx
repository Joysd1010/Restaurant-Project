import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReactStars from "react-rating-stars-component";
import "./SliderStyle/style.css";
import { Autoplay, Navigation } from "swiper/modules";

const testimonials = [
  {
    id: 1,
    name: "David Kim",
    role: "Customer",
    rating: 4.5,
    image: "https://cafeu-react.netlify.app/img/customer/3.jpg",
    text: "The variety of cuisines at Olive and Lime is simply amazing. I tried the Indian curry and it was authentic and delicious. Paired with their expertly crafted cocktails, it was a truly unforgettable dining experience. The staff was friendly and attentive. Highly recommend!",
  },
  {
    id: 2,
    name: "Sarah Kim",
    role: "Regular Customer",
    rating: 5,
    image: "https://cafeu-react.netlify.app/img/customer/4.jpg",
    text: "Olive and Lime is an absolute gem! The Mediterranean salad I had was a burst of fresh flavors. Every bite was a delightful surprise. The atmosphere was perfect for a relaxing lunch with friends. I'll definitely be back to try other dishes!",
  },
];

const Testimonial = () => {
  return (
    <>
      <div className="group">
        <h1 className=" text-18 text-olive font-merriweather font-bold text-center py-5">
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
          // navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {testimonials.map(testimonial => (
            <SwiperSlide
              key={testimonial.id}
              className=" py-5 text-center flex flex-col px-3 md:px-20"
            >
              <div className="w-[150px] rounded-full p-2 border-2 border-limeGreen">
                <img
                  src={testimonial.image}
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
                <p className="text-18 font-merriweather">
                  {testimonial.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Testimonial;
