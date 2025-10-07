import React, { useState, useEffect, useRef } from "react";
import UpperNav from "./ui/nav/UpperNav";
import { Sidebar } from "./ui/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  logoutUser,
  updateImage,
  updateUserDetails,
  updateUserName,
  updateUserPassword
} from "../redux/features/auth_slices/AuthSlice";
//dont remove these 4 imports they are being used dynamically 
import { getBgmiGameData, updateBgmiGameData } from "../redux/features/gaming_slices/bgmiSlice";
import { getCodmGameData, updateCodmGameData } from "../redux/features/gaming_slices/codmSlice";
import { getFreefireGameData, updateFreefireGameData } from "../redux/features/gaming_slices/freefireSlice";
import { getValorantGameData, updateValorantGameData } from "../redux/features/gaming_slices/valorantSlice";


// // --- Main Application Components ---

const FloatingLabelInput = ({
  name,
  label,
  value,
  onChange,
  error,
  ...props
}) => {
  const inputTextStyle = {
    fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif",
    letterSpacing: "0.04em",
    fontSize: "16px",
    lineHeight: "100%",
  };
  const labelTextStyle = {
    fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif",
    letterSpacing: "0.04em",
    lineHeight: "100%",
  };
  const commonInputStyles =
    "peer w-full h-full rounded-xl px-6 pt-6 capitalize bg-white text-[#1A1A1A] shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 hover:bg-black hover:text-white transition-colors duration-200";
  const errorStyles = error
    ? "border-2 border-red-500 ring-red-500/20"
    : "focus:ring-cyan-400";
  const commonLabelStyles =
    "absolute top-1/2 left-6 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ease-in-out text-base capitalize peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-[#737373] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#737373]";

  return (
    <div className="w-full h-14">
      <div className="relative h-full">
        <input
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={`${commonInputStyles} ${errorStyles}`}
          style={inputTextStyle}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={name}
          className={commonLabelStyles}
          style={labelTextStyle}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};

const FloatingLabelSelect = ({
  name,
  label,
  value,
  onChange,
  error,
  children,
}) => {
  const textStyle = {
    fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif",
    letterSpacing: "0.04em",
    fontSize: "16px",
    lineHeight: "100%",
  };
  const commonInputStyles =
    "peer w-full h-full rounded-xl px-6 pt-6 capitalize bg-white text-[#1A1A1A] shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 hover:bg-black hover:text-white transition-colors duration-200";
  const errorStyles = error
    ? "border-2 border-red-500 ring-red-500/20"
    : "focus:ring-cyan-400";
  const commonLabelStyles =
    "absolute top-2 left-6 -translate-y-0 text-xs text-[#737373] pointer-events-none transition-all duration-200 ease-in-out";

  return (
    <div className="w-full h-14">
      <div className="relative h-full">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={`${commonInputStyles} ${errorStyles}`}
          style={textStyle}
        >
          {children}
        </select>
        <label
          htmlFor={name}
          className={commonLabelStyles}
          style={{ ...textStyle, fontSize: "12px" }}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};

const NumberSvg = ({ number, isActive }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-200"
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fontFamily="'Arial Rounded MT Bold', Arial, sans-serif"
        fill={isActive ? "white" : "black"}
      >
        {number.toString().padStart(2, "0")}
      </text>
    </svg>
  );
};

const AccountCenter = () => {
  const [activeSection, setActiveSection] = useState("Account Settings");
  const [selectedItem, setselectedItem] = useState("Email Id");
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef(null);
  const gameSelectRef = useRef(null);
  const [mobileStep, setMobileStep] = useState(1); // 1: main sections, 2: subsections, 3: form
  const dispatch = useDispatch();

  const defaultFormData = {
    fullName: "",
    gender: "",
    age: "",
    phoneNumber: "",
    username: "NaxnaGamer",
    email: "naxnager2107@gmail.com",
    newPassword: "",
    confirmPassword: "",
    profilePicture: null,
    country: "",
    state: "",
    pinCode: "",
    addressLine: "",
    tagline: "",
    higherEducation: "",
    instituteName: "",
    course: "",
    startingYear: "",
    endingYear: "",
    educationState: "",
    educationPinCode: "",
    skillLevel: "",
    gamingPlatform: "",
    gamingServer: "",
    youtubeUrl: "",
    discordUrl: "",
    twitchUrl: "",
    otherUrl: "",
    bgmiUid: "",
    bgmiUsername: "",
    bgmiLevel: "",
    bgmiRank: "",
    codmUid: "",
    codmUsername: "",
    codmLevel: "",
    codmRank: "",
    ffmaxUid: "",
    ffmaxUsername: "",
    ffmaxLevel: "",
    ffmaxCsRank: "",
    ffmaxBrRank: "",
    valorantRiotId: "",
    valorantTagline: "",
    valorantLevel: "",
    valorantRank: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [initialFormData, setInitialFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [savedProfilePicture, setSavedProfilePicture] = useState(null);
  const [savedUsername, setSavedUsername] = useState(defaultFormData.username);
  const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);
  const [selectedGames, setSelectedGames] = useState([]);
  const [savedGames, setSavedGames] = useState([]);
  const [isGameSelectOpen, setIsGameSelectOpen] = useState(false);
  const [updatedImage, setUpdateImage] = useState();

  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    strength: false,
    types: false,
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        gameSelectRef.current &&
        !gameSelectRef.current.contains(event.target)
      ) {
        setIsGameSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [gameSelectRef]);

  useEffect(() => {
    const { newPassword } = formData;
    const hasLetters = /[a-zA-Z]/.test(newPassword);
    const hasNumbers = /[0-9]/.test(newPassword);
    const hasSymbols = /[^a-zA-Z0-9]/.test(newPassword);
    const typesCount = [hasLetters, hasNumbers, hasSymbols].filter(
      Boolean
    ).length;
    const isLengthValid = newPassword.length >= 8;
    const areTypesValid = typesCount >= 2;
    const isStrengthOk = isLengthValid && areTypesValid;

    setPasswordValidity({
      length: isLengthValid,
      strength: isStrengthOk,
      types: areTypesValid,
    });
  }, [formData.newPassword]);

  const validateForm = (fieldsToValidate) => {
    const newErrors = {};
    const {
      fullName,
      gender,
      age,
      phoneNumber,
      username,
      newPassword,
      confirmPassword,
      country,
      state,
      pinCode,
      addressLine,
      higherEducation,
      instituteName,
      course,
      startingYear,
      endingYear,
      educationState,
      educationPinCode,
      skillLevel,
      gamingPlatform,
      gamingServer,
      youtubeUrl,
      discordUrl,
      twitchUrl,
      bgmiUid,
      bgmiUsername,
      bgmiLevel,
      bgmiRank,
      codmUid,
      codmUsername,
      codmLevel,
      codmRank,
      ffmaxUid,
      ffmaxUsername,
      ffmaxLevel,
      ffmaxCsRank,
      ffmaxBrRank,
      valorantRiotId,
      valorantTagline,
      valorantLevel,
      valorantRank,
    } = formData;

    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (fieldsToValidate.includes("fullName") && !fullName?.trim())
      newErrors.fullName = "Full name is required.";
    if (fieldsToValidate.includes("gender") && !gender?.trim())
      newErrors.gender = "Gender is required.";
    if (fieldsToValidate.includes("age") && (!age || age <= 12 || age > 100))
      newErrors.age = "Please enter a valid age (13-100).";
    if (
      fieldsToValidate.includes("phoneNumber") &&
      !/^\d{10}$/.test(phoneNumber)
    )
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    if (fieldsToValidate.includes("username") && !username?.trim())
      newErrors.username = "Username is required.";
    if (
      fieldsToValidate.includes("password") &&
      newPassword !== confirmPassword
    )
      newErrors.confirmPassword = "Passwords do not match.";
    if (fieldsToValidate.includes("country") && !country?.trim())
      newErrors.country = "Country is required.";
    if (fieldsToValidate.includes("state") && !state?.trim())
      newErrors.state = "State is required.";
    if (fieldsToValidate.includes("pinCode") && !/^\d{6}$/.test(pinCode))
      newErrors.pinCode = "PIN code must be 6 digits.";
    if (fieldsToValidate.includes("addressLine") && !addressLine?.trim())
      newErrors.addressLine = "Address is required.";
    if (fieldsToValidate.includes("higherEducation") && !higherEducation)
      newErrors.higherEducation = "Please select your education level.";
    if (fieldsToValidate.includes("instituteName") && !instituteName?.trim())
      newErrors.instituteName = "Institute name is required.";
    if (fieldsToValidate.includes("course") && !course?.trim())
      newErrors.course = "Course is required.";
    if (
      fieldsToValidate.includes("startingYear") &&
      (!/^\d{4}$/.test(startingYear) ||
        startingYear < 1950 ||
        startingYear > new Date().getFullYear())
    )
      newErrors.startingYear = "Invalid year.";
    if (
      fieldsToValidate.includes("endingYear") &&
      (!/^\d{4}$/.test(endingYear) || endingYear < 1950)
    )
      newErrors.endingYear = "Invalid year.";
    else if (
      fieldsToValidate.includes("endingYear") &&
      parseInt(endingYear) < parseInt(startingYear)
    )
      newErrors.endingYear = "Ending year cannot be before start year.";
    if (fieldsToValidate.includes("educationState") && !educationState?.trim())
      newErrors.educationState = "State is required.";
    if (
      fieldsToValidate.includes("educationPinCode") &&
      !/^\d{6}$/.test(educationPinCode)
    )
      newErrors.educationPinCode = "PIN code must be 6 digits.";
    if (fieldsToValidate.includes("skillLevel") && !skillLevel?.trim())
      newErrors.skillLevel = "Skill level is required.";
    if (fieldsToValidate.includes("gamingPlatform") && !gamingPlatform?.trim())
      newErrors.gamingPlatform = "Platform is required.";
    if (fieldsToValidate.includes("gamingServer") && !gamingServer?.trim())
      newErrors.gamingServer = "Server is required.";
    if (
      fieldsToValidate.includes("youtubeUrl") &&
      youtubeUrl &&
      !urlRegex?.test(youtubeUrl)
    )
      newErrors.youtubeUrl = "Invalid YouTube URL.";
    if (
      fieldsToValidate.includes("discordUrl") &&
      discordUrl &&
      !urlRegex?.test(discordUrl)
    )
      newErrors.discordUrl = "Invalid Discord URL.";
    if (
      fieldsToValidate.includes("twitchUrl") &&
      twitchUrl &&
      !urlRegex?.test(twitchUrl)
    )
      newErrors.twitchUrl = "Invalid Twitch URL.";
    if (fieldsToValidate.includes("bgmiUid") && !bgmiUid?.trim())
      newErrors.bgmiUid = "BGMI UID is required.";
    if (fieldsToValidate.includes("bgmiUsername") && !bgmiUsername?.trim())
      newErrors.bgmiUsername = "Username is required.";
    if (fieldsToValidate.includes("bgmiLevel") && !bgmiLevel)
      newErrors.bgmiLevel = "Level is required.";
    if (fieldsToValidate.includes("bgmiRank") && !bgmiRank?.trim())
      newErrors.bgmiRank = "Rank is required.";
    if (fieldsToValidate.includes("codmUid") && !codmUid?.trim())
      newErrors.codmUid = "CODM UID is required.";
    if (fieldsToValidate.includes("codmUsername") && !codmUsername?.trim())
      newErrors.codmUsername = "Username is required.";
    if (fieldsToValidate.includes("codmLevel") && !codmLevel)
      newErrors.codmLevel = "Level is required.";
    if (fieldsToValidate.includes("codmRank") && !codmRank?.trim())
      newErrors.codmRank = "Rank is required.";
    if (fieldsToValidate.includes("ffmaxUid") && !ffmaxUid?.trim())
      newErrors.ffmaxUid = "FFMAX UID is required.";
    if (fieldsToValidate.includes("ffmaxUsername") && !ffmaxUsername?.trim())
      newErrors.ffmaxUsername = "Username is required.";
    if (fieldsToValidate.includes("ffmaxLevel") && !ffmaxLevel)
      newErrors.ffmaxLevel = "Level is required.";
    if (fieldsToValidate.includes("ffmaxCsRank") && !ffmaxCsRank?.trim())
      newErrors.ffmaxCsRank = "CS Rank is required.";
    if (fieldsToValidate.includes("ffmaxBrRank") && !ffmaxBrRank?.trim())
      newErrors.ffmaxBrRank = "BR Rank is required.";
    if (fieldsToValidate.includes("valorantRiotId") && !valorantRiotId?.trim())
      newErrors.valorantRiotId = "Riot ID is required.";
    if (fieldsToValidate.includes("valorantTagline") && !valorantTagline?.trim())
      newErrors.valorantTagline = "Tagline is required.";
    if (fieldsToValidate.includes("valorantLevel") && !valorantLevel)
      newErrors.valorantLevel = "Level is required.";
    if (fieldsToValidate.includes("valorantRank") && !valorantRank?.trim())
      newErrors.valorantRank = "Rank is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setUpdateImage(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
        handleInputChange("profilePicture", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfileImage = async () => {
    const file = updatedImage
    await dispatch(updateImage({ file }))
  }

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setErrors({});
    if (section === "Personal Info") {
      setselectedItem("Basic Info");
      setMobileStep(2);
    } else if (section === "Esports Insights") {
      setselectedItem("Game Base");
      setMobileStep(2);
    } else if (section === "Account Settings") {
      setselectedItem("Email Id");
      setMobileStep(2);
    } else if (section === "Educational Center") {
      setselectedItem("School / College Diary");
      setMobileStep(3); // Skip to step 3
    } else {
      setselectedItem(null);
      setMobileStep(2);
    }
  };

  const handleItemClick = (item) => {
    setselectedItem(item);
    setErrors({});
    setMobileStep(3);
  };

  const handleGameSelect = (gameName) => {
    setSelectedGames((prev) =>
      prev.includes(gameName)
        ? prev.filter((g) => g !== gameName)
        : [...prev, gameName]
    );
  };

  const handleNavigation = () => {
    const mainSections = [
      "Account Settings",
      "Personal Info",
      "Educational Center",
      "Esports Insights",
    ];

    const itemsBySection = {
      "Account Settings": [
        "Email Id",
        "Username",
        "Profile Picture",
        "Password And Security",
      ],
      "Personal Info": ["Basic Info", "Address Line"],
      "Educational Center": ["School / College Diary"],
      "Esports Insights": [
        "Game Base",
        "Social Account",
        "Select Games",
        ...savedGames,
      ],
    };

    const currentSectionIndex = mainSections.indexOf(activeSection);
    const currentItems = itemsBySection[activeSection];
    const currentItemIndex = currentItems.indexOf(selectedItem);

    if (currentItemIndex < currentItems.length - 1) {
      setselectedItem(currentItems[currentItemIndex + 1]);
    } else if (currentSectionIndex < mainSections.length - 1) {
      const nextSection = mainSections[currentSectionIndex + 1];
      setActiveSection(nextSection);
      setselectedItem(itemsBySection[nextSection][0]);
    }
  };

  const handleSave = (isChanged, validationFields, type, subType) => {
    if (isChanged) {
      if (validateForm(validationFields)) {
        setInitialFormData(formData);
        const updateThings = async () => {
          switch (type) {
            case "bgmi":
              const data = {
                gameId: formData[validationFields[0]],
                inGameName: formData[validationFields[1]],
                level: formData[validationFields[2]],
                rank: formData[validationFields[3]],
              }
              await dispatch(updateBgmiGameData(data))
              break;
            case "codm":
              const data1 = {
                gameId: formData[validationFields[0]],
                inGameName: formData[validationFields[1]],
                level: formData[validationFields[2]],
                rank: formData[validationFields[3]],
              }
              await dispatch(updateCodmGameData(data1))
              break;
            case "ff":
              const data2 = {
                gameId: formData[validationFields[0]],
                inGameName: formData[validationFields[1]],
                level: formData[validationFields[2]],
                csRank: formData[validationFields[3]],
                rank: formData[validationFields[4]],
              }
              await dispatch(updateFreefireGameData(data2))
              break;
            case "valo":
              const data3 = {
                riotId: formData[validationFields[0]],
                inGameName: formData[validationFields[1]],
                competitiveTier: formData[validationFields[2]],
                rank: formData[validationFields[4]],
              }
              await dispatch(updateValorantGameData(data3))
              break;
            case "user":
              let data4 = {}
              if (subType == "basicInfo") {
                data4 = {
                  fullName: formData[validationFields[0]],
                  gender: formData[validationFields[1]],
                  age: formData[validationFields[2]],
                  phone: formData[validationFields[3]],
                }
              }
              if (subType == "address") {
                data4 = {
                  country: formData[validationFields[0]],
                  state: formData[validationFields[1]],
                  pincode: formData[validationFields[2]],
                  city: formData[validationFields[3]],
                  tagline: formData[validationFields[4]],
                }
              }
              if (subType == "education") {
                data4 = {
                  highestEducation: formData[validationFields[0]],
                  institutionName: formData[validationFields[1]],
                  course: formData[validationFields[2]],
                  startingYear: formData[validationFields[3]],
                  endingYear: formData[validationFields[4]],
                  eduState: formData[validationFields[5]],
                  eduPinCode: formData[validationFields[6]],
                }
              }
              await dispatch(updateUserDetails(data4))
              break;
            case "password":
              const data5 = {
                newPassword: formData[validationFields[1]],
              }
              await dispatch(updateUserPassword(data5))
              break;
            case "userName":
              const data6 = {
                userName: formData[validationFields[0]],
              }
              await dispatch(updateUserName(data6))
              break;
            default: break
          }
        }
        updateThings()
        handleNavigation();
      }
    } else {
      handleNavigation();
    }
  };

  const handleSaveGames = () => {
    setSavedGames(selectedGames);
    setInitialFormData(formData);
    handleNavigation();
  };

  const handleCopyUid = (assembleId) => {
    const uid = assembleId;
    navigator.clipboard.writeText(uid).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const AssembleUidComponent = () => (
    <div className="flex items-center justify-center gap-2 pt-4">
      <span className="AC-text text-sm whitespace-nowrap font-bold text-white">
        {`ASSEMBLE UID: ${user?.assembleId || ""}`}
      </span>
      <div
        onClick={() => handleCopyUid(user?.assembleId)}
        className="cursor-pointer text-white"
      >
        {isCopied ? (
          <div className="flex items-center gap-1.5 text-green-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span className="text-sm font-semibold">Copied!</span>
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
      </div>
    </div>
  );

  const PasswordRequirement = ({ isValid, text }) => (
    <div
      className={`flex items-center text-sm ${isValid ? "text-green-400" : "text-red-400"
        }`}
    >
      {isValid ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      )}
      <span className="ml-2">{text}</span>
    </div>
  );

  const isBasicInfoChanged =
    formData.fullName !== initialFormData.fullName ||
    formData.gender !== initialFormData.gender ||
    formData.age !== initialFormData.age ||
    formData.phoneNumber !== initialFormData.phoneNumber;

  const isUsernameChanged = formData.username !== initialFormData.username;

  const isPasswordChanged =
    formData.newPassword !== "" || formData.confirmPassword !== "";

  const isProfilePictureChanged =
    formData.profilePicture !== initialFormData.profilePicture;

  const isAddressChanged =
    formData.country !== initialFormData.country ||
    formData.state !== initialFormData.state ||
    formData.pinCode !== initialFormData.pinCode ||
    formData.addressLine !== initialFormData.addressLine ||
    formData.tagline !== initialFormData.tagline;

  const isEducationInfoChanged =
    formData.higherEducation !== initialFormData.higherEducation ||
    formData.instituteName !== initialFormData.instituteName ||
    formData.course !== initialFormData.course ||
    formData.startingYear !== initialFormData.startingYear ||
    formData.endingYear !== initialFormData.endingYear ||
    formData.educationState !== initialFormData.educationState ||
    formData.educationPinCode !== initialFormData.educationPinCode;

  const areGamesChanged =
    JSON.stringify([...selectedGames].sort()) !==
    JSON.stringify([...savedGames].sort());

  const isGameBaseChanged =
    formData.skillLevel !== initialFormData.skillLevel ||
    formData.gamingPlatform !== initialFormData.gamingPlatform ||
    formData.gamingServer !== initialFormData.gamingServer;

  const isSocialAccountChanged =
    formData.youtubeUrl !== initialFormData.youtubeUrl ||
    formData.discordUrl !== initialFormData.discordUrl ||
    formData.twitchUrl !== initialFormData.twitchUrl ||
    formData.otherUrl !== initialFormData.otherUrl;

  const isBgmiInfoChanged =
    formData.bgmiUid !== initialFormData.bgmiUid ||
    formData.bgmiUsername !== initialFormData.bgmiUsername ||
    formData.bgmiLevel !== initialFormData.bgmiLevel ||
    formData.bgmiRank !== initialFormData.bgmiRank;

  const isCodmInfoChanged =
    formData.codmUid !== initialFormData.codmUid ||
    formData.codmUsername !== initialFormData.codmUsername ||
    formData.codmLevel !== initialFormData.codmLevel ||
    formData.codmRank !== initialFormData.codmRank;

  const isFfmaxInfoChanged =
    formData.ffmaxUid !== initialFormData.ffmaxUid ||
    formData.ffmaxUsername !== initialFormData.ffmaxUsername ||
    formData.ffmaxLevel !== initialFormData.ffmaxLevel ||
    formData.ffmaxCsRank !== initialFormData.ffmaxCsRank ||
    formData.ffmaxBrRank !== initialFormData.ffmaxBrRank;

  const isValorantInfoChanged =
    formData.valorantRiotId !== initialFormData.valorantRiotId ||
    formData.valorantTagline !== initialFormData.valorantTagline ||
    formData.valorantLevel !== initialFormData.valorantLevel ||
    formData.valorantRank !== initialFormData.valorantRank;

  const availableGames = [
    "Battlegrounds Mobile India",
    "Call of Duty Mobile",
    "Free Fire Max India",
    "Valorant",
  ];

  const handleMobileBack = () => {
    if (mobileStep > 1) {
      if (activeSection === "Educational Center" && mobileStep === 3) {
        setMobileStep(1);
      } else {
        setMobileStep(mobileStep - 1);
      }
    }
  };

  const renderMobileContent = (img) => {

    const sections = {
      "Account Settings": {
        items: [
          "Email Id",
          "Username",
          "Profile Picture",
          "Password And Security",
        ],
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.4l-.15.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.4l-.15.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.4l.15-.08a2 2 0 0 0 .73-2.73l.22-.38a2 2 0 0 0-.73-2.73l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        ),
      },
      "Personal Info": {
        items: ["Basic Info", "Address Line"],
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        ),
      },
      "Educational Center": {
        items: ["School / College Diary"],
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 2 4 8 8 4-8 4-4 8-4-8-8-4 8-4 4-8z"></path>
          </svg>
        ),
      },
      "Esports Insights": {
        items: ["Game Base", "Social Account", "Select Games", ...savedGames],
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 12.5c0-2.5 2-4.5 4.5-4.5h10c2.5 0 4.5 2 4.5 4.5v0c0 2.5-2 4.5-4.5 4.5h-10c-2.5 0-4.5-2-4.5-4.5v0Z"></path>
            <path d="M8 12h8"></path>
            <path d="M12 8v8"></path>
          </svg>
        ),
      },
    };

    if (mobileStep === 1) {
      return (
        <div className="p-4 space-y-4">
          {Object.entries(sections).map(([section, { icon }]) => (
            <div
              key={section}
              onClick={() => handleSectionClick(section)}
              className={`frosted-glass-mobile p-4 rounded-lg flex items-center gap-4 cursor-pointer transition-all duration-300 transform hover:scale-105 border-l-4 ${activeSection === section
                ? "border-cyan-400 bg-white/20"
                : "border-transparent"
                }`}
            >
              {icon}
              <span className="font-semibold">{section}</span>
            </div>
          ))}
        </div>
      );
    }

    if (mobileStep === 2) {
      const currentItems = sections[activeSection]?.items || [];
      return (
        <div className="p-4 space-y-4">
          {currentItems.map((item) => (
            <div
              key={item}
              onClick={() => handleItemClick(item)}
              className={`frosted-glass-mobile p-4 rounded-lg flex items-center gap-4 cursor-pointer transition-all duration-300 transform hover:scale-105 border-l-4 ${selectedItem === item
                ? "border-cyan-400 bg-white/20"
                : "border-transparent"
                }`}
            >
              <span className="font-semibold">{item}</span>
            </div>
          ))}
        </div>
      );
    }

    if (mobileStep === 3) {
      return (
        <div className="p-4">
          <div className="text-white flex flex-col h-full frosted-glass-mobile rounded-lg p-4">
            <div className="flex-grow">
              {activeSection === "Personal Info" &&
                selectedItem === "Basic Info" && (
                  <div className="flex flex-col h-full">
                    {" "}
                    <div>
                      {" "}
                      <div className="AC-head-text">Basic Info</div>{" "}
                      <div className="AC-text ">
                        {" "}
                        Jot Down Your Key Credentials To Get Recognized By
                        Gamers, Organizers, And The Community Worldwide.{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex-grow mt-4 space-y-6">
                      {" "}
                      <FloatingLabelInput
                        name="fullName"
                        label="Full Name"
                        value={formData?.fullName || ""}
                        onChange={handleInputChange}
                        error={errors.fullName}
                      />{" "}
                      <div className="flex flex-col sm:flex-row gap-6">
                        {" "}
                        <FloatingLabelInput
                          name="gender"
                          label="Gender"
                          value={formData?.gender || ""}
                          onChange={handleInputChange}
                          error={errors.gender}
                        />{" "}
                        <FloatingLabelInput
                          name="age"
                          label="Age"
                          type="number"
                          value={formData?.age || ""}
                          onChange={handleInputChange}
                          error={errors.age}
                        />{" "}
                      </div>{" "}
                      <FloatingLabelInput
                        name="phoneNumber"
                        label="Phone Number"
                        type="tel"
                        value={formData?.phoneNumber || ""}
                        onChange={handleInputChange}
                        error={errors.phoneNumber}
                      />{" "}
                    </div>{" "}
                    {isBasicInfoChanged && (
                      <button
                        onClick={() =>
                          handleSave(isBasicInfoChanged, [
                            "fullName",
                            "gender",
                            "age",
                            "phoneNumber",
                          ], "user", "basicInfo")
                        }
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                      >
                        {" "}
                        Save{" "}
                      </button>
                    )}{" "}
                  </div>
                )}
              {activeSection === "Personal Info" &&
                selectedItem === "Address Line" && (
                  <div className="flex flex-col h-full">
                    {" "}
                    <div>
                      {" "}
                      <div className="AC-head-text">Address Line</div>{" "}
                      <div className="AC-text">
                        {" "}
                        Drop your address here so we can suggest tournaments
                        that fit your location, whether online or in-person!{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex-grow mt-4 space-y-6">
                      {" "}
                      <FloatingLabelInput
                        name="country"
                        label="Country"
                        value={formData?.country || ""}
                        onChange={handleInputChange}
                        error={errors.country}
                      />{" "}
                      <div className="flex flex-col sm:flex-row gap-6">
                        {" "}
                        <FloatingLabelInput
                          name="state"
                          label="State"
                          value={formData?.state || ""}
                          onChange={handleInputChange}
                          error={errors.state}
                        />{" "}
                        <FloatingLabelInput
                          name="pinCode"
                          label="PIN Code"
                          type="number"
                          value={formData?.pinCode || ""}
                          onChange={handleInputChange}
                          error={errors.pinCode}
                        />{" "}
                      </div>{" "}
                      <FloatingLabelInput
                        name="addressLine"
                        label="City"
                        value={formData?.addressLine || ""}
                        onChange={handleInputChange}
                        error={errors.addressLine}
                      />{" "}
                      <FloatingLabelInput
                        name="tagline"
                        label="Tagline"
                        value={formData?.tagline || ""}
                        onChange={handleInputChange}
                        error={errors.tagline}
                      />{" "}
                    </div>{" "}
                    {isAddressChanged && (
                      <button
                        onClick={() =>
                          handleSave(isAddressChanged, [
                            "country",
                            "state",
                            "pinCode",
                            "addressLine",
                            "tagline",
                          ], "user", "address")
                        }
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                      >
                        {" "}
                        Save{" "}
                      </button>
                    )}{" "}
                  </div>
                )}
              {activeSection === "Educational Center" &&
                selectedItem === "School / College Diary" && (
                  <div className="flex flex-col h-full">
                    {" "}
                    <div>
                      {" "}
                      <div className="AC-head-text">
                        {" "}
                        School / College Diary{" "}
                      </div>{" "}
                      <div className="AC-text">
                        {" "}
                        Share your education details to help you get a better
                        grasp of your festival games and more!{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex-grow mt-4 space-y-6 overflow-y-auto pr-2">
                      {" "}
                      <FloatingLabelSelect
                        name="higherEducation"
                        label="Higher Education"
                        value={formData?.higherEducation || ""}
                        onChange={handleInputChange}
                        error={errors.higherEducation}
                      >
                        {" "}
                        <option value="">
                          {formData?.higherEducation
                            ? formData.higherEducation
                            : "Select Degree"}
                        </option>{" "}
                        <option value="High School">High School</option>{" "}
                        <option value="Associate Degree">
                          {" "}
                          Associate Degree{" "}
                        </option>{" "}
                        <option value="Bachelor's Degree">
                          {" "}
                          Bachelor's Degree{" "}
                        </option>{" "}
                        <option value="Master's Degree">
                          {" "}
                          Master's Degree{" "}
                        </option>{" "}
                        <option value="Doctorate">Doctorate</option>{" "}
                      </FloatingLabelSelect>{" "}
                      <div className="flex flex-col sm:flex-row gap-6">
                        {" "}
                        <FloatingLabelInput
                          name="instituteName"
                          label="Institute Name"
                          value={formData?.instituteName || ""}
                          onChange={handleInputChange}
                          error={errors.instituteName}
                        />{" "}
                        <FloatingLabelInput
                          name="course"
                          label="Course"
                          value={formData?.course || ""}
                          onChange={handleInputChange}
                          error={errors.course}
                        />{" "}
                      </div>{" "}
                      <div className="flex flex-col sm:flex-row gap-6">
                        {" "}
                        <FloatingLabelInput
                          name="startingYear"
                          label="Starting Year"
                          type="number"
                          value={formData?.startingYear || ""}
                          onChange={handleInputChange}
                          error={errors.startingYear}
                        />{" "}
                        <FloatingLabelInput
                          name="endingYear"
                          label="Ending Year (Expected)"
                          type="number"
                          value={formData?.endingYear || ""}
                          onChange={handleInputChange}
                          error={errors.endingYear}
                        />{" "}
                      </div>{" "}
                      <div className="flex flex-col sm:flex-row gap-6">
                        {" "}
                        <FloatingLabelInput
                          name="educationState"
                          label="State"
                          value={formData?.educationState || ""}
                          onChange={handleInputChange}
                          error={errors.educationState}
                        />{" "}
                        <FloatingLabelInput
                          name="educationPinCode"
                          label="PIN Code"
                          type="number"
                          value={formData?.educationPinCode || ""}
                          onChange={handleInputChange}
                          error={errors.educationPinCode}
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                    {isEducationInfoChanged && (
                      <button
                        onClick={() =>
                          handleSave(isEducationInfoChanged, [
                            "higherEducation",
                            "instituteName",
                            "course",
                            "startingYear",
                            "endingYear",
                            "educationState",
                            "educationPinCode",
                          ], "user", "education")
                        }
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                      >
                        {" "}
                        Save{" "}
                      </button>
                    )}{" "}
                  </div>
                )}
              {activeSection === "Esports Insights" &&
                selectedItem === "Game Base" && (
                  <div className="flex flex-col h-full">
                    {" "}
                    <div>
                      {" "}
                      <div className="AC-head-text">Game Base</div>{" "}
                      <div className="AC-text">
                        {" "}
                        Provide your skill level, gaming platform, and server
                        details to enhance your experience{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex-grow mt-4 space-y-6">
                      {" "}
                      <FloatingLabelInput
                        name="skillLevel"
                        label="Skill Level"
                        value={formData?.skillLevel || ""}
                        onChange={handleInputChange}
                        error={errors.skillLevel}
                      />{" "}
                      <div className="flex flex-col sm:flex-row gap-6">
                        {" "}
                        <FloatingLabelInput
                          name="gamingPlatform"
                          label="Gaming Platform"
                          value={formData?.gamingPlatform || ""}
                          onChange={handleInputChange}
                          error={errors.gamingPlatform}
                        />{" "}
                        <FloatingLabelInput
                          name="gamingServer"
                          label="Gaming Server"
                          value={formData?.gamingServer || ""}
                          onChange={handleInputChange}
                          error={errors.gamingServer}
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                    {isGameBaseChanged && (
                      <button
                        onClick={() =>
                          handleSave(isGameBaseChanged, [
                            "skillLevel",
                            "gamingPlatform",
                            "gamingServer",
                          ], "user")
                        }
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                      >
                        {" "}
                        Save{" "}
                      </button>
                    )}{" "}
                  </div>
                )}
              {activeSection === "Esports Insights" &&
                selectedItem === "Social Account" && (
                  <div className="flex flex-col h-full">
                    {" "}
                    <div>
                      {" "}
                      <div className="AC-head-text">Social Account</div>{" "}
                      <div className="AC-text">
                        {" "}
                        connect your social account to showcase your profiles on
                        assemble{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex-grow mt-4 space-y-6">
                      {" "}
                      <div className="flex flex-col sm:flex-row gap-6">
                        {" "}
                        <FloatingLabelInput
                          name="youtubeUrl"
                          label="YouTube URL"
                          value={formData.youtubeUrl}
                          onChange={handleInputChange}
                          error={errors.youtubeUrl}
                        />{" "}
                        <FloatingLabelInput
                          name="discordUrl"
                          label="Discord URL"
                          value={formData.discordUrl}
                          onChange={handleInputChange}
                          error={errors.discordUrl}
                        />{" "}
                      </div>{" "}
                      <div className="flex flex-col sm:flex-row gap-6">
                        {" "}
                        <FloatingLabelInput
                          name="twitchUrl"
                          label="Twitch URL"
                          value={formData.twitchUrl}
                          onChange={handleInputChange}
                          error={errors.twitchUrl}
                        />{" "}
                        <FloatingLabelInput
                          name="otherUrl"
                          label="Other URL"
                          value={formData.otherUrl}
                          onChange={handleInputChange}
                          error={errors.otherUrl}
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                    {isSocialAccountChanged && (
                      <button
                        onClick={() =>
                          handleSave(isSocialAccountChanged, [
                            "youtubeUrl",
                            "discordUrl",
                            "twitchUrl",
                          ], "user")
                        }
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                      >
                        {" "}
                        Save{" "}
                      </button>
                    )}{" "}
                  </div>
                )}
              {activeSection === "Esports Insights" &&
                selectedItem === "Select Games" && (
                  <div className="flex flex-col h-full">
                    {" "}
                    <div>
                      {" "}
                      <div className="AC-head-text">Select Games</div>{" "}
                      <div className="AC-text">
                        {" "}
                        Link up new games, ditch the old ones, and so much more
                        about gaming!{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex-grow mt-4 space-y-4">
                      {" "}
                      <div className="relative h-14" ref={gameSelectRef}>
                        {" "}
                        <div
                          onClick={() => setIsGameSelectOpen(!isGameSelectOpen)}
                          className={`peer w-full h-full rounded-xl px-6 capitalize bg-white text-[#1A1A1A] shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 hover:bg-black hover:text-white transition-colors duration-200 flex items-center justify-between cursor-pointer ${selectedGames.length > 0 ? "pt-6" : "pt-0"
                            }`}
                        >
                          {" "}
                          <span
                            className="text-base normal-case"
                            style={{
                              fontFamily:
                                "'Arial Rounded MT Bold', Arial, sans-serif",
                              letterSpacing: "0.04em",
                            }}
                          >
                            {" "}
                            {/* Display nothing here, the label handles it */}{" "}
                          </span>{" "}
                          <svg
                            className={`w-5 h-5 transition-transform text-gray-700 ${isGameSelectOpen ? "rotate-180" : ""
                              }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {" "}
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>{" "}
                          </svg>{" "}
                        </div>{" "}
                        <label
                          className={`absolute top-1/2 left-6 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ease-in-out text-base capitalize ${selectedGames.length > 0
                            ? "top-2 -translate-y-0 text-xs text-[#737373]"
                            : ""
                            }`}
                          style={{
                            fontFamily:
                              "'Arial Rounded MT Bold', Arial, sans-serif",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {" "}
                          Select Games{" "}
                        </label>{" "}
                        {isGameSelectOpen && (
                          <div
                            className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-xl shadow-lg"
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            {" "}
                            <ul className="max-h-60 overflow-auto p-2">
                              {" "}
                              {availableGames.map((game) => (
                                <li
                                  key={game}
                                  onClick={() => handleGameSelect(game)}
                                  className="px-4 py-2 text-white hover:bg-gray-700 rounded-lg cursor-pointer flex items-center gap-3"
                                >
                                  {" "}
                                  <input
                                    type="checkbox"
                                    checked={selectedGames.includes(game)}
                                    readOnly
                                    className="w-4 h-4 rounded-sm bg-gray-600 border-gray-500 text-cyan-500 focus:ring-cyan-600"
                                  />{" "}
                                  <span>{game}</span>{" "}
                                </li>
                              ))}{" "}
                            </ul>{" "}
                          </div>
                        )}{" "}
                      </div>{" "}
                      {errors.games && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {" "}
                          {errors.games}{" "}
                        </p>
                      )}{" "}
                      <div className="space-y-2 pt-2">
                        {" "}
                        {selectedGames.map((game) => (
                          <div
                            key={game}
                            className="bg-gray-200 rounded-lg p-3 flex justify-between items-center"
                          >
                            {" "}
                            <span className="text-black font-medium">
                              {" "}
                              {game}{" "}
                            </span>{" "}
                            <button
                              onClick={() => handleGameSelect(game)}
                              className="bg-black text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-800"
                            >
                              {" "}
                              Delete{" "}
                            </button>{" "}
                          </div>
                        ))}{" "}
                      </div>{" "}
                    </div>{" "}
                    {areGamesChanged && (
                      <button
                        onClick={handleSaveGames}
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-auto disabled:bg-gray-500 disabled:cursor-not-allowed"
                        disabled={selectedGames.length === 0}
                      >
                        {" "}
                        Save Selections{" "}
                      </button>
                    )}{" "}
                  </div>
                )}
              {activeSection === "Esports Insights" &&
                selectedItem === "Battlegrounds Mobile India" && (
                  <div className="flex flex-col h-full">
                    {" "}
                    <div>
                      {" "}
                      <div className="AC-head-text">
                        {" "}
                        Battlegrounds Mobile India{" "}
                      </div>{" "}
                      <div className="AC-text ">
                        {" "}
                        Share your BGMI details to easily join scrims and
                        tournaments with pre-filled info!{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex-grow mt-4 space-y-6">
                      {" "}
                      <FloatingLabelInput
                        name="bgmiUid"
                        label="BGMI UID (paste this don't type if empty)"
                        value={formData.bgmiUid}
                        onChange={formData.bgmiUid ? () => { } : handleInputChange}
                        error={errors.bgmiUid}
                      />{" "}
                      <FloatingLabelInput
                        name="bgmiUsername"
                        label="In-Game Username"
                        value={formData.bgmiUsername}
                        onChange={handleInputChange}
                        error={errors.bgmiUsername}
                      />{" "}
                      <div className="flex flex-col sm:flex-row gap-6">
                        {" "}
                        <FloatingLabelInput
                          name="bgmiLevel"
                          label="Level"
                          type="number"
                          value={formData.bgmiLevel}
                          onChange={handleInputChange}
                          error={errors.bgmiLevel}
                        />{" "}
                        <FloatingLabelInput
                          name="bgmiRank"
                          label="Overall Rank"
                          value={formData.bgmiRank}
                          onChange={handleInputChange}
                          error={errors.bgmiRank}
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                    {isBgmiInfoChanged && (
                      <button
                        onClick={() =>
                          handleSave(isBgmiInfoChanged, [
                            "bgmiUid",
                            "bgmiUsername",
                            "bgmiLevel",
                            "bgmiRank",
                          ], "bgmi")
                        }
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                      >
                        {" "}
                        Save{" "}
                      </button>
                    )}{" "}
                  </div>
                )}
              {activeSection === "Esports Insights" &&
                selectedItem === "Call of Duty Mobile" && (
                  <div className="flex flex-col h-full">
                    {" "}
                    <div>
                      {" "}
                      <div className="AC-head-text">
                        {" "}
                        Call of Duty Mobile{" "}
                      </div>{" "}
                      <div className="AC-text ">
                        {" "}
                        Provide your CODM details to quickly enter scrims and
                        tournaments with pre-filled information!{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex-grow mt-4 space-y-6">
                      {" "}
                      <FloatingLabelInput
                        name="codmUid"
                        label="CODM UID (paste this don't type if empty)"
                        value={formData.codmUid}
                        onChange={formData.codmUid ? () => { } : handleInputChange}
                        error={errors.codmUid}
                      />{" "}
                      <FloatingLabelInput
                        name="codmUsername"
                        label="In-Game Username"
                        value={formData.codmUsername}
                        onChange={handleInputChange}
                        error={errors.codmUsername}
                      />{" "}
                      <div className="flex flex-col sm:flex-row gap-6">
                        {" "}
                        <FloatingLabelInput
                          name="codmLevel"
                          label="Level"
                          type="number"
                          value={formData.codmLevel}
                          onChange={handleInputChange}
                          error={errors.codmLevel}
                        />{" "}
                        <FloatingLabelInput
                          name="codmRank"
                          label="Overall Rank"
                          value={formData.codmRank}
                          onChange={handleInputChange}
                          error={errors.codmRank}
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                    {isCodmInfoChanged && (
                      <button
                        onClick={() =>
                          handleSave(isCodmInfoChanged, [
                            "codmUid",
                            "codmUsername",
                            "codmLevel",
                            "codmRank",
                          ], "codm")
                        }
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                      >
                        {" "}
                        Save{" "}
                      </button>
                    )}{" "}
                  </div>
                )}
              {activeSection === "Esports Insights" &&
                selectedItem === "Free Fire Max India" && (
                  <div className="flex flex-col h-full">
                    {" "}
                    <div>
                      {" "}
                      <div className="AC-head-text">
                        {" "}
                        Free Fire Max India{" "}
                      </div>{" "}
                      <div className="AC-text ">
                        {" "}
                        Incorporate FFMax to enhance your tournament experience
                        and competition quality.{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex-grow mt-4 space-y-6">
                      {" "}
                      <FloatingLabelInput
                        name="ffmaxUid"
                        label="FFMAX UID (paste this don't type if empty)"
                        value={formData.ffmaxUid}
                        onChange={formData.ffmaxUid ? () => { } : handleInputChange}
                        error={errors.ffmaxUid}
                      />{" "}
                      <FloatingLabelInput
                        name="ffmaxUsername"
                        label="In-Game Username"
                        value={formData.ffmaxUsername}
                        onChange={handleInputChange}
                        error={errors.ffmaxUsername}
                      />{" "}
                      <div className="flex flex-col sm:flex-row gap-6">
                        {" "}
                        <FloatingLabelInput
                          name="ffmaxLevel"
                          label="Level"
                          type="number"
                          value={formData.ffmaxLevel}
                          onChange={handleInputChange}
                          error={errors.ffmaxLevel}
                        />{" "}
                        <FloatingLabelInput
                          name="ffmaxCsRank"
                          label="CS Rank"
                          value={formData.ffmaxCsRank}
                          onChange={handleInputChange}
                          error={errors.ffmaxCsRank}
                        />{" "}
                        <FloatingLabelInput
                          name="ffmaxBrRank"
                          label="BR Rank"
                          value={formData.ffmaxBrRank}
                          onChange={handleInputChange}
                          error={errors.ffmaxBrRank}
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                    {isFfmaxInfoChanged && (
                      <button
                        onClick={() =>
                          handleSave(isFfmaxInfoChanged, [
                            "ffmaxUid",
                            "ffmaxUsername",
                            "ffmaxLevel",
                            "ffmaxCsRank",
                            "ffmaxBrRank",
                          ], "ff")
                        }
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                      >
                        {" "}
                        Save{" "}
                      </button>
                    )}{" "}
                  </div>
                )}
              {activeSection === "Esports Insights" &&
                selectedItem === "Valorant" && (
                  <div className="flex flex-col h-full">
                    {" "}
                    <div>
                      {" "}
                      <div className="AC-head-text">Valorant</div>{" "}
                      <div className="AC-text ">
                        {" "}
                        Provide your Valorant details to effortlessly join
                        scrims and tournaments with pre-filled information!{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex-grow mt-4 space-y-6">
                      {" "}
                      <FloatingLabelInput
                        name="valorantRiotId"
                        label="Riot ID (paste this don't type if empty)"
                        value={formData.valorantRiotId}
                        onChange={formData.valorantRiotId ? () => { } : handleInputChange}
                        error={errors.valorantRiotId}
                      />{" "}
                      <FloatingLabelInput
                        name="valorantTagline"
                        label="Tagline"
                        value={formData.valorantTagline}
                        onChange={handleInputChange}
                        error={errors.valorantTagline}
                      />{" "}
                      <div className="flex flex-col sm:flex-row gap-6">
                        {" "}
                        <FloatingLabelInput
                          name="valorantLevel"
                          label="Level"
                          type="number"
                          value={formData.valorantLevel}
                          onChange={handleInputChange}
                          error={errors.valorantLevel}
                        />{" "}
                        <FloatingLabelInput
                          name="valorantRank"
                          label="Rank"
                          value={formData.valorantRank}
                          onChange={handleInputChange}
                          error={errors.valorantRank}
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                    {isValorantInfoChanged && (
                      <button
                        onClick={() =>
                          handleSave(isValorantInfoChanged, [
                            "valorantRiotId",
                            "valorantTagline",
                            "valorantLevel",
                            "valorantRank",
                          ], "valo")
                        }
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                      >
                        {" "}
                        Save{" "}
                      </button>
                    )}{" "}
                  </div>
                )}
              {activeSection === "Account Settings" &&
                selectedItem === "Username" && (
                  <div className="flex flex-col h-full">
                    {" "}
                    <div>
                      {" "}
                      <div className="AC-head-text">Username</div>{" "}
                    </div>{" "}
                    <div className="flex-grow mt-4">
                      {" "}
                      <FloatingLabelInput
                        name="username"
                        label="Username"
                        value={formData?.username || ""}
                        onChange={handleInputChange}
                        error={errors.username}
                      />{" "}
                      <p className="text-cyan-400 text-sm mt-2">
                        {" "}
                        Feel free to switch things up after 15 days from your
                        last change!{" "}
                      </p>{" "}
                    </div>{" "}
                    <div className="flex gap-4 mt-auto">
                      {/* {" "}
                      <button
                        onClick={handleCancelUsername}
                        className={`bg-black text-white py-3 px-6 rounded-xl border border-white hover:bg-gray-800 transition-colors font-medium ${isUsernameChanged ? "flex-1" : "w-full"
                          }`}
                      >
                        {" "}
                        Cancel{" "}
                      </button>{" "} */}
                      {isUsernameChanged && (
                        <button
                          onClick={() =>
                            handleSave(isUsernameChanged, ["username"], "userName")
                          }
                          className="flex-1 bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium"
                        >
                          {" "}
                          Save{" "}
                        </button>
                      )}{" "}
                    </div>{" "}
                  </div>
                )}
              {activeSection === "Account Settings" &&
                selectedItem === "Email Id" && (
                  <div className="flex-grow">
                    {" "}
                    <div>
                      {" "}
                      <div className="AC-head-text">Email Id</div>{" "}
                      <div className="AC-text ">
                        {" "}
                        You can catch all kinds of notifications about esports
                        tournaments and series!{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="mt-4">
                      {" "}
                      <FloatingLabelInput
                        name="email"
                        label="Email ID"
                        value={formData?.email || ""}
                        onChange={() => { }}
                        error={errors.email}
                        disabled
                      />{" "}
                      <p className="text-red-500 text-sm mt-2">
                        {" "}
                        You cannot change this mail id because its your primary
                        login credential{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>
                )}
              {activeSection === "Account Settings" &&
                selectedItem === "Profile Picture" && (
                  <div className="flex flex-col items-center gap-5 h-full">
                    {" "}
                    <div className="AC-head-text"> Profile Picture</div>{" "}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />{" "}
                    <div className="flex-grow flex items-center justify-center w-full">
                      {" "}
                      <div className="h-64 w-64 bg-white/20 rounded-full border border-gray-500 flex items-center justify-center overflow-hidden">
                        {" "}
                        {profilePicturePreview ? (
                          <img
                            src={profilePicturePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={img}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        )}{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="w-full flex flex-col gap-3">
                      {" "}
                      <button
                        onClick={() => fileInputRef.current.click()}
                        className="bg-white text-black py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                      >
                        {" "}
                        Add new profile picture{" "}
                      </button>{" "}
                      {isProfilePictureChanged && (
                        <button
                          onClick={() => (
                            handleSave(isProfilePictureChanged, []),
                            updateProfileImage())
                          }
                          className="bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium"
                        >
                          {" "}
                          Save{" "}
                        </button>
                      )}{" "}
                    </div>{" "}
                  </div>
                )}
              {activeSection === "Account Settings" &&
                selectedItem === "Password And Security" && (
                  <div className="flex flex-col h-full">
                    {" "}
                    <div className="flex-grow">
                      {" "}
                      <div className="AC-head-text">
                        {" "}
                        Password & Security{" "}
                      </div>{" "}
                      <div className="AC-text ">
                        {" "}
                        Keep your password a secret! Use a blend of letters,
                        numbers, and symbols. Steer clear of easy picks like
                        your pet's name or birthday, and update it often to stay
                        ahead of hackers!{" "}
                      </div>{" "}
                      <div className="flex-col space-y-6 mt-4">
                        {" "}
                        <FloatingLabelInput
                          name="newPassword"
                          label="New Password"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          error={errors.newPassword}
                        />{" "}
                        <div className="space-y-1">
                          {" "}
                          <PasswordRequirement
                            isValid={passwordValidity.length}
                            text="Password is at least 8 characters long"
                          />{" "}
                          <PasswordRequirement
                            isValid={passwordValidity.strength}
                            text="Must be okay strength or better"
                          />{" "}
                          <PasswordRequirement
                            isValid={passwordValidity.types}
                            text="Includes two of: letters, numbers, symbols"
                          />{" "}
                        </div>{" "}
                        <FloatingLabelInput
                          name="confirmPassword"
                          label="Confirm New Password"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          error={errors.confirmPassword}
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                    {isPasswordChanged && (
                      <button
                        onClick={() =>
                          handleSave(isPasswordChanged, [
                            "newPassword",
                            "confirmPassword",
                          ], "password")
                        }
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-auto"
                      >
                        {" "}
                        Save{" "}
                      </button>
                    )}{" "}
                  </div>
                )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getMobileHeaderTitle = () => {
    if (mobileStep === 1) return "Account Center";
    if (mobileStep === 2) return activeSection;
    if (mobileStep === 3) return selectedItem;
    return "Account Center";
  };

  //db connection
  const gamesToSend = {
    "Battlegrounds Mobile India": "Bgmi",
    "Call of Duty Mobile": "Codm",
    "Free Fire Max India": "Freefire",
    "Valorant": "Valorant",
  }

  const id = useSelector((state) => state.auth.user?._id);
  const user = useSelector((state) => state.auth.userData);
  const bgmiData = useSelector((state) => state.bgmi?.games?.bgmi)
  const codmData = useSelector((state) => state.codm?.games?.codm)
  const ffData = useSelector((state) => state.freefire?.games?.freefire)
  const valoData = useSelector((state) => state.valorant?.games?.valorant)

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        await dispatch(getUserData(id));
      };
      fetchData();
      setFormData((prev) => ({ ...prev, fullName: user?.fullName || "xyz" }));
      setFormData((prev) => ({ ...prev, username: user?.username }));
      setFormData((prev) => ({ ...prev, email: user?.email }));
      setFormData((prev) => ({ ...prev, gender: user?.gender }));
      setFormData((prev) => ({ ...prev, age: user.age || "0" }));
      setFormData((prev) => ({ ...prev, phoneNumber: user?.phone || "0" }));
      setFormData((prev) => ({ ...prev, country: user?.country || "xyz" }));
      setFormData((prev) => ({ ...prev, state: user?.state || "xyz" }));
      setFormData((prev) => ({ ...prev, pinCode: user?.pinCode || "0" }));
      setFormData((prev) => ({ ...prev, city: user?.city || "xyz" }));
      setFormData((prev) => ({ ...prev, tagline: user?.tagline || "xyz" }));
      setFormData((prev) => ({ ...prev, higherEducation: user?.education?.highestEducation || "xyz" }));
      setFormData((prev) => ({ ...prev, instituteName: user?.education?.institutionName || "xyz" }));
      setFormData((prev) => ({ ...prev, course: user?.education?.course || "xyz" }));
      setFormData((prev) => ({ ...prev, startingYear: user?.education?.startingYear || "0000" }));
      setFormData((prev) => ({ ...prev, endingYear: user?.education?.endingYear || "0000" }));
      setFormData((prev) => ({ ...prev, educationPinCode: user?.education?.eduPinCode || "000000" }));
      setFormData((prev) => ({ ...prev, educationState: user?.education?.eduState || "xyz" }));
      setFormData((prev) => ({ ...prev, skillLevel: user?.skillLevel || "1" }));
      setFormData((prev) => ({ ...prev, gamingPlatform: user?.gamingPlatform || "mobile" }));
      setFormData((prev) => ({ ...prev, gamingServer: user?.gamingServer || "asia" }));
    }
  }, [dispatch, id, activeSection, selectedItem]);

  const gameFunctions = {
    Bgmi: getBgmiGameData,
    Codm: getCodmGameData,
    Freefire: getFreefireGameData,
    Valorant: getValorantGameData,
  };
  useEffect(() => {
    const fetch = async () => {
      await Promise.all(
        selectedGames.map((game) => {
          const gameKey = gamesToSend[game];
          const func = gameFunctions[gameKey];
          if (func) {
            return dispatch(func({ userId: id }));
          }
          return Promise.resolve(null);
        }).filter(Boolean)
      );
    }
    (selectedGames.length > 0) && fetch()
    setFormData((prev) => ({ ...prev, bgmiUid: bgmiData?.gameId }));
    setFormData((prev) => ({ ...prev, bgmiUsername: bgmiData?.inGameName }));
    setFormData((prev) => ({ ...prev, bgmiLevel: bgmiData?.level }));
    setFormData((prev) => ({ ...prev, bgmiRank: bgmiData?.rank }));
    setFormData((prev) => ({ ...prev, codmUid: codmData?.gameId }));
    setFormData((prev) => ({ ...prev, codmUsername: codmData?.inGameName }));
    setFormData((prev) => ({ ...prev, codmLevel: codmData?.level }));
    setFormData((prev) => ({ ...prev, codmRank: codmData?.rank }));
    setFormData((prev) => ({ ...prev, ffmaxUid: ffData?.gameId }));
    setFormData((prev) => ({ ...prev, ffmaxUsername: ffData?.inGameName }));
    setFormData((prev) => ({ ...prev, ffmaxLevel: ffData?.level }));
    setFormData((prev) => ({ ...prev, ffmaxBrRank: ffData?.rank }));
    setFormData((prev) => ({ ...prev, ffmaxCsRank: ffData?.csRank }));
    setFormData((prev) => ({ ...prev, valorantRiotId: valoData?.riotId }));
    setFormData((prev) => ({ ...prev, valorantTagline: valoData?.inGameName }));
    setFormData((prev) => ({ ...prev, valorantLevel: valoData?.level }));
    setFormData((prev) => ({ ...prev, valorantRank: valoData?.competitiveTier }));
  }, [dispatch, selectedGames, activeSection, selectedItem])

  const handleLogout = async () => {
    const res = await dispatch(logoutUser())
    if (res.type === "auth/logoutUser/fulfilled") {
      window.location.href = "/";
    }
  };

  // Render a loading state until user data is available
  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
        Loading Account Center...
      </div>
    );
  }

  return (
    <>
      {/* ====================================================================== */}
      {/* ======================= LAPTOP RESPONSIVE CODE ======================= */}
      {/* ====================================================================== */}
      <div className="hidden lg:block">
        <div className="ACMAIN relative h-screen">
          <style>{`
       .frosted-glass {
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
       }
       .AC-head-text { font-size: 1.5rem; font-weight: bold; }
       .AC-text { font-size: 0.9rem; color: #E0E0E0; }
       .AC-span { color: #3b82f6; }
       .personal-info, .per-info-options { border-radius: 0.5rem; }
       input::-webkit-outer-spin-button,
       input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
       }
       input[type=number] {
        -moz-appearance: textfield;
       }
      `}</style>
          <div className="absolute inset-0 bg-black bg-opacity-35"></div>
          <UpperNav
            name="Account Center"
            username={savedUsername}
            profilePicture={savedProfilePicture}
            onProfileClick={() =>
              setIsProfileCardVisible(!isProfileCardVisible)
            }
          />
          {isProfileCardVisible && (
            <ProfileCard
              username={savedUsername}
              profilePicture={savedProfilePicture}
            />
          )}
          <Sidebar />
          <div className="absolute inset-0 flex flex-wrap justify-center items-center mt-[100px] gap-5 ">
            <div className="frosted-glass -mt-14 h-[98%] w-[22%] rounded-lg p-3 ml-12 relative">
              <div className="AC-head-text text-white">Account Center</div>
              <div className="AC-text text-white">
                {" "}
                Take a look at your Esports career and personal info, and enjoy
                the awesome vibe of tournaments with{" "}
                <span className="AC-span">Assemble!</span>{" "}
              </div>
              <div className="mt-8 space-y-4">
                <div
                  className={`flex items-center gap-3 personal-info pl-2 pt-2 pb-2 w-full cursor-pointer ${activeSection === "Account Settings"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                    }`}
                  onClick={() => handleSectionClick("Account Settings")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.4l-.15.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.4l-.15.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.4l.15-.08a2 2 0 0 0 .73-2.73l.22-.38a2 2 0 0 0-.73-2.73l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>{" "}
                  <span>Account Settings</span>{" "}
                </div>
                <div
                  className={`flex items-center gap-3 personal-info pl-2 pt-2 pb-2 w-full cursor-pointer ${activeSection === "Personal Info"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                    }`}
                  onClick={() => handleSectionClick("Personal Info")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>{" "}
                  <span>Personal Info</span>{" "}
                </div>
                <div
                  className={`flex items-center gap-3 personal-info pl-2 pt-2 pb-2 w-full cursor-pointer ${activeSection === "Educational Center"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                    }`}
                  onClick={() => handleSectionClick("Educational Center")}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 2 4 8 8 4-8 4-4 8-4-8-8-4 8-4 4-8z"></path>
                  </svg>{" "}
                  <span>Educational Center</span>{" "}
                </div>
                <div
                  className={`flex items-center gap-3 personal-info pl-2 pt-2 pb-2 w-full cursor-pointer ${activeSection === "Esports Insights"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                    }`}
                  onClick={() => handleSectionClick("Esports Insights")}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 12.5c0-2.5 2-4.5 4.5-4.5h10c2.5 0 4.5 2 4.5 4.5v0c0 2.5-2 4.5-4.5 4.5h-10c-2.5 0-4.5-2-4.5-4.5v0Z"></path>
                    <path d="M8 12h8"></path>
                    <path d="M12 8v8"></path>
                  </svg>{" "}
                  <span>Esports Insights</span>{" "}
                </div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 px-3">
                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center items-center p-3 bg-black bg-opacity-50 cursor-pointer rounded-lg"
                >
                  <span className="text-red-500 font-bold text-lg tracking-widest">
                    LOGOUT
                  </span>
                  <svg
                    className="ml-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 4.5L13.5 3L4.5 12L13.5 21L15 19.5L7.5 12L15 4.5Z"
                      transform="rotate(180 12 12)"
                      fill="#FF0000"
                    />
                    <path d="M9 11H21V13H9V11Z" fill="#FF0000" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="frosted-glass -mt-14 h-[98%] w-[22%] rounded-lg p-3">
              {/* Column 2 Content */}
              {activeSection === "Account Settings" && (
                <>
                  <div className="AC-head-text text-white">
                    Account Settings
                  </div>
                  <div className="AC-text text-white">
                    {" "}
                    Use a strong, unique password to safeguard your credentials.
                    Keep your login details private and regularly check your
                    privacy settings.{" "}
                  </div>
                  <div className="mt-4 space-y-4">
                    <div
                      className={`flex items-center gap-3 per-info-options pl-2 pt-2 pb-2 w-full cursor-pointer ${selectedItem === "Email Id"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                        }`}
                      onClick={() => handleItemClick("Email Id")}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>Email Id</span>
                    </div>
                    <div
                      className={`flex items-center gap-3 per-info-options pl-2 pt-2 pb-2 w-full cursor-pointer ${selectedItem === "Username"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                        }`}
                      onClick={() => handleItemClick("Username")}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>{" "}
                      <span>Username</span>
                    </div>
                    <div
                      className={`flex items-center gap-3 per-info-options pl-2 pt-2 pb-2 w-full cursor-pointer ${selectedItem === "Profile Picture"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                        }`}
                      onClick={() => handleItemClick("Profile Picture")}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>{" "}
                      <span>Profile Picture</span>
                    </div>
                    <div
                      className={`flex items-center gap-3 per-info-options pl-2 pt-2 pb-2 w-full cursor-pointer ${selectedItem === "Password And Security"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                        }`}
                      onClick={() => handleItemClick("Password And Security")}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>{" "}
                      <span>Password & Security</span>
                    </div>
                  </div>
                </>
              )}
              {activeSection === "Personal Info" && (
                <>
                  <div className="AC-head-text text-white">
                    {" "}
                    Personal Information{" "}
                  </div>
                  <div className="AC-text text-white ">
                    {" "}
                    Your Personal Information Remain Private To You And Persons
                    You Are Allowing To Show To Credentials, Read Privacy Policy{" "}
                  </div>
                  <div className="space-y-4 mt-4">
                    <div
                      className={`flex items-center gap-3 per-info-options pl-2 pt-2 pb-2 w-full cursor-pointer ${selectedItem === "Basic Info"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                        }`}
                      onClick={() => handleItemClick("Basic Info")}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                        <path d="M10 9H8"></path>
                        <path d="M16 13H8"></path>
                        <path d="M16 17H8"></path>
                      </svg>{" "}
                      <span>Basic Info</span>{" "}
                    </div>
                    <div
                      className={`flex items-center gap-3 per-info-options pl-2 pt-2 pb-2 w-full cursor-pointer ${selectedItem === "Address Line"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                        }`}
                      onClick={() => handleItemClick("Address Line")}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>{" "}
                      <span>Address Line</span>{" "}
                    </div>
                  </div>
                </>
              )}
              {activeSection === "Educational Center" && (
                <>
                  <div className="AC-head-text text-white">
                    Educational Center
                  </div>
                  <div className="AC-text text-white">
                    Your educational information is kept confidential and shared
                    only with those you authorize. Please review the{" "}
                    <span className="AC-span">privacy policy</span> for more
                    details.
                  </div>
                  <div className="space-y-4 mt-4">
                    <div
                      className={`flex items-center gap-3 per-info-options pl-2 pt-2 pb-2 w-full cursor-pointer ${selectedItem === "School / College Diary"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                        }`}
                      onClick={() => handleItemClick("School / College Diary")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                      <span>School / College Diary</span>
                    </div>
                  </div>
                </>
              )}
              {activeSection === "Esports Insights" && (
                <>
                  <div className="AC-head-text text-white">Esports Insight</div>
                  <div className="AC-text text-white">
                    Your gaming credentials are securely stored and only shared
                    with your approved contacts. Check out our{" "}
                    <span className="AC-span">privacy policy</span> for further
                    information.
                  </div>
                  <div className="space-y-4 mt-4">
                    <div
                      className={`flex items-center gap-3 per-info-options pl-2 py-2 w-full cursor-pointer ${selectedItem === "Game Base"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                        }`}
                      onClick={() => handleItemClick("Game Base")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.5 17.5 16 16.25V15H8v1.25L6.5 17.5" />
                        <path d="M12 15v-4" />
                        <rect width="20" height="12" x="2" y="3" rx="2" />
                        <path d="M8 7h1" />
                        <path d="M15 7h1" />
                      </svg>
                      <span>Game Base</span>
                    </div>
                    <div
                      className={`flex items-center gap-3 per-info-options pl-2 py-2 w-full cursor-pointer ${selectedItem === "Social Account"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                        }`}
                      onClick={() => handleItemClick("Social Account")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
                      </svg>
                      <span>Social Account</span>
                    </div>
                    <div
                      className={`flex items-center gap-3 per-info-options pl-2 py-2 w-full cursor-pointer ${selectedItem === "Select Games"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                        }`}
                      onClick={() => handleItemClick("Select Games")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                      <span>
                        {savedGames.length > 0
                          ? "Selected Games"
                          : "Select Games"}
                      </span>
                    </div>
                    {savedGames.map((game, index) => (
                      <div
                        key={game}
                        onClick={() => handleItemClick(game)}
                        className="group flex items-stretch gap-2 w-full cursor-pointer"
                      >
                        <div
                          className={`flex items-center justify-center p-2 rounded-lg transition-colors duration-200 ${selectedItem === game ? "bg-black" : "bg-white"
                            }`}
                        >
                          <NumberSvg
                            number={index + 1}
                            isActive={selectedItem === game}
                          />
                        </div>
                        <div
                          className={`flex-grow flex items-center px-4 py-2 rounded-lg font-normal transition-colors duration-200 min-w-0 ${selectedItem === game
                            ? "bg-white text-black"
                            : "bg-black text-white group-hover:bg-gray-800"
                            }`}
                        >
                          <span className="truncate">{game}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col -mt-14 h-[98%] w-[44%] gap-4">
              <div className="frosted-glass h-full flex-grow rounded-lg p-6">
                <div className="text-white flex flex-col h-full">
                  <div className="flex-grow">
                    {activeSection === "Personal Info" &&
                      selectedItem === "Basic Info" && (
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="AC-head-text">Basic Info</div>
                            <div className="AC-text ">
                              Jot Down Your Key Credentials To Get Recognized By
                              Gamers, Organizers, And The Community Worldwide.
                            </div>
                          </div>
                          <div className="flex-grow mt-4 space-y-6">
                            <FloatingLabelInput
                              name="fullName"
                              label="Full Name"
                              value={formData?.fullName || ""}
                              onChange={handleInputChange}
                              error={errors.fullName}
                            />
                            <div className="flex gap-6">
                              <FloatingLabelInput
                                name="gender"
                                label="Gender"
                                value={formData?.gender || ""}
                                onChange={handleInputChange}
                                error={errors.gender}
                              />
                              <FloatingLabelInput
                                name="age"
                                label="Age"
                                type="number"
                                value={formData?.age || ""}
                                onChange={handleInputChange}
                                error={errors.age}
                              />
                            </div>
                            <FloatingLabelInput
                              name="phoneNumber"
                              label="Phone Number"
                              type="number"
                              value={formData?.phoneNumber || ""}
                              onChange={handleInputChange}
                              error={errors.phoneNumber}
                            />
                          </div>
                          {isBasicInfoChanged && (
                            <button
                              onClick={() =>
                                handleSave(isBasicInfoChanged, [
                                  "fullName",
                                  "gender",
                                  "age",
                                  "phoneNumber",
                                ], "user", "basicInfo")
                              }
                              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                            >
                              Save
                            </button>
                          )}
                        </div>
                      )}
                    {activeSection === "Personal Info" &&
                      selectedItem === "Address Line" && (
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="AC-head-text">Address Line</div>
                            <div className="AC-text">
                              Drop your address here so we can suggest
                              tournaments that fit your location, whether online
                              or in-person!
                            </div>
                          </div>
                          <div className="flex-grow mt-4 space-y-6">
                            <FloatingLabelInput
                              name="country"
                              label="Country"
                              value={formData?.country || ""}
                              onChange={handleInputChange}
                              error={errors.country}
                            />
                            <div className="flex gap-6">
                              <FloatingLabelInput
                                name="state"
                                label="State"
                                value={formData?.state || ""}
                                onChange={handleInputChange}
                                error={errors.state}
                              />
                              <FloatingLabelInput
                                name="pinCode"
                                label="PIN Code"
                                type="number"
                                value={formData?.pinCode || ""}
                                onChange={handleInputChange}
                                error={errors.pinCode}
                              />
                            </div>
                            <FloatingLabelInput
                              name="addressLine"
                              label="City"
                              value={formData?.city || ""}
                              onChange={handleInputChange}
                              error={errors.addressLine}
                            />
                            <FloatingLabelInput
                              name="tagline"
                              label="Tagline"
                              value={formData?.tagline || ""}
                              onChange={handleInputChange}
                              error={errors.tagline}
                            />
                          </div>
                          {isAddressChanged && (
                            <button
                              onClick={() =>
                                handleSave(isAddressChanged, [
                                  "country",
                                  "state",
                                  "pinCode",
                                  "addressLine",
                                  "tagline",
                                ], "user", "address")
                              }
                              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                            >
                              Save
                            </button>
                          )}
                        </div>
                      )}
                    {activeSection === "Educational Center" &&
                      selectedItem === "School / College Diary" && (
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="AC-head-text">
                              School / College Diary
                            </div>
                            <div className="AC-text">
                              Share your education details to help you get a
                              better grasp of your festival games and more!
                            </div>
                          </div>
                          <div className="flex-grow mt-4 space-y-6 overflow-y-auto pr-2">
                            <FloatingLabelSelect
                              name="higherEducation"
                              label="Higher Education"
                              value={formData?.higherEducation || ""}
                              onChange={handleInputChange}
                              error={errors.higherEducation}
                            >
                              <option value="">
                                {formData?.higherEducation
                                  ? formData.higherEducation
                                  : "Select Degree"}
                              </option>
                              <option value="High School">High School</option>
                              <option value="Associate Degree">
                                Associate Degree
                              </option>
                              <option value="Bachelor's Degree">
                                Bachelor's Degree
                              </option>
                              <option value="Master's Degree">
                                Master's Degree
                              </option>
                              <option value="Doctorate">Doctorate</option>
                            </FloatingLabelSelect>
                            <div className="flex gap-6">
                              <FloatingLabelInput
                                name="instituteName"
                                label="Institute Name"
                                value={formData?.instituteName || ""}
                                onChange={handleInputChange}
                                error={errors.instituteName}
                              />
                              <FloatingLabelInput
                                name="course"
                                label="Course"
                                value={formData?.course || ""}
                                onChange={handleInputChange}
                                error={errors.course}
                              />
                            </div>
                            <div className="flex gap-6">
                              <FloatingLabelInput
                                name="startingYear"
                                label="Starting Year"
                                // type="number"
                                value={formData?.startingYear || ""}
                                onChange={handleInputChange}
                                error={errors.startingYear}
                              />
                              <FloatingLabelInput
                                name="endingYear"
                                label="Ending Year (Expected)"
                                // type="number"
                                value={formData?.endingYear || ""}
                                onChange={handleInputChange}
                                error={errors.endingYear}
                              />
                            </div>
                            <div className="flex gap-6">
                              <FloatingLabelInput
                                name="educationState"
                                label="State"
                                value={formData?.educationState || ""}
                                onChange={handleInputChange}
                                error={errors.educationState}
                              />
                              <FloatingLabelInput
                                name="educationPinCode"
                                label="PIN Code"
                                // type="number"
                                value={formData?.educationPinCode || ""}
                                onChange={handleInputChange}
                                error={errors.educationPinCode}
                              />
                            </div>
                          </div>
                          {isEducationInfoChanged && (
                            <button
                              onClick={() =>
                                handleSave(isEducationInfoChanged, [
                                  "higherEducation",
                                  "instituteName",
                                  "course",
                                  "startingYear",
                                  "endingYear",
                                  "educationState",
                                  "educationPinCode",
                                ], "user", "education")
                              }
                              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                            >
                              Save
                            </button>
                          )}
                        </div>
                      )}
                    {activeSection === "Esports Insights" &&
                      selectedItem === "Game Base" && (
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="AC-head-text">Game Base</div>
                            <div className="AC-text">
                              Provide your skill level, gaming platform, and
                              server details to enhance your experience
                            </div>
                          </div>
                          <div className="flex-grow mt-4 space-y-6">
                            <FloatingLabelInput
                              name="skillLevel"
                              label="Skill Level"
                              value={formData?.skillLevel || ""}
                              onChange={handleInputChange}
                              error={errors.skillLevel}
                            />
                            <div className="flex gap-6">
                              <FloatingLabelInput
                                name="gamingPlatform"
                                label="Gaming Platform"
                                value={formData?.gamingPlatform || ""}
                                onChange={handleInputChange}
                                error={errors.gamingPlatform}
                              />
                              <FloatingLabelInput
                                name="gamingServer"
                                label="Gaming Server"
                                value={formData?.gamingServer || ""}
                                onChange={handleInputChange}
                                error={errors.gamingServer}
                              />
                            </div>
                          </div>
                          {isGameBaseChanged && (
                            <button
                              onClick={() =>
                                handleSave(isGameBaseChanged, [
                                  "skillLevel",
                                  "gamingPlatform",
                                  "gamingServer",
                                ], "user")
                              }
                              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                            >
                              Save
                            </button>
                          )}
                        </div>
                      )}
                    {activeSection === "Esports Insights" &&
                      selectedItem === "Social Account" && (
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="AC-head-text">Social Account</div>
                            <div className="AC-text">
                              connect your social account to showcase your
                              profiles on assemble
                            </div>
                          </div>
                          <div className="flex-grow mt-4 space-y-6">
                            <div className="flex gap-6">
                              <FloatingLabelInput
                                name="youtubeUrl"
                                label="YouTube URL"
                                value={formData.youtubeUrl}
                                onChange={handleInputChange}
                                error={errors.youtubeUrl}
                              />
                              <FloatingLabelInput
                                name="discordUrl"
                                label="Discord URL"
                                value={formData.discordUrl}
                                onChange={handleInputChange}
                                error={errors.discordUrl}
                              />
                            </div>
                            <div className="flex gap-6">
                              <FloatingLabelInput
                                name="twitchUrl"
                                label="Twitch URL"
                                value={formData.twitchUrl}
                                onChange={handleInputChange}
                                error={errors.twitchUrl}
                              />
                              <FloatingLabelInput
                                name="otherUrl"
                                label="Other URL"
                                value={formData.otherUrl}
                                onChange={handleInputChange}
                                error={errors.otherUrl}
                              />
                            </div>
                          </div>
                          {isSocialAccountChanged && (
                            <button
                              onClick={() =>
                                handleSave(isSocialAccountChanged, [
                                  "youtubeUrl",
                                  "discordUrl",
                                  "twitchUrl",
                                ], "user")
                              }
                              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                            >
                              Save
                            </button>
                          )}
                        </div>
                      )}
                    {activeSection === "Esports Insights" &&
                      selectedItem === "Select Games" && (
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="AC-head-text">Select Games</div>
                            <div className="AC-text">
                              Link up new games, ditch the old ones, and so much
                              more about gaming!
                            </div>
                          </div>
                          <div className="flex-grow mt-4 space-y-4">
                            <div className="relative h-14" ref={gameSelectRef}>
                              <div
                                onClick={() =>
                                  setIsGameSelectOpen(!isGameSelectOpen)
                                }
                                className={`peer w-full h-full rounded-xl px-6 capitalize bg-white text-[#1A1A1A] shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 hover:bg-black hover:text-white transition-colors duration-200 flex items-center justify-between cursor-pointer ${selectedGames.length > 0 ? "pt-6" : "pt-0"
                                  }`}
                              >
                                <span
                                  className="text-base normal-case"
                                  style={{
                                    fontFamily:
                                      "'Arial Rounded MT Bold', Arial, sans-serif",
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  {/* Display nothing here, the label handles it */}
                                </span>
                                <svg
                                  className={`w-5 h-5 transition-transform text-gray-700 ${isGameSelectOpen ? "rotate-180" : ""
                                    }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                  ></path>
                                </svg>
                              </div>
                              <label
                                className={`absolute top-1/2 left-6 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ease-in-out text-base capitalize ${selectedGames.length > 0
                                  ? "top-2 -translate-y-0 text-xs text-[#737373]"
                                  : ""
                                  }`}
                                style={{
                                  fontFamily:
                                    "'Arial Rounded MT Bold', Arial, sans-serif",
                                  letterSpacing: "0.04em",
                                }}
                              >
                                Select Games
                              </label>
                              {isGameSelectOpen && (
                                <div
                                  className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-xl shadow-lg"
                                  onMouseDown={(e) => e.stopPropagation()}
                                >
                                  <ul className="max-h-60 overflow-auto p-2">
                                    {availableGames.map((game) => (
                                      <li
                                        key={game}
                                        onClick={() => handleGameSelect(game)}
                                        className="px-4 py-2 text-white hover:bg-gray-700 rounded-lg cursor-pointer flex items-center gap-3"
                                      >
                                        {" "}
                                        <input
                                          type="checkbox"
                                          checked={selectedGames.includes(game)}
                                          readOnly
                                          className="w-4 h-4 rounded-sm bg-gray-600 border-gray-500 text-cyan-500 focus:ring-cyan-600"
                                        />{" "}
                                        <span>{game}</span>{" "}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            {errors.games && (
                              <p className="text-red-500 text-xs mt-1 ml-1">
                                {errors.games}
                              </p>
                            )}

                            <div className="space-y-2 pt-2">
                              {selectedGames.map((game) => (
                                <div
                                  key={game}
                                  className="bg-gray-200 rounded-lg p-3 flex justify-between items-center"
                                >
                                  <span className="text-black font-medium">
                                    {game}
                                  </span>
                                  <button
                                    onClick={() => handleGameSelect(game)}
                                    className="bg-black text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-800"
                                  >
                                    Delete
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                          {areGamesChanged && (
                            <button
                              onClick={handleSaveGames}
                              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-auto disabled:bg-gray-500 disabled:cursor-not-allowed"
                              disabled={selectedGames.length === 0}
                            >
                              Save Selections
                            </button>
                          )}
                        </div>
                      )}
                    {activeSection === "Esports Insights" &&
                      selectedItem === "Battlegrounds Mobile India" && (
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="AC-head-text">
                              Battlegrounds Mobile India
                            </div>
                            <div className="AC-text ">
                              Share your BGMI details to easily join scrims and
                              tournaments with pre-filled info!
                            </div>
                          </div>
                          <div className="flex-grow mt-4 space-y-6">
                            <FloatingLabelInput
                              name="bgmiUid"
                              label="BGMI UID (paste this don't type if empty)"
                              value={formData.bgmiUid}
                              onChange={formData.bgmiUid ? () => { } : handleInputChange}
                              error={errors.bgmiUid}
                            />
                            <FloatingLabelInput
                              name="bgmiUsername"
                              label="In-Game Username"
                              value={formData.bgmiUsername}
                              onChange={handleInputChange}
                              error={errors.bgmiUsername}
                            />
                            <div className="flex gap-6">
                              <FloatingLabelInput
                                name="bgmiLevel"
                                label="Level"
                                type="number"
                                value={formData.bgmiLevel}
                                onChange={handleInputChange}
                                error={errors.bgmiLevel}
                              />
                              <FloatingLabelInput
                                name="bgmiRank"
                                label="Overall Rank"
                                value={formData.bgmiRank}
                                onChange={handleInputChange}
                                error={errors.bgmiRank}
                              />
                            </div>
                          </div>
                          {isBgmiInfoChanged && (
                            <button
                              onClick={() =>
                                handleSave(isBgmiInfoChanged, [
                                  "bgmiUid",
                                  "bgmiUsername",
                                  "bgmiLevel",
                                  "bgmiRank",
                                ], "bgmi")
                              }
                              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                            >
                              Save
                            </button>
                          )}
                        </div>
                      )}
                    {activeSection === "Esports Insights" &&
                      selectedItem === "Call of Duty Mobile" && (
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="AC-head-text">
                              Call of Duty Mobile
                            </div>
                            <div className="AC-text ">
                              Provide your CODM details to quickly enter scrims
                              and tournaments with pre-filled information!
                            </div>
                          </div>
                          <div className="flex-grow mt-4 space-y-6">
                            <FloatingLabelInput
                              name="codmUid"
                              label="CODM UID (paste this don't type if empty)"
                              value={formData.codmUid}
                              onChange={formData.codmUid ? () => { } : handleInputChange}
                              error={errors.codmUid}
                            />
                            <FloatingLabelInput
                              name="codmUsername"
                              label="In-Game Username"
                              value={formData.codmUsername}
                              onChange={handleInputChange}
                              error={errors.codmUsername}
                            />
                            <div className="flex gap-6">
                              <FloatingLabelInput
                                name="codmLevel"
                                label="Level"
                                type="number"
                                value={formData.codmLevel}
                                onChange={handleInputChange}
                                error={errors.codmLevel}
                              />
                              <FloatingLabelInput
                                name="codmRank"
                                label="Overall Rank"
                                value={formData.codmRank}
                                onChange={handleInputChange}
                                error={errors.codmRank}
                              />
                            </div>
                          </div>
                          {isCodmInfoChanged && (
                            <button
                              onClick={() =>
                                handleSave(isCodmInfoChanged, [
                                  "codmUid",
                                  "codmUsername",
                                  "codmLevel",
                                  "codmRank",
                                ], "codm")
                              }
                              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                            >
                              Save
                            </button>
                          )}
                        </div>
                      )}
                    {activeSection === "Esports Insights" &&
                      selectedItem === "Free Fire Max India" && (
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="AC-head-text">
                              Free Fire Max India
                            </div>
                            <div className="AC-text ">
                              Incorporate FFMax to enhance your tournament
                              experience and competition quality.
                            </div>
                          </div>
                          <div className="flex-grow mt-4 space-y-6">
                            <FloatingLabelInput
                              name="ffmaxUid "
                              label="FFMAX UID (paste this don't type if empty)"
                              value={formData.ffmaxUid}
                              onChange={formData.ffmaxUid ? () => { } : handleInputChange}
                              error={errors.ffmaxUid}
                            />
                            <FloatingLabelInput
                              name="ffmaxUsername"
                              label="In-Game Username"
                              value={formData.ffmaxUsername}
                              onChange={handleInputChange}
                              error={errors.ffmaxUsername}
                            />
                            <div className="flex gap-6">
                              <FloatingLabelInput
                                name="ffmaxLevel"
                                label="Level"
                                type="number"
                                value={formData.ffmaxLevel}
                                onChange={handleInputChange}
                                error={errors.ffmaxLevel}
                              />
                              <FloatingLabelInput
                                name="ffmaxCsRank"
                                label="CS Rank"
                                value={formData.ffmaxCsRank}
                                onChange={handleInputChange}
                                error={errors.ffmaxCsRank}
                              />
                              <FloatingLabelInput
                                name="ffmaxBrRank"
                                label="BR Rank"
                                value={formData.ffmaxBrRank}
                                onChange={handleInputChange}
                                error={errors.ffmaxBrRank}
                              />
                            </div>
                          </div>
                          {isFfmaxInfoChanged && (
                            <button
                              onClick={() =>
                                handleSave(isFfmaxInfoChanged, [
                                  "ffmaxUid",
                                  "ffmaxUsername",
                                  "ffmaxLevel",
                                  "ffmaxCsRank",
                                  "ffmaxBrRank",
                                ], "ff")
                              }
                              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                            >
                              Save
                            </button>
                          )}
                        </div>
                      )}
                    {activeSection === "Esports Insights" &&
                      selectedItem === "Valorant" && (
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="AC-head-text">Valorant</div>
                            <div className="AC-text ">
                              Provide your Valorant details to effortlessly join
                              scrims and tournaments with pre-filled
                              information!
                            </div>
                          </div>
                          <div className="flex-grow mt-4 space-y-6">
                            <FloatingLabelInput
                              name="valorantRiotId"
                              label="Riot ID (paste this don't type if empty)"
                              value={formData.valorantRiotId}
                              onChange={formData.valorantRiotId ? () => { } : (handleInputChange)}
                              error={errors.valorantRiotId}
                            />
                            <FloatingLabelInput
                              name="valorantTagline"
                              label="Tagline"
                              value={formData.valorantTagline}
                              onChange={handleInputChange}
                              error={errors.valorantTagline}
                            />
                            <div className="flex gap-6">
                              <FloatingLabelInput
                                name="valorantLevel"
                                label="Level"
                                type="number"
                                value={formData.valorantLevel}
                                onChange={handleInputChange}
                                error={errors.valorantLevel}
                              />
                              <FloatingLabelInput
                                name="valorantRank"
                                label="Rank"
                                value={formData.valorantRank}
                                onChange={handleInputChange}
                                error={errors.valorantRank}
                              />
                            </div>
                          </div>
                          {isValorantInfoChanged && (
                            <button
                              onClick={() =>
                                handleSave(isValorantInfoChanged, [
                                  "valorantRiotId",
                                  "valorantTagline",
                                  "valorantLevel",
                                  "valorantRank",
                                ], "valo")
                              }
                              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-4"
                            >
                              Save
                            </button>
                          )}
                        </div>
                      )}

                    {activeSection === "Account Settings" &&
                      selectedItem === "Username" && (
                        <div className="flex flex-col h-full">
                          <div>
                            <div className="AC-head-text">Username</div>
                          </div>
                          <div className="flex-grow mt-4">
                            <FloatingLabelInput
                              name="username"
                              label="Username"
                              value={formData?.username || ""}
                              onChange={handleInputChange}
                              error={errors.username}
                            />
                            <p className="text-cyan-400 text-sm mt-2">
                              Feel free to switch things up after 15 days from
                              your last change!
                            </p>
                          </div>
                          <div className="flex gap-4 mt-auto">
                            {/* <button
                              onClick={handleCancelUsername}
                              className={`bg-black text-white py-3 px-6 rounded-xl border border-white hover:bg-gray-800 transition-colors font-medium ${isUsernameChanged ? "flex-1" : "w-full"
                                }`}
                            >
                              Cancel
                            </button> */}
                            {isUsernameChanged && (
                              <button
                                onClick={() =>
                                  handleSave(isUsernameChanged, ["username"], "userName")
                                }
                                className="flex-1 bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium"
                              >
                                Save
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    {activeSection === "Account Settings" &&
                      selectedItem === "Email Id" && (
                        <div className="flex-grow">
                          <div>
                            <div className="AC-head-text">Email Id</div>
                            <div className="AC-text ">
                              You can catch all kinds of notifications about
                              esports tournaments and series!
                            </div>
                          </div>
                          <div className="mt-4">
                            <FloatingLabelInput
                              name="email"
                              label="Email ID"
                              value={formData?.email || ""}
                              onChange={() => { }}
                              error={errors.email}
                              disabled
                            />
                            <p className="text-red-500 text-sm mt-2">
                              You cannot change this mail id because its your
                              primary login credential
                            </p>
                          </div>
                        </div>
                      )}
                    {activeSection === "Account Settings" &&
                      selectedItem === "Profile Picture" && (
                        <div className="flex flex-col items-center gap-5 h-full">
                          <div className="AC-head-text"> Profile Picture</div>
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleProfileImageChange}
                            className="hidden"
                          />
                          <div className="flex-grow flex items-center justify-center w-full">
                            <div className="h-64 w-64 bg-white/20 rounded-full border border-gray-500 flex items-center justify-center overflow-hidden">
                              {profilePicturePreview ? (
                                <img
                                  src={profilePicturePreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <img
                                  src={user.avatarUrl}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                          </div>
                          <div className="w-full flex flex-col gap-3">
                            <button
                              onClick={() => fileInputRef.current.click()}
                              className="bg-white text-black py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                            >
                              Add new profile picture
                            </button>
                            {isProfilePictureChanged && (
                              <button
                                onClick={() =>
                                (handleSave(isProfilePictureChanged, [], "profilePic"),
                                  updateProfileImage()
                                )
                                }
                                className="bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium"
                              >
                                Save
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    {activeSection === "Account Settings" &&
                      selectedItem === "Password And Security" && (
                        <div className="flex flex-col h-full">
                          <div className="flex-grow">
                            <div className="AC-head-text">
                              Password & Security
                            </div>
                            <div className="AC-text ">
                              Keep your password a secret! Use a blend of
                              letters, numbers, and symbols. Steer clear of easy
                              picks like your pet's name or birthday, and update
                              it often to stay ahead of hackers!
                            </div>
                            <div className="flex-col space-y-6 mt-4">
                              <FloatingLabelInput
                                name="newPassword"
                                label="New Password"
                                type="password"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                error={errors.newPassword}
                              />
                              <div className="space-y-1">
                                <PasswordRequirement
                                  isValid={passwordValidity.length}
                                  text="Password is at least 8 characters long"
                                />
                                <PasswordRequirement
                                  isValid={passwordValidity.strength}
                                  text="Must be okay strength or better"
                                />
                                <PasswordRequirement
                                  isValid={passwordValidity.types}
                                  text="Includes two of: letters, numbers, symbols"
                                />
                              </div>
                              <FloatingLabelInput
                                name="confirmPassword"
                                label="Confirm New Password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                error={errors.confirmPassword}
                              />
                            </div>
                          </div>
                          {isPasswordChanged && (
                            <button
                              onClick={() =>
                                handleSave(isPasswordChanged, [
                                  "newPassword",
                                  "confirmPassword",
                                ], "password")
                              }
                              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-medium mt-auto"
                            >
                              Save
                            </button>
                          )}
                        </div>
                      )}
                  </div>
                  <AssembleUidComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

      {/* ====================================================================== */}
      {/* ======================= MOBILE RESPONSIVE CODE ======================= */}
      {/* ====================================================================== */}
      <div className="lg:hidden">
        <div className="ACMAIN relative h-screen bg-gray-900 text-white">
          <style>{`
     .frosted-glass-mobile {
     background: rgba(255, 255, 255, 0.1);
     backdrop-filter: blur(10px);
     border: 1px solid rgba(255, 255, 255, 0.2);
     }
      `}</style>
          <UpperNav
            name={getMobileHeaderTitle()}
            username={savedUsername}
            profilePicture={savedProfilePicture}
            onProfileClick={() =>
              setIsProfileCardVisible(!isProfileCardVisible)
            }
          />
          {isProfileCardVisible && (
            <ProfileCard
              username={savedUsername}
              profilePicture={savedProfilePicture}
            />
          )}

          <div className="pt-20">
            {mobileStep > 1 && (
              <div className="bg-black bg-opacity-50 p-4 flex items-center sticky top-20 z-10">
                <button
                  onClick={handleMobileBack}
                  className="mr-4 p-2 rounded-full hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </button>
                <h2 className="text-lg font-bold">
                  {mobileStep === 2 ? "Back to Sections" : activeSection}
                </h2>
              </div>
            )}
            <div
              className="overflow-y-auto"
              style={{ height: "calc(100vh - 80px)" }}
            >
              {renderMobileContent(user.avatarUrl)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountCenter;
