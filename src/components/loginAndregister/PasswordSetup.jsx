import React, { useState, useEffect } from "react";
import logo from "../../assets/ASSEMBLE LOGO SECONDARY 1.svg";
import { useNavigate } from "react-router-dom";
import useViewportHeight from "../../hooks/useViewportHeight";
import { useDispatch, useSelector } from "react-redux";
import { setPassword, registerUser } from "../../redux/features/auth_slices/RegisterSlice";
import Loader from "../Loader";
import { getUserData } from "../../redux/features/auth_slices/AuthSlice";

export default function PasswordSetup() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPasswordLocal] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const navigate = useNavigate();
  const viewportHeight = useViewportHeight();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const emailId = localStorage.getItem("email") || useSelector((state) => state.email.emailId);
  const usernameId = localStorage.getItem("usernameId") || useSelector((state) => state.register.username);
  const email = localStorage.getItem("email") || useSelector((state) => state.register.email)
  const isLoading = useSelector((state) => state.register.loading);

  const getDynamicSpacing = (height) => {
    if (height < 600) return 2;
    if (height < 800) return 4;
    if (height < 1000) return 6;
    return 8;
  };

  const isMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);
  const typesMatched = [hasLetter, hasNumber, hasSymbol].filter(Boolean).length;
  const isStrongEnough = typesMatched >= 2;

  const dynamicSpacing = getDynamicSpacing(viewportHeight);

  const handleRegisterDetailsApi = async () => {
    try {
      dispatch(setPassword(password));
      const result = await dispatch(
        registerUser({
          email: emailId || email,
          username: usernameId,
          password: password,
        })
      );
      if (result.type === "auth/registerUser/fulfilled") {
        await dispatch(getUserData(result._id))
        navigate("/ProfilePicture");
        localStorage.removeItem("email");
        localStorage.removeItem("usernameId");
        localStorage.removeItem("otp");
      }
    } catch (err) {
      // console.error("Unexpected error during registration:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      handleRegisterDetailsApi();
    }
  };

  const images = [
    "https://res.cloudinary.com/mayushmaan/image/upload/v1759343206/Login_Image_01_zkzpw4.png",
    "https://res.cloudinary.com/mayushmaan/image/upload/v1759343681/Login_Image_02_akp8xw.png",
    "https://res.cloudinary.com/mayushmaan/image/upload/v1759343680/Login_Image_03_i6yjo6.png",
    "https://res.cloudinary.com/mayushmaan/image/upload/v1759343659/Login_Image_04_bbbjsq.png",
    "https://res.cloudinary.com/mayushmaan/image/upload/v1759343667/Login_Image_05_encbr5.png",
    "https://res.cloudinary.com/mayushmaan/image/upload/v1759343663/Login_Image_06_kebrkx.png",
    "https://res.cloudinary.com/mayushmaan/image/upload/v1759343666/Login_Image_07_ympvsw.png",
    "https://res.cloudinary.com/mayushmaan/image/upload/v1759343681/Login_Image_08_uvnk5m.png",
    "https://res.cloudinary.com/mayushmaan/image/upload/v1759343671/Login_Image_09_qyunla.png",
    "https://res.cloudinary.com/mayushmaan/image/upload/v1759343680/Login_Image_10_gz6lbi.png",
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

  return (
    <div className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden">
      {/* Mobile Banner */}
      <div className="block lg:hidden w-full min-h-[60px] max-h-[17vh] top-0 left-0 z-10 overflow-hidden">
        <img
          src="./valorantda.svg"
          alt="Banner"
          className="w-full h-full relative -translate-y-7"
        />
      </div>

      {/* Left Panel - Registration Form */}
      <div className="w-full lg:w-1/2 h-full bg-white flex flex-col pt-4 lg:pt-6 pb-4 px-4 lg:px-6 gap-3 lg:gap-5 overflow-y-auto no-scrollbar">
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
              <div className="w-full h-full transition-all duration-300 ease-in font-arialrounded text-base lg:text-base leading-none tracking-wider text-black font-normal flex items-center justify-center rounded-full px-3 lg:px-6 gap-1 bg-white">
                <button
                  onClick={() => navigate("/")}
                  className="w-full h-full rounded-full lg:text-[16px] text-[12px]"
                >
                  Login
                </button>
              </div>
              <div className="w-full h-full font-arialrounded text-base lg:text-base leading-none tracking-wider text-white font-normal flex items-center justify-center rounded-full px-3 lg:px-6 gap-1 bg-black">
                <button
                  onClick={() => setIsLogin(false)}
                  className="w-full h-full rounded-full lg:text-[16px] text-[12px]"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="w-full flex-1 flex flex-col flex-grow mt-2">
          <div className="flex flex-col items-center mb-3 lg:mb-4">
            <div className="flex w-full items-center justify-between mb-2">
              <img
                className="w-9 h-9 lg:w-12 lg:h-12 p-2 cursor-pointer"
                src="./Vector.svg"
                alt="Back"
                onClick={() => navigate(-1)}
              />
              <h2 className="lg:text-[32px] text-[20px] font-arialrounded text-center">
                The Origin Scroll
              </h2>
              <img
                className="w-[28px] h-[24.6px] lg:w-[48px] lg:h-[42.17px]"
                src="./Echo Elites.svg"
                alt=""
              />
            </div>
            <p className="text-center text-[#999999] font-arialrounded text-[10px] lg:text-base">
              "Every champion begins with an identity. Reveal yours to claim
              your place in the Legends of Valor. Validate your persona to
              showcase your skills in the competitive gaming world."
            </p>
          </div>

          <form
            className={`flex flex-col gap-2 lg:gap-1 flex-1 pt-4 lg:justify-center space-y-${dynamicSpacing}`}
            onSubmit={handleSubmit}
          >
            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPasswordLocal(e.target.value)}
                className={`peer w-full h-12 px-4 pt-5 pb-2 rounded-md outline-none ${errors.password
                  ? "bg-red-100 text-red-700 border border-red-500"
                  : "bg-[#F2F2F2] text-black"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className={`absolute font-arialrounded font-normal left-4 transition-all duration-200 ${password ? "top-1 text-xs" : "top-3 text-sm lg:text-base"
                  } peer-focus:top-1 peer-focus:text-xs ${errors.password ? "text-red-500" : "text-[#737373]"
                  }`}
              >
                New Password
              </label>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 pl-4">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="text-sm flex flex-col gap-1">
              <div
                className={`flex gap-2 items-center ${isMinLength ? "text-green-600" : "text-red-500"
                  }`}
              >
                <img
                  className="w-3 h-3 lg:w-4 lg:h-3"
                  src={isMinLength ? "./greenVector.svg" : "./redVector.svg"}
                  alt=""
                />
                <span className="font-arial text-xs lg:text-base">
                  Password is at least 8 characters long
                </span>
              </div>

              <div
                className={`flex gap-2 items-center ${isStrongEnough ? "text-green-600" : "text-black"
                  }`}
              >
                <img
                  className="w-3 h-3 lg:w-4 lg:h-3"
                  src={isStrongEnough ? "./greenVector.svg" : "./blackVector.svg"}
                  alt=""
                />
                <span className="font-arial text-xs lg:text-base">
                  Must be okay strength or better
                </span>
              </div>

              <div
                className={`flex gap-2 items-center ${typesMatched >= 2 ? "text-green-600" : "text-gray-500"
                  }`}
              >
                <img
                  className="w-3 h-3 lg:w-4 lg:h-3"
                  src={typesMatched >= 2 ? "./greenVector.svg" : "./grayVector.svg"}
                  alt=""
                />
                <span className="font-arial text-xs lg:text-base">
                  Password includes two of the following: letters, number or
                  symbol
                </span>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`peer w-full h-12 px-4 pt-5 pb-2 rounded-md outline-none ${errors.confirmPassword
                  ? "bg-red-100 text-red-700 border border-red-500"
                  : "bg-[#F2F2F2] text-black"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute font-arialrounded font-normal left-4 transition-all duration-200 ${confirmPassword ? "top-1 text-xs" : "top-3 text-sm lg:text-base"
                  } peer-focus:top-1 peer-focus:text-xs ${errors.confirmPassword ? "text-red-500" : "text-[#737373]"
                  }`}
              >
                Confirm Password
              </label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 pl-4">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Save Button */}
            <div className="mt-auto pb-3">
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-white border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 ease-in py-2 rounded-md lg:rounded-xl font-arialrounded font-normal text-sm lg:text-lg w-full"
              >
                {isLoading ? <Loader /> : "Save Your Password"}
              </button>
            </div>
          </form>

          {/* Supported Games Section */}
          <div className="mt-2 lg:mt-2 space-y-2 lg:space-y-1">
            <div className="w-full flex items-center justify-center">
              <span className="font-sans font-semibold text-xs lg:text-lg tracking-wider text-black">
                Tournament Supported Games
              </span>
            </div>
            <div className="flex justify-between">
              <img src="./PUBG.svg" alt="PUBG" className="w-10 h-10 lg:w-20 lg:h-20" />
              <img src="./Vector 2.svg" alt="Game" className="w-10 h-10 lg:w-20 lg:h-20" />
              <img
                src="./Valorant3.svg"
                alt="Valorant"
                className="w-10 h-10 lg:w-20 lg:h-20"
              />
              <img
                src="./Clash Of Clans.svg"
                alt="Clash of Clans"
                className="w-10 h-10 lg:w-20 lg:h-20"
              />
              <img
                src="./Call of duty mobile.svg"
                alt="Call of Duty Mobile"
                className="w-10 h-10 lg:w-20 lg:h-20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Character Art (Desktop only) */}
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
