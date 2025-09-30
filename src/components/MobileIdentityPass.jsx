import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderPR from "./HeaderPR";

function MobileIdentityPass() {
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const displayedPhoneNumber = location.state?.phone || "N/A";

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (!isTimerRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleResendOtp = () => {
    if (!isTimerRunning) {
      setOtp(["", "", "", "", "", ""]);
      setTimer(30);
      setIsTimerRunning(true);
      setErrorMessage("");
      setSuccessMessage("OTP resent!");
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
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

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, otp.length);
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
      if (inputRefs.current[i + 1] && i < otp.length - 1) {
        inputRefs.current[i + 1].focus();
      } else if (i === otp.length - 1) {
        inputRefs.current[i].blur();
      }
    }
    setOtp(newOtp);
  };

  return (
    <div className="h-screen w-screen bg-[url('/forgot_pass[phone].png')] bg-cover bg-no-repeat bg-top flex flex-col overflow-hidden">
      <HeaderPR />

      <div className="flex justify-center mt-[50px] z-30">
        <div className="flex bg-[#f2f2f2] rounded-full w-[480px] p-[4px] shadow-md">
          <button className="w-1/2 bg-black text-white py-[10px] rounded-full font-semibold text-[18px]">
            Forgot Password
          </button>
          <button
            className="w-1/2 bg-white text-black py-[10px] rounded-full font-semibold text-[18px]"
            onClick={() => navigate("/MobileIdentityUser")}
          >
            Forgot Username
          </button>
        </div>
      </div>

      <div className="flex pt-[20px] justify-center items-center flex-1 z-10">
  <div className="w-[460px] bg-white rounded-[20px] p-[32px] shadow-[0px_8px_24px_rgba(0,0,0,0.08)] z-20 flex flex-col items-center text-center mt-[-20px]">
    <h2 className="text-[26px] font-bold capitalize mt-[24px]">Identity Verifiication</h2>

    <p className="text-[#999] mt-[8px] font-medium text-[14px] leading-[22px]">
      We Will Send You A One-Time Password (OTP) To Your <br />
      Registered Phone Number. Please Wait A Few Moments.
    </p>

    <div className="w-full mt-[24px] flex flex-col items-center">
      <div className="text-[14px] font-semibold text-[#333] mb-[16px]">
        ENTER OTP FOR <span className="font-bold">+91-{displayedPhoneNumber}</span>
        <button
          className="text-blue-600 underline text-[12px] ml-[8px]"
          onClick={() => navigate("/MobilePassRecovery")}
        >
          CHANGE NUMBER
        </button>
      </div>

      <div className="flex gap-[10px] justify-center" onPaste={handlePaste}>
      {otp.map((digit, index) => (
  <input
    key={index}
    ref={(el) => (inputRefs.current[index] = el)}
    type="text"
    maxLength="1"
    value={digit}
    placeholder="-"
    onChange={(e) => handleOtpChange(index, e.target.value)}
    onKeyDown={(e) => handleKeyDown(index, e)}
    className="w-[52px] h-[52px] bg-[#f2f2f2] rounded-[12px] text-[20px] font-bold text-[#555] text-center border border-transparent focus:outline-none focus:border-black transition-all duration-150 ease-in-out placeholder:text-[#bbb]"
  />
))}

      </div>

      <button
        className={`text-[12px] mt-[10px] ${isTimerRunning ? 'text-[#666] cursor-not-allowed' : 'text-blue-600 underline cursor-pointer'}`}
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
          navigate("/ChangePassPhone");
        } else {
          setErrorMessage("Invalid OTP. Please try again.");
          setSuccessMessage("");
        }
      }}
    >
      Set-Up New Password
    </button>

    {errorMessage && (
      <p className="text-red-500 text-sm font-medium mt-[10px]">{errorMessage}</p>
    )}
    {successMessage && (
      <p className="text-green-500 text-sm font-medium mt-[10px]">{successMessage}</p>
    )}

    <button
      className="flex flex-col gap-[20px] items-center self-stretch shrink-0 flex-nowrap relative z-[26] cursor-pointer"
      onClick={() => navigate('/MobilePassRecovery')}
    >
      <span className="h-[24px] mt-4 self-stretch shrink-0 basis-auto text-[14px] font-normal leading-[24px] text-[#0000ff] text-center capitalize whitespace-nowrap z-[27]">
        Having trouble signing in? Just use your Email ID instead!
      </span>
    </button>
  </div>
</div>

    </div>
  );
}

export default MobileIdentityPass;
