import React, { useState, useEffect } from "react";
import logo from "../../assets/ASSEMBLE LOGO SECONDARY 1.svg";
import { Link, useNavigate } from "react-router-dom";
import useViewportHeight from "../../hooks/useViewportHeight";
import { z } from "zod";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEmailId } from "../../redux/features/auth_slices/emailIdSlice";
import { loginViaEmailId } from "../../redux/features/auth_slices/AuthSlice";
const emailLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

export default function LoginViaEmail() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const viewportHeight = useViewportHeight();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const isLoading = useSelector((state) => state.auth.loading);

  const getDynamicSpacing = (height) => {
    if (height < 600) return 2;
    if (height < 800) return 4;
    if (height < 1000) return 6;
    return 8;
  };

  const dynamicSpacing = getDynamicSpacing(viewportHeight);

  const images = [
    "./Login Image 01.png",
    "./Login Image 02.png",
    "./Login Image 03.png",
    "./Login Image 04.png",
    "./Login Image 05.png",
    "./Login Image 06.png",
    "./Login Image 07.png",
    "./Login Image 08.png",
    "./Login Image 09.png",
    "./Login Image 10.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true);
      }, 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const url = import.meta.env.VITE_URL;
  const dispatch = useDispatch();
  const handleLoginApi = async () => {
    try {
      const response = await dispatch(loginViaEmailId({ email }));

      if (response.type === "loginViaEmailId/fulfilled") {
        navigate("/LoginViaEmailOTP");
        dispatch(setEmailId(email));

      }
    } catch (error) {
      // console.error("Login failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = emailLoginSchema.safeParse({ email });

    if (!validationResult.success) {
      const formattedErrors = {};
      validationResult.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
    } else {
      setErrors({});
      await handleLoginApi();
    }
  };

  return (
    <div className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden">
      {/* Mobile Banner */}
      <div className="block lg:hidden w-full min-h-[60px] max-h-[17vh]  top-0 left-0 z-10 overflow-hidden flex items-center justify-center">
        <img
          src='./Login Image 06.png'
          alt="Banner"
          className="w-full h-full object-contain
            relative translate-y-28 "
        />
      </div>
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-1/2 h-full bg-white flex flex-col pt-4 lg:pt-6 pb-4 px-4 lg:px-6 gap-3 lg:gap-5">
        {/* Header */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-3 lg:mb-5 w-full h-auto">
            <img
              src={logo}
              alt="Logo"
              className="h-10 lg:h-12 w-10 lg:w-12 object-contain"
            />
            <span className="text-xl lg:text-3xl font-bebas text-BrandColor">
              ASSEMBLE
            </span>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center w-full h-10 lg:h-12">
            <div className="flex rounded-full py-1 px-2 gap-2 w-full h-full bg-[#F2F2F2]">
              <div className="w-full h-full font-arialrounded text-base lg:text-base leading-none tracking-wider text-white font-normal flex items-center justify-center rounded-full px-3 lg:px-6 gap-1 bg-black">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`w-full h-full rounded-full lg:text-[16px] text-[12px] transition-colors ${isLogin
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                >
                  Login
                </button>
              </div>

              <div className="w-full h-full transition-all duration-300 ease-in font-arialrounded text-base lg:text-base leading-none tracking-wider text-black font-normal flex items-center justify-center rounded-full px-3 lg:px-6 gap-1 bg-white">
                <button
                  onClick={() => navigate("/RegisterViaEmail")}
                  className={`w-full h-full rounded-full lg:text-[16px] text-[12px] transition-colors ${!isLogin
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black hover:bg-white"
                    }`}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full flex-1 flex flex-col">
          <div className="mb-3 lg:mb-4">
            <h2 className="lg:text-[32px] text-[20px] font-arialrounded text-center">
              Login Via Sign In Code
            </h2>
            <p className="text-center text-gray-500 mt-4 font-arialrounded text-[10px] lg:text-base">
              Welcome back, Champion! It's time to dive into your esports
              adventure...
            </p>
          </div>

          <form
            className="flex flex-col gap-6 lg:gap-4 flex-1 pt-8 lg:justify-center"
            onSubmit={handleSubmit}
          >
            <div className={`space-y-${dynamicSpacing}`}>
              {/* Email Input */}
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`peer w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded-[4px] lg:rounded-[8px] outline-none ${errors.email ? "bg-red-100 text-red-700" : "bg-[#F2F2F2]"
                    }`}
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 lg:left-4 transition-all duration-200 ${email ? "top-1 text-[10px] lg:text-xs" : "top-3 text-[12px] lg:text-[16px]"
                    } peer-focus:top-1 peer-focus:text-[10px] ${errors.email ? "text-red-500" : "text-[#737373]"
                    }`}
                >
                  Email ID
                </label>
                {errors.email && (
                  <p className="text-red-500 text-[10px] mt-0.5 pl-3 lg:pl-4">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-auto pb-8">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-black hover:text-white transition-all duration-300 ease-in py-2 border-2 border-black text-black lg:rounded-xl rounded font-arialrounded font-normal text-[12px] lg:text-[20px] w-full"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <span>Get Sign In Code</span>
                  )}
                </button>
              </div>

            </div>
          </form>

          {/* Other Options */}
          <div className="mt-3 lg:mt-4 space-y-2 lg:space-y-3">
            <div className="flex flex-row justify-between text-xs lg:text-sm">
              <span
                className="h-6 lg:h-8 font-arialrounded font-normal text-[12px] lg:text-[20px] text-[#BFBFBF] cursor-pointer"
                onClick={() => navigate("")}
              >
                Login Via Sign In Code
              </span>
              <Link to="/forgotpasswordviaphone" ><span className="h-6 lg:h-8 font-arialrounded font-normal text-[12px] lg:text-[20px] text-black hover:text-gray-500 cursor-pointer">
                Forgot Credentials
              </span></Link>
            </div>

            <div className="w-full h-10 lg:h-12 relative flex items-center lg:rounded-xl rounded px-3 lg:px-4 gap-1 font-arialrounded font-normal text-xs lg:text-sm justify-center text-black hover:bg-blue-50 bg-white border-2 border-[#1A1A1A] group">
              <div className="relative group">
                <button
                  className="w-full h-4 font-arialrounded font-normal text-[12px] lg:text-[16px] justify-center text-black  group-hover:animate-trumble "
                  onClick={() => navigate("/")}
                >
                  Login By Username & Password
                </button>
              </div>
            </div>

            <button className="group w-full h-10 lg:h-12 flex items-center justify-center bg-white hover:bg-blue-50 border-2 border-[#1A1A1A] lg:rounded-xl rounded px-3 lg:px-4 gap-1">
              <img
                src="/icons_google.svg"
                alt="Google Icon"
                className="w-4 lg:w-5 h-4 lg:h-5 group-hover:animate-trumble"
              />
              <span className="font-arialrounded font-normal  text-[12px] lg:text-[16px]  text-black group-hover:animate-trumble">
                Login With Google
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Character Art */}
      <div className="hidden lg:block lg:w-1/2 h-full bg-gray-800 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`Character ${currentIndex + 1}`}
            className={`w-full h-auto object-contain transition-opacity duration-500 ease-in-out ${fade ? "opacity-100" : "opacity-0"
              }`}
          />
        </div>
      </div>
    </div>
  );
}
