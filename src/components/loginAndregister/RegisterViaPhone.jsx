import React, { useState, useEffect } from 'react';
import logo from '../../assets/ASSEMBLE LOGO SECONDARY 1.svg';
import { useNavigate } from 'react-router-dom';
import useViewportHeight from '../../hooks/useViewportHeight';

export default function RegisterViaPhone() {
    const [isLogin, setIsLogin] = useState(true);
    const [phone, setPhone] = useState('');
    const [keepSecure, setKeepSecure] = useState(false);
    const navigate = useNavigate();
    const viewportHeight = useViewportHeight();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const getDynamicSpacing = (height) => {
        if (height < 600) return 2;    // `space-y-2` (small screens)
        if (height < 800) return 4;    // `space-y-4` (medium screens)
        if (height < 1000) return 6;   // `space-y-6` (large screens)
        return 8;                      // `space-y-8` (extra-large screens)
    };

    const dynamicSpacing = getDynamicSpacing(viewportHeight);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation logic here
        navigate("/RegisterViaPhoneOTP");
    };

    const images = [
        './Login Image 01.png',
        './Login Image 02.png',
        './Login Image 03.png',
        './Login Image 04.png',
        './Login Image 05.png',
        './Login Image 06.png',
        './Login Image 07.png',
        './Login Image 08.png',
        './Login Image 09.png',
        './Login Image 10.png',
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
        <div className="block lg:hidden w-full min-h-[60px] max-h-[17vh]  top-0 left-0 z-10 overflow-hidden flex items-center justify-center">
          <img
            src='./Login Image 08.png'
            alt="Banner"
            className="w-full h-full object-contain
            relative translate-y-2 "
          />
        </div>
            {/* Left Panel - Registration Form */}
            <div className="w-full lg:w-1/2 h-full bg-white flex flex-col pt-4 lg:pt-6 pb-4 px-4 lg:px-6 gap-3 lg:gap-5">
                {/* Header */}
                <div className="w-full">
                    <div className="flex items-center justify-between mb-3 lg:mb-5 w-full h-auto">
                        {/* Logo */}
                        <img src={logo} alt="Logo" className="h-10 lg:h-12 w-10 lg:w-12 object-contain" />

                        {/* Text */}
                        <span className="text-xl lg:text-3xl font-bebas text-BrandColor">ASSEMBLE</span>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center w-full h-10 lg:h-12">
            <div className="flex rounded-full py-1 px-2 gap-2 w-full h-full bg-[#F2F2F2]">
              <div className="w-full h-full transition-all duration-300 ease-in font-arialrounded text-base lg:text-base leading-none tracking-wider text-black font-normal flex items-center justify-center rounded-full px-3 lg:px-6 gap-1 bg-white">
                <button
                  onClick={() => navigate("/")}
                  className={`w-full h-full rounded-full lg:text-[16px] text-[12px] transition-colors ${
                    isLogin ? "bg-white text-black" : "bg-white text-black"
                  }`}
                >
                  Login
                </button>
              </div>

              <div className="w-full h-full font-arialrounded text-base lg:text-base leading-none tracking-wider text-white font-normal flex items-center justify-center rounded-full px-3 lg:px-6 gap-1 bg-black">
                <button
                  onClick={() => setIsLogin(false)}
                  className={`w-full h-full rounded-full lg:text-[16px] text-[12px]  transition-colors ${
                    !isLogin ? "bg-black text-white" : "bg-black text-white"
                  }`}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
                </div>

                {/* Registration Form */}
                <div className="w-full flex-1 flex flex-col">
                    <div className="mb-3 lg:mb-4">
                        <h2 className="lg:text-[32px] text-[20px] font-arialrounded text-center">Register Via Phone</h2>
                        <p className="text-center text-[#999999] mt-4 font-normal font-arialrounded text-[10px] lg:text-base">
                            Welcome, Newcomer! We're excited to have you join us on this thrilling esports journey. Together, we can build a legacy that everyone in the community will remember. Just enter your phone number below to begin your adventure!
                        </p>
                    </div>

                    <form className={`flex flex-col gap-4 lg:gap-4 flex-1 pt-6 lg:justify-center space-y-${dynamicSpacing}`} onSubmit={handleSubmit}>
                        {/* Phone Input */}
                        <div className="relative">
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="peer w-full h-12 px-4 pt-5 pb-2 rounded-[4px] lg:rounded-[8px] outline-none bg-[#F2F2F2] text-black"
                                placeholder=" "
                            />
                            <label
                                htmlFor="phone"
                                className={`absolute font-arialrounded font-normal text-base left-4 transition-all duration-200 ${phone ? "top-1 text-[10px]" : "top-3 lg:text-[16px] text-[12px]"
                                    } peer-focus:top-1 peer-focus:text-xs text-[#737373]`}
                            >
                                Phone Number
                            </label>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-center gap-4">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="keepSecure"
                                    checked={keepSecure}
                                    onChange={(e) => setKeepSecure(e.target.checked)}
                                    className="peer hidden"
                                />
                                <div className="w-4 h-4 lg:w-8 lg:h-8 border-2 border-black rounded-[4px] lg:rounded-[8px] flex items-center justify-center peer-checked:bg-black">
                                    <svg
                                        className={`w-4 h-4 ${keepSecure ? 'text-white' : 'text-transparent'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={5}
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </label>
                            <label htmlFor="keepSecure" className="font-sans font-semibold text-[10px] lg:text-base leading-none text-black">
                                Please ensure that your mobile number login credentials are kept secure.
                            </label>
                        </div>

                        {/* Register Button */}
                        <div className="mt-auto pb-6 group">
                            <button
                                type="submit"
                                className="bg-[#4D4D4D] text-white hover:bg-black transition-all duration-300 ease-in py-2 lg:rounded-xl rounded font-arialrounded font-normal text-[12px] lg:text-[20px] w-full"
                            >
                                <span className="group-hover:animate-trumble inline-block">
                                    Start Your Esports Career
                                </span>
                            </button>
                        </div>

                    </form>

                    {/* Alternative Options */}
                    <div className="mt-3 lg:mt-4 space-y-2 lg:space-y-3">
                        <button className="group w-full h-10 lg:h-12 flex items-center justify-center bg-white hover:bg-blue-50 border-2 border-[#1A1A1A] lg:rounded-xl rounded px-3 px-3 lg:px-4 gap-1 ">
                            <img
                                src="/icons_google.svg"
                                alt="Google Icon"
                                className="w-4 lg:w-5 h-4 lg:h-5 group-hover:animate-trumble"
                            />
                            <span className="font-arialrounded font-normal text-[12px] lg:text-[16px]  leading-none tracking-wider text-black group-hover:animate-trumble">
                                Register With Google
                            </span>
                        </button>

                        <button
                            className="w-full h-10 lg:h-12 flex items-center justify-center bg-white hover:bg-blue-50 border-2 border-[#1A1A1A] lg:rounded-xl rounded px-3 lg:px-4 gap-1"
                            onClick={() => navigate("/RegisterViaEmail")}
                        >
                            <span className="font-arialrounded font-normal text-[12px] lg:text-[16px] leading-none tracking-wider text-black">
                                Register With Email ID
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
                        className={`w-full h-auto object-contain transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                </div>
            </div>
        </div>
    );
}