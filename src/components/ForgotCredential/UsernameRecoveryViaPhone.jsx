import React, { useState } from 'react';
import logo from '../../assets/ASSEMBLE LOGO SECONDARY 1.svg';
import { useNavigate } from "react-router-dom";


// Simple validation function for phone number
const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required';
  if (phone.length < 10) return 'Phone number must be at least 10 digits';
  if (!/^[0-9]+$/.test(phone)) return 'Phone number must contain only digits';
  return '';
};

export default function UsernameRecoveryViaPhone() {
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ phone: '' });
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const navigate = useNavigate();


  // Update viewport height on resize
  React.useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleContinue = (e) => {
    e.preventDefault();

    // Validate phone number
    const phoneError = validatePhone(phone);

    if (phoneError) {
      setErrors({ phone: phoneError });
    } else {

      // Proceed with OTP verification logic
    }
  };

  const handleUseEmail = () => {
    // Navigate to email recovery or show email recovery option
    navigate("/UsernameRecoveryViaEmail");

  };

  return (
    <div className="w-full min-h-screen h-auto flex items-center justify-center relative overflow-hidden">
      {/* Background with confetti pattern */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 relative">
          {/* Confetti dots bgImage */}
          <img src="Mesh gradient 1.png" alt="bgImage" />
        </div>
      </div>

      {/* Header with logo and back button */}
      <div className={`absolute top-0 left-0 right-0 flex bg-black items-center justify-between w-full h-12 lg:h-16 px-6 lg:px-12 ${dynamicMargin} z-10`}>
        <div className="flex items-center gap-3">
          <div className="h-8 lg:h-12 w-8 lg:w-12 bg-gray-300 rounded-full flex items-center justify-center">
            <img src={logo} alt="Logo" className="h-10 lg:h-14 w-10 lg:w-14 object-contain" />
          </div>
          <span className="text-2xl lg:text-3xl font-agency font-bold leading-none tracking-wider text-white">ASSEMBLE</span>
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <span className="text-2xl lg:text-2xl tracking-wider leading-normal font-sans font-semibold text-white">Back To Login</span>
          <img
            src="icon-park-solid_back.svg"
            alt="icon-back"
            onClick={() => navigate("/OrganizerLoginViaPhone")}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Main forgot password card */}
      <div className={`relative z-10 w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl ${dynamicPadding}`}>
        <div className={`flex flex-col w-full h-auto p-3 ${dynamicGap}`}>
          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-2xl lg:text-3xl font-arialrounded font-normal leading-none tracking-normal text-black mb-2">
              Forgot Password
            </h2>
            <p className="text-sm lg:text-base font-arialrounded font-normal leading-none text-[#999999]">
              Recover Your Account Password Using The Phone Number Associated With Your Registration.
            </p>
          </div>

          {/* Phone input with country code */}
          <div className={`flex flex-col w-full h-auto ${dynamicGap}`}>
            <div className="flex w-full gap-2">

              {/* Phone Input */}
              <div className="relative w-full">
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    let input = e.target.value;

                    // Ensure it starts with "+91 " (note the NBSP)
                    if (!input.startsWith("+91\u00A0\u00A0\u00A0\u00A0")) return;

                    const numberPart = input.slice(4).replace(/\D/g, ''); // after '+91 '
                    setPhone("+91\u00A0\u00A0\u00A0\u00A0" + numberPart);
                  }}

                  onFocus={() => {
                    if (!phone.startsWith("+91")) {
                      setPhone("+91\u00A0\u00A0\u00A0\u00A0");
                    }
                  }}

                  onBlur={() => {
                    if (phone === "+91\u00A0\u00A0\u00A0\u00A0") {
                      setPhone("");
                    }
                  }}

                  className="peer font-arialrounded font-normal text-base w-full h-14 pt-5 pb-2 px-4 gap-4 rounded-xl outline-none bg-[#F2F2F2] text-black"
                  placeholder=" "
                />

                <label
                  htmlFor="phone"
                  className={`absolute font-arialrounded font-normal text-base left-4 transition-all duration-200
                              ${phone && phone !== "+91" ? 'top-1 text-xs' : 'top-3 text-base'}
                              peer-focus:top-1 peer-focus:text-xs text-[#737373]`}
                >
                  {(!phone || phone === "+91") && <span className="mr-3">+91</span>}
                  Enter Phone Number
                </label>


              </div>

            </div>

            {/* Continue button */}
            <button
              onClick={handleContinue}
              className={`group w-full h-12 lg:h-14 rounded-xl bg-white text-black hover:bg-black hover:text-white border-2 border-black font-arialrounded font-normal text-base lg:text-lg leading-none tracking-wider transition-all duration-300 ease-in ${dynamicGap}`}
            >
              <span className="inline-block "
              onClick={() => navigate("/RecoveryViaPhoneOTP")}>Continue For OTP Verification</span>
            </button>

            {/* Alternative option */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <img className="w-4 h-4 cursor-pointer" src="/solar_user-bold.svg" alt="icon" />
              <span className="font-sans font-normal text-sm lg:text-base tracking-wide leading-none text-black cursor-pointer">
                Try Another Way,
              </span>
              <button
                onClick={handleUseEmail}
                className="font-sans font-normal text-sm lg:text-base tracking-wide leading-none text-[#0000FF] cursor-pointer"
                >
                Use Email Instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}