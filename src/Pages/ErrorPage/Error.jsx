import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="bg-[#FEFEFE] md:mx-28">
            <img src="https://i.ibb.co/cxWnRNj/Untitled-design3.gif" className="mx-auto w-2/3 py-5" alt="" />

            <div className="">
                <h1 className=" text-center font-merriweather text-28 py-2">Sorry, Page not found </h1>
                <div className=" flex justify-around pb-4"><Link className=" bg-lime hover:bg-[#FEFEFE] hover:border-2 border-lime py-2 px-4 font-bold  mx-auto rounded duration-300 hover:text-lime text-[#FEFEFE]" to={'/'}>Go to home</Link></div>
            </div>

        </div>
    );
};

export default Error;