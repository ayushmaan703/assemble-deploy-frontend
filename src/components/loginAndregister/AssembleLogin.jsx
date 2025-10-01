import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/ASSEMBLE LOGO SECONDARY 1.svg';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../loginSchema';
import useViewportHeight from '../../hooks/useViewportHeight';
import { googleLogin, loginUser } from '../../redux/features/auth_slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';

const FormPanel = ({
  username, setUsername,
  password, setPassword,
  isLogin, setIsLogin,
  keepSecure, setKeepSecure,
  errors, handleLogin,
  spacingClass, navigate,
  setErrors
}) => {
  // Refs for input fields
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const isLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch()

  const login = useGoogleLogin({
    flow: "auth-code",   // ensures you get an authorization code
    onSuccess: async (response) => {
      try {
        const res = await dispatch(googleLogin(response.code))
        if (res.type === "googleLogin/fulfilled") {
          toast.success("Logged in successfully!");
          navigate("/homepage")
        }
      } catch (err) {
        console.error("Google login failed:", err);
      }
    },
    onError: (err) => console.error("Google login error:", err),
  });

  return (
    <div className="w-full h-full flex flex-col">
      {/* Mobile Banner - Fixed positioning */}
      <div className="block lg:hidden w-full h-[15vh] min-h-[100px] overflow-hidden bg-gray-800">
        <img
          src='./Login Image 01.png'
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full h-full bg-white flex flex-col p-4 lg:p-6 gap-3 lg:gap-5 overflow-y-auto">
        {/* Header */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-3 lg:mb-5 w-full">
            <img src={logo} alt="Logo" className="h-10 lg:h-12 w-auto object-contain" />
            <span className="text-xl lg:text-3xl font-bebas text-BrandColor">ASSEMBLE</span>
          </div>

          {/* Tab Navigation - Fixed button sizing */}
          <div className="flex justify-center w-full h-10 lg:h-12">
            <div className="flex rounded-full p-1 w-full h-full bg-[#F2F2F2]">
              <button
                onClick={() => setIsLogin(true)}
                className={`w-1/2 h-full rounded-full text-[12px] lg:text-[16px] transition-colors ${isLogin
                  ? "bg-gray-900 text-white"
                  : "bg-transparent text-gray-600 hover:bg-gray-300"
                  }`}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/RegisterViaEmail")}
                className={`w-1/2 h-full rounded-full text-[12px] lg:text-[16px] transition-colors ${!isLogin
                  ? "bg-gray-900 text-white"
                  : "bg-transparent text-black hover:bg-gray-300"
                  }`}
              >
                Register
              </button>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full flex-1 flex flex-col justify-between">
          <div className="mb-3 lg:mb-4">
            <h2 className="lg:text-[32px] text-[20px] font-arialrounded text-center">Login</h2>
            <p className="text-center text-gray-500 mt-4 font-arialrounded text-[10px] lg:text-base px-2">
              Hey Gamer, great to have you back! Keep rocking your esports journey and make a name that everyone in the community will remember!
            </p>
          </div>

          <form className="flex flex-col flex-1 pt-2 lg:justify-center" onSubmit={handleLogin}>
            <div className={spacingClass}>
              {/* Username - Fixed input field */}
              <div className="relative">
                <input
                  ref={usernameRef}
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors({ ...errors, username: null });
                  }}
                  className={`peer w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded outline-none ${errors.username ? 'bg-red-100 text-red-700' : 'bg-gray-100'
                    }`}
                  placeholder=" "
                  onFocus={() => {
                    if (errors.username) setErrors({ ...errors, username: null });
                  }}
                />
                <label
                  htmlFor="username"
                  className={`absolute left-3 lg:left-4 transition-all duration-200 pointer-events-none ${username || document.activeElement === usernameRef.current
                    ? 'top-1 text-[10px] font-arialrounded'
                    : 'top-2 lg:top-3 text-[12px] lg:text-[16px] font-arialrounded'
                    } peer-focus:top-1 peer-focus:text-[10px] ${errors.username ? 'text-red-500' : 'text-gray-500'
                    }`}
                >
                  Username
                </label>
                {errors.username && (
                  <p className="text-red-500 text-[10px] mt-0.5 pl-3 lg:pl-4">{errors.username}</p>
                )}
              </div>

              {/* Password - Fixed input field */}
              <div className="relative">
                <input
                  ref={passwordRef}
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                  className={`peer w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded outline-none ${errors.password ? 'bg-red-100 text-red-700' : 'bg-gray-100'
                    }`}
                  placeholder=" "
                  onFocus={() => {
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 lg:left-4 transition-all duration-200 pointer-events-none ${password || document.activeElement === passwordRef.current
                    ? 'top-1 text-[10px]'
                    : 'top-2 lg:top-3 text-[12px] lg:text-[16px] font-arialrounded'
                    } peer-focus:top-1 peer-focus:text-[10px] font-arialrounded ${errors.password ? 'text-red-500' : 'text-gray-500'
                    }`}
                >
                  Password
                </label>
                {errors.password && (
                  <p className="text-red-500 text-[10px] mt-0.5 pl-3 lg:pl-4">{errors.password}</p>
                )}
              </div>

              {/* Keep Secure - Fixed sizing */}
              <div className="flex items-center gap-2 lg:gap-5">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="keepSecure"
                    checked={keepSecure}
                    onChange={(e) => setKeepSecure(e.target.checked)}
                    className="peer hidden"
                  />
                  <div className="w-4 h-4 lg:w-6 lg:h-6 border-2 border-black rounded flex items-center justify-center peer-checked:bg-black">
                    <svg
                      className={`w-3 h-3 ${keepSecure ? 'text-white' : 'text-transparent'}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </label>
                <label
                  htmlFor="keepSecure"
                  className="text-black text-[10px] font-semibold lg:text-sm font-sans cursor-pointer"
                >
                  Kindly ensure that you keep your login credentials secure.
                </label>
              </div>

              {/* Submit */}
              <div className="mt-auto pb-4">
                <button
                  type="submit"
                  className="bg-[#4D4D4D] text-white hover:bg-black py-2 rounded font-arialrounded font-normal text-[12px] lg:text-[16px] w-full flex items-center justify-center"
                // className="flex items-center justify-center gap-2 bg-white hover:bg-black hover:text-white transition-all duration-300 ease-in py-2 border-2 border-black text-black lg:rounded-xl rounded font-arialrounded font-normal text-[12px] lg:text-[20px] w-full"
                >
                  {isLoading ? <Loader /> : "Re-Begin Your Journey"}
                </button>
              </div>
            </div>
          </form>

          {/* Alternative Login Options */}
          <div className="mt-3 lg:mt-4 space-y-2 lg:space-y-3">
            <div className="flex flex-row justify-between text-xs lg:text-sm">
              <span
                className="transition-all duration-300 ease-in font-arialrounded font-normal text-[12px] lg:text-[14px] text-black hover:text-gray-500 cursor-pointer"
                onClick={() => navigate('/LoginViaEmail')}
              >
                Login Via Sign-In Code
              </span>
              <span
                className="transition-all duration-300 ease-in font-arialrounded font-normal text-[12px] lg:text-[14px] text-black hover:text-gray-500 cursor-pointer"
                onClick={() => navigate('/forgotpasswordviaphone')}
              >
                Forgot Credentials
              </span>
            </div>

            <div
              className="w-full h-10 lg:h-12 flex items-center rounded px-3 lg:px-4 gap-1 font-arialrounded font-normal text-xs lg:text-sm justify-center text-gray-500 bg-white border-2 border-[#737373] cursor-pointer"
              onClick={() => (
                // navigate('/LoginViaPhone')
                toast.error("Option Currently Unavailable")
              )}
            >
              <span className="text-[12px] lg:text-[14px]">
                Login With Phone Number
              </span>
            </div>

            <button
              onClick={() => login()}
              className="group w-full h-10 lg:h-12 flex items-center justify-center bg-white hover:bg-blue-50 border-2 border-[#1A1A1A] rounded px-3 lg:px-4 gap-1 ">
              {isLoading ? <Loader /> :
                <>
                  <img
                    src="/icons_google.svg"
                    alt="Google Icon"
                    className="w-4 lg:w-5 h-4 lg:h-5 group-hover:animate-trumble"
                  />
                  <span className="font-arialrounded font-normal text-[12px] lg:text-[14px] leading-none tracking-wider text-black group-hover:animate-trumble">
                    Login With Google
                  </span></>}

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AssembleLogin() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSecure, setKeepSecure] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showFormMobile, setShowFormMobile] = useState(false);
  const isLoading = useSelector((state) => state.auth.loading);
  const viewportHeight = useViewportHeight();
  const getDynamicSpacing = (height) => {
    if (height < 600) return 2;
    if (height < 800) return 2;
    if (height < 1000) return 6;
    return 8;
  };
  const dynamicSpacing = getDynamicSpacing(viewportHeight);

  const spacingClass = {
    2: 'space-y-2',
    4: 'space-y-4',
    6: 'space-y-6',
    8: 'space-y-8',
  }[dynamicSpacing] || 'space-y-2';

  const images = [
    './Login Image 01.png',
    './Login Image 02.png',
    './Login Image 03.png',
    './Login Image 04.png',
    './Login Image 05.png',
    './Login Image 06.png',
    './Login Image 07.png',
    './Login Image 08.png',
    './Login Image 09.png',
    './Login Image 10.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true);
      }, 100);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationResult = loginSchema.safeParse({ username, password });

    if (!validationResult.success) {
      const formattedErrors = {};
      validationResult.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
    } else {
      setErrors({});

      const result = await dispatch(loginUser({ username, password }));
      if (result.type === "auth/loginUser/fulfilled") {
        navigate("/homepage")
      }

    }
  };

  return (
    <>
      {/* MOBILE: art first, then form */}
      <div className="w-full h-screen lg:hidden relative overflow-hidden flex flex-col">
        {!showFormMobile ? (
          <div className="w-full h-[93vh] bg-gray-800 relative">
            <img
              src={images[currentIndex]}
              alt={`Character ${currentIndex + 1}`}
              className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'
                }`}
            />

            {/* carousel dots */}
            <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center gap-2">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                />
              ))}
            </div>

            {/* CTA button */}
            <button
              onClick={() => setShowFormMobile(true)}
              className="absolute left-0 bottom-0 h-16 w-full bg-[#1A1A1A] text-white font-semibold text-base tracking-wide"
            >
              Start Login To Begin Your Journey →
            </button>
          </div>
        ) : (
          <div className="w-full h-full bg-white overflow-y-auto">
            <FormPanel
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              keepSecure={keepSecure}
              setKeepSecure={setKeepSecure}
              errors={errors}
              setErrors={setErrors}
              handleLogin={handleLogin}
              spacingClass={spacingClass}
              navigate={navigate}
            />
          </div>
        )}
      </div>

      {/* DESKTOP: unchanged split layout */}
      <div className="hidden lg:flex w-full h-screen flex-row overflow-hidden">
        {/* Left Panel - Login Form */}
        <div className="w-1/2 h-full overflow-y-auto">
          <FormPanel
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            keepSecure={keepSecure}
            setKeepSecure={setKeepSecure}
            errors={errors}
            setErrors={setErrors}
            handleLogin={handleLogin}
            spacingClass={spacingClass}
            navigate={navigate}
          />
        </div>

        {/* Right Panel - Character Art */}
        <div className="w-1/2 h-full bg-gray-800 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={images[currentIndex]}
              alt={`Character ${currentIndex + 1}`}
              className={`w-full h-auto object-contain transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'
                }`}
            />
          </div>
        </div>
      </div>
    </>
  );
}