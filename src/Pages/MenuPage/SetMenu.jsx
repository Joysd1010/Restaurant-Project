import React from "react";
import CusineCard from "./CuisineCard";

const SetMenu = ({ menu, time }) => {
  console.log("menu :", menu, "time", time);
  const menuDevider = menu.filter(
    (item) => item.type && item.type.toLowerCase() === time.toLowerCase()
  );
  return (
    <div >
      {menuDevider.length < 1 ? (
        <div className="font-merriweather text-18 text-center font-bold py-5">
          
          Our {time.toUpperCase()} menu is on the way, please stay tuned
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">{menuDevider.map((foods) => <CusineCard key={foods._id} menu={foods} />)}</div>
      )}
    </div>
  );
};

export default SetMenu;
