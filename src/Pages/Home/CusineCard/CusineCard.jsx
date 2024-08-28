import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

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
      {Category.map((curElem) => {
        return (
          <div
            className="group px-5 relative h-72 bg-cover bg-center shadow-inner shadow-yellow-400"
            key={curElem._id}
            style={{ backgroundImage: `url(${curElem.image})` }}
          >
            <div className="absolute inset-0 bg-black opacity-30 group-hover:bg-limeGreen group-hover:opacity-70 group-hover:transition-opacity group-hover:duration-1000"></div>
            <h1 className="relative text-[20px] font-bold text-warm z-10 pt-10 group-hover:text-Charcoal pb-5">
              {curElem.name}
            </h1>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity font-merriweather duration-500 text-warm text-[16px] relative z-10">
              {curElem.promoLine}
            </p>
            <div
              className="absolute z-10 top-52 group-hover:shadow-2xl shadow-black bg-warm p-3 rounded-md font-bold right-36"
              onClick={() => {
                handleSeeMenuClick(curElem.category);
              }}
            >
              See Menu
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CusineCard;
