import { FaFacebook, FaInstagram, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const staffArray = [
    {
      image:
        "https://img.freepik.com/premium-photo/office-finance-proud-business-man-company-portrait-job-motivation-career-goals-leadership-with-smile-corporate-manager-boss-executive-happy-with-workplace-vision-success_590464-98801.jpg",
      name: "John Doe",
      post: "Executive Chef",
      id: 12345,
    },
    {
      image:
        "https://www.pngitem.com/pimgs/m/95-952561_com-men-pluspng-men-in-suit-png-transparent.png",
      name: "Jane Smith",
      post: "Sous Chef",
      id: 54321,
    },
    {
      image:
        "https://i.pinimg.com/736x/b5/de/d1/b5ded15f09936463704df221f91f8acc.jpg",
      // This image appears twice, you might want to remove one or replace it with a different one
      name: "Michael Johnson",
      post: "Executive Manager",
      id: 98765,
    },
  ];

  return (
    <div className=" md:mx-28 mx-5">
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
              invites you to embark on a culinary adventure. Our menu is a
              global tapestry, weaving together diverse flavours and culinary
              traditions. From the aromatic spices of the East to the
              sun-drenched tastes of the Mediterranean, we offer a truly
              unforgettable dining experience. Complement your meal with one of
              our expertly crafted cocktails, designed to tantalise your taste
              buds.
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
      <div className=" text-center py-5">
        <h1 className=" text-24 font-bold">Meet with Our Team</h1>
        <hr className=" border-2 my-3" />
        <div className=" grid grid-cols-1 gap-5 md:grid-cols-3 md:mx-28">
          {staffArray.map((item) => (
            <div
              key={item.id}
              className=" border-2 hover:border-limeGreen duration-300"
            >
              <div className=" overflow-hidden">
                <img
                  src={item.image}
                  className=" h-44 mx-auto hover:scale-110 duration-500"
                  alt={item.post}
                />
              </div>
              <h1 className=" text-22 text-limeGreen font-bold">{item.name}</h1>
              <p className=" font-merriweather text-18">{item.post}</p>
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
                href="tel:+447473198598"
                className=" cursor-pointer font-merriweather hover:scale-105 duration-300"
              >
                +447473198598
              </a>
            </div>
            <div className=" rounded-full border-2 hover:border-limeGreen py-10 w-40 md:w-60 text-center">
              <h1 className=" text-olive font-bold text-24">Mail Us</h1>{" "}
              <hr className="border-2 mx-10 border-limeGreen" />
              <a
                href="mailto:info@oliveandlime.co.uk"
                className="cursor-pointer hover:scale-105 duration-300 font-merriweather px-3"
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

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d615.1204024009776!2d-0.05227432339664364!3d51.55155813652425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cfc1e5744ad%3A0x8a92ef921a957052!2s50%20Lower%20Clapton%20Rd%2C%20Lower%20Clapton%2C%20London%20E5%200RN%2C%20UK!5e1!3m2!1sen!2sbd!4v1723168779094!5m2!1sen!2sbd" style={{border:'0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className=" mx-auto py-5 md:w-[1100px] md:h-[450px] w-96"></iframe>
    </div>
  );
};

export default AboutUs;
