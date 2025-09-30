import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderPR from "./HeaderPR";

function UsernameSent() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-[url('/forgot_user.png')] bg-cover bg-no-repeat bg-center flex flex-col font-['Arial_Rounded_MT_Bold']">
      <HeaderPR />

      {/* Toggle Buttons */}
      <div className="flex w-[480px] mt-[50px] ml-[440px] pt-[4px] pr-[6px] gap-[10px] pb-[4px] pl-[5px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#f2f2f2] rounded-[40px] relative z-10">
      {/* Forgot Password */}
        <button
          onClick={() => navigate("/ChangePass")}
          className="w-[240px] py-[8px] px-[10px] bg-white text-black rounded-[30px] shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
        >
          <span className="text-[20px] font-semibold leading-[25px] tracking-[0.4px] capitalize">
            Forgot Password
          </span>
        </button>

        {/* Forgot Username */}
        <button
          className="w-[240px] py-[8px] px-[10px] bg-black text-white rounded-[30px] shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
        >
          <span className="text-[20px] font-semibold leading-[25px] tracking-[0.4px] capitalize">
            Forgot Username
          </span>
        </button>
      </div>

      {/* Content Card */}
      <div className="flex justify-center mt-[30px] px-4">
        <div className="bg-white w-[480px] rounded-[20px] px-[32px] py-[40px] text-center shadow-2xl z-20">
          <h2 className="text-[24px] font-normal text-black mb-3 capitalize">
            Username Sent.
          </h2>
          <p
            className="text-[#999] text-[20px] leading-[30px] tracking-[0.4px] capitalize mb-8"
            style={{
              fontFamily: "Arial Rounded MT Bold",
            }}
          >
            Your Username Has Been Sent To Your Registered Email Address. We
            Hope You Find It Easily Accessible.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full border-[2px] border-black text-black text-[16px] py-[14px] rounded-[10px] hover:bg-black hover:text-white transition-all duration-200"
            style={{ fontFamily: "Arial Rounded MT Bold" }}
          >
            Continue To Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsernameSent;
