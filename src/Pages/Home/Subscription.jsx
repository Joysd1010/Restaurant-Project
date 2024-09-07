import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axiosInstance";

const Subscription = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      "Do you want to submit your email to get update about our offers?"
    );

    if (isConfirmed) {
      try {
        const response = await axiosInstance.post("/email", { email,name});
        if (response.status === 200) {
          toast.success("Email submitted successfully!");
          setEmail("");
          setName("");
        }
      } catch (error) {
        console.error("Error submitting email:", error);
        toast.error("Failed to submit email. Please try again.");
      }
      // console.log(name, email);
    } else {
      console.log("Form submission canceled");
    }
  };

  return (
    <div className="relative bg-[url('https://cafeu-react.netlify.app/img/image/ad-ban-bg.png')] bg-cover my-1 py-16">
      <div className="absolute inset-0 flex ">
        <div
          className="w-1/2 bg-yellow-500  opacity-90"
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
          <p className="text-textWhite text-[30px] font-bold font-merriweather">
            Stay{" "}
            <span className="md:text-Charcoal text-white">Informed with</span>{" "}
            our new delicacies
          </p>
          <p className="text-white md:text-Charcoal text-[16px] pb-5">
            For exciting offers, Coupons and deals
          </p>
        </div>
        <div className="">
          <form onSubmit={onSubmit} className="flex flex-col">
            <input
              type="email"
              required={true}
              placeholder="Enter Your Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="m-2 p-2 w-72 bg-white rounded md:w-96 md:mx-0"
            />
            <input
              type="text"
              required={true}
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="m-2 p-2 w-72 bg-white rounded md:w-96 md:mx-0"
            />
            <input
              type="submit"
              value="Subscribe"
              className="bg-olive w-72 md:w-96 md:bg-limeGreen font-bold cursor-pointer mx-2 md:mx-0 my-2 p-2 text-textWhite rounded-md"
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Subscription;
