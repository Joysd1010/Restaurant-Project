import { useEffect } from "react";
import Cusine from "./Cusine";
import Slider from "./Slider";
import Subscription from "./Subscription";
import Testimonial from "./Testimonial";

const Homepage = () => {
    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' 
        });
      }, []);

    return (
        <div className="md:mx-28">
            <Slider/>
            <Subscription/>
            <Cusine/>
            <Testimonial/>

        </div>
    );
};

export default Homepage;