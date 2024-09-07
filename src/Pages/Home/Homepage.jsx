import { useEffect } from "react";
import Cusine from "./Cusine";
import Slider from "./Slider";
import Subscription from "./Subscription";
import Testimonial from "./Testimonial";
import { Helmet } from "react-helmet-async";

const Homepage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="md:mx-28">
      <Helmet>
        <title>Home - Olive&lime</title>
        <meta name="description" content="Indulge in the flavors of the Mediterranean at Olive&Lime | Our menu features authentic dishes with fresh ingredients. Experience the perfect blend of taste and ambience." />

        <link rel="canonical" href="https://oliveandlime.co.uk/" />

      </Helmet>
      <Slider />
      <Subscription />
      <Cusine />
      <Testimonial />
    </div>
  );
};

export default Homepage;
