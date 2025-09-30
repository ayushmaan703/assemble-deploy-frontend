import React, { useState } from 'react';
import logo from '../../assets/ASSEMBLE LOGO SECONDARY 1.svg';
import { useNavigate } from 'react-router-dom';
import useViewportHeight from '../../hooks/useViewportHeight';
import { useLocation } from 'react-router-dom';


export default function OrganizerRegisterViaEmailOTP() {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const viewportHeight = useViewportHeight();

  const getDynamicSpacing = (height) => {
    if (height < 600) return 2;
    if (height < 800) return 2;
    if (height < 1000) return 6;
    return 8;
  };

  const getDynamicPadding = (height) => {
    if (height < 600) return 'p-2';
    if (height < 800) return 'p-4';
    if (height < 1000) return 'p-6';
    return 'p-8';
  };

  const getDynamicGap = (height) => {
    if (height < 600) return 'gap-2';
    if (height < 800) return 'gap-4';
    if (height < 1000) return 'gap-6';
    return 'gap-8';
  };

  const getDynamicMargin = (height) => {
    if (height < 600) return 'mb-2';
    if (height < 800) return 'mb-4';
    if (height < 1000) return 'mb-6';
    return 'mb-8';
  };

  const dynamicSpacing = getDynamicSpacing(viewportHeight);
  const dynamicPadding = getDynamicPadding(viewportHeight);
  const dynamicGap = getDynamicGap(viewportHeight);
  const dynamicMargin = getDynamicMargin(viewportHeight);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle OTP verification logic here
  };

  return (
    <div className="w-full min-h-screen h-auto flex flex-col lg:flex-row">
      {/* Left Panel - Hero Section */}
      <div className={`flex flex-col w-full lg:w-1/2 h-full min-h-screen relative ${dynamicGap} pt-4 lg:pt-8`}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="./rectangle.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between">
          {/* Header */}
          <div className={`flex items-center justify-between w-full h-12 lg:h-14 px-6 lg:px-12 ${dynamicMargin}`}>
            <img src={logo} alt="Logo" className="h-10 lg:h-14 w-10 lg:w-14 object-contain" />
            <span className="text-3xl lg:text-4xl font-bebas text-BrandColor">ASSEMBLE</span>
          </div>

          {/* Hero Text */}
          <div className={`flex flex-col w-full h-auto px-6 lg:px-12 pt-6 lg:pt-12 ${dynamicGap}`}>
            <div className="flex flex-col lg:flex-row w-full max-w-full gap-2 lg:gap-5">
              <h2 className="text-4xl lg:text-8xl font-normal font-bebas leading-[1] tracking-wide text-black">
                CREATE,
              </h2>
              <h2 className="text-3xl lg:text-6xl font-normal font-bebas leading-[1] tracking-wider text-black pt-0 lg:pt-6">
                CUSTOMIZE
              </h2>
            </div>

            <div className="flex flex-col w-full max-w-full">
              <h3 className="text-2xl lg:text-4xl font-bebas font-normal leading-[1.2] tracking-wide text-black">
                esports tournament & scrims at one place
              </h3>
            </div>

            <p className="text-base lg:text-xl font-sans font-normal leading-[1.2] tracking-wider text-black mt-2 lg:mt-4">
              Kick off some awesome esports tournaments and scrimmages! Let’s customize pages,
              series, and a bunch of cool features. It’s all about building connections between
              players, organizers, staff, and the whole gaming community.
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className={`w-full h-64 ${dynamicGap} pt-8 lg:pt-10 ${dynamicMargin}`}>
            <img
              src="/Frame 139.png"
              alt="Dashboard Preview"
              className="w-full h-92 max-h-[300px] lg:max-h-[559px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className={`w-full lg:w-1/2 min-w-0 h-full min-h-screen flex flex-col px-6 lg:px-12 ${dynamicGap} pt-6 lg:pt-32`}>

        {/* Login Form */}
        <div className={`w-full h-auto flex flex-col ${dynamicGap}`}>
          {/* Register Link */}
          <span className={`flex flex-row w-auto gap-2 transition-all duration-300 ease-in ${dynamicMargin}`}>
            <img className="w-4 h-4 mt-1" src="/solar_user-bold.svg" alt="icon" />
            <span className="font-sans font-normal text-sm lg:text-base leading-none tracking-wider text-black">
              Already Have An Account,
            </span>
            <span className="font-sans font-normal text-sm lg:text-base leading-none tracking-wider text-[#0000FF] cursor-pointer"
              onClick={() => navigate('/OrganizerLoginViaEmail')}>
              Login Now
            </span>
          </span>

          <div className='flex flex-row justify-between'>
            <div
            onClick={() => navigate("/OrganizerRegisterViaEmail")}>
              <img src="./orgVector.svg" alt="" />
            </div>
            <div>
              <img src="./Team logo.svg" alt="" />
            </div>
          </div>

          {/* Form Fields */}
          <div className={`flex flex-col pb-6 w-full h-auto ${dynamicGap}`}>
            <div className={`flex flex-col w-full h-auto gap-2`}>
              <h2 className="w-full text-2xl lg:text-3xl font-arialrounded font-normal leading-none tracking-normal text-black">
                Welcome Back,
              </h2>
              <p className="w-full text-lg lg:text-2xl pb-2 font-arialrounded font-normal leading-none tracking-normal text-black">
                Create A New Account Using Your Email Address
              </p>
            </div>

            {/* OTP Section */}
            <div className={`flex flex-col w-full h-auto pb-6 ${dynamicGap}`}>
              <div className="flex flex-wrap items-center gap-1 lg:gap-2 text-left">
                <span className="font-arialrounded font-normal text-sm leading-none tracking-wider text-black uppercase">
                  Enter OTP for
                </span>
                <span className="font-arialrounded font-normal text-sm leading-none tracking-wider text-[#737373]">
                  naxnagamer2107@gmail.com
                </span>
                <button className="font-sans font-semibold text-xs leading-none tracking-wider text-[#737373] transition-all duration-300 ease-out"
                  onClick={() => navigate("/OrganizerRegisterViaEmail")}>
                  CHANGE EMAIL ID
                </button>
              </div>

              {/* OTP Input Boxes */}
              <div className="w-full flex justify-between gap-2 lg:gap-3">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="relative flex-1 max-w-[72px]">
                    <input
                      type="text"
                      maxLength="1"
                      value={otpValues[index]}
                      className="w-full aspect-square pt-2 pb-2 px-4 lg:px-5 bg-[#F2F2F2] font-arialrounded font-normal text-2xl lg:text-3xl leading-none tracking-wider text-center text-black uppercase"
                      onChange={(e) => {
                        const newOtpValues = [...otpValues];
                        newOtpValues[index] = e.target.value;
                        setOtpValues(newOtpValues);

                        // Auto-focus next input
                        if (e.target.value && index < 5) {
                          const nextInput = document.getElementById(`otp-input-${index + 1}`);
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        // Handle backspace
                        if (e.key === 'Backspace' && !e.target.value && index > 0) {
                          const prevInput = document.getElementById(`otp-input-${index - 1}`);
                          if (prevInput) prevInput.focus();
                        }
                      }}
                      id={`otp-input-${index}`}
                    />
                    {/* Placeholder underscore */}
                    {!otpValues[index] && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-2xl lg:text-3xl text-black font-arialrounded">_</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Resend Timer */}
              <div className="text-center">
                <span className="font-sans font-normal text-base lg:text-base leading-normal tracking-wide text-[#0D0D0D]">
                  Resend OTP In 00:15
                </span>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              className="bg-[#4D4D4D] text-white hover:bg-black py-2 rounded-xl font-arialrounded font-normal text-xl lg:text-xl w-full group"
            >
              <span className="inline-block group-hover:animate-trumble"
              onClick={() => navigate("/OrganizerName")}>Start Adding Your Details</span>
            </button>
          </div>

          {/* Alternative Login Options */}
          <div className={`flex flex-col w-full h-auto ${dynamicGap}`}>

            {/* Phone Login Button */}
            <div className="w-full h-10 lg:h-12 relative flex items-center rounded-xl pb-2 px-4 lg:px-6 gap-2 font-arialrounded font-normal text-sm lg:text-base leading-none tracking-wider justify-center text-black bg-white border-2 border-[#737373] group">
              <div className="relative group">
                <button
                  className="w-full h-4 font-arialrounded font-normal text-sm lg:text-base leading-none tracking-wider justify-center pt-2 text-[#737373] "
                //   onClick={() => navigate("/")}
                >
                  Login With Phone Number
                </button>
                {/* Hover Alert on Right */}
                <span className="absolute -right-[205px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#FF0000] mt-1 text-white text-sm px-4 py-[6px] rounded-md whitespace-nowrap">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button className="group w-full h-10 lg:h-12 flex items-center justify-center bg-white hover:bg-blue-50 border-2 border-[#1A1A1A] rounded-xl px-4 lg:px-6 gap-2">
              <img
                src="/icons_google.svg"
                alt="Google Icon"
                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:animate-trumble"
              />
              <span className="font-arialrounded font-normal text-sm lg:text-base leading-none tracking-wider text-black group-hover:animate-trumble">
                Login With Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}