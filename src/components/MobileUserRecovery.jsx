import React, { useState } from "react";
import axios from "axios";
import HeaderPR from "./HeaderPR";
import { useNavigate } from "react-router-dom";

function MobileUserRecovery() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleClick = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (phone === "9876543210") {
      setSuccessMessage("OTP sent successfully! Redirecting...");
      setTimeout(() => {
        navigate("/MobileIdentityUser", {
          state: { phone, isForgotPassword: true, testOtp: "000000" },
        });
        setPhone("");
        setSuccessMessage("");
      }, 2000);
    } else {
      setErrorMessage("Invalid phone number. Please try again.");
    }
  };

  return (
    <div className="main-container flex w-screen h-screen flex-col justify-between items-center bg-[url('/forgot_user[phone].png')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
      <HeaderPR />

      {/* Toggle Buttons */}
      <div className="flex justify-center mt-[1px] z-30">
        <div className="flex bg-[#f2f2f2] rounded-full w-[520px] p-[4px] shadow-md">
          <button
            onClick={() => navigate("/MobilePassRecovery")}
            className="w-1/2 bg-white text-black py-[10px] rounded-full font-semibold text-[18px]"
          >
            Forgot Password
          </button>
          <button className="w-1/2 bg-black text-white py-[10px] rounded-full font-semibold text-[18px]">
            Forgot Username
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="flex pt-[-10px] justify-center items-center flex-1 z-10">
        <div className="w-[480px] bg-white rounded-[20px] p-[32px] shadow-lg z-20 flex flex-col items-center text-center mt-[-80px]">
          <h2 className="text-[26px] font-bold capitalize">Username Recovery</h2>
          <p className="text-[#999] mt-[8px] font-medium text-[14px] leading-[22px]">
            I know, you can remember clingy words given by your <br />
            Partner but Gamertag not!
          </p>

          {/* Phone Input with Floating Label */}
          <div className="w-full relative mt-[24px]">
            <div className="absolute top-1 left-0 h-full flex items-center pl-[16px] text-[#727272] font-semibold text-[16px]">
              +91
            </div>
            <input
              id="phone"
              type="tel"
              maxLength="10"
              placeholder="Enter Phone Number"
              className={`peer w-full h-[56px] pl-[60px] pr-[20px] pt-[7px] rounded-[12px] bg-[#f2f2f2] text-black placeholder-transparent font-semibold focus:outline-none transition-all border-2 ${
                errorMessage ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black"
              }`}
              value={phone}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, "");
                if (input.length <= 10) setPhone(input);
              }}
              required
            />
            <label
              htmlFor="phone"
              className="absolute left-[60px] top-[18px] text-[#727272] text-[16px] bg-[#f2f2f2] px-[4px] transition-all
                peer-placeholder-shown:top-[18px]
                peer-placeholder-shown:text-[16px]
                peer-focus:top-[4px]
                peer-focus:text-[13px]
                peer-focus:text-black
                peer-focus:left-[16px]
                peer-valid:top-[4px]
                peer-valid:text-[13px]
                peer-valid:text-black
                peer-valid:left-[16px]"
            >
              Enter Phone Number
            </label>
          </div>

          <button
            onClick={handleClick}
            className="w-full h-[52px] border-2 border-black rounded-[10px] hover:bg-black hover:text-white transition-all font-semibold text-[16px] mt-[24px]"
          >
            Continue For OTP Verification
          </button>

          {errorMessage && (
            <p className="text-red-500 text-sm font-medium mt-[10px]">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm font-medium mt-[10px]">{successMessage}</p>
          )}

          <button
            onClick={() => navigate("/UsernameRecovery")}
            className="mt-4 text-[#0000ff] text-[16px] capitalize font-normal cursor-pointer"
          >
            Having trouble signing in? Just use your Email ID instead!
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileUserRecovery;
