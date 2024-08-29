import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../Components/Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const from = location.state?.from?.pathname;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, event) => {
    event.preventDefault();
    const { email, password } = data;
    console.log(data);

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Invalid Credential. Please provide right information")
        setError(error.message);
      });
  };

  return (
    <div className="md:mx-32 flex flex-col md:flex-row items-center py-5 md:py-10">
        <div>
<img src="https://i.postimg.cc/g0qH0MtC/Untitled-design.gif" className=" md:w-[500px]" alt="" />
        </div>
      <div className="flex flex-col gap-2 border-2 hover:border-olive md:w-96 px-10 py-5 rounded-xl">
        <h1 className="text-3xl text-darkOlive mb-10 text-center">Login Here!!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <label htmlFor="mail" className="text-18 text-olive">
            Email id or user name
          </label>
          <input
            type="email"
            id="mail"
            placeholder="Enter mail here"
            className="input input-bordered bg-white w-full max-w-xs"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
          <label htmlFor="pass" className="text-18  text-olive">
            Enter password
          </label>
          <input
            type="password"
            id="pass"
            placeholder="Enter your password"
            className="input input-bordered bg-white w-full max-w-xs "
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
          <input
            type="submit"
            value="Login"
            className="input input-bordered bg-olive  text-white w-full max-w-xs btn my-5 "
          />
        </form>
        
        
      </div>

      <ToastContainer/>
    </div>
  );
};

export default Login;
