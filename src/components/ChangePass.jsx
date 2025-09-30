import React, { useState } from "react";
import HeaderPR from "./HeaderPR";
import { useLocation, useNavigate } from "react-router-dom";
import right from "../assets/right.svg";
import fadedRight from "../assets/Faded_right.svg";

const ChangePass = () => {
  const location = useLocation();
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
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="main-container w-screen h-screen flex flex-col items-center bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-06/VpQGFad9t0.png)] bg-cover bg-center bg-no-repeat relative overflow-hidden">
      <HeaderPR />

      <div className="flex pt-[10px] mt-[-45px] pb-[60px] pl-[-30px] flex-col gap-[8px] justify-center items-center z-[10]">
        {/* Toggle buttons */}
        <div className="flex justify-center mt-8">
        <div className="flex pt-[4px] pr-[6px] gap-[10px] pb-[4px] pl-[5px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#f2f2f2] rounded-[40px] relative z-10">
             {/* Forgot Password Button (active in this component) */}
              <button
                className={`flex w-[250px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#000] text-white rounded-[30px] shadow-[0_8px_20px_0_rgba(0,0,0,0.25)] z-[11]`}
                // This button is active, no action needed on click unless you want to refresh
              >
                <div className="flex gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[15]">
                  <span className="h-[25px] shrink-0 basis-auto font-sourceSans text-[20px] font-semibold leading-[25px] tracking-[0.4px] relative text-left capitalize whitespace-nowrap z-[16]">
                    forgot password
                  </span>
                </div>
              </button>
              {/* You might want to add a button here to navigate to UsernameRecovery */}
               <button
                className={`flex w-[250px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff] text-black rounded-[30px] shadow-[0_8px_20px_0_rgga(0,0,0,0.25)] z-[14]`}
                // Add navigation to the UsernameRecovery component
                onClick={() => navigate('/UsernameSent')} // Assuming '/username-recovery' is the route
              >
                <div className="flex gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[15]">
                  <span className="h-[25px] shrink-0 basis-auto font-sourceSans text-[20px] font-semibold leading-[25px] tracking-[0.4px] relative text-left capitalize whitespace-nowrap z-[16]">
                    forgot username
                  </span>
                </div>
              </button>
            </div>
        </div>

        {/* Password card */}
        <div className="w-full max-w-[480px] mx-4 bg-white rounded-[20px] border border-white px-[24px] py-[14px] flex flex-col shadow-[0_16px_20px_rgba(0,0,0,0.25)]">
          {/* Title */}
          <div className="text-center flex flex-col gap-[10px]">
            <h2 className="text-[32px] text-black font-[400] font-['Arial_Rounded_MT_Bold'] capitalize">
              Change Password
            </h2>
            <p className="text-[#999] text-[16px] leading-[24px] tracking-[0.32px] font-[400] font-['Arial_Rounded_MT_Bold'] text-center capitalize">
              Please enter a new password and ensure that you remember it. We recommend saving it in Google Passwords for future reference.
            </p>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-[20px] mt-4">
            <input
              type="password"
              placeholder="New Password"
              className="h-[56px] rounded-[12px] px-[23px] text-[16px] bg-[#f2f2f2] text-black font-['Arial'] tracking-wide focus:outline-none border border-transparent focus:border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="h-[56px] rounded-[12px] px-[23px] text-[16px] bg-[#f2f2f2] text-black font-['Arial'] tracking-wide focus:outline-none border border-transparent focus:border-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Validation conditions */}
            <div className="flex flex-col gap-[8px] mt-2">
              <ConditionItem
                passed={passwordValidations.length}
                text="password is atleast 8 characters long."
              />
              <ConditionItem
                passed={passwordValidations.strength}
                text="must be okay strength or better."
              />
              <ConditionItem
                passed={passwordValidations.mix}
                text="password includes two of the following: letters, number or symbol."
              />
            </div>

            {/* Error/Success */}
            {error && (
              <div className="text-center text-red-500 font-['Arial'] text-sm mt-1">{error}</div>
            )}
            {successMessage && (
              <div className="text-center text-green-500 font-['Arial'] text-sm mt-1">{successMessage}</div>
            )}

            {/* Submit */}
            <button
              className="h-[55px] border-2 border-black rounded-[10px] text-black hover:bg-black hover:text-white font-['Arial_Rounded_MT_Bold'] tracking-wide transition-colors mt-2"
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

// ✅ Separate condition item for validation indicators
const ConditionItem = ({ passed, text }) => (
  <div className="flex items-center gap-2">
    <img src={passed ? right : fadedRight} alt="check" className="w-[16px] h-[16px]" />
    <span
      className={`text-[16px] font-[400] font-['Arial'] tracking-[1.92px] lowercase ${
        passed ? "text-black" : "text-[#808080]"
      }`}
    >
      {text}
    </span>
  </div>
);

export default ChangePass;
