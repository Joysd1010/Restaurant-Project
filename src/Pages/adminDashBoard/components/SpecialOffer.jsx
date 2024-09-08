import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";

const SpecialOffer = () => {
 
  const [loading, setLoading] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [discount, setDiscount] = useState(null);
  const [itemsPerPage] = useState(8);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    type: "",
  });
  const [suggestions, setSuggestions] = useState({
    name: [],
    category: [],
    type: [],
  });

 
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/menu")
      .then((response) => {
        setMenuItems(response.data);
        setFilteredItems(response.data);
      })
      .catch((error) => console.error("Error fetching menu items:", error));
  }, []);

  const handleOfferSelect = (e) => {
    setSelectedOffer(e.target.value);
  };

  const handleAddToOffer = (id) => {
    if (!selectedItems.includes(id)) {
      setSelectedItems((prevSelected) => [...prevSelected, id]);
      toast.success("Item added to offer!");
    } else {
      toast.info("Item already in the offer!");
    }
  };

  const handleRemoveFromOffer = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.filter((item) => item !== id)
    );
    toast.info("Item removed from offer.");
  };

  const handleSubmit = () => {
    setLoading(true)
    if (!discount) {
      console.error("No items selected.");
      toast.error('Discount not set');
      setLoading(false)
      return;
    }
   if (selectedOffer=="") {
      console.error("No items selected.");
      toast.error('Offer name not Provided');
      setLoading(false)
      return;
    }
   if (startTime=="") {
      console.error("No items selected.");
      toast.error('Start Time not Defined');
      setLoading(false)
      return;
    }
   if (endTime=="") {
      console.error("No items selected.");
      toast.error('End Time not Defined');
      setLoading(false)
      return;
    }
   
    if (!imageFile) {
      console.error("Image file is missing.");
      toast.error('Image not selected');  
      setLoading(false)
          return;
    }
    

    if (!selectedItems.length) {
      console.error("No items selected.");
      toast.error('Items not selected');
      setLoading(false)
      return;
    }
    

    const formData = new FormData();
    formData.append("name", selectedOffer);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("discount", discount);
    formData.append("file", imageFile);
    formData.append("items", JSON.stringify(selectedItems));

    console.log(formData);
  
    axiosInstance.post('/offer', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
          },
    })
      .then(response => {
        if (response.status === 200) {
          toast.success('Offer created successfully!');
          
          setSelectedOffer('');
          setStartTime('');
          setEndTime('');
          setDiscount(null);
          setImage('');
          setImageFile(null);
          setSelectedItems([]);
          setLoading(false);
        }
        console.log('Offer created:', response.data);
      })
      .catch(error => console.error('Error creating offer:', error));
      setLoading(false)
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSuggestionSelect = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    if (name === "startTime") {
      setStartTime(value);
      
    } else if (name === "endTime") {
      setEndTime(value);
      console.log(startTime)
    }
  };

  const handleDiscount = (e) => {
    const { value } = e.target;
    setDiscount(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    let filtered = menuItems;

    if (filters.name) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.category) {
      filtered = filtered.filter((item) => item.category === filters.category);
    }
    if (filters.type) {
      filtered = filtered.filter((item) => item.type === filters.type);
    }

    setFilteredItems(filtered);
    setCurrentPage(1);

    const nameSuggestions = [
      ...new Set(
        menuItems
          .filter((item) =>
            item.name.toLowerCase().includes(filters.name.toLowerCase())
          )
          .map((item) => item.name)
      ),
    ];
    const categorySuggestions = [
      ...new Set(
        menuItems
          .filter((item) =>
            item.category.toLowerCase().includes(filters.category.toLowerCase())
          )
          .map((item) => item.category)
      ),
    ];
    const typeSuggestions = [
      ...new Set(
        menuItems
          .filter((item) =>
            item.type.toLowerCase().includes(filters.type.toLowerCase())
          )
          .map((item) => item.type)
      ),
    ];

    setSuggestions({
      name: nameSuggestions,
      category: categorySuggestions,
      type: typeSuggestions,
    });
  }, [filters, menuItems]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentDateTime = new Date().toISOString().slice(0, 16);
  return (
    <div className="container mx-auto p-4 ">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Create Special Offer</h2>

      <div className="mb-4">
        <label htmlFor="offerName" className="block text-lg font-medium mb-2">
          Select Offer Name:
        </label>
        <input
          type="text"
          required={true}
          id="offerName"
          value={selectedOffer}
          onChange={handleOfferSelect}
          className="block bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
  <label htmlFor="startTime" className="block text-lg font-medium mb-2">
    Start Time: 
  </label>
  <input
  required={true}
    type="datetime-local"
    id="startTime"
    name="startTime"
    value={startTime}
    min={currentDateTime}  
    onChange={handleTimeChange}
    className="block bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="endTime" className="block text-lg font-medium mb-2">
    End Time:
  </label>

  <style>
    {`input[type="datetime-local"]::-webkit-calendar-picker-indicator,
      input[type="date"]::-webkit-calendar-picker-indicator {
        background: url('data:image/svg+xml;utf8,<svg fill="black" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M760 256V136h-80v120H280V136h-80v120H120v640h720V256h-80Zm80-40v640q0 17-11.5 28.5T800 896H160q-17 0-28.5-11.5T120 856V256q0-17 11.5-28.5T160 216h40V96h160v120h240V96h160v120h40q17 0 28.5 11.5T840 256Zm-680 80v560h640V336H160Zm0 0v560-560Z"/></svg>') no-repeat;
        color: black;
        cursor: pointer;
        width: 24px;
        height: 24px;
      }

      input[type="datetime-local"]::-webkit-inner-spin-button,
      input[type="date"]::-webkit-inner-spin-button,
      input[type="datetime-local"]::-webkit-clear-button,
      input[type="date"]::-webkit-clear-button {
        display: none;
      }

      input[type="datetime-local"]::-moz-focus-inner,
      input[type="date"]::-moz-focus-inner {
        border: 0;
      }

      input[type="datetime-local"],
      input[type="date"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: none;
        padding: 8px 12px;
        border-radius: 4px;
        border: 1px solid #ccc;
      }`}
  </style>

  <input
    type="datetime-local"
    id="endTime"
    required={true}
    name="endTime"
    min={currentDateTime}
    value={endTime}
    onChange={handleTimeChange}
    className="block bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
  />
</div>


      <div className="mb-4">
        <label htmlFor="discount" className="block text-lg font-medium mb-2">
          Discount(%):
        </label>
        <input
          type="number"
          required={true}
          id="discount"
          name="discount"
          value={discount}
          onChange={handleDiscount}
          className="block bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-lg font-medium mb-2">
          Upload Image:
        </label>
        <input
          type="file"
          id="image"
          required={true}
          accept="image/*"
          onChange={handleFileChange}
          className="block bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {image && (
          <img
            src={image}
            alt="Uploaded"
            className="mt-2 w-48 h-48 object-cover"
          />
        )}
      </div>

      <div className="mb-4 flex gap-4">
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Filter by name"
            value={filters.name}
            onChange={handleFilterChange}
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {filters.name && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10">
              {suggestions.name.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionSelect("name", suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            name="category"
            placeholder="Filter by category"
            value={filters.category}
            onChange={handleFilterChange}
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {filters.category && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10">
              {suggestions.category.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionSelect("category", suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            name="type"
            placeholder="Filter by Serving Time"
            value={filters.type}
            onChange={handleFilterChange}
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {filters.type && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10">
              {suggestions.type.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionSelect("type", suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Menu Items:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentItems.map((item) => (
            <div key={item._id} className="border p-4 rounded-md">
              <h4 className="font-bold">{item.name}</h4>
              <p>Category: {item.category}</p>
              <p>Type: {item.type}</p>
              <button
                onClick={() => handleAddToOffer(item._id)}
                className="mt-2 px-4 py-2 bg-olive text-white rounded-md"
              >
                Add to Offer
              </button>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md mr-1"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= filteredItems.length}
            className="px-3 py-1 border rounded-md"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Selected Items for Offer:</h3>
        <ul>
          {selectedItems.map((id) => {
            const item = menuItems.find((item) => item._id === id);
            return (
              <li
                key={id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{item?.name}</span>
                <button
                  onClick={() => handleRemoveFromOffer(id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove from Offer
                </button>
              </li>
            );
          })}
        </ul>
      </div>

     {
        loading?<div>
          <CircularProgress color="success"/>
        </div>: <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Create Offer
      </button>
     }
    </div>
  );
};

export default SpecialOffer;
