import {
  FaFacebook,
  FaInstagram,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axiosInstance";
import { CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const [aboutData, setAboutData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/about");
        setAboutData(response.data);
      } catch (error) {
        toast.error("Failed to fetch about data");
        console.error("Error fetching about data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % aboutData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [aboutData]);

  if (aboutData.length === 0) {
    return (
      <div className="flex justify-center py-32">
        <CircularProgress />
      </div>
    );
  }

  const { story, chefProfiles } = aboutData[currentIndex];

  // Extract the first 100 characters
  const truncatedStory = story.length > 100 ? `${story.substring(0, 100)}...` : story;

  //console.log(truncatedStory)

  return (
    <div className="px-5 md:px-20 lg:px-28">
      <Helmet>
        <title>About Us - Olive&lime</title>
        <meta
          name="description"
          content={truncatedStory}
        />
        <link rel="canonical" href="https://oliveandlime.co.uk/" />
      </Helmet>
      <div className="flex flex-col md:flex-row gap-5  ">
        <div className="md:w-1/2 text-center md:text-start pt-5 md:pt-20 h-96 md:h-[650px] overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-semibold">About Us</h1>
          <h1 className="text-xl font-merriweather md:text-2xl font-bold text-limeGreen py-4">
            Our Service Dedicated to You
          </h1>
          <FaQuoteLeft className="text-2xl md:text-3xl" />
          <div className="flex items-center">
            <p className="font-merriweather  text-base md:text-lg text-Charcoal px-2">
              {story}
            </p>
          </div>
          <FaQuoteRight className="text-2xl md:text-3xl" />
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 md:w-1/2 mx-auto items-center">
          <img
            src="https://r2.erweima.ai/imgcompressed/img/compressed_3c3a8372ab2d9ccc965a3845722b815f.webp"
            alt=""
            className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto"
          />
          <img
            src="https://i.ibb.co/4TDDc5J/Boho-Abstract-Handwritten-Brand-Logo.png"
            alt=""
            className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto"
          />
          <img
            src="https://i.ibb.co/5Ypc9nQ/Boho-Abstract-Handwritten-Brand-Logo11.png"
            alt=""
            className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto"
          />
          <img
            src="https://i.ibb.co/b7VbpwX/Boho-Abstract-Handwritten-Brand-Logo.png"
            alt=""
            className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto"
          />
        </div>
      </div>

      <div className="text-center py-5">
        <h1 className="text-2xl md:text-3xl font-bold">Meet with Our Team</h1>
        <hr className="border-2 my-3 border-limeGreen" />
      <div className=" flex justify-around">
          <div className={`${chefProfiles.length<3?"flex flex-col md:flex-row gap-5 justify-around":"grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-3"}`}>
            {chefProfiles?.map((chef) => (
              <div
                key={chef._id}
                className="border-2 hover:border-limeGreen duration-300 w-60 p-4"
              >
                <div className="overflow-hidden ">
                  <img
                    src={chef.image}
                    className="h-44 hover:scale-110 mx-auto transition-transform duration-500"
                    alt={chef.specialty}
                  />
                </div>
                <h1 className="text-xl md:text-2xl text-limeGreen font-bold">
                  {chef.name}
                </h1>
                <p className="font-merriweather text-base md:text-lg">
                  {chef.specialty}
                </p>
                <hr className="mt-5 border-lime border-4" />
              </div>
            ))}
          </div>
      </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-center text-Charcoal py-5 md:py-10">
        Contact Us
      </h1>
      <hr className="border-2 md:mx-60 border-limeGreen mb-6" />

      <div className="flex justify-around">
        <div className="flex items-center gap-10 mx-7 flex-col md:flex-row md:mx-64">
          <div className="rounded-full border-2 hover:border-limeGreen py-10 w-40 md:w-60 text-center">
            <h1 className="text-olive font-bold text-24">WhatsApp</h1>{" "}
            <hr className="border-2 mx-5 md:mx-10 border-limeGreen" />
            <a
              href="https://wa.me/+447473198598"
              target="blank"
              className="cursor-pointer text-18 font-merriweather hover:scale-105 duration-300"
            >
              +447473198598
            </a>
          </div>
          <div className="rounded-full border-2 hover:border-limeGreen py-10 w-60 text-center">
            <h1 className="text-olive font-bold text-24">Mail Us</h1>{" "}
            <hr className="border-2 mx-5 md:mx-10 border-limeGreen" />
            <a
              href="mailto:info@oliveandlime.co.uk"
              className="cursor-pointer hover:scale-105 duration-300 font-merriweather text-18 px-2"
            >
              info@oliveandlime.co.uk
            </a>
          </div>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-center text-Charcoal py-5 md:py-10">
        Follow Us On
      </h1>
      <hr className="border-2 md:mx-60 border-limeGreen mb-6" />
      <div className="flex justify-center gap-10 py-5">
        <div className="p-2 rounded-full border-2 hover:border-limeGreen">
          <a
            href="https://x.com/olive_and_lime"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <FaXTwitter size={60} />
          </a>
        </div>
        <div className="p-2 rounded-full border-2 hover:border-limeGreen">
          <a
            href="https://www.facebook.com/people/OliveLime/61565142630094/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <FaFacebook size={60} />
          </a>
        </div>
      </div>

      <div className="flex justify-center py-5">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d615.1204024009776!2d-0.05227432339664364!3d51.55155813652425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cfc1e5744ad%3A0x8a92ef921a957052!2s50%20Lower%20Clapton%20Rd%2C%20Lower%20Clapton%2C%20London%20E5%200RN%2C%20UK!5e1!3m2!1sen!2sbd!4v1723168779094!5m2!1sen!2sbd"
        style={{ border: '0' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="mx-auto py-5 md:w-[1100px] w-[300px] h-[400px]"
         title="Olive and Lime Location"
      />
       
      </div>
    </div>
  );
};

export default AboutUs;
