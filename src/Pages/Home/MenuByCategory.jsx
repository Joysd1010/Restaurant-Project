import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CusineCard from "../../Components/CuisineCard";
import axiosInstance from "../../api/axiosInstance";

const MenuByCategory = () => {
  const { category } = useParams();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/menu`, { params: { category } })
      .then((response) => {
        console.log(response.data)
        setMenu(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, [category]);
  

  return (
    <div className="mx-5  grid grid-cols-1 md:grid-cols-3 gap-5 pt-5 p-12">
        <CusineCard  menu={menu} />
    </div>
  );
};

export default MenuByCategory;
