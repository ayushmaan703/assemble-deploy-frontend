import React, { useState, useEffect } from "react";
import logo from "../../assets/ASSEMBLE LOGO SECONDARY 1.svg";
import { useNavigate, useLocation } from "react-router-dom";
import useViewportHeight from "../../hooks/useViewportHeight";

export default function ProfilePicture() {
  const [isLogin, setIsLogin] = useState(true);
  const [keepSecure, setKeepSecure] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();
  const viewportHeight = useViewportHeight();
  const location = useLocation();
  const email = location.state?.email || "";
  const username = location.state?.username || "";

  const getDynamicSpacing = (height) => {
    if (height < 600) return 2; // `space-y-2`
    if (height < 800) return 4; // `space-y-4`
    if (height < 1000) return 6; // `space-y-6`
    return 8; // `space-y-8`
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
      <div
        className="w-full lg:w-1/2 h-full bg-white flex flex-col 
        pt-4 lg:pt-6 pb-4 px-4 lg:px-6 gap-3 lg:gap-5 
        overflow-y-auto no-scrollbar"
      >
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
        <div className="w-full flex-1 flex flex-col mt-2">
          <div className="flex flex-col items-center mb-3 lg:mb-4">
            <div className="flex w-full items-center justify-between mb-4">
              <img
                className="w-9 h-9 lg:w-12 lg:h-12 p-2 transition-all duration-300 ease-out cursor-pointer"
                src="./Vector.svg"
                alt="Back"
                onClick={() => navigate("/PasswordSetup")}
              />
              <h2 className="lg:text-[32px] text-[20px] font-normal font-arialrounded text-center">
                The Origin Scroll
              </h2>
              <img
                className="w-[28px] h-[24.6px] lg:w-[48px] lg:h-[42.17px]"
                src="./Echo Elites.svg"
                alt=""
              />
            </div>
            <p className="text-center text-[#999999] font-normal font-arialrounded text-[10px] lg:text-base">
              "Every champion begins with an identity. Reveal yours to claim
              your place in the Legends of Valor. Validate your persona to
              showcase your skills in the competitive gaming world by uploading
              your profile picture."
            </p>
          </div>

          <div
            className={`flex flex-col gap-4 lg:gap-4 flex-1 pt-6 lg:justify-center space-y-${dynamicSpacing}`}
          >
            {/* Profile Picture Upload */}
            <div className="flex justify-center items-center">
              <img
                className="w-[125px] h-[125px] lg:w-44 lg:h-44 rounded-full object-cover border-2 border-gray-300"
                src="./ProfileSetPicture.svg"
                alt="Profile"
              />
            </div>

            {/* Buttons */}
            <div className="mt-auto pb-6 flex flex-col gap-4">
              <div className="flex flex-row gap-4 w-full">
                <button
                  onClick={() =>
                    navigate("/PasswordSetup", { state: { email, username } })
                  }
                  className="bg-white border-2 border-black text-black hover:bg-gray-100 transition-all duration-300 ease-out h-10 lg:h-auto lg:py-2 rounded-xl font-arialrounded font-normal text-[12px] lg:text-[20px] w-full"
                >
                  Change Image
                </button>
                <button
                  onClick={() => navigate("/PasswordSetup")}
                  className="bg-[#4D4D4D] text-white hover:bg-black transition-all duration-300 ease-in h-10 lg:h-auto lg:py-2 rounded-xl font-arialrounded font-normal text-[12px] lg:text-[20px] w-full group-hover:animate-trumble"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Supported Games Section */}
          <div className="mt-3 lg:mt-0 space-y-2 lg:space-y-3 ">
            <div className="w-full flex items-center justify-center">
              <span className="font-sans font-semibold text-[10px] lg:text-[20px] leading-none tracking-wider text-black">
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
