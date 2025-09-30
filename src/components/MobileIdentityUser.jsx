import React, { useState, useEffect, useRef } from "react";
import HeaderPR from "./HeaderPR";
import { useNavigate, useLocation } from "react-router-dom"; // Ensure useLocation is imported

function MobileIdentityUser() {
  const navigate = useNavigate();
  const location = useLocation(); // Get location object

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [phone, setPhone] = useState(""); // Keep phone state if needed elsewhere, but not for display here
  const inputRefs = useRef([]);

  // Get phone number from navigation state, with a fallback
  // This now matches MobileIdentityPass.jsx
  const displayedPhoneNumber = location.state?.phone || "N/A";

  // Removed the useEffect that was setting phone from localStorage,
  // as displayedPhoneNumber now relies solely on location.state
  // useEffect(() => {
  //   const savedPhone = localStorage.getItem("recoveryPhone");
  //   if (savedPhone) setPhone(savedPhone);
  // }, []);


  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleResendOtp = () => {
    if (!isTimerRunning) {
      // Logic to resend OTP goes here (e.g., API call)

      setOtp(["", "", "", "", "", ""]);
      setTimer(30);
      setIsTimerRunning(true);
      setErrorMessage("");
      setSuccessMessage("OTP resent!");
      // Focus the first input field after resend
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    }
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Updated handlePaste function to match MobileIdentityPass.jsx
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, otp.length);
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
      // Move focus to the last filled input + 1, or the last input if all are filled
      if (inputRefs.current[i + 1] && i < otp.length - 1) {
        inputRefs.current[i + 1].focus();
      } else if (i === otp.length - 1) {
         // If the last input is filled by paste, blur focus
         inputRefs.current[i].blur();
      }
    }
    setOtp(newOtp);
  };

  return (
    <div className="h-screen w-screen bg-[url('/forgot_user[phone].png')] bg-cover bg-no-repeat bg-top flex flex-col overflow-hidden">
      <HeaderPR />

      <div className="flex justify-center mt-[50px] z-30">
        <div className="flex bg-[#f2f2f2] rounded-full w-[480px] p-[4px] shadow-md">
          <button
            className="w-1/2 bg-white text-black py-[10px] rounded-full font-semibold text-[18px]"
            onClick={() => navigate("/MobileIdentityPass")}
          >
            Forgot Password
          </button>
          <button className="w-1/2 bg-black text-white py-[10px] rounded-full font-semibold text-[18px]">
            Forgot Username
          </button>
        </div>
      </div>

      <div className="flex pt-[20px] justify-center items-center flex-1 z-10">
        <div className="w-[480px] bg-white rounded-[20px] p-[32px] shadow-lg z-20 flex flex-col items-center text-center mt-[-20px]">
          <h2 className="text-[26px] font-bold capitalize mt-[24px]">Identity Verification</h2>
          <p className="text-[#999] mt-[8px] font-medium text-[14px] leading-[22px]">
            We Will Send You A One-Time Password (OTP) To Your <br />
            Registered Phone Number. Please Wait A Few Moments.
          </p>

          <div className="w-full mt-[24px] flex flex-col items-center">
            <div className="text-[14px] font-medium text-[#333] mb-[16px]">
            ENTER OTP FOR <span className="font-semibold">+91-{displayedPhoneNumber}</span> {/* Use displayedPhoneNumber */}
              <button
                className="text-blue-600 underline text-[12px] ml-[8px]"
                onClick={() => navigate("/MobileUserRecovery")}
              >
                CHANGE NUMBER
              </button>
            </div>

            <div className="flex justify-center gap-2" onPaste={handlePaste}>
  {otp.map((val, idx) => (
    <input
      key={idx}
      id={`otp-${idx}`}
      type="text"
      maxLength="1"
      placeholder="-"
      className="w-12 h-12 text-center text-xl rounded bg-gray-100 border border-gray-200 focus:outline-none focus:border-black placeholder:text-gray-400"
      value={val}
      onChange={(e) => handleOtpChange(idx, e.target.value)}
      onKeyDown={(e) => handleKeyDown(idx, e)}
      ref={(el) => (inputRefs.current[idx] = el)}
    />
  ))}
</div>


            <button
              className={`text-[12px] mt-[16px] ${isTimerRunning ? 'text-[#666] cursor-not-allowed' : 'text-blue-600 underline cursor-pointer'}`}
              onClick={handleResendOtp}
              disabled={isTimerRunning}
            >
              {isTimerRunning ? `Resend OTP In ${formatTime(timer)}` : 'Resend OTP'}
            </button>
          </div>

          <button
            className="w-full h-[52px] border-2 border-black rounded-[10px] hover:bg-black hover:text-white transition-all font-semibold text-[16px] mt-[24px]"
            onClick={() => {
              const enteredOtp = otp.join('');

              if (enteredOtp === "000000") {

                navigate("/UsernameSentPhone");
              } else {

                setErrorMessage("Invalid OTP. Please try again.");
                setSuccessMessage("");
              }
            }}
          >
            Get Your Username
          </button>

          {errorMessage && (
            <p className="text-red-500 text-sm font-medium mt-[10px]">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm font-medium mt-[10px]">{successMessage}</p>
          )}

          <button
            className="flex flex-col gap-[20px] items-center self-stretch shrink-0 flex-nowrap relative z-[26] cursor-pointer"
            onClick={() => navigate('/MobileUserRecovery')}
          >
            <span className="h-[24px] mt-4 ml-[-20px] self-stretch shrink-0 font-sourceSans text-[16px] font-normal leading-[24px] text-[#0000ff] relative text-center capitalize whitespace-nowrap z-[27]">
              Having trouble signing in? Just use your Email ID instead!
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileIdentityUser;