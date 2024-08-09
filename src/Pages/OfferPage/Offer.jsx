const Offer = () => {
  return (
    <div className=" md:py-44 py-32  md:mx-28 text-center bg-[url('https://www.nultylighting.co.uk/wp-content/uploads/2018/03/lighting-dramatic-feature-ceiling-dark-wood-slats-white-undulating-soffit-nulty-banner.jpg')]">
      <div
        className="bg-limeGreen py-5 mx-5 rounded-md bg-opacity-75"
        style={{
          clipPath: "polygon(50% 0, 100% 30%, 100% 85%, 50% 100%, 0 85%, 0 30%)",
        }}
      >
        <div className=" text-Charcoal font-bold text-26">
          We Are Coming Soon...
        </div>{" "}
        <p className=" text-warm text-20 font-bold font-merriweather">
          Stay Tuned
        </p>
      </div>
    </div>
  );
};

export default Offer;
