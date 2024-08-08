import React from "react";

const CusineCard = ({ menu }) => {
  console.log(menu, "wow");
  
  // Check if menu is an array
  if (!Array.isArray(menu)) {
    return <p>No data available.</p>;
  }

  return (
    <>
     {/* <div className="w-full"> */}
      {/* <div className="bg-red-600 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4"> */}
        {menu.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-700">{item.details}</p>
              <p className="text-gray-900 font-semibold mt-2">
                ${item.offer ? item.offerPrice : item.price}
              </p>
              {item.offer && (
                <p className="text-red-500 line-through">${item.price}</p>
              )}
            </div>
          </div>
        ))}
      {/* </div> */}
    {/* </div> */}
    </>
  );
};

export default CusineCard;
