import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderPR from "./HeaderPR";

function MobilePassRecovery() {
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
        navigate("/MobileIdentityPass", {
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
    <div className="h-screen w-screen bg-[url('/forgot_pass[phone].png')] bg-cover bg-no-repeat bg-top flex flex-col overflow-hidden">
  <HeaderPR />

  {/* Toggle Buttons */}
  <div className="flex w-[560px] ml-[400px] justify-center mt-[50px] z-30">
    <div className="flex bg-[#f2f2f2] rounded-full w-[480px] p-[4px] shadow-md">
      <button
        className="w-1/2 bg-black text-white py-[10px] rounded-full font-semibold text-[18px]"
      >
        Forgot Password
      </button>
      <button
        className="w-1/2 bg-white text-black py-[10px] rounded-full font-semibold text-[18px]"
        onClick={() => navigate("/MobileUserRecovery")}
      >
        Forgot Username
      </button>
    </div>
  </div>

  {/* Main Card */}
  <div className="flex justify-center items-start pt-[20px] flex-1 z-10">
    <div className="w-[440px] bg-white rounded-[20px] p-[32px] shadow-lg z-20 flex flex-col items-center text-center mt-[0px]">
      <div className="mt-[16px]">
        <h2 className="text-[26px] font-bold capitalize">Password Recovery</h2>
        <p className="text-[#999] mt-[8px] font-medium text-[14px] leading-[22px]">
          I Know, You Remember About Your Partner Birthdate <br />
          But A Small Password Not !
        </p>
      </div>

      {/* Phone Number Input */}
      <div className="w-full relative mt-[24px]">
        <div className="absolute top-1 left-0 h-full flex items-center pl-[16px] text-[#727272] font-semibold text-[16px]">
          +91
        </div>
        <input
          type="tel"
          maxLength="10"
          className={`peer w-full h-[56px] pl-[60px] pr-[20px] pt-[7px] rounded-[12px] bg-[#f2f2f2] text-black placeholder-transparent font-semibold focus:outline-none border-2 transition-all ${
            errorMessage ? 'border-red-500' : 'border-transparent focus:border-black'
          }`}
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => {
            const input = e.target.value.replace(/\D/g, "");
            if (input.length <= 10) setPhone(input);
          }}
          required
        />
        <label
          htmlFor="phone"
          className="absolute left-[60px] top-[18px] text-[#727272] text-[16px] font-normal bg-[#f2f2f2] px-[4px] transition-all
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

      {/* Continue Button */}
      <button
        onClick={handleClick}
        className="w-full h-[52px] border-2 border-black rounded-[10px] hover:bg-black hover:text-white transition-all font-semibold text-[16px] mt-[24px]"
      >
        Continue For OTP Verification
      </button>

      {/* Messages */}
      {errorMessage && (
        <p className="text-red-500 text-sm font-medium mt-[10px]">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-500 text-sm font-medium mt-[10px]">{successMessage}</p>
      )}

      {/* Alternate Link */}
      <button
        className="mt-[20px] cursor-pointer"
        onClick={() => navigate('/PassRecovery')}
      >
        <span className="text-[#0000ff] text-[14px] font-normal leading-[20px] text-center capitalize">
          Having Trouble Signing In? Just Use Your Email ID Instead!
        </span>
      </button>
    </div>
  </div>
</div>

  );
  
}

export default MobilePassRecovery;
