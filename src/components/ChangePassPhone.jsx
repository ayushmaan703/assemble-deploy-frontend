"use client";
import React, { useState } from "react";
import HeaderPR from "./HeaderPR";
import { useLocation, useNavigate } from "react-router-dom";
import right from "../assets/right.svg";
import fadedRight from "../assets/Faded_right.svg";

const ChangePassPhone = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const passwordValidations = {
    length: password.length >= 8,
    strength: /(?=.*[A-Za-z])(?=.*\d)|(?=.*[!@#$%^&*])/.test(password),
    mix: /(.*[A-Za-z].*)(\d|\W)|(\d.*[A-Za-z])/.test(password),
  };

  const handleClick = () => {
    setError("");
    setSuccessMessage("");

    if (!password || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!passwordValidations.length || !passwordValidations.strength || !passwordValidations.mix) {
      setError("Password does not meet all requirements.");
      return;
    }

    setSuccessMessage("Password created, Redirecting to login..");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="w-screen h-screen bg-[url('/forgot_pass[phone].png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start relative overflow-hidden">
      <HeaderPR />

      <div className="w-full flex  flex-col items-center justify-center mt-6 px-4 z-10">
        {/* Tabs */}
        <div className="flex justify-center w-full max-w-[480px]">
          <div className="flex w-full bg-white rounded-full p-1 shadow-md">
            <button
              className="w-1/2 px-6 py-2 rounded-full bg-black text-white text-base font-semibold"
              disabled
            >
              Forgot Password
            </button>
            <button
              onClick={() => navigate("/UsernameSentPhone")}
              className="w-1/2 px-6 py-2 rounded-full bg-white text-black text-base font-semibold"
            >
              Forgot Username
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-[480px] mt-2 bg-white rounded-[20px] border border-white px-6 py-6 shadow-[0_16px_20px_rgba(0,0,0,0.25)]">
          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-[32px] font-normal leading-[37px] font-['Arial_Rounded_MT_Bold'] text-black capitalize">
              Change Password
            </h2>
            <p className="text-[#999] text-[16px] leading-[24px] font-['Arial_Rounded_MT_Bold']">
              Please Enter A New Password And Ensure That You Remember It. We Recommend Saving It In Google Passwords For Future Reference.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5">
            <input
              type="password"
              placeholder="New Password"
              className="h-[56px] rounded-[12px] px-[23px] bg-[#f2f2f2] text-black text-[16px] font-['Arial_Rounded_MT_Bold'] border border-transparent focus:outline-none focus:border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="h-[56px] rounded-[12px] px-[23px] bg-[#f2f2f2] text-black text-[16px] font-['Arial_Rounded_MT_Bold'] border border-transparent focus:outline-none focus:border-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Conditions */}
            <div className="flex flex-col gap-2">
              <ConditionItem passed={passwordValidations.length} text="password is atleast 8 characters long." />
              <ConditionItem passed={passwordValidations.strength} text="must be okay strength or better." />
              <ConditionItem passed={passwordValidations.mix} text="password includes two of the following: letters, number or symbol." />
            </div>

            {/* Error/Success */}
            {error && <div className="text-red-500 text-center">{error}</div>}
            {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}

            {/* Submit */}
            <button
              className="h-[55px] mt-2 border-2 border-black rounded-[10px] text-black font-['Arial_Rounded_MT_Bold'] hover:bg-black hover:text-white transition-colors"
              onClick={handleClick}
            >
              Continue Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConditionItem = ({ passed, text }) => (
  <div className="flex items-center gap-2">
    <img src={passed ? right : fadedRight} alt="check" className="w-[16px] h-[16px]" />
    <span className={`text-[14px] font-['Arial_Rounded_MT_Bold'] ${passed ? "text-black" : "text-[#999]"}`}>
      {text}
    </span>
  </div>
);

export default ChangePassPhone;
