import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderPR from "./HeaderPR";
import forgotUserBg from "/forgot_user.png";

const maskEmail = (email) => {
  if (!email) return "";
  const [username, domain] = email.split("@");
  return `${username.slice(0, 3)}*****@${domain}`;
};

const UsernameOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const email = location.state?.email || "";
  const testOtp = location.state?.testOtp;

  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (!isTimerActive) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setIsTimerActive(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerActive]);

  const handleOtpChange = (e, idx) => {
    const val = e.target.value;
    if (!/^[0-9]?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < otp.length - 1) {
      document.getElementById(`otp-${idx + 1}`).focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const otpVal = otp.join("");
    if (otpVal.length < 6) return setError("Enter complete 6-digit OTP.");
    if (testOtp && otpVal === testOtp) {
      return navigate("/UsernameSent", { state: { email } });
    }

    try {
      const res = await axios.post("/api/v1/users/forgotUsername", {
        email,
        code: otpVal,
      });
      if (res.status === 200) {
        navigate("/UsernameSent", { state: { email } });
      } else {
        setError(res.data.message || "Invalid OTP.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed.");
    }
  };

  const handleResendClick = async () => {
    if (!isTimerActive) {
      try {
        await axios.post("/api/v1/users/forgetUsernameVerificationEmail", {
          email,
        });
        setTimeLeft(30);
        setIsTimerActive(true);
      } catch (err) {
        setError("Resend failed.");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${forgotUserBg})` }}
    >
      <HeaderPR />

      {/* Tabs */}
      <div className=" w-[460px] ml-[450px] mt-[45px] flex pt-[4px] pr-[8px] gap-[10px] pb-[4px] pl-[5px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#f2f2f2] rounded-[40px] relative z-10">
                 {/* Forgot Password Button (inactive in this component) */}
              <button
  className="flex w-[220px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] flex-col gap-[8px] items-start shrink-0 flex-nowrap bg-[#fff] text-black rounded-[30px] shadow-[0_8px_20px_0_rgba(0,0,0,0.25)] z-[11]"
  onClick={() => navigate('/identity-verify')}
>
  <div className="flex gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[12]">
    <span className="h-[25px] shrink-0 basis-auto font-sourceSans text-[20px] font-semibold leading-[25px] tracking-[0.4px] relative text-left capitalize whitespace-nowrap z-[13]">
      forgot password
    </span>
  </div>
</button>

              {/* Forgot Username Button (active in this component) */}
              <button
  className="flex w-[220px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#000] text-white rounded-[30px] shadow-[0_8px_20px_0_rgba(0,0,0,0.25)] z-[14]"
>
  <div className="flex gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[15]">
    <span className="h-[25px] shrink-0 basis-auto font-sourceSans text-[20px] font-semibold leading-[25px] tracking-[0.4px] relative text-left capitalize whitespace-nowrap z-[16]">
      forgot username
    </span>
  </div>
</button>

            </div>

      {/* OTP Box */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center space-y-6 mt-0">

          <h1 className="text-xl font-bold text-black">Identity Verification</h1>
          <p className="text-gray-500 text-sm">
            We will send you a One-Time Password (OTP) to your registered email address. Please wait a few moments.
          </p>

          <div className="flex justify-center items-center flex-wrap gap-1 text-sm">
            <span className="uppercase font-bold text-black">Enter OTP for</span>
            <span className="text-gray-500 lowercase">{maskEmail(email)}</span>
            <button
              onClick={() => navigate("/UsernameRecovery")}
              className="text-gray-500 uppercase text-xs underline ml-1"
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
            Get Your Username
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsernameOTP;
