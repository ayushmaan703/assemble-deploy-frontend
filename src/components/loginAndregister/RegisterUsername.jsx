import React, { useState, useEffect } from "react";
import logo from "../../assets/ASSEMBLE LOGO SECONDARY 1.svg";
import { useNavigate } from "react-router-dom";
import useViewportHeight from "../../hooks/useViewportHeight";
import { useDispatch } from "react-redux";
import { duplicateUsername, setUsername } from "../../redux/features/auth_slices/RegisterSlice";
import toast from "react-hot-toast";

export default function RegisterUsername() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false); // default to Register
  const [username, setUsernameLocal] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const viewportHeight = useViewportHeight();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // dynamic spacing (mapped)
  const spacingMap = {
    2: "space-y-2",
    4: "space-y-4",
    6: "space-y-6",
    8: "space-y-8",
  };
  const getDynamicSpacing = (height) => {
    if (height < 600) return 2;
    if (height < 800) return 4;
    if (height < 1000) return 6;
    return 8;
  };

  const dynamicSpacing = getDynamicSpacing(viewportHeight);

  // submit handler with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrors({ username: "Username is required" });
      return;
    }
    setErrors({});
    const res = await dispatch(duplicateUsername(username.trim()))
    if (res.payload) {
      toast.error("Username already exists.")
    } else {
      navigate("/PasswordSetup");
      dispatch(setUsername(username));
    }
  };

  // carousel images
  const images = [
    "/Login Image 01.png",
    "/Login Image 02.png",
    "/Login Image 03.png",
    "/Login Image 04.png",
    "/Login Image 05.png",
    "/Login Image 06.png",
    "/Login Image 07.png",
    "/Login Image 08.png",
    "/Login Image 09.png",
    "/Login Image 10.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      const fadeTimeout = setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          (prevIndex === (images.length) - 1 ? 0 : prevIndex + 1)
        );
        setFade(true);
      }, 100);
      return () => {
        clearTimeout(fadeTimeout);
        clearInterval(interval);
      };
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length, currentIndex]);

  return (
    <div className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden">
      {/* Mobile Banner */}
      <div className="block lg:hidden w-full min-h-[60px] max-h-[17vh]  top-0 left-0 z-10 overflow-hidden">
        <img
          src="./valorantda.svg"
          alt="Banner"
          className="w-full h-full relative -translate-y-7"
        />
      </div>

      {/* Left Panel - Registration Form */}
      <div className="w-full lg:w-1/2 h-full bg-white flex flex-col pt-4 lg:pt-6 pb-4 px-4 lg:px-6 gap-3 lg:gap-5">
        {/* Header */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-3 lg:mb-5 w-full h-auto">
            {/* Logo */}
            <img
              src={logo}
              alt="Logo"
              className="h-10 lg:h-12 w-10 lg:w-12 object-contain"
            />

            {/* Text */}
            <span className="text-xl lg:text-3xl font-bebas text-BrandColor">
              ASSEMBLE
            </span>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center w-full h-10 lg:h-12">
            <div className="flex rounded-full py-1 px-2 gap-2 w-full h-full bg-[#F2F2F2]">
              <div className="w-full h-full transition-all duration-300 ease-in font-arialrounded leading-none tracking-wider text-black font-normal flex items-center justify-center rounded-full px-3 lg:px-6 gap-1 bg-white">
                <button
                  onClick={() => navigate("/")}
                  className={`w-full h-full rounded-full transition-colors lg:text-[16px] text-[12px] ${isLogin ? "bg-white text-black" : "bg-white text-black"
                    }`}
                >
                  Login
                </button>
              </div>

              <div className="w-full h-full font-arialrounded leading-none tracking-wider text-white font-normal flex items-center justify-center rounded-full px-3 lg:px-6 gap-1 bg-black">
                <button
                  onClick={() => setIsLogin(false)}
                  className={`w-full h-full rounded-full transition-colors lg:text-[16px] text-[12px] ${!isLogin ? "bg-black text-white" : "bg-black text-white"
                    }`}
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
            {/* Back + Title */}
            <div className="flex w-full items-center justify-start mb-4">
              <img
                className="w-9 h-9 lg:w-12 lg:h-12 p-2 transition-all duration-300 ease-out cursor-pointer"
                src="./Vector.svg"
                alt="Back"
                onClick={() => navigate(-1)}
              />
              <h2 className="lg:text-[32px] text-[20px]  text-center w-full font-arialrounded">
                The Origin Scroll
              </h2>

            </div>

            {/* Logo */}
            <img
              className="w-[55px] h-[48
              22px] lg:w-[120px] lg:h-[108px] pb-2"
              src="./Echo Elites.svg"
              alt=""
            />

            <p className="text-center text-[#999999] font-arialrounded text-[10px] lg:text-base mb-3">
              "Every hero begins with a name. Reveal yours and claim your place
              in the Assemble saga". Confirm your identity to showcase your
              gaming skills in esports world.
            </p>
          </div>

          {/* Form */}
          <form
            className={`mt-12 lg:mt-6 flex flex-col gap-4 flex-1 pt-4 lg:justify-center ${spacingMap[dynamicSpacing]}`}
            onSubmit={handleSubmit}
          >
            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsernameLocal(e.target.value)}
                className={`peer font-arialrounded font-normal text-base w-full h-12 px-4 pt-5 pb-2 rounded-[4px] lg:rounded-[8px] outline-none ${errors.username
                  ? "bg-red-100 text-red-700 border border-red-500"
                  : "bg-[#F2F2F2] text-black"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="username"
                className={`absolute font-arialrounded text-sm left-4 transition-all duration-200 ${username ? "top-1 text-[10px] lg:text-xs" : "top-3 text-[12px] lg:text-[16px]"
                  } peer-focus:top-1 peer-focus:text-xs ${errors.username ? "text-red-500" : "text-[#737373]"
                  }`}
              >
                Username
              </label>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 pl-4">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Continue Button */}
            <div className="mt-auto pb-6 mb-12">
              <button
                type="submit"
                className="bg-white border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 ease-in py-2 lg:rounded-xl rounded font-arialrounded font-normal text-[12px] lg:text-[20px] w-full"
              >
                Set-up Password
              </button>
            </div>
          </form>

          {/* Supported Games Section */}
          <div className=" lg:mt-0 space-y-2 lg:space-y-3 mt-12">
            <div className="w-full flex items-center justify-center">
              <span className="font-sans font-semibold text-[10px] lg:text-[20px] tracking-wider text-black">
                Tournament Supported Games
              </span>
            </div>
            <div className="flex justify-between">
              <img
                src="./PUBG.svg"
                alt="PUBG"
                className="w-10 h-10 lg:w-20 lg:h-20"
              />
              <img
                src="./Vector 2.svg"
                alt="Game"
                className="w-10 h-10 lg:w-20 lg:h-20"
              />
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
            className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${fade ? "opacity-100" : "opacity-0"
              }`}
          />
        </div>
      </div>
    </div>
  );
}
