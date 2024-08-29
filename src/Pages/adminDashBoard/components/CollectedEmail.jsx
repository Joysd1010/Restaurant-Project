import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { DownloadTableExcel } from "react-export-table-to-excel";

const CollectedEmail = () => {
  const tableRef = useRef(null);
  const tabletwoRef = useRef(null);
  const [Mail, setMail] = useState([]); // Full dataset
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust the number of items per page as needed

  const getMail = async () => {
    try {
      const response = await axiosInstance.get("/email");
      setMail(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  useEffect(() => {
    getMail();
  }, []);

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Mail.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(Mail.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="h-[550px] flex flex-col items-center">
      <h1 className="font-merriweather text-2xl font-bold text-center text-oliveGreen mb-4">
        All Collected Mails
      </h1>
      <hr className="border-2 border-oliveGreen w-full max-w-screen-md mb-4" />
      <div className="py-5">
        {/* Download full dataset */}
        <div className=" flex justify-around">
            <DownloadTableExcel
              filename="users_table"
              sheet="users"
              currentTableRef={tabletwoRef.current}
              
            >
              <button className="btn bg-olive hover:bg-limeGreen text-white px-4 py-2 rounded  ">
                Export to Excel
              </button>
            </DownloadTableExcel>
        </div>
        <table
            ref={tabletwoRef}
            className="min-w-full bg-white border hidden border-gray-300 rounded-lg shadow-md"
          >
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="py-2 px-4 text-left text-gray-600">No.</th>
                <th className="py-2 px-4 text-left text-gray-600">Email</th>
              </tr>
            </thead>
            <tbody>
              {Mail.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-700">{indexOfFirstItem + index + 1}</td>
                  <td className="py-2 px-4 text-gray-700">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

        <div className="overflow-x-auto mt-4">
          <table
            ref={tableRef}
            className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md w-[500px]"
          >
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="py-2 px-4 text-left text-gray-600">No.</th>
                <th className="py-2 px-4 text-left text-gray-600">Email</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-700">{indexOfFirstItem + index + 1}</td>
                  <td className="py-2 px-4 text-gray-700">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {currentPage > 1 && (
            <button
              className="btn bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          )}

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn ${currentPage === index + 1 ? 'bg-olive hover:bg-limeGreen text-white' : 'bg-gray-300 text-gray-700'} px-4 py-2 rounded mx-1 hover:bg-gray-400`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              className="btn bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectedEmail;
