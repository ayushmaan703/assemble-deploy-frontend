import { useEffect, useRef, useState } from "react";

// Imports from both mobile and desktop versions 
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import EducationInfoCard from "../../components/cards/EducationInfoCard";
import GameCard from "../../components/cards/GameCard";
import GamingInfoCard from "../../components/cards/GamingInfoCard";
import PersonalInfoCard from "../../components/cards/PersonalInfoCard";
import CustomGameDropdown from "./CustomDropdown";
import MultiSelect from "./Multiselect";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setEduInfodb, setGamingInfodb, setPersonalInfodb } from "../../redux/features/auth_slices/AuthSlice";
import { useNavigate } from "react-router-dom";
// Note: Some imports might be duplicates if they were in both files. They are merged here. 

// --- CUSTOM HOOK to detect window size --- 
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // Call handler right away so state gets updated with initial window size 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};


// --- HOOK to detect click outside of an element (from mobile code) --- 
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

// --- HELPER COMPONENT: Single-Select Dropdown (from mobile code) --- 
const SingleSelectDropdown = ({ options, selectedValue, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full font-arialrounded" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] flex justify-between items-center text-[10px] font-normal capitalize tracking-wider"
      >
        <span className={selectedValue ? 'text-black' : 'text-gray-500'}>
          {selectedValue || placeholder}
        </span>
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white rounded shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 text-black text-[10px] cursor-pointer hover:bg-gray-200"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// --- HELPER COMPONENT: Multi-Select Game Dropdown (from mobile code) --- 
const MultiSelectGameDropdown = ({ options, selectedGames, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = (gameId) => {
    const isSelected = selectedGames.includes(gameId);
    if (isSelected) {
      onChange(selectedGames.filter((id) => id !== gameId));
    } else {
      onChange([...selectedGames, gameId]);
    }
  };

  const getButtonLabel = () => {
    if (selectedGames.length === 0) return "Select Games";
    if (selectedGames.length === 1) return options.find(opt => opt.id === selectedGames[0])?.name;
    return `${selectedGames.length} Games Selected`;
  };

  return (
    <div className="relative w-full font-arialrounded" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] flex justify-between items-center text-[10px] font-normal capitalize tracking-wider"
      >
        <span className={selectedGames.length > 0 ? 'text-black' : 'text-gray-500'}>
          {getButtonLabel()}
        </span>
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white rounded shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = selectedGames.includes(option.id);
            return (
              <li
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="px-4 py-2 text-black text-[10px] cursor-pointer hover:bg-gray-200 flex items-center gap-3"
              >
                <img src={option.image} alt={option.name} className="w-8 h-8 object-contain rounded" />
                <span className="flex-grow">{option.name}</span>
                <input type="checkbox" readOnly checked={isSelected} className="form-checkbox h-4 w-4 text-blue-600" />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};


function Main() {
  // --- RESPONSIVE LOGIC --- 
  const { width } = useWindowSize();
  const isDesktop = width >= 1024; // Tailwind's 'lg' breakpoint 

  // --- MERGED STATE from both files --- 
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [tagline, setTagline] = useState("");
  const [highestEducation, setHighestEducation] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [eduState, setEduState] = useState("");
  const [eduPinCode, setEduPinCode] = useState("");
  const [course, setCourse] = useState("");
  const [startingYear, setStartingYear] = useState("");
  const [endingYear, setEndingYear] = useState("");
  const [selectedGames, setSelectedGames] = useState([]);
  const [skillLevel, setSkillLevel] = useState("");
  const [gamingPlatform, setGamingPlatform] = useState("");
  const [gamingServer, setGamingServer] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [discordUrl, setDiscordUrl] = useState("");
  const [twitchUrl, setTwitchUrl] = useState("");
  const [otherUrl, setOtherUrl] = useState("");
  const [selectedSocials, setSelectedSocials] = useState([]); // from desktop 

  const [showPopup, setShowPopup] = useState(false);
  const [activeGameId, setActiveGameId] = useState();
  const [detailsClicked, setDetailsClicked] = useState(false);
  const [submitGameData, setSubmitGameData] = useState(false);
  const [editButtonClicked, setEditButtonClicked] = useState(false);

  // Mobile specific state 
  const [currentView, setCurrentView] = useState('PERSONAL_FORM');

  // Desktop specific state 
  const [personalInfo, setPersonalInfo] = useState(true);
  const [educationalInfo, setEducationalInfo] = useState(false);
  const [gamingInfo, setGamingInfo] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
  // MODIFICATION: New state to manage the two-step gaming info process on desktop
  const [showGameSelectionView, setShowGameSelectionView] = useState(false);
  const [gameData, setGameData] = useState({
    bgmi: { id: "", username: "", rank: "", level: "" },
    freefire: { id: "", username: "", rank: "", level: "", csRank: "" },
    valorant: { id: "", username: "", rank: "", level: "" },
    codm: { id: "", username: "", rank: "", level: "" },
  });

  // --- MERGED DATA from both files --- 
  const svgNames = ["BLUE", "Reyna", "KATANA", "FROSEN", "FAMILY", "WHITE"];
  const dropdownGameOptions = [
    { id: "bgmi", name: "Battleground Mobile India", image: "/images/BGMI.png", image2: "/images/BGMI2.svg" },
    { id: "freefire", name: "Freefire Max", image: "/images/FREEFIRE.png", image2: "/images/FREEFIRE2.svg" },
    { id: "codm", name: "Call of Duty Mobile", image: "/images/CODM.png", image2: "/images/CODM2.svg" },
    { id: "valorant", name: "Valorant", image: "/images/Valorant.png", image2: "/images/VALORANT2.svg" },
  ];
  const dropdownGameOptions1 = [
    { id: "bgmi", name: "Battleground Mobile India", image: "/Frame18.svg" },
    { id: "freefire", name: "Freefire Max", image: "/Frame16.svg" },
    { id: "codm", name: "Call of Duty Mobile", image: "/Frame15.svg" },
    { id: "valorant", name: "Valorant", image: "/Frame17.svg" },
  ];
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const skillLevelOptions = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
  const platformOptions = ['Mobile', 'PC', 'Console', 'All'];
  const serverOptions = ['Asia', 'Europe', 'North America', 'South America'];

  // --- MERGED HANDLERS from both files --- 

  // Popup handlers 
  const handleClick = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  // Carousel handlers (for desktop) 
  const handlePrev = () => setCurrentSvgIndex((prev) => (prev === 0 ? svgNames.length - 1 : prev - 1));
  const handleNext = () => setCurrentSvgIndex((prev) => (prev === svgNames.length - 1 ? 0 : prev + 1));

  // Game data input handler 
  const handleInputChange = (field, value) => {
    if (activeGameId) {
      setGameData((prev) => ({
        ...prev,
        [activeGameId]: { ...prev[activeGameId], [field]: value },
      }));
    }
  };
  const currentGame = activeGameId ? gameData[activeGameId] : null;

  // Game selection handlers 
  const handleDeleteGame = (idToDelete) => {
    const newSelectedGames = selectedGames.filter((game) => game !== idToDelete);
    setSelectedGames(newSelectedGames);
    if (activeGameId === idToDelete) {
      setActiveGameId(newSelectedGames[0] || "");
    }
  };

  const handleEditGame = (gameId) => {
    setSubmitGameData(false);
    setActiveGameId(gameId);
    setDetailsClicked(true);
    setEditButtonClicked(true);
    // For desktop view navigation 
    if (isDesktop) {
      setPersonalInfo(false);
      setEducationalInfo(false);
      setGamingInfo(true);
    }
  };

  const handleAddDetails = () => {
    if (editButtonClicked) {
      setSubmitGameData(true);
    }
    if (selectedGames.length > 0) {
      setActiveGameId(selectedGames[0]);
    }
    setDetailsClicked(true);
    // For mobile view navigation 
    if (!isDesktop) {
      setCurrentView('GAMING_FORM');
    }
  };

  const handleSubmitGameData = () => {
    // Validation 
    const currentGameData = gameData[activeGameId];
    if (!currentGameData) return;
    let isCurrentGameDataValid =
      currentGameData.id?.trim() &&
      currentGameData.username?.trim() &&
      currentGameData.rank?.trim() &&
      String(currentGameData.level).trim();
    if (activeGameId === 'freefire') {
      isCurrentGameDataValid = isCurrentGameDataValid && currentGameData.csRank?.trim();
    }
    if (!isDesktop && !isCurrentGameDataValid) {
      alert(`Please fill all required details for ${activeGameId.toUpperCase()}.`);
      return;
    }

    if (editButtonClicked) {
      setSubmitGameData(true);
      setEditButtonClicked(false);
      if (!isDesktop) setCurrentView('SUMMARY_VIEW');
      return;
    }
    const currentIndex = selectedGames.indexOf(activeGameId);
    const nextIndex = currentIndex + 1;
    if (nextIndex < selectedGames.length) {
      setActiveGameId(selectedGames[nextIndex]);
    } else {
      if (!isDesktop) {
        setCurrentView('SUMMARY_VIEW');
      } else {
        setSubmitGameData(true);
      }
    }
  };

  // Card edit handler (for mobile view) 
  const handleCardEditMobile = (view) => () => {
    setCurrentView(view);
    setDetailsClicked(false);
    setSubmitGameData(false);
  };

  // Tab handler (for desktop view) 
  const handleTabClick = (tab) => {
    setPersonalInfo(false);
    setEducationalInfo(false);
    setGamingInfo(false);
    if (editButtonClicked) {
      setSubmitGameData(true);
      setDetailsClicked(true);
      setGamingInfo(true);
      setEditButtonClicked(false);
    } else if (tab === "PERSONAL") setPersonalInfo(true);
    else if (tab === "EDUCATIONAL") setEducationalInfo(true);
    else if (tab === "GAMING") setGamingInfo(true);
  };

  // Card edit handler (for desktop view) 
  const handleCardEditDesktop = (tab) => () => {
    setEditButtonClicked(true);
    handleTabClick(tab);
    setDetailsClicked(false);
    setSubmitGameData(false);
  };

  // --- MODIFIED: Back button handler --- 
  const handleBack = () => {
    if (isDesktop) {
      // Desktop back logic: Go to the previous tab or view 
      if (gamingInfo && detailsClicked && submitGameData) { // From Summary View 
        setSubmitGameData(false);
        setDetailsClicked(true);
        setEditButtonClicked(false);
        return;
      }
      if (gamingInfo && detailsClicked) { // From Game Details Form 
        setDetailsClicked(false);
        return;
      }
      // MODIFICATION: Handle back from game selection view to initial gaming form
      if (gamingInfo && showGameSelectionView) {
        setShowGameSelectionView(false);
        return;
      }
      if (gamingInfo) { // From Gaming Info Tab 
        handleTabClick("EDUCATIONAL");
        return;
      }
      if (educationalInfo) { // From Educational Info Tab 
        handleTabClick("PERSONAL");
        return;
      }
    } else {
      // Mobile back logic: Go to the previous screen 
      switch (currentView) {
        case 'SUMMARY_VIEW':
          // Go back to the last step of filling game details if available 
          if (selectedGames.length > 0) {
            setCurrentView('GAMING_FORM');
            setDetailsClicked(true);
            setActiveGameId(selectedGames[selectedGames.length - 1] || "");
          } else {
            setCurrentView('GAMING_FORM');
            setDetailsClicked(false);
          }
          break;
        case 'GAMING_FORM':
          if (detailsClicked) {
            setCurrentView('SELECTED_GAMES_VIEW');
            setDetailsClicked(false);
          } else {
            setCurrentView('SHOW_EDUCATION_CARD');
          }
          break;
        case 'SELECTED_GAMES_VIEW':
          setCurrentView('GAMING_FORM');
          setDetailsClicked(false);
          break;
        case 'SHOW_EDUCATION_CARD':
          setCurrentView('EDUCATION_FORM');
          break;
        case 'EDUCATION_FORM':
          setCurrentView('SHOW_PERSONAL_CARD');
          break;
        case 'SHOW_PERSONAL_CARD':
          setCurrentView('PERSONAL_FORM');
          break;
        default:
          // No action for PERSONAL_FORM 
          break;
      }
    }
  };

  const socialMediaLinks = { youtubeUrl, discordUrl, twitchUrl, otherUrl };

  // --- UI Logic for Mobile --- 
  const getBackgroundImage = () => {
    if (currentView === 'PERSONAL_FORM' || currentView === 'EDUCATION_FORM')
      return "bg-[url('https://res.cloudinary.com/mayushmaan/image/upload/v1759389558/FinalPI_hclgxj.png')]";
    if (currentView === 'GAMING_FORM' && !detailsClicked)
      return "bg-[url('https://res.cloudinary.com/mayushmaan/image/upload/v1759389391/GamingInfo_k5iigh.png')]";
    if (detailsClicked || currentView === 'SUMMARY_VIEW' || currentView === 'SELECTED_GAMES_VIEW')
      return "bg-[url('https://res.cloudinary.com/mayushmaan/image/upload/v1759389386/DeatilsPage_z8otpq.png')]";
    return "bg-[url('https://res.cloudinary.com/mayushmaan/image/upload/v1759389558/FinalPI_hclgxj.png')]";
  };
  const isCardView = currentView === 'SHOW_PERSONAL_CARD' || currentView === 'SHOW_EDUCATION_CARD' || currentView === 'SELECTED_GAMES_VIEW' || currentView === 'SUMMARY_VIEW';
  const mainContainerClasses = isCardView
    ? "flex-1 my-24 mx-5 sm:mx-4 lg:my-5 lg:mx-0 2xl:mx-20 flex flex-col items-center"
    : "flex-1 bg-white/30 backdrop-blur-sm rounded-3xl my-24 mx-5 sm:mx-4 lg:my-5 lg:mx-0 2xl:mx-20 flex flex-col gap-3 p-4";

  // data base connection
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?._id) || useSelector((state) => state.register?.id) || "000000000000000000000";
  const navigate = useNavigate()

  const handlePersonalDataSubmit = async () => {
    const userData = {
      userId,
      fullName,
      gender,
      age,
      phone: phoneNumber,
      country,
      state,
      pincode: pinCode,
      city: address,
      tagline
    }
    try {
      await dispatch(setPersonalInfodb(userData))
    } catch (error) {
      toast.error("error adding details")
    }
  }

  const handleAddEduDetails = async () => {
    const eduData = {
      highestEducation,
      institutionName,
      eduState,
      eduPinCode,
      course,
      startingYear,
      endingYear
    }
    try {
      await dispatch(setEduInfodb({ eduData, userId }))
    } catch (error) {
      toast.error("error adding details")
    }
  }

  const handleAddGamingDetails = async () => {
    let socialLinks = []
    if (youtubeUrl) socialLinks.push(youtubeUrl)
    if (discordUrl) socialLinks.push(discordUrl)
    if (twitchUrl) socialLinks.push(twitchUrl)
    if (otherUrl) socialLinks.push(otherUrl)
    const gamingData = {
      skillLevel,
      gamingPlatform,
      gamingServer,
      socialLinks
    }
    try {
      await dispatch(setGamingInfodb({ gamingData, userId }))
    } catch (error) {
      toast.error("error adding details")
    }
  }

  // --- RENDER LOGIC --- 
  if (isDesktop) {
    // Return JSX for Desktop 
    return (
      <div
        className={`${detailsClicked
          ? "bg-[url('https://res.cloudinary.com/mayushmaan/image/upload/v1759389386/DeatilsPage_z8otpq.png')]"
          : personalInfo
            ? "bg-[url('https://res.cloudinary.com/mayushmaan/image/upload/v1759389558/FinalPI_hclgxj.png')]"
            : educationalInfo
              ? "bg-[url('https://res.cloudinary.com/mayushmaan/image/upload/v1759389387/cyberman_qppcyy.png')]"
              : gamingInfo
                ? "bg-[url('https://res.cloudinary.com/mayushmaan/image/upload/v1759389391/GamingInfo_k5iigh.png')]"
                : ""
          } bg-cover font-sa h-screen w-screen overflow-hidden`} // Added overflow-hidden 
      >
        {/* Navbar */}
        <div className="lg:h-14 w-full bg-white/20 backdrop-blur-xl flex justify-between items-center text-white px-5 py-2 ">
          <div className="flex items-center gap-4">
            {!personalInfo && (
              <button onClick={handleBack} title="Go Back">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div className="text-4xl tracking-widest font-bebas ">ASSEMBLE</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right font-arialrounded">
              {/* <div className="text-sm font-light uppercase "> </div>
              <div className="text-base font-medium">N21072005/MP/VS</div> */}
            </div>
            <div className="w-10 h-10 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-row w-full h-[calc(100vh-56px)]"> {/* Adjusted height */}
          {/* Left Sidebar */}
          <div
            className="w-14 bg-white/30 backdrop-blur-xl lg:h-auto lg:mt-28"
            style={{ clipPath: "polygon(0% 0%, 1000% 50%, 1000% 50%, 0% 100%)" }}
          />

          {/* Main Panel */}
          <div
            className={`${gamingInfo ? "lg:h-[88vh]" : "lg:h-[88vh]"
              } flex-1 bg-white/30 backdrop-blur-sm rounded-3xl my-5 2xl:mx-20 lg:mx-5 flex flex-col gap-4`}
          >
            {/* Tabs */}
            <div className={`py-5 ${submitGameData ? "hidden" : ""} w-full flex px-10 justify-between text-center font-bebas text-xl tracking-wide`}>
              {["PERSONAL", "EDUCATIONAL", "GAMING"].map((label) => {
                const isActive =
                  (label === "PERSONAL" && personalInfo) ||
                  (label === "EDUCATIONAL" && educationalInfo) ||
                  (label === "GAMING" && gamingInfo);
                return (
                  <div
                    key={label}
                    onClick={() => handleTabClick(label)}
                    className={`trapezoid w-[30%] h-8 cursor-pointer ${isActive
                      ? "bg-white text-black border-b-4 border-b-black"
                      : "bg-black text-white border-b-4 border-b-white"
                      }`}
                  >
                    {label} INFORMATION
                  </div>
                );
              })}
            </div>

            {/* Panels */}
            <div
              className={`px-5 ${!gamingInfo ? "flex justify-between" : ""
                } lg:h-full lg:w-full text-white -mt-5 overflow-y-auto`}
            >
              {/* Personal Info Panel */}
              {personalInfo && (
                <>
                  <div className="flex px-4 font-sans gap-x-8">
                    <div className="lg:h-full lg:w-[40%] rounded-xl mt-5 font-sans">
                      <div
                        className={`relative ${isDarkTheme ? "text-white" : "text-black"
                          } rounded-xl 2xl:pb-2 lg:w-full md:h-[70vh] 2xl:h-[70vh]`}
                      >
                        <div
                          onClick={() => setIsDarkTheme(!isDarkTheme)}
                          className={`absolute top-2 right-2 w-10 h-5 flex items-center px-0.5 rounded-full cursor-pointer transition-colors duration-300 ${isDarkTheme ? "bg-black/60" : "bg-gray-300"
                            }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${isDarkTheme ? "translate-x-5" : "translate-x-0"
                              }`}
                          />
                        </div>

                        <button
                          onClick={handlePrev}
                          type="button"
                          className={`absolute 2xl:top-1/4 md:top-20 ${isDarkTheme
                            ? "bg-black/50 text-white"
                            : "bg-white/50 text-black"
                            } w-5 -translate-y-1/2 text-2xl z-10`}
                        >
                          &#x276E;
                        </button>

                        <img
                          src={`/${svgNames[currentSvgIndex]}.png`}
                          alt={`SVG ${currentSvgIndex + 1}`}
                          className="rounded-t-xl object-cover h-50 -mb-5 lg:w-full"
                        />

                        <button
                          onClick={handleNext}
                          type="button"
                          className={`absolute 2xl:top-1/4 md:top-20 right-0.5 ${isDarkTheme
                            ? "bg-black/50 text-white"
                            : "bg-white/50 text-black"
                            } w-5 -translate-y-1/2 text-2xl z-10`}
                        >
                          &#x276F;
                        </button>

                        <div
                          className={`flex flex-col text-sm md:space-y-2 md:h-[46vh] 2xl:h-[42.5vh] bg-cover rounded-b-xl justify-between overflow-hidden ${isDarkTheme ? "bg-black/20" : "bg-white/20"
                            }`}
                          style={{ backgroundImage: `url(/${svgNames[currentSvgIndex]}.png)` }}
                        >
                          <div
                            className={`flex flex-col p-4 pt-0 text-sm md:space-y-2 md:h-[46vh] 2xl:h-[42.5vh] justify-between overflow-hidden ${isDarkTheme
                              ? "bg-black/50 text-white"
                              : "bg-white/60 text-black"
                              } backdrop-blur-xl`}
                          >
                            <div className="text-base font-semibold tracking-wide text-center">
                              USERNAME
                            </div>

                            <div className="flex justify-between gap-4">
                              <div>
                                <div className="text-sm">Name</div>
                                <div className="text-base font-medium">{fullName}</div>
                              </div>
                              <div>
                                <div className="text-xs">Age</div>
                                <div className="text-base font-medium">{age}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs">Gender</div>
                                <div className="text-base font-medium">{gender}</div>
                              </div>
                            </div>

                            <div className="flex justify-between gap-4">
                              <div>
                                <div className="text-xs">Tagline</div>
                                <div className="font-medium text-base">{tagline}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs">Phone Number</div>
                                <div className="font-medium text-base">{phoneNumber}</div>
                              </div>
                            </div>

                            <div className="flex justify-between gap-4">
                              <div>
                                <div className="text-xs">Country</div>
                                <div className="font-medium text-base">{country}</div>
                              </div>
                              <div>
                                <div className="text-xs">State</div>
                                <div className="font-medium text-base">{state}</div>
                              </div>
                              <div>
                                <div className="text-xs">Pincode</div>
                                <div className="font-medium text-base">{pinCode}</div>
                              </div>
                            </div>

                            <div>
                              <div className="text-xs">City</div>
                              <div className="font-medium text-base">{address}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:h-full rounded-xl lg:w-[60%] mt-2 pl-0 text-black flex flex-col 2xl:space-y-4 md:space-y-1.5">
                      <div className="text-white space-y-1">
                        <div className="left-head font-arialrounded text-xl">
                          Personal Information
                        </div>
                        <div className="left-head-text">
                          To create a personalized profile, include details such as your
                          name, age, location, interests, and any relevant experiences.
                          This will help others understand who you are and what you enjoy!
                        </div>
                      </div>

                      <div className="relative w-full">
                        <input
                          id="fullName"
                          className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded-xl outline-none`}
                          placeholder=" "
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        <label
                          htmlFor="fullName"
                          className={`absolute left-3 lg:left-4 transition-all duration-200 ${fullName
                            ? "top-1 text-[10px] font-arialrounded"
                            : "top-2 lg:top-3 text-base font-arialrounded"
                            } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                        >
                          Full Name
                        </label>
                      </div>

                      <div className="flex lg:flex-row flex-col lg:gap-x-10 gap-y-3">
                        <MultiSelect
                          options={["Male", "Female", "Prefer not to say"]}
                          placeholder="Gender"
                          multiSelect={false}
                          onChange={(value) => setGender(value)}
                          className="bg-white peer w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded-xl outline-none text-sm lg:text-base"
                        />
                        <div className="relative w-full">
                          <input
                            id="age"
                            className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded-xl outline-none`}
                            placeholder=" "
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                          <label
                            htmlFor="age"
                            className={`absolute left-3 lg:left-4 transition-all duration-200 ${age
                              ? "top-1 text-[10px] font-arialrounded"
                              : "top-2 lg:top-3 text-base font-arialrounded"
                              } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                          >
                            Age
                          </label>
                        </div>
                      </div>

                      <div className="flex lg:flex-row flex-col lg:gap-x-10 gap-y-3">
                        <div className="relative w-full">
                          <input
                            id="phoneNumber"
                            className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded-xl outline-none`}
                            placeholder=" "
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                          <label
                            htmlFor="phoneNumber"
                            className={`absolute left-3 lg:left-4 transition-all duration-200 ${phoneNumber
                              ? "top-1 text-[10px] font-arialrounded"
                              : "top-2 lg:top-3 text-base font-arialrounded"
                              } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                          >
                            Phone Number
                          </label>
                        </div>
                        <div className="relative w-full">
                          <input
                            id="country"
                            className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded-xl outline-none`}
                            placeholder=" "
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                          <label
                            htmlFor="country"
                            className={`absolute left-3 lg:left-4 transition-all duration-200 ${country
                              ? "top-1 text-[10px] font-arialrounded"
                              : "top-2 lg:top-3 text-base font-arialrounded"
                              } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                          >
                            Country
                          </label>
                        </div>
                      </div>

                      <div className="flex lg:flex-row flex-col lg:gap-x-10 gap-y-3">
                        <div className="relative w-full">
                          <input
                            id="state"
                            className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded-xl outline-none`}
                            placeholder=" "
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                          <label
                            htmlFor="state"
                            className={`absolute left-3 lg:left-4 transition-all duration-200 ${state
                              ? "top-1 text-[10px] font-arialrounded"
                              : "top-2 lg:top-3 text-base font-arialrounded"
                              } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                          >
                            State
                          </label>
                        </div>
                        <div className="relative w-full">
                          <input
                            id="pinCode"
                            className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded-xl outline-none`}
                            placeholder=" "
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                          />
                          <label
                            htmlFor="pinCode"
                            className={`absolute left-3 lg:left-4 transition-all duration-200 ${pinCode
                              ? "top-1 text-[10px] font-arialrounded"
                              : "top-2 lg:top-3 text-base font-arialrounded"
                              } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                          >
                            Pin Code
                          </label>
                        </div>
                      </div>

                      <div className="relative w-full">
                        <input
                          id="address"
                          className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded-xl outline-none`}
                          placeholder=" "
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <label
                          htmlFor="address"
                          className={`absolute left-3 lg:left-4 transition-all duration-200 ${address
                            ? "top-1 text-[10px] font-arialrounded"
                            : "top-2 lg:top-3 text-base font-arialrounded"
                            } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                        >
                          City
                        </label>
                      </div>

                      <div className="relative w-full">
                        <input
                          id="tagline"
                          className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 lg:pt-5 pb-1 lg:pb-2 rounded-xl outline-none`}
                          placeholder=" "
                          value={tagline}
                          onChange={(e) => setTagline(e.target.value)}
                        />
                        <label
                          htmlFor="tagline"
                          className={`absolute left-3 lg:left-4 transition-all duration-200 ${tagline
                            ? "top-1 text-[10px] font-arialrounded"
                            : "top-2 lg:top-3 text-base font-arialrounded"
                            } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                        >
                          Tagline
                        </label>
                      </div>

                      <button
                        className="lg:w-full lg:h-12 rounded-xl border-2 text-white border-white"
                        onClick={() => {
                          handleTabClick("EDUCATIONAL"),
                            handlePersonalDataSubmit()
                        }
                        }
                      >
                        Save Your Personal Information
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Educational Info Panel */}
              {educationalInfo && (
                <>
                  <div className="lg:h-full lg:w-[40%] rounded-xl p-3 font-sans">
                    <div className="left-head font-arialrounded text-xl">
                      Educational Information
                    </div>
                    <div className="left-head-text lg:w-[90%]">
                      Don't forget to include your educational details! Whether it's your
                      10th grade, 12th grade, or bachelor's degree, make sure to highlight
                      any relevant studies that showcase your skills and dedication to the
                      esports field.
                    </div>

                    <div className="bg-black/70 backdrop-blur-xl mt-4 rounded-xl 2xl:h-[55vh] md:h-[50vh] lg:w-[90%] space-y-3 text-white">
                      <div className="corousal lg:h-30 rounded-md">
                        <img
                          src="/cyberman.png"
                          alt=""
                          className="lg:h-30 md:h-28 lg:w-full rounded-t-2xl"
                        />
                      </div>
                      <div className="flex flex-col p-4 pt-0 text-sm md:space-y-2 md:h-[30vh] 2xl:h-[34vh] justify-between overflow-hidden">
                        <div className="text-base font-semibold tracking-wide text-center">
                          USERNAME
                        </div>
                        <div className="flex justify-between gap-4">
                          <div>
                            <div className="text-xs text-gray-300">Highest Education</div>
                            <div className="font-medium">{highestEducation}</div>
                          </div>
                        </div>
                        <div className="flex justify-between gap-4">
                          <div>
                            <div className="text-xs text-gray-300">Institute name</div>
                            <div className="font-medium">{institutionName}</div>
                          </div>
                        </div>
                        <div className="flex justify-between gap-4">
                          <div>
                            <div className="text-xs text-gray-300">Course</div>
                            <div className="font-medium">{course}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-300">Ending Year</div>
                            <div className="font-medium">{endingYear}</div>
                          </div>
                        </div>
                        <div className="flex justify-between gap-4">
                          <div>
                            <div className="text-xs text-gray-300">State</div>
                            <div className="font-medium">{eduState}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-300">Pincode</div>
                            <div className="font-medium">{eduPinCode}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:h-full rounded-xl lg:w-[60%] p-5 text-black flex flex-col gap-y-4">
                    <div className="relative w-full">
                      <input
                        id="highestEducation"
                        className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 pb-1 rounded-xl outline-none`}
                        placeholder=" "
                        value={highestEducation}
                        onChange={(e) => setHighestEducation(e.target.value)}
                      />
                      <label
                        htmlFor="highestEducation"
                        className={`absolute left-3 lg:left-4 transition-all duration-200 ${highestEducation
                          ? "top-1 text-[10px] font-arialrounded"
                          : "top-2 lg:top-3 text-base font-arialrounded"
                          } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                      >
                        Highest Education
                      </label>
                    </div>

                    <div className="relative w-full">
                      <input
                        id="institutionName"
                        className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 pb-1 rounded-xl outline-none`}
                        placeholder=" "
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                      />
                      <label
                        htmlFor="institutionName"
                        className={`absolute left-3 lg:left-4 transition-all duration-200 ${institutionName
                          ? "top-1 text-[10px] font-arialrounded"
                          : "top-2 lg:top-3 text-base font-arialrounded"
                          } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                      >
                        Institution Name
                      </label>
                    </div>

                    <div className="flex lg:flex-row lg:gap-x-10 gap-y-3 flex-col lg:flex-nowrap">
                      <div className="relative w-full">
                        <input
                          id="eduState"
                          className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 pb-1 rounded-xl outline-none`}
                          placeholder=" "
                          value={eduState}
                          onChange={(e) => setEduState(e.target.value)}
                        />
                        <label
                          htmlFor="eduState"
                          className={`absolute left-3 lg:left-4 transition-all duration-200 ${eduState
                            ? "top-1 text-[10px] font-arialrounded"
                            : "top-2 lg:top-3 text-base font-arialrounded"
                            } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                        >
                          State
                        </label>
                      </div>
                      <div className="relative w-full">
                        <input
                          id="eduPinCode"
                          className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 pb-1 rounded-xl outline-none`}
                          placeholder=" "
                          value={eduPinCode}
                          onChange={(e) => setEduPinCode(e.target.value)}
                        />
                        <label
                          htmlFor="eduPinCode"
                          className={`absolute left-3 lg:left-4 transition-all duration-200 ${eduPinCode
                            ? "top-1 text-[10px] font-arialrounded"
                            : "top-2 lg:top-3 text-base font-arialrounded"
                            } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                        >
                          Pin Code
                        </label>
                      </div>
                    </div>

                    <div className="relative w-full">
                      <input
                        id="course"
                        className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 pb-1 rounded-xl outline-none`}
                        placeholder=" "
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                      />
                      <label
                        htmlFor="course"
                        className={`absolute left-3 lg:left-4 transition-all duration-200 ${course
                          ? "top-1 text-[10px] font-arialrounded"
                          : "top-2 lg:top-3 text-base font-arialrounded"
                          } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                      >
                        Course
                      </label>
                    </div>

                    <div className="flex lg:flex-row lg:gap-x-10 gap-y-3 flex-col lg:flex-nowrap">
                      <div className="relative w-full">
                        <input
                          id="startingYear"
                          className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 pb-1 rounded-xl outline-none`}
                          placeholder=" "
                          value={startingYear}
                          onChange={(e) => setStartingYear(e.target.value)}
                        />
                        <label
                          htmlFor="startingYear"
                          className={`absolute left-3 lg:left-4 transition-all duration-200 ${startingYear
                            ? "top-1 text-[10px] font-arialrounded"
                            : "top-2 lg:top-3 text-base font-arialrounded"
                            } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                        >
                          Starting Year
                        </label>
                      </div>
                      <div className="relative w-full">
                        <input
                          id="endingYear"
                          className={`peer bg-white w-full h-10 lg:h-12 px-3 lg:px-4 pt-4 pb-1 rounded-xl outline-none`}
                          placeholder=" "
                          value={endingYear}
                          onChange={(e) => setEndingYear(e.target.value)}
                        />
                        <label
                          htmlFor="endingYear"
                          className={`absolute left-3 lg:left-4 transition-all duration-200 ${endingYear
                            ? "top-1 text-[10px] font-arialrounded"
                            : "top-2 lg:top-3 text-base font-arialrounded"
                            } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                        >
                          Ending Year
                        </label>
                      </div>
                    </div>

                    <div className="flex lg:flex-row lg:gap-x-10">
                      <button
                        className="lg:w-full lg:h-12 rounded-2xl border-2 border-white text-white"
                        onClick={() => (handleTabClick("GAMING"))}
                      >
                        Skip for Now
                      </button>
                      <button
                        className="lg:w-full lg:h-12 rounded-xl bg-black text-white"
                        onClick={() => (
                          handleTabClick("GAMING"),
                          handleAddEduDetails())}
                      >
                        Save Your Educational Information
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* MODIFICATION: Gaming Info Panel Split into two views */}
              {gamingInfo && !detailsClicked && (
                <>
                  {!showGameSelectionView ? (
                    // STEP 1: General Gaming Information
                    <div className="lg:flex lg:flex-col lg:gap-2 lg:w-full 2xl:gap-5 text-black font-sans ">
                      <div>
                        <div className="left-head text-white text-xl font-arialrounded">Gaming Information</div>
                        <div className="left-head-text text-white">
                          When you're talking about your favorite games, make sure to drop the title, what platform you’re playing on, and the genre. Don’t forget to mention when it was released and any cool stuff like high scores or tournament wins. Also, share your own experiences and strategies—those really show how much you love gaming!
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 mt-4">
                        <div className="flex lg:flex-row gap-x-6">
                          <MultiSelect
                            options={skillLevelOptions}
                            placeholder="Select Level"
                            multiSelect={false}
                            onChange={(value) => setSkillLevel(value)} />
                          <MultiSelect
                            options={platformOptions}
                            placeholder="Gaming Platform"
                            multiSelect={false}
                            onChange={(value) => setGamingPlatform(value)} />
                          <MultiSelect
                            options={serverOptions}
                            placeholder="Gaming Server"
                            multiSelect={false}
                            onChange={(value) => setGamingServer(value)} />
                        </div>
                        <div className="w-full mt-1">
                          <div className="flex">
                            <div className="w-52">
                              <MultiSelect
                                options={["Youtube", "Discord", "Twitch", "Other"]}
                                placeholder="Add Social Link"
                                onChange={setSelectedSocials} />
                            </div>
                            {selectedSocials.length > 0 && (
                              <div className="flex flex-wrap gap-4 ml-4">
                                {selectedSocials.map((platform) => (
                                  <input
                                    key={platform}
                                    className="bg-white h-12 rounded-xl pl-5 md:w-52"
                                    placeholder={`${platform} URL`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex lg:flex-row gap-x-6 mt-4">
                          <button
                            onClick={() => navigate("/homepage")}
                            className="lg:w-full lg:h-12 rounded-xl border-2 border-white text-white">Skip for Now</button>
                          <button
                            className="lg:w-full lg:h-12 rounded-xl bg-black text-white"
                            onClick={() => (
                              setShowGameSelectionView(true),
                              handleAddGamingDetails())}>
                            Save & Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // STEP 2: Select Games
                    <div className="lg:flex lg:flex-col lg:gap-2 lg:w-full 2xl:gap-5 text-black font-sans ">
                      <div>
                        <div className="left-head text-white text-xl font-arialrounded">Selected Games</div>
                        <div className="left-head-text text-white">
                          When you pick a game from the list above, its card will pop up right below, giving you a quick overview of its features, ratings, and more! You’ll see all the exciting upcoming games, explore different genres, and watch trailers to see gameplay mechanics and graphics. Plus, see what other players are saying about it! It’s super easy to get all the info you need before diving in!
                        </div>
                      </div>
                      <div className="mt-4">
                        <CustomGameDropdown selectedGames={selectedGames} setSelectedGames={setSelectedGames} />
                      </div>
                      <div className="flex flex-wrap md:gap-10 items-center text-white gap-4 mt-4">
                        {selectedGames.map((gameId) => {
                          const game = dropdownGameOptions.find((g) => g.id === gameId);
                          return (
                            <div key={gameId} className=" text-black rounded-xl p-4 md:p-2 md:w-[200px] 2xl:w-[250px] flex flex-col items-center">
                              <img src={game?.image} alt={game?.name} className="w-full h-45 object-contain rounded-xl md:mb-0 mb-1" />
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex lg:flex-row gap-x-6 mt-auto">
                        <button className="lg:w-full lg:h-12 rounded-xl border-2 border-white text-white" onClick={() => setShowGameSelectionView(false)}>Back</button>
                        <button className="lg:w-full lg:h-12 rounded-xl bg-black text-white" onClick={handleAddDetails} disabled={selectedGames.length === 0}>
                          Add Gaming Details Of Each Game
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Game Details Sub-Form */}
              {gamingInfo && detailsClicked && !submitGameData && (
                <div className="flex flex-col text-sans w-full">
                  <div className="up flex 2xl:gap-20 justify-center">
                    {selectedGames.map((gameId) => {
                      const game = dropdownGameOptions.find((g) => g.id === gameId);
                      const isActive = activeGameId === gameId;
                      return (
                        <div key={gameId} className={`text-black rounded-xl p-4 w-[250px] cursor-pointer transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} onClick={() => setActiveGameId(gameId)}>
                          <img src={game?.image} alt={game?.name} className="w-full h-44 object-contain rounded-xl transform -mt-10" />
                        </div>);
                    })}
                  </div>
                  {activeGameId && (
                    <div className="down -mt-12 flex justify-center items-start">
                      {/* ---------------- Left Preview Card ---------------- */}
                      <div className="lg:w-[35%]">
                        <div className="lg:h-full lg:w-full rounded-xl p-3">
                          <div className="bg-black/70 md:h-[80%] backdrop-blur-xl mt-2 rounded-xl 2xl:h-[56vh] lg:w-[85%] space-y-2 text-white p-3">
                            <div className="left-head text-sm">
                              Add {activeGameId.toUpperCase()} Account info’s
                            </div>

                            <img
                              src={dropdownGameOptions.find((g) => g.id === activeGameId)?.image2}
                              alt={activeGameId}
                              className="w-full h-36 object-cover rounded-lg my-4"
                            />

                            <div className="flex flex-col p-4 pt-0 text-sm space-y-3 justify-between">
                              <div className="text-base font-semibold tracking-wide text-center">

                              </div>

                              <div>
                                <div className="text-xs text-gray-300">{activeGameId.toUpperCase()} UID</div>
                                <div className="font-medium">{currentGame?.id || "None"}</div>
                              </div>

                              <div className="flex justify-between gap-4">
                                <div>
                                  <div className="text-xs text-gray-300">Overall Rank</div>
                                  <div className="font-medium">{currentGame?.rank || "None"}</div>
                                </div>

                                <div className="text-center">
                                  <div className="text-xs text-gray-300">Level</div>
                                  <div className="font-medium">{currentGame?.level || "None"}</div>
                                </div>

                                {activeGameId === "freefire" && (
                                  <div className="text-right">
                                    <div className="text-xs text-gray-300">CS Rank</div>
                                    <div className="font-medium">{currentGame?.csRank || "None"}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ---------------- Right Editable Form ---------------- */}
                      <div className="lg:h-full rounded-xl lg:w-[60%] pl-0 text-black flex flex-col gap-y-5 md:gap-y-2 2xl:gap-y-4 pt-5">
                        {/* Header with delete */}
                        <div className="text-white">
                          <div className="flex justify-between items-center">
                            <div className="left-head text-lg font-arialrounded">
                              {activeGameId.toUpperCase()}
                            </div>
                            <button
                              onClick={() => handleDeleteGame(activeGameId)}
                              className="bg-red-600 rounded-xl text-white px-3 py-1 text-xs"
                            >
                              Delete game
                            </button>
                          </div>
                        </div>

                        {/* Tabs / Help */}
                        <div className="flex justify-between text-sm text-white">
                          <button className="bg-black text-white px-2 rounded">
                            Primary Account Info
                          </button>
                          <div className="cursor-pointer p-3 rounded" onClick={handleClick}>
                            How To fill game data?
                          </div>
                        </div>

                        {/* Inputs Row 1: Level, CS Rank (if FF), Rank */}
                        <div className="flex flex-col md:flex-row gap-3 md:gap-x-10">
                          {/* Level */}
                          <div className="relative w-full">
                            <input
                              id="level"
                              type="number"
                              placeholder=" "
                              className="peer bg-white w-full h-12 px-4 pt-5 pb-1 rounded-xl text-black outline-none"
                              value={currentGame?.level || ""}
                              onChange={(e) => handleInputChange("level", e.target.value)}
                            />
                            <label
                              htmlFor="level"
                              className={`absolute left-4 transition-all duration-200 ${currentGame?.level ? "top-1 text-[10px]" : "top-3 text-base"
                                } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                            >
                              Level
                            </label>
                          </div>

                          {/* CS Rank (only Freefire) */}
                          {activeGameId === "freefire" && (
                            <div className="relative w-full">
                              <input
                                id="csRank"
                                placeholder=" "
                                className="peer bg-white w-full h-12 px-4 pt-5 pb-1 rounded-xl text-black outline-none"
                                value={currentGame?.csRank || ""}
                                onChange={(e) => handleInputChange("csRank", e.target.value)}
                              />
                              <label
                                htmlFor="csRank"
                                className={`absolute left-4 transition-all duration-200 ${currentGame?.csRank ? "top-1 text-[10px]" : "top-3 text-base"
                                  } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                              >
                                CS Rank
                              </label>
                            </div>
                          )}

                          {/* Rank Dropdown */}
                          <MultiSelect
                            options={["Platinum", "Gold", "Diamond", "Ace"]}
                            placeholder="Rank"
                            multiSelect={false}
                            onChange={(selectedValue) => handleInputChange("rank", selectedValue)}
                          />
                        </div>

                        {/* Input: Game ID */}
                        <div className="relative w-full">
                          <input
                            id="gameId"
                            placeholder=" "
                            className="peer bg-white w-full h-12 px-4 pt-5 pb-1 rounded-xl text-black outline-none"
                            value={currentGame?.id || ""}
                            onChange={(e) => handleInputChange("id", e.target.value)}
                          />
                          <label
                            htmlFor="gameId"
                            className={`absolute left-4 transition-all duration-200 ${currentGame?.id ? "top-1 text-[10px]" : "top-3 text-base"
                              } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                          >
                            {`${activeGameId.toUpperCase()} ID`}
                          </label>
                        </div>

                        {/* Input: Username */}
                        <div className="relative w-full">
                          <input
                            id="username"
                            placeholder=" "
                            className="peer bg-white w-full h-12 px-4 pt-5 pb-1 rounded-xl text-black outline-none"
                            value={currentGame?.username || ""}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                          />
                          <label
                            htmlFor="username"
                            className={`absolute left-4 transition-all duration-200 ${currentGame?.username ? "top-1 text-[10px]" : "top-3 text-base"
                              } peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}
                          >
                            In Game Username
                          </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row lg:gap-x-10 gap-y-3">
                          <button
                            className="w-full h-12 rounded-xl border-2 border-white text-white"
                            onClick={() => setDetailsClicked(false)}
                          >
                            Back To Selection
                          </button>
                          <button
                            className="w-full h-12 rounded-xl bg-black text-white"
                            onClick={handleSubmitGameData}
                          >
                            Submit Account Info
                          </button>
                        </div>
                      </div>
                    </div>

                  )}
                </div>
              )}

              {/* Summary View */}
              {gamingInfo && detailsClicked && submitGameData && (
                <div className="flex flex-col h-[80vh] px-5 mt-10 overflow-y-auto no-scrollbar">

                  {/* Personal Info */}
                  <div className="flex-shrink-0">
                    <PersonalInfoCard
                      username=" "
                      fullname={fullName || "None"}
                      gender={gender || "None"}
                      age={age || "None"}
                      phoneNumber={phoneNumber || "None"}
                      tagline={tagline || "None"}
                      state={state || "None"}
                      country={country || "None"}
                      pincode={pinCode || "None"}
                      address={address || "None"}
                      onEdit={handleCardEditDesktop("PERSONAL")}
                    />
                  </div>

                  {/* Educational Info */}
                  <div className="flex-shrink-0">
                    <EducationInfoCard
                      username=" "
                      highestEducation={highestEducation || "None"}
                      institutionName={institutionName || "None"}
                      state={eduState || "None"}
                      eduPinCode={eduPinCode || "None"}
                      course={course || "None"}
                      startingYear={startingYear || "None"}
                      endingYear={endingYear || "None"}
                      onEdit={handleCardEditDesktop("EDUCATIONAL")}
                    />
                  </div>

                  {/* Gaming Info */}
                  <div className="flex-shrink-0">
                    <GamingInfoCard
                      username=" "
                      skillLevel={skillLevel || "None"}
                      gamingPlatform={gamingPlatform || "None"}
                      gamingServer={gamingServer || "None"}
                      favouriteGames={selectedGames}
                      socialMedia={socialMediaLinks}
                      onEdit={handleCardEditDesktop("GAMING")}
                    />
                  </div>

                  {/* Games List */}
                  <div className="flex-shrink-0 space-y-4">
                    {selectedGames.map((gameId) => {
                      const current_game = gameData[gameId];
                      const gameDetails = dropdownGameOptions.find((g) => g.id === gameId);

                      return (
                        <GameCard
                          key={gameId}
                          username={current_game?.username || "None"}
                          gameName={gameDetails?.name}
                          id={current_game?.id || "None"}
                          rank={current_game?.rank || "None"}
                          level={current_game?.level || "None"}
                          csRank={current_game?.csRank || "None"}
                          image={gameDetails?.image2}
                          onDelete={() => handleDeleteGame(gameId)}
                          onEdit={() => handleEditGame(gameId)}
                          gameId={gameId}
                        />
                      );
                    })}
                  </div>

                  {/* Terms + Continue */}
                  <div className="mt-6 px-2 space-y-4">
                    <label className="flex items-start space-x-3 text-sm text-white">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        required
                      />
                      <span>
                        I have read and agree to the{" "}
                        <span className="underline cursor-pointer text-blue-400">
                          Privacy Policy
                        </span>{" "}
                        and{" "}
                        <span className="underline cursor-pointer text-blue-400">
                          Terms & Conditions
                        </span>{" "}
                        regarding the use of my personal, educational, and gaming data.
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="w-full text-white py-3 rounded-xl border border-white transition-all duration-400 ease-in-out hover:bg-black hover:border-none hover:shadow-md hover:scale-[1.01]"
                      onClick={() => navigate("/homepage")}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
          {/* Right Sidebar */}
          <div
            className="w-14 bg-white/30 backdrop-blur-xl lg:h-auto lg:mt-28"
            style={{ clipPath: "polygon(100% 0%, -900% 50%, -900% 50%, 100% 100%)" }}
          />
        </div>
        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xl flex justify-center items-center z-50 p-4">
            <div className="bg-black flex flex-col items-center p-6 rounded-2xl shadow-lg w-full max-w-md">
              <h2 className="text-sm font-semibold mb-2 text-white text-center">How to fill {activeGameId?.toUpperCase()} game data?</h2>
              <p className="text-gray-300 text-xs text-center">Please provide all relevant details as illustrated in the accompanying example image. Specifically, include the following information: {activeGameId?.toUpperCase()} ID (UID), player level, rank, and in-game username.</p>
              <img src={dropdownGameOptions1.find((g) => g.id === activeGameId)?.image} alt={activeGameId} className="w-full h-auto mt-5 object-contain rounded-lg" />
              <button className="mt-5 w-full px-4 py-2 bg-white text-black rounded" onClick={handleClose}>Continue Filling your game details</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Return JSX for Mobile 
  return (
    <div className={`${getBackgroundImage()} bg-cover bg-center font-sa min-h-screen w-full`}>
      {/* Header */}
      <div className="h-12 w-full bg-white/40 backdrop-blur-2xl flex justify-between items-center text-white px-5 py-3">
        <div className="flex items-center gap-2">
          {currentView !== 'PERSONAL_FORM' && (
            <button onClick={handleBack} title="Go Back">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="font-bebas text-xl font-normal leading-none tracking-wider">ASSEMBLE</div>
        </div>
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <div className="text-right">
            {/* <div className="font-arialrounded text-xs font-normal capitalize leading-none tracking-wide"> </div>
            <div className="font-arialrounded text-[10px] font-normal uppercase leading-none tracking-wide">N21072005/MP/VS</div> */}
          </div>
          <div className="w-6 h-6 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full">
        <div className="hidden lg:block w-14 bg-white/25 backdrop-blur-xl lg:h-auto lg:mt-28" style={{ clipPath: "polygon(0% 0%, 1000% 50%, 1000% 50%, 0% 100%)" }} />
        <div className={mainContainerClasses}>
          <div className="w-full text-white">
            {/* --- STEP 1: PERSONAL FORM --- */}
            {currentView === 'PERSONAL_FORM' && (() => {
              const isPersonalInfoComplete = fullName.trim() && gender && age.trim() && phoneNumber.trim() && country.trim() && state.trim() && pinCode.trim() && address.trim() && tagline.trim();
              return (
                <div className="flex justify-center px-2 font-sans">
                  <div className="w-[278px] mx-auto text-black flex flex-col gap-y-4">
                    {/* Section Title */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-white text-black w-fit px-10 py-3 flex items-center justify-center font-bebas text-xs font-normal capitalize leading-none tracking-wider [clip-path:polygon(10%_0%,_100%_0%,_90%_100%,_0%_100%)] [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.8))]">
                        Personal Information
                      </div>
                    </div>

                    {/* Info Description */}
                    <div className="w-full flex flex-col gap-2 text-left">
                      <div className="text-white font-arialrounded text-base font-normal capitalize leading-none tracking-wider">
                        Personal Information
                      </div>
                      <div className="text-white font-sans text-[10px] font-normal capitalize leading-[1.2] tracking-wide">
                        To Create A Personalized Profile, Include Details Such As Your Name, Age, Location, Interests,
                        And Any Relevant Experiences. This Will Help Others Understand Who You Are And What You Enjoy!
                      </div>
                    </div>

                    {/* Full Name */}
                    <input
                      id="fullName"
                      placeholder="Full Name"
                      className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] font-arialrounded text-[10px] font-normal capitalize leading-none tracking-wider text-gray-500 placeholder:text-gray-500"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />

                    {/* Gender & Age */}
                    <div className="flex gap-x-4">
                      <SingleSelectDropdown
                        options={genderOptions}
                        selectedValue={gender}
                        onChange={setGender}
                        placeholder="Gender"
                      />
                      <input
                        id="age"
                        type="number"
                        placeholder="Age"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] font-arialrounded text-[10px] font-normal capitalize leading-none tracking-wider text-gray-500 placeholder:text-gray-500"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>

                    {/* Phone & Country */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <input
                        id="phoneNumber"
                        placeholder="+91 Enter Phone Number"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] font-arialrounded text-[10px] font-normal capitalize leading-none tracking-wider text-gray-500 placeholder:text-gray-500"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <input
                        id="country"
                        placeholder="Country"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] font-arialrounded text-[10px] font-normal capitalize leading-none tracking-wider text-gray-500 placeholder:text-gray-500"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>

                    {/* State & Pincode */}
                    <div className="flex gap-x-4">
                      <input
                        id="state"
                        placeholder="State"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] font-arialrounded text-[10px] font-normal capitalize leading-none tracking-wider text-gray-500 placeholder:text-gray-500"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                      <input
                        id="pinCode"
                        placeholder="Pincode"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] font-arialrounded text-[10px] font-normal capitalize leading-none tracking-wider text-gray-500 placeholder:text-gray-500"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                    </div>

                    {/* City */}
                    <input
                      id="address"
                      placeholder="City"
                      className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] font-arialrounded text-[10px] font-normal capitalize leading-none tracking-wider text-gray-500 placeholder:text-gray-500"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />

                    {/* Tagline */}
                    <input
                      id="tagline"
                      placeholder="Tagline"
                      className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] font-arialrounded text-[10px] font-normal capitalize leading-none tracking-wider text-gray-500 placeholder:text-gray-500"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                    />

                    {/* Save Button */}
                    <button
                      className="w-full rounded bg-transparent border border-white text-white mt-2 py-2 px-4 transition-colors hover:bg-white hover:text-black font-arialrounded font-normal text-xs capitalize leading-none tracking-normal disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => {
                        setCurrentView('SHOW_PERSONAL_CARD'),
                          handlePersonalDataSubmit()
                      }}
                      disabled={!isPersonalInfoComplete}
                    >
                      Save Your Personal Information
                    </button>
                  </div>
                </div>

              )
            })()}

            {/* --- STEP 2: PERSONAL CARD --- */}
            {currentView === 'SHOW_PERSONAL_CARD' && (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <PersonalInfoCard username=" " fullname={fullName || 'None'} gender={gender || 'None'} age={age || 'None'} phoneNumber={phoneNumber || 'None'} tagline={tagline || 'None'} state={state || 'None'} country={country || 'None'} pincode={pinCode || 'None'} onEdit={handleCardEditMobile("PERSONAL_FORM")} address={address || 'None'} />
                <button className="bg-black text-white flex items-center justify-center mt-4 font-['Arial_Rounded_MT_Bold'] font-normal text-xs leading-none tracking-normal capitalize" style={{ width: '268px', height: '40px', borderRadius: '4px', padding: '8px 16px' }} onClick={() => setCurrentView('EDUCATION_FORM')}>Add Educational Information</button>
              </div>
            )}

            {/* --- STEP 3: EDUCATION FORM --- */}
            {/* --- STEP 3: EDUCATION FORM --- */}
            {currentView === "EDUCATION_FORM" && (() => {
              const isEducationInfoComplete =
                highestEducation.trim() &&
                institutionName.trim() &&
                eduState.trim() &&
                eduPinCode.trim() &&
                course.trim() &&
                startingYear.trim() &&
                endingYear.trim();

              return (
                <div className="flex justify-center px-2 font-sans">
                  <div className="w-[278px] mx-auto text-black flex flex-col gap-y-4">

                    {/* Header */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-white text-black w-fit px-8 py-2 flex items-center justify-center font-bebas text-xs font-normal capitalize leading-none tracking-wider 
            [clip-path:polygon(10%_0%,_100%_0%,_90%_100%,_0%_100%)] 
            [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.8))]"
                      >
                        Educational Information
                      </div>
                    </div>

                    {/* Title + Description */}
                    <div className="w-full flex flex-col gap-2 text-left">
                      <div className="text-white font-arialrounded text-base capitalize leading-none tracking-wider">
                        Educational Information
                      </div>
                      <div className="text-white font-sans text-[10px] leading-[1.2] tracking-wide">
                        Don't Forget To Include Your Educational Details! Whether It's Your 10th Grade, 12th Grade, Or Bachelor's Degree, Make Sure To Highlight Any Relevant Studies That Showcase Your Skills And Dedication To The Esports Field.
                      </div>
                    </div>

                    {/* Inputs */}
                    <input
                      id="highestEducation"
                      placeholder="Highest Education"
                      className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_rgba(0,0,0,0.25)] text-[10px] font-arialrounded text-gray-500 placeholder:text-gray-500"
                      value={highestEducation}
                      onChange={(e) => setHighestEducation(e.target.value)}
                    />

                    <input
                      id="institutionName"
                      placeholder="Institute Name"
                      className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_rgba(0,0,0,0.25)] text-[10px] font-arialrounded text-gray-500 placeholder:text-gray-500"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                    />

                    <div className="flex gap-x-4">
                      <input
                        id="eduState"
                        placeholder="State"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_rgba(0,0,0,0.25)] text-[10px] font-arialrounded text-gray-500 placeholder:text-gray-500"
                        value={eduState}
                        onChange={(e) => setEduState(e.target.value)}
                      />
                      <input
                        id="eduPinCode"
                        placeholder="Pincode"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_rgba(0,0,0,0.25)] text-[10px] font-arialrounded text-gray-500 placeholder:text-gray-500"
                        value={eduPinCode}
                        onChange={(e) => setEduPinCode(e.target.value)}
                      />
                    </div>

                    <input
                      id="course"
                      placeholder="Course"
                      className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_rgba(0,0,0,0.25)] text-[10px] font-arialrounded text-gray-500 placeholder:text-gray-500"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                    />

                    <div className="flex gap-x-4">
                      <input
                        id="startingYear"
                        placeholder="Starting Year"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_rgba(0,0,0,0.25)] text-[10px] font-arialrounded text-gray-500 placeholder:text-gray-500"
                        value={startingYear}
                        onChange={(e) => setStartingYear(e.target.value)}
                      />
                      <input
                        id="endingYear"
                        placeholder="Ending Year"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded outline-none shadow-[4px_4px_20px_rgba(0,0,0,0.25)] text-[10px] font-arialrounded text-gray-500 placeholder:text-gray-500"
                        value={endingYear}
                        onChange={(e) => setEndingYear(e.target.value)}
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-4 mt-2">
                      <button
                        className="w-full rounded bg-transparent border border-white text-white py-2 px-4 hover:bg-white hover:text-black text-xs font-arialrounded capitalize leading-none"
                        onClick={() => (setCurrentView("SHOW_EDUCATION_CARD"), navigate("/homepage"))}
                      >
                        Skip For Now
                      </button>

                      <button
                        className="w-full rounded bg-black border border-black text-white py-2 px-4 hover:bg-gray-800 text-xs font-arialrounded capitalize leading-none disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() =>
                        (setCurrentView("SHOW_EDUCATION_CARD"),
                          handleAddEduDetails())}
                        disabled={!isEducationInfoComplete}
                      >
                        Save Your Educational Information
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* --- STEP 4: EDUCATION CARD --- */}
            {currentView === "SHOW_EDUCATION_CARD" && (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <EducationInfoCard
                  username=" "
                  highestEducation={highestEducation || "None"}
                  institutionName={institutionName || "None"}
                  state={eduState || "None"}
                  eduPinCode={eduPinCode || "None"}
                  course={course || "None"}
                  startingYear={startingYear || "None"}
                  endingYear={endingYear || "None"}
                  onEdit={handleCardEditMobile("EDUCATION_FORM")}
                />
                <button
                  className="bg-black text-white flex items-center justify-center mt-4 font-['Arial_Rounded_MT_Bold'] text-xs capitalize"
                  style={{
                    width: "268px",
                    height: "40px",
                    borderRadius: "4px",
                    padding: "8px 16px",
                  }}
                  onClick={() => setCurrentView("GAMING_FORM")}
                >
                  Add Gaming Information
                </button>
              </div>
            )}

            {/* --- STEP 5: GAMING FORM (GENERAL INFO) --- */}
            {currentView === "GAMING_FORM" && !detailsClicked && (() => {
              const isGamingInfoComplete = skillLevel && gamingPlatform && gamingServer;

              return (
                <div className="flex justify-center px-2 font-sans">
                  <div className="w-[278px] mx-auto text-black flex flex-col gap-y-4">

                    {/* Header */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-white text-black w-fit px-8 py-2 font-bebas text-xs capitalize leading-none tracking-wider 
            [clip-path:polygon(10%_0%,_100%_0%,_90%_100%,_0%_100%)] 
            [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.8))]"
                      >
                        Gaming Information
                      </div>
                    </div>

                    {/* Title + Description */}
                    <div className="w-full flex flex-col gap-2 text-left">
                      <div className="text-white font-arialrounded text-base capitalize leading-none tracking-wider">
                        Gaming Information
                      </div>
                      <div className="text-white font-sans text-[10px] leading-[1.2] tracking-wide">
                        When You're Talking About Your Favorite Games, Make Sure To Drop The Title, What Platform You're Playing On, And The Genre...
                      </div>
                    </div>

                    {/* Dropdowns */}
                    <SingleSelectDropdown
                      options={skillLevelOptions}
                      selectedValue={skillLevel}
                      onChange={setSkillLevel}
                      placeholder="Select Skill Level"
                    />
                    <SingleSelectDropdown
                      options={platformOptions}
                      selectedValue={gamingPlatform}
                      onChange={setGamingPlatform}
                      placeholder="Select Gaming Platform"
                    />
                    <SingleSelectDropdown
                      options={serverOptions}
                      selectedValue={gamingServer}
                      onChange={setGamingServer}
                      placeholder="Select Gaming Server"
                    />

                    {/* Social Links */}
                    <div className="bg-white w-full h-8 px-[23px] py-2 rounded shadow-[4px_4px_20px_rgba(0,0,0,0.25)] flex items-center text-[10px] font-arialrounded text-gray-500">
                      Add Social Links
                    </div>
                    <div className="flex gap-x-4">
                      <input
                        id="youtube"
                        placeholder="Youtube URL"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded shadow-[4px_4px_20px_rgba(0,0,0,0.25)] text-[10px] font-arialrounded text-gray-500 placeholder:text-gray-500"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                      />
                      <input
                        id="discord"
                        placeholder="Discord URL"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded shadow-[4px_4px_20px_rgba(0,0,0,0.25)] text-[10px] font-arialrounded text-gray-500 placeholder:text-gray-500"
                        value={discordUrl}
                        onChange={(e) => setDiscordUrl(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-x-4">
                      <input
                        id="twitch"
                        placeholder="Twitch URL"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded shadow-[4px_4px_20px_rgba(0,0,0,0.25)] text-[10px] font-arialrounded text-gray-500 placeholder:text-gray-500"
                        value={twitchUrl}
                        onChange={(e) => setTwitchUrl(e.target.value)}
                      />
                      <input
                        id="other"
                        placeholder="Other Social URL"
                        className="bg-white w-full h-8 px-[23px] py-2 rounded shadow-[4px_4px_20px_rgba(0,0,0,0.25)] text-[10px] font-arialrounded text-gray-500 placeholder:text-gray-500"
                        value={otherUrl}
                        onChange={(e) => setOtherUrl(e.target.value)}
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-4 mt-2">
                      <button
                        className="w-full rounded bg-transparent border border-white text-white py-2 px-4 hover:bg-white hover:text-black text-xs font-arialrounded capitalize"
                        onClick={() => (setCurrentView("SUMMARY_VIEW"), navigate("/homepage"))}
                      >
                        Skip for Now
                      </button>
                      <button
                        className="w-full rounded bg-black border border-black text-white py-2 px-4 hover:bg-gray-800 text-xs font-arialrounded capitalize disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => (
                          setCurrentView("SELECTED_GAMES_VIEW"),
                          handleAddGamingDetails())}
                        disabled={!isGamingInfoComplete}
                      >
                        Save Your Gaming Information
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* --- STEP 6: SELECTED GAMES VIEW (GAME SELECTION) --- */}
            {currentView === "SELECTED_GAMES_VIEW" && (
              <div className="flex justify-center px-2 font-sans">
                <div className="w-[278px] mx-auto text-black flex flex-col gap-y-4">

                  {/* Header */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-white text-black w-fit px-8 py-2 font-bebas text-xs capitalize leading-none tracking-wider 
          [clip-path:polygon(10%_0%,_100%_0%,_90%_100%,_0%_100%)] 
          [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.8))]"
                    >
                      Gaming Information
                    </div>
                  </div>

                  {/* Title + Description */}
                  <div className="w-full flex flex-col gap-2 text-left">
                    <div className="text-white font-arialrounded text-base capitalize leading-none tracking-wider">
                      Selected Games
                    </div>
                    <div className="text-white font-sans text-[10px] leading-snug tracking-wide break-words">
                      When you pick a game from the list above, its card will pop up right below, giving you a quick overview of its features, ratings, and more! You’ll see all the exciting upcoming games, explore different genres, and watch trailers to see gameplay mechanics and graphics. Plus, see what other players are saying about it! It’s super easy to get all the info you need before diving in!
                    </div>
                  </div>

                  {/* Game Selection Dropdown */}
                  <MultiSelectGameDropdown
                    options={dropdownGameOptions}
                    selectedGames={selectedGames}
                    onChange={setSelectedGames}
                  />

                  {/* Selected Games Grid */}
                  <div className="grid grid-cols-2 gap-4 items-center text-white py-4">
                    {selectedGames.map((gameId) => {
                      const game = dropdownGameOptions.find((g) => g.id === gameId);
                      return game ? (
                        <div key={game.id} className="p-1">
                          <img
                            src={game.image}
                            alt={game.name}
                            className="w-full object-contain rounded-md shadow-lg"
                          />
                        </div>
                      ) : null;
                    })}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-4 mt-2">
                    <button
                      className="w-full rounded bg-black border border-black text-white py-2 px-4 hover:bg-gray-800 text-xs font-arialrounded capitalize"
                      onClick={handleAddDetails}
                      disabled={selectedGames.length === 0}
                    >
                      Add Gaming Details Of Each Game
                    </button>
                  </div>
                </div>
              </div>
            )}


            {/* --- GAMING DETAILS SUB-FORM --- */}
            {currentView === 'GAMING_FORM' && detailsClicked && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
                  {selectedGames.map((gameId) => {
                    const game = dropdownGameOptions.find((g) => g.id === gameId);
                    const isActive = activeGameId === gameId;
                    return (
                      <div
                        key={gameId}
                        className={`w-1/3 md:w-1/4 lg:w-1/6 cursor-pointer p-2 rounded-xl transition-all ${isActive ? "bg-white/30 scale-110" : ""}`}
                        onClick={() => setActiveGameId(gameId)}>
                        <img
                          src={game?.image}
                          alt={game?.name}
                          className="w-full object-contain rounded-xl" />
                      </div>);
                  })}
                </div>
                {activeGameId && (
                  <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 mt-4">
                    <div className="w-full max-w-sm lg:w-[35%]">
                      <div className="bg-black/70 backdrop-blur-xl mt-2 rounded-xl text-white p-3">
                        <div className="left-head text-sm">Add {activeGameId.toUpperCase()} Account info’s
                        </div>
                        <img
                          src={dropdownGameOptions.find((g) => g.id === activeGameId)?.image2}
                          alt={activeGameId}
                          className="w-full h-36 object-cover rounded-lg my-4" />
                        <div className="flex flex-col p-4 pt-0 text-sm space-y-3 justify-between">
                          <div className="text-base font-semibold tracking-wide text-center"> </div>
                          <div>
                            <div className="text-xs text-gray-300">{activeGameId.toUpperCase()} UID</div>
                            <div className="font-medium">{currentGame?.id || 'None'}</div>
                          </div>
                          <div className="flex justify-between gap-4">
                            <div>
                              <div className="text-xs text-gray-300">Overall Rank</div>
                              <div className="font-medium">{currentGame?.rank || 'None'}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-300">Level</div>
                              <div className="font-medium">{currentGame?.level || 'None'}</div>
                            </div>{activeGameId === 'freefire' && (
                              <div className="text-right">
                                <div className="text-xs text-gray-300">CS Rank</div>
                                <div className="font-medium">{currentGame?.csRank || 'None'}</div>
                              </div>)}</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-[60%] flex flex-col gap-y-4">
                      <div className="text-white">
                        <div className="flex justify-between items-center">
                          <div className="left-head text-lg font-arialrounded">{activeGameId.toUpperCase()}</div>
                          <button
                            onClick={() => handleDeleteGame(activeGameId)}
                            className="bg-red-600 rounded-xl text-white px-3 py-1 text-xs">Delete game</button>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-white">
                        <button className="bg-black text-white px-2 rounded">Primary Account Info</button>
                        <div
                          className="cursor-pointer p-3 rounded"
                          onClick={handleClick}>How To fill game data?</div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-3 md:gap-x-10">
                        <div className="relative w-full">
                          <input
                            id="level"
                            placeholder=" "
                            type="number"
                            className="peer bg-white w-full h-12 px-4 pt-5 pb-1 rounded-xl text-black outline-none"
                            value={currentGame?.level || ''}
                            onChange={(e) => handleInputChange('level', e.target.value)} />
                          <label
                            htmlFor="level"
                            className={`absolute left-4 transition-all duration-200 ${currentGame?.level ? 'top-1 text-[10px]' : 'top-3 text-base'} peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}>Level
                          </label>
                        </div>{activeGameId === 'freefire' && (
                          <div className="relative w-full">
                            <input
                              id="csRank"
                              placeholder=" "
                              className="peer bg-white w-full h-12 px-4 pt-5 pb-1 rounded-xl text-black outline-none"
                              value={currentGame?.csRank || ''}
                              onChange={(e) => handleInputChange('csRank', e.target.value)} />
                            <label
                              htmlFor="csRank"
                              className={`absolute left-4 transition-all duration-200 ${currentGame?.csRank ? 'top-1 text-[10px]' : 'top-3 text-base'} peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}>CS Rank
                            </label>
                          </div>)}
                        <MultiSelect
                          options={['Platinum', 'Gold', 'Diamond', 'Ace']}
                          placeholder="Rank"
                          multiSelect={false}
                          onChange={(selectedValue) => handleInputChange('rank', selectedValue)} />
                      </div>
                      <div className="relative w-full">
                        <input
                          id="gameId"
                          placeholder=" "
                          className="peer bg-white w-full h-12 px-4 pt-5 pb-1 rounded-xl outline-none text-black"
                          value={currentGame?.id || ''}
                          onChange={(e) => handleInputChange('id', e.target.value)} />
                        <label
                          htmlFor="gameId"
                          className={`absolute left-4 transition-all duration-200 ${currentGame?.id ? 'top-1 text-[10px]' : 'top-3 text-base'} peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}>{`${activeGameId.toUpperCase()} ID`}</label></div><div className="relative w-full">
                        <input
                          id="username"
                          placeholder=" "
                          className="peer bg-white w-full h-12 px-4 pt-5 pb-1 rounded-xl outline-none text-black"
                          value={currentGame?.username || ''}
                          onChange={(e) => handleInputChange('username', e.target.value)} />
                        <label
                          htmlFor="username"
                          className={`absolute left-4 transition-all duration-200 ${currentGame?.username ? 'top-1 text-[10px]' : 'top-3 text-base'} peer-focus:top-1 peer-focus:text-[10px] text-gray-500`}>In Game Username
                        </label>
                      </div>
                      <div className="flex flex-col md:flex-row lg:gap-x-10 gap-y-3">
                        <button
                          className="w-full h-12 rounded-xl border-2 border-white text-white"
                          onClick={() => {
                            setCurrentView('SELECTED_GAMES_VIEW');
                            setDetailsClicked(false);
                          }}>Back To Selection</button>
                        <button
                          className="w-full h-12 rounded-xl bg-black text-white"
                          onClick={handleSubmitGameData}>Submit Account Info
                        </button>
                      </div>
                    </div>
                  </div>)}
              </div>
            )}

            {/* --- SUMMARY VIEW --- */}
            {currentView === 'SUMMARY_VIEW' && (
              <div className="flex flex-col gap-8 w-full px-2 md:px-5 py-5 h-auto overflow-y-auto">
                <PersonalInfoCard
                  username=" "
                  fullname={fullName || 'None'}
                  gender={gender || 'None'}
                  age={age || 'None'}
                  phoneNumber={phoneNumber || 'None'}
                  tagline={tagline || 'None'}
                  state={state || 'None'}
                  country={country || 'None'}
                  pincode={pinCode || 'None'}
                  onEdit={handleCardEditMobile("PERSONAL_FORM")}
                  address={address || 'None'} />
                <EducationInfoCard
                  username=" "
                  highestEducation={highestEducation || 'None'}
                  institutionName={institutionName || 'None'}
                  state={eduState || 'None'}
                  eduPinCode={eduPinCode || 'None'}
                  course={course || 'None'}
                  startingYear={startingYear || 'None'}
                  endingYear={endingYear || 'None'}
                  onEdit={handleCardEditMobile("EDUCATION_FORM")} />
                <GamingInfoCard
                  username=" "
                  skillLevel={skillLevel || 'None'}
                  gamingPlatform={gamingPlatform || 'None'}
                  gamingServer={gamingServer || 'None'}
                  favouriteGames={selectedGames}
                  socialMedia={socialMediaLinks}
                  onEdit={() => {
                    setCurrentView('GAMING_FORM');
                    setDetailsClicked(false);
                  }} />
                <div className="flex flex-col gap-4">
                  {selectedGames.map((gameId) => {
                    const current_game = gameData[gameId];
                    const gameDetails = dropdownGameOptions.find((g) => g.id === gameId);
                    return (
                      <GameCard
                        key={gameId}
                        username={current_game?.username || 'None'}
                        gameName={gameDetails?.name}
                        id={current_game?.id || 'None'}
                        rank={current_game?.rank || 'None'}
                        level={current_game?.level || 'None'}
                        image={gameDetails?.image2}
                        onDelete={() => handleDeleteGame(gameId)}
                        onEdit={() => handleEditGame(gameId)}
                        gameId={gameId} />
                    );
                  })}
                </div>
                <div className="mt-6 px-2 space-y-4">
                  <label className="flex items-start space-x-3 text-sm text-white">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded" required />
                    <span>I have read and agree to the
                      <span className="underline cursor-pointer text-blue-400">Privacy Policy</span>
                      and
                      <span className="underline cursor-pointer text-blue-400"> Terms & Conditions</span>
                      regarding the use of my personal, educational, and gaming data.
                    </span>
                  </label>
                  <button
                    className="w-full text-white py-3 rounded-xl border border-white transition-all duration-400 ease-in-out hover:bg-black hover:border-none hover:shadow-md hover:scale-[1.01]"
                    type="submit"
                    onClick={() => navigate("/homepage")}
                  >Continue</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="hidden lg:block w-14 bg-white/25 backdrop-blur-xl lg:h-auto lg:mt-28"
          style={{ clipPath: "polygon(100% 0%, -900% 50%, -900% 50%, 100% 100%)" }} />
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xl flex justify-center items-center z-50 p-4">
          <div className="bg-black flex flex-col items-center p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-sm font-semibold mb-2 text-white text-center">
              How to fill {activeGameId?.toUpperCase()} game data?</h2>
            <p className="text-gray-300 text-xs text-center">Please provide all relevant details as illustrated in the accompanying example image. Specifically, include the following information: {activeGameId?.toUpperCase()} ID (UID), player level, rank, and in-game username.</p>
            <img
              src={dropdownGameOptions1.find((g) => g.id === activeGameId)?.image}
              alt={activeGameId}
              className="w-full h-auto mt-5 object-contain rounded-lg" />
            <button
              className="mt-5 w-full px-4 py-2 bg-white text-black rounded"
              onClick={handleClose}>Continue Filling your game details</button>
          </div>
        </div>)}
    </div>
  );

}

export default Main;