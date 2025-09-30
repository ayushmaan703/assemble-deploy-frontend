import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/ASSEMBLE LOGO SECONDARY 1.svg";
import { useNavigate } from "react-router-dom";
import useViewportHeight from "../../hooks/useViewportHeight";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, sendEmail } from "../../redux/features/auth_slices/RegisterSlice";
import { useGoogleLogin } from '@react-oauth/google';
import { googleLogin } from "../../redux/features/auth_slices/AuthSlice";
import Loader from "../Loader";
import { setEmailId } from "../../redux/features/auth_slices/emailIdSlice";
import toast from "react-hot-toast";

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

export default function RegisterViaEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewportHeight = useViewportHeight();
  const emailRef = useRef(null);

  // const [isLogin, setIsLogin] = useState(true);
  const [email, setEmailLocal] = useState("");
  const [keepSecure, setKeepSecure] = useState(false);
  const [errors, setErrors] = useState({ email: "" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const isLoading = useSelector((state) => state.auth.loading) || useSelector((state) => state.register.loading);

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
  });

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      try {
        const res = await dispatch(googleLogin(response.code))
        if (res.type === "googleLogin/fulfilled") {
          const res1 = dispatch(setEmailId(res.payload.email));
          if (res1.type === "email/setEmailId") {
            navigate("/RegisterUsername");
          }
        }
      } catch (err) {
        console.error("Google login failed:", err);
      }
    },
    onError: (err) => console.error("Google login error:", err),
  });

  const getDynamicSpacing = (height) => {
    if (height < 600) return 2;
    if (height < 800) return 4;
    if (height < 1000) return 6;
    return 8;
  };

  const dynamicSpacing = getDynamicSpacing(viewportHeight);

  const spacingClass = {
    2: 'space-y-2',
    4: 'space-y-4',
    6: 'space-y-6',
    8: 'space-y-8',
  }[dynamicSpacing] || 'space-y-4';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }
    setErrors({});
    handleSubmitemail();
  };

  const handleSubmitemail = async () => {
    try {
      dispatch(setEmail(email));
      const result = await dispatch(sendEmail(email));

      if (sendEmail.fulfilled.match(result)) {
        navigate("/RegisterViaEmailOTP");
      } else {
        // console.error("Send email failed:", result.payload);
      }
    } catch (error) {
      // console.error("Error while sending email:", error);
    }
  };


  return (
    <div className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden">
      {/* Mobile Banner - Fixed positioning */}
      <div className="block lg:hidden w-full h-[15vh] min-h-[100px] overflow-hidden bg-gray-800">
        <img
          src='./Login Image 03.png'
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-1/2 h-full bg-white flex flex-col p-4 lg:p-6 gap-3 lg:gap-5 overflow-y-auto">
        {/* Header */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-3 lg:mb-5 w-full">
            <img
              src={logo}
              alt="Logo"
              className="h-10 lg:h-12 w-auto object-contain"
            />
            <span className="text-xl lg:text-3xl font-bebas text-BrandColor">
              ASSEMBLE
            </span>
          </div>

          {/* Tab Navigation - Fixed for responsiveness */}
          <div className="flex justify-center w-full h-10 lg:h-12">
            <div className="flex rounded-full p-1 w-full h-full bg-[#F2F2F2]">
              <button
                onClick={() => navigate("/")}
                className="w-1/2 h-full rounded-full text-[12px] lg:text-[16px] transition-colors bg-white text-black hover:bg-gray-300"
              >
                Login
              </button>
              <button
                className="w-1/2 h-full rounded-full text-[12px] lg:text-[16px] transition-colors bg-black text-white"
              >
                Register
              </button>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="w-full flex-1 flex flex-col">
          <div className="mb-3 lg:mb-4">
            <h2 className="lg:text-[32px] text-[20px] font-arialrounded text-center">
              Register
            </h2>
            <p className="text-center text-[#999999] mt-4 font-normal font-arialrounded text-[10px] lg:text-base px-2">
              Welcome, Newcomer! We're excited to have you join us on this
              thrilling esports journey. Together, we can build a legacy that
              everyone in the community will remember. Just enter your email
              below to begin your adventure!
            </p>
          </div>

          <form
            className={`flex flex-col flex-1 pt-2 lg:pt-6 lg:justify-center ${spacingClass}`}
            onSubmit={handleSubmit}
          >
            {/* Email Input - Fixed */}
            <div className="relative">
              <input
                ref={emailRef}
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmailLocal(e.target.value);
                  if (errors.email) setErrors({ email: "" });
                }}
                className={`peer w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded outline-none ${errors.email
                  ? "bg-red-100 text-red-700"
                  : "bg-[#F2F2F2] text-black"
                  }`}
                placeholder=" "
                onFocus={() => {
                  if (errors.email) setErrors({ email: "" });
                }}
              />
              <label
                htmlFor="email"
                className={`absolute left-3 lg:left-4 transition-all duration-200 pointer-events-none ${email || document.activeElement === emailRef.current
                  ? "top-1 text-[10px] font-arialrounded"
                  : "top-2 lg:top-3 text-[12px] lg:text-[16px] font-arialrounded"
                  } peer-focus:top-1 peer-focus:text-[10px] ${errors.email ? "text-red-500" : "text-[#737373]"
                  }`}
              >
                Email ID
              </label>
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-0.5 pl-3 lg:pl-4">{errors.email}</p>
              )}
            </div>

            {/* Checkbox - Fixed sizing */}
            <div className="flex items-center gap-2 lg:gap-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="keepSecure"
                  checked={keepSecure}
                  onChange={(e) => setKeepSecure(e.target.checked)}
                  className="peer hidden"
                />
                <div className="w-4 h-4 lg:w-6 lg:h-6 border-2 border-black rounded flex items-center justify-center peer-checked:bg-black">
                  <svg
                    className={`w-3 h-3 ${keepSecure ? "text-white" : "text-transparent"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </label>
              <label
                htmlFor="keepSecure"
                className="font-sans font-semibold text-[10px] lg:text-sm leading-none text-black cursor-pointer"
              >
                Kindly Ensure That You Keep Your Login Credentials Secure.
              </label>
            </div>

            {/* Register Button */}
            <div className="mt-auto pb-4">
              <button
                type="submit"
                className="bg-white border-2 border-[#000000] text-[#000000] hover:bg-black hover:text-white transition-all duration-300 ease-in py-2 rounded font-arialrounded font-normal text-[12px] lg:text-[16px] w-full"
              >
                {isLoading ? <Loader white /> :
                  "Start Your Esports Career"
                }
              </button>
            </div>
          </form>

          {/* Alternative Options */}
          <div className="mt-3 lg:mt-4 space-y-2 lg:space-y-3">
            <div
              className="w-full h-10 lg:h-12 flex items-center rounded px-3 lg:px-4 gap-1 font-arialrounded font-normal text-xs lg:text-sm justify-center text-[#737373] bg-white border-2 border-[#737373] cursor-pointer"
              onClick={() => (
                // navigate('/LoginViaPhone')
                toast.error("Option Currently Unavailable")
              )}
            >
              <span className="text-[12px] lg:text-[14px]">
                Register With Phone Number
              </span>
            </div>

            {/* <button
              onClick={() => login()}
              className="group w-full h-10 lg:h-12 flex items-center justify-center bg-white hover:bg-blue-50 border-2 border-[#1A1A1A] rounded px-3 lg:px-4 gap-1">
              {isLoading ? <Loader color="black" /> :
                <>
                  <img
                    src="/icons_google.svg"
                    alt="Google Icon"
                    className="w-4 lg:w-5 h-4 lg:h-5 group-hover:animate-trumble"
                  />
                  <span className="font-arialrounded font-normal text-[12px] lg:text-[14px] leading-none tracking-wider text-black group-hover:animate-trumble">
                    Register With Google
                  </span>
                </>}
            </button> */}
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