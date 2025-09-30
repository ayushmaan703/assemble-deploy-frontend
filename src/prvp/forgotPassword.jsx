import React, { useState, useEffect } from 'react';
import logo from '../assets/ASSEMBLE LOGO SECONDARY 1.svg';
import { TbSquareRoundedChevronsRightFilled } from "react-icons/tb";
import "./forgotPassword.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPasswordViaEmail, forgotPasswordViaEmailSendOtp, forgotPasswordViaEmailVerifyOtp, forgotUserNameViaEmailSendOtp, forgotUserNameViaEmailVerifyOtp } from '../redux/features/auth_slices/AuthSlice';

export const ForgotPassword = () => {
  const [activeTab, setActiveTab] = useState("password");
  const [viaphone, setViaPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notconfirm, setNotConfirm] = useState(true);
  const [Password, setPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [email, setEmail] = useState('');
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (!Password && !notconfirm && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [timer, Password, notconfirm]);

  const handleChange = (e, idx) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleSendOtp = async () => {
    if (activeTab === "password") {
      await dispatch(forgotPasswordViaEmailSendOtp(email))
    }
    else {
      await dispatch(forgotUserNameViaEmailSendOtp(email))
    }
  }

  const handleVerifyOtp = async () => {
    if (activeTab === "password") {
      await dispatch(forgotPasswordViaEmailVerifyOtp({ email, otp: otp.join('') }))
    }
    else {
      await dispatch(forgotUserNameViaEmailVerifyOtp({ email, otp: otp.join('') }))
    }
  }
  const handleForgotCred = async () => {
    if (activeTab === "password") {
      await dispatch(forgotPasswordViaEmail({ email, newPassword: passwordValue }))
      navigate("/")
    }
  }

  return (
    <div className='forgot-password-bg'>
      <div className="navbar-container">
        <div className='header-container flex justify-between items-center w-full'>
          <div className='left-section flex items-center'>
            <img src={logo} width="40" height="40" alt="Logo" />
            <div style={{ color: 'white', marginLeft: '10px', fontWeight: 'bold' }}>ASSEMBLE</div>
          </div>
          <div className='right-section flex items-center'>
            <a href="/" style={{ color: 'white', marginRight: '10px', cursor: 'pointer' }}>Back To Login</a>
            <TbSquareRoundedChevronsRightFilled style={{ height: "30px", width: "30px", cursor: 'pointer', color: 'white' }} />
          </div>
        </div>
      </div>

      {!Password && notconfirm && (
        <>
          <div className="nav mt-28 mx-auto max-w-[400px] flex justify-between items-center bg-white rounded-[30px] shadow-md h-[43px]">
            <button
              type="button"
              className={`btn1 ${activeTab === 'password' ? 'active' : 'inactive'}`}
              onClick={() => setActiveTab('password')}
            >
              Forgot Password
            </button>
            <button
              type="button"
              className={`btn2 ${activeTab === 'username' ? 'active' : 'inactive'}`}
              onClick={() => setActiveTab('username')}
            >
              Forgot Username
            </button>
          </div>

          <div className="nav2 mt-5 w-full flex flex-col items-center pt-10 px-4 text-center mx-auto">
            <h2></h2>
            <span className="text-3xl font-bold">{activeTab === "username" ? "Forgot Username" : "Forgot Password"}</span>
            <span className="mt-2 text-sm text-gray-500">{activeTab === "username" ? "I Know You Remember Clingy Words Given By Your \n Partner But Gamertag Not !" : "I Know, You Remember About Your Partner Birthdate \n But A Small Password Not!"}</span>

            <div className="mt-10 w-full max-w-sm flex items-center border border-gray-300 rounded-lg bg-gray-100 overflow-hidden">
              {viaphone ? (
                <>
                  <span className="px-4 py-2 text-gray-500 bg-gray-100 border-r text-sm font-medium">+91</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setPhoneNumber(value);
                      }
                    }}
                    placeholder="Enter Phone number"
                    className="w-full px-4 py-2 focus:outline-none bg-gray-100"
                  />
                </>
              ) : (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email ID"
                  className="w-full px-4 py-2 focus:outline-none bg-gray-100"
                />
              )}
            </div>

            <button
              type="button"
              className="mt-5 w-full max-w-sm border border-black text-black py-2 rounded-lg font-medium hover:bg-black hover:text-white transition duration-200"
              onClick={() => {
                setNotConfirm(false);
                setTimer(30);
                handleSendOtp()
              }}
            >
              Continue For OTP Verification
            </button>

            <p className="mt-6 text-center text-sm text-blue-600 cursor-pointer">
              {viaphone ? (
                <button className="link" onClick={() => setViaPhone(false)}>
                  Having Trouble Signing in? Just Use Your Email ID Instead!
                </button>
              ) : (
                <button className="link" onClick={() => setViaPhone(true)}>
                  Prefer Using Phone Number? Switch Back!
                </button>
              )}
            </p>
          </div>
        </>
      )}

      {!Password && !notconfirm && (
        <>
          <div className="nav mt-8 mx-auto max-w-[400px] flex justify-between items-center bg-white rounded-[30px] shadow-md h-[43px]">
            <button
              type="button"
              className={`btn1 ${activeTab === 'password' ? 'active' : 'inactive'}`}
              onClick={() => setActiveTab('password')}
            >
              Forgot Password
            </button>
            <button
              type="button"
              className={`btn2 ${activeTab === 'username' ? 'active' : 'inactive'}`}
              onClick={() => setActiveTab('username')}
            >
              Forgot Username
            </button>
          </div>

          <div className="nav2 mt-8 w-full flex flex-col items-center px-5 mx-auto">
            <span className="text-3xl font-bold">Identity Verification</span>
            <span className="mt-2 text-sm text-gray-500 text-center">
              We Will Send You A One-Time Password (OTP) To Your <br />
              Registered {viaphone ? "Phone Number" : "Email Address"}. Please Wait A Few Moments.
            </span>

            <div className="w-full max-w-sm mb-6 flex justify-between items-center mt-5">
              <h2 className="text-l font-bold uppercase">
                Enter OTP FOR <span style={{ color: 'gray', fontSize: '15px', marginLeft: '6px' }}>{viaphone ? `+91-${phoneNumber}` : email}</span>
              </h2>
              <button
                onClick={() => setNotConfirm(true)}
                className="text-gray-600 text-sm  transition"
              >
                CHANGE {viaphone ? "NUMBER" : "EMAIL"}
              </button>
            </div>

            <div className="flex gap-2 justify-center">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  className="w-10 h-12 border bg-gray-100 rounded text-center text-xl"
                />
              ))}
            </div>

            <p
              onClick={() => { handleSendOtp() }}
              className="text-sm text-gray-500 mt-3">
              {timer > 0 ? `Resend OTP in ${timer}s` : "Didn't receive OTP? Resend"}
            </p>

            <button
              type="button"
              className="mt-6 w-full max-w-sm border border-black text-black py-2 rounded-lg font-medium hover:bg-black hover:text-white transition duration-200"
              onClick={() => {
                setPassword(true);
                setNotConfirm(true);
                handleVerifyOtp()
              }}
            >
              Set-Up New Password
            </button>

            <p className="mt-6 text-center text-sm text-blue-600 cursor-pointer">
              {viaphone ? (
                <button className="link" onClick={() => setViaPhone(false)}>
                  Having Trouble Signing in? Just Use Your Email ID Instead!
                </button>
              ) : (
                <button className="link" onClick={() => setViaPhone(true)}>
                  Prefer Using Phone Number? Switch Back!
                </button>
              )}
            </p>
          </div>
        </>
      )}

      {Password && (
        <>
          <div className="nav mt-28 mx-auto max-w-[400px] flex justify-between items-center bg-white rounded-[30px] shadow-md h-[43px]">
            <button
              type="button"
              className={`btn1 ${activeTab === 'password' ? 'active' : 'inactive'}`}
              onClick={() => setActiveTab('password')}
            >
              Forgot Password
            </button>
            <button
              type="button"
              className={`btn2 ${activeTab === 'username' ? 'active' : 'inactive'}`}
              onClick={() => setActiveTab('username')}
            >
              Forgot Username
            </button>
          </div>

          {activeTab === "password" ? (
            <div className="nav2 mt-8 w-full flex flex-col items-center px-5 mx-auto">
              <span className="text-3xl font-bold mb-3">Change Password</span>
              <span className="mt-2 text-sm text-gray-500 text-center">
                Please enter a new password and ensure you remember it.<br />
                We recommend saving it in Google Passwords.
              </span>

              <input
                type="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                placeholder="New Password"
                className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none mt-5"
              />

              {passwordMismatch && (
                <span className="text-red-500 text-sm mt-1">Passwords do not match</span>
              )}

              <div className="w-full max-w-sm mt-4 text-sm text-left text-gray-600">
                <div className="flex items-center gap-2">
                  <span className={passwordValue.length >= 8 ? "text-green-600" : "text-gray-400"}>✔</span>
                  password is at least 8 characters long.
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={/[A-Z]/.test(passwordValue) ? "text-green-600" : "text-gray-400"}>✔</span>
                  must be okay strength or better
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={/[!@#$%^&*]/.test(passwordValue) ? "text-green-600" : "text-gray-400"}>✔</span>
                  password includes two of the following: letters, number, or symbol.
                </div>
              </div>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordMismatch(false);
                }}
                placeholder="Confirm Password"
                className={`w-full max-w-sm px-4 py-2 border ${passwordMismatch ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none mt-3`}
              />
              <button
                type="button"
                onClick={() => {
                  if (passwordValue !== confirmPassword) {
                    setPasswordMismatch(true);
                    return;
                  }
                  handleForgotCred()
                }}
                className="mt-6 w-full max-w-sm border border-black text-black py-2 rounded-lg font-medium hover:bg-black hover:text-white transition duration-200"
              >
                Continue Your Journey
              </button>
            </div>
          ) : (
            <div className="nav2 mt-8 w-full flex flex-col items-center px-5 mx-auto">
              <span className="text-3xl font-bold mb-3">Username Sent</span>
              <span className="mt-2 text-sm text-gray-500 text-center">
                Your Username has Been Sent To Your <br />
                Registered {viaphone ? "Phone Number" : "Email Address"}. We Hope You Find <br />
                it Easily Accessible.
              </span>

              <button
                type="button"
                onClick={() => {
                  navigate("/")
                }}
                className="mt-6 w-full max-w-sm border border-black text-black py-2 rounded-lg font-medium hover:bg-black hover:text-white transition duration-200"
              >
                <Link to="/">Continue To Login</Link>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
