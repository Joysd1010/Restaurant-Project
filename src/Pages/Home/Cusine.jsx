import React, { useEffect, useState } from "react";
import CusineCard from "../Home/CusineCard/CusineCard";
import axiosInstance from "../../api/axiosInstance";

const Cusine = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/menu")
      .then((response) => {
        console.log(response.data);
        setMenu(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, []);

  
  return (
    <div className="text-center pt-7 pb-5">
      <div className="group">
        <p className="font-merriweather font-extrabold text-[20px]">
          Our Services
        </p>
        <h1 className="text-[30px] font-bold text-Charcoal">
          Adventure on every plate, magic in every glass
        </h1>
        <hr className="border-2 w-3/4 mx-auto border-Charcoal group-hover:border-limeGreen group-hover:shadow-2xl shadow-yellow-400" />
      </div>
      <div className="mx-5   pt-5">
        {/* {menu && menu.map((item) => ( */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <CusineCard />
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default Cusine;
