import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderPR from "./HeaderPR";

// Mask email helper
const maskEmail = (email) => {
  if (!email) return "";
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  const [username, domain] = parts;
  return `${username.slice(0, 3)}*****@${domain}`;
};

const IdentityVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const email = location.state?.email || "";
  const testOtp = location.state?.testOtp;
  const [isForgotPassword, setIsForgotPassword] = useState(
    location.state?.isForgotPassword ?? true
  );
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (!isTimerActive) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [isTimerActive]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleResendClick = async () => {
    if (isTimerActive) return;
    try {
      const endpoint = "/api/v1/users/forgotPasswordVerificationEmail";
      await axios.post(endpoint, { email });
      setTimeLeft(30);
      setIsTimerActive(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  const handleOtpChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (testOtp && otpValue === testOtp) {
      setError("");
      navigate(isForgotPassword ? "/ChangePass" : "/UsernameSent", { state: { email } });
      return;
    }

    try {
      const endpoint = isForgotPassword
        ? "/api/v1/users/forgotPasswordVerificationCode"
        : "/api/v1/users/forgotUsername";
      const res = await axios.post(endpoint, { email, code: otpValue });

      if (res.status === 200) {
        setError("");
        navigate(isForgotPassword ? "/ChangePass" : "/UsernameSent", { state: { email } });
      } else {
        setError(res.data.message || "OTP verification failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="pr-page" style={{ fontFamily: "Arial Rounded MT Bold, sans-serif" }}>
      <HeaderPR />
      <div className="pr-container flex justify-start pr-[100px]">
        <div className="flex flex-col w-[480px] mt-[-60px] ml-[-40px] gap-[24px] relative z-[9]">

          {/* Toggle Switch */}
          <div className="flex pt-[4px] ml-[-50px] mt-8 mr-[30px] pr-[8px] gap-[10px] pb-[4px] pl-[5px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#f2f2f2] rounded-[40px] relative z-10">
              <button
              className={`w-[240px] py-2 px-4 rounded-full shadow-md transition-all ${
                isForgotPassword ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => navigate("/PassRecovery")}
            >
              <span className="text-[20px] font-semibold">Forgot Password</span>
            </button>
            <button
              className={`w-[240px] py-2 px-4 rounded-full shadow-md transition-all ${
                !isForgotPassword ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => navigate("/UsernameOTP")}
            >
              <span className="text-[20px] font-semibold">Forgot Username</span>
            </button>
          </div>

          {/* Card Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 ml-[-20px] mt-[10px] w-full max-w-md text-center space-y-6 mt-6">

          <h1 className="text-xl font-bold text-black">Identity Verification</h1>
          <p className="text-gray-500 text-sm">
            We will send you a One-Time Password (OTP) to your registered email address. Please wait a few moments.
          </p>

          <div className="flex justify-center items-center flex-wrap gap-1 text-sm">
            <span className="uppercase font-bold text-black">Enter OTP for</span>
            <span className="text-gray-500 lowercase">{maskEmail(email)}</span>
            <button
              onClick={() => navigate("/PassRecovery")}
              className="text-gray-500 uppercase text-xs ml-1"
            >
              Change Email
            </button>
          </div>

          <div className="flex justify-center gap-5">
            {otp.map((val, idx) => (
              <input
  key={idx}
  id={`otp-${idx}`}
  type="text"
  maxLength="1"
  placeholder="-"
  className="w-12 h-12 text-center text-xl rounded bg-gray-100 border border-gray-200 focus:outline-none focus:border-black placeholder:text-gray-400"
  value={val}
  onChange={(e) => handleOtpChange(e, idx)}
  onKeyDown={(e) => handleKeyDown(e, idx)}
/>

            ))}
          </div>

          <div className="text-sm text-gray-700">
            {isTimerActive ? (
              <span>Resend OTP in 00:{String(timeLeft).padStart(2, "0")}</span>
            ) : (
              <button onClick={handleResendClick} className="text-blue-600 underline">
                Resend Now
              </button>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-md border border-black font-semibold text-black hover:bg-black hover:text-white transition duration-200"
          >
            Set-Up New Password
          </button>
        </div>
      </div>
        </div>
      </div>
  );
};

export default IdentityVerify;
