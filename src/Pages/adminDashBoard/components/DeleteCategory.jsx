import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    
    axiosInstance
      .get("/menu/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories.");
      });
  }, []);

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      axiosInstance
        .delete(`/menu/category`, {
          params: { id },
        })
        .then((response) => {
          toast.success("Category deleted successfully!");
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category._id !== id)
          );
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
          toast.error("Failed to delete category.");
        });
    }
  };

  const handleSeeMenuClick = (category) => {
    navigate(`/menu/${category}`);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

 
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(categories.length / categoriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ToastContainer />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCategories.map((curElem) => (
          <div
            className="group px-5 relative h-72 bg-cover bg-center shadow-inner shadow-yellow-400"
            key={curElem._id}
            style={{ backgroundImage: `url(${curElem.image})` }}
          >
            <div className="absolute inset-0 bg-black opacity-30 group-hover:bg-limeGreen group-hover:opacity-70 group-hover:transition-opacity group-hover:duration-1000"></div>
            <h1 className="relative text-[20px] font-bold text-textWhite z-10 pt-10 group-hover:text-Charcoal pb-5">
              {curElem.name}
            </h1>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity font-merriweather duration-500 text-textWhite text-[16px] relative z-10">
              {curElem.promoLine}
            </p>
            <div
              className="absolute z-10 top-52 group-hover:shadow-2xl text-textWhite shadow-black bg-oliveGreen p-3 rounded-md font-bold right-[117px]"
              onClick={() => handleSeeMenuClick(curElem.category)}
            >
              See Menu
            </div>
            <button
              className="absolute z-10 top-4 right-4 bg-red-600 text-white p-2 rounded-md font-bold shadow-md hover:bg-red-700"
              onClick={() => handleDeleteClick(curElem._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === number
                ? "bg-limeGreen text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeleteCategory;
