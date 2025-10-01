import React, { useState, useEffect } from "react";
import logo from "../../assets/ASSEMBLE LOGO SECONDARY 1.svg";
import { Link, useNavigate } from "react-router-dom";
import useViewportHeight from "../../hooks/useViewportHeight";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../redux/features/auth_slices/AuthSlice";
import { sendEmail } from "../../redux/features/auth_slices/RegisterSlice";

export default function LoginViaEmailOTP() {
  const [isLogin, setIsLogin] = useState(true);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const otpString = otpValues.join("");
  const navigate = useNavigate();
  const viewportHeight = useViewportHeight();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const emailId = useSelector((state) => state.email.emailId);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(15);
  const getDynamicSpacing = (height) => {
    if (height < 600) return 2; // `space-y-2` (small screens)
    if (height < 800) return 4; // `space-y-4` (medium screens)
    if (height < 1000) return 6; // `space-y-6` (large screens)
    return 8; // `space-y-8` (extra-large screens)
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
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);
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
  const handleSubmitemail = async () => {
    await dispatch(sendEmail(emailId));
  };
  const url = import.meta.env.VITE_URL;
  const handleApiCall = async (e) => {

    e.preventDefault();
    try {
      const response = await dispatch(verifyOtp({ email: emailId, otp: otpString }));
      if (response.type === "verifyOtp/fulfilled") {
        navigate("/homepage");
      }
    } catch (error) {
      // console.error("Error during API call:", error);
    }
  };
  return (
    <div className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden">
      {/* Mobile Banner */}
      <div className=" lg:hidden w-full min-h-[60px] max-h-[17vh]  top-0 left-0 z-10 overflow-hidden flex items-center justify-center">
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
              We will send you a sign-in code through your registered email
              address {emailId}. Begin your journey promptly
              with a swift login.
            </p>
          </div>

          <div
            className={`flex flex-col gap-4 lg:gap-4 flex-1 pt-6 lg:justify-center space-y-${dynamicSpacing}`}
          >
            {/* OTP Section */}
            <div className="flex flex-col w-full gap-2 lg:gap-4">
              <div className="flex flex-wrap items-center gap-1 lg:gap-2 text-left">
                <span className="font-arialrounded font-normal text-[14px] lg:text-[18px] leading-none tracking-wider text-black uppercase">
                  Enter sign in code for
                </span>
                <span className="font-arialrounded font-normal text-sm leading-none tracking-wider text-[#737373] lg:text-[14px] text-[12px]">
                  {emailId}
                </span>
                <button
                  className="transition-all duration-300 ease-out font-sans font-semibold  leading-none tracking-wider text-[#737373] uppercase hover:text-gray-700 lg:text-[12px] text-[10px]"
                  onClick={() => navigate("/LoginViaEmail")}
                >
                  change email id
                </button>
              </div>

              {/* OTP Input Boxes */}
              <div className="w-full flex justify-between gap-2 lg:gap-3 mt-3 lg:mt-0">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="relative flex-1 max-w-[32px] lg:max-w-[72px]"
                  >
                    <input
                      type="text"
                      maxLength="1"
                      value={otpValues[index]}
                      className="w-full aspect-square px-1 py-2 lg:px-5 bg-[#F2F2F2] font-arialrounded font-normal text-lg lg:text-3xl leading-none tracking-wider text-center text-black uppercase"
                      onChange={(e) => {
                        const newOtpValues = [...otpValues];
                        newOtpValues[index] = e.target.value;
                        setOtpValues(newOtpValues);

                        // Auto-focus next input
                        if (e.target.value && index < 5) {
                          const nextInput = document.getElementById(
                            `otp-input-${index + 1}`
                          );
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        // Handle backspace
                        if (e.key === "Backspace" && !e.target.value && index > 0) {
                          const prevInput = document.getElementById(
                            `otp-input-${index - 1}`
                          );
                          if (prevInput) prevInput.focus();
                        }
                      }}
                      id={`otp-input-${index}`}
                    />
                    {/* Placeholder underscore */}
                    {!otpValues[index] && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-[12px] lg:text-[28px] text-black font-arialrounded">
                          _
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Resend Timer */}
              <div className="text-center">
                {timer > 0 ? (
                  <span className="text-sm lg:text-base text-[#0D0D0D]">
                    Resend OTP in 00:{timer < 10 ? `0${timer}` : timer}
                  </span>
                ) : (
                  <button
                    onClick={() => (setTimer(15), handleSubmitemail())}
                    className="text-sm lg:text-base text-[#FD520F] font-semibold"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>

            {/* Login Button */}
            <div className="mt-auto pb-6">
              <button
                onClick={(e) => {
                  handleApiCall(e);
                }}
                className="bg-[#4D4D4D] text-white hover:bg-black hover:text-white transition-all duration-300 ease-in py-2 lg:rounded-xl rounded font-arialrounded font-normal text-[12px] lg:text-[20px] w-full"
              >
                Re-Begin Your Journey
              </button>
            </div>
          </div>

          {/* Alternative Options */}
          <div className="mt-3 lg:mt-4 space-y-2 lg:space-y-3">
            <div className="flex flex-row justify-between text-xs lg:text-sm">
              <span
                className="h-6 lg:h-8 transition-all duration-300 ease-in font-arialrounded font-normal text-[12px] lg:text-[20px] leading-none tracking-wider text-[#BFBFBF] cursor-pointer"
              // onClick={() => navigate("/LoginViaEmail")}
              >
                Login Via Sign In Code
              </span>
              <Link to="/forgotpasswordviaphone"><span className="h-6 lg:h-8 transition-all duration-300 ease-in font-arialrounded font-normal text-[12px] lg:text-[20px] leading-none tracking-wider text-black hover:text-gray-500 cursor-pointer">
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
