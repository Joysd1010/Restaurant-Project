// import { useEffect } from "react";
import { FaFacebook, FaInstagram, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../api/axiosInstance";
// import axiosInstance from "./../../api/axiosInstance";


const AboutUs = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }, []);


  const [aboutData, setAboutData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data from the /about endpoint
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

  // Set up interval to cycle through entries
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % aboutData.length);
    }, 5000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [aboutData]);

  if (aboutData.length === 0) {
    return <div>Loading...</div>;
  }

  // Use the current index to get the entry to display
  const { story, chefProfiles } = aboutData[currentIndex];


  return (
    <div className="md:mx-28 mx-5">
      <div className="flex flex-col md:flex-row gap-5 py-5">
        <div className=" px-5 md:w-1/2 text-center md:text-start md:py-28 ">
          <h1 className=" text-18 font-semibold font-merriweather">About Us</h1>
          <h1 className=" text-26 font-bold text-limeGreen py-4">
            Our Service for You
          </h1>
          <div>
            <FaQuoteLeft />{" "}
            <p className=" font-merriweather text-20 text-Charcoal">
              {" "}
              <span className="text-limeGreen underline">Olive & Lime </span>
              {story}
            </p>
          </div>{" "}
          <FaQuoteRight />
        </div>
        <div className=" grid-cols-1 md:grid-cols-2 grid md:w-1/2 gap-5 mx-auto">
          <img
            src="https://r2.erweima.ai/imgcompressed/img/compressed_3c3a8372ab2d9ccc965a3845722b815f.webp"
            alt=""
          />
          <img
            src="https://www.pngitem.com/pimgs/m/116-1169017_beef-in-plate-png-transparent-png.png"
            alt=""
          />
          <img
            src="https://i.pinimg.com/736x/4f/88/94/4f889457a2a9bcbbbc18c74c6769a79c.jpg"
            alt=""
          />
          <img
            src="https://www.kindpng.com/picc/m/50-502139_cocktails-png-page-cocktails-png-transparent-png-download.png"
            alt=""
          />
        </div>
      </div>
      <div className="text-center py-5">
        <h1 className="text-24 font-bold">Meet with Our Team</h1>
        <hr className="border-2 my-3" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:mx-28">
          {chefProfiles?.map((chef) => (
            <div
              key={chef._id}
              className="border-2 hover:border-limeGreen duration-300 p-4"
            >
              <div className="overflow-hidden">
                <img
                  src={chef.image}
                  className="h-44 mx-auto hover:scale-110 transition-transform duration-500"
                  alt={chef.specialty}
                />
              </div>
              <h1 className="text-22 text-limeGreen font-bold">{chef.name}</h1>
              <p className="font-merriweather text-18">{chef.specialty}</p>
              <hr className="mt-5 border-lime border-4" />
            </div>
          ))}
        </div>
      </div>

      <h1 className=" text-Charcoal font-bold text-26 py-5 md:py-10 text-center">Contact Us</h1> <hr className=" border-2 md:mx-20 border-limeGreen mb-6" />
     <div className=" flex justify-around">
          <div className=" flex gap-10 mx-7 md:mx-64">
            <div className=" rounded-full border-2 hover:border-limeGreen py-10 w-40 md:w-60 text-center">
              <h1 className=" text-olive font-bold text-24">Call Us</h1>{" "}
              <hr className="border-2 mx-10 border-limeGreen" />
              <a
                href="https://wa.me/+447448946630"
                className=" cursor-pointer text-18 font-merriweather hover:scale-105 duration-300"
              >
                +447448946630
              </a>
            </div>
            <div className=" rounded-full border-2 hover:border-limeGreen py-10 w-40 md:w-60 text-center">
              <h1 className=" text-olive font-bold text-24">Mail Us</h1>{" "}
              <hr className="border-2 mx-10 border-limeGreen" />
              <a
                href="mailto:info@oliveandlime.co.uk"
                className="cursor-pointer hover:scale-105 duration-300 font-merriweather text-18 px-3"
              >
               info@oliveandlime.co.uk
              </a>
            </div>
     </div>
      </div>
      <h1 className=" text-Charcoal font-bold text-26 py-5 md:py-10 text-center">Follow Us On</h1> <hr className=" border-2 md:mx-20 border-limeGreen mb-6" />
          <div className=" flex justify-around py-5">
              <div className="  gap-10 flex">
                <div className=" p-2 rounded-full border-2  hover:border-limeGreen">
                   <Link><FaFacebook size={80}/></Link> 
                </div>
                <div className=" p-2 rounded-full border-2  hover:border-limeGreen">
                   <Link><FaXTwitter size={80}/></Link> 
                </div>
                <div className=" p-2 rounded-full border-2  hover:border-limeGreen">
                   <Link><FaInstagram size={80}/></Link> 
                </div>
              </div>
          </div>

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d615.1204024009776!2d-0.05227432339664364!3d51.55155813652425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cfc1e5744ad%3A0x8a92ef921a957052!2s50%20Lower%20Clapton%20Rd%2C%20Lower%20Clapton%2C%20London%20E5%200RN%2C%20UK!5e1!3m2!1sen!2sbd!4v1723168779094!5m2!1sen!2sbd" style={{border:'0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className=" mx-auto py-5 md:w-[1000px] md:h-[450px] w-96"></iframe>

    </div>
  );
};

export default AboutUs;
