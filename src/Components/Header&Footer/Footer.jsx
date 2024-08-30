import { useEffect, useState } from "react";
import { BiLogoGmail, BiSolidPhone } from "react-icons/bi";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Footer = () => {
  const [Menu, setMenu] = useState([]);

  useEffect(() => {
    axiosInstance.get(`menu/footerimage`).then((response) => {
      //console.log(response);
      setMenu(response.data);
    });
  }, []);

  return (
    <div className="bg-[url('https://cafeu-react.netlify.app/img/footer-bg.png')]">
      <div className=" grid gap-4 grid-cols-1 md:grid-cols-4 px-5 md:px-28 items-start">
        <div className=" flex flex-col gap-2 py-2">
          <img
            src="https://i.postimg.cc/5Nx5y7HG/Beige-green-modern-lime-fruit-logo-2.png"
            className="w-28"
            alt="Logo"
          />
          <p className="text-xl text-lime">
            Mediterranean Restaurant and CockTail Bar
          </p>
          <div className=" flex items-center gap-2">
            <ImLocation2 color="#32CD32" size={30} />
            <Link
              to={"about"}
              className="cursor-pointer hover:scale-105 duration-300 text-[#FFF8E1]"
            >
              50 Lower Clapton Road, London, England, E5 0RN
            </Link>
          </div>
          <div className=" flex items-center gap-2">
            <BiLogoGmail color="#32CD32" size={25} />
            <a
              href="mailto:info@oliveandlime.co.uk"
              className="cursor-pointer hover:scale-105 duration-300  text-[#FFF8E1]"
            >
              info@oliveandlime.co.uk
            </a>
          </div>
          <div className=" flex items-center gap-2">
            <BiSolidPhone color="#32CD32" size={27} />
            <a
              href="tel:+447448946630"
              className=" cursor-pointer hover:scale-105 duration-300 text-[#FFF8E1]"
            >
              +447448946630
            </a>
          </div>
        </div>
        <div>
          <div>
            <p className=" text-[20px] text-[#FFF8E1] text-center pt-10">
              Quick Links
            </p>
            <hr className=" border-2" />
          </div>
          <div className=" flex p-3 text-[#FFF8E1] flex-col gap-3">
            <Link
              to={"/"}
              className=" hover:bg-[#F5F5DC] hover:text-olive hover:scale-105 px-5 duration-500"
            >
              Home
            </Link>
            <Link
              to={"/menu"}
              className=" hover:bg-[#F5F5DC] hover:text-olive hover:scale-105 px-5 duration-500"
            >
              Menu
            </Link>
            <Link
              to={"/offer"}
              className=" hover:bg-[#F5F5DC] hover:text-olive hover:scale-105 px-5 duration-500"
            >
              Offer
            </Link>
            <Link
              to={"/about"}
              className=" hover:bg-[#F5F5DC] hover:text-olive hover:scale-105 px-5 duration-500"
            >
              About Us
            </Link>
            <Link
              to={"/reserve"}
              className=" hover:bg-[#F5F5DC] hover:text-olive hover:scale-105 px-5 duration-500"
            >
              Book a table
            </Link>
            <Link
              to={"/admin-dashboard"}
              className=" hover:bg-[#F5F5DC] hover:text-olive hover:scale-105 px-5 duration-500"
            >
              login
            </Link>
          </div>
        </div>
        <div>
          <div>
            <p className=" text-[20px] text-[#FFF8E1] text-center pt-10">
              New Arrivals
            </p>
            <hr className=" border-2" />
          </div>
          <div className=" grid grid-cols-3 md:gap-2 gap-5 py-5">
            {Menu?.map((item, index) => (
              <Link to={"/menu"} key={index}>
                <img
                  src={item}
                  alt=""
                  className="w-32 md:w-36 h-32 md:h-24 hover:scale-105 duration-300 rounded-xl"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className=" md:px-5">
          <div>
            <p className=" text-[20px] text-[#FFF8E1] text-center pt-10">
              Get in touch
            </p>
            <hr className=" border-2" />
          </div>
          <p className=" text-warm text-center py-5 ">
            Let Olive & Lime whisk you away to the Mediterranean.
          </p>
          <div className=" grid grid-cols-2 gap-5 py-5 ">
            <a
              href="https://www.facebook.com/people/OliveLime/61565142630094/"
              target="blank"
              className=" mx-auto"
            >
              {" "}
              <FaFacebook size={40} />
            </a>
            <a
              href="https://x.com/olive_and_lime"
              target="blank"
              className=" mx-auto"
            >
              {" "}
              <FaXTwitter size={40} />{" "}
            </a>

            {/* <FaInstagram size={40} /> */}
          </div>
        </div>
      </div>
      <hr className="border-yellow-100" />
      <div className=" text-[#FFF8E1] px-28 py-5 text-center">
        <p> © Copyright Olive & Lime. 2024 All Right Reserved </p>
      </div>
    </div>
  );
};

export default Footer;
