import React, { useState } from 'react';
import logo from '../../assets/ASSEMBLE LOGO SECONDARY 1.svg';
import { useNavigate } from 'react-router-dom';
import useViewportHeight from '../../hooks/useViewportHeight';
import { z } from 'zod';

// Define Zod validation schema
const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
});

export default function OrganizerRegisterViaPhone() {
    const [phone, setPhone] = useState('');
      const [keepSecure, setKeepSecure] = useState(false);
      const [errors, setErrors] = useState({ phone: '' });
      const navigate = useNavigate();

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
    const newErrors = { phone: '' };

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    setErrors(newErrors);

    if (!newErrors.phone) {

      navigate("/OrganizerLoginViaPhoneOTP");
    }
  };


    return (
        <div className="w-full min-h-screen h-auto flex flex-col lg:flex-row">
            {/* Left Panel */}
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
                            <h3 className="text-2xl lg:text-4xl font-bebas font-normal leading-[1.2] tracking-wide uppercase text-black">
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
                            className="w-full h-92  max-h-[300px] lg:max-h-[559px] object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'block';
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className={`w-full lg:w-1/2 min-w-0 h-full min-h-screen flex flex-col px-6 lg:px-12 ${dynamicGap} pt-6 lg:pt-44`}>

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

                    {/* Form Fields */}
                    <div className={`flex flex-col w-full h-auto mb-4 ${dynamicGap}`}>
                        <div className={`flex flex-col w-full h-auto mb-2 gap-2`}>
                            <h2 className="w-full text-2xl lg:text-3xl font-arialrounded font-normal leading-none tracking-normal text-black">
                                Welcome Back,
                            </h2>
                            <p className="w-full text-lg lg:text-2xl font-arialrounded font-normal leading-none tracking-normal text-black">
                                Create A New Account Using Your Email Address
                            </p>
                        </div>

                        {/* Email Input */}
                        <div className={`flex flex-col w-full h-auto pb-6 ${dynamicGap}`}>
                            <div className="relative w-full h-12 lg:h-14 mb-4 font-arialrounded rounded-xl gap-2 bg-[#F2F2F2]">
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder=" "
                  className={`peer w-full h-12 lg:h-14 px-4 lg:px-6 pt-5 lg:pt-6 pb-2 lg:pb-3 text-sm lg:text-base font-normal rounded-xl leading-none tracking-wider outline-none focus:outline-none focus:ring-0 ${
                    errors.phone ? 'bg-red-100 text-red-700' : 'bg-[#F2F2F2] text-gray-800'
                  }`}
                />
                <label
                  htmlFor="phone"
                  className={`absolute left-4 lg:left-6 font-arialrounded font-normal pointer-events-none transition-all duration-200 ease-in-out ${
                    phone ? 'top-1 text-[10px] lg:text-xs' : 'top-3 lg:top-4 text-sm lg:text-base'
                  } peer-focus:top-1 peer-focus:text-[10px] lg:peer-focus:text-xs ${
                    errors.phone ? 'text-red-500' : 'text-[#737373]'
                  }`}
                >
                  <div className='flex flex-row items-center gap-3'>
                    <span>+91</span>
                    <span>Enter Phone Number</span>
                  </div>
                </label>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 pl-4 lg:pl-6">{errors.phone}</p>
                )}
              </div>


                            {/* Checkbox */}
                            <div className="flex flex-row items-center mb-3 w-full h-auto gap-4 lg:gap-5">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="keepSecure"
                                        checked={keepSecure}
                                        onChange={(e) => setKeepSecure(e.target.checked)}
                                        className="peer hidden"
                                    />
                                    <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-black rounded-lg flex items-center justify-center peer-checked:bg-black">
                                        <svg
                                            className={`w-3 h-3 lg:w-4 lg:h-4 ${keepSecure ? 'text-white' : 'text-transparent'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={5}
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </label>
                                <label htmlFor="keepSecure" className="font-sans font-semibold text-sm lg:text-base leading-none tracking-wide text-[#1A1A1A]">
                                    Kindly Ensure That You Keep Your Login Credentials Secure.
                                </label>
                            </div>

                            {/* Login Button */}
                            <button
                                onClick={handleSubmit}
                                className={`group w-full h-12 lg:h-14 rounded-xl bg-white text-[#000000] hover:bg-black hover:text-white font-arialrounded font-normal text-lg lg:text-xl border-2 border-[#000000] leading-none tracking-wider transition-colors duration-200 ease-in ${dynamicGap}`}
                            >
                                <span className="inline-block group-hover:animate-trumble">Start Your Esports Career</span>
                            </button>
                        </div>
                    </div>

                    {/* Alternative Login Options */}
                    <div className={`flex flex-col w-full h-auto ${dynamicGap}`}>

                        {/* Phone Login Button */}
                        <div className="w-full h-10 lg:h-12 relative flex items-center rounded-xl px-4 lg:px-6 gap-2 font-arialrounded font-normal text-sm lg:text-base leading-none tracking-wider justify-center text-[#737373] bg-white border-2 border-[#737373] group">
                            <div className="relative group">
                                <button className="w-full h-4 font-arialrounded font-normal text-sm lg:text-base leading-none tracking-wider justify-center text-[#737373]">
                                    Register With Phone Number
                                </button>
                                <span className="absolute -right-24 lg:-right-48 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#FF0000] text-white text-sm px-4 py-2 rounded-md whitespace-nowrap">
                                    Coming Soon
                                </span>
                            </div>
                        </div>

                        {/* Google Login Button */}
                        <button className="group w-full h-10 lg:h-12 flex items-center justify-center bg-white hover:bg-blue-50 border-2 border-[#1A1A1A] text-[#000000] rounded-xl px-4 lg:px-6 gap-2">
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