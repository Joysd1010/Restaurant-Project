import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [filter, setFilter] = useState({ name: "", category: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axiosInstance.get("/menu");
        setMenuItems(response.data);
        setFilteredMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    // Filter menu items based on the filter state
    const filteredItems = menuItems.filter(item =>
      (filter.name ? item.name.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
      (filter.category ? item.category.toLowerCase().includes(filter.category.toLowerCase()) : true) &&
      (filter.type ? item.type.toLowerCase().includes(filter.type.toLowerCase()) : true)
    );
    setFilteredMenuItems(filteredItems);
    setCurrentPage(1); // Reset to the first page on filter change
  }, [filter, menuItems]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/menu?id=${id}`);
      setFilteredMenuItems(filteredMenuItems.filter(item => item._id !== id));
      toast.success("Menu item deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete menu item. Please try again.");
      console.error("Error deleting menu item:", error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMenuItems = filteredMenuItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMenuItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <ToastContainer position="bottom-right" autoClose={3000} />

      <div className="mb-4 flex flex-wrap">
        <input
          type="text"
          name="name"
          placeholder="Filter by name"
          value={filter.name}
          onChange={handleFilterChange}
          className="p-2 border border-gray-500 bg-white rounded mb-2 mr-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Filter by category"
          value={filter.category}
          onChange={handleFilterChange}
          className="p-2 border border-gray-500 bg-white rounded mb-2 mr-2"
        />
        <input
          type="text"
          name="type"
          placeholder="Filter by type"
          value={filter.type}
          onChange={handleFilterChange}
          className="p-2 border border-gray-500 bg-white rounded mb-2"
        />
      </div>

      {currentMenuItems.length === 0 ? (
        <p>No menu items found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentMenuItems.map(menu => (
            <div
              key={menu._id}
              className="bg-white shadow-lg w-72 mx-auto rounded-lg overflow-hidden hover:shadow-limeGreen duration-300"
            >
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full object-cover p-2"
              />
              {menu.offer && (
                <div className="bg-red-700 border-2 rotate-45 bottom-52 left-20 relative text-center text-white font-merriweather text-18">
                  Offer
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{menu.name}</h3>
                <p className="text-gray-700">{menu.promotionalLine}</p>
                <div className="flex justify-between items-center py-3">
                  <div>
                    <p className="text-gray-900 font-semibold mt-2">
                      ${menu.offer ? menu.offerPrice : menu.price}
                    </p>
                    {menu.offer && (
                      <p className="text-red-500 line-through">${menu.price}</p>
                    )}
                  </div>
                  <button
                    className="btn bg-red-500 text-white"
                    onClick={() => handleDelete(menu._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1 ? "bg-limeGreen text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
