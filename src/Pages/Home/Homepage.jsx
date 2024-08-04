import Cusine from "./Cusine";
import Slider from "./Slider";
import Subscription from "./Subscription";
import Testimonial from "./Testimonial";

const Homepage = () => {
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