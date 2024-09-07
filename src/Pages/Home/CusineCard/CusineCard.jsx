import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { CircularProgress } from "@mui/material";

const CusineCard = () => {
  const [Category, setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get("/menu/category")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, []);

  const handleSeeMenuClick = (category) => {
    console.log(category);
    navigate(`/menu/${category}`);
  };

  return (
    <>
    {
      Category.length<0?<div className="flex justify-center py-10">
      <CircularProgress />
    </div>:<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {" "}
        {Category.map((curElem) => {
          return (
            <div
              className="group px-5 relative h-72 bg-cover bg-center shadow-inner shadow-yellow-400"
              key={curElem._id}
              style={{ backgroundImage: `url(${curElem.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-30 group-hover:bg-limeGreen group-hover:opacity-70 group-hover:transition-opacity group-hover:duration-1000"></div>
              <p className="relative text-24 md:text-[20px] font-bold text-textWhite z-10 pt-10 group-hover:text-Charcoal pb-5">
                {curElem.name}
              </p>
              <p className="opacity-0 group-hover:opacity-100 transition-opacity font-merriweather duration-500 text-textWhite text-[16px] relative z-10">
                {curElem.promoLine}
              </p>
              <div
                className="absolute z-10 top-52 group-hover:shadow-2xl shadow-black bg-olive text-textWhite p-3 rounded-md right-[116px] md:right-[117px] cursor-pointer"
                onClick={() => {
                  handleSeeMenuClick(curElem.category);
                }}
              >
                See Menu
              </div>
            </div>
          );
        })}
      </div>
    }
      
    </>
  );
};

export default CusineCard;
