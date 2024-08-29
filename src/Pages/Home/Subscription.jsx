import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axiosInstance";

const Subscription = () => {
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      "Do you want to submit your email to get update about our offers?"
    );

    if (isConfirmed) {
      try {
        const response = await axiosInstance.post("/email", { email });
        if (response.status === 200) {
          toast.success("Email submitted successfully!");
          setEmail("");
        }
      } catch (error) {
        console.error("Error submitting email:", error);
        toast.error("Failed to submit email. Please try again.");
      }
    } else {
      console.log("Form submission canceled");
    }
  };

  return (
    <div className="relative bg-[url('https://cafeu-react.netlify.app/img/image/ad-ban-bg.png')] bg-cover my-1 py-16">
      <div className="absolute inset-0 flex ">
        <div
          className="w-1/2 bg-yellow-500 opacity-90"
          style={{
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
          }}
        ></div>
        <div
          className="w-1/2 bg-black opacity-70"
          style={{
            clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        ></div>
      </div>
      <div className="relative z-10 px-5 flex flex-col md:flex-row items-center justify-between">
        <div>
          <p className="text-warm text-[30px] font-bold font-merriweather">
            Stay <span className="md:text-warm text-olive">Informed with</span>{" "}
            our new delicacies
          </p>
          <p className="text-Charcoal text-[16px]">
            For exciting offers, Coupons and deals
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Enter Your Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="m-2 p-2 bg-white rounded w-96 "
          />
          <input
            type="submit"
            className="bg-limeGreen m-2 p-2 text-warm rounded-md"
          />
        </form>
      </div>
      <ToastContainer /> {/* Toast container for displaying notifications */}
    </div>
  );
};

export default Subscription;
