import React from "react";

const Subscription = () => {
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
          <p className="text-warm  text-[30px] font-bold font-merriweather">
            Stay <span className="md:text-warm text-olive">Informed with</span> our new delicacies
          </p>
          <p className="text-Charcoal text-[16px]">For exciting offers, Coupons and deals</p>
        </div>
        <form action="">
          <input
            type="email"
            placeholder="Enter Your Mail"
            className="m-2 p-2 bg-white rounded w-96 "
          />
          <input type="submit" className=" bg-limeGreen m-2 p-2 text-warm rounded-md" />
        </form>
      </div>
    </div>
  );
};

export default Subscription;
