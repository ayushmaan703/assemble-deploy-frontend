import React, { useState } from "react";
import axios from "axios";
import HeaderPR from "./HeaderPR"; // Keep the HeaderPR import
import { useNavigate } from "react-router-dom";

function PassRecovery() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Corrected line
  const [successMessage, setSuccessMessage] = useState(""); // Added state for success message

  // Removed isForgotPassword state as this component is only for password recovery
  // const [isForgotPassword, setIsForgotPassword] = useState(true);

  const handleclick = async () => {
    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Check if the email is the specific test email
    if (email === '4518gunjanarora@gmail.com') {

      setSuccessMessage("Verification email sent successfully! Redirecting..."); // Set success message
      // Navigate directly to identity-verify for the test email after a short delay
      setTimeout(() => {
        navigate("/identity-verify", { state: { email, isForgotPassword: true, testOtp: '000000' } }); // Pass testOtp
        setEmail("");
        setSuccessMessage(""); // Clear success message after navigation
      }, 2000); // Delay navigation by 2 seconds
    } else {
      // Original API call for other emails
      try {
        // Simplified endpoint to only the forgot password one
        const endpoint = "/api/v1/users/forgotPasswordVerificationEmail";

        const response = await axios.post(endpoint, { email });


        if (response.status === 200 && response.data.success) {

          setSuccessMessage("Verification email sent successfully!"); // Set success message on API success
          // Navigate to identity-verify, indicating it's for password recovery
          // No testOtp needed for real API flow, IdentityVerify handles actual OTP input
          navigate("/identity-verify", { state: { email, isForgotPassword: true } });
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
      {/* Main container with only the password recovery background */}
      <div className={`main-container flex w-screen h-screen flex-col justify-between items-center flex-nowrap bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-06/VpQGFad9t0.png)] bg-cover bg-center bg-no-repeat relative overflow-hidden`}>
        <HeaderPR />
        <div className="flex pt-[60px] pb-[60px] pl-0 flex-col gap-[24px] justify-center items-center self-stretch grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[8]">
          <div className="flex w-[500px] flex-col gap-[24px] items-start shrink-0 flex-nowrap relative z-[9]">
            <div className="flex pt-[4px] pr-[8px] gap-[10px] pb-[4px] pl-[5px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#f2f2f2] rounded-[40px] relative z-10">
              {/* Forgot Password Button (active in this component) */}
              <button
                className={`flex w-[240px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#000] text-white rounded-[30px] shadow-[0_8px_20px_0_rgba(0,0,0,0.25)] z-[11]`}
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
                className={`flex w-[240px] pt-[8px] pr-[10px] pb-[8px] pl-[10px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff] text-black rounded-[30px] shadow-[0_8px_20px_0_rgga(0,0,0,0.25)] z-[14]`}
                // Add navigation to the UsernameRecovery component
                onClick={() => navigate('/UsernameRecovery')} // Assuming '/username-recovery' is the route
              >
                <div className="flex gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[15]">
                  <span className="h-[25px] shrink-0 basis-auto font-sourceSans text-[20px] font-semibold leading-[25px] tracking-[0.4px] relative text-left capitalize whitespace-nowrap z-[16]">
                    forgot username
                  </span>
                </div>
              </button>
            </div>
            <div className="flex pt-[34px] ml-[15px] w-[440px] pr-[14px] pb-[34px] pl-[16px] flex-col gap-[60px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[20px] border-solid border border-[#fff] relative box-content shadow-[0_16px_20px_0_rgga(0,0,0,0.25)] z-[17]">
              {/* Title and description - password specific */}
              <div className="flex flex-col gap-[20px] items-center self-stretch shrink-0 flex-nowrap relative z-[18]">
                <span className="h-[37px] self-stretch shrink-0 basis-auto font-['Arial_Rounded_MT_Bold'] text-[32px] font-normal leading-[37px] text-[#000] relative text-center capitalize whitespace-nowrap z-[19]">
                  password recovery
                </span>
                <span className="flex w-[448px] pr-[5px] h-[16px] justify-center items-start self-stretch shrink-0 font-['Arial_Rounded_MT_Bold'] text-[16px] font-normal leading-[24px] letter-spacing-[0.32px] text-[#999999] tracking-[0.32px] relative text-center capitalize z-20">
                  i know, you remember about your partner birthdate but a small password not !
                </span>
              </div>
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


{errorMessage && (
                  <p className="error-message text-red-500 text-center">{errorMessage}</p>
                )}
                {/* Success message display */}
                {successMessage && (
                  <p className="success-message text-green-500 text-center">{successMessage}</p>
                )}


                {/* Continue button */}
                <button
                  className="flex h-[55px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[10px] border-solid border-2 border-[#000] relative overflow-hidden z-[24] transition-colors duration-200 hover:bg-black"
                  onClick={handleclick}
                >
                  <span className="flex w-[416px] justify-center items-center self-stretch grow shrink-0 basis-0 font-['Arial_Rounded_MT_Bold'] text-[16px] font-normal leading-[18.516px] text-[#000] tracking-[0.32px] relative text-center capitalize overflow-hidden z-[25] transition-colors duration-200 hover:text-white">
                    Continue for oTP verification
                  </span>
                </button>
                 {/* Error message display */}
                
                {/* Mobile number link */}
                {/* Wrapped the link text in a button for navigation */}
              </div>
            </div>
          </div>
        </div>  
      </div> {/* Added the missing closing div tag here */}
    </>
  );
}

export default PassRecovery;
