import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderPR from "./HeaderPR";

function UsernameSentPhone() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-[url('/forgot_user[phone].png')] bg-cover bg-no-repeat bg-center flex flex-col">
      <HeaderPR />

      {/* Toggle Buttons */}
      <div className="flex justify-center mt-24"> {/* Reduced from mt-6 to mt-4 */}
        <div className="flex w-[480px] rounded-full bg-white p-1 shadow-lg">
          <button
            onClick={() => navigate("/ChangePassPhone")}
            className="w-1/2 px-6 py-2 rounded-full text-black bg-white font-semibold text-base"
          >
            Forgot Password
          </button>
          <button
            className="w-1/2 px-6 py-2 rounded-full text-white bg-black font-semibold text-base"
            disabled
          >
            Forgot Username
          </button>
        </div>
      </div>

      {/* Content Box */}
      <div className="flex justify-center items-start px-4 mt-6"> {/* Changed from items-center and flex-1 */}
        <div className="bg-white w-[440px] rounded-2xl px-8 py-10 text-center shadow-2xl">
          {/* Updated heading styles */}
          <h2
            className="text-black text-center text-[24px] font-normal leading-normal capitalize mb-3"
            style={{ fontFamily: '"Arial Rounded MT Bold"' }}
          >
            Username Sent.
          </h2>
          {/* Updated paragraph styles and content */}
          <p
            className="text-[#999] text-[16px] font-normal leading-[30px] capitalize mb-8"
            style={{ fontFamily: '"Arial Rounded MT Bold"', letterSpacing: '0.4px' }}
          >
            Your username has been sent to your <br />
            registered phone number. We hope you find <br />
            it easily accessible.
          </p>
          <button
            onClick={() => navigate("/")}
            className="border border-black text-black font-medium px-6 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-200"
          >
            Continue To Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsernameSentPhone;
