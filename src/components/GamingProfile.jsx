import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const GamingProfile = () => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/");
  };
  return (
    <div className="body">
      <div className="page">
        <Header />
        <form>
          <div className="sign-in-box">
            <div className="container flex-col gap-2">
              <div className="flex flex-row gap-16">
                <div className="back">
                  <IoArrowBackCircleOutline size={28} />
                </div>
                <div className="sign-in-box-heading"> Gaming Profile</div>
              </div>
              <div className="fifty-five h-16 w-16 align-middle ml-[39%] m-2 "></div>
              <div className="head-text">
                First step is completed , do you want to continue setup your
                gaming profile
              </div>
            </div>
            <>
              <div className="Gamingcard h-44     w-full   "></div>
              <button
                type="submit"
                className="sign-in-button bg-black text-white"
                onClick={handleclick}
              >
                CONTINUE
              </button>
            </>
          </div>
        </form>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default GamingProfile;
