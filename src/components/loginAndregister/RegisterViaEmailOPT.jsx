import React, { useState, useEffect } from "react";
import logo from "../../assets/ASSEMBLE LOGO SECONDARY 1.svg";
import { useNavigate } from "react-router-dom";
import useViewportHeight from "../../hooks/useViewportHeight";
import { useSelector, useDispatch } from "react-redux";
import { verifyOtp, setOtp, sendEmail } from "../../redux/features/auth_slices/RegisterSlice";
import toast from "react-hot-toast";
import Loader from "../Loader";

export default function RegisterViaEmailOTP() {
  const emailId = useSelector((state) => state.register.email);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const viewportHeight = useViewportHeight();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [timer, setTimer] = useState(15); // ✅ Resend OTP timer
  const isLoading = useSelector((state) => state.register.loading);
  const getDynamicSpacing = (height) => {
    if (height < 600) return 8;
    if (height < 800) return 16;
    if (height < 1000) return 24;
    return 32;
  };

  const dynamicSpacing = getDynamicSpacing(viewportHeight);

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

  // Background image slider
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

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);
  const email = useSelector((state) => state.register.email)
  const handleSubmitemail = async () => {
    await dispatch(sendEmail(email));
  };

  const handleSubmitemailotp = () => {
    const otpString = otpValues.join("");

    if (otpString.length < 6) {
      return toast.error("Please enter the complete OTP");
    }
    dispatch(setOtp(otpString));

    dispatch(verifyOtp({ email: emailId, otp: otpString }))
      .unwrap()
      .then(() => {
        navigate("/RegisterUsername");
      })
      .catch((err) => {
        toast.error("Invalid OTP. Please try again.");
      });
  };

  return (
    <div className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden">
      {/* Mobile Banner */}
      <div className="lg:hidden w-full min-h-[60px] max-h-[17vh] top-0 left-0 z-10 overflow-hidden flex items-center justify-center">
        <img
          src="/Login Image 03.png"
          alt="Banner"
          className="w-full h-full object-contain relative translate-y-32"
        />
      </div>

      {/* Left Panel */}
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
              <div className="w-full h-full flex items-center justify-center rounded-full bg-white">
                <button
                  onClick={() => navigate("/")}
                  className="w-full h-full rounded-full text-[12px] lg:text-[16px]"
                >
                  Login
                </button>
              </div>
              <div className="w-full h-full flex items-center justify-center rounded-full bg-black">
                <button
                  onClick={() => setIsLogin(false)}
                  className="w-full h-full rounded-full text-[12px] lg:text-[16px] text-white"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="w-full flex-1 flex flex-col">
          <div className="flex flex-col items-center mb-3 lg:mb-4">
            <div className="flex w-full items-center justify-between mb-4">
              <img
                className="w-9 h-9 lg:w-12 lg:h-12 p-2 cursor-pointer"
                src="/Vector.svg"
                alt="Back"
                onClick={() => navigate("/RegisterViaEmail")}
              />
              <h2 className="lg:text-[32px] text-[20px] font-arialrounded text-center">
                Email Verification
              </h2>
              <img
                className="w-9 h-9 lg:w-12 lg:h-12"
                src="/Echo Elites.svg"
                alt=""
              />
            </div>
            <p className="text-center text-[#999999] text-[10px] lg:text-base font-arialrounded">
              Please verify your email address using the one-time password (OTP)
              provided.
            </p>
          </div>

          {/* OTP Section */}
          <div
            className="flex flex-col flex-1 pt-6 lg:justify-center"
            style={{ gap: dynamicSpacing }}
          >
            <div className="flex flex-wrap items-center gap-2 text-left">
              <span className="text-sm text-black uppercase">
                Enter OTP for
              </span>
              <span className="text-xs text-[#737373]">{emailId}</span>
              <button
                className="text-xs font-semibold text-[#737373] uppercase hover:text-gray-700"
                onClick={() => navigate("/RegisterViaEmail")}
              >
                change email id
              </button>
            </div>

            {/* OTP Inputs */}
            <div className="w-full flex justify-between gap-2 lg:gap-3 mt-3">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="relative flex-1 max-w-[32px] lg:max-w-[72px]"
                >
                  <input
                    type="text"
                    maxLength="1"
                    value={otpValues[index]}
                    className="w-full aspect-square px-1 py-2 lg:px-5 bg-[#F2F2F2] text-lg lg:text-3xl text-center text-black uppercase"
                    onChange={(e) => {
                      const newOtpValues = [...otpValues];
                      newOtpValues[index] = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      ); // ✅ only numbers
                      setOtpValues(newOtpValues);

                      if (e.target.value && index < 5) {
                        const nextInput = document.getElementById(
                          `otp-input-${index + 1}`
                        );
                        if (nextInput) nextInput.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        !e.target.value &&
                        index > 0
                      ) {
                        const prevInput = document.getElementById(
                          `otp-input-${index - 1}`
                        );
                        if (prevInput) prevInput.focus();
                      }
                    }}
                    id={`otp-input-${index}`}
                  />
                  {!otpValues[index] && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-2xl lg:text-3xl text-black">_</span>
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

            {/* Continue Button */}
            <div className="mt-auto pb-6">
              <button
                onClick={handleSubmitemailotp}
                className="bg-[#4D4D4D] text-white hover:bg-black py-2 lg:rounded-xl rounded text-[12px] lg:text-[20px] w-full"
              >
                {isLoading ? <Loader white /> : "Start Adding Your Details"
                }
              </button>
            </div>
          </div>

          {/* Alternative Options */}
          <div className="mt-3 lg:mt-4 space-y-2 lg:space-y-3">
            <div className="w-full h-10 lg:h-12 flex items-center justify-center bg-white border-2 border-[#1A1A1A] lg:rounded-xl rounded">
              <button
                className="text-[#737373] text-[12px] lg:text-[16px]"
                onClick={() => navigate("/RegisterViaPhone")}
              >
                Register With Phone Number
              </button>
            </div>

            {/* <button className="w-full h-10 lg:h-12 flex items-center justify-center bg-white border-2 border-[#1A1A1A] lg:rounded-xl rounded">
              <img
                src="/icons_google.svg"
                alt="Google Icon"
                className="w-4 lg:w-5 h-4 lg:h-5"
              />
              <span className="ml-2 text-[12px] lg:text-[16px] text-black">
                Register With Google
              </span>
            </button> */}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:block lg:w-1/2 h-full bg-gray-800 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`Character ${currentIndex + 1}`}
            className={`w-full h-auto object-contain transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"
              }`}
          />
        </div>
      </div>
    </div>
  );
}
