import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/ASSEMBLE LOGO SECONDARY 1.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import useViewportHeight from '../../hooks/useViewportHeight';
import checkPattern from "../homepage/Home/check.png";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../redux/features/auth_slices/AuthSlice';
import Loader from "../Loader";
import toast from 'react-hot-toast';

export default function ProfilePicture() {
  const [isLogin, setIsLogin] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();
  const viewportHeight = useViewportHeight();
  const logoInputRef = useRef(null);
  const [previewUrls, setPreviewUrls] = useState({
    file: null,
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    file: null,
  });
  const isloading = useSelector((state) => state?.auth?.loading)

  const logoBoxStyle = {
    width: "160px",
    height: "160px",
    gap: "10px",
    transform: "rotate(0deg)",
    opacity: 1,
    borderRadius: "12px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "white",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100
  };
  const getDynamicSpacing = (height) => {
    if (height < 600) return 2; // `space-y-2`
    if (height < 800) return 4; // `space-y-4`
    if (height < 1000) return 6; // `space-y-6`
    return 8; // `space-y-8`
  };

  const handleFileChange = (type, file) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrls((prev) => ({ ...prev, [type]: reader.result }));
    };
    reader.readAsDataURL(file);
  };
  const dispatch = useDispatch()
  const userId = useSelector((state) => state?.register?.id)
  const handleFileUpload = async () => {
    const res = await dispatch(uploadImage({ uploadedFiles, userId }))
    if (res.type === "uploadImage/fulfilled") {
      navigate("/Personalinfo")
    } else {
      toast.error("error uploading image")
    }
  }

  const dynamicSpacing = getDynamicSpacing(viewportHeight);

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
  }, []);

  return (
    <div className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden">
      {/* Mobile Banner */}
      <div className="block lg:hidden w-full min-h-[60px] max-h-[17vh] top-0 left-0 z-10 overflow-hidden">
        <img
          src="./valorantda.svg"
          alt="Banner"
          className="w-full h-full relative -translate-y-7"
        />
      </div>

      {/* Left Panel - Registration Form with scroll */}
      <div className="w-full lg:w-1/2 h-full bg-white flex flex-col pt-4 lg:pt-6 pb-4 px-4 lg:px-6 gap-3 lg:gap-5 overflow-y-auto">
        {/* Header */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-3 lg:mb-5 w-full h-auto">
            <img
              src={logo}
              alt="Logo"
              className="h-10 lg:h-12 w-10 lg:w-12 object-contain"
            />
            <span className="text-xl lg:text-3xl font-bebas text-BrandColor">
              ASSEMBLE
            </span>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center w-full h-10 lg:h-12">
            <div className="flex rounded-full py-1 px-2 gap-2 w-full h-full bg-[#F2F2F2]">
              <div className="w-full h-full flex items-center justify-center rounded-full px-3 lg:px-6 gap-1 bg-white">
                <button
                  onClick={() => navigate('/')}
                  className="w-full h-full rounded-full lg:text-[16px] text-[12px] text-black"
                >
                  Login
                </button>
              </div>

              <div className="w-full h-full flex items-center justify-center rounded-full px-3 lg:px-6 gap-1 bg-black">
                <button
                  onClick={() => setIsLogin(false)}
                  className="w-full h-full rounded-full lg:text-[16px] text-[12px] text-white"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="w-full flex-1 flex flex-col mt-2">
          <div className="flex flex-col items-center mb-3 lg:mb-4">
            <div className="flex w-full items-center justify-between mb-4">
              <img
                className="w-9 h-9 lg:w-12 lg:h-12 p-2 cursor-pointer"
                src="./Vector.svg"
                alt="Back"
                // onClick={() => navigate('/RegisterUsername')}
              />
              <h2 className="lg:text-[32px] text-[20px] font-normal font-arialrounded text-center">
                The Origin Scroll
              </h2>
              <img
                className="w-[28px] h-[24.6px] lg:w-[48px] lg:h-[42.17px]"
                src="./Echo Elites.svg"
                alt=""
              />
            </div>
            <p className="text-center text-[#999999] font-normal font-arialrounded text-[10px] lg:text-base">
              "Every champion begins with an identity. Reveal yours to claim
              your place in the Legends of Valor. Validate your persona to
              showcase your skills in the competitive gaming world by uploading
              your profile picture."
            </p>
          </div>

          <div
            className={`flex flex-col gap-4 lg:gap-4 flex-1 pt-6 lg:justify-center space-y-${dynamicSpacing}`}
          >
            {/* Profile Picture Upload */}
            <div className="flex justify-center items-center">
              {/* <img
                className="w-[125px] h-[125px] lg:w-44 lg:h-44 rounded-full object-cover border-2 border-gray-300"
                src="./Profile Picture.svg"
                alt="Profile"
              /> */}
              <div
                className="cursor-pointer overflow-hidden shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center"
                style={{
                  ...logoBoxStyle,
                  backgroundImage: `url(${previewUrls.file || checkPattern})`, // use uploaded or default
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => logoInputRef.current.click()}
              >
                {!previewUrls.file && (
                  <>
                    <Plus className="w-8 h-8 text-black" />
                    <div className="text-center">
                      <div className="text-black font-arialrounded text-[16px]">
                        Add Your Avatar
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* Hidden input for logo */}
              <input
                type="file"
                accept="image/*"
                ref={logoInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange("file", e.target.files[0]);
                  }
                }}
              />
            </div>

            {/* Buttons */}
            <div className="mt-auto pb-6 flex flex-col gap-4">
              <div className="flex flex-row gap-4 w-full">
                <button
                  onClick={() =>
                    navigate('/Personalinfo')
                  }
                  className="bg-white border-2 border-black text-black hover:bg-gray-100 h-10 lg:h-auto lg:py-2 rounded-xl font-arialrounded text-[12px] lg:text-[20px] w-full"
                >
                  Skip For Now
                </button>
                <button
                  onClick={() => handleFileUpload()}
                  className="bg-[#4D4D4D] text-white hover:bg-black h-10 lg:h-auto lg:py-2 rounded-xl font-arialrounded text-[12px] lg:text-[20px] w-full"
                >
                  {isloading ? <Loader color='white' /> : "Done"}
                </button>
              </div>
            </div>
          </div>

          {/* Supported Games Section */}
          <div className="mt-12 space-y-2 lg:space-y-3">
            <div className="w-full flex items-center justify-center">
              <span className="font-sans font-semibold text-[10px] lg:text-[20px] tracking-wider text-black">
                Tournament Supported Games
              </span>
            </div>
            <div className="flex justify-between">
              <img src="./PUBG.svg" alt="PUBG" className="w-10 h-10 lg:w-20 lg:h-20" />
              <img src="./Vector 2.svg" alt="Game" className="w-10 h-10 lg:w-20 lg:h-20" />
              <img src="./Valorant3.svg" alt="Valorant" className="w-10 h-10 lg:w-20 lg:h-20" />
              <img src="./Clash Of Clans.svg" alt="Clash of Clans" className="w-10 h-10 lg:w-20 lg:h-20" />
              <img src="./Call of duty mobile.svg" alt="COD Mobile" className="w-10 h-10 lg:w-20 lg:h-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Character Art */}
      <div className="hidden lg:block lg:w-1/2 h-full bg-gray-800 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`Character ${currentIndex + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'
              }`}
          />
        </div>
      </div>
    </div>
  );
}
