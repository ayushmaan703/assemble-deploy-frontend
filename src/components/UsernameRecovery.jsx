import React, { useState } from "react";
import axios from "axios"; // Added axios import
import HeaderPR from "./HeaderPR";
import { useNavigate } from "react-router-dom"; // Added useNavigate import

function UsernameRecovery() {
  const navigate = useNavigate(); // Added useNavigate hook

  const [email, setEmail] = useState(""); // Added email state
  const [errorMessage, setErrorMessage] = useState(""); // Added errorMessage state
  const [successMessage, setSuccessMessage] = useState(""); // Added state for success message

  // isForgotPassword state is not needed here as this component is specifically for username recovery
  // const [isForgotPassword, setIsForgotPassword] = useState(true);

  const handleclick = async () => { // Added handleclick function
    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Check if the email is the specific test email
    if (email === '4518gunjanarora@gmail.com') {

      setSuccessMessage("Verification email sent successfully! Redirecting..."); // Set success message
      // Navigate directly to identity-verify for the test email after a short delay
      setTimeout(() => {
        navigate("/UsernameOTP", { state: { email, isForgotPassword: false, testOtp: '000000' } }); // Pass testOtp
        setEmail("");
        setSuccessMessage(""); // Clear success message after navigation
      }, 2000); // Delay navigation by 2 seconds
    } else {
      // Original API call for other emails
      try {
        // Endpoint specific to forget username
        const endpoint = "/api/v1/users/forgetUsernameVerificationEmail";

        const response = await axios.post(endpoint, { email });

        if (response.status === 200 && response.data.success) {

          setSuccessMessage("Verification email sent successfully!"); // Set success message on API success
          // Navigate to identity-verify, indicating it's for username recovery
          // No testOtp needed for real API flow, IdentityVerify handles actual OTP input
          navigate("/identity-verify", { state: { email, isForgotPassword: false } });
          setEmail("");
          // setSuccessMessage(""); // Keep success message visible briefly or clear on next action
        } else {
          setErrorMessage(response.data.message || "Invalid credentials. Please try again.");
        }
      } catch (error) {
        // console.error("Error during API call:", error);
        setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
      }
    }
  };


  return (
    <>
      {/* Main container with username recovery background */}
      <div className="main-container flex w-screen h-screen flex-col justify-between items-center flex-nowrap bg-[url(/forgot_user.png)] bg-cover bg-center bg-no-repeat relative overflow-hidden">
        <HeaderPR />
        {/* Content container - copied structure from PassRecovery */}
        <div className="flex pt-[60px] pr-0 pb-[60px] pl-0 flex-col gap-[24px] justify-center items-center self-stretch grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[8]">
          <div className="flex w-[460px] flex-col gap-[24px] items-start shrink-0 flex-nowrap relative z-[9]">
            {/* Top button section - modified classes to show Username as active */}
            <div className="flex pt-[4px] pr-[8px] gap-[10px] pb-[4px] pl-[5px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#f2f2f2] rounded-[40px] relative z-10">
              {/* Forgot Password Button (inactive in this component) */}
              <button
  className="flex w-[220px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff] text-black rounded-[30px] shadow-[0_8px_20px_0_rgba(0,0,0,0.25)] z-[11]"
  onClick={() => navigate('/PassRecovery')}
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
            {/* Main form box */}
            <div className="flex pt-[34px] pr-[16px] pb-[34px] pl-[16px] flex-col gap-[60px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[20px] border-solid border border-[#fff] relative box-content shadow-[0_16px_20px_0_rgga(0,0,0,0.25)] z-[17]">
              {/* Title and description - username specific */}
              <div className="flex flex-col gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[18]">
                <span className="h-[37px] self-stretch shrink-0 basis-auto font-['Arial_Rounded_MT_Bold'] text-[32px] font-normal leading-[37px] text-[#000] relative text-center capitalize whitespace-nowrap z-[19]">
                  username recovery
                </span>
                <span className="flex w-[448px] ml-[-10px] h-[48px] justify-center items-start self-stretch shrink-0 font-['Arial_Rounded_MT_Bold'] text-[16px] font-normal leading-[24px] text-[#999999] tracking-[0.32px] relative text-center capitalize z-20">
                I know, you can remember clingy words given by your partner but Gamertag not !
                </span>
              </div>
              {/* Input and button section */}
              <div className="flex flex-col gap-[24px] items-center self-stretch shrink-0 flex-nowrap relative z-[21]">
                {/* Input box with label */}
                <div className="relative w-full">
  <input
    type="email"
    id="email"
    required
    className={`peer w-full h-[56px] pt-[20px] px-[23px] text-[16px] rounded-[12px] bg-[#f2f2f2] text-[#000] tracking-[0.64px] font-['Arial_Rounded_MT_Bold'] transition-all placeholder-transparent
      ${errorMessage ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-[#000]'}
      border`}
    placeholder="Email ID"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <label
    htmlFor="email"
    className={`absolute left-[15px] top-[18px] bg-[#f2f2f2] px-[6px] font-['Arial_Rounded_MT_Bold'] text-[16px] text-[#737373] pointer-events-none transition-all duration-200 ease-in-out
      peer-placeholder-shown:top-[18px]
      peer-placeholder-shown:text-[16px]
      peer-focus:top-[5px]
      peer-focus:text-[13px]
      peer-valid:top-[5px]
      peer-valid:text-[13px]`}
  >
    Email ID
  </label>
</div>


 {/* Error message display */}
 {errorMessage && (
                  <p className="error-message text-red-500 text-center">{errorMessage}</p>
                )}
                {/* Success message display */}
                {successMessage && (
                  <p className="success-message text-green-500 text-center">{successMessage}</p>
                )}

                {/* Verify button */}
                <button
                  className="flex h-[55px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[10px] border-solid border-2 border-[#000] relative overflow-hidden z-[24] transition-colors duration-200 hover:bg-black"
                  onClick={handleclick}
                >
                  <span className="flex w-[416px] justify-center items-center self-stretch grow shrink-0 basis-0 font-['Arial_Rounded_MT_Bold'] text-[16px] font-normal leading-[18.516px] text-[#000] tracking-[0.32px] relative text-center capitalize overflow-hidden z-[25] transition-colors duration-200 hover:text-white selection:bg-black selection:text-white">
  Continue For OTP Verification
</span>

                </button>
                
                {/* Mobile number link */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UsernameRecovery;