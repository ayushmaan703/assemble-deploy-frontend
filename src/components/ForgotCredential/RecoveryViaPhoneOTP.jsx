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

export default function RecoveryViaPhoneOTP() {
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ phone: '' });
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
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


  // Proceed with OTP verification logic
  navigate("/ChangePasswordViaPhone");
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
            onClick={() => navigate("/OrganizerLoginViaEmail")}
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
              Identity Verifiication
            </h2>
            <p className="text-sm lg:text-base font-arialrounded font-normal leading-normal tracking-[0.02em] text-[#999999]">
              We Will Send You A One-Time Password (OTP) To Your Registered Phone Number. Please Wait A Few Moments.
            </p>
          </div>

          {/* Phone input with country code */}
          <div className={`flex flex-col w-full h-auto ${dynamicGap}`}>
            {/* OTP Section */}
            <div className={`flex flex-col w-full h-auto pb-1 ${dynamicGap}`}>
              <div className="flex flex-wrap items-center gap-1 lg:gap-2 text-left">
                <span className="font-arialrounded font-normal text-sm leading-none tracking-wider text-black uppercase">
                  Enter OTP for
                </span>
                <div className='flex items-center gap-1'>
                  <span className="font-arialrounded font-normal text-sm leading-none tracking-wider text-[#737373]">+91</span>
                  <span className="font-arialrounded font-normal text-sm leading-none tracking-wider text-[#737373]">-</span>
                  <span className="font-arialrounded font-normal text-sm leading-none tracking-wider text-[#737373]">9694993346</span>
                </div>
                <button className="font-sans font-semibold text-xs leading-none tracking-wider text-[#737373] hover:text-gray-700"
                onClick={() => navigate("/UsernameRecoveryViaPhone")}>
                  CHANGE NUMBER
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
                      className="w-full aspect-square pt-2 pb-2 px-4 lg:px-5 bg-[#F2F2F2] font-arialrounded font-normal text-2xl lg:text-2xl leading-none tracking-wider text-center text-black uppercase"
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

            {/* Continue button */}
            <button
              onClick={handleContinue}
              className={`group w-full h-12 lg:h-14 rounded-xl bg-white text-black hover:bg-black hover:text-white border-2 border-black font-arialrounded font-normal text-base lg:text-lg leading-none tracking-wider transition-all duration-300 ease-in animate-trumble ${dynamicGap}`}
            >
              <span className="inline-block ">Set-Up New Password</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}