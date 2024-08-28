import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance"; // Adjust path as necessary
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [editableMenu, setEditableMenu] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [suggestions, setSuggestions] = useState({
    name: [],
    category: [],
    type: []
  });

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
    // Filter menu items whenever filters change
    const filteredItems = menuItems.filter((menu) => {
      return (
        menu.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        menu.category.toLowerCase().includes(categoryFilter.toLowerCase()) &&
        menu.type.toLowerCase().includes(typeFilter.toLowerCase())
      );
    });

    setFilteredMenuItems(filteredItems);
  }, [nameFilter, categoryFilter, typeFilter, menuItems]);

  const handleEditClick = (menu) => {
    setEditableMenu(menu);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableMenu((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const { _id, name, category, promotionalLine, price, offer, offerPrice, type } = editableMenu;
      await axiosInstance.put(`/menu/${_id}`, {
        id: _id,
        name,
        category,
        promotionalLine,
        price,
        offer,
        offerPrice,
        type
      });

      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((menu) =>
          menu._id === _id ? { ...menu, name, category, promotionalLine, price, offer, offerPrice, type } : menu
        )
      );

      toast.success("Menu item updated successfully!");
      setEditableMenu(null); 
    } catch (error) {
      toast.error("Failed to update menu item. Please try again.");
      console.error("Error updating menu item:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Update the filter state
    if (name === "name") setNameFilter(value);
    if (name === "category") setCategoryFilter(value);
    if (name === "type") setTypeFilter(value);

    // Generate suggestions based on input
    if (value.length >= 2) {
      const newSuggestions = {
        name: [],
        category: [],
        type: []
      };

      if (name === "name") {
        newSuggestions.name = [...new Set(menuItems.map(item => item.name).filter(name => name.toLowerCase().startsWith(value.toLowerCase())))];
      }
      if (name === "category") {
        newSuggestions.category = [...new Set(menuItems.map(item => item.category).filter(category => category.toLowerCase().startsWith(value.toLowerCase())))];
      }
      if (name === "type") {
        newSuggestions.type = [...new Set(menuItems.map(item => item.type).filter(type => type.toLowerCase().startsWith(value.toLowerCase())))];
      }

      setSuggestions(newSuggestions);
    } else {
      setSuggestions({
        name: [],
        category: [],
        type: []
      });
    }
  };

  const handleSuggestionClick = (suggestion, filterType) => {
    if (filterType === "name") setNameFilter(suggestion);
    if (filterType === "category") setCategoryFilter(suggestion);
    if (filterType === "type") setTypeFilter(suggestion);

    setSuggestions({
      name: [],
      category: [],
      type: []
    });
  };

  return (
    <div className="p-4">
      <ToastContainer position="bottom-right" autoClose={3000} />

      <div className="mb-4 flex gap-10 mx-3">
        <input
          type="text"
          name="name"
          value={nameFilter}
          onChange={handleFilterChange}
          placeholder="Filter by name"
          className="p-2 border border-gray-300 rounded w-full mb-2 bg-white"
        />
        {suggestions.name.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded shadow-md">
            {suggestions.name.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion, "name")}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <input
          type="text"
          name="category"
          value={categoryFilter}
          onChange={handleFilterChange}
          placeholder="Filter by category"
          className="p-2 border border-gray-300 rounded w-full mb-2 bg-white"
        />
        {suggestions.category.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded shadow-md">
            {suggestions.category.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion, "category")}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <input
          type="text"
          name="type"
          value={typeFilter}
          onChange={handleFilterChange}
          placeholder="Filter by type"
          className="p-2 border border-gray-300 rounded w-full mb-2 bg-white"
        />
        {suggestions.type.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded shadow-md">
            {suggestions.type.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion, "type")}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMenuItems.map((menu) => (
          <div key={menu._id} className="bg-white shadow-lg w-72 mx-auto rounded-lg overflow-hidden hover:shadow-limeGreen duration-300">
            <img src={menu.image} alt={menu.name} className="w-full object-cover p-2" />
            {menu.offer && <div className="bg-red-700 border-2 rotate-45 bottom-52 left-20 relative text-center text-white font-merriweather text-18">
              Offer
            </div>}
            <div className="p-4">
              {editableMenu && editableMenu._id === menu._id ? (
                // Edit Mode
                <div>
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editableMenu.name}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded w-full mb-2 bg-white"
                  />
                  <label className="block mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={editableMenu.category}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded w-full mb-2 bg-white"
                  />
                  <label className="block mb-1">Type</label>
                  <input
                    type="text"
                    name="type"
                    value={editableMenu.type}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded w-full mb-2 bg-white"
                  />
                  <label className="block mb-1">Promotional Line</label>
                  <input
                    type="text"
                    name="promotionalLine"
                    value={editableMenu.promotionalLine}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded w-full mb-2 bg-white"
                  />
                  <label className="block mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={editableMenu.price}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded w-full mb-2 bg-white"
                  />
                  <label className="block mb-1">Offer</label>
                  <input
                    type="checked"
                    name="offer"
                    value={editableMenu.offer}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded w-full mb-2 bg-white"
                  />
                  <label className="block mb-1">Offer Price</label>
                  <input
                    type="number"
                    name="offerPrice"
                    value={editableMenu.offerPrice}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded w-full mb-2 bg-white"
                  />
                  <div className="mt-4">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditableMenu(null)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <h3 className="text-xl font-bold mb-2">{menu.name}</h3>
                  <p className="text-gray-700 mb-2">Category: {menu.category}</p>
                  <p className="text-gray-700 mb-2">Type: {menu.type}</p>
                  <p className="text-gray-700 mb-2">Promotional Line: {menu.promotionalLine}</p>
                  <p className="text-gray-700 mb-2">Price: {menu.price}</p>
                  {menu.offer && (
                    <p className="text-red-500 mb-2">Offer: {menu.offer} off! New Price: {menu.offerPrice}</p>
                  )}
                  <button
                    onClick={() => handleEditClick(menu)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    update
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
