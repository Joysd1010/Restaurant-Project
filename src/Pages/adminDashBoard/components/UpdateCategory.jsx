import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UpdateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editableCategory, setEditableCategory] = useState(null);
  const [tempName, setTempName] = useState("");
  const [tempPromoLine, setTempPromoLine] = useState("");
  const categoriesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories on component mount
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

  const handleUpdateClick = (category) => {
    setEditableCategory(category._id);
    setTempName(category.name);
    setTempPromoLine(category.promoLine);
  };

  const handleSaveClick = (id) => {
    axiosInstance
      .put(`/menu/category/${id}`, {
        name: tempName,
        promoLine: tempPromoLine
      })
      .then((response) => {
        toast.success("Category updated successfully!");
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === id
              ? { ...category, name: tempName, promoLine: tempPromoLine }
              : category
          )
        );
        setEditableCategory(null);
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        toast.error("Failed to update category.");
      });
  };

  const handleCancelClick = () => {
    setEditableCategory(null);
  };

  const handleSeeMenuClick = (category) => {
    navigate(`/menu/${category}`);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get the current categories to display
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(categories.length / categoriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="">
      <ToastContainer />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCategories.map((curElem) => (
          <div
            className="group px-5 relative h-72 bg-cover bg-center shadow-inner shadow-yellow-400"
            key={curElem._id}
            style={{ backgroundImage: `url(${curElem.image})` }}
          >
            <div className="absolute inset-0 bg-black opacity-30 group-hover:bg-limeGreen group-hover:opacity-70 group-hover:transition-opacity group-hover:duration-1000"></div>
            {editableCategory === curElem._id ? (
              <>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="relative text-[20px] font-bold text-olive z-10 pt-10 group-hover:text-Charcoal pb-5 bg-white border border-gray-300 rounded-md p-2"
                />
                <textarea
                  value={tempPromoLine}
                  onChange={(e) => setTempPromoLine(e.target.value)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity font-merriweather duration-500 text-olive text-[16px] relative z-10 bg-white border border-gray-300 rounded-md p-2"
                />
                <div className="absolute z-10 top-52 right-36 flex space-x-2">
                  <button
                    className="bg-green-600 text-white p-2 rounded-md font-bold shadow-md hover:bg-green-700"
                    onClick={() => handleSaveClick(curElem._id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded-md font-bold shadow-md hover:bg-red-700"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="relative text-[20px] font-bold text-warm z-10 pt-10 group-hover:text-Charcoal pb-5">
                  {curElem.name}
                </h1>
                <p className="opacity-0 group-hover:opacity-100 transition-opacity font-merriweather duration-500 text-warm text-[16px] relative z-10">
                  {curElem.promoLine}
                </p>
                <div
                  className="absolute z-10 top-52 group-hover:shadow-2xl shadow-black bg-warm p-3 rounded-md font-bold right-36"
                  onClick={() => handleSeeMenuClick(curElem.category)}
                >
                  See Menu
                </div>
                <button
                  className="absolute z-10 top-4 right-4 bg-green-600 text-white p-2 rounded-md font-bold shadow-md hover:bg-blue-700"
                  onClick={() => handleUpdateClick(curElem)}
                >
                  Update
                </button>
              </>
            )}
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

export default UpdateCategory;
